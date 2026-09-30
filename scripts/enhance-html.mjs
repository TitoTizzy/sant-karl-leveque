import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { areas, areaSlugs, documents, documentMetadata, news } from "../js/content-data.js";
import { translations } from "../js/translations.js";

const rootUrl = "https://titotizzy.github.io/sant-karl-leveque/";
const pageLabels = {
  home: ["Accueil", "home"], about: ["Qui nous sommes", "navWho"], heritage: ["Notre héritage", "navHeritage"],
  mission: ["Mission et vision", "navMission"], director: ["Mot du Directeur", "navDirector"], team: ["Équipe", "navTeam"],
  areas: ["Domaines d'intervention", "navAreas"], news: ["Actions & réalisations", "navActions"], docs: ["Actualités & publications", "navNews"],
  contact: ["Contact & implication", "navContact"], support: ["Soutenir SKL", "donate"],
  legal: ["Mentions légales", "legalTitle"], privacy: ["Confidentialité", "privacyTitle"], accessibility: ["Accessibilité", "accessibilityTitle"]
};
const sequences = {
  heritage: [null, ["mission-vision.html", "navMission"]], mission: [["heritage.html", "navHeritage"], ["directeur.html", "navDirector"]],
  director: [["mission-vision.html", "navMission"], ["equipe.html", "navTeam"]], team: [["directeur.html", "navDirector"], null]
};
areaSlugs.forEach((slug, index) => {
  sequences[`area-${index}`] = [index ? [areaSlugs[index - 1], areas[index - 1][1]] : null, index < areaSlugs.length - 1 ? [areaSlugs[index + 1], areas[index + 1][1]] : null];
});

function shellHeader(base) {
  return `<header class="site-header" data-site-header><div class="topbar"><p>Unis pour défendre, engagés pour changer</p><div class="topbar-actions"><a href="${base}pages/publications.html">Centre de documentation</a><span>Français</span></div></div><nav class="navbar" aria-label="Navigation principale"><a class="brand" href="${base}index.html"><img src="${base}assets/skl-logo-160.webp" alt="Logo Sant Karl Lévêque SKL" width="160" height="103"><span>Sant Karl Lévêque</span></a><ul class="nav-menu static-menu"><li><a href="${base}pages/about.html">Qui nous sommes</a></li><li><a href="${base}pages/interventions.html">Domaines d'intervention</a></li><li><a href="${base}pages/actions.html">Actions & réalisations</a></li><li><a href="${base}pages/publications.html">Actualités & publications</a></li><li><a href="${base}pages/contact.html">Contact & implication</a></li><li><a class="btn btn-primary" href="${base}pages/soutenir.html">Soutenir SKL</a></li></ul></nav></header>`;
}

function shellFooter(base) {
  return `<footer class="site-footer" data-site-footer><div><h2>Sant Karl Lévêque (SKL)</h2><p>${translations.fr.footerText}</p></div><nav aria-label="Navigation secondaire"><h3>Navigation</h3><a href="${base}pages/about.html">Qui nous sommes</a><a href="${base}pages/interventions.html">Domaines d'intervention</a><a href="${base}pages/publications.html">Publications</a></nav><div><h3>Ressources</h3><a href="${base}pages/mentions-legales.html">Mentions légales</a><a href="${base}pages/confidentialite.html">Confidentialité</a><a href="${base}pages/accessibilite.html">Accessibilité</a></div><address><h3>Contact</h3><a href="tel:+50947051133">+509 4705-1133</a><a href="mailto:reverendperegmaisonneuve@gmail.com">reverendperegmaisonneuve@gmail.com</a></address></footer>`;
}

function areasMarkup(base) {
  return areas.map(([abbr, key, text], index) => `<a class="area-card" href="${base}pages/${areaSlugs[index]}"><div class="icon-box" aria-hidden="true">${abbr}</div><h3>${translations.fr[key]}</h3><p>${text.fr}</p><span class="card-link" aria-hidden="true">→</span></a>`).join("");
}

function newsMarkup(items) {
  return items.map((item) => `<article class="news-card"><div class="news-thumb"><span class="tag">${item.date.fr}</span></div><div class="news-body"><h3>${item.title.fr}</h3><p>${item.text.fr}</p></div></article>`).join("");
}

function docsMarkup(base) {
  return documents.map((doc) => { const meta = documentMetadata[doc.file]; const date = typeof doc.year === "object" ? doc.year.fr : doc.year; return `<article class="doc-card"><div><span class="doc-type"><time${meta.date ? ` datetime="${meta.date}"` : ""}>${date}</time></span><h3>${doc.title.fr}</h3><p class="doc-meta">${doc.text.fr}</p><p class="doc-facts">PDF · ${Math.round(meta.size / 1024)} KB · FR · ${meta.pages} pages</p></div><div class="doc-actions"><a class="btn btn-secondary" href="${base}${doc.file}">Ouvrir</a><a class="btn btn-primary" href="${base}${doc.file}" download>Télécharger</a></div></article>`; }).join("");
}

