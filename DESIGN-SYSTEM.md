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
| **Heavy geometric sans headings** (Plus Jakarta Sans, 800) | The single biggest fix. The serif was doing most of the "editorial publication" work. |
| **Dark navy band sections** | v1 had no arrival and no rhythm — every section the same weight. Dark bands mark the moments that matter. |
| **Tinted light sections** (`#eff7ff`) rather than neutral grey | Blue-tinted surfaces read as a designed system; flat grey reads as unstyled. |
| **Cards with radius, shadow and a hover lift** | v1's near-flat cards on flat ground felt like a document, not a tool. |
| **Icon chips** in tinted rounded squares | Gives each card an anchor and a scan point. |
| **Pill badge eyebrows** | More presence than bare uppercase type, and somewhere for an icon to live. |
| **Short accent rule under section headings** | Cheap, distinctive, gives every heading a consistent finish. |
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
--ink        oklch(0.24 0.03 255)   #15202d   Body and headings.
--navy       oklch(0.29 0.07 258)   #132b4d   Brand. Wordmark, nav, footer.
--blue       oklch(0.47 0.15 258)   #1a57ad   Links, primary CTA, focus.
--blue-bright oklch(0.58 0.16 256)            Hover and non-text UI only.
--flag-red   oklch(0.52 0.20 27)    #c2181d   Emergency and "not a fit". Nothing else.
--paper      oklch(0.995 0.001 250)           Page background. Near-neutral white.
```

**Previous palette, and why it changed.** v1 used warm cream paper with a copper
accent. It was correctly called out as reading like an AI company rather than a
homeowner utility — cream plus copper plus a serif is a very specific current
signature. The cream is gone and paper is now near-neutral white.

**On green as a type colour.** It should not be one. Green appears in exactly one
place, `--verdict-fit`, and a green used for headings or links would collide with
the one spot green has to carry meaning. It would also start signalling "eco",
which a technology-neutral advisor cannot afford — the site has to be able to
recommend a gas tank without its own palette arguing back. Blue does the
interactive work; green stays a verdict.

### Verdict scale

The recommendation output. Always paired with an icon **and** a text label —
never color alone. Roughly 8% of men have some form of color vision deficiency,
and this is the exact moment the site cannot afford to be misread.

```
--verdict-fit      oklch(0.52 0.09 168)   ✓ Recommended
--verdict-alt      oklch(0.52 0.02 250)   ○ Alternative
--verdict-unfit    oklch(0.54 0.13 25)    ✕ Not a fit
```

Deliberately desaturated. Saturated green/red is the palette of a sales
comparison chart; muted is the palette of an assessment.

Note that green here means *"fits your house,"* not *"environmentally good."* The
verdict scale is orthogonal to technology. A gas storage tank can absolutely come
back green.

### Rebate status

The blueprint is emphatic that a stale rebate finder is worse than no rebate
finder, and that incentives are live data. Four states, and the design of the
fourth is the important one:

```
ACTIVE            filled, --verdict-fit        Confirmed available.
RESERVED          filled, --status-warn        Funded but waitlisted (e.g. HEEHRA).
EXPIRED           filled, --muted, strikethrough  Ended (e.g. federal 25C after 2025).
VERIFY            OUTLINED, no fill            We have not confirmed this.
```

`VERIFY` renders as an **unfilled outline**. Filled badges are claims; the empty
badge is visibly a non-claim. A homeowner can tell at a glance which numbers the
site stands behind and which it does not. That visual honesty is the brand.

```
--status-warn    oklch(0.68 0.13 70)
```

### Neutrals

Ten steps from paper to ink, all carrying a trace of the same blue so greys never
go muddy against the copper.

---

## 4. Typography

### Stack

```
--font-heading: Plus Jakarta Sans, 800   (self-hosted via next/font)
--font-sans:    Inter                    (self-hosted via next/font)
--font-mono:    ui-monospace, "SF Mono", Menlo, monospace
```

**Heavy geometric sans headings, Inter body.** Headings run at `font-weight: 800`
with `letter-spacing: -0.022em` and `line-height: 1.12`.

v1 used a serif on the theory that it would separate the site from the uniformly
geometric-sans contractor pages in the SERP. It did — in the wrong direction. It
read as a magazine rather than as a decision tool. **The independence comes from
what the page says and from the sourcing UI, not from the typeface.**

Self-hosted at build time by `next/font`, so there is no runtime request to
Google and no layout shift. Jakarta ships only the two weights headings use.

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

**Radius is small: `0.375rem`.** Rounded-everything reads friendly and
consumer-app; slightly squared reads precise and documentary. Badges are the one
exception — fully rounded pills, because they are labels rather than surfaces.

**Elevation is nearly flat.** One subtle shadow for raised cards, and borders do
most of the separation work. Heavy drop shadows are a marketing-page idiom.

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
| `EmergencyBar` | Short-circuit for the emergency funnel. The *only* place urgency styling is permitted. |
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
2026-08-07. The first pass failed: `--copper` came out at **3.61:1** as link
text and `--muted-foreground` at **3.81:1**, both under the floor this document
claims. Both were darkened (copper `0.52 → 0.47`, muted `0.52 → 0.46`) and
re-measured.

Re-measured after the red/white/blue repalette:

| Pair | Hex | Ratio | |
|---|---|---|---|
| `--ink` on paper | `#15202d` | 16.21 | ✅ |
| `--navy` on paper | `#132b4d` | 13.97 | ✅ |
| `--blue` on paper (links) | `#1a57ad` | 6.85 | ✅ |
| White on `--blue` (primary button) | `#1a57ad` | 6.95 | ✅ |
| `--flag-red` on white | `#c2181d` | 6.11 | ✅ |
| White on `--flag-red` | `#c2181d` | 6.11 | ✅ |
| `--muted-foreground` on paper | `#515962` | 7.02 | ✅ |
| `--verdict-fit` on its bg | `#106f4c` | 5.58 | ✅ |
| `--verdict-unfit` on its bg | `#c2181d` | 5.47 | ✅ |
| `--status-warn` on its bg | `#9d5d03` | 4.70 | ✅ |

