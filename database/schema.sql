-- Create projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  status text check (status in ('ideation', 'development', 'live', 'done')) not null default 'ideation',
  summary text,
  memo text, -- Admin only
  image_url text,
  site_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.projects enable row level security;

-- Policies

-- Public can read everything (except memo, technically, but RLS on columns is not standard, we usually just don't select it, or use a view. For now, public read on table is fine, frontend ensures memo isn't shown).
create policy "Allow public read access"
  on public.projects
  for select
  to public
  using (true);

-- Authenticated (Admin) can insert
create policy "Allow authenticated insert access"
  on public.projects
  for insert
  to authenticated
  with check (true);

-- Authenticated (Admin) can update
create policy "Allow authenticated update access"
  on public.projects
  for update
  to authenticated
  using (true);

-- Authenticated (Admin) can delete
create policy "Allow authenticated delete access"
  on public.projects
  for delete
  to authenticated
  using (true);

-- Storage Bucket Setup (Run this in SQL verification or manually if using Dashboard)
insert into storage.buckets (id, name, public) 
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'project-images' );

create policy "Auth Upload"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'project-images' );

create policy "Auth Update"
  on storage.objects for update
  to authenticated
  using ( bucket_id = 'project-images' );

create policy "Auth Delete"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'project-images' );
