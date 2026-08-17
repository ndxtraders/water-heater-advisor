# Water Heater Advisor — Design System

**Status:** v1, authored August 7, 2026. Every decision below is settled. Change them
deliberately, not incidentally.

---

## 1. The design problem

Most sites in this category are built by someone who profits from one answer.
Plumber sites want the install. Manufacturer sites want the unit. Angi wants the
contact record. Every one of them is dressed to sell.

Water Heater Advisor's entire commercial thesis is that it is *not* doing that — it
can tell a homeowner "don't buy tankless" and mean it. If the site looks like a
contractor landing page, that claim dies on arrival, and the business model dies
with it.

So the design brief is narrow:

> **Look like something that renders a verdict, not something that closes a sale.**

Everything below follows from that one sentence.

### The three things the design must do

1. **Read as independent.** Editorial, not promotional. No stock photography of
   smiling technicians. No urgency banners on educational pages. No color used
   decoratively.
2. **Make a verdict legible in three seconds.** The recommendation output is the
   product. A homeowner should be able to see *recommended / alternative / not a
   fit* without reading a paragraph.
3. **Show its work.** Every volatile claim — rebates, code, pricing, local data —
   carries a visible source and a checked date. This is the blueprint's
   `source + checked date + confidence` rule promoted from a database field to a
   UI component.

That third one is the differentiator. No competitor does it, and it is cheap to
build and expensive to fake.

---

## 2. Visual register

**Modern local-service, with an independent editorial spine.**

### What changed from v1, and why

v1 was set as an *independent reviewer* — serif headings, warm cream paper, a
copper accent, near-flat surfaces, restrained everything. The reasoning was that
looking unlike a contractor site would signal independence.

It signalled the wrong thing. The output read as an editorial publication, or
frankly as an AI company's marketing page, rather than as a tool a homeowner uses
to make a decision. The register was *correct in theory and wrong in the room*.

Corrected by studying a well-built local plumbing site (J. Hart Plumbing,
Sonora). The instructive finding: **its palette was almost identical to ours** —
Baltic Blue `#0B5FA6` against our `#1a57ad`, Flag Red `#C71F2D` against our
`#c2181d`. Hue was never the problem. The difference was entirely in typography
and surface treatment.

### Adopted

| Pattern | Why it earns its place |
|---|---|
| **Heavy sans headings** (Plus Jakarta Sans 800 in V.2; **Archivo** from V.3) | The single biggest fix. The serif was doing most of the "editorial publication" work. V.3 kept the weight and changed the face — see §4. |
| **Dark navy band sections** | v1 had no arrival and no rhythm — every section the same weight. Dark bands mark the moments that matter. |
| **Tinted light sections** (`#eff7ff`) rather than neutral grey | Blue-tinted surfaces read as a designed system; flat grey reads as unstyled. |
| **Cards with radius, shadow and a hover lift** | v1's near-flat cards on flat ground felt like a document, not a tool. |
| **Icon chips** in tinted rounded squares | Gives each card an anchor and a scan point. |
| **Pill badge eyebrows** | More presence than bare uppercase type, and somewhere for an icon to live. |
| **Short accent rule under section headings** | Cheap, distinctive, gives every heading a consistent finish. Blue on light, **white on dark** — V.2 rendered the dark variant in flag red, which is decorative red by any honest reading and contradicted §3 two lines below the rule that forbids it. |
| **Trust bar** under the hero | Excellent device. See below for the content swap. |

### Deliberately not adopted

| Pattern | Why not |
|---|---|
| **Red as the CTA colour** | Red is the contractor tell. Kept for emergency and "not a fit" only — see §3. |
| **`animate-pulse-subtle` on CTAs** | Pure urgency persuasion. The whole thesis is that this site does not do that. |
| **Testimonials, star ratings, review counts** | Not a service business. Also a CSLB problem. |
| **Hero photography of crew and vans** | There is no crew. Showing one implies we perform the work. |
| **Trust bar *content*** | "Family-Owned Since 1984 · Licensed & Insured · Same-Day Service" would be a lie here. The device is kept, the claims are swapped for ours: *we do not install anything · every figure sourced and dated · one installer, not four · recommendation before contact details.* Each is falsifiable, and each is something no plumber's site can say. |

The emergency funnel is still handled structurally rather than stylistically —
see `EmergencyBar` in §7. The emergency path gets urgency; educational pages
never do.

---

## 3. Color

### Principle

**Color carries meaning or it does not appear.** There is no decorative color in
this system. If a hue shows up, it is encoding a verdict, a status, or a state.

This is not minimalism for its own sake. A site that colors things because they
look nice cannot then use color to say "this option is wrong for your house" —
the signal is already spent.

### Brand: red, white and blue — with red rationed

