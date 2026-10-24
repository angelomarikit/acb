-- ACB landing page CMS (run in Supabase SQL Editor)

create table if not exists public.content_sections (
  key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists content_sections_updated_at on public.content_sections;
create trigger content_sections_updated_at
  before update on public.content_sections
  for each row execute function public.set_updated_at();

alter table public.content_sections enable row level security;

-- CMS admins (promote users with SQL below)
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

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

-- Storage bucket for CMS uploads (create bucket "media" as Public in Dashboard if this fails)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

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

-- Promote an existing Auth user to CMS admin (change the email):
-- insert into public.admin_users (user_id, email)
-- select id, email from auth.users where email = 'you@example.com'
-- on conflict (user_id) do nothing;
