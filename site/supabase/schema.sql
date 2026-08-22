-- SUPERSEDED. Do not run this file.
--
-- Replaced by supabase/migrations/, which is the source of truth for the
-- database shape. This file is kept as the design record it actually is - the
-- reasoning in the comments below is still correct and worth reading.
--
-- Two reasons not to run it, both fatal in practice:
--
--   1. `leads.assigned_partner` references `partners` twelve lines before that
--      table is created, so a fresh apply dies with
--      `relation "partners" does not exist` and rolls back everything after it.
--      This file has therefore never been successfully applied to any database.
--   2. The anon insert policies at the bottom describe an architecture that no
--      longer exists. The browser holds no Supabase key; all writes go through
--      Next.js route handlers using the service role.
--
-- See PRD-DATABASE-V.1.md at the repo root for the full account.

-- Water Heater Advisor — database schema
--
-- Run in the Supabase SQL editor, or `supabase db push` if you are using the CLI.
--
-- Four tables, and the split between the first two is the important design
-- decision:
--
--   quiz_sessions   anonymous, written the moment results render
--   leads           identified, written only when someone asks for an installer
--
-- Keeping them apart means the drop-off funnel can be analysed without holding
-- personal data on people who never asked to be contacted. Under CCPA the
-- cheapest compliance posture is not collecting the data in the first place,
-- and separating the tables makes "delete my data" a single-row operation on
-- `leads` that leaves the analytics intact.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. Quiz sessions — anonymous
-- ---------------------------------------------------------------------------
create table if not exists quiz_sessions (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  -- Raw answers, kept whole. The engine will change and we will want to replay
  -- old sessions against new logic to see whether the recommendation moved.
  answers           jsonb not null,

  -- Denormalised for querying without unpacking jsonb every time.
  zip               text,
  status            text,
  current_type      text,
  fuel              text,
  timeline          text,
  budget_band       text,
  owner_status      text,

  -- Engine output at the time it ran. Stored rather than recomputed, so a
  -- later logic change cannot silently rewrite history.
  recommended_tech  text,
  alternative_tech  text,
  ruled_out         jsonb,
  confidence        text,
  lead_score        int,
  routing_category  text,
  engine_version    text not null default 'v1',

  completed         boolean not null default false,
  referrer          text,
  utm               jsonb
);

create index if not exists quiz_sessions_created_idx on quiz_sessions (created_at desc);
create index if not exists quiz_sessions_zip_idx on quiz_sessions (zip);
create index if not exists quiz_sessions_category_idx on quiz_sessions (routing_category);

-- ---------------------------------------------------------------------------
-- 2. Leads — identified, and only created on explicit request
-- ---------------------------------------------------------------------------
create table if not exists leads (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  session_id        uuid references quiz_sessions (id) on delete set null,

  full_name         text not null,
  email             text not null,
  phone             text,
  street_address    text,
  zip               text not null,

  -- TCPA. Store the exact wording consented to and when, not just a boolean —
  -- a bare true is not defensible if consent is ever challenged.
  contact_consent   boolean not null default false,
  consent_text      text,
  consent_at        timestamptz,

  notes             text,
  photo_urls        text[],

  assigned_partner  uuid references partners (id) on delete set null,
  assigned_at       timestamptz,
  status            text not null default 'new'
                    check (status in ('new','assigned','contacted','quoted','won','lost','invalid'))
);

create index if not exists leads_created_idx on leads (created_at desc);
create index if not exists leads_status_idx on leads (status);

-- ---------------------------------------------------------------------------
-- 3. Partners — contractor capability matrix
-- ---------------------------------------------------------------------------
create table if not exists partners (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),

  company_name      text not null,
  contact_name      text,
  email             text,
  phone             text,

  -- Never render this as "authorized" anywhere in the UI unless it has been
  -- checked against the manufacturer's own directory. Verified status is a
  -- claim about someone else's business.
  cslb_license      text,
  cslb_verified_at  date,

  service_zips      text[] not null default '{}',
  categories        text[] not null default '{}',
  brands            text[] not null default '{}',

  does_gas_line     boolean not null default false,
  does_electrical   boolean not null default false,
  offers_financing  boolean not null default false,
  emergency_capable boolean not null default false,

  -- Commercial terms. Percentage of the completed job value, which is the only
  -- structure contractors reliably say yes to without a track record.
  commission_pct    numeric(5,2) not null default 10.00,
  commission_min    numeric(10,2) not null default 150.00,
  commission_max    numeric(10,2) not null default 600.00,

  active            boolean not null default true,
  capacity_per_week int not null default 5,
  notes             text
);

-- ---------------------------------------------------------------------------
-- 4. Job outcomes — the percentage model lives or dies here
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
-- The public site is insert-only. The anon key ships to the browser, so anyone
-- who views source has it; nothing readable may ever be exposed to that role.
alter table quiz_sessions enable row level security;
alter table leads          enable row level security;
alter table partners       enable row level security;
alter table job_outcomes   enable row level security;

create policy "anon can record a quiz session"
  on quiz_sessions for insert to anon with check (true);

create policy "anon can submit a lead"
  on leads for insert to anon with check (true);

-- No select, update or delete policies for anon anywhere, deliberately. Reading
-- leads, partners and outcomes requires the service role, which stays server
-- side. Partners and job_outcomes have no anon policy at all.
