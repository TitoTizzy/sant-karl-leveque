# Audit d’accessibilité WCAG 2.2 - Front-end SKL

Date : 1er octobre 2026  
Périmètre : accueil, pages institutionnelles, domaines d’intervention, actions, centre documentaire, contact, soutien et pages légales.

## Niveau visé

WCAG 2.2 niveau AA pour le front-end statique.

## Contrôles effectués

- Structure sémantique : un seul `h1` par page, hiérarchie de titres, régions `header`, `nav`, `main` et `footer`.
- Navigation clavier : lien d’évitement, menus et sous-menus utilisables au clavier, fermeture avec `Escape`, ordre de tabulation logique.
- Focus visible : contour jaune à fort contraste avec anneau sombre sur les éléments interactifs.
- Cibles tactiles : contrôles principaux et sous-menus d’au moins 44 × 44 px.
- Images : textes alternatifs, dimensions explicites, chargement différé hors image principale.
- Adaptation : absence de défilement horizontal à 390 px et 1366 px; menu mobile sous 1240 px.
- Mouvement : prise en charge de `prefers-reduced-motion`.
- Langue : attribut `lang` dynamique et contenus français, kreyòl ayisyen et anglais alignés.
- Formulaires : étiquettes visibles, groupes de filtres nommés et résultats annoncés avec `aria-live`.
- Liens : libellés explicites, états actifs avec `aria-current`, fils d’Ariane et navigation entre pages connexes.
- Documents : format, taille, langue et pagination affichés; actions Ouvrir et Télécharger distinctes.
- Impression : suppression des éléments de navigation et mise en page lisible sur papier.
- Zoom et responsive : mise en page fluide, textes non tronqués et contrôles conservant leur dimension.

## Corrections intégrées

- Renforcement du contraste du focus.
- Stabilisation des menus au survol, au clavier et au toucher.
- Agrandissement du sélecteur de langue et des boutons de sous-menu.
- Ajout de messages de résultats et d’état vide accessibles.
- Ajout de textes alternatifs et de variantes d’images responsives.
- Traduction des libellés d’interface et des pages légales.
- Ajout d’une page d’accessibilité avec canal de signalement.

## Vérification continue

`npm run build` contrôle les clés de traduction, les liens et assets locaux, les métadonnées, les titres de page, les anciennes routes, les PDF et les duplications de pré-rendu.

## Limite de l’audit

La conformité technique a été vérifiée sur le front-end et dans les navigateurs ciblés. Une déclaration de conformité officielle devrait être complétée par des essais avec lecteurs d’écran réels et des utilisateurs en situation de handicap.