Red, white and blue is this category's visual language and the trust register
American homeowners already read. The site borrows it. The question is *how*,
and the answer is the single most important rule in the palette:

> **Blue carries the brand. Red is rationed to two jobs: emergency, and "not a
> fit."**

On a plumber's site red is the primary — the logo, the banner, the CALL NOW
button. Doing the same here would make the site look like the companies it
refers work to, which is a positioning problem and a CSLB problem at once. Used
sparingly against navy, the same red reads as a warning system rather than a
sales voice, and it stays available for the one moment it genuinely needs to
shout.

```
--ink         oklch(0.24 0.03 255)     #15202d   Body and headings.
--navy        oklch(0.29 0.07 258)     #132b4d   Brand. Wordmark, nav, footer, lead paragraphs.
--blue        oklch(0.484 0.135 253.6) #1a5fa8   Links, primary CTA, focus.
--blue-bright oklch(0.591 0.145 251.5) #2f80d0   Hover and non-text UI only.
--flag-red    oklch(0.52 0.20 27)      #c2181d   Emergency and "not a fit". Nothing else.
--paper       oklch(0.995 0.001 250)   #fdfdfe   Page background. Near-neutral white.
```

**On the blue's hue.** V.3 moved it from OKLCH 258 to 254 — CSS hue 215 to 208. Measured
against the two best-built sites in the category, J. Hart Plumbing sits at 207 (`#0b61a8`)
and Aim High HVAC at 211 (`#2b6cb0`). At 215 this palette read faintly indigo where the
category reads blue. Lightness is unchanged, so every ratio below holds.

**Previous palette, and why it changed.** v1 used warm cream paper with a copper
accent. It was correctly called out as reading like an AI company rather than a
homeowner utility — cream plus copper plus a serif is a very specific current
signature. The cream is gone and paper is now near-neutral white.

**On green.** There is none, as of V.3. Through V.2 it appeared in exactly one
place, `--verdict-fit`, on the argument that a verdict hue must not collide with
anything else. That argument held right up until it didn't: the same reasoning —
that green quietly signals *eco*, which a technology-neutral advisor cannot
afford when it has to be able to recommend a gas tank — applies to the verdict
scale itself. The scale now runs on blue, red and a fill rule. See below.

Amber went with it. `--status-warn` existed for a single rebate state and was the
only warm hue in the system; the fill rule expresses the same thing. What is left
is blue, red, ink and paper.

### Verdict scale

The recommendation output. Always paired with an icon **and** a text label —
never color alone. Roughly 8% of men have some form of color vision deficiency,
and this is the exact moment the site cannot afford to be misread.

```
--verdict-fit      oklch(0.507 0.111 240.1)  #0f6c9e   ✓ Recommended     FILLED
--verdict-alt      oklch(0.5 0.02 256.3)     #5c646f   ○ Worth considering  OUTLINED
--verdict-unfit    var(--flag-red)           #c2181d   ✕ Not a fit       FILLED
```

**Three states, two hues, one fill rule.** Through V.2 "recommended" was green.
Green is gone, for two reasons that point the same way: it was the only hue in
the system belonging to no other part of it, and on a technology-neutral advisor
it quietly argues *eco* — which a site that must be able to recommend a gas
storage tank cannot have its own palette contradicting.

What replaced it is not another hue. It is the fill rule already proven in
`RebateStatus`: **a filled badge is a claim, an outlined badge is not.** So the
two states where the site commits — recommended, not a fit — are filled and wear
the site's two colours. "Worth considering" is the outline, because it is a
weaker statement and should look like one.

Fit blue is deliberately lighter and more cyan than `--blue`. A verdict must
never read as a link.

Note that a *fit* means "suits your house," not "environmentally good." The
verdict scale is orthogonal to technology. A gas storage tank can and often
should come back recommended.

### Rebate status

The blueprint is emphatic that a stale rebate finder is worse than no rebate
finder, and that incentives are live data. Four states, and the design of the
fourth is the important one:

```
ACTIVE            filled, --verdict-fit           Confirmed available.
RESERVED          SOLID OUTLINE, ink              Funded but waitlisted (e.g. HEEHRA).
EXPIRED           filled, --muted, strikethrough  Ended (e.g. federal 25C after 2025).
VERIFY            DASHED OUTLINE, no fill         We have not confirmed this.
```

V.3 removed the amber that used to carry RESERVED. It was the only warm hue in
the system and it existed for exactly one state. The fill rule says the same
thing without spending a colour: the claim is real, the offer is not open.

`VERIFY` renders as an **unfilled outline**. Filled badges are claims; the empty
badge is visibly a non-claim. A homeowner can tell at a glance which numbers the
site stands behind and which it does not. That visual honesty is the brand.

### Neutrals

Ten steps from paper to ink, all carrying a trace of the same blue so greys never
go muddy against the navy.

