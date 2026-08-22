# START HERE — Water Heater Advisor

**Updated:** 7 August 2026
**Repo:** https://github.com/ndxtraders/water-heater-advisor
**Working copy:** `~/Desktop/water heater advisor` (repo root; the app lives in `site/`)

> **Everything is under version control.** The repo root is the project root:
> `research/`, this handoff and the original deep-research files are all in git
> alongside `site/`. Push before you finish a session.

---

## What this is

An independent homeowner advisory and installer-matching site. Modesto first,
built to expand by **utility territory**, not by city name.

**It is not a plumbing company and must never present itself as one.** That is a
CSLB constraint, not a style preference, and it shapes the code — no
`LocalBusiness` schema, no NAP block, no testimonials, anywhere.

The commercial thesis is that this site can tell a homeowner *"don't buy
tankless"* and be believed. Every design and content decision serves that.

---

## Run it

```bash
cd ~/Desktop/water\ heater\ advisor/site && npm install && npm run dev
```

Preview is configured in `~/Desktop/.claude/launch.json` as
`water-heater-advisor` on **port 3100** (3000 belongs to another project).

Next.js 16 · React 19 · Tailwind v4 · TypeScript. Every route static. No webfont
requests at runtime.

---

## Data capture — live

**Supabase is provisioned and connected.** Project `lqxqmucpxcydwoyfeclj`, in the
`ndxtraders` org. Quiz completions write to `quiz_sessions` and lead submissions
write to `leads`, both verified end to end on 2026-08-22.

The architecture changed at the same time, and the old description here was
wrong in a way worth stating plainly: the browser no longer holds a Supabase key
at all. Writes go through two Next.js route handlers — `/api/quiz-session` and
`/api/lead` — using the service role, with validation, per-IP rate limiting and
a ten-minute duplicate check in front of them. All five tables run RLS with
**zero policies**, deliberately; see `supabase/migrations/*_rls.sql`.

`supabase/schema.sql` is superseded and must not be run. It never applied
cleanly to any database. `supabase/migrations/` is the source of truth.

### Still outstanding — needs Rev's accounts

1. **Resend** and **Twilio** credentials. Until they are set, a lead still saves
   and the skipped notification is logged; nobody is alerted. See
   `PRD-DATABASE-V.1.md` §10.
2. **Vercel environment variables.** `.env.local` is set locally, but production
   has nothing. The live site still captures nothing until these are added and
   the project is redeployed.
