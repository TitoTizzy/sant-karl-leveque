import { access, readFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { translations } from "../js/translations.js";
import { documents } from "../js/content-data.js";
import { organization } from "../js/institution-data.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
if (organization.founded !== 1986) errors.push(`année de fondation incorrecte: ${organization.founded}`);
if (organization.email !== "santkarlleveque86@gmail.com") errors.push(`courriel institutionnel incorrect: ${organization.email}`);
const referenceKeys = Object.keys(translations.fr).sort();
for (const lang of ["ht", "en"]) {
  const keys = Object.keys(translations[lang]).sort();
  const missing = referenceKeys.filter((key) => !keys.includes(key));
  const extra = keys.filter((key) => !referenceKeys.includes(key));
  if (missing.length || extra.length) errors.push(`${lang}: clés manquantes [${missing}] / supplémentaires [${extra}]`);
}

for await (const relative of glob(["*.html", "pages/*.html"])) {
  const file = resolve(root, relative);
  const html = await readFile(file, "utf8");
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) errors.push(`${relative}: ${h1Count} H1`);
  if (!/<meta name="description"/.test(html) && relative !== "offline.html") errors.push(`${relative}: description absente`);
  if (!/<link rel="canonical"/.test(html)) errors.push(`${relative}: canonique absente`);
  if (!/<link rel="alternate" hreflang="fr"/.test(html)) errors.push(`${relative}: hreflang absent`);
  if (!/<meta property="og:title"/.test(html)) errors.push(`${relative}: Open Graph absent`);
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
  if (/news\.html|documentation\.html/.test(html)) errors.push(`${relative}: ancienne route détectée`);
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
  ["pages/equipe.html", "office-node", 9],
  ["pages/interventions.html", "method-card", 5],
  ["pages/actions.html", "achievement-list", 1],
  ["pages/contact.html", "territory-list", 1]
];
for (const [relative, marker, minimum] of institutionalChecks) {
  const html = await readFile(resolve(root, relative), "utf8");
  const count = (html.match(new RegExp(`class="[^"]*${marker}`, "g")) || []).length;
  if (count < minimum) errors.push(`${relative}: contenu institutionnel incomplet (${marker}: ${count}/${minimum})`);
}

for (const document of documents) {
  try { await access(resolve(root, document.file)); } catch { errors.push(`PDF absent: ${document.file}`); }
}

for (const file of ["robots.txt", "sitemap.xml", "manifest.webmanifest", "service-worker.js", "404.html", "offline.html"]) {
  try { await access(resolve(root, file)); } catch { errors.push(`Fichier système absent: ${file}`); }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validation réussie: ${referenceKeys.length} clés trilingues, liens, assets, SEO et ${documents.length} PDF vérifiés.`);
