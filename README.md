# Sant Karl Lévêque - Site institutionnel

Front-end statique trilingue de SANT KARL LÉVÊQUE (SKL), organisation haïtienne de défense et de promotion des droits humains.

## Structure

- `index.html` : accueil institutionnel.
- `pages/` : une page HTML distincte par sujet, y compris les cinq domaines d’intervention et les pages légales.
- `css/styles.css` : design system, navigation, composants, responsive et impression.
- `js/app.js` : interactions, navigation, filtres et changement de langue.
- `js/translations.js` : textes français, kreyòl ayisyen et anglais.
- `js/content-data.js` : domaines, actualités, galerie et catalogue documentaire.
- `assets/docs/` : publications PDF officielles.
- `assets/photos-4k/` : images originales et variantes WebP responsives.
- `scripts/` : optimisation des images, pré-rendu HTML et validation automatique.
- `docs/wcag-2.2-audit.md` : audit d’accessibilité front-end et contrôles réalisés.

## Développement local

```bash
npm run start
```

Le site est ensuite accessible sur l’adresse indiquée par le serveur. Les langues sont partageables avec `?lang=fr`, `?lang=ht` ou `?lang=en`.

## Construction et contrôles

```bash
npm run build
```

La commande vérifie la syntaxe JavaScript, pré-rend les composants essentiels, génère les métadonnées SEO et le sitemap, puis contrôle les traductions, liens, assets et PDF.

Pour régénérer les variantes WebP et les icônes après l’ajout d’une image :

```bash
npm run optimize:images
```

## Déploiement

Le site ne nécessite aucun backend. Il inclut `robots.txt`, `sitemap.xml`, une page `404.html`, un manifeste PWA léger, un service worker et une page hors connexion. L’URL canonique configurée est `https://titotizzy.github.io/sant-karl-leveque/`.
