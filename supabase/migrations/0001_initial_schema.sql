-- Workshop KMTETI Initial Schema & Row-Level Security (RLS)

create extension if not exists "pgcrypto";

-- 1. Profiles (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null default '',
  nim text,
  phone text,
  role text not null default 'participant' check (role in ('participant', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 2. Programs
create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  tag text not null,
  title text not null,
  description text not null default '',
  schedule text not null default '',
  prerequisites text not null default '',
  whatsapp_group_url text not null default '',
  is_open boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.programs enable row level security;

create policy "Programs are publicly readable"
  on public.programs for select
  using (true);

create policy "Only admins can manage programs"
  on public.programs for all
  using (public.is_admin())
  with check (public.is_admin());

-- 3. Registrations & Commitment Fee
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  program_title text not null,
  proof_path text not null,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'approved', 'rejected')),
  refund_proof_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.registrations enable row level security;

create policy "Users can view own registrations"
  on public.registrations for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert own registrations"
  on public.registrations for insert
  with check (auth.uid() = user_id);

create policy "Only admins can update registrations"
  on public.registrations for update
  using (public.is_admin())
  with check (public.is_admin());

-- 4. Attendance Records (6 sessions)
create table if not exists public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.registrations (id) on delete cascade,
  session_number int not null check (session_number between 1 and 6),
  present boolean not null default false,
  recorded_at timestamptz not null default now(),
  unique (registration_id, session_number)
);

alter table public.attendance_records enable row level security;

create policy "Users can view own attendance"
  on public.attendance_records for select
  using (
    exists (
      select 1 from public.registrations r
      where r.id = registration_id and r.user_id = auth.uid()
    )
    or public.is_admin()
  );

create policy "Only admins can manage attendance"
  on public.attendance_records for all
  using (public.is_admin())
  with check (public.is_admin());

-- 5. Training Materials (Google Drive + Meet)
create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  program_title text not null,
  session_number int not null check (session_number between 1 and 6),
  title text not null,
  meet_url text not null default '',
  drive_file_id text not null default '',
  drive_url text not null default '',
  file_size_bytes bigint not null default 0 check (file_size_bytes <= 20971520),
  created_at timestamptz not null default now()
);

alter table public.materials enable row level security;

create policy "Authenticated users can view materials"
  on public.materials for select
  using (auth.role() = 'authenticated');

create policy "Only admins can manage materials"
  on public.materials for all
  using (public.is_admin())
  with check (public.is_admin());

-- 6. Final Projects (link only)
create table if not exists public.final_projects (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null unique references public.registrations (id) on delete cascade,
  project_url text not null,
  submitted_at timestamptz not null default now()
);

alter table public.final_projects enable row level security;

create policy "Users can view and submit own final project"
  on public.final_projects for select
  using (
    exists (
      select 1 from public.registrations r
      where r.id = registration_id and r.user_id = auth.uid()
    )
    or public.is_admin()
  );

create policy "Users can upsert own final project"
  on public.final_projects for insert
  with check (
    exists (
      select 1 from public.registrations r
      where r.id = registration_id and r.user_id = auth.uid()
    )
  );

-- 7. Admin Backup & Delete Audit Logs (with idempotency key)
create table if not exists public.admin_logs (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  action_type text not null check (action_type in ('backup', 'delete')),
  target text not null,
  metadata jsonb not null default '{}'::jsonb,
  actor_id uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

alter table public.admin_logs enable row level security;

create policy "Only admins can access admin logs"
  on public.admin_logs for all
  using (public.is_admin())
  with check (public.is_admin());
