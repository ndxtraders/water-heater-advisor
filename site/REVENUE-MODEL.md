# Revenue model

**Decision: 10% of completed job value, with a $150 floor and a $600 cap.**

Decided 2026-08-07. Encoded as the partner defaults in
[`supabase/schema.sql`](supabase/schema.sql) (`commission_pct`,
`commission_min`, `commission_max`), so they are per-partner overridable without
a code change.

---

## Why percentage at all

Not because it is the best structure. The deep research explicitly warned
against revenue share, and it was right about the reason: it makes us dependent
on contractors accurately reporting what jobs sold for.

It wins anyway because it is **the only structure busy contractors say yes to
without a track record.** Per-lead pricing asks them to pay for something that
might not convert, and they have all been burned by Angi. Percentage asks them
to pay only when they have been paid. That converts a "let me think about it"
into a "sure, send me one" — which is the entire problem at launch.

We are trading revenue per introduction for adoption. That is the correct trade
when the constraint is getting any partner at all.

---

## Why 10% and not 5%

**Contractor economics.** Gross margin on these jobs typically runs 40–50%. At
10% of revenue we are taking roughly 20–25% of gross profit on a job they did
not have to find. That is meaningful but survivable, and it sits inside the
range they already pay in-house comfort advisors on commission.

**Our economics.** We carry 100% of acquisition cost — the site, the content,
the quiz, the SEO, the years before it ranks. At 5% we would need twice the
completed-job volume for the same revenue. On a $2,500 tank replacement, 5% is
$125 for an introduction that took months of content investment to earn.

**Where the ceiling is.** Above roughly 12–15% contractors stop treating the fee
as a cost of sale and start treating it as a problem to solve — by renegotiating,
or by not mentioning jobs.

10% is also simply legible. "Ten percent" needs no explanation in a conversation
with someone standing next to a van.

### Expected value per introduction

| Category | Typical job | At 10% | Notes |
|---|---|---|---|
| Standard replacement | $2,400 | $240 | The volume category |
| Tankless conversion | $5,000 | $500 | Capped at $600 |
| Heat pump conversion | $4,500 | $450 | |
| Repair or maintenance | $400 | $150 | Floor applies |

At an assumed 25–35% close rate on a BANT-qualified introduction, expected value
lands around **$70–150 per introduction sent**. That is below what the research
suggested exclusive leads could fetch ($100–300). We accept the gap in exchange
for partners who will actually sign, and we revisit once close rates are real
numbers rather than assumptions.

---

## The cap is an anti-fraud mechanism, not a concession

This is the part worth understanding, because it looks like we are leaving money
on the table.

Under-reporting pays best on the largest jobs. A partner who shaves a $9,000
whole-house conversion down to $6,000 pockets $300; shaving a $2,200 tank
replacement is barely worth the dishonesty. So the incentive to misreport scales
with job size — exactly where an uncapped percentage has us most exposed.

Capping at $600 flattens that incentive. Past $6,000 of job value the number
stops moving, so there is nothing to gain by misstating it. We give up the tail
and buy accurate reporting across the whole book. On the expected mix that costs
very little, because jobs above $6,000 are the minority.

The floor does the mirror job: it keeps small repair and maintenance
introductions worth the cost of processing.

## The audit mechanism already exists

`job_outcomes` stores `partner_reported_value` **and**
`homeowner_reported_value`, with `homeowner_confirmed_at`.

The homeowner follow-up is worth doing regardless — it is the outcome data that
eventually makes the recommendation engine better than an educated guess, and it
is the natural moment to ask for a review. That it also independently verifies
what the job sold for comes free. Systematic variance is a partner problem, not
a data problem, and `variance_flagged` is where it surfaces.

Do not build automated variance detection yet. With two to four partners, read
the rows.

---

## Migration path

| Phase | Model | Trigger |
|---|---|---|
| 1 | 10% of completed job, $150 floor / $600 cap | Now |
| 2 | Monthly minimum + reduced percentage | Once close rate is known from real data |
| 3 | Category or territory exclusivity | Once one partner wants to lock a category |
| 4 | Per-lead or per-appointment where economics support it | Only where a partner prefers it |

Do not rush phase 2. The percentage model's job is to get partners in the door
and to generate the close-rate data that makes every later model priceable.

---

## Open, and genuinely for counsel

**Whether a percentage-of-job referral fee is permissible in California for
licensed contractor work.** CSLB permits referral services within limits, but
the limits concern how the service represents itself and how the homeowner
contracts and pays. Whether the *fee structure* may be a percentage of the
contract value, rather than a flat referral fee, is a specific question I cannot
answer and would not guess at.

This matters enough to resolve before signing a partner agreement, because the
answer could force a flat-fee structure and change the numbers above. It is a
short question for California counsel, and it should ride along with the review
of the referral structure, contractor agreement and lead-transfer language that
the blueprint already flagged for days 1–3.

**Concentration risk.** Percentage-of-job puts every dollar of revenue downstream
of partner honesty and partner competence. Two to four partners at launch is
right for learning, and dangerous past that — one bad actor is 25–50% of revenue.
Recruit a fifth earlier than feels necessary.
