import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const errors = [];
const requiredFiles = [
  "admin/index.html",
  "admin/css/admin.css",
  "admin/js/admin.js",
  "admin/js/host-guard.js",
  "admin/js/config.js",
  "supabase/config.toml",
  "supabase/migrations/202610140001_initial_backend.sql",
  "supabase/functions/admin-users/index.ts",
  "supabase/functions/_shared/cors.ts",
  "docs/backend-supabase.md"
];

for (const file of requiredFiles) {
  try { await access(resolve(root, file)); } catch { errors.push(`Backend: fichier absent ${file}`); }
}

const migration = await readFile(resolve(root, "supabase/migrations/202610140001_initial_backend.sql"), "utf8");
const edgeFunction = await readFile(resolve(root, "supabase/functions/admin-users/index.ts"), "utf8");
const adminJs = await readFile(resolve(root, "admin/js/admin.js"), "utf8");
const hostGuard = await readFile(resolve(root, "admin/js/host-guard.js"), "utf8");
const adminConfig = await readFile(resolve(root, "admin/js/config.js"), "utf8");
const adminHtml = await readFile(resolve(root, "admin/index.html"), "utf8");

const tables = [
  "profiles", "media_assets", "media_translations", "content_items", "content_translations",
  "documents", "team_members", "team_member_translations", "organization_positions",
  "organization_position_translations", "partners", "partner_translations", "site_settings",
  "content_versions", "audit_logs"
];
for (const table of tables) {
  if (!migration.includes(`create table public.${table}`)) errors.push(`Backend: table absente ${table}`);
  if (!migration.includes(`alter table public.${table} enable row level security`)) errors.push(`Backend: RLS absente sur ${table}`);
}

for (const forbidden of ["SUPABASE_SERVICE_ROLE_KEY", "service_role"]) {
  if (`${adminJs}\n${adminConfig}\n${adminHtml}`.includes(forbidden)) errors.push(`Backend: secret serveur référencé côté navigateur (${forbidden})`);
}
if (!edgeFunction.includes('caller.role !== "super_admin"')) errors.push("Backend: contrôle super_admin absent de l’Edge Function");
if (!edgeFunction.includes("inviteUserByEmail")) errors.push("Backend: invitation administrateur absente");
if (!migration.includes("enable_signup = false") && !((await readFile(resolve(root, "supabase/config.toml"), "utf8")).includes("enable_signup = false"))) errors.push("Backend: inscriptions publiques non désactivées");
if (!adminHtml.includes('meta name="robots" content="noindex, nofollow, noarchive"')) errors.push("Backend: page admin indexable");
if (!hostGuard.includes('"admin.santkarlleveque.com"') || !hostGuard.includes("window.location.replace")) errors.push("Backend: protection de l’hôte public absente");
if (/eyJ[A-Za-z0-9_-]{20,}/.test(adminConfig)) errors.push("Backend: une clé semble être commitée dans config.js");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validation backend réussie: ${tables.length} tables protégées par RLS, Auth et gestion des administrateurs contrôlées.`);

