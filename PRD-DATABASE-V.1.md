# PRD — Water Heater Advisor database, V.1

**Status:** implemented 2026-08-22. Sections 1-9 are done and verified;
the outstanding work is Rev's accounts in §10 (Resend, Twilio, Vercel env).
**Audience:** the agent building this (Sonnet), plus Rev for the manual steps
**Supabase project:** `lqxqmucpxcydwoyfeclj`
**Vercel project:** `raul-vaughns-projects/water-heater-advisor`
**Written:** 2026-08-17

---

## 0. Read this first

Four decisions are locked. Do not relitigate them, and do not substitute a
simpler approach because it is faster:

| Decision | Choice |
|---|---|
| Lead alerts | Email on every lead, **plus SMS when the lead is urgent** |
| Write path | **Server-side route handlers using the service role.** The browser never talks to Supabase again |
| Schema scope | All four tables — `quiz_sessions`, `leads`, `partners`, `job_outcomes` |
| Migrations | **Supabase CLI migration files committed to the repo.** No dashboard-only SQL |

Two things are explicitly **out of scope** for V.1. Do not build them:

- Analytics/reporting SQL views. Considered and deferred.
- An authenticated `/admin` page. Notifications carry V.1; the admin UI is V.2.

---

## 1. Why this exists

The site is live and has been since 2026-08-16. It captures nothing.

`recordSession()` returns `null` on every call and `submitLead()` returns an
error on every call, both because `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset. The failure is silent by design for
the quiz — [`leads.ts:20-23`](site/src/lib/leads.ts#L20-L23) treats a missing
backend as non-fatal so a homeowner never loses their recommendation to a
config error — and loud for the match form.

The consequence is that **every quiz completion and every lead since launch has
been discarded.** There is no backfill. That data is gone.

The goal of V.1 is narrow and complete: no submission is ever lost again, and
Rev learns about a lead fast enough to act on it the same day.

### Why speed of notification is a requirement, not a nicety

A failed water heater is a same-day purchase. The homeowner has no hot water,
they are calling contractors that afternoon, and the first credible response
wins the job. A lead that sits unread in a Postgres table for six hours is not
a slow lead — it is a lost one. This is why the notification path is in V.1
rather than deferred with the admin UI.

---

## 2. Current state, precisely

### What exists and works

- [`site/src/lib/leads.ts`](site/src/lib/leads.ts) — the client-side data layer.
  Correct in shape, wrong in architecture (see §3). Will be rewritten.
- [`site/src/app/match/MatchForm.tsx`](site/src/app/match/MatchForm.tsx) — the
  lead form. Collects name, email, phone, zip, notes, consent. Composes a
  contractor-readable summary at lines 90-104 and sends it as `notes`.
- [`site/src/app/quiz/QuizFlow.tsx:253`](site/src/app/quiz/QuizFlow.tsx#L253) —
  calls `recordSession(answers, r)` when results render, and holds the returned
  session id to link a later lead.
- `@supabase/supabase-js ^2.112.2` is already a dependency.

### What exists and is broken

[`site/supabase/schema.sql`](site/supabase/schema.sql) is well-designed and does
not run. `STARTHERE.md:52` claims it "runs as-is." That is wrong. Defects, in
order of severity:

1. **Fatal — forward reference.** `leads.assigned_partner` references
   `partners (id)` at line 81. `partners` is not created until line 93. On a
   fresh database this fails with `relation "partners" does not exist`, and
   every statement after it in the same transaction rolls back. **This is the
   reason to trust nothing else in the file without checking it.**
2. **Not idempotent, despite looking it.** Every table uses
   `create table if not exists`, which reads as safely re-runnable. But
   PostgreSQL has no `create policy if not exists`, so the five policy
   statements throw `policy already exists` on a second run. A file that is
   90% idempotent is more dangerous than one that is 0% idempotent, because it
   invites the re-run that then half-fails.
3. **Dead columns.** `quiz_sessions.utm`, `leads.street_address` and
   `leads.photo_urls` are never written by any code path.
4. **No `updated_at` anywhere,** on two tables (`leads`, `job_outcomes`) whose
   whole purpose is to be updated as a job progresses.
5. **No format or length constraints.** `email` accepts `"x"`. `zip` accepts
   `"not a zip"`. Every `text` column accepts a 10MB string.
6. **No duplicate protection.** A double-click on the submit button creates two
   identical leads, and Rev calls the same homeowner twice.
7. **`job_outcomes.commission_due` is a plain column** that can silently drift
   out of agreement with `partner_reported_value × commission_pct_applied`.

Defect 1 alone means: **the existing schema has never been successfully applied
to any database.** Treat it as a design document, not as working SQL.

### The security problem with the current design

`leads.ts:9-14` documents the anon-key posture correctly — the key is public,
RLS is what protects the data, anon gets insert and nothing else. That reasoning
is sound as far as it goes, and it protects against *reads*.

It does not protect against *writes*. `with check (true)` means anyone who opens
DevTools, copies the anon key out of the JS bundle, and runs a loop can insert
unlimited rows into `leads` and `quiz_sessions` forever. There is no rate limit,
no validation, and no captcha. The cost of that is Rev's Supabase bill, a
poisoned funnel dataset, and a lead inbox full of garbage that hides the real
leads — which defeats the entire point of §1.

Moving writes server-side (§3) removes this vector completely rather than
mitigating it.

---

## 3. Architecture

### The write path

```
Browser                    Vercel (Node runtime)              Supabase
───────                    ─────────────────────              ────────
QuizFlow.tsx
  └─ POST /api/quiz-session ──▶ route.ts
                                 ├─ validate body
                                 ├─ rate-limit by IP hash
                                 └─ insert ─────────────────▶ quiz_sessions
                                                                 (service role,
       ◀── { sessionId } ──────────┘                              bypasses RLS)

