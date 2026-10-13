# Sant Karl Lévêque - Site institutionnel

Front-end statique trilingue de SANT KARL LÉVÊQUE (SKL), organisation haïtienne de défense et de promotion des droits humains.

## Structure

- `index.html` : accueil institutionnel.
- `pages/` : une page HTML distincte par sujet, y compris les cinq domaines d’intervention et les pages légales.
- `css/styles.css` : design system, navigation, composants, responsive et impression.
- `js/app.js` : interactions, navigation, filtres et changement de langue.
- `js/translations.js` : textes français, kreyòl ayisyen et anglais.
- `js/content-data.js` : domaines, actualités, galerie et catalogue documentaire.
- `js/institution-data.js` : source unique pour l’année de fondation, les coordonnées officielles, l’équipe, l’organigramme, les territoires, la méthodologie, les partenaires et les résultats.
- `assets/docs/` : publications PDF officielles.
- `assets/photos-4k/` : images originales et variantes WebP responsives.
- `scripts/` : optimisation des images, pré-rendu HTML et validation automatique.
- `.github/workflows/frontend-quality.yml` : contrôle automatique du front-end à chaque push et pull request.
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

La commande vérifie la syntaxe JavaScript, pré-rend les composants essentiels, génère les métadonnées SEO et le sitemap, puis contrôle les traductions, liens, assets et PDF. Elle protège également les données institutionnelles validées : fondation en 1986, courriel général, absence de coordonnées personnelles et exclusion des références à la sécurité alimentaire.

Pour régénérer les variantes WebP et les icônes après l’ajout d’une image :

```bash
npm run optimize:images
```

## Déploiement

Le site ne nécessite aucun backend. Il inclut `robots.txt`, `sitemap.xml`, une page `404.html`, un manifeste PWA léger, un service worker, une page hors connexion et un contrôle continu GitHub Actions. L’URL canonique configurée est `https://titotizzy.github.io/sant-karl-leveque/`.
