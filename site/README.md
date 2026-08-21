# Water Heater Advisor

An independent homeowner advisory and installer-matching site. Modesto,
California first, built to scale by utility territory rather than by city name.

**This is not a plumbing company and must never present itself as one.** That is
a CSLB constraint, not a stylistic preference, and it shapes the code — see
[Constraints](#constraints).

---

## Run it

```bash
npm install && npm run dev
```

| Script | |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build, type-checked |
| `npm run typecheck` | Types only |
| `npm run lint` | ESLint |

Stack: Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, TypeScript.
No webfonts, no external requests, every route statically prerendered.

---

## Read this first

**[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)** is the source of truth for why the site
looks the way it does. The short version:

The commercial thesis is that this site can tell a homeowner *"don't buy
tankless"* and mean it. If it looks like a contractor landing page, that claim
dies and the business model dies with it. So the design brief is one sentence:
**look like something that renders a verdict, not something that closes a sale.**

Three rules follow, and they are load-bearing:

1. **Colour carries meaning or it does not appear.** No decorative hue anywhere.
   A site that tints things because they look nice has spent the signal it needs
   in order to say "this option is wrong for your house."
   Red is primarily used for emergencies or "not a fit," and for important
   areas where red can call out key distinctions without necessarily carrying
   a negative connotation.
2. **Verdicts are never colour alone.** Icon plus word plus colour, always.
3. **Volatile claims show their source and check date.** Rebates, code, pricing,
   local data. This is the cheapest durable advantage available — a plumber's
   marketing page will never date-stamp its rebate claims, because that would
   expose how old they are.

---

## Layout

```
src/
├── app/
│   ├── page.tsx                          Homepage
│   ├── quiz/                             The recommendation quiz
│   ├── compare/tank-vs-tankless/
│   └── local/california/modesto/         The local model, per utility territory
├── components/
│   ├── advisor/     Verdict, Status, Comparison, Cost, Panels
│   ├── layout/      Header, Footer
│   └── ui/          Button
└── lib/
    ├── quiz/        questions.ts, engine.ts
    └── site.ts      Config and the independence policy
```

### The component vocabulary

Contractor-shaped sections (`Services`, `WhyChooseUs`, `Testimonials`,
`ContactInfo`) were removed from the inherited framework. What replaced them:

| Component | |
|---|---|
| `VerdictCard` / `RuledOut` | The recommendation output. The most important thing on the site. |
| `RebateStatus` | Four states. **`VERIFY` renders unfilled** — an empty badge is a visible non-claim. |
| `SourceNote` / `CheckedStamp` | Provenance, per field. |
| `ComparisonTable` | Table on desktop, stacked cards on mobile. Never a horizontal scroll. |
| `CostBreakdown` | Line-item job model. Never a single headline number. |
| `LocalDataPanel` | Per-market data, per-field freshness. |
| `EmergencyBar` | The **only** component permitted urgency styling. |

---

## The quiz

Ten questions in [`questions.ts`](src/lib/quiz/questions.ts), rule-based engine
in [`engine.ts`](src/lib/quiz/engine.ts). It follows the blueprint's ordering:

```
urgency → eliminate the technically unsuitable → demand
        → conversion complexity → local conditions
        → homeowner priorities → brand tie-break
```

**Elimination runs before scoring and cannot be outvoted.** This is the design's
most important line of defence. A homeowner who answers "lowest running cost"
but has the unit in a sealed interior closet must not be handed a heat pump
because preference points piled up. A pure points quiz does exactly that, which
is why this is not one.

The engine will return "not tankless", and when a winner survives only because
everything else was eliminated it says so plainly rather than dressing it up.

Results render in full — verdict, size, cost range, what was ruled out and why,
questions to ask an installer — **before** any contact capture. That ordering is
the entire reason the resulting lead is worth more than a form fill.

---

## Constraints

Things that will look like oversights but are not.

- **No `LocalBusiness` schema, no NAP block, no testimonials.** CSLB rules say a
  referral service may not present itself as performing the construction.
  `LocalBusiness` markup tells Google precisely that. Not negotiable.
- **No single average prices.** The evidence does not support the precision, and
  an average answers the wrong question. "What does tankless cost" is not the
  homeowner's question; "what would tankless cost *in my house*" is.
- **No citywide water hardness figure for Modesto.** No source found that is
  authoritative enough. The page says so instead of inventing one.
- **Payment may affect which eligible installer receives an introduction. It may
  never affect what the site recommends.** Policy before copy; it lives in
  `INDEPENDENCE_POLICY` in [`site.ts`](src/lib/site.ts) and is stated in the
  footer at real size rather than buried in grey 10px legal text.

---

## Accessibility

Floor and the measured contrast table are in
[DESIGN-SYSTEM.md §8](DESIGN-SYSTEM.md). Measured, not asserted — the first pass
failed on two tokens and both were corrected. **Re-measure whenever a colour
token moves.**

---

## Not built yet

Brand pages, sizing calculator, cost estimator, `/emergency`, `/match`,
`/installers/how-to-choose`, remaining technology and comparison pages, sitemap
and JSON-LD, and the contractor capability database behind lead routing.