MatchForm.tsx
  └─ POST /api/lead ──────────▶ route.ts
                                 ├─ validate body
                                 ├─ rate-limit by IP hash
                                 ├─ dedupe check (10 min)
                                 ├─ insert ─────────────────▶ leads
                                 └─ notify (email, +SMS if urgent)
       ◀── { ok: true } ──────────┘                          Resend / Twilio
```

**The browser never receives a Supabase key or a Supabase URL after this
change.** `NEXT_PUBLIC_SUPABASE_ANON_KEY` stops being used and should be removed
from Vercel once the cutover is verified.

### Why the service role, and the one rule about it

The service role key **bypasses row level security entirely**. It can read,
write and delete every row in every table. It is equivalent to a database
superuser for your data.

> **It must never be prefixed `NEXT_PUBLIC_`.** Any environment variable
> beginning with `NEXT_PUBLIC_` is inlined into the JavaScript bundle at build
> time and served to every visitor. Prefixing the service role key that way
> would publish full read/write access to your database on the public internet.
> If this ever happens: rotate the key in the Supabase dashboard immediately,
> then redeploy.

The correct name is `SUPABASE_SERVICE_ROLE_KEY`. Route handlers run on the
server, so they can read it; client components cannot.

### Notification failures must not fail the request

Order of operations in `/api/lead` is non-negotiable: **insert first, notify
second.** If Resend or Twilio is down, the lead is already durably in Postgres
and the homeowner sees success. Log the notification failure and return `ok`.

Never wrap the insert and the notification in a way that lets a vendor outage
produce an error for the homeowner or, worse, roll back a saved lead. Losing a
lead to a third-party outage is the exact failure this project exists to stop.

---

## 4. Data model

Ordering matters. `partners` is created **before** `leads`, which is the fix for
defect 1.

### 4.1 `quiz_sessions` — anonymous

Written when results render, before any contact capture. Holds no personal data.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | `gen_random_uuid()` |
| `created_at` | timestamptz | `now()` |
| `answers` | jsonb not null | Raw answers, kept whole, so old sessions can be replayed against a newer engine |
| `zip` | text | Denormalised for querying |
| `status`, `current_type`, `fuel`, `timeline`, `budget_band`, `owner_status` | text | Denormalised |
| `recommended_tech`, `alternative_tech` | text | Engine output as it ran |
| `ruled_out` | jsonb | |
| `confidence` | text | `High` / `Moderate` / `Low` |
| `lead_score` | int | BANT, 0–100, `check (lead_score between 0 and 100)` |
| `routing_category` | text | |
| `urgent` | boolean not null default false | **New.** `Recommendation.urgent` already exists and drives the SMS decision. Store it |
| `engine_version` | text not null default `'v1'` | Written explicitly by the route, not left to the default |
| `completed` | boolean not null default false | |
| `referrer` | text | |
| `utm` | jsonb | Currently dead. §7 wires it up |
| `ip_hash` | text | **New.** Salted SHA-256 of the IP. Never the raw IP |

Indexes: `created_at desc`, `zip`, `routing_category`, and `(ip_hash, created_at desc)`
for the rate limiter.

**Why store `answers` as jsonb *and* denormalise seven columns from it?** The
jsonb is the archive — the engine will change and you will want to re-run old
sessions against new logic. The flat columns are for querying without unpacking
jsonb on every row. They are allowed to disagree with each other over time; the
jsonb is authoritative.

### 4.2 `partners` — contractor capability matrix

Unchanged from the existing design, which is good. Create it **second**.

Keep the comment at `schema.sql:102-104` verbatim — never render `cslb_license`
as "verified" or "authorized" in any UI unless `cslb_verified_at` is set and
someone actually checked the manufacturer's directory. Verified status is a
claim about someone else's business and getting it wrong is a legal problem, not
a UX one.

Add: `updated_at timestamptz not null default now()` with the trigger from §4.5.

### 4.3 `leads` — identified, and only on explicit request

| Column | Type | Notes |
|---|---|---|
| `id` | uuid pk | |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | Trigger-maintained |
| `session_id` | uuid | `references quiz_sessions (id) on delete set null` |
| `full_name` | text not null | `check (length(full_name) between 1 and 200)` |
| `email` | text not null | `check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')` |
| `phone` | text | `check (phone is null or length(phone) <= 40)` |
| `zip` | text not null | `check (zip ~ '^\d{5}(-\d{4})?$')` |
| `street_address` | text | Keep. Not yet collected; will be |
| `notes` | text | `check (length(notes) <= 5000)` |
| `recommendation_summary` | text | **New.** See below |
| `contact_consent` | boolean not null default false | |
| `consent_text` | text | The exact wording agreed to |
| `consent_at` | timestamptz | |
| `photo_urls` | text[] | Keep. Needs Storage; out of scope for V.1 |
| `assigned_partner` | uuid | `references partners (id) on delete set null` |
| `assigned_at` | timestamptz | |
| `status` | text not null default `'new'` | `check (status in ('new','assigned','contacted','quoted','won','lost','invalid'))` |
| `urgent` | boolean not null default false | Copied from the session. Drives SMS |
| `ip_hash` | text | |

