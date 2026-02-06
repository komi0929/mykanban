-- Create yells table
create table public.yells (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  session_id text not null, -- Simple browser fingerprint/cookie id
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create advice table
create table public.advice (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  sender_name text, -- Optional
  message text not null,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.yells enable row level security;
alter table public.advice enable row level security;

-- Policies for Yells
-- Public can insert (send yell)
create policy "Allow public insert access"
  on public.yells
  for insert
  to public
  with check (true);

-- Public can read count (or we can use a function, but select is easier for now)
create policy "Allow public read access"
  on public.yells
  for select
  to public
  using (true);

-- Policies for Advice
-- Public can insert (send advice)
create policy "Allow public insert access"
  on public.advice
  for insert
  to public
  with check (true);

-- Only Admin can read advice
create policy "Allow authenticated read access"
  on public.advice
  for select
  to authenticated
  using (true);

-- Only Admin can update (mark as read)
create policy "Allow authenticated update access"
  on public.advice
  for update
  to authenticated
  using (true);
