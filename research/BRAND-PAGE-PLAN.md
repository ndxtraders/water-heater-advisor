# Brand page plan

**Written:** 20 August 2026
**Status:** proposal, not yet approved
**Source of truth:** `site/src/data/brand-research.json`, checked 2026-08-07

Six brands are in the dataset. One page exists (`/brands/navien`). The hub at
`/brands` now lists all six and marks the five that have no page, so nothing is
linked that does not exist.

This file decides what gets written next and, more importantly, what cannot
honestly be written yet.

---

## The finding that drives the whole plan

Coverage in the research is **not** even across the six brands, and it is uneven
in the one dimension that matters most.

| Brand | Product lines | Warranty profiles | Selection rules | Head-to-heads | Page status |
|---|---:|---:|---:|---:|---|
| Navien | 4 | 2 | **14** | 1 | Published |
| Noritz | 3 | 2 | **13** | 1 | Ready to write |
| Rinnai | 4 | 2 | **10** | 2 | Ready to write |
| Rheem | 7 | 1 | 3 | 1 | Narrow scope only |
| A. O. Smith | 8 | 2 | **0** | 0 | Blocked |
| Bradford White | 5 | 2 | **0** | 0 | Blocked |

Specifications are well covered everywhere. **Selection rules are not.**

That distinction is the plan. A brand page on this site is not a spec sheet. Its
load-bearing section is "worth shortlisting if / look elsewhere if", and that
section is written from selection rules, not from a product catalogue. A. O.
Smith has the largest catalogue in the dataset and zero rules about when to pick
it, which means a page for it could be long, accurate, and useless.

Writing one anyway would produce exactly the confident, sourceless brand page
this site exists to be better than.

---

## Build order

### Tier 1: write now

**Rinnai** and **Noritz**. Both carry double-digit selection rules, two warranty
profiles each, and head-to-head data against brands we already cover.

- **Rinnai** is the highest value of the two. It is the other name homeowners
  have heard, it has the most head-to-head coverage in the dataset (against both
  Navien and Noritz), and it has a genuine correction worth publishing: Rinnai
  states plainly that it does not make electric tankless, which contradicts a
  common assumption.
- **Noritz** is the specialist case. Gas tankless only, and the **strongest
  Central Valley parts position of the six**, which is a real local advantage and
  the kind of thing that should move a recommendation in Modesto and Turlock.
  Its EZ Pro line is described in the research as one of the strongest
  retrofit-specific lines, with top-mounted water connections and field NG-to-LP
  conversion.

Each follows the Navien template exactly. That template is already documented in
the file header of `site/src/app/brands/navien/page.tsx`.

### Tier 2: write with a narrower scope

**Rheem.** Seven product lines but only three selection rules and a single
warranty profile. Enough for a real page, not enough for a confident
"look elsewhere if" list.

Write it with a shorter verdict section and lean on the one thing the research
does say clearly: Rheem's current **120V heat pump option can change whether a
conversion is feasible at all**, which matters enormously to any house where the
panel is the blocker. That single fact is worth a page on its own, and it is
directly relevant to the payback maths now published on the Turlock page.

### Tier 3: blocked, and should stay blocked

**A. O. Smith** and **Bradford White.** Zero selection rules, zero head-to-heads.

They should keep their "thin" cards on the hub until the gap closes. The hub
card already explains why in the reader's own terms.

Both still have something worth saying that is not a full page:

- Bradford White is **contractor channel only**, so it is never the box you
  priced at a big box store. That single fact resolves a lot of homeowner
  confusion about why quotes differ, and it already appears on the hub card.
- A. O. Smith also has a current 120V heat pump option, same as Rheem.

---

## The overlooked opportunity: head-to-head pages

The dataset holds **four** head-to-head records, and they map onto the exact
comparisons homeowners actually search:

| Comparison | Technology | Brands covered by a page? |
|---|---|---|
| Navien vs Rinnai | Gas tankless | Navien yes, Rinnai after Tier 1 |
| Rinnai vs Noritz | Gas tankless | Both after Tier 1 |
| Rheem vs A. O. Smith | Heat pump | Neither yet |
| Bradford White vs A. O. Smith | Storage | Neither yet |

Worth noting: **Bradford White vs A. O. Smith is more writable than either brand
page.** A comparison needs a relative judgment, and the head-to-head record
supplies one, where the individual selection rules do not. The same is true of
Rheem vs A. O. Smith.

That inverts the obvious build order. If the goal is useful pages rather than
complete coverage, two comparison pages may be worth more than two thin brand
pages, and they can be written from data already in hand.

---

## What unblocks Tier 3

The research file lists what it could not resolve. The items that block brand
pages specifically:

- Brand-specific comparative reliability and failure rates
- Known bad production years or model lines across all six
- Exact current Central Valley parts stock by brand
- Brand-specific installed price bands
- Which local contractors hold which manufacturer status
- Model-level water hardness limits and descaling intervals

Almost all of that falls out of **the contractor conversations already sitting at
item 4 of STARTHERE's next actions**. Five to ten local companies, asked which
brands they stock, which they refuse to touch, and what they actually carry on
the van, would resolve parts availability, manufacturer status and real brand
pricing at once.

That is one piece of fieldwork unblocking two brand pages, four comparison
pages, and the local price gaps on both city pages. It is the highest-leverage
item on the list and it is not a research task, it is a phone call.

---

## Standing rules for any brand page

Taken from `meta.rules` in the research file, not invented here. These are
already enforced on the hub.

1. Technical feasibility outranks brand preference. Brand is the last decision.
2. Never size tankless from headline maximum GPM. Use verified flow at the design
   temperature rise.
3. Never publish a blanket warranty term. Store line, component, use case,
   recirculation condition, source and checked date.
4. Never call a contractor authorised, certified or trained unless that exact
   status appears in the manufacturer's current directory.
5. Never use budget to select a brand without current local price evidence.
6. Unknown is preferable to invented precision.

---

## Recommended sequence

1. Rinnai brand page
2. Noritz brand page
3. Navien vs Rinnai comparison
4. Rheem brand page, narrow scope
5. Contractor conversations
6. Reassess A. O. Smith and Bradford White with what those conversations return