**Split `notes` from `recommendation_summary`.** Today `MatchForm.tsx:90-104`
composes the engine summary and the homeowner's own notes into one string and
sends the lot as `notes`. That is fine for a contractor email and bad for a
database — you can never again separate what the homeowner said from what the
engine generated. Send them as two fields and store them in two columns. The
route handler composes the combined text for the notification.

### 4.4 `job_outcomes`

Unchanged in shape. Keep the reasoning comment at `schema.sql:131-139` — the
homeowner confirmation column is what keeps the percentage-of-job model honest,
since the contractor self-reports the value.

`commission_due` stays a **plain column, not generated.** A generated column
would guarantee it equals `partner_reported_value × commission_pct_applied`, but
it would also make a negotiated one-off commission impossible to record. The
flexibility is worth more than the guarantee here. Add a comment saying so, so
the next person does not "fix" it.

Add `updated_at` with the trigger.

### 4.5 Shared: `updated_at` trigger

```sql
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
```

Attach to `leads`, `partners`, `job_outcomes`. Not to `quiz_sessions`, which is
append-only.

### 4.6 Row level security

```sql
alter table quiz_sessions enable row level security;
alter table leads         enable row level security;
alter table partners      enable row level security;
alter table job_outcomes  enable row level security;
```

**Create no policies at all.** Not one.

This is a deliberate and complete lockout. With RLS enabled and zero policies,
the `anon` and `authenticated` roles can do nothing to these tables. The service
role bypasses RLS, so the route handlers still work. The old
`"anon can record a quiz session"` and `"anon can submit a lead"` policies from
`schema.sql:179-183` are **deleted, not migrated** — the browser no longer has a
key, so nothing needs them.

Add this as a SQL comment on each table, because an empty policy list looks like
an oversight and someone will eventually try to be helpful:

```sql
comment on table leads is
  'RLS enabled with zero policies, deliberately. All access is via the service
   role in Next.js route handlers. Do not add an anon policy to make something
   easier - the anon key is public and any policy here is a public policy.';
```

### 4.7 Rate limiting

