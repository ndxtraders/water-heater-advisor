-- Partners — contractor capability matrix.
--
-- Created BEFORE `leads`, which is the fix for the fatal defect in the
-- superseded schema.sql: `leads.assigned_partner` referenced this table twelve
-- lines before it existed, so a fresh apply died with
-- `relation "partners" does not exist` and rolled back everything after it.

create table if not exists partners (
  id                uuid primary key default gen_random_uuid(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  company_name      text not null,
  contact_name      text,
  email             text,
  phone             text,

  -- Never render this as "authorized" or "verified" anywhere in the UI unless
  -- `cslb_verified_at` is set and someone actually checked it against the
  -- manufacturer's own directory. Verified status is a claim about someone
  -- else's business, and getting it wrong is a legal problem, not a UX one.
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
