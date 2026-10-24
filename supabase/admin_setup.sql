-- Run this ONCE in Supabase SQL Editor before promoting admins.
-- Safe if you already ran an older schema (drops old permissive write policies).

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

drop policy if exists "admin_users_self_read" on public.admin_users;
create policy "admin_users_self_read"
  on public.admin_users for select
  to authenticated
  using (user_id = auth.uid());

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- Replace old "any authenticated user" CMS policies (ignore errors if names differ)
drop policy if exists "content_sections_auth_write" on public.content_sections;
drop policy if exists "content_sections_auth_update" on public.content_sections;
drop policy if exists "content_sections_auth_delete" on public.content_sections;
drop policy if exists "content_sections_admin_insert" on public.content_sections;
drop policy if exists "content_sections_admin_update" on public.content_sections;
drop policy if exists "content_sections_admin_delete" on public.content_sections;

drop policy if exists "content_sections_public_read" on public.content_sections;
create policy "content_sections_public_read"
  on public.content_sections for select
  to anon, authenticated
  using (true);

create policy "content_sections_admin_insert"
  on public.content_sections for insert
  to authenticated
  with check (public.is_cms_admin());

create policy "content_sections_admin_update"
  on public.content_sections for update
  to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

create policy "content_sections_admin_delete"
  on public.content_sections for delete
  to authenticated
  using (public.is_cms_admin());

drop policy if exists "media_auth_upload" on storage.objects;
drop policy if exists "media_auth_update" on storage.objects;
drop policy if exists "media_auth_delete" on storage.objects;
drop policy if exists "media_admin_upload" on storage.objects;
drop policy if exists "media_admin_update" on storage.objects;
drop policy if exists "media_admin_delete" on storage.objects;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "media_admin_upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_cms_admin());

create policy "media_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_cms_admin());

create policy "media_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_cms_admin());