```sql
create table if not exists submission_log (
  id         bigserial primary key,
  created_at timestamptz not null default now(),
  ip_hash    text not null,
  kind       text not null check (kind in ('session','lead'))
);
create index if not exists submission_log_lookup_idx
  on submission_log (ip_hash, kind, created_at desc);
```

Route handlers count rows for the caller's `ip_hash` in the trailing window
before inserting:

- `session`: max **20 per hour**
- `lead`: max **5 per hour**

Over the limit, return HTTP 429 with a homeowner-readable message. Log it.

`ip_hash` is `sha256(ip + SUBMISSION_IP_SALT)`. **Never store the raw IP.** A raw
IP is personal data under CCPA and buys nothing the hash does not.

This is deliberately simple and not bulletproof — a distributed attacker with
many IPs gets through. It stops the realistic threat (one bored person with a
loop) at near-zero cost and no extra vendor. If it is ever genuinely attacked,
that is the point to add Turnstile, not before.

---

## 5. Migrations

### File layout

```
site/supabase/
  config.toml                                   ← created by `supabase init`
  migrations/
    20260817000001_extensions.sql
    20260817000002_quiz_sessions.sql
    20260817000003_partners.sql                 ← BEFORE leads
    20260817000004_leads.sql
    20260817000005_job_outcomes.sql
    20260817000006_updated_at_triggers.sql
    20260817000007_rls.sql
    20260817000008_submission_log.sql
  seed.sql
  schema.sql                                    ← superseded, see below
```

### Rules

- **One concern per file.** Numbered prefixes are the apply order.
- **Never edit a migration that has been pushed.** Write a new one. This is the
  single most important habit with migrations and the easiest to get wrong when
  you are new to them — an edited migration produces a database whose real shape
  no longer matches what the files say, with no error to tell you.
- Write forward-only. No `down` migrations; Supabase does not use them.
- `create table if not exists` throughout. No `create policy` statements at all
  (§4.6), which sidesteps defect 2 entirely.

### What happens to the old `schema.sql`

**Do not delete it and do not rewrite it.** Add a header comment at the top
marking it superseded and pointing at `migrations/`, and leave the body intact
as the design record it actually is. Deleting files needs Rev's explicit
confirmation.

### `seed.sql`

One inactive test partner and two sample quiz sessions, enough to verify a join
and the assignment flow. Seed data must be obviously fake — company name
`"TEST — do not contact"`, phone `555-0100`. Nothing that could be mistaken for
a real contractor and called by accident.

---

## 6. Environment variables

