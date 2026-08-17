# Design pass V.3 — checklist

Branch `design/palette-type-v3`. Nothing here touches `main` until reviewed.

Two decisions were made without Rev because he said proceed. Both are one-line reversible
and flagged as **[CALL]**.

---

## A. Palette

- [x] **A1** Delete the `.dark` block. Its `--blue` resolves to `#e08e5a` — v1 copper. Nothing
  sets `.dark`, so it never renders; it ships as a trap. Dark mode is not a launch priority.
- [x] **A2** `--blue` hue 215 → 208 (`#1a57ad` → `#1a5fa8`). Same lightness. J. Hart sits at
  207, Aim High at 211; 215 reads a touch indigo against the category.
- [x] **A3** Verdict scale to a **filled / outline** system, green removed:
  - Recommended → filled `#0f6c9e`, white text (lighter, cyan-leaning; not the link blue)
  - Worth considering → outlined, no fill
  - Not a fit → filled `#c2181d`, white text
- [x] **A4** Delete `--status-warn` amber. RESERVED becomes a *solid outline* in ink — the claim
  is real, the offer is not open — leaving the dashed outline to mean "unverified". Reuses the
  fill vocabulary instead of introducing a fourth hue. Four non-rebate usages remapped; see below.
- [x] **A5** Strip decorative red: `AccentRule tone="dark"`, the two hardcoded copies in
  `Hero.tsx` and `methodology`, and the `TrustBar` icons. Red survives on `/emergency` and
  "Not a fit" only.
- [x] **A6** Delete `IconChip tone="green"` and its one usage. Green leaves the palette entirely.
- [x] **A7** Body text to a readable black: `Prose` from `foreground/85` to full `--ink`, lead
  paragraphs from `--muted-foreground` to `--navy`. Muted is kept for captions and stamps only.

## B. Type

- [x] **B1** Drop Inter. Body runs the system stack. (47.3KB, the largest font file on the site.)
- [x] **B2 [CALL]** Plus Jakarta Sans → **Archivo** for headings. American grotesque with signage
  lineage; reads civic and declarative rather than friendly-geometric, and Jakarta is the default
  every AI-assisted build reaches for. As built: 34.9KB vs Jakarta's 26.6KB — Archivo costs
  8KB more than Jakarta; the saving is Inter's. *Reverting = swap one `next/font` import.*
- [x] **B3** Add **IBM Plex Mono** and wire the `--font-mono` token, which is currently defined
  and unused. Carries the apparatus layer: checked dates, source citations, cost figures,
  model numbers.
- [x] **B4** Heading weight scale — h1/h2 at 800, h3/h4 at 700. Weight becomes a hierarchy axis
  instead of size doing all the work alone.
- [x] **B5** Letter-spacing scales with size. `-0.022em` is right at 3rem and wrong at 1.25rem.

Net font payload: **73.9KB → 43.9KB**, measured from both built outputs. (An earlier
estimate of 23.9KB was wrong — see Results.)

## C. Signature — the sourcing UI

The design doc calls this "the cheapest durable advantage the site has." It rendered as 12px
grey and read as a disclaimer.

- [x] **C1** Rebuild `SourceNote`: left rule, source name in ink, checked date in mono. It should
  read as apparatus, not apology.
- [x] **C2** `RebateStatus` keeps filled-vs-outline, loses amber (see A4).
- [x] **C3** `CheckedStamp` date in mono.

## D. Accessory cuts

- [x] **D1** Drop the card-level accent rule in `TechnologyCard`. The same device already runs
  under section headings; repeating it at every level makes it texture rather than hierarchy.
- [x] **D2** Soften the card hover shadow. `0_12px_28px` is marketing-grade.
  *(Correction to an earlier claim: `TechnologyCard` always renders a stretched `Link`, so its
  lift is a real affordance and stays. The unused `interactive` prop on `Card` is dead code
  — no caller ever passes it — and gets removed.)*
- [x] **D3** Homepage steps: drop the `IconChip`, bring the numeral to full contrast at a smaller
  size. Currently an icon chip and a `text-blue/20` numeral compete as anchors and one is
  deliberately illegible.

## E. Mobile and conversion

- [x] **E1** `EmergencyBar` renders on every page template except `/emergency`. It currently
  appears on the homepage only — the page a panicking user is least likely to land on.
- [x] **E2** `TrustBar` wraps to a 2×2 grid below `md` instead of scrolling horizontally. Four
  `shrink-0 whitespace-nowrap` items exceed 1000px; on a 390px phone the last two are invisible,
  with no scroll affordance. That is the site's strongest positioning copy.