const indexedPages = [];
for await (const file of glob(["*.html", "pages/*.html"])) {
  let html = await readFile(file, "utf8");
  html = html.replace(/css\/styles\.css(?:\?v=[^\"]+)?/g, "css/styles.css?v=20261001-production").replace(/js\/app\.js(?:\?v=[^\"]+)?/g, "js/app.js?v=20261001-production");
  const relative = file.replaceAll("\\", "/");
  const base = relative.startsWith("pages/") ? "../" : "";
  const canonical = new URL(relative, rootUrl).href;
  if (!relative.endsWith("offline.html") && !relative.endsWith("404.html")) indexedPages.push(canonical);
  const description = html.match(/<meta name="description" content="([^"]*)">/)?.[1] || translations.fr.footerText;
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || "Sant Karl Lévêque - SKL";
  const seo = `<!-- generated:seo --><link rel="canonical" href="${canonical}"><link rel="alternate" hreflang="fr" href="${canonical}?lang=fr"><link rel="alternate" hreflang="ht" href="${canonical}?lang=ht"><link rel="alternate" hreflang="en" href="${canonical}?lang=en"><link rel="alternate" hreflang="x-default" href="${canonical}"><link rel="icon" href="${base}assets/icons/favicon-32.png" sizes="32x32"><link rel="apple-touch-icon" href="${base}assets/icons/apple-touch-icon.png"><link rel="manifest" href="${base}manifest.webmanifest"><meta name="theme-color" content="#063b63"><meta property="og:type" content="website"><meta property="og:site_name" content="Sant Karl Lévêque"><meta property="og:locale" content="fr_HT"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${rootUrl}assets/photos-4k/rassemblement-rue-urbaine.webp"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "NGO", name: "Sant Karl Lévêque", alternateName: "SKL", url: rootUrl, logo: `${rootUrl}assets/skl-logo.webp`, areaServed: "Haiti", sameAs: [] })}</script><!-- /generated:seo -->`;
  html = html.replace(/<!-- generated:seo -->[\s\S]*?<!-- \/generated:seo -->/, "").replace("</head>", `${seo}</head>`);
  html = html.replace(/<header class="site-header" data-site-header>[\s\S]*?<\/header>/, shellHeader(base));
  html = html.replace(/<footer([^>]*)class="site-footer"([^>]*)data-site-footer([^>]*)>[\s\S]*?<\/footer>/, shellFooter(base));
  html = html.replace(/<div class="intervention-grid" data-render="areas">[\s\S]*?<\/section>/, `<div class="intervention-grid" data-render="areas">${areasMarkup(base)}</div></section>`);
  html = html.replace(/<div class="news-grid" data-render="featured-news">[\s\S]*?<\/section>/, `<div class="news-grid" data-render="featured-news">${newsMarkup(news.slice(0, 3))}</div></section>`);
  html = html.replace(/<div class="news-grid" data-render="news">[\s\S]*?<\/section>/, `<div class="news-grid" data-render="news">${newsMarkup(news)}</div></section>`);
  html = html.replace(/<div class="document-list" data-render="documents">[\s\S]*?<\/section>/, `<div class="document-list" data-render="documents">${docsMarkup(base)}</div></section>`);

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
      ["<p>Rév. Père Gardy Maisonneuve, Directeur Exécutif. Contact : <a href=\"mailto:reverendperegmaisonneuve@gmail.com\">reverendperegmaisonneuve@gmail.com</a>.</p>", "<p><span data-i18n=\"legalEditorialText\">Rév. Père Gardy Maisonneuve, Directeur Exécutif.</span> <a href=\"mailto:reverendperegmaisonneuve@gmail.com\">reverendperegmaisonneuve@gmail.com</a></p>"],
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
      ["<p class=\"eyebrow\">Accès pour toutes et tous</p>", "<p class=\"eyebrow\" data-i18n=\"accessibilityEyebrow\">Accès pour toutes et tous</p>"], ["<h1>Accessibilité numérique</h1>", "<h1 data-i18n=\"accessibilityTitle\">Accessibilité numérique</h1>"], ["<p>SKL souhaite rendre ses informations consultables par le plus grand nombre.</p>", "<p data-i18n=\"accessibilityLead\">SKL souhaite rendre ses informations consultables par le plus grand nombre.</p>"], ["<h2>Mesures intégrées</h2>", "<h2 data-i18n=\"accessibilityMeasuresTitle\">Mesures intégrées</h2>"], ["<p>Le site propose une navigation au clavier, des indicateurs de focus visibles, des textes alternatifs, des contrôles tactiles adaptés, une réduction des animations selon les préférences du système et un style d’impression.</p>", "<p data-i18n=\"accessibilityMeasuresText\">Le site propose une navigation au clavier, des indicateurs de focus visibles, des textes alternatifs, des contrôles tactiles adaptés, une réduction des animations selon les préférences du système et un style d’impression.</p>"], ["<h2>Signaler une difficulté</h2>", "<h2 data-i18n=\"accessibilityReportTitle\">Signaler une difficulté</h2>"], ["<p>Pour signaler un obstacle d’accès, écrivez à <a href=\"mailto:reverendperegmaisonneuve@gmail.com\">reverendperegmaisonneuve@gmail.com</a> en précisant la page et le problème rencontré.</p>", "<p><span data-i18n=\"accessibilityReportText\">Pour signaler un obstacle d’accès, écrivez-nous en précisant la page et le problème rencontré.</span> <a href=\"mailto:reverendperegmaisonneuve@gmail.com\">reverendperegmaisonneuve@gmail.com</a></p>"]
    ]
  };
  for (const [from, to] of translateStatic[relative] || []) html = html.replace(from, to);
  await writeFile(file, html, "utf8");
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexedPages.sort().map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile("sitemap.xml", sitemap, "utf8");