| Name | Where | Value |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Vercel: all envs + `.env.local` | `https://lqxqmucpxcydwoyfeclj.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel: all envs + `.env.local` | Supabase → Settings → API → `service_role`. **Never `NEXT_PUBLIC_`** |
| `SUBMISSION_IP_SALT` | Vercel: all envs + `.env.local` | Any long random string. `openssl rand -hex 32` |
| `RESEND_API_KEY` | Vercel: all envs + `.env.local` | resend.com → API Keys |
| `LEAD_NOTIFY_EMAIL` | Vercel: all envs | Where lead emails go |
| `LEAD_FROM_EMAIL` | Vercel: all envs | A verified Resend sender |
| `TWILIO_ACCOUNT_SID` | Vercel: all envs | |
| `TWILIO_AUTH_TOKEN` | Vercel: all envs | |
| `TWILIO_FROM` | Vercel: all envs | Twilio number, E.164 |
| `LEAD_NOTIFY_SMS` | Vercel: all envs | Rev's mobile, E.164 |

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is **removed** from Vercel after cutover is
verified — not before, so a rollback stays possible.

Update `site/.env.example` to list every name above with empty values. It
currently lists only the two original ones.

**`.env.local` must never be committed.** Confirm `.gitignore` covers it before
creating the file.

### Graceful degradation

Keep the existing "missing config is not fatal" posture for the **quiz** — if
`SUPABASE_SERVICE_ROLE_KEY` is absent, `/api/quiz-session` returns
`{ sessionId: null }` with HTTP 200 and logs a warning. A homeowner must never
lose a recommendation to a config error.

The **lead** route does the opposite: missing config is a hard 503 with the
existing homeowner-facing copy from `leads.ts:97-101`. A silently dropped lead is
worse than a visible error, because the homeowner thinks they are waiting for a
call that will never come.

---

## 7. Application changes

### 7.1 New: `site/src/app/api/quiz-session/route.ts`

`POST`. Node runtime (`export const runtime = "nodejs"`).

Request: `{ answers, recommendation, referrer, utm }`
Response: `{ sessionId: string | null }`, always HTTP 200 unless rate-limited.

Validate, hash IP from `x-forwarded-for`, rate-limit, insert, return the id.
Set `engine_version` explicitly from a shared constant.

### 7.2 New: `site/src/app/api/lead/route.ts`

`POST`. Node runtime.

Request:
```ts
{
  sessionId: string | null
  fullName: string
  email: string
  phone?: string
  zip: string
  notes?: string                  // homeowner's own words, raw
  recommendationSummary?: string  // engine-generated
  urgent: boolean
  consent: boolean
  consentText: string
}
```
Response: `{ ok: true }` or `{ ok: false, error: string }`.

Sequence:
1. Validate. On failure, 400 with a homeowner-readable message.
2. Rate-limit. Over → 429.
3. Dedupe: identical `email` + `zip` inserted in the last 10 minutes → return
   `{ ok: true }` **without inserting**. Double-submit must look like success to
   the homeowner and must not produce a second row.
4. Insert.
5. Notify. Failures are logged, never surfaced, never block the response.

### 7.3 Rewrite: `site/src/lib/leads.ts`

Delete `supabase()` and both direct-insert bodies. Keep the exported function
names and signatures — `recordSession(answers, rec)` and `submitLead(input)` —
so `QuizFlow.tsx` and `MatchForm.tsx` need minimal changes. Bodies become
`fetch()` calls to the two routes.

Keep every explanatory comment that is still true. The comment block at
`leads.ts:9-14` about the anon key must be **replaced**, not kept — it will
describe an architecture that no longer exists, and a stale comment asserting
the wrong security model is worse than no comment.

### 7.4 `MatchForm.tsx`

Split the composed summary (lines 90-104). Send `recommendationSummary` and
`notes` as separate fields, and pass `urgent: rec?.urgent ?? false`. The
composed string is no longer built client-side; the route builds it for the
email.

### 7.5 UTM capture

`utm` has been a dead column since day one. Wire it: read `utm_source`,
`utm_medium`, `utm_campaign`, `utm_term`, `utm_content` from `location.search`
on first load, stash in `sessionStorage`, include in the quiz-session POST.

Without this there is no way to tell which channel produced a lead, which makes
every future spend decision a guess.

### 7.6 Validation library

`zod` was removed from `package.json` during the V.3 design cleanup, as unused.
It is needed again — these routes accept untrusted public input and hand-rolled
validation of a nested `answers` object is exactly where a mistake hides.

**Re-add `zod`** and define one schema per route. Reject unknown keys. Cap every
string length. `answers` should be validated against the real question ids from
`site/src/lib/quiz/questions.ts`, not accepted as arbitrary jsonb.

---

## 8. Notifications

### Email — every lead

Resend. Subject carries the decision-relevant facts so the inbox list alone is
triageable:

```
[Lead] {zip} — {recommended_tech} — score {lead_score}{ — URGENT if urgent}
```

Body: contact details, the recommendation summary, the homeowner's own notes
quoted separately, the consent text and timestamp, and a link to the Supabase
row. Plain text is fine; do not build an HTML email template for V.1.

### SMS — urgent leads only

Twilio, fired only when `urgent` is true.

```
WHA urgent lead: {full_name}, {zip}. {phone}. {recommended_tech}.
```

**Why urgent-only:** an alert that fires on everything gets muted within a week,
and then it is not an alert. `Recommendation.urgent` already exists and is
already set by the engine for the no-hot-water and leaking-tank paths — the
exact cases where response time decides the job.

---

## 9. Rollout

Each gate must pass before the next step. Do not batch.

| # | Step | Gate |
|---|---|---|
| 1 | `supabase init`, `supabase link` | `supabase projects list` shows the project linked |
| 2 | Write migrations 1–8 | `supabase db reset --local` applies all with zero errors |
| 3 | `supabase db push` | Supabase dashboard → Table Editor shows 5 tables |
| 4 | Verify RLS | Table Editor shows RLS enabled, **0 policies**, on all 4 |
| 5 | Set env vars in Vercel + `.env.local` | `vercel env ls` lists all 10; none start `NEXT_PUBLIC_` except the URL |
| 6 | Re-add `zod`, write both routes | `npm run build` and `npm run typecheck` clean |
| 7 | Rewrite `leads.ts`, update `MatchForm` | Build clean |
| 8 | Local end-to-end | Quiz completion writes a `quiz_sessions` row; form writes a `leads` row linked by `session_id` |
| 9 | Notifications | Real email received. Real SMS received for an urgent path |
| 10 | Rate limit + dedupe | 6 rapid lead posts → 429 on the 6th. Double-submit → one row |
| 11 | Deploy to a **preview**, not main | All checks repeat against the preview URL |
| 12 | Merge to main | Live end-to-end verified with a real submission |
| 13 | Remove `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Vercel | Build still clean; site still works |

