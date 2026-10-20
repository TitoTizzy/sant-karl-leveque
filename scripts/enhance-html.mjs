import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { areas, areaSlugs, documents, documentMetadata, news } from "../js/content-data.js";
import { translations } from "../js/translations.js";
import { organization, territories, people, executiveOffices, methodology, partners, achievements } from "../js/institution-data.js";

const rootUrl = "https://titotizzy.github.io/sant-karl-leveque/";
const assetVersion = "20261020-pdf-direct-load-v12";
const socialImages = {
  "pages/equipe.html": ["honneur-citoyen-pensacola.webp", "Équipe et direction de Sant Karl Lévêque"],
  "pages/directeur.html": ["honneur-citoyen-pensacola.webp", "Direction exécutive de Sant Karl Lévêque"],
  "pages/interventions.html": ["equipe-chantier-urbain.webp", "Intervention communautaire de Sant Karl Lévêque"],
  "pages/droits-humains.html": ["equipe-chantier-urbain.webp", "Action de terrain pour les droits humains"],
  "pages/acces-justice.html": ["equipe-chantier-urbain.webp", "Action de terrain pour l’accès à la justice"],
  "pages/protection-enfance.html": ["equipe-chantier-urbain.webp", "Action communautaire pour la protection de l’enfance"],
  "pages/migration-deplaces.html": ["equipe-chantier-urbain.webp", "Soutien communautaire aux personnes déplacées"],
  "pages/sante-communautaire.html": ["equipe-chantier-urbain.webp", "Action de santé communautaire"],
  "pages/actions.html": ["operation-nettoyage-soleil.webp", "Action communautaire menée par Sant Karl Lévêque"],
  "pages/publications.html": ["allocution-officielle-miami.webp", "Publications et prises de position de Sant Karl Lévêque"],
  "pages/contact.html": ["discours-podium-miami.webp", "Prise de parole institutionnelle de Sant Karl Lévêque"],
  "pages/soutenir.html": ["discours-podium-miami.webp", "Soutenir les actions de Sant Karl Lévêque"],
  "pages/donation.html": ["discours-podium-miami.webp", "Faire un don à Sant Karl Lévêque"],
  "pages/contact-finance.html": ["allocution-officielle-miami.webp", "Contacter le service financier de Sant Karl Lévêque"]
};
const pageLabels = {
  home: ["Accueil", "home"], about: ["Qui nous sommes", "navWho"], heritage: ["Notre héritage", "navHeritage"],
  mission: ["Mission et vision", "navMission"], director: ["Mot du Directeur", "navDirector"], team: ["Équipe", "navTeam"],
  areas: ["Domaines d'intervention", "navAreas"], news: ["Actions & réalisations", "navActions"], docs: ["Actualités & publications", "navNews"],
  contact: ["Contact & implication", "navContact"], support: ["Soutenir SKL", "donate"], donation: ["Faire un don", "donationEyebrow"], "finance-contact": ["Contact financier", "financeEyebrow"],
  legal: ["Mentions légales", "legalTitle"], privacy: ["Confidentialité", "privacyTitle"], accessibility: ["Accessibilité", "accessibilityTitle"]
};
const sequences = {
  heritage: [null, ["mission-vision.html", "navMission"]], mission: [["heritage.html", "navHeritage"], ["directeur.html", "navDirector"]],
  director: [["mission-vision.html", "navMission"], ["equipe.html", "navTeam"]], team: [["directeur.html", "navDirector"], null],
  support: [null, ["donation.html", "donationEyebrow"]], donation: [["soutenir.html", "donate"], ["contact-finance.html", "financeEyebrow"]], "finance-contact": [["donation.html", "donationEyebrow"], null]
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
areaSlugs.forEach((slug, index) => {
  sequences[`area-${index}`] = [index ? [areaSlugs[index - 1], areas[index - 1][1]] : null, index < areaSlugs.length - 1 ? [areaSlugs[index + 1], areas[index + 1][1]] : null];
});

function shellHeader(base) {
  return `<header class="site-header" data-site-header><div class="topbar"><p>Unis pour défendre, engagés pour changer</p><div class="topbar-actions"><a href="${base}pages/publications.html">Centre de documentation</a><span>Français</span></div></div><nav class="navbar" aria-label="Navigation principale"><a class="brand" href="${rootUrl}"><img src="${base}assets/skl-logo-160.webp" alt="Logo Sant Karl Lévêque SKL" width="160" height="103"><span>Sant Karl Lévêque</span></a><ul class="nav-menu static-menu"><li><a href="${base}pages/about.html">Qui nous sommes</a></li><li><a href="${base}pages/interventions.html">Domaines d'intervention</a></li><li><a href="${base}pages/actions.html">Actions & réalisations</a></li><li><a href="${base}pages/publications.html">Actualités & publications</a></li><li><a href="${base}pages/contact.html">Contact & implication</a></li><li><a class="btn btn-primary" href="${base}pages/soutenir.html">Soutenir SKL</a></li></ul></nav></header>`;
}

function shellFooter(base) {
  return `<footer class="site-footer" data-site-footer><div><h2>Sant Karl Lévêque (SKL)</h2><p>${translations.fr.footerText}</p></div><nav aria-label="Navigation secondaire"><h3>Navigation</h3><a href="${base}pages/about.html">Qui nous sommes</a><a href="${base}pages/interventions.html">Domaines d'intervention</a><a href="${base}pages/actions.html">Actions & réalisations</a><a href="${base}pages/publications.html">Publications</a></nav><div><h3>Ressources</h3><a href="${base}pages/mentions-legales.html">Mentions légales</a><a href="${base}pages/confidentialite.html">Confidentialité</a><a href="${base}pages/accessibilite.html">Accessibilité</a></div><address><h3>Contact</h3><span data-i18n="officialAddress">${organization.address.fr}</span><a href="mailto:${organization.email}">${organization.email}</a><span data-i18n="officialHours">${organization.hours.fr}</span></address></footer>`;
}

function areasMarkup(base) {
  return areas.map(([abbr, key, text], index) => `<a class="area-card" href="${base}pages/${areaSlugs[index]}"><div class="icon-box" aria-hidden="true">${abbr}</div><h3>${translations.fr[key]}</h3><p>${text.fr}</p><span class="card-link" aria-hidden="true">→</span></a>`).join("");
}

function newsMarkup(items) {
  return items.map((item) => { const date = typeof item.date === "object" ? item.date.fr : item.date; return `<article class="news-card"><div class="news-thumb"><span class="tag">${date}</span></div><div class="news-body"><h3>${item.title.fr}</h3><p>${item.text.fr}</p></div></article>`; }).join("");
}

function peopleMarkup(base) {
  return people.map((person, index) => `<article class="profile-card">${person.image ? `<picture class="profile-photo"><source type="image/webp" srcset="${base}assets/gardy-maisonneuve-480.webp 480w, ${base}${person.image} 1214w" sizes="180px"><img src="${base}assets/gardy-maisonneuve.png" alt="Portrait du Rév. Père Gardy Maisonneuve" width="1214" height="1296" loading="lazy"></picture>` : `<div class="profile-initials" aria-hidden="true">${person.initials}</div>`}<div><p class="profile-role">${person.role.fr}</p><h2>${person.name}</h2><p>${person.bio.fr}</p>${index === 0 ? `<a class="text-link" href="directeur.html">Lire le message complet</a>` : ""}</div></article>`).join("");
}

function organizationMarkup() {
  const node = ([abbr, label, occupant], level) => {
    const person = occupant?.name || translations.fr.orgUnpublished;
    const initials = occupant?.initials || "SKL";
    return `<button class="org-node org-node-${level}" type="button" aria-label="${label.fr} — ${translations.fr.orgCurrentHolder}: ${person}"><span class="org-node-top"><span class="org-code">${abbr}</span><span class="org-status" aria-hidden="true"></span></span><strong class="org-role">${label.fr}</strong><span class="org-person"><span class="org-avatar" aria-hidden="true">${initials}</span><span><small>${translations.fr.orgCurrentHolder}</small><b>${person}</b></span></span></button>`;
  };
  return `<div class="org-tier org-tier-director">${node(executiveOffices[0], "director")}</div><span class="org-connector org-connector-vertical" aria-hidden="true"></span><div class="org-tier org-tier-secretariat">${node(executiveOffices[1], "secretariat")}</div><span class="org-connector org-connector-branches" aria-hidden="true"></span><div class="org-tier org-tier-offices">${executiveOffices.slice(2, 8).map((office) => node(office, "office")).join("")}</div><span class="org-connector org-connector-regional" aria-hidden="true"></span><div class="org-tier org-tier-regional">${node(executiveOffices[8], "regional")}</div>`;
}

function organizationPromoMarkup() {
  return `<!-- generated:organization-promo:start --><section class="section org-promo-section" aria-labelledby="org-promo-title"><div class="org-promo"><div class="org-promo-visual" aria-hidden="true"><span class="org-promo-node org-promo-node-director">DE</span><span class="org-promo-line"></span><span class="org-promo-node org-promo-node-secretariat">SG</span><span class="org-promo-branches"><i></i><i></i><i></i><i></i><i></i><i></i></span><span class="org-promo-regional-line"></span><span class="org-promo-node org-promo-node-regional">CBR</span></div><div class="org-promo-copy"><p class="eyebrow" data-i18n="governanceEyebrow">${translations.fr.governanceEyebrow}</p><h2 id="org-promo-title" data-i18n="governanceTitle">${translations.fr.governanceTitle}</h2><p data-i18n="governanceLead">${translations.fr.governanceLead}</p></div><button class="btn btn-primary org-launch" type="button" data-org-open><span class="org-launch-mark" aria-hidden="true"></span><span data-i18n="viewOrganization">${translations.fr.viewOrganization}</span></button></div></section><!-- generated:organization-promo:end -->`;
}

function methodologyMarkup() {
  return methodology.map((step, index) => `<article class="method-card"><span>0${index + 1}</span><h3>${step.title.fr}</h3><p>${step.text.fr}</p></article>`).join("");
}

function territoriesMarkup() {
  return territories.map((territory) => `<li><strong>${territory.region.fr}</strong><span>${territory.places}</span></li>`).join("");
}

function achievementsMarkup() {
  return achievements.map((item, index) => `<li><span>${String(index + 1).padStart(2, "0")}</span><p>${item.fr}</p></li>`).join("");
}

function institutionProfileMarkup() {
  return `<article><span>${translations.fr.foundedLabel}</span><strong>${organization.founded}</strong></article><article><span>${translations.fr.contactAddress}</span><strong>${organization.address.fr}</strong></article><article><span>${translations.fr.contactEmail}</span><a href="mailto:${organization.email}">${organization.email}</a></article><article><span>${translations.fr.contactHours}</span><strong>${organization.hours.fr}</strong></article>`;
}

function docsMarkup(base) {
  return documents.map((doc) => { const meta = documentMetadata[doc.file]; const date = typeof doc.year === "object" ? doc.year.fr : doc.year; return `<article class="doc-card"><div><span class="doc-type"><time${meta.date ? ` datetime="${meta.date}"` : ""}>${date}</time></span><h3>${doc.title.fr}</h3><p class="doc-meta">${doc.text.fr}</p><p class="doc-facts">PDF · ${Math.round(meta.size / 1024)} KB · FR · ${meta.pages} pages</p></div><div class="doc-actions"><button class="btn btn-secondary" type="button" data-document-open data-document-src="${base}${doc.file}" data-document-title="${escapeHtml(doc.title.fr)}">Ouvrir</button><a class="btn btn-primary" href="${base}${doc.file}" download>Télécharger</a></div></article>`; }).join("");
}

const indexedPages = [];
for await (const file of glob(["*.html", "pages/*.html"])) {
  let html = await readFile(file, "utf8");
  html = html.replace(/css\/styles\.css(?:\?v=[^\"]+)?/g, `css/styles.css?v=${assetVersion}`).replace(/js\/app\.js(?:\?v=[^\"]+)?/g, `js/app.js?v=${assetVersion}`);
  const relative = file.replaceAll("\\", "/");
  const base = relative.startsWith("pages/") ? "../" : "";
  const canonical = relative === "index.html" ? rootUrl : new URL(relative, rootUrl).href;
  if (!relative.endsWith("offline.html") && !relative.endsWith("404.html")) indexedPages.push(canonical);
  const description = html.match(/<meta name="description" content="([^"]*)">/)?.[1] || translations.fr.footerText;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || "Sant Karl Lévêque - SKL";
  const [socialImage, socialAlt] = socialImages[relative] || ["rassemblement-rue-urbaine.webp", "Mobilisation citoyenne pour les droits humains en Haïti"];
  const socialImageUrl = `${rootUrl}assets/photos-4k/${socialImage}`;
  const robots = relative === "404.html" || relative === "offline.html" ? '<meta name="robots" content="noindex, nofollow">' : "";
  const preload = relative === "index.html" ? `<link rel="preload" as="image" href="assets/photos-4k/rassemblement-rue-urbaine-960.webp" imagesrcset="assets/photos-4k/rassemblement-rue-urbaine-640.webp 640w, assets/photos-4k/rassemblement-rue-urbaine-960.webp 960w, assets/photos-4k/rassemblement-rue-urbaine.webp 1448w" imagesizes="100vw" fetchpriority="high">` : "";
  const seo = `<!-- generated:seo -->${robots}${preload}<link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="fr" href="${canonical}?lang=fr"><link rel="alternate" hreflang="ht" href="${canonical}?lang=ht"><link rel="alternate" hreflang="en" href="${canonical}?lang=en"><link rel="alternate" hreflang="x-default" href="${canonical}"><link rel="icon" href="${base}assets/icons/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="${base}assets/icons/apple-touch-icon.png"><link rel="manifest" href="${base}manifest.webmanifest"><meta name="theme-color" content="#063b63"><meta property="og:type" content="website"><meta property="og:site_name" content="Sant Karl Lévêque"><meta property="og:locale" content="fr_HT"><meta property="og:locale:alternate" content="ht_HT"><meta property="og:locale:alternate" content="en_US"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${socialImageUrl}"><meta property="og:image:width" content="1448"><meta property="og:image:height" content="1086"><meta property="og:image:alt" content="${socialAlt}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${socialImageUrl}"><meta name="twitter:image:alt" content="${socialAlt}"><script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "NGO", name: organization.legalName, alternateName: "SKL", foundingDate: String(organization.founded), url: rootUrl, logo: `${rootUrl}assets/skl-logo.webp`, email: organization.email, address: { "@type": "PostalAddress", streetAddress: "68, Faustin 1er", addressLocality: "Delmas 75", addressCountry: "HT" }, areaServed: territories.map((territory) => territory.region.fr), sameAs: [] })}</script><!-- /generated:seo -->`;
  html = html.replace(/<!-- generated:seo -->[\s\S]*?<!-- \/generated:seo -->/, "").replace("</head>", `${seo}</head>`);
  html = html.replace(/<header class="site-header" data-site-header>[\s\S]*?<\/header>/, shellHeader(base));
  html = html.replace(/<footer([^>]*)class="site-footer"([^>]*)data-site-footer([^>]*)>[\s\S]*?<\/footer>/, shellFooter(base));
  html = html.replace(/<div class="intervention-grid" data-render="areas">[\s\S]*?<\/section>/, `<div class="intervention-grid" data-render="areas">${areasMarkup(base)}</div></section>`);
  html = html.replace(/<div class="news-grid" data-render="featured-news">[\s\S]*?<\/section>/, `<div class="news-grid" data-render="featured-news">${newsMarkup(news.slice(0, 3))}</div></section>`);
  html = html.replace(/<div class="news-grid" data-render="news">[\s\S]*?<\/section>/, `<div class="news-grid" data-render="news">${newsMarkup(news)}</div></section>`);
  html = html.replace(/<div class="document-list" data-render="documents">[\s\S]*?<\/section>/, `<div class="document-list" data-render="documents">${docsMarkup(base)}</div></section>`);
  html = html.replace(/<div class="profile-list" data-render="people">[\s\S]*?<\/section>/, `<div class="profile-list" data-render="people">${peopleMarkup(base)}</div></section>`);
  html = html.replace(/<!-- generated:organization:start -->[\s\S]*?<!-- generated:organization:end -->/, `<!-- generated:organization:start --><div class="organization-chart" data-render="organization">${organizationMarkup()}</div><!-- generated:organization:end -->`);
  if (relative === "pages/equipe.html") {
    html = html.replace(/<div class="section-heading team-section-heading"><div>([\s\S]*?)<\/div><button class="btn btn-primary org-launch"[\s\S]*?<\/button><\/div>/, '<div class="section-heading">$1</div>');
    html = html.replace(/<!-- generated:organization-promo:start -->[\s\S]*?<!-- generated:organization-promo:end -->/, "");
    html = html.replace('<dialog class="org-dialog"', `${organizationPromoMarkup()}<dialog class="org-dialog"`);
  }
  html = html.replace(/<div class="method-grid" data-render="methodology">[\s\S]*?<\/section>/, `<div class="method-grid" data-render="methodology">${methodologyMarkup()}</div></section>`);
  html = html.replace(/<ul class="territory-list" data-render="territories">[\s\S]*?<\/ul>/, `<ul class="territory-list" data-render="territories">${territoriesMarkup()}</ul>`);
  html = html.replace(/<div class="partner-strip" data-render="partners">[\s\S]*?<\/div>/, `<div class="partner-strip" data-render="partners">${partners.map((partner) => `<span>${typeof partner === "object" ? partner.fr : partner}</span>`).join("")}</div>`);
  html = html.replace(/<ol class="achievement-list" data-render="achievements">[\s\S]*?<\/ol>/, `<ol class="achievement-list" data-render="achievements">${achievementsMarkup()}</ol>`);
  html = html.replace(/<div class="institutional-facts" data-render="institution-profile">[\s\S]*?<\/div>/, `<div class="institutional-facts" data-render="institution-profile">${institutionProfileMarkup()}</div>`);

  if (file !== "index.html") {
    const page = html.match(/data-page="([^"]+)"/)?.[1] || "home";
    const areaIndex = html.match(/data-area="(\d+)"/)?.[1];
    const [label, key] = page === "area" ? [translations.fr[areas[Number(areaIndex)][1]], areas[Number(areaIndex)][1]] : (pageLabels[page] || [title, ""]);
    const crumb = `<nav class="breadcrumb" aria-label="Fil d’Ariane" data-i18n-aria-label="breadcrumbLabel"><ol><li><a href="${base}index.html" data-i18n="home">Accueil</a></li><li aria-current="page"${key ? ` data-i18n="${key}"` : ""}>${label}</li></ol></nav>`;
    html = html.replace(/<nav class="breadcrumb"[\s\S]*?<\/nav>/, "").replace("</header>", `</header>${crumb}`);
    const sequence = page === "area" ? sequences[`area-${areaIndex}`] : sequences[page];
    html = html.replace(/<nav class="page-navigation"[\s\S]*?<\/nav>/, "");
    if (sequence) {
      const nav = `<nav class="page-navigation" aria-label="Pages connexes">${sequence[0] ? `<a href="${sequence[0][0]}"><span data-i18n="previousPage">Page précédente</span><strong data-i18n="${sequence[0][1]}">${translations.fr[sequence[0][1]]}</strong></a>` : "<span></span>"}${sequence[1] ? `<a href="${sequence[1][0]}"><span data-i18n="nextPage">Page suivante</span><strong data-i18n="${sequence[1][1]}">${translations.fr[sequence[1][1]]}</strong></a>` : ""}</nav>`;
      html = html.replace("</main>", `${nav}</main>`);
    }
  }
  const translateStatic = {
    "pages/mentions-legales.html": [
      ["<p class=\"eyebrow\">Informations institutionnelles</p>", "<p class=\"eyebrow\" data-i18n=\"legalInfo\">Informations institutionnelles</p>"],
      ["<h1>Mentions légales</h1>", "<h1 data-i18n=\"legalTitle\">Mentions légales</h1>"],
      ["<p>Informations relatives à l’édition et à l’utilisation du site de Sant Karl Lévêque.</p>", "<p data-i18n=\"legalLead\">Informations relatives à l’édition et à l’utilisation du site de Sant Karl Lévêque.</p>"],
      ["<h2>Éditeur du site</h2>", "<h2 data-i18n=\"legalPublisherTitle\">Éditeur du site</h2>"],
      ["<p>Le présent site est édité par Sant Karl Lévêque (SKL), organisation haïtienne de défense et de promotion des droits humains.</p>", "<p data-i18n=\"legalPublisherText\">Le présent site est édité par Sant Karl Lévêque (SKL), organisation haïtienne de défense et de promotion des droits humains.</p>"],
      ["<h2>Responsabilité éditoriale</h2>", "<h2 data-i18n=\"legalEditorialTitle\">Responsabilité éditoriale</h2>"],
      ["<p>Rév. Père Gardy Maisonneuve, Directeur Exécutif. Contact : <a href=\"mailto:reverendperegmaisonneuve@gmail.com\">reverendperegmaisonneuve@gmail.com</a>.</p>", `<p><span data-i18n="legalEditorialText">Rév. Père Gardy Maisonneuve, Directeur Exécutif.</span> <a href="mailto:${organization.email}">${organization.email}</a></p>`],
      ["<h2>Propriété intellectuelle</h2>", "<h2 data-i18n=\"legalIpTitle\">Propriété intellectuelle</h2>"],
      ["<p>Les textes, publications, images et éléments d’identité visuelle demeurent la propriété de leurs titulaires respectifs. Toute réutilisation doit faire l’objet d’une autorisation préalable.</p>", "<p data-i18n=\"legalIpText\">Les textes, publications, images et éléments d’identité visuelle demeurent la propriété de leurs titulaires respectifs. Toute réutilisation doit faire l’objet d’une autorisation préalable.</p>"],
      ["<h2>Limitation de responsabilité</h2>", "<h2 data-i18n=\"legalLiabilityTitle\">Limitation de responsabilité</h2>"],
      ["<p>SKL s’efforce de maintenir des informations exactes et accessibles. Les documents PDF publiés constituent les versions de référence pour leur contenu.</p>", "<p data-i18n=\"legalLiabilityText\">SKL s’efforce de maintenir des informations exactes et accessibles. Les documents PDF publiés constituent les versions de référence pour leur contenu.</p>"]
    ],
    "pages/confidentialite.html": [
      ["<p class=\"eyebrow\">Protection des visiteurs</p>", "<p class=\"eyebrow\" data-i18n=\"privacyEyebrow\">Protection des visiteurs</p>"], ["<h1>Confidentialité</h1>", "<h1 data-i18n=\"privacyTitle\">Confidentialité</h1>"], ["<p>Une présentation transparente des données utilisées par ce site.</p>", "<p data-i18n=\"privacyLead\">Une présentation transparente des données utilisées par ce site.</p>"],
      ["<h2>Données enregistrées</h2>", "<h2 data-i18n=\"privacyDataTitle\">Données enregistrées</h2>"], ["<p>Ce front-end ne comporte ni compte utilisateur, ni formulaire, ni outil d’analyse. Il mémorise uniquement la langue choisie dans le stockage local de votre navigateur.</p>", "<p data-i18n=\"privacyDataText\">Ce front-end ne comporte ni compte utilisateur, ni formulaire, ni outil d’analyse. Il mémorise uniquement la langue choisie dans le stockage local de votre navigateur.</p>"], ["<h2>Liens de contact</h2>", "<h2 data-i18n=\"privacyLinksTitle\">Liens de contact</h2>"], ["<p>Les liens de courriel et de téléphone ouvrent les applications configurées sur votre appareil. Aucune donnée saisie n’est collectée par ce site.</p>", "<p data-i18n=\"privacyLinksText\">Les liens de courriel et de téléphone ouvrent les applications configurées sur votre appareil. Aucune donnée saisie n’est collectée par ce site.</p>"], ["<h2>Documents téléchargés</h2>", "<h2 data-i18n=\"privacyDocsTitle\">Documents téléchargés</h2>"], ["<p>Les publications sont servies sous forme de fichiers PDF. Leur consultation ou leur téléchargement ne nécessite aucune identification.</p>", "<p data-i18n=\"privacyDocsText\">Les publications sont servies sous forme de fichiers PDF. Leur consultation ou leur téléchargement ne nécessite aucune identification.</p>"]
    ],
    "pages/accessibilite.html": [
      ["<p class=\"eyebrow\">Accès pour toutes et tous</p>", "<p class=\"eyebrow\" data-i18n=\"accessibilityEyebrow\">Accès pour toutes et tous</p>"], ["<h1>Accessibilité numérique</h1>", "<h1 data-i18n=\"accessibilityTitle\">Accessibilité numérique</h1>"], ["<p>SKL souhaite rendre ses informations consultables par le plus grand nombre.</p>", "<p data-i18n=\"accessibilityLead\">SKL souhaite rendre ses informations consultables par le plus grand nombre.</p>"], ["<h2>Mesures intégrées</h2>", "<h2 data-i18n=\"accessibilityMeasuresTitle\">Mesures intégrées</h2>"], ["<p>Le site propose une navigation au clavier, des indicateurs de focus visibles, des textes alternatifs, des contrôles tactiles adaptés, une réduction des animations selon les préférences du système et un style d’impression.</p>", "<p data-i18n=\"accessibilityMeasuresText\">Le site propose une navigation au clavier, des indicateurs de focus visibles, des textes alternatifs, des contrôles tactiles adaptés, une réduction des animations selon les préférences du système et un style d’impression.</p>"], ["<h2>Signaler une difficulté</h2>", "<h2 data-i18n=\"accessibilityReportTitle\">Signaler une difficulté</h2>"], ["<p>Pour signaler un obstacle d’accès, écrivez à <a href=\"mailto:reverendperegmaisonneuve@gmail.com\">reverendperegmaisonneuve@gmail.com</a> en précisant la page et le problème rencontré.</p>", `<p><span data-i18n="accessibilityReportText">Pour signaler un obstacle d’accès, écrivez-nous en précisant la page et le problème rencontré.</span> <a href="mailto:${organization.email}">${organization.email}</a></p>`]
    ]
  };
  for (const [from, to] of translateStatic[relative] || []) html = html.replace(from, to);
  html = html.replace(/<([a-z][\w-]*)([^>]*\sdata-i18n="([^"]+)"[^>]*)>([^<]*)<\/\1>/gi, (match, tag, attributes, key) => {
    const value = translations.fr[key];
    return value === undefined ? match : `<${tag}${attributes}>${escapeHtml(value)}</${tag}>`;
  });
  html = html
    .replaceAll("reverendperegmaisonneuve@gmail.com", organization.email)
    .replaceAll("estinviljnbsebastien@gmail.com", organization.email);
  await writeFile(file, html, "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexedPages.sort().map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile("sitemap.xml", sitemap, "utf8");
