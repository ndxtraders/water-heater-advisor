-- Seed data for local development.
--
-- Everything here is obviously fake on sight. The partner is named
-- "TEST - do not contact" and carries a 555-0100 number, because seed data that
-- looks plausible eventually gets called by a real person on a real Tuesday.
-- It is also `active = false`, so no routing logic can ever select it.

insert into partners (
  company_name, contact_name, email, phone,
  service_zips, categories, emergency_capable, active, notes
)
select
  'TEST - do not contact', 'Seed Fixture', 'seed@example.invalid', '555-0100',
  array['95350','95351','95355'], array['gas_storage','heat_pump'], true, false,
  'Seed row. Inactive by design. Delete freely.'
where not exists (select 1 from partners where company_name = 'TEST - do not contact');

-- Two sessions: one routine replacement, one emergency. Enough to verify a
-- join and to see both notification paths without submitting a real lead.
insert into quiz_sessions (
  answers, zip, status, current_type, fuel, timeline, budget_band, owner_status,
  recommended_tech, alternative_tech, confidence, lead_score, routing_category,
  urgent, engine_version, completed
)
select
  '{"status":"aging","current":"gas_storage","fuel":"gas","zip":"95350","timeline":"3_months","budget":"2000_3000","owner":"own"}'::jsonb,
  '95350', 'aging', 'gas_storage', 'gas', '3_months', '2000_3000', 'own',
  'gas_storage', 'heat_pump', 'High', 62, 'standard_replacement',
  false, 'v1', true
where not exists (select 1 from quiz_sessions where zip = '95350' and lead_score = 62);

insert into quiz_sessions (
  answers, zip, status, current_type, fuel, timeline, budget_band, owner_status,
  recommended_tech, confidence, lead_score, routing_category,
  urgent, engine_version, completed
)
select
  '{"status":"failed","current":"gas_storage","fuel":"gas","zip":"95351","timeline":"now","owner":"own"}'::jsonb,
  '95351', 'failed', 'gas_storage', 'gas', 'now', null, 'own',
  'gas_storage', 'High', 88, 'emergency',
  true, 'v1', true
where not exists (select 1 from quiz_sessions where zip = '95351' and lead_score = 88);
