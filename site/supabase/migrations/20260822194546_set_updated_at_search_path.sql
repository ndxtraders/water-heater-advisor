-- Pin set_updated_at's search_path.
--
-- Supabase's security linter flags functions with a mutable search_path
-- (lint 0011). Without a pinned path, whatever schema the calling role has in
-- front can decide what an unqualified name inside the function resolves to.
-- This body only touches `new`, so the exposure is small — but the fix is one
-- line and the warning is legitimate.
--
-- A new migration rather than an edit to 000006: migrations that have been
-- applied are never edited, or the files stop describing the real database.

create or replace function set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
