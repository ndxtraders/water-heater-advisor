# Deep Research prompt — water heater vendors and product selection

Paste everything below the line into a Deep Research session. Written to feed two
consumers at once: the site's brand and comparison pages, and the quiz's
recommendation and routing logic.

---

## CONTEXT

I am building **Water Heater Advisor**, an independent homeowner education and
installer-matching site. First market is Modesto, California, expanding by
utility territory.

The site is **not a plumbing company** and never performs installations. It
recommends a water-heating system, explains the reasoning, and then introduces
the homeowner to a local installer who does that specific work. It is paid a
percentage of completed jobs. That payment may affect *which eligible installer*
receives an introduction; it must never affect *what the site recommends*.

A live 15-question quiz already produces a recommendation. Its engine works in
this order, and elimination on feasibility happens **before** any preference
scoring:

```
urgency → eliminate technically unsuitable → demand → conversion complexity
        → local conditions → homeowner priorities → brand as tie-breaker
        → installer match
```

The engine classifies every home into one of four technologies:

```
gas-tank | electric-tank | gas-tankless | heat-pump
```

Brand is currently only a tie-breaker and a routing signal. **This research is
what turns brand into a real part of the recommendation.**

## WHAT THIS RESEARCH MUST PRODUCE

Two things, and every finding should be usable for at least one:

1. **Site content** — brand pages, brand-versus-brand comparisons, and
   "how to choose" content that helps a homeowner decide.
2. **Routing and recommendation data** — structured rules and fields that plug
   into the quiz engine and the lead-routing layer.

Prose that cannot become either is not wanted. Where a finding is a decision
rule, state it as a rule.

## BRANDS IN SCOPE

Priority order, based on what Modesto-area installers actually advertise:

1. Navien
2. Rinnai
3. Rheem
4. A. O. Smith
5. Noritz
6. Bradford White

Also tell me: **are these the right six?** The quiz currently offers Navien,
Rinnai, Rheem, A. O. Smith and Bradford White as brand preferences, and omits
Noritz. If a brand belongs on that list and is missing, or one of these has
negligible residential relevance in Central California, say so and explain why.
State Water Heaters, American, Ruud and any private-label lines sold through
local supply houses are worth a look.

---

# RESEARCH SECTIONS

## 1. Brand to technology coverage

For each brand, which of these do they actually make for **residential** use:
gas storage, electric storage, gas tankless, electric tankless, heat pump.

This matters because of a specific quiz problem. If a homeowner says *"I want
Navien"* but their home's correct answer is a heat pump, the site needs to say
something accurate and useful rather than either forcing the brand or silently
ignoring the preference. Produce a **brand × technology matrix** so that
conversation can be scripted.

## 2. Product lines mapped to capacity

For each brand and technology, the current residential product lines and the
capacity range each covers:

- **Tankless:** GPM at a stated temperature rise. Note the rise assumed, because
  a GPM figure without one is meaningless. Central Valley winter inlet
  temperatures matter here.
- **Storage and heat pump:** gallon capacities, and first-hour rating or
  recovery rate where published.
- Note which lines are current, which are discontinued but still in
  distribution, and which are retail-channel-only versus contractor-channel.

The quiz already outputs a sizing recommendation such as *"roughly 9 to 11 GPM"*
or *"80 gallon, upsized so the resistance elements run less"*. **I want to be
able to name two or three specific models that satisfy each sizing output.**

## 3. Installation requirements that change feasibility

The most valuable section for the engine. For each brand and product line, the
requirements that could **disqualify** a unit in a given home:

- Minimum gas supply and meter capacity for tankless; BTU input
- Venting type, material, maximum lengths, concentric versus twin pipe
- Whether an outdoor model exists (this materially cuts conversion cost)
- Electrical requirement: voltage, amperage, dedicated circuit
- **120V versus 240V heat pump models** and their real recovery limits
- Minimum air volume or ducting requirement for heat pumps, in cubic feet
- Condensate handling, including whether neutralisation is required
- Minimum clearances and physical footprint
- Water hardness tolerance and required descaling interval
- Altitude or ambient temperature limits

Where a brand is unusually tolerant or unusually demanding versus its
competitors, say so explicitly. **That is the difference that makes one brand the
right answer for a specific house.**

## 4. Why a homeowner would choose one brand over another

The core question. I do not want "Brand X is the best." I want **decision
rules**, in this form:

> *If the home has [condition] and the homeowner values [priority], then
> [brand/line] is a stronger fit than [alternative], because [reason].*

Cover at minimum:

- Homes where the gas line is marginal and cannot easily be upsized
- Homes needing recirculation, and which brands build it in versus bolt it on
- Homes where the unit must go outside
- Tight closets, and heat pump options that survive them
- High simultaneous demand, three or more bathrooms
- Very low demand, one or two occupants
- Homeowners who will not keep up with maintenance
- Homeowners optimising for lowest lifetime cost versus lowest upfront
- Homeowners planning full electrification or solar
- Replacing an existing unit of the same brand

## 5. Warranty structure

**Do not give me a single number per brand.** Warranty varies by model,
component, registration, installation type and residential versus commercial
use, and a homeowner who relies on a blanket "15 years" can lose coverage on a
technicality.

