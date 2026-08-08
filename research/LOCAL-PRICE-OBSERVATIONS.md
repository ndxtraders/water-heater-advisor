# Modesto local price observations

First-party and locally observed pricing. **This file is the authority for every
cost figure on the site.** National averages are a sanity check and never the
published number.

Add a row every time you see a real local quote, advertised price or completed
job value. Over time this becomes the thing no competitor can copy.

---

## Why this exists rather than using national data

2026 national sources put a tank replacement at roughly **$882 to $1,825**,
average about $1,346. Modesto contractor pricing runs well above that.

That gap is not a rounding error, it is the finding. National figures blend
low-cost markets, big-box install programmes and jobs with no permit pulled.
Publishing them here would make every genuine local quote look like a rip-off
and would quietly train homeowners to distrust honest contractors, which is the
opposite of what this site is for.

**Rule: a national figure never appears on the site as a local price.**

---

## Observations

| Date | Type | Observation | Source | Confidence |
|---|---|---|---|---|
| 2026-08-07 | Quote | **~$2,700** installed, Bradford White tank | Local Modesto plumbing company, reported by Rev | High, first-party |
| 2026-08-07 | Advertised | **$1,995 to $2,495**, 40 gal replacement incl. standard install, haul-away, basic code items | Modesto water-heater specialist, public pricing | High |
| 2026-08-07 | Retail equipment | **From ~$900**, entry-level tank | Big box retailer shelf price | High, equipment only |

### What these three together tell us

The retail shelf price and the installed price differ by roughly **$1,800**, and
that gap is the most common source of homeowner sticker shock in this category.
It is labour, permit and inspection, code items, haul-away, and usually a better
unit than the entry-level one on display.

That comparison is now published on the Modesto page as *"Why the $900 water
heater costs $2,700 installed."* It is cheap to explain and it makes the site
immediately more useful than a price-range article.

Bradford White is a contractor-channel brand and not sold through big-box
retail, so the $2,700 quote is not directly comparable to a shelf price. Worth
capturing separately whether local contractors quote differently for
retail-channel versus contractor-channel equipment.

---

## Current published ranges

Set in `src/lib/quiz/engine.ts`. `costFor()` adjusts these by whether the job is
a swap or a conversion, which matters more than the base numbers.

| Technology | Baseline | Like-for-like swap |
|---|---|---|
| Gas storage tank | $2,000 to $3,800 | $2,000 to $3,400 |
| Electric storage tank | $1,700 to $3,200 | — |
| Gas tankless | $4,200 to $9,000 | $2,800 to $5,200 (existing tankless) |
| Heat pump | $4,000 to $8,000 | $3,200 to $6,500 (from electric) |

**Superseded 2026-08-07.** The previous gas-tank floor was **$1,600**, below
both local observations above. A floor beneath every real quote in the market is
not conservative, it is wrong in a way that makes honest contractors look
expensive.

---

## Still needed

Highest value first. Most of this falls out of the contractor conversations
rather than needing separate research.

1. **Tankless conversion quotes.** No first-party local figure yet. The current
   $4,200 to $9,000 is modelled from line items, not observed.
2. **Heat pump installed quotes**, split by whether the home is coming off gas
   or already electric. The electrical work is most of the difference.
3. **Whether quotes include the permit.** Suspicion is that some do not, which
   would make the cheaper ones not comparable.
4. **Gas line upsizing**, actual local charges. Currently modelled at $350 to
   $2,000 and it is the single widest line in the conversion.
5. **Emergency and after-hours premium.** The urgency path recommends fast
   replacement without knowing what speed costs locally.
6. **Sold job values**, once partners are reporting them. These eventually
   replace every quoted figure above, and they feed the commission model in
   `REVENUE-MODEL.md`.

## How to add an observation

Record what was actually seen, not an interpretation. Note whether it is a
quote, an advertised price, or a completed job. Note what was included,
especially the permit and haul-away. Date it. If it came from a contractor
conversation, note which contractor, because a pattern of high or low quotes
from one company is itself useful.