3. **Remove `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Vercel** once the cutover is
   verified in production — not before, so a rollback stays possible.

---

## Current state

### Routes that exist

```
/                                          homepage, quiz question 1 live in hero
/quiz                                      15 questions, urgency branch to 11
/match                                     lead capture + TCPA consent
/emergency                                 safety first, then repair vs replace
/methodology                               published method + conflicts policy
/installers/how-to-choose
/compare/tank-vs-tankless
/water-heaters/tankless/not-right-for-you  the defining editorial piece
/local/california/modesto                  rebates, permits, itemised costs
/brands/navien                             brand page template
/privacy  /terms                           not reviewed by counsel, say so
```

### Broken internal links (all content gaps, none blocking)

```
/water-heaters/gas-storage       ← homepage technology card
/water-heaters/electric-storage  ← homepage technology card
/water-heaters/tankless          ← homepage technology card
/water-heaters/heat-pump         ← homepage technology card
/compare/tankless-vs-heat-pump   ← research rates this highly for Modesto
/brands                          ← brand index
/local/california                ← market index
```

The four homepage cards are the most visible. **Keep nav and footer pointing only
at routes that exist** — a dead link on a site whose pitch is carefulness is
worse than a thin menu.

---

## Decided — do not relitigate

| Decision | Why |
|---|---|
| **Blue primary, red purposeful** | Red is primarily used for emergencies or "not a fit," and for important areas where red can call out key distinctions without necessarily carrying a negative connotation. Primary CTAs remain blue. |
| **Green is a verdict colour, never type** | A green heading would collide with the one place green must mean something, and starts signalling "eco" on a technology-neutral site. |
| **Sans headings, not serif** | v1 used a serif and read as an editorial magazine. Corrected against a real local plumbing site. |
| **10% of completed job, $150 floor, $600 cap** | See `site/REVENUE-MODEL.md`. The cap is anti-fraud, not a concession — misreporting incentive scales with job size. |
| **Two engines, separated** | `recommend()` cannot see partner data. `routingCategory()` runs after. This is the critical architectural rule. |
| **Elimination before scoring** | Preference points must never revive a technically eliminated option. |
| **No descaling question** | Asks a homeowner to predict their own diligence about a task they have not heard of. Returns an optimistic yes from everyone, which is noise. Handled as disclosed cost of ownership instead. |
| **Partner matching stays manual** | You do not yet know how contractors classify work they want. Auto-routing on assumptions burns relationships, which under a percentage model is unaffordable. |
| **Never publish a single average price** | Ranges only, itemised. |
| **Never "authorised"/"certified"** | Not without confirming in the manufacturer's own directory. |
| **Measure contrast, do not assert it** | Three separate AA failures were found this way. Re-measure whenever a colour token moves. `DESIGN-SYSTEM.md §8`. |

---

## Reference documents

| File | What it holds |
|---|---|
| `site/README.md` | Architecture, component vocabulary, constraints |
| `site/DESIGN-SYSTEM.md` | Palette with measured contrast, typography, section rhythm |
| `site/REVENUE-MODEL.md` | Commission model, the cap rationale, open legal question |
| `research/LOCAL-PRICE-OBSERVATIONS.md` | **Authority for every price on the site.** National figures never appear as local prices. |
| `research/PHASE-2-MANUFACTURER-RESEARCH.md` | Mostly complete; lists what desk research could not resolve |
| `research/Deep Research/*.json` | 31 product lines, 40 selection rules, 6 routing records. Imported at `site/src/data/brand-research.json`, read-only |
| `Water Heater Advisor_ Deep Research Blueprint.md` | The original strategy blueprint |

---

## Next actions, in order

1. **Provision Supabase.** Everything else is downstream. See BLOCKED above.
2. **Four `/water-heaters/*` pages.** Homepage cards currently 404.
3. **`/compare/tankless-vs-heat-pump`.** Research rates this a top page for
   Modesto specifically, because the utility rebate maths genuinely changes the
   answer here.
4. **Contractor conversations.** 5–10 Modesto companies. Ask which water heater
   jobs they want *most* and which they do *not* want. That answer is the
   routing data, and it also resolves four unverified items at once: local
   parts stock by brand, who holds manufacturer status, real conversion
   pricing, and emergency premium.
5. **`/repair-or-replace` as its own page.** Approved, deliberately not built
   yet. The content already exists as a section on `/emergency`, anchored at
   `/emergency#repair-or-replace`, and it carries the leak-source diagram. The
   case for lifting it out: "repair or replace water heater", "is my water
   heater worth fixing" and "water heater leaking from the bottom" are a
   distinct search intent from an emergency, and somebody researching calmly
   will not self-select into a page framed around panic. Today `/emergency` is
   reachable from exactly one place — the EmergencyBar — and appears in no nav
   and no footer column. When built: keep `/emergency` linking to it for the
   urgent path, give it its own title and metadata, and add it to the footer's
   *Decide* column, where it is arguably the most-searched of the four entries.
6. **California counsel review.** Referral structure, the percentage-of-job fee,
   TCPA consent flow, privacy. Flagged in `REVENUE-MODEL.md`. Needed before
   money changes hands.

### Highest-leverage unverified fact

**Modesto winter inlet water temperature.** It sets the design temperature rise
that the entire tankless sizing output depends on. Currently modelled at 55°F
winter / 72°F summer in `site/src/lib/market.ts`, marked `modelled` not
`measured`, and stated on screen as an assumption. One call to the water
provider or a local plumber would settle it.

---

## Working notes for the next agent

- **Rev's content gates apply.** No em-dashes in user-facing copy. Voice skills
  and `ai-check` for any long-form content.
- **Verify in the browser, do not assume.** Several real bugs were caught this
  way: a link overlay escaping its card and swallowing the page, `pb-0` failing
  to cancel `sm:py-28`, and three contrast failures.
- **The preview pane returns blank frames after scripted scrolls.** Not a page
  bug. Screenshot immediately after `navigate`, or verify via DOM queries.
- **Commit in small pieces with the reasoning in the message.** The commit log is
  a genuine decision record here; read it before changing something that looks
  arbitrary, because it usually is not.
