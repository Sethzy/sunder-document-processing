-- Recover the React/Vite document workflow schema on the linked Supabase project.
-- This migration is additive/idempotent: it preserves existing tables and fills
-- missing columns, views, policies, and indexes expected by the current app.

-- ---------------------------------------------------------------------------
-- Cases
-- ---------------------------------------------------------------------------
alter table public.cases
  add column if not exists case_name text,
  add column if not exists case_ref text,
  add column if not exists description text,
  add column if not exists case_opened_at timestamptz default now(),
  add column if not exists event_date date,
  add column if not exists validation_review_completed_at timestamptz,
  add column if not exists validation_review_completed_by uuid references auth.users(id);

update public.cases
set
  case_name = coalesce(case_name, name, 'Untitled case'),
  case_ref = coalesce(case_ref, 'CASE-' || substr(id::text, 1, 8)),
  case_opened_at = coalesce(case_opened_at, created_at, now())
where case_name is null
   or case_ref is null
   or case_opened_at is null;

alter table public.cases
  alter column case_name set not null,
  alter column case_ref set not null,
  alter column case_opened_at set not null,
  alter column created_at set default now(),
  alter column updated_at set default now();

create unique index if not exists cases_case_ref_key on public.cases(case_ref);
create index if not exists idx_cases_created_by on public.cases(created_by);
create index if not exists idx_cases_updated_at on public.cases(updated_at desc);

-- ---------------------------------------------------------------------------
-- Documents
-- ---------------------------------------------------------------------------
alter table public.documents
  add column if not exists created_by uuid references auth.users(id),
  add column if not exists original_filename text,
  add column if not exists file_type text,
  add column if not exists file_size bigint,
  add column if not exists file_hash text,
  add column if not exists description text,
  add column if not exists document_date date,
  add column if not exists tags jsonb,
  add column if not exists renamed_filename text,
  add column if not exists primary_tag text,
  add column if not exists is_heterogeneous boolean default false,
  add column if not exists page_ranges jsonb,
  add column if not exists duplicate_status text default 'none',
  add column if not exists processing_error text,
  add column if not exists gemini_response jsonb,
  add column if not exists processed_at timestamptz,
  add column if not exists is_reviewed boolean default false,
  add column if not exists reviewed_at timestamptz;

update public.documents
set
  original_filename = coalesce(original_filename, filename, 'untitled'),
  duplicate_status = coalesce(duplicate_status, 'none'),
  is_heterogeneous = coalesce(is_heterogeneous, false),
  is_reviewed = coalesce(is_reviewed, false)
where original_filename is null
   or duplicate_status is null
   or is_heterogeneous is null
   or is_reviewed is null;