Work on a branch: `feat/supabase-v1`. Do not push to `main` without Rev's
explicit go-ahead.

### Acceptance criteria

- [ ] A completed quiz writes exactly one `quiz_sessions` row
- [ ] A submitted form writes exactly one `leads` row, with `session_id` linked
- [ ] Email arrives within 60s of submission
- [ ] SMS arrives for urgent leads only
- [ ] Notification vendor outage still saves the lead and shows success
- [ ] Anon key removed; no Supabase credential in the client bundle
      (`grep -r "supabase" .next/static/` returns no URL or key)
- [ ] All four tables: RLS on, zero policies
- [ ] Missing service-role key → quiz still renders results; lead form shows the
      honest error
- [ ] Double-submit creates one row
- [ ] `.env.local` is gitignored and uncommitted
- [ ] `STARTHERE.md` BLOCKED section updated to reflect reality

---

## 10. Rev's manual steps

These need your accounts and cannot be done unattended.

### Install and link the CLI

```bash
brew install supabase/tap/supabase
supabase --version

cd ~/Desktop/Water-Heater-Advisor/site
supabase login                              # opens a browser
supabase init                               # creates supabase/config.toml
supabase link --project-ref lqxqmucpxcydwoyfeclj
```

`supabase link` will ask for the **database password** — the one set when the
project was created, not your account password. If you do not have it: Supabase
dashboard → Settings → Database → Reset database password. Resetting is safe
right now because nothing is connected yet.

### Get the service role key

Supabase dashboard → **Settings → API**. Two keys are shown. You want
**`service_role`**, marked `secret`, not `anon` / `public`.

Treat it like a password. It bypasses every security rule in the database. Do
not paste it into a chat, a doc, or a commit.

### Add the env vars to Vercel

Vercel → water-heater-advisor → **Settings → Environment Variables**. For each
row in §6: name, value, tick **all three** of Production / Preview / Development,
Save.

Environment variable changes do not apply to existing deployments. **Redeploy
after adding them.**

### Accounts to create

- **Resend** (resend.com) — free tier covers this comfortably. You will need to
  verify a sending domain or use their test sender to start.
- **Twilio** — a phone number is roughly $1/month plus per-message cost. Only
  needed for the urgent-lead SMS.

---

## 11. Explicitly not in V.1

Listed so they are visibly deferred rather than forgotten:

- Analytics views and the funnel dashboard
- An authenticated `/admin` route for browsing and updating leads
- Supabase Storage for `photo_urls`
- Partner assignment logic — `assigned_partner` is written by hand until there
  are partners to assign to
- Automated CCPA deletion. The manual procedure is a single
  `delete from leads where email = ...`; the table split means it never touches
  the analytics data in `quiz_sessions`
- Backfill of pre-launch data. Not possible; it was never captured

---

## 12. Notes for the implementing agent

- **Verify the forward-reference fix first.** Run `supabase db reset --local`
  against an empty database before writing any application code. If migrations
  do not apply cleanly to an empty database, nothing downstream matters.
- **Do not add an RLS policy** because something seems blocked. If a query is
  blocked, it is running as the wrong role. Fix the role, not the policy.
- **Do not put the service role key in a client component.** If a file has
  `"use client"` at the top, it cannot read it.
- **Preserve the existing comments** in `schema.sql` and `leads.ts` where they
  are still true — the CSLB note, the table-split rationale, the TCPA consent
  reasoning. Rewrite the ones the new architecture invalidates. A comment that
  describes a system that no longer exists is worse than silence.
- **Report honestly.** If a gate in §9 fails, say so with the output rather than
  moving on. A half-connected pipeline that reports success is the same failure
  this document exists to fix.
