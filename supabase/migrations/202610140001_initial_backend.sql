begin;

create extension if not exists pgcrypto;

create type public.app_role as enum ('super_admin', 'admin', 'editor', 'publisher', 'viewer');
create type public.content_status as enum ('draft', 'review', 'scheduled', 'published', 'archived');
create type public.content_kind as enum (
  'news', 'press_release', 'advocacy', 'analysis', 'report', 'open_letter',
  'position_paper', 'institutional', 'project', 'intervention_area'
);
create type public.locale_code as enum ('fr', 'ht', 'en');
create type public.media_kind as enum ('image', 'document', 'video', 'logo');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text not null default '',
  role public.app_role not null default 'viewer',
  is_active boolean not null default true,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_email_length check (char_length(email) between 3 and 320),
  constraint profiles_name_length check (char_length(full_name) <= 160)
);

create unique index profiles_email_unique on public.profiles (lower(email));

create table public.media_assets (
  id uuid primary key default gen_random_uuid(),
  kind public.media_kind not null,
  bucket_id text not null default 'public-media',
  object_path text not null,
  mime_type text not null,
  file_size bigint not null default 0 check (file_size >= 0),
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  metadata jsonb not null default '{}'::jsonb,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bucket_id, object_path)
);

create table public.media_translations (
  media_id uuid not null references public.media_assets(id) on delete cascade,
  locale public.locale_code not null,
  alt_text text not null default '',
  caption text not null default '',
  credit text not null default '',
  primary key (media_id, locale)
);

create table public.content_items (
  id uuid primary key default gen_random_uuid(),
  kind public.content_kind not null,
  status public.content_status not null default 'draft',
  slug text not null,
  cover_media_id uuid references public.media_assets(id) on delete set null,
  published_at timestamptz,
  scheduled_for timestamptz,
  display_order integer not null default 0,
  featured boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint scheduled_content_has_date check (status <> 'scheduled' or scheduled_for is not null)
);

create unique index content_items_slug_unique on public.content_items (kind, slug);
create index content_items_publication_idx on public.content_items (status, published_at desc);

create table public.content_translations (
  content_id uuid not null references public.content_items(id) on delete cascade,
  locale public.locale_code not null,
  title text not null,
  summary text not null default '',
  body_html text not null default '',
  seo_title text not null default '',
  seo_description text not null default '',
  social_title text not null default '',
  social_description text not null default '',
  is_complete boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (content_id, locale),
  constraint content_title_length check (char_length(title) between 1 and 220),
  constraint content_seo_title_length check (char_length(seo_title) <= 70),
  constraint content_seo_description_length check (char_length(seo_description) <= 180)
);

