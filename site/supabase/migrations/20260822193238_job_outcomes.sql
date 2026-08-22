-- Job outcomes — the percentage model lives or dies here.
--
-- Under a percentage-of-job arrangement the contractor self-reports what the
-- work sold for, which is the model's one structural weakness. Two columns
-- mitigate it: `homeowner_confirmed_at` records an independent check with the
-- customer, and `homeowner_reported_value` records what they say they paid.
--
-- The homeowner follow-up is worth doing regardless — it is the outcome data
-- that eventually makes the recommendation engine better than a guess — so the
-- audit function comes free with something already needed.

create table if not exists job_outcomes (
  id                       uuid primary key default gen_random_uuid(),
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  lead_id                  uuid not null references leads (id) on delete cascade,
  partner_id               uuid not null references partners (id) on delete restrict,

  job_completed            boolean not null default false,
  completed_at             date,
  technology_installed     text,
  brand_installed          text,

  partner_reported_value   numeric(10,2),
  homeowner_reported_value numeric(10,2),
  homeowner_confirmed_at   timestamptz,

  commission_pct_applied   numeric(5,2),

  -- Deliberately a plain column, not generated. A generated column would
  -- guarantee this equals partner_reported_value x commission_pct_applied, but
  -- it would also make a negotiated one-off commission impossible to record.
  -- The flexibility is worth more than the guarantee. Do not "fix" this.
  commission_due           numeric(10,2),

  invoiced_at              timestamptz,
  paid_at                  timestamptz,

  -- Set when the two reported figures disagree by more than a tolerance.
  -- Reviewed by hand; a pattern here is a partner problem, not a data problem.
  variance_flagged         boolean not null default false,
  notes                    text
);

create index if not exists job_outcomes_partner_idx on job_outcomes (partner_id);
create index if not exists job_outcomes_unpaid_idx on job_outcomes (paid_at) where paid_at is null;
