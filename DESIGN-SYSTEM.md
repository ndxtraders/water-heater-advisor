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

**Chosen: independent reviewer.** Editorial typography, wide measure, generous
whitespace, restrained color, comparison tables treated as first-class design
objects rather than afterthoughts.

Rejected alternatives, and why:

| Register | Why not |
|---|---|
| Precise technical tool (Stripe/Linear) | The quiz and calculators would look excellent. The homeowner would not. A 58-year-old in Modesto whose tank just failed at 6am is not the audience for a dense monospace grid. |
| Warm homeowner guide | Lowest bounce risk on the emergency funnel, but warmth reads as marketing. It quietly undercuts the independence claim, which is the only defensible asset here. |

The one real cost of the reviewer register is that it can feel cool to a panicked
homeowner. That is handled structurally rather than stylistically — see
`EmergencyBar` in §7. The emergency path gets urgency; the educational pages
never do.

---

## 3. Color

### Principle

**Color carries meaning or it does not appear.** There is no decorative color in
this system. If a hue shows up, it is encoding a verdict, a status, or a state.

This is not minimalism for its own sake. A site that colors things because they
look nice cannot then use color to say "this option is wrong for your house" —
the signal is already spent.

### Brand

Plumbing sites are blue. Efficiency sites are green. Both are taken, and worse,
both are *biased*: blue reads gas, green reads electrification. A
technology-neutral advisor cannot wear either without tipping its hand before the
quiz starts.

**Primary is ink** — a deep, slightly blue-black slate. Authority, editorial,
neutral between fuels.

**Accent is copper.** Water-heater adjacent (copper supply line, burner flame),
warm enough to keep the page from feeling clinical, and it belongs to neither the
gas camp nor the electric camp. It is used for interactive affordances and the
primary CTA only — never for verdicts.

```
--ink        oklch(0.24 0.02 250)   Primary. Headings, primary buttons, nav.
--copper     oklch(0.62 0.14 48)    Accent. Links, CTAs, focus rings.
--paper      oklch(0.99 0.004 85)   Page background. Warm white, not clinical.
--surface    oklch(1 0 0)           Cards, raised panels.
```

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
--font-heading: ui-serif, Georgia, "Iowan Old Style", "Times New Roman", serif
--font-sans:    ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
--font-mono:    ui-mono, ui-monospace, "SF Mono", Menlo, monospace
```

**Serif headings, sans body.** The serif is what separates this from every
contractor site in the SERP at a glance — those are uniformly geometric sans.
Serif reads editorial, considered, published.

System stacks rather than webfonts, deliberately: zero network requests, zero
layout shift, zero build-time font fetch, and `ui-serif` resolves to genuinely
good faces on the platforms that matter (New York on Apple, Georgia elsewhere).
Swapping in Source Serif 4 later is a one-line change if it earns its ~40KB.

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

| Pair | Ratio | |
|---|---|---|
| `--ink` on paper | 15.97 | ✅ |
| `--muted-foreground` on paper | 6.91 | ✅ |
| `--muted-foreground` on card | 7.11 | ✅ |
| `--copper` on paper | 6.99 | ✅ |
| `--copper` on card | 7.19 | ✅ |
| White on `--copper` (primary button) | 7.19 | ✅ |
| `--verdict-fit` on its bg | 4.78 | ✅ |
| `--verdict-alt` on its bg | 4.97 | ✅ |
| `--verdict-unfit` on its bg | 4.92 | ✅ |
| `--status-warn` on its bg | 4.57 | ✅ |

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