create table public.documents (
  content_id uuid primary key references public.content_items(id) on delete cascade,
  media_id uuid not null references public.media_assets(id) on delete restrict,
  document_date date,
  language public.locale_code,
  page_count integer check (page_count is null or page_count > 0),
  author text not null default 'Sant Karl Lévêque',
  keywords text[] not null default '{}'
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  full_name text not null,
  initials text not null default '',
  photo_id uuid references public.media_assets(id) on delete set null,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint team_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.team_member_translations (
  member_id uuid not null references public.team_members(id) on delete cascade,
  locale public.locale_code not null,
  role_title text not null,
  biography text not null default '',
  primary key (member_id, locale)
);

create table public.organization_positions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  parent_id uuid references public.organization_positions(id) on delete set null,
  holder_id uuid references public.team_members(id) on delete set null,
  display_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.organization_position_translations (
  position_id uuid not null references public.organization_positions(id) on delete cascade,
  locale public.locale_code not null,
  title text not null,
  primary key (position_id, locale)
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  website_url text,
  logo_id uuid references public.media_assets(id) on delete set null,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.partner_translations (
  partner_id uuid not null references public.partners(id) on delete cascade,
  locale public.locale_code not null,
  description text not null default '',
  primary key (partner_id, locale)
);

create table public.site_settings (
  setting_key text primary key,
  value jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  updated_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.content_versions (
  id bigint generated always as identity primary key,
  entity_table text not null,
  entity_id uuid not null,
  snapshot jsonb not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_table text not null,
  entity_id text,
  old_values jsonb,
  new_values jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index audit_logs_created_idx on public.audit_logs (created_at desc);
create index audit_logs_actor_idx on public.audit_logs (actor_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();
create trigger media_assets_set_updated_at before update on public.media_assets
for each row execute function public.set_updated_at();
create trigger content_items_set_updated_at before update on public.content_items
for each row execute function public.set_updated_at();
create trigger team_members_set_updated_at before update on public.team_members
for each row execute function public.set_updated_at();
create trigger organization_positions_set_updated_at before update on public.organization_positions
for each row execute function public.set_updated_at();
create trigger partners_set_updated_at before update on public.partners
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = ''
as $$
  select role
  from public.profiles
  where id = (select auth.uid()) and is_active = true;
$$;

create or replace function public.has_role(allowed_roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(public.current_user_role() = any(allowed_roles), false);
$$;

revoke all on function public.current_user_role() from public;
revoke all on function public.has_role(public.app_role[]) from public;
grant execute on function public.current_user_role() to authenticated;
grant execute on function public.has_role(public.app_role[]) to authenticated;

alter table public.profiles enable row level security;
alter table public.media_assets enable row level security;
alter table public.media_translations enable row level security;
alter table public.content_items enable row level security;
alter table public.content_translations enable row level security;
alter table public.documents enable row level security;
alter table public.team_members enable row level security;
alter table public.team_member_translations enable row level security;
alter table public.organization_positions enable row level security;
alter table public.organization_position_translations enable row level security;
alter table public.partners enable row level security;
alter table public.partner_translations enable row level security;
alter table public.site_settings enable row level security;
alter table public.content_versions enable row level security;
alter table public.audit_logs enable row level security;

create policy profiles_read_self_or_admin on public.profiles
for select to authenticated
using (id = (select auth.uid()) or public.has_role(array['super_admin', 'admin']::public.app_role[]));

create policy public_reads_published_content on public.content_items
for select to anon, authenticated
using (status = 'published' and coalesce(published_at, now()) <= now());

create policy staff_reads_all_content on public.content_items
for select to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher', 'viewer']::public.app_role[]));

create policy editors_create_content on public.content_items
for insert to authenticated
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy editors_update_content on public.content_items
for update to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy admins_delete_content on public.content_items
for delete to authenticated
using (public.has_role(array['super_admin', 'admin']::public.app_role[]));

create policy public_reads_published_translations on public.content_translations
for select to anon, authenticated
using (exists (
  select 1 from public.content_items ci
  where ci.id = content_id and ci.status = 'published' and coalesce(ci.published_at, now()) <= now()
));

create policy staff_manage_content_translations on public.content_translations
for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy public_reads_published_documents on public.documents
for select to anon, authenticated
using (exists (select 1 from public.content_items ci where ci.id = content_id and ci.status = 'published'));

create policy staff_manage_documents on public.documents
for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy public_reads_media on public.media_assets for select to anon, authenticated using (true);
create policy staff_manage_media on public.media_assets for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));
create policy public_reads_media_translations on public.media_translations for select to anon, authenticated using (true);
create policy staff_manage_media_translations on public.media_translations for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy public_reads_team on public.team_members for select to anon, authenticated using (is_published = true);
create policy staff_manage_team on public.team_members for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));
create policy public_reads_team_translations on public.team_member_translations for select to anon, authenticated
using (exists (select 1 from public.team_members tm where tm.id = member_id and tm.is_published = true));
create policy staff_manage_team_translations on public.team_member_translations for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy public_reads_positions on public.organization_positions for select to anon, authenticated using (is_published = true);
create policy staff_manage_positions on public.organization_positions for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));
create policy public_reads_position_translations on public.organization_position_translations for select to anon, authenticated
using (exists (select 1 from public.organization_positions op where op.id = position_id and op.is_published = true));
create policy staff_manage_position_translations on public.organization_position_translations for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy public_reads_partners on public.partners for select to anon, authenticated using (is_published = true);
create policy staff_manage_partners on public.partners for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));
create policy public_reads_partner_translations on public.partner_translations for select to anon, authenticated
using (exists (select 1 from public.partners p where p.id = partner_id and p.is_published = true));
create policy staff_manage_partner_translations on public.partner_translations for all to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy public_reads_public_settings on public.site_settings for select to anon, authenticated using (is_public = true);
create policy admins_manage_settings on public.site_settings for all to authenticated
using (public.has_role(array['super_admin', 'admin']::public.app_role[]))
with check (public.has_role(array['super_admin', 'admin']::public.app_role[]));

create policy staff_reads_versions on public.content_versions for select to authenticated
using (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));
create policy staff_creates_versions on public.content_versions for insert to authenticated
with check (public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[]));

create policy admins_read_audit_logs on public.audit_logs for select to authenticated
using (public.has_role(array['super_admin', 'admin']::public.app_role[]));

revoke all on all tables in schema public from anon, authenticated;
grant select on public.content_items, public.content_translations, public.documents,
  public.media_assets, public.media_translations, public.team_members,
  public.team_member_translations, public.organization_positions,
  public.organization_position_translations, public.partners,
  public.partner_translations, public.site_settings to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('public-media', 'public-media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('public-documents', 'public-documents', true, 26214400, array['application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy staff_uploads_public_assets on storage.objects
for insert to authenticated
with check (
  bucket_id in ('public-media', 'public-documents')
  and public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[])
);

create policy staff_updates_public_assets on storage.objects
for update to authenticated
using (
  bucket_id in ('public-media', 'public-documents')
  and public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[])
)
with check (
  bucket_id in ('public-media', 'public-documents')
  and public.has_role(array['super_admin', 'admin', 'editor', 'publisher']::public.app_role[])
);

create policy admins_delete_public_assets on storage.objects
for delete to authenticated
using (
  bucket_id in ('public-media', 'public-documents')
  and public.has_role(array['super_admin', 'admin']::public.app_role[])
);

commit;