alter table public.documents
  alter column case_id set not null,
  alter column status set default 'uploaded',
  alter column status set not null,
  alter column filename set not null,
  alter column storage_path set not null,
  alter column created_at set default now(),
  alter column updated_at set default now(),
  alter column original_filename set not null,
  alter column duplicate_status set default 'none',
  alter column is_heterogeneous set default false,
  alter column is_reviewed set default false;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'documents_status_check'
      and conrelid = 'public.documents'::regclass
  ) then
    alter table public.documents
      add constraint documents_status_check
      check (status in ('uploaded', 'processing', 'complete', 'failed'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'documents_duplicate_status_check'
      and conrelid = 'public.documents'::regclass
  ) then
    alter table public.documents
      add constraint documents_duplicate_status_check
      check (duplicate_status in ('none', 'detected'));
  end if;
end $$;

create unique index if not exists documents_case_file_hash_key
  on public.documents(case_id, file_hash)
  where file_hash is not null;
create index if not exists idx_documents_case_id on public.documents(case_id);
create index if not exists idx_documents_created_by on public.documents(created_by);
create index if not exists idx_documents_status on public.documents(status);

-- ---------------------------------------------------------------------------
-- Splits
-- ---------------------------------------------------------------------------
create table if not exists public.splits (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  split_index integer not null,
  start_page integer not null,
  end_page integer not null,
  tag_id text not null,
  identifier text,
  document_date date,
  potential_duplicate text,
  observation text,
  extend_processor_id text,
  extend_dashboard_url text,
  original_extracted_data jsonb,
  extracted_data jsonb,
  extraction_metadata jsonb,
  extraction_status text default 'pending',
  extraction_error text,
  validation_failures jsonb,
  low_confidence_fields jsonb,
  dismissed_rule_ids text[] default '{}',
  page_width numeric,
  page_height numeric,
  schema_version text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(document_id, split_index),
  check (start_page > 0),
  check (end_page >= start_page)
);

alter table public.splits
  add column if not exists extend_dashboard_url text,
  add column if not exists dismissed_rule_ids text[] default '{}',
  add column if not exists page_width numeric,
  add column if not exists page_height numeric,
  add column if not exists schema_version text;

create index if not exists idx_splits_document on public.splits(document_id);
create index if not exists idx_splits_status on public.splits(extraction_status);
create index if not exists idx_splits_needs_review on public.splits(extraction_status)
  where extraction_status = 'needs_review';
create index if not exists idx_splits_tag on public.splits(tag_id);

-- ---------------------------------------------------------------------------
-- Computed document status view
-- ---------------------------------------------------------------------------
create or replace view public.documents_with_status
with (security_invoker = true) as
select
  d.*,
  case
    when d.is_reviewed then 'reviewed'
    when exists (
      select 1 from public.splits s
      where s.document_id = d.id
        and s.extraction_status in ('pending', 'processing')
    ) then 'processing'
    when not exists (
      select 1 from public.splits s
      where s.document_id = d.id
        and s.extraction_status in ('complete', 'needs_review')
    )
      and exists (
        select 1 from public.splits s
        where s.document_id = d.id
          and s.extraction_status = 'failed'
      ) then 'failed'
    when exists (
      select 1 from public.splits s
      where s.document_id = d.id
        and s.extraction_status = 'needs_review'
    ) then 'in_review'
    when exists (
      select 1 from public.splits s
      where s.document_id = d.id
        and s.extraction_status = 'failed'
    ) then 'in_review'
    when exists (
      select 1 from public.splits s
      where s.document_id = d.id
        and s.extraction_status = 'complete'
    ) then 'processed'
    else d.status
  end as computed_status
from public.documents d;

-- ---------------------------------------------------------------------------
-- Report history
-- ---------------------------------------------------------------------------
create table if not exists public.report_history (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete cascade,
  report_type text not null,
  name text not null,
  prompt text,
  file_path text not null,
  file_size_bytes integer,
  splits_count integer not null default 0,
  tags_included text[] not null default '{}',
  generated_at timestamptz not null default now(),
  generated_by uuid not null references auth.users(id),
  ai_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.report_history
  add column if not exists ai_summary text,
  add column if not exists prompt text,
  add column if not exists file_size_bytes integer;

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'report_history_report_type_check'
      and conrelid = 'public.report_history'::regclass
  ) then
    alter table public.report_history
      drop constraint report_history_report_type_check;
  end if;

  alter table public.report_history
    add constraint report_history_report_type_check
    check (report_type in (
      'quick_report',
      'ai_analysis',
      'data_export',
      'ai_summary',
      'ai_reconciliation',
      'ai_custom'
    ));
end $$;

create index if not exists idx_report_history_case_id on public.report_history(case_id);
create index if not exists idx_report_history_generated_by on public.report_history(generated_by);
create index if not exists idx_report_history_generated_at on public.report_history(generated_at desc);

-- ---------------------------------------------------------------------------
-- Updated-at triggers
-- ---------------------------------------------------------------------------
drop trigger if exists update_cases_updated_at on public.cases;
create trigger update_cases_updated_at
  before update on public.cases
  for each row execute function public.update_updated_at_column();

drop trigger if exists update_documents_updated_at on public.documents;
create trigger update_documents_updated_at
  before update on public.documents
  for each row execute function public.update_updated_at_column();

drop trigger if exists update_splits_updated_at on public.splits;
create trigger update_splits_updated_at
  before update on public.splits
  for each row execute function public.update_updated_at_column();

drop trigger if exists set_report_history_updated_at on public.report_history;
create trigger set_report_history_updated_at
  before update on public.report_history
  for each row execute function public.update_updated_at_column();

-- ---------------------------------------------------------------------------
-- Row Level Security policies
-- ---------------------------------------------------------------------------
alter table public.cases enable row level security;
alter table public.documents enable row level security;
alter table public.splits enable row level security;
alter table public.report_history enable row level security;

drop policy if exists "Users can view own cases" on public.cases;
drop policy if exists "Users can insert own cases" on public.cases;
drop policy if exists "Users can update own cases" on public.cases;
drop policy if exists "Users can delete own cases" on public.cases;

create policy "Users can view own cases"
  on public.cases for select
  using (created_by = auth.uid());

create policy "Users can insert own cases"
  on public.cases for insert
  with check (created_by = auth.uid());

create policy "Users can update own cases"
  on public.cases for update
  using (created_by = auth.uid())
  with check (created_by = auth.uid());

create policy "Users can delete own cases"
  on public.cases for delete
  using (created_by = auth.uid());

drop policy if exists "Users can view documents in own cases" on public.documents;
drop policy if exists "Users can insert documents in own cases" on public.documents;
drop policy if exists "Users can update documents in own cases" on public.documents;
drop policy if exists "Users can delete documents in own cases" on public.documents;

create policy "Users can view documents in own cases"
  on public.documents for select
  using (
    exists (
      select 1 from public.cases c
      where c.id = documents.case_id
        and c.created_by = auth.uid()
    )
  );

create policy "Users can insert documents in own cases"
  on public.documents for insert
  with check (
    created_by = auth.uid()
    and exists (
      select 1 from public.cases c
      where c.id = documents.case_id
        and c.created_by = auth.uid()
    )
  );

create policy "Users can update documents in own cases"
  on public.documents for update
  using (
    exists (
      select 1 from public.cases c
      where c.id = documents.case_id
        and c.created_by = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.cases c
      where c.id = documents.case_id
        and c.created_by = auth.uid()
    )
  );

create policy "Users can delete documents in own cases"
  on public.documents for delete
  using (
    exists (
      select 1 from public.cases c
      where c.id = documents.case_id
        and c.created_by = auth.uid()
    )
  );

drop policy if exists "Users can view their splits" on public.splits;
drop policy if exists "Users can insert their splits" on public.splits;
drop policy if exists "Users can update their splits" on public.splits;
drop policy if exists "Users can delete their splits" on public.splits;

create policy "Users can view their splits"
  on public.splits for select
  using (
    exists (
      select 1
      from public.documents d
      join public.cases c on c.id = d.case_id
      where d.id = splits.document_id
        and c.created_by = auth.uid()
    )
  );

create policy "Users can insert their splits"
  on public.splits for insert
  with check (
    exists (
      select 1
      from public.documents d
      join public.cases c on c.id = d.case_id
      where d.id = splits.document_id
        and c.created_by = auth.uid()
    )
  );

create policy "Users can update their splits"
  on public.splits for update
  using (
    exists (
      select 1
      from public.documents d
      join public.cases c on c.id = d.case_id
      where d.id = splits.document_id
        and c.created_by = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.documents d
      join public.cases c on c.id = d.case_id
      where d.id = splits.document_id
        and c.created_by = auth.uid()
    )
  );

create policy "Users can delete their splits"
  on public.splits for delete
  using (
    exists (
      select 1
      from public.documents d
      join public.cases c on c.id = d.case_id
      where d.id = splits.document_id
        and c.created_by = auth.uid()
    )
  );

drop policy if exists "Users see own reports" on public.report_history;
drop policy if exists "Users insert own reports" on public.report_history;

create policy "Users see own reports"
  on public.report_history for select
  using (
    exists (
      select 1 from public.cases c
      where c.id = report_history.case_id
        and c.created_by = auth.uid()
    )
  );

create policy "Users insert own reports"
  on public.report_history for insert
  with check (
    generated_by = auth.uid()
    and exists (
      select 1 from public.cases c
      where c.id = report_history.case_id
        and c.created_by = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- Report storage policies
-- ---------------------------------------------------------------------------
drop policy if exists "Users can read own reports" on storage.objects;
drop policy if exists "Users can upload own reports" on storage.objects;
drop policy if exists "Users can delete own reports" on storage.objects;

create policy "Users can read own reports"
  on storage.objects for select to authenticated
  using (
    bucket_id = 'reports'
    and exists (
      select 1 from public.cases c
      where c.id::text = (storage.foldername(name))[1]
        and c.created_by = auth.uid()
    )
  );

create policy "Users can upload own reports"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'reports'
    and exists (
      select 1 from public.cases c
      where c.id::text = (storage.foldername(name))[1]
        and c.created_by = auth.uid()
    )
  );

create policy "Users can delete own reports"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'reports'
    and exists (
      select 1 from public.cases c
      where c.id::text = (storage.foldername(name))[1]
        and c.created_by = auth.uid()
    )
  );
