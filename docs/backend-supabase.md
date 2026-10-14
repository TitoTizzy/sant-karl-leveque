# Backend Supabase de SKL

Ce dossier décrit le premier socle du backend éditorial et administratif. Le site public reste statique tant que la migration de ses contenus vers Supabase n’est pas engagée.

## Fonctions livrées dans la phase 1

- authentification Supabase par courriel et mot de passe ;
- rôles `super_admin`, `admin`, `editor`, `publisher` et `viewer` ;
- politiques Row Level Security sur toutes les tables publiques ;
- invitation, changement de rôle, suspension et suppression des comptes via une Edge Function ;
- journal d’audit des opérations sur les administrateurs ;
- schéma trilingue pour les contenus, documents, médias, équipe, organigramme et partenaires ;
- buckets publics avec écriture réservée aux rôles autorisés ;
- interface d’administration responsive sous `admin/` ;
- protection empêchant l’administration de fonctionner sur le domaine GitHub Pages public.

## 1. Créer le projet Supabase

Créer un projet Supabase pour SKL et conserver les secrets dans le gestionnaire de secrets approprié. Ne jamais ajouter la clé `service_role` au dépôt, à `admin/js/config.js` ou à un fichier servi au navigateur.

## 2. Appliquer la migration

Avec la CLI Supabase installée et le projet lié :

```bash
supabase link --project-ref VOTRE_REFERENCE
supabase db push
```

La migration `supabase/migrations/202610140001_initial_backend.sql` crée les tables, fonctions, triggers, buckets et politiques RLS.

## 3. Configurer Auth

Dans Supabase Dashboard :

1. désactiver les inscriptions publiques ;
2. définir `https://admin.santkarlleveque.com/` comme Site URL ;
3. ajouter l’URL locale utilisée en développement aux Redirect URLs ;
4. personnaliser le modèle de courriel d’invitation avec l’identité SKL ;
5. activer MFA pour les comptes à privilèges dès que les utilisateurs sont inscrits.

## 4. Créer le premier super administrateur

Créer manuellement le premier utilisateur dans Authentication > Users. Récupérer son UUID, puis exécuter dans SQL Editor :

```sql
update public.profiles
set role = 'super_admin', is_active = true, full_name = 'Nom du responsable'
where id = 'UUID_DU_COMPTE';
```

Cette opération d’amorçage est la seule création manuelle. Les comptes suivants sont invités depuis l’interface d’administration.

## 5. Déployer l’Edge Function

```bash
supabase functions deploy admin-users
supabase secrets set ADMIN_SITE_URL=https://admin.santkarlleveque.com
```

Les variables `SUPABASE_URL`, `SUPABASE_ANON_KEY` et `SUPABASE_SERVICE_ROLE_KEY` sont fournies automatiquement aux Edge Functions hébergées par Supabase. La fonction vérifie la session et le rôle `super_admin` avant toute opération privilégiée.

## 6. Connecter l’interface

Renseigner uniquement les valeurs publiques dans `admin/js/config.js` :

```js
window.SKL_ADMIN_CONFIG = Object.freeze({
  supabaseUrl: "https://REFERENCE.supabase.co",
  supabasePublishableKey: "VOTRE_CLE_PUBLIQUE",
  publicSiteUrl: "https://santkarlleveque.com",
  adminSiteUrl: "https://admin.santkarlleveque.com"
});
```

La clé publique peut être utilisée dans un navigateur puisque les autorisations réelles sont imposées par RLS. La clé `service_role` ne doit jamais y apparaître.

## 7. Déployer l’administration

L’administration doit être publiée séparément sur `admin.santkarlleveque.com`. Le dossier `admin/` ne constitue pas une route de connexion du site public : lorsqu’il est ouvert depuis GitHub Pages, il renvoie vers l’accueil public.

Configurer les en-têtes recommandés sur l’hébergeur de l’administration :

```text
Content-Security-Policy: default-src 'self'; script-src 'self' https://unpkg.com https://cdn.jsdelivr.net; connect-src 'self' https://*.supabase.co; img-src 'self' data: https://*.supabase.co; style-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
Referrer-Policy: strict-origin-when-cross-origin
X-Content-Type-Options: nosniff
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## Étapes suivantes

1. brancher les modules Actualités et Centre de documentation ;
2. ajouter la médiathèque Supabase Storage ;
3. migrer l’équipe, l’organigramme, les partenaires et les textes institutionnels ;
4. créer le workflow brouillon, révision, programmation et publication ;
5. connecter progressivement le site public aux contenus publiés ;
6. ajouter l’historique détaillé des versions et les tests d’intégration Supabase.

