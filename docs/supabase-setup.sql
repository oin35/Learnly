-- Don Pablo's Dutch Class: progress sync.
-- Paste this whole file into Supabase → SQL Editor → Run. It is safe to run more than once.
--
-- Each person's progress is stored under a hash of their personal sync code. The table itself is closed to the
-- internet (row level security on, no policies, no grants); the app can only call the two functions below,
-- so nobody can list other people's rows.

create table if not exists public.progress (
  code_hash  text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;
revoke all on table public.progress from anon, authenticated;

-- Read the progress saved under a sync code (null if there is none).
create or replace function public.load_progress(p_code text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object('data', p.data, 'stamp', p.updated_at)
  from public.progress p
  where p.code_hash = encode(sha256(convert_to(p_code, 'UTF8')), 'hex');
$$;

-- Save progress under a sync code; returns the new timestamp.
create or replace function public.save_progress(p_code text, p_data jsonb)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  h   text := encode(sha256(convert_to(coalesce(p_code, ''), 'UTF8')), 'hex');
  ts  timestamptz := clock_timestamp();
begin
  if p_code is null or p_code !~ '^[0-9A-Z]{12,40}$' then
    raise exception 'invalid sync code';
  end if;
  if p_data is null or jsonb_typeof(p_data) <> 'object' or octet_length(p_data::text) > 400000 then
    raise exception 'invalid progress data';
  end if;
  if not exists (select 1 from public.progress where code_hash = h)
     and (select count(*) from public.progress) >= 20000 then
    raise exception 'sync storage is full';
  end if;
  insert into public.progress as p (code_hash, data, updated_at)
  values (h, p_data, ts)
  on conflict (code_hash) do update set data = excluded.data, updated_at = excluded.updated_at;
  return ts;
end;
$$;

revoke all on function public.load_progress(text) from public;
revoke all on function public.save_progress(text, jsonb) from public;
grant execute on function public.load_progress(text) to anon, authenticated;
grant execute on function public.save_progress(text, jsonb) to anon, authenticated;
