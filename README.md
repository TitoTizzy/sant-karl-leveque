# Sant Karl Leveque - Site institutionnel

Front-end statique pour l'organisation haitienne de defense des droits humains SANT KARL LEVEQUE (SKL).

## Structure

- `index.html` - accueil institutionnel
- `pages/` - toutes les pages secondaires, une route HTML par sujet
  - `about.html`, `heritage.html`, `mission-vision.html`, `directeur.html`, `equipe.html`
  - `interventions.html` et une page dediee pour chacun des six domaines
  - `actions.html`, `publications.html`, `contact.html`, `soutenir.html`
- `css/styles.css` - design system et composants
- `js/app.js` - shell partage, navigation accessible, multilinguisme et donnees dynamiques
- `assets/` - logo et documents PDF

## Lancer localement

Ouvrir directement `index.html` dans un navigateur, ou utiliser un serveur statique.

```bash
npm run build
```