Per brand, capture: how the warranty is structured, what conditions attach
(registration, professional installation, annual maintenance, water quality),
which components carry different terms, and how labour is treated versus parts.
Include the source URL and the date checked for each.

## 6. Installer networks, service and parts

Directly feeds lead routing.

- Contractor programme names and tiers, and what qualification requires
- Whether the manufacturer runs a public contractor locator
- Whether programme status affects warranty terms
- Whether the manufacturer offers consumer financing
- Parts availability and distribution in California's Central Valley
- Typical service turnaround, and whether the brand is serviceable by a general
  plumber or effectively requires a trained specialist

**That last point is decisive.** The best unit on paper is the wrong purchase if
nobody within thirty miles can service it.

## 7. Price positioning

Equipment-only price tiers per brand and line, as ranges. The quiz collects
budget in these bands:

```
under $2,000 | $2,000-3,500 | $3,500-5,000 | $5,000-8,000 | over $8,000
```

I need to know which brands and lines are realistically reachable inside each
band once installation is included. Ranges only. **Do not invent precise
figures, and flag clearly where evidence is weak.**

## 8. Reliability and failure modes

- Common failure modes per brand and technology
- Error codes homeowners encounter most and what they usually mean
- Known problem model lines or production years, if credibly documented
- Realistic service life under normal and hard water conditions

## 9. Head-to-head comparisons

Produce direct comparisons for at least: Navien vs Rinnai, Rheem vs A. O. Smith
(heat pump), Rinnai vs Noritz, and Bradford White vs A. O. Smith (storage). Each
should end with a plain statement of which homeowner should pick which, and why.

---

# REQUIRED OUTPUT FORMAT

Alongside the written report, return this structured data. It plugs directly
into the recommendation engine.

### A. Brand × technology matrix

```json
{
  "brand": "navien",
  "display_name": "Navien",
  "technologies": {
    "gas-tankless": true,
    "electric-tankless": false,
    "gas-tank": false,
    "electric-tank": false,
    "heat-pump": false
  },
  "primary_strength": "",
  "source_url": "",
  "checked_at": ""
}
```

### B. Product line records

```json
{
  "brand": "",
  "technology": "gas-tankless",
  "line": "",
  "models": [""],
  "capacity": { "gpm": [0, 0], "temp_rise_f": 0, "gallons": null, "first_hour_rating": null },
  "requires": {
    "gas_btu": 0,
    "gas_line_min_inches": null,
    "vent_type": "",
    "electrical": "",
    "min_air_volume_cuft": null,
    "condensate": "",
    "outdoor_model_available": false
  },
  "price_band_equipment_usd": [0, 0],
  "notes": "",
  "source_url": "",
  "checked_at": ""
}
```

### C. Selection rules — the part that drives the quiz

```json
{
  "id": "",
  "if": {
    "technology": "gas-tankless",
    "conditions": ["marginal_gas_line", "outdoor_install_possible"],
    "priority": "endless"
  },
  "then": {
    "prefer_brands": [""],
    "avoid_brands": [""],
    "reason": "",
    "confidence": "high | moderate | low"
  },
  "source_url": "",
  "checked_at": ""
}
```

### D. Routing signals

```json
{
  "brand": "",
  "installer_program": "",
  "requires_trained_installer": true,
  "manufacturer_locator_url": "",
  "parts_availability_central_valley": "strong | mixed | weak | unknown",
  "consumer_financing": false,
  "checked_at": ""
}
```

---

# SOURCE STANDARDS

Prioritise, in order: manufacturer specification sheets and installation
manuals, manufacturer warranty documents, official installer directories,
distributor and supply-house listings, ENERGY STAR and Department of Energy,
California utility programme documentation, then actual installer websites.

Retailer product pages and affiliate "best water heater" roundups are weak
sources. Use them only to corroborate, never as the sole basis for a claim.

Cite every factual claim with a URL and the date checked.

# EDITORIAL RULES — these are firm

1. **Never state that any installer or company is "authorised", "certified" or
   equivalent** unless that exact status is confirmed in the manufacturer's own
   directory. It is a claim about someone else's business and it changes without
   notice. Default wording is *"an installer that works with Navien systems."*

2. **No blanket warranty numbers.** Model level, with conditions, or nothing.

3. **Do not invent precision.** Where evidence is thin, say so and mark the field
   unverified. An explicit "unknown" is more valuable to me than a confident
   guess, because the site renders unverified fields with a visible marker and a
   wrong number would be published as fact.

4. **No brand may be declared best overall.** Every recommendation must be
   conditional on the home and the homeowner.

5. Distinguish clearly between verified fact, reasonable inference, and estimate.

# DELIVERABLES

1. Executive summary: what actually differentiates these brands for a homeowner
2. Brand × technology matrix (schema A)
3. Product line records (schema B)
4. Installation requirement comparison across brands
5. Selection rules (schema C) — aim for 25 to 40 rules
6. Warranty structure per brand, with conditions
7. Installer network and routing signals (schema D)
8. Price positioning by budget band
9. Reliability and failure modes
10. The four head-to-head comparisons
11. Recommendation on whether the quiz's brand list should change
12. A list of what you could not verify, and what it would take to verify it
