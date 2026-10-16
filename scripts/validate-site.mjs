import { access, readFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { translations } from "../js/translations.js";
import { documents } from "../js/content-data.js";
import { organization } from "../js/institution-data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const rootUrl = "https://titotizzy.github.io/sant-karl-leveque/";
const errors = [];
if (organization.founded !== 1986) errors.push(`année de fondation incorrecte: ${organization.founded}`);
if (organization.email !== "santkarlleveque86@gmail.com") errors.push(`courriel institutionnel incorrect: ${organization.email}`);
const referenceKeys = Object.keys(translations.fr).sort();
const indexSource = await readFile(resolve(root, "index.html"), "utf8");
const assetVersion = indexSource.match(/js\/app\.js\?v=([^\"]+)/)?.[1];
if (!assetVersion || assetVersion === "20261014-partners") errors.push("version des assets absente ou obsolète");
const appSource = await readFile(resolve(root, "js/app.js"), "utf8");
if (!appSource.includes('import(`./translations.js${moduleQuery}`)')) errors.push("app.js: la version ne se propage pas aux traductions");
if (!appSource.includes("if (value !== undefined) node.textContent = value")) errors.push("app.js: garde-fou des traductions absent");
if (!appSource.includes('document.readyState === "loading"') || !appSource.includes("else initializeApp()")) errors.push("app.js: initialisation tardive non prise en charge");
const workerSource = await readFile(resolve(root, "service-worker.js"), "utf8");
if (!workerSource.includes('searchParams.get("v")') || !workerSource.includes("isCodeAsset") || !workerSource.includes("self.skipWaiting()")) errors.push("service worker: stratégie de mise à jour du code incomplète");
for (const lang of ["ht", "en"]) {
  const keys = Object.keys(translations[lang]).sort();
  const missing = referenceKeys.filter((key) => !keys.includes(key));
  const extra = keys.filter((key) => !referenceKeys.includes(key));
  if (missing.length || extra.length) errors.push(`${lang}: clés manquantes [${missing}] / supplémentaires [${extra}]`);
}
const officialContentChecks = [
  ["heritageBirth", "17 janvier 1937"],
  ["missionText", "zones rurales"],
  ["visionText", "autodétermination"],
  ["valuesSelfDetermination", "Core Group"],
  ["directorMessage4", "quitter l’Italie"],
  ["directorVisionQuote", "aksè ak lasante"]
];
for (const [key, phrase] of officialContentChecks) {
  if (!translations.fr[key]?.includes(phrase)) errors.push(`contenu officiel incomplet: ${key}`);
  for (const lang of ["ht", "en"]) if (!translations[lang][key]?.trim()) errors.push(`${lang}: contenu officiel vide ${key}`);
}

for await (const relative of glob(["*.html", "pages/*.html"])) {
  const file = resolve(root, relative);
  const html = await readFile(file, "utf8");
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) errors.push(`${relative}: ${h1Count} H1`);
  if (!/<html\s[^>]*lang="[^"]+"/.test(html)) errors.push(`${relative}: langue du document absente`);
  if (!/<meta name="viewport"/.test(html)) errors.push(`${relative}: viewport absent`);
  const mainCount = (html.match(/<main\b/g) || []).length;
  if (mainCount !== 1) errors.push(`${relative}: ${mainCount} élément main`);
  if (!/<meta name="description"/.test(html) && relative !== "offline.html") errors.push(`${relative}: description absente`);
  if (!/<link rel="canonical"/.test(html)) errors.push(`${relative}: canonique absente`);
  if (!/<link rel="alternate" hreflang="fr"/.test(html)) errors.push(`${relative}: hreflang absent`);
  if (!/<meta property="og:title"/.test(html)) errors.push(`${relative}: Open Graph absent`);
  if (!/<meta property="og:image:alt"/.test(html)) errors.push(`${relative}: texte alternatif Open Graph absent`);
  if (!/<meta name="twitter:image"/.test(html)) errors.push(`${relative}: image Twitter absente`);
  if (relative !== "offline.html" && (!html.includes(`js/app.js?v=${assetVersion}`) || !html.includes(`css/styles.css?v=${assetVersion}`))) errors.push(`${relative}: version des assets incohérente`);
  if (["404.html", "offline.html"].includes(relative) && !/<meta name="robots" content="noindex, nofollow">/.test(html)) errors.push(`${relative}: directive noindex absente`);
  if (relative === "index.html" && !html.includes(`<link rel="canonical" href="${rootUrl}">`)) errors.push(`${relative}: canonique d’accueil incorrecte`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicateIds.length) errors.push(`${relative}: identifiants dupliqués [${duplicateIds.join(", ")}]`);
  for (const image of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt="[^"]*"/.test(image[0])) errors.push(`${relative}: image sans attribut alt`);
  for (const button of html.matchAll(/<button\b[^>]*>/g)) if (!/\btype="(?:button|submit|reset)"/.test(button[0])) errors.push(`${relative}: bouton sans type`);
  if (/\bhref=""/.test(html)) errors.push(`${relative}: lien vide`);
  for (const link of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) if (!/\brel="[^"]*noopener/.test(link[0])) errors.push(`${relative}: lien externe sans noopener`);
  const brandHref = html.match(/<a\s+class="brand"\s+href="([^"]+)"/)?.[1];
  if (relative !== "offline.html" && brandHref !== rootUrl) errors.push(`${relative}: le logo ne pointe pas vers l’accueil public`);
  if (/<a\b[^>]*href="[^"]*(?:\/login\b|admin\.santkarlleveque\.com)/i.test(html)) errors.push(`${relative}: lien d’administration exposé dans le site public`);
  for (const match of html.matchAll(/data-i18n(?:-[a-z-]+)?="([^"]+)"/g)) {
    if (!referenceKeys.includes(match[1])) errors.push(`${relative}: clé de traduction inconnue ${match[1]}`);
  }
  const attrs = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const value of attrs) {
    if (!value || /^(?:https?:|mailto:|tel:|#|data:)/.test(value)) continue;
    const clean = value.split(/[?#]/)[0];
    if (!clean) continue;
    try { await access(resolve(dirname(file), clean)); } catch { errors.push(`${relative}: cible introuvable ${value}`); }
  }
  const socialImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  if (socialImage?.startsWith(rootUrl)) {
    try { await access(resolve(root, socialImage.slice(rootUrl.length))); } catch { errors.push(`${relative}: image sociale introuvable ${socialImage}`); }
  }
  if (/news\.html|documentation\.html/.test(html)) errors.push(`${relative}: ancienne route détectée`);
  if (/\[object Object\]/.test(html)) errors.push(`${relative}: objet JavaScript affiché comme texte`);
  if (/\bSKSL\b/.test(html)) errors.push(`${relative}: sigle SKSL incorrect`);
  if (/reverendperegmaisonneuve@gmail\.com|estinviljnbsebastien@gmail\.com|\+509\s*(?:4705-1133|3682-7431)/.test(html)) errors.push(`${relative}: coordonnées personnelles détectées`);
  if (/sécurité alimentaire|securite alimentaire|food security|sekirite alimantè/i.test(html)) errors.push(`${relative}: référence exclue à la sécurité alimentaire`);
  if (!/foundingDate\":\"1986/.test(html)) errors.push(`${relative}: année 1986 absente des données structurées`);
  const limits = [["area-card", 5], ["news-card", relative.replaceAll("\\", "/") === "pages/actions.html" ? 5 : 3], ["doc-card", 15]];
  for (const [className, maximum] of limits) {
    const count = (html.match(new RegExp(`class="[^"]*${className}`, "g")) || []).length;
    if (count > maximum) errors.push(`${relative}: pré-rendu dupliqué (${count} ${className})`);
  }
}

const institutionalChecks = [
  ["pages/equipe.html", "profile-card", 5],
  ["pages/equipe.html", "org-node", 9],
  ["pages/interventions.html", "method-card", 5],
  ["pages/actions.html", "achievement-list", 1],
  ["pages/contact.html", "territory-list", 1]
];
for (const [relative, marker, minimum] of institutionalChecks) {
  const html = await readFile(resolve(root, relative), "utf8");
  const count = (html.match(new RegExp(`class="[^"]*${marker}`, "g")) || []).length;
  if (count < minimum) errors.push(`${relative}: contenu institutionnel incomplet (${marker}: ${count}/${minimum})`);
}

const teamHtml = await readFile(resolve(root, "pages/equipe.html"), "utf8");
if (!teamHtml.includes("data-org-open") || !teamHtml.includes("data-org-dialog")) errors.push("pages/equipe.html: dialogue de l’organigramme absent");
if ((teamHtml.match(/data-org-open/g) || []).length !== 1) errors.push("pages/equipe.html: le bouton de l’organigramme doit être unique");
if (teamHtml.indexOf("org-promo-section") < teamHtml.indexOf("profile-list")) errors.push("pages/equipe.html: le bouton de l’organigramme doit suivre les profils");
if (!/org-tier-offices[\s\S]*?org-connector-regional[\s\S]*?org-tier-regional/.test(teamHtml)) errors.push("pages/equipe.html: la Coordination régionale doit suivre les six bureaux");
for (const officeHolder of ["Rév. Père Gardy Maisonneuve", "Sébastien Estinvil", "Evens Chérfrère"]) {
  if (!teamHtml.includes(officeHolder)) errors.push(`pages/equipe.html: titulaire absent de l’organigramme (${officeHolder})`);
}

const publicationsHtml = await readFile(resolve(root, "pages/publications.html"), "utf8");
if (!publicationsHtml.includes("data-document-reader") || !publicationsHtml.includes("data-reader-pages")) errors.push("pages/publications.html: lecteur PDF intégré absent");
if ((publicationsHtml.match(/data-document-open/g) || []).length !== documents.length) errors.push("pages/publications.html: chaque publication doit ouvrir le lecteur PDF");
if (/data-document-open[^>]*target="_blank"|data-document-open[^>]*href=/i.test(publicationsHtml)) errors.push("pages/publications.html: un document quitte encore le site à l’ouverture");
for (const pdfAsset of ["assets/vendor/pdfjs/pdf.min.mjs", "assets/vendor/pdfjs/pdf.worker.min.mjs"]) {
  try { await access(resolve(root, pdfAsset)); } catch { errors.push(`Lecteur PDF: dépendance absente (${pdfAsset})`); }
}

const donationHtml = await readFile(resolve(root, "pages/donation.html"), "utf8");
if (!donationHtml.includes('data-page="donation"')) errors.push("pages/donation.html: identité de page absente");
if ((donationHtml.match(/class="[^"]*payment-method-button/g) || []).length !== 6) errors.push("pages/donation.html: six boutons de paiement et contact sont requis");
if ((donationHtml.match(/data-payment-dialog/g) || []).length !== 6) errors.push("pages/donation.html: chaque bouton doit disposer de sa propre fenêtre");
if ((donationHtml.match(/data-payment-open=/g) || []).length !== 6 || (donationHtml.match(/data-payment-close/g) || []).length !== 6) errors.push("pages/donation.html: commandes des fenêtres de paiement incomplètes");
if ((donationHtml.match(/href="contact-finance\.html\?type=/g) || []).length !== 2) errors.push("pages/donation.html: les deux fenêtres alternatives doivent proposer le contact financier");
if (/href="https?:\/\/[^\"]*(?:stripe|moncash|natcash)/i.test(donationHtml)) errors.push("pages/donation.html: canal de paiement actif avant validation");
for (const logo of ["moncash.webp", "natcash.webp"]) {
  if (!donationHtml.includes(`assets/payment-methods/${logo}`)) errors.push(`pages/donation.html: logo de paiement absent (${logo})`);
}
if ((donationHtml.match(/payment-icon-card/g) || []).length !== 4) errors.push("pages/donation.html: symbole de carte bancaire absent des boutons ou fenêtres");

const financeHtml = await readFile(resolve(root, "pages/contact-finance.html"), "utf8");
if (!financeHtml.includes("data-finance-form") || !financeHtml.includes("data-finance-status")) errors.push("pages/contact-finance.html: formulaire ou statut accessible absent");
if (/name="(?:card|cardNumber|cvc|cvv|expiry)"/i.test(financeHtml)) errors.push("pages/contact-finance.html: donnée bancaire interdite dans le formulaire");
if (!financeHtml.includes('aria-live="polite"')) errors.push("pages/contact-finance.html: annonce accessible absente");

for (const document of documents) {
  try { await access(resolve(root, document.file)); } catch { errors.push(`PDF absent: ${document.file}`); }
}

for (const file of ["robots.txt", "sitemap.xml", "manifest.webmanifest", "service-worker.js", "404.html", "offline.html", ".nojekyll", ".github/workflows/frontend-quality.yml"]) {
  try { await access(resolve(root, file)); } catch { errors.push(`Fichier système absent: ${file}`); }
}

const manifest = JSON.parse(await readFile(resolve(root, "manifest.webmanifest"), "utf8"));
if (!manifest.id || !manifest.scope || !manifest.start_url) errors.push("Manifest: id, scope ou start_url absent");
if (!manifest.icons?.some((icon) => icon.purpose?.includes("maskable"))) errors.push("Manifest: icône maskable absente");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validation réussie: ${referenceKeys.length} clés trilingues, HTML accessible, liens, assets, SEO/PWA/CI et ${documents.length} PDF vérifiés.`);
