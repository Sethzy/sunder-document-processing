-- Ensure private storage buckets and owner-scoped source document policies exist.

insert into storage.buckets (id, name, public, file_size_limit)
values
  ('documents', 'documents', false, 52428800),
  ('reports', 'reports', false, 52428800)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit;

drop policy if exists "Users can read own documents" on storage.objects;
drop policy if exists "Users can upload own documents" on storage.objects;
drop policy if exists "Users can delete own documents" on storage.objects;
drop policy if exists "Users can read own files" on storage.objects;
drop policy if exists "Users can upload to own folder" on storage.objects;
drop policy if exists "Users can delete own files" on storage.objects;

create policy "Users can read own documents"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
    and exists (
      select 1 from public.cases c
      where c.id::text = (storage.foldername(name))[2]
        and c.created_by = auth.uid()
    )
  );

create policy "Users can upload own documents"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
    and exists (
      select 1 from public.cases c
      where c.id::text = (storage.foldername(name))[2]
        and c.created_by = auth.uid()
    )
  );

create policy "Users can delete own documents"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'documents'
    and (storage.foldername(name))[1] = auth.uid()::text
    and exists (
      select 1 from public.cases c
      where c.id::text = (storage.foldername(name))[2]
        and c.created_by = auth.uid()
    )
  );