- [x] **E3** `CostBreakdown` halves its horizontal padding below `sm`. 64px of padding against
  nowrap price cells is the tightest surface on the site, and it is the money screen.

## F. Print

- [x] **F1** Print stylesheet. Keeps the verdict card, cost breakdown, and every source note with
  its checked date; drops nav, footer, CTAs, and quiz chrome. The real user story is carrying the
  verdict to the contractor who is quoting the job.

## G. Hygiene

- [x] **G1** Fix three stale comments describing a site that no longer exists — `layout.tsx`
  ("no next/font import... system stacks"), `Button.tsx` ("Copper, not ink"), `Header.tsx`
  ("heading serif").
- [x] **G2** Remove unused dependencies: `@base-ui/react`, `class-variance-authority`, `zod`,
  `tw-animate-css`. Zero imports across `src`.
- [x] **G3** Reconcile `DESIGN-SYSTEM.md`. §5 (radius, elevation) and §8 (focus ring) were never
  updated in the v1→v2 repalette and now contradict both §2 and the code. §3's token values
  disagree with `globals.css`; §8's measured table agrees with it, so §3 is the stale copy.
- [x] **G4** Fix the "no layout shift" overclaim in `layout.tsx`. `display: swap` shifts;
  `next/font` fallback metrics shrink it.

## QA

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- [x] Contrast re-measured on every moved token
- [x] Rendered screenshots at 390px and 1280px

---

## Results

**Build:** typecheck clean, lint clean, `next build` green, 13 routes static.

**Font payload, measured from the two built outputs rather than estimated:**

| | Preloaded latin woff2 |
|---|---|
| `main` (Plus Jakarta Sans + Inter) | 75,704 B — 73.9 KB |
| `design/palette-type-v3` (Archivo + IBM Plex Mono) | 45,000 B — 43.9 KB |
| **Saved** | **30,704 B — 41%** |

**Correction to an earlier estimate.** I told Rev this would land at 23.9KB. That
figure came from Google's CSS API serving a *static instance* for a single
weight; `next/font` requests 700 and 800 together and gets the **variable** file,
which is 34.9KB rather than 14.1KB. The real saving is 30.7KB, not 50KB. Still
the largest single perf win available, and still the right call — but the number
I gave was wrong and this is the right one.

**Mobile overflow, measured at a true 390px viewport via CDP device emulation:**

| | `scrollWidth` | Overflowing elements |
|---|---|---|
| `main` | 390 | **8** — all inside `TrustBar`, extending to `right=782` |
| `design/palette-type-v3` | 390 | **0** |

The baseline TrustBar ran to *double* the viewport width, which is the measured
form of E2: on a 390px phone a reader saw the first claim and part of the second,
with no affordance suggesting the other two existed.

One methodology note: headless Chrome's `--window-size` does not set the layout
viewport below ~500px — it crops the screenshot instead of reflowing, which reads
as a horizontal-overflow bug that is not there. The audit above uses
`Emulation.setDeviceMetricsOverride` instead. A control page confirmed the
clamp (`--window-size=390` reported `innerWidth=500`).

**Contrast, recomputed against the shipped tokens.** All 16 pairs pass WCAG AA;
the full table is in DESIGN-SYSTEM.md §8. Tightest pairs are white on
`--verdict-fit` at 5.74:1 and `--verdict-alt` outlined on paper at 5.89:1.

**Visually verified** at 390px and 1280px: TrustBar 2×2 grid with all four claims
legible, verdict badges rendering filled-blue / outlined / filled-red with no
green anywhere, SourceNote reading as apparatus with the checked date in mono,
`Verify` rendering as a dashed non-claim.

## Two things that changed from the plan

**`TechnologyCard` keeps its hover lift.** I had listed it for removal on the
grounds that a card which lifts should navigate. It does navigate — the heading
renders a stretched `Link` over the whole card — so the lift is a real
affordance. What was actually dead was the `interactive` prop on `Card`, which no
caller ever passed. That was removed instead.

**Amber had four more usages than the rebate badge.** `--status-warn` also
carried the "Sometimes" state in `ComparisonTable`, two caution-bullet styles in
the quiz, a warranty-exception box on the Navien page, and `Callout tone="warn"`.
Deleting the token silently would have degraded all five. They were remapped:
the middle states to `--verdict-alt`, which already means exactly that, and the
editorial emphasis to an ink rule.
