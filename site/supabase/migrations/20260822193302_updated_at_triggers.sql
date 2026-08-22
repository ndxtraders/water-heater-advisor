-- updated_at maintenance.
--
-- Attached to the three tables whose whole purpose is to be updated as a job
-- progresses. Deliberately NOT attached to quiz_sessions, which is append-only.

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_set_updated_at on leads;
create trigger leads_set_updated_at
  before update on leads
  for each row execute function set_updated_at();

drop trigger if exists partners_set_updated_at on partners;
create trigger partners_set_updated_at
  before update on partners
  for each row execute function set_updated_at();

drop trigger if exists job_outcomes_set_updated_at on job_outcomes;
create trigger job_outcomes_set_updated_at
  before update on job_outcomes
  for each row execute function set_updated_at();