---

## 4. Typography

### Stack

```
--font-heading: Archivo 700/800          (self-hosted via next/font)
--font-sans:    system stack             (no webfont)
--font-mono:    IBM Plex Mono 500        (self-hosted via next/font)
```

**Three roles, and the third one is the point.**

*Headings — Archivo.* An American grotesque with signage and newspaper lineage,
which reads civic and declarative: the register of something that renders a
verdict. It replaces Plus Jakarta Sans, which fixed V.1's serif problem
correctly but is the geometric sans every template reaches for, and so argued
for nothing in particular.

*Body — the system stack.* Inter was the largest single asset on the site and is
very nearly indistinguishable from SF Pro on the phones that are half this
audience. Removing it also removes the largest webfont swap surface on the page,
which is where layout shift actually comes from. `.tabular` survives: SF Pro,
Segoe UI and Roboto all carry tabular figures.

*Data — IBM Plex Mono.* This token was defined and unused for two versions. The
site's real subject matter is specification — permit line items, model numbers,
GPM figures, rebate programme names, checked dates — and setting that layer in
mono is what makes the sourcing UI read as apparatus rather than as fine print.
Applied through the `.apparatus` class.

Measured payload, latin subsets as built by `next/font`: **73.9KB → 43.9KB.**

Weight is a hierarchy axis, not a constant: h1/h2 at 800, h3/h4 at 700. Tracking
scales with size — -0.028em at h1 down to -0.008em at h4 — because -0.022em is
right at a 3rem hero and visibly too tight at 1.25rem.

v1 used a serif on the theory that it would separate the site from the uniformly
geometric-sans contractor pages in the SERP. It did — in the wrong direction. It
read as a magazine rather than as a decision tool. **The independence comes from
what the page says and from the sourcing UI, not from the typeface.**

Self-hosted at build time by `next/font`, so there is no runtime request to
Google. **There is still a layout shift** — `display: swap` paints the fallback
first and swaps, and `next/font`'s size-adjusted fallback metrics shrink that
shift rather than removing it. Earlier versions of this document and of
`layout.tsx` claimed otherwise, which was wrong. Dropping the body webfont in
V.3 removes the largest swap surface on the page, which is the part that
actually mattered.

Monospace is reserved for numbers that need to align — cost tables, GPM figures,
model numbers. Tabular figures in cost breakdowns are not optional; misaligned
prices in a comparison table are a legibility bug.

### Scale

Major third (1.25), 16px base.

| Token | Size | Use |
|---|---|---|
| `xs` | 0.75rem | Badges, checked-date stamps |
| `sm` | 0.875rem | Captions, table cells, source notes |
| `base` | 1rem | Body |
| `lg` | 1.125rem | Lead paragraphs |
| `xl` | 1.25rem | h4 |
| `2xl` | 1.5rem | h3 |
| `3xl` | 1.875rem | h2 |
| `4xl` | 2.25rem | h1 |
| `5xl` | 3rem | Hero h1 |

### Measure

Body prose caps at **68ch**. Comparison tables and quiz UI are exempt — they are
scanned, not read.

Line height: 1.65 body, 1.15 display. Long-form explanation is the product;
tight leading on a 900-word technology page is a comprehension tax.

---

## 5. Space, radius, elevation

**Spacing** is a 4px scale. Section rhythm is `5rem` mobile / `7rem` desktop.
Whitespace does real work in the reviewer register — it is what makes a page read
as considered rather than crowded.

**Radius is `0.5rem`, and cards go further (`rounded-2xl`).** This section
described `0.375rem` and "slightly squared reads documentary" until V.3 — a V.1
rule that survived the V.2 repalette by oversight and contradicted both §2 and
the shipped code. V.2 deliberately softened the radius on the argument that flat
cards on a flat background read as a document rather than a tool, and that is
what ships. Badges are fully rounded pills, because they are labels rather than
surfaces.

**Elevation is one quiet shadow.** Borders still do most of the separation work.
`TechnologyCard` carries a hover lift because it navigates — the whole card is a
stretched link. Nothing that does not navigate lifts; the unused `interactive`
prop on `Card` was removed in V.3 rather than left as an affordance that lies.

---

## 6. Motion

Minimal and functional. `150ms ease-out` for state changes, `250ms` for quiz step
transitions. No scroll-triggered reveals, no parallax, no counting-up numbers —
all of which read as persuasion.

Everything respects `prefers-reduced-motion`.

---

## 7. Component vocabulary

The inherited framework's sections are contractor-shaped (`Services`,
`WhyChooseUs`, `Proof`, `Testimonials`, `ContactInfo`). Those are retired. The
advisor vocabulary replaces them:

| Component | Job |
|---|---|
| `VerdictCard` | The recommendation output. Fit / alternative / not-a-fit, with reasoning. **The single most important component on the site.** |
| `ComparisonTable` | Technology vs technology. Responsive: table on desktop, stacked cards on mobile. Never a horizontal scroll. |
| `TechnologyCard` | One water-heater type — strong fit, poor fit, key cautions. |
| `CostBreakdown` | Line-item job modeling: unit, labor, gas line, venting, electrical, condensate, permit. Never a single headline number. |
| `RebateStatus` | The four-state badge from §3. |
| `SourceNote` | Inline citation with checked date. Appears anywhere a volatile claim does. |
| `LocalDataPanel` | Per-market data with per-field source and freshness. |
| `QuizShell` / `QuizQuestion` / `QuizProgress` | The quiz. Branches on urgency. |
| `DecisionPath` | Where the homeowner is in the funnel: problem → technology → feasibility → sizing → cost → local → match. |
| `EmergencyBar` | Short-circuit for the emergency funnel. The *only* place urgency styling is permitted. Rendered in the root layout and self-hiding on `/emergency`, so it covers every route — through V.2 it appeared on the homepage alone, which is the page a panicking homeowner is least likely to land on. |
| `Prose` | Long-form editorial wrapper enforcing the 68ch measure. |

### What is deliberately absent

No `Testimonials`. No NAP block. No `LocalBusiness` schema — Water Heater Advisor
is not a local business, and CSLB rules are explicit that a referral service
cannot present itself as performing the construction. Emitting `LocalBusiness`
markup tells Google exactly the thing the site must not claim. This is a legal
constraint expressed as a design constraint, and it is not negotiable.

---

## 8. Accessibility floor

### Measured contrast

Not asserted — measured in the browser against the rendered tokens, on
2026-08-07, and again for V.3. The first pass failed: the v1 copper accent came
out at **3.61:1** as link text and `--muted-foreground` at **3.81:1**, both under
the floor this document claims. Both were darkened and re-measured. Copper itself
is long gone — the note survives because the lesson did.

Re-measured for V.3, after the hue shift and the removal of green and amber.
Every pair below was computed from the shipped tokens, not asserted.

| Pair | Ratio | |
|---|---|---|
| `--ink` on paper | 16.18 | ✅ |
| `--navy` on paper | 13.95 | ✅ |
| `--blue` on paper (links) | 6.36 | ✅ |
| White on `--blue` (primary button) | 6.47 | ✅ |
| `--flag-red` on white | 6.00 | ✅ |
| White on `--flag-red` | 6.10 | ✅ |
| `--muted-foreground` on paper | 6.99 | ✅ |
| White on `--verdict-fit` (filled badge) | 5.74 | ✅ |
| `--verdict-alt` on paper (outlined badge) | 5.89 | ✅ |
| White on `--verdict-unfit` (filled badge) | 6.10 | ✅ |

On dark. Red no longer appears on the bands at all, so the `--flag-red-light`
pairs that used to live here are gone with it — the rule and the trust-bar icons
are white now.

| Pair | Ratio | |
|---|---|---|
| White on `--navy-deep` | 17.74 | ✅ |
| Rule at white/80 on `--navy-deep` | 11.04 | ✅ |
| Trust icons at white/85 on `--navy` | 10.05 | ✅ |
| `--ink` on `--tint` | 15.21 | ✅ |
| `--muted-foreground` on `--tint` | 6.57 | ✅ |
| `--blue` on `--tint` (eyebrow pill) | 5.98 | ✅ |

Re-measure whenever a colour token moves. A stated floor that is never measured
is decoration.

### Rules

- Body text meets WCAG AA (4.5:1); large text and UI meet 3:1.
- Verdict and status are **never** encoded in color alone — icon plus text label,
  always.
- Visible focus ring on every interactive element, `--blue-bright` at 2px offset.
- Quiz is fully keyboard navigable; each step moves focus to its heading and
  announces progress via a live region.
- Comparison tables use real `<th scope>` markup, not styled divs.
- Target size minimum 44×44px. Half this audience is on a phone, and some of them
  are standing in a garage next to a leaking tank.

---

## 9. Open, deliberately

- **Photography.** None in v1. If it earns its way in later it should be
  documentary — actual installations, actual rating plates — never stock.
- **Dark mode.** Removed in V.3. The `.dark` block was never updated in the
  V.1→V.2 repalette, so its `--blue` still resolved to `#e08e5a` — the dead
  copper — along with `--accent` and `--ring`. Nothing set `.dark`, so it never
  rendered; it shipped as a trap for whoever enabled it. If dark mode is wanted
  later it should be authored fresh against the current palette, not revived.
- **Source Serif 4.** Closed. V.3 removed the body webfont entirely; adding a
  serif back would reintroduce the swap surface that removal just bought.
