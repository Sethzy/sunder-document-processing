-- Recreate document storage policies with explicit outer table references.
-- This prevents PostgreSQL from binding `name` to columns inside the case ownership
-- subquery instead of the current `storage.objects` row.

drop policy if exists "Users can read own documents" on storage.objects;
drop policy if exists "Users can upload own documents" on storage.objects;
drop policy if exists "Users can delete own documents" on storage.objects;

create policy "Users can read own documents"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(storage.objects.name))[1] = auth.uid()::text
  and exists (
    select 1
    from public.cases as c
    where c.id::text = (storage.foldername(storage.objects.name))[2]
      and c.created_by = auth.uid()
  )
);

create policy "Users can upload own documents"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'documents'
  and (storage.foldername(storage.objects.name))[1] = auth.uid()::text
  and exists (
    select 1
    from public.cases as c
    where c.id::text = (storage.foldername(storage.objects.name))[2]
      and c.created_by = auth.uid()
  )
);

create policy "Users can delete own documents"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'documents'
  and (storage.foldername(storage.objects.name))[1] = auth.uid()::text
  and exists (
    select 1
    from public.cases as c
    where c.id::text = (storage.foldername(storage.objects.name))[2]
      and c.created_by = auth.uid()
  )
);