On-dark pairs, added with the dark band sections. The first pass failed again:
`--flag-red` measured **2.91:1** on navy-deep as the hero highlight and
**2.32:1** as trust-bar icons, both under even the 3:1 large-text and UI floor.
Hence `--flag-red-light`.

| Pair | Hex | Ratio | |
|---|---|---|---|
| White on `--navy-deep` | `#071831` | 17.76 | ✅ |
| `--flag-red-light` on `--navy-deep` (hero) | `#ef675c` | 5.71 | ✅ |
| `--flag-red-light` on `--navy` (trust icons) | `#ef675c` | 4.56 | ✅ |
| `--ink` on `--tint` | `#eff7ff` | 15.18 | ✅ |
| `--muted-foreground` on `--tint` | | 6.57 | ✅ |
| `--blue` on `--tint` (eyebrow pill) | | 6.42 | ✅ |

Re-measure whenever a colour token moves. A stated floor that is never measured
is decoration.

### Rules

- Body text meets WCAG AA (4.5:1); large text and UI meet 3:1.
- Verdict and status are **never** encoded in color alone — icon plus text label,
  always.
- Visible focus ring on every interactive element, copper at 2px offset.
- Quiz is fully keyboard navigable; each step moves focus to its heading and
  announces progress via a live region.
- Comparison tables use real `<th scope>` markup, not styled divs.
- Target size minimum 44×44px. Half this audience is on a phone, and some of them
  are standing in a garage next to a leaking tank.

---

## 9. Open, deliberately

- **Photography.** None in v1. If it earns its way in later it should be
  documentary — actual installations, actual rating plates — never stock.
- **Dark mode.** Tokens are defined for it. Not a launch priority; the audience
  skews toward daytime desktop and mobile research.
- **Source Serif 4.** Revisit once Core Web Vitals are measured on real traffic.
