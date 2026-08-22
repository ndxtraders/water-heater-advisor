-- Two things a lead can want, captured in one form.
--
-- Until now a row in `leads` meant one thing: introduce me to an installer.
-- The form required that consent to submit, so anyone not ready for a
-- contractor left no trace at all - which is most people researching a
-- purchase they have not decided on yet.
--
-- The contact form now serves both intents. Everyone who submits gets their
-- recommendation emailed. The installer introduction is a separate, optional
-- tick.
--
-- `stage` records which of the two happened. It is deliberately NOT derived
-- from `contact_consent` at read time: consent is a legal record of what
-- somebody agreed to, and stage is where they are in the funnel. Collapsing
-- them would mean a future funnel change quietly rewrites consent history.

alter table leads
  add column if not exists stage text not null default 'results'
    check (stage in ('results','intro_requested'));

alter table leads
  add column if not exists results_email_sent_at timestamptz;

create index if not exists leads_stage_idx on leads (stage, created_at desc);

comment on column leads.stage is
  'results = asked for their recommendation by email only. intro_requested = '
  'also asked to be introduced to an installer, and contact_consent will be '
  'true. Never infer one from the other.';

comment on column leads.results_email_sent_at is
  'When the homeowner-facing recommendation email was accepted by the provider. '
  'Null means it was never sent - either the provider was unconfigured or the '
  'send failed. The lead is still valid either way.';
