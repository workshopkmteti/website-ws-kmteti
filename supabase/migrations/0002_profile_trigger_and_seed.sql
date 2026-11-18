-- 1. Auto-create profile row when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Storage RLS policies for commitment_proofs bucket
create policy "Users can upload own commitment proof"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'commitment_proofs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users and admins can view commitment proofs"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'commitment_proofs'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_admin()
    )
  );

-- 3. Initial program seed (idempotent)
insert into public.programs (slug, tag, title, description, schedule, prerequisites, is_open)
values
  (
    'image-processing',
    'Pelatihan Genap',
    'IMAGE PROCESSING',
    'Pelatihan pengolahan citra digital menggunakan OpenCV dan Python.',
    '6 Sesi (Setiap Hari Sabtu, 09:00 - 12:00 WIB)',
    'Dasar Pemrograman Python',
    true
  ),
  (
    'matlab',
    'Pelatihan Genap',
    'MatLab',
    'Dasar-dasar MATLAB untuk analisis data, grafik 2D & 3D, dan Simulink.',
    '6 Sesi (Setiap Hari Sabtu, 13:00 - 16:00 WIB)',
    'Matematika Teknik Dasar',
    true
  ),
  (
    'proteus-2',
    'Pelatihan Genap',
    'Proteus #2',
    'Simulasi sirkuit elektronik dan desain tata letak PCB dengan Proteus.',
    '6 Sesi (Setiap Hari Minggu, 09:00 - 12:00 WIB)',
    'Dasar Rangkaian Listrik',
    true
  )
on conflict (slug) do nothing;
