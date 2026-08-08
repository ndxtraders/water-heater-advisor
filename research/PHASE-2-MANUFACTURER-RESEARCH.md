# Phase 2 research — manufacturer and brand data

**Status: mostly COMPLETE as of 2026-08-07.** Delivered by the brand and product
deep research pass in [`deep research/`](deep%20research/). The dataset covers
warranty structure, current model lines, installer programmes and technology
coverage for all six brands, and is imported into the site at
`src/data/brand-research.json`.

**What it did not resolve, and cannot from desk research:**

1. **Which specific Modesto companies hold manufacturer status.** Navien NSS and
   Bradford White Factory Trained were both explicitly unverifiable. This comes
   out of the contractor conversations, not more research.
2. **Actual local parts stock by brand.** PACE Supply and Ferguson have Central
   Valley presence, but exact Modesto and Ripon inventory needs a phone call.
3. **Brand-specific installed price bands in Modesto.** The research declined to
   guess, correctly. See [`LOCAL-PRICE-OBSERVATIONS.md`](LOCAL-PRICE-OBSERVATIONS.md).
4. **Exact Modesto cold-water inlet temperature by season and ZIP.** This one
   matters more than it sounds: it sets the design temperature rise the whole
   tankless sizing output depends on. The engine currently assumes 65°F and says
   so.
5. **Comparative reliability between the six brands.** The research refused to
   manufacture a ranking, which was the right call.

Everything below is the original brief, kept for the fields still outstanding.

---

---

## Why this was deferred rather than guessed

Every field below is **volatile** — it changes without notice, and it varies by
model, by registration status, by installation type and by geography. Publishing
a plausible-sounding figure would be worse than publishing nothing, because a
homeowner who relies on "15 year warranty" and later loses a claim on a
technicality has been actively harmed by the site.

The deep research blueprint says this directly: store warranty at **model
level**, with `source URL + checked date + applicable conditions`. Never a flat
`brand → warranty years` field.

The design already accommodates the gap. `RebateStatus state="verify"` renders
as an **unfilled outline badge** specifically to mark a claim the site has not
confirmed. Filled badges are claims; the empty badge is a visible non-claim.

---

## Brands in scope

Priority order, based on what Modesto-area installers actually advertise:

1. **Navien** — template already built at `/brands/navien`
2. **Rinnai**
3. **Rheem** — valuable because it spans storage, tankless *and* heat pump
4. **A. O. Smith** — same breadth as Rheem
5. **Noritz**
6. **Bradford White**

---

## Fields to research, per brand

### 1. Current warranty terms

Do **not** record a single number. Record per model:

| Field | Notes |
|---|---|
| `model` | Specific model number, not product line |
| `component` | Heat exchanger, parts, labour are usually different terms |
| `term` | |
| `conditions` | Registration required? Professional install required? |
| `residential_vs_commercial` | Terms often differ |
| `source_url` | Manufacturer warranty document, not a retailer page |
| `checked_at` | |

**Publishing rule:** the page shows conditions and points the homeowner at the
warranty document for the exact model quoted. It never prints a headline number.

### 2. Current model lines

- Active product lines per technology (tankless / storage / heat pump)
- Which models are current versus discontinued but still in distribution
- Typical capacity or GPM range per line
- Notable features that change the install (integrated recirculation, 120V
  operation, venting requirements)
- Source: manufacturer product documentation, dated

### 3. Installer program specifics

- Program names and tiers
- What qualification actually requires (training, volume, certification)
- Whether the program includes a public contractor locator
- Whether program status affects warranty terms
- Whether the manufacturer offers consumer financing

**Publishing rule, and this one is firm:** never describe any installer as
"authorised", "certified" or equivalent unless that exact status has been
confirmed in the manufacturer's own directory. It is a claim about someone
else's business and it changes without notice. Default wording is *"a local
installer that works with Navien systems."*

### 4. Local service coverage — Modesto

**The most commercially important field on any brand page.** The best unit on
paper is the wrong purchase if nobody within thirty miles services it properly.

Per brand, for the Modesto market:

- Which local companies install it
- Which local companies *service* it (often a shorter list)
- Verified manufacturer program status, if any
- Parts availability — held locally or ordered in
- Nearest distributor
- Any brand a local company appears to lead with

This overlaps heavily with the contractor conversations, so it should come out
of those rather than being researched separately. When a contractor is asked
which jobs they want most, ask which brands they stock and who services them.

---

## Source standards

Same bar as the rest of the project:

- Manufacturer documentation over retailer pages
- Official installer directories over aggregator listings
- Everything dated, everything with a source URL
- Where evidence is weak, the field stays `VERIFY` rather than getting a
  confident-sounding guess

---

## Where the data lands

Each researched field replaces a `VERIFY` badge on the relevant brand page and
gains a `SourceNote` with its check date. See
[`src/app/brands/navien/page.tsx`](../site/src/app/brands/navien/page.tsx) for
the shape — the panel rows are already structured for it.

Longer term this belongs in a table rather than in page components, keyed:

```
brand → technology → product line → model → component → term → conditions → source → checked_at
```

Do not build that table until at least two brands have been researched by hand.
The shape of the data is not yet known well enough to schema it.
