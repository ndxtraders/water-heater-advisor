# Brand verification pass, 20 August 2026

Desk verification against manufacturers' own public sources. Closes items from
the `unverified` list in `site/src/data/brand-research.json`.

**The research JSON stays read-only.** This file records what changed since the
2026-08-07 pass so the `checked_at` dates in that file remain meaningful.

Scope was two items Rev approved: manufacturer programme status for specific
local contractors, and consumer financing at manufacturer level.

---

## 1. Consumer financing at manufacturer level

Original status: unverified for Navien, A. O. Smith, Noritz and Bradford White.

| Brand | Finding | Status |
|---|---|---|
| Rinnai | Manufacturer-level consumer financing | **ACTIVE**, unchanged from prior research |
| Rheem | KwikComfort Residential Financing, arranged through the contractor or distributor. Promotional terms on the current page reference purchases made on or after 15 January 2026, so the programme is current | **ACTIVE** |
| Navien | NaviLend exists but is **Canada only**, launched through a partnership with SNAP Home Finance. Navien's US rebates and credits page carries no financing of any kind | **NOT AVAILABLE IN THE US** |
| A. O. Smith | A consumer financing programme was announced in 2015 and launched to contractors in 2016 through the GreenSky programme. No current page confirms it still runs, and GreenSky has changed ownership since | **ANNOUNCED HISTORICALLY, CURRENT STATUS UNVERIFIED** |
| Noritz | No manufacturer-level consumer financing found | **NONE FOUND** |
| Bradford White | No manufacturer-level consumer financing found. Contractor channel only, so any financing would come from the installer | **NONE FOUND** |

### Why the Navien result matters

Plenty of writing says "Navien offers financing" on the strength of the NaviLend
announcement without noting it is a Canadian programme. A Modesto or Turlock
homeowner reading that would be misled. This is the kind of item the site exists
to get right, and it is now stated on the Navien page.

### Why the A. O. Smith result is not a yes

A ten-year-old press release is not evidence that a programme is running today.
Recorded as historical rather than active, per the rule that unknown is
preferable to invented precision.

---

## 2. Manufacturer programme status for local contractors

### Bradford White: the designation does not exist publicly

The original research listed "Bradford White Factory Trained status for specific
Modesto contractors" as unverified. That item cannot be closed, and the reason is
worth recording.

Bradford White's public Contractor Finder for Modesto **exposes no training or
certification designation at all.** Each listing carries a company name, a review
score, Residential and Commercial tags, a 24/7 tag where applicable, a phone
number and a distance. There is no Factory Trained badge, no tier and no partner
tenure label.

The directory also carries its own disclaimer: contractors are independently
operated, are not Bradford White employees, and due diligence is encouraged.

Two further observations about what that directory actually is. It returns
thirteen pages of results for Modesto and includes companies as far away as
Oakland, roughly 68 miles out. It is a lead directory sorted by distance, not a
register of local competence.

**Conclusion: reclassify from "not yet checked" to "not publicly verifiable."**
Under our standing rule we can never describe a contractor as Bradford White
Factory Trained on the strength of this source, because the source does not carry
the claim.

### Navien: blocked by a consent gate

Navien's installer and service locator cannot be read without first ticking a
checkbox agreeing that Navien may share the visitor's information with
installers, then clicking Agree and Continue.

That is a data-sharing consent, so it was not accepted on Rev's behalf. The item
stays open.

It is also worth noting as a finding in its own right: a homeowner cannot browse
Navien's installer list anonymously the way they can Noritz's or Bradford
White's. If we ever want this closed, it needs a deliberate decision from Rev
rather than an agent clicking through.

### Already closed in the prior pass

Rinnai and Noritz both expose programme status publicly, and both were confirmed
for the Modesto area on 2026-08-07. Neither page names companies, for the reasons
recorded in the commit history.

---

## Net effect on the unverified list

Closed:

- Consumer financing at manufacturer level for Navien, Noritz and Bradford White
- Consumer financing established for Rheem, which was not previously checked

Reclassified:

- Bradford White Factory Trained status, from unverified to not publicly
  verifiable

Still open:

- Navien NSS status for specific Modesto contractors, blocked by consent gate
- A. O. Smith financing, historical announcement only

---

## Sources

- Navien US rebates and credits page, and the NaviLend Canada launch announcement
- Rheem KwikComfort Residential Financing page
- A. O. Smith consumer financing announcement, 2015 archive
- Bradford White Contractor Finder, Modesto CA
- Navien installer and service locator
