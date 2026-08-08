# Water Heater Advisor
## Deep Research: Water Heater Vendors and Product Selection

**Research checked:** 2026-08-07

**Purpose:** feed two systems at once: homeowner-facing brand/comparison content and the quiz recommendation/routing engine.

### Evidence rules used

- Primary manufacturer specifications, installation material, warranty pages, manufacturer contractor directories, distributor evidence, ENERGY STAR/DOE guidance, and CPSC recall records were favored.
- A manufacturer marketing claim is not treated as independent proof of reliability.
- A historical recall is treated as a model/date-specific legacy-unit fact, not as a current brand ranking.
- Where the evidence did not support a precise field, the field is marked unknown or unverified.
- Technical feasibility comes before homeowner brand preference.

---

# 1. Executive summary: what actually differentiates the brands

The six-brand list is basically correct, with one change: **add Noritz to the visible quiz brand choices.** Noritz has enough current residential relevance in Central California to matter, especially for gas tankless retrofit work. Its 2026 EZ Pro line is explicitly designed around storage-tank replacement, uses top-mounted water connections, supports indoor/outdoor configurations, and spans 160,000, 180,000 and 199,900 BTU classes. Its manufacturer directory also shows real installer depth around Modesto. [S83], [S50]

The biggest correction to the old quiz assumptions is **Navien is no longer tankless-only.** Its current U.S. residential catalog includes the NWP500 heat-pump water heater in 50, 65 and 80 gallon sizes. A homeowner who prefers Navien and is correctly classified as heat-pump should not have that brand preference silently discarded. [S01], [S21]

Rheem and A. O. Smith are the broadest technology brands in the group. Both cover storage, gas tankless, electric tankless and heat-pump categories. They are particularly important for electrification because both currently offer 120V heat-pump options that can avoid a new 240V branch circuit in some gas-to-electric conversions, subject to first-hour-rating and location checks. [S08], [S36]

Rinnai and Noritz are strongest as gas-tankless specialists in this decision framework. Rinnai now also has a residential heat-pump line. Bradford White remains highly relevant in storage, heat pump and gas tankless, but its professional/wholesale channel makes local installer and distributor availability more important to the homeowner decision than a retail shelf price. [S03], [S14]

The most important engine change is not a brand change. It is a **sizing-data change**. A tankless recommendation should never be stored as an unqualified statement such as `9 to 11 GPM`. GPM only means something at a stated temperature rise. For example, Navien's NPE-240A2 is advertised up to 11.2 GPM at a 35°F rise but is 5.6 GPM at a 67°F rise. Rinnai's RX/RXP199 sizing chart shows 5.7 GPM at a 52°F inlet with a 120°F setpoint. Noritz's EZ111 is 5.6 GPM at a 70°F rise. [S17], [S22], [S83]

### What should drive brand choice

After the technology survives feasibility screening, brand should be chosen from six factors:

1. Exact capacity at the home's design conditions.
2. Installation fit: gas, venting, electrical, air volume, condensate, clearances and outdoor/indoor options.
3. Feature fit, especially recirculation and conversion geometry.
4. Exact model warranty conditions.
5. Local service and parts path.
6. Price only after the actual project configuration is known.

There is **not enough defensible evidence to publish an overall reliability ranking** of these six brands. Manufacturer error-code libraries, warranty lengths, online complaints and old recalls do not provide a valid installed-base denominator. The site should publish model-specific recall checks, warranty conditions, maintenance requirements and local serviceability instead of 'Brand X lasts longer' claims.

---

# 2. Brand x technology matrix

| Brand | Gas tank | Electric tank | Gas tankless | Electric tankless | Heat pump | Engine note |
|---|---:|---:|---:|---:|---:|---|
| Navien | No | No | Yes | No | Yes | Current U.S. residential water-heater catalog lists multiple gas tankless families and NWP500 HPWH. No current residential storage-tank family found. [S01], [S02] |
| Rinnai | No | No | Yes | No | Yes | Rinnai's own FAQ states that it does not make an electric tankless model. Current U.S. residential site shows tankless and REHP heat-pump water heaters. [S03], [S04], [S05] |
| Rheem | Yes | Yes | Yes | Yes | Yes | Current Rheem residential water-heating catalog contains tank, gas tankless, electric tankless and heat-pump products. [S06], [S07], [S08] |
| A. O. Smith | Yes | Yes | Yes | Yes | Yes | Current residential catalog explicitly lists gas/electric tank, gas/electric tankless and hybrid HPWH. [S09], [S10] |
| Noritz | No | No | Yes | No | No | Current residential focus is gas tankless. EZ Pro/EZTR are explicitly designed around tank replacement; NRCR Pro has integrated recirculation. [S11], [S12], [S13] |
| Bradford White | Yes | Yes | Yes | Yes | Yes | Current electric tankless KwickShot TEF/TET products are primarily point-of-use/fixed-fixture. The older broader ES/EFC/EFT residential electric-tankless family is discontinued. [S14], [S15], [S16] |

**Whole-home quiz rule:** Bradford White's current electric-tankless presence should not cause electric tankless to be added to the existing whole-home engine. The current KwickShot products are point-of-use/fixed-fixture oriented, while Bradford White marks the older broader ES/EFC/EFT residential electric-tankless family discontinued. [S15], [S16]

---

# 3. Product lines mapped to capacity

The machine-readable JSON contains 31 line records. The highest-value records for the current four-technology quiz are below.

## Gas tankless: use design-rise flow, not headline GPM

| Brand/line | Current examples | Useful capacity fact | Installation/selection signal | Source |
|---|---|---|---|---|
| Navien NPE-A2 | NPE-180A2, NPE-210A2, NPE-240A2 | NPE-240A2: 11.2 GPM at 35°F rise, 8.7 at 45°F, 5.6 at 67°F | 199,900 BTU max, indoor/outdoor, ComfortFlow on A2 | [S17] |
| Rinnai RX/RXP | RX199IN, RXP199IN | 199,000 BTU model: 4.6 GPM at 35°F inlet and 9.0 at 77°F inlet, at the manufacturer's 120°F sizing setpoint | RXP adds built-in recirculation pump; use exact inlet temperature | [S22] |
| Noritz EZ Pro | EZ71DV, EZ98DV, EZ111DV | EZ111: 7.8 GPM at 50°F rise, 6.5 at 60°F, 5.6 at 70°F; EZ98: 6.9/5.7/4.9 at same rises | 2026 retrofit-focused line, top-mounted water connections, indoor/outdoor | [S83] |
| A. O. Smith Adapt+ | ATHR-160/180/199 families | 199 class should be stored by exact flow-at-rise, not 10.5 GPM headline | Condensing, current Adapt family; 1/2 or 3/4 gas compatibility is model/manual-dependent | [S09] |
| Bradford White Infiniti | GR/GS/K/L families | Current 199k class data should be stored at each temperature rise | Professional channel; current gas tankless family | [S15] |
| Rheem IKONIC / RTG | IKONIC S/SR, RTG/RTG-R | Current families span multiple output classes | SR/R variants add recirculation features; exact flow curves required before SKU output | [S07] |

### Direct implication for the quiz

Replace a result like:

> Roughly 9 to 11 GPM

with:

> Your home needs approximately **X GPM at a design temperature rise of Y°F**. These models meet or exceed that condition.

That single change prevents a large class of false-positive tankless recommendations.

## Heat pump: current model shortlists

| Nominal size output | Current models that can enter the shortlist | Important gate |
|---|---|---|
| About 50 gal | Navien NWP500-50; Rinnai REHP50; Rheem PROPH50 120V/240V families; A. O. Smith HPTV-50; Bradford White RE2HP50 | Compare FHR, circuit, ambient/location, air volume/ducting and service |
| About 65 gal | Navien NWP500-65; Rinnai REHP65; Rheem PROPH65; A. O. Smith HPTV-66; Bradford White RE2HP65 | Same gates; do not compare gallon label alone |
| About 80 gal | Navien NWP500-80; Rinnai REHP80; Rheem PROPH80; A. O. Smith HPTV-80; Bradford White RE2HP80 | FHR and recovery matter more than nominal capacity |

Examples of verified FHR data: Navien NWP500-65 is 80 gallons FHR; Rheem's current 120V shared-circuit HydroBoost family is 45/55/63/84 gallons FHR across 40/50/65/80 nominal sizes; A. O. Smith HPTV-66 is 76 gallons FHR. [S21], [S81], [S36]

---

# 4. Installation requirements that change feasibility

| Condition | Strong selection consequence |
|---|---|
| Marginal gas service/line | Do not award a brand bonus merely because marketing says '1/2-inch compatible.' Calculate total connected load, pressure, length and exact manual requirements first. A.O. Smith Adapt+ and Noritz EZ publish conditional 1/2-inch compatibility. |
| Existing tank-to-tankless conversion | Noritz EZ Pro/EZTR gets a meaningful positive score when its top connections and retrofit vent/accessory architecture actually reduce repiping or vent work. [S83] |
| Recirculation required | Prefer a line with the correct integrated or supported recirculation architecture only after loop length, controls and warranty conditions are checked. Navien NPE-A2, Rinnai RXP, Noritz NRCR and Rheem recirculation variants are candidates. |
| Outdoor tankless location possible | Outdoor-approved configurations can reduce some vent-conversion work. Never infer outdoor approval at brand level; store it per model. |
| No convenient 240V circuit for HPWH | Rheem and A. O. Smith 120V models move up the shortlist, subject to FHR/demand. [S08], [S36] |
| Tight indoor HPWH space | Navien NWP500 requires at least 450 cu ft for unvented installations or ducting in enclosed spaces. A. O. Smith Voltex X is a separate outdoor-split architecture that does not require a large indoor air volume. [S21], [S82] |
| High simultaneous tankless demand | Exclude any model whose verified flow at design rise is below calculated demand. Brand preference cannot override this. |
| Homeowner will not maintain/descale | Penalize tankless as a technology when maintenance is likely to be neglected. Do not pretend another tankless brand removes the maintenance issue. |
| Hard-water concern | Store the exact manufacturer's water-quality/scale requirements and maintenance instructions. Do not publish a brand longevity ranking without comparative field data. |

---

# 5. Selection rules for the quiz

The JSON contains **40 structured rules**. They are designed to run only after technology feasibility. The rules below are the full rule set in compact form.

| ID | If | Then | Confidence |
|---|---|---|---|
| `R01_feasibility_over_brand` | any ; brand_preference_conflicts_with_technical_feasibility ; priority=any | Prefer: none. Avoid: none. Never revive a technically eliminated technology because of brand preference. | high [S04], [S09] |
| `R02_brand_technology_mismatch` | any ; preferred_brand_does_not_make_selected_technology ; priority=brand | Prefer: none. Avoid: none. Explain that the preferred brand does not offer the selected technology and continue with compatible brands. | high [S01], [S04] |
| `R03_tankless_size_by_design_rise` | gas-tankless ; tankless_candidate ; priority=capacity | Prefer: none. Avoid: none. Size from verified flow at design temperature rise, not headline maximum GPM. | high [S17], [S22] |
| `R04_navien_npe240_flow_curve` | gas-tankless ; navien_candidate, demand_requires_verified_flow ; priority=capacity | Prefer: Navien. Avoid: none. NPE-240A2 provides 11.2 GPM at 35F rise, 8.7 at 45F, and 5.6 at 67F; use the design-rise point. | high [S17] |
| `R05_rinnai_rx199_groundwater_sizing` | gas-tankless ; rinnai_candidate, setpoint_120F ; priority=capacity | Prefer: Rinnai. Avoid: none. Use Rinnai's inlet-temperature sizing table; e.g. RX/RXP199 is about 5.7 GPM at 52F inlet and 120F setpoint. | high [S22] |
| `R06_noritz_ez111_flow_curve` | gas-tankless ; noritz_candidate, high_demand ; priority=capacity | Prefer: Noritz. Avoid: none. EZ111 must pass its verified rise curve: 7.8 GPM at 50F rise, 6.5 at 60F, 5.6 at 70F, 4.9 at 80F. | high [S11] |
| `R07_noritz_ez98_flow_curve` | gas-tankless ; noritz_candidate, medium_demand ; priority=capacity | Prefer: Noritz. Avoid: none. EZ98 must pass its verified rise curve: 6.9 GPM at 50F rise, 5.7 at 60F, 4.9 at 70F. | high [S11] |
| `R08_noritz_ez71_flow_curve` | gas-tankless ; noritz_candidate, lower_demand ; priority=capacity | Prefer: Noritz. Avoid: none. EZ71 should only be recommended where its verified design-rise flow meets simultaneous demand. | high [S11] |
| `R09_aos_adapt199_design_rise` | gas-tankless ; ao_smith_candidate ; priority=capacity | Prefer: A. O. Smith. Avoid: none. Use 5.9 GPM at 67F rise for ATHR-199X3 planning rather than the 10.5 GPM headline maximum. | high [S31] |
| `R10_marginal_gas_line_is_conditional` | gas-tankless ; marginal_gas_line ; priority=conversion_cost | Prefer: none. Avoid: none. Treat 1/2-inch compatibility as conditional. Require actual gas-load/pressure/length sizing before preferring a brand. | high [S18] |
| `R11_vent_route_exact_model_gate` | gas-tankless ; existing_vent_route_or_long_run ; priority=conversion_cost | Prefer: none. Avoid: none. Compare the actual vent route to the exact model's allowed material, diameter, equivalent length and termination rules. | high [S18] |
| `R12_builtin_recirc_preference` | gas-tankless ; recirculation_priority ; priority=fast_hot_water | Prefer: Navien, Rinnai, Rheem, Noritz. Avoid: none. Prefer a verified pump-integrated line when it fits the loop and demand: NPE-A2, RXP, IKONIC SR/RTG-R, or NRCR are examples. | high [S18], [S47], [S12] |
| `R13_navien_uncontrolled_recirc_penalty` | gas-tankless ; navien_npe_a2, uncontrolled_recirculation ; priority=warranty | Prefer: none. Avoid: Navien NPE-A2 in uncontrolled recirculation configuration. Uncontrolled recirculation cuts NPE-A2 residential heat-exchanger coverage from 15 years to 5 years and parts from 5 to 3. | high [S17] |
| `R14_noritz_tank_conversion_boost` | gas-tankless ; tank_to_tankless_conversion ; priority=conversion_cost | Prefer: Noritz. Avoid: none. Boost EZ Pro/EZTR because the current line is explicitly designed around storage-tank replacement. | high [S11], [S39] |
| `R15_noritz_top_connection_boost` | gas-tankless ; existing_tank_top_connections_can_be_reused ; priority=conversion_cost | Prefer: Noritz. Avoid: none. EZ Pro's top water connections can reduce repiping in some tank replacements. | high [S39] |
| `R16_outdoor_tankless_only_if_approved` | gas-tankless ; outdoor_install_preferred ; priority=conversion_cost | Prefer: none. Avoid: none. Only recommend exact models/configurations explicitly approved for outdoor installation or with the required outdoor kit. | high [S17], [S22], [S40] |
| `R17_high_demand_tankless_gate` | gas-tankless ; three_plus_bathrooms_or_high_simultaneous_demand ; priority=capacity | Prefer: none. Avoid: none. Exclude any model whose verified GPM at design rise is below calculated simultaneous demand, regardless of brand. | high [S22], [S11] |
| `R18_low_demand_modulation_tiebreaker` | gas-tankless ; very_low_demand ; priority=comfort | Prefer: none. Avoid: none. Use exact model minimum firing rate/activation flow as a tie-breaker for low-demand homes; do not apply a brand-wide assumption. | moderate [S31] |
| `R19_aos_x3_hard_water_signal` | gas-tankless ; scale_risk_or_maintenance_priority ; priority=maintenance | Prefer: A. O. Smith Adapt+ X3. Avoid: none. Give a small preference to X3 where scale protection matters, but label its longevity benefit as a manufacturer claim, not independent reliability proof. | moderate [S31] |
| `R20_maintenance_averse_tankless_penalty` | gas-tankless ; homeowner_unwilling_to_maintain_or_descale ; priority=maintenance | Prefer: none. Avoid: none. Penalize tankless technology where maintenance willingness is low; do not solve a technology-level mismatch by switching brands. | moderate [S48] |
| `R21_local_service_radius_gate` | any ; no_capable_service_provider_within_30_miles ; priority=serviceability | Prefer: none. Avoid: none. Strongly penalize or exclude a brand when qualified local service cannot be verified, especially for urgent or complex equipment. | high [S49], [S50], [S51] |
| `R22_rinnai_modesto_service_signal` | gas-tankless ; location_modesto ; priority=serviceability | Prefer: Rinnai. Avoid: none. Rinnai has a current ACE PRO record in Modesto, which is a routing/service signal, not proof the product is superior. | high [S49] |
| `R23_noritz_modesto_service_signal` | gas-tankless ; location_modesto ; priority=serviceability | Prefer: Noritz. Avoid: none. Noritz's current Modesto-area directory shows multiple installers/servicers and a contractor explicitly labeled Noritz trained. | high [S50] |
| `R24_aos_modesto_service_signal` | any ; location_modesto ; priority=serviceability | Prefer: A. O. Smith. Avoid: none. Use the current A.O. Smith Modesto manufacturer locator as a positive routing signal; re-check status at routing time. | high [S52] |
| `R25_rheem_modesto_hpwh_service_signal` | heat-pump ; location_modesto ; priority=serviceability | Prefer: Rheem. Avoid: none. Rheem's current Modesto directory shows multiple contractors under heat-pump water heating. | high [S53] |
| `R26_hpwh_120v_no_new_240` | heat-pump ; no_240v_circuit, homeowner_wants_to_avoid_electrical_upgrade ; priority=conversion_cost | Prefer: Rheem ProTerra 120V, A. O. Smith Voltex 120V. Avoid: none. Shortlist current 120V HPWHs, then size by FHR and location; do not force a 208/240V brand preference. | high [S28], [S36] |
| `R27_navien_nwp_air_volume_gate` | heat-pump ; navien_nwp500, unvented_space_under_450_cuft, ducting_not_possible ; priority=feasibility | Prefer: none. Avoid: Navien NWP500. NWP500 requires at least 450 cu ft for unvented installation or ducting for enclosed spaces. | high [S21] |
| `R28_aos_voltex_x_tight_space` | heat-pump ; indoor_air_volume_or_heat_extraction_problem, outdoor_split_location_possible ; priority=feasibility | Prefer: A. O. Smith Voltex X. Avoid: none. Voltex X's outdoor split architecture can solve indoor air-volume/heat-extraction constraints that unitary HPWHs cannot. | high [S10] |
| `R29_hpwh_size_by_fhr` | heat-pump ; high_hot_water_demand ; priority=capacity | Prefer: none. Avoid: none. Compare exact first-hour rating after electrical/location feasibility; gallon label alone is insufficient. | high [S36], [S21] |
| `R30_hpwh_ambient_range_gate` | heat-pump ; location_temperature_extremes ; priority=feasibility | Prefer: none. Avoid: none. Require the installation location to fit the exact model's heat-pump operating range and understand when resistance backup takes over. | high [S21], [S54] |
| `R31_electrification_or_solar` | heat-pump ; homeowner_priority_electrification_or_solar ; priority=lifetime_cost | Prefer: none. Avoid: none. Let technology selection favor HPWH first; brand is chosen only after circuit, FHR, location and service checks. | high [S01], [S09] |
| `R32_same_brand_replacement_small_bonus` | any ; replacing_same_brand ; priority=conversion_cost | Prefer: none. Avoid: none. Give only a small tie-breaker bonus when same-brand replacement demonstrably reduces connections, venting, controls, parts or service complexity. | moderate [S39] |
| `R33_bradford_wholesale_channel_fit` | any ; homeowner_requires_direct_retail_self_source ; priority=purchase_channel | Prefer: none. Avoid: Bradford White. Bradford White's professional/wholesale channel makes it a weaker fit for a homeowner who insists on direct retail/self-sourcing. | high [S14] |
| `R34_bradford_service_channel_gate` | any ; bradford_white_candidate ; priority=serviceability | Prefer: Bradford White. Avoid: none. Keep Bradford White only when local professional supply/service is verified; Ferguson's Modesto presence is positive but exact part stock must be checked. | moderate [S55], [S56] |
| `R35_electric_tankless_not_v1_default` | electric-tankless ; current_quiz_v1 ; priority=feasibility | Prefer: none. Avoid: none. Do not add electric tankless as a standard fifth technology until service amperage, panel capacity, circuit count and design-rise demand are collected. | high [S04], [S34] |
| `R36_aos_electric_tankless_panel_gate` | electric-tankless ; ao_smith_candidate, insufficient_service_capacity ; priority=feasibility | Prefer: none. Avoid: A. O. Smith high-power electric tankless. A.O. Smith says its larger electric-tankless models can draw up to about 135A; insufficient panel/service capacity is a hard exclusion. | high [S34] |
| `R37_bradford_electric_tankless_scope` | electric-tankless ; whole_home_application ; priority=capacity | Prefer: none. Avoid: Bradford White KwickShot TEF/TET as whole-home default. Current KwickShot TEF/TET products are point-of-use/fixed-fixture products; old broader ES/EFC/EFT family is discontinued. | high [S15], [S16] |
| `R38_urgent_like_for_like_storage` | gas-tank ; electric-tank ; urgent_failure, no_conversion_appetite ; priority=urgency | Prefer: none. Avoid: none. Favor a compatible in-stock like-for-like tank first; choose brand by exact FHR, dimensions, vent/electrical fit, stock and service. | high [S09], [S14] |
| `R39_authorization_language_gate` | any ; routing_to_contractor ; priority=compliance | Prefer: none. Avoid: none. Use 'authorized', 'certified', 'trained', 'ACE PRO', 'NSS' or equivalent only when the current manufacturer source shows that exact status. | high [S51], [S57], [S50] |
| `R40_navien_hpwh_brand_preference` | heat-pump ; preferred_brand_navien ; priority=brand | Prefer: Navien NWP500. Avoid: none. Do not reject a Navien preference merely because HPWH was selected; NWP500 is now a current 50/65/80-gal residential HPWH line. It still must pass circuit, air-volume and FHR gates. | high [S02] |

### Highest-value rules

- **Feasibility always beats brand.**
- **Size tankless at design rise.**
- **Add a real retrofit bonus for Noritz EZ Pro/EZTR only when its geometry/accessories reduce the actual conversion work.**
- **Give 120V HPWH options a conversion-cost bonus when 240V work is undesirable, then immediately run an FHR/demand gate.**
- **Use local serviceability as a brand tie-breaker, not as proof the equipment itself is better.**
- **Never let manufacturer-program status survive indefinitely. Re-check it at routing time.**

---

# 6. Warranty structure

The site should never publish a single warranty number beside a brand name.

| Brand/line example | Verified structure | Engine implication |
|---|---|---|
| Navien NPE-A2 | Residential standard/controlled recirculation and uncontrolled recirculation do not carry the same coverage. | Store recirculation configuration as a warranty variable. [S17] |
| Navien NWP500 | 1 year labor, 10 years parts, 10 years tank for residential single-family use; proper licensed installation and manual compliance are conditions. | Exact use/installer conditions belong in the record. [S79] |
| Rinnai RX/RXP | Current product material provides separate labor, parts and heat-exchanger terms, with conditions and hour caps in the warranty framework. | Store heat-exchanger hour cap, not only years. [S22] |
| Rinnai REHP | Current product page states 1 year labor and 10 years parts for residential use; exact manual controls. | Do not infer tank/labor terms from another Rinnai category. [S25] |
| Rheem ProTerra 120V | Current product pages show 10-year limited tank and parts coverage. | Labor terms must remain separate/unverified unless exact warranty provides them. [S81] |
| A. O. Smith | Warranty varies by exact Adapt/Voltex model and component. | Store warranty at SKU/line level; do not copy a 15-year tankless headline to every Adapt product. [S09] |
| Noritz EZ | Heat exchanger: 25 years or 15,000 burn hours without recirculation; 15 years or 12,000 burn hours with controlled recirculation; 5 years parts, 1 year labor. | Recirculation is a warranty-variable field. [S83] |
| Bradford White | Warranty varies by exact family and suffix. AeroTherm G2 catalog contains both 6-year and 10-year variants; tankless warranty also separates exchanger and parts and contains exclusions. | Exact model lookup is mandatory. [S44] |

### Recommended warranty data model

`brand + line + model + component + years + operating-hour-cap + residential/commercial + recirculation_state + registration + installation_condition + water_quality_condition + labor_coverage + source_url + checked_at`

---

# 7. Installer networks, service, parts and routing

| Brand | Manufacturer program / locator | Central Valley signal | Routing interpretation |
|---|---|---|---|
| Navien | NSS program and public installer/service locator | PACE Supply publicly lists KD Navien within a large Northern California tankless/parts program. Exact Modesto NSS status still needs live verification. | Positive network, but re-check exact status before using 'NSS' or 'approved.' [S57], [S64] |
| Rinnai | Find a PRO, including ACE PRO status | A current ACE PRO record is present in Modesto. | Strong local serviceability signal. Re-check directory at routing time. [S49] |
| Rheem | Find a Pro / local contractor pages | Rheem's current Modesto directory contains multiple contractors tagged for heat-pump water heating. | Useful for HPWH routing. [S53] |
| A. O. Smith | Manufacturer local installer locator / service-provider ecosystem | A current Modesto manufacturer locator exists. | Positive routeability; individual contractor status must be live-checked. [S52] |
| Noritz | Contractor Finder, training, PROCard | Modesto-area directory contains multiple installer/servicer records; PACE Supply appears nearby in the manufacturer directory. | Strong enough to justify Noritz as a visible quiz choice. [S50], [S64] |
| Bradford White | Contractor Directory; BW Factory Trained badge | Directory defines the badge as completion of Bradford White Knowledge Series basic online training. Exact Modesto badged contractor not verified. | Use the exact badge only when it appears in the live manufacturer directory. [S51], [S84] |

**Routing rule:** a contractor being listed by a manufacturer does not make Water Heater Advisor responsible for calling that contractor 'best.' Navien and Bradford White both explicitly treat listed installers as independent parties and warn consumers to use due diligence. [S80], [S51]

### Parts availability

PACE Supply states that its water-heater division carries Rheem, State, KD Navien, Rinnai and Noritz and has one of the larger Northern California inventories of residential/commercial tankless products and repair parts. This supports a **regional parts-channel signal**, not a promise that a specific part is on the shelf in Ripon or Modesto today. [S64]

---

# 8. Price positioning by budget band

This is the section where the research supports the **least brand-level precision**.

Most professional-channel manufacturers do not publish a stable installed consumer price. Retail prices can establish that equipment exists in a rough tier, but they cannot tell the homeowner what a tank-to-tankless conversion, electrical upgrade, gas-line change, venting change, recirculation loop, condensate work, relocation or permit will cost in their house.

| Quiz budget | Safe use now | Do not do |
|---|---|---|
| Under $2,000 | Flag as highly budget-sensitive; favor like-for-like/simple projects for human/local pricing review | Do not promise a named premium tankless/HPWH brand can be installed inside this band |
| $2,000-$3,500 | Compatible with many standard replacement scenarios and some simple higher-efficiency projects | Do not pick brand from budget alone |
| $3,500-$5,000 | Plausible planning range for some straightforward tankless or HPWH projects | Do not treat this as a Modesto average |
| $5,000-$8,000 | Allows more conversion complexity, recirculation, electrical/gas/venting work | Do not assume complexity actually exists |
| Over $8,000 | Supports major conversion/infrastructure work or premium/split configurations | Do not inflate the recommendation to fit budget |

### Recommendation

For v1, **budget should constrain project complexity, not brand.** Start collecting real Modesto quote and sold-job data. After at least several observations per technology and complexity class, build `installed_price_observation` records containing equipment, labor, permit, gas, electrical, venting, recirculation, relocation, date and outcome.

---

# 9. Reliability, failure modes and known problem years

### What can be stated defensibly

- Manufacturer diagnostic documentation can identify what an error code means.
- CPSC records can identify exact recalled models/date ranges.
- Warranty documents can identify what the manufacturer agrees to cover.
- None of those sources alone establishes comparative brand reliability.

### Historical recall records worth adding to the site's legacy-unit database

- **Navien (2018-12-20)**: NPE-180A/NPE-180S and NCB-180E units in specified 2018 production dates when converted from natural gas to propane with the affected kit. Hazard: Excess carbon monoxide from an affected conversion kit. Interpretation: Historical model/date-specific recall. Do not generalize it to current NPE-A2 products. [S75]
- **Ao-Smith (2018-11-08)**: Certain 30/40/50-gallon Ultra-Low NOx gas water heaters made 2011-2016 under A.O. Smith, State, American and other labels, sold primarily in California. Hazard: Burner screen could tear and create excess radiant heat/fire hazard. Interpretation: Relevant to legacy-unit identification in California, not a current-line reliability ranking. [S76]
- **Rheem (2016-05-26)**: Specified 2014-2015 Performance Platinum electric storage models sold at Home Depot. Hazard: Control panel overheating, fire and burn hazard. Interpretation: Historical model/date-specific recall. Do not generalize to current ProTerra or storage models. [S77]
- **Bradford-White (2002-08-15)**: Specified 75-gallon power-vented gas models manufactured/sold in 2002. Hazard: Incorrect flue-gas baffles could affect combustion and carbon monoxide emissions. Interpretation: Very old model-specific recall, useful only for legacy-unit lookup. [S78]

The 2018 A. O. Smith Ultra-Low NOx recall is especially relevant to California because CPSC says the affected units were sold primarily in California and included A. O. Smith, State and American labels among others. That is useful for **existing-unit identification**, not for declaring current A. O. Smith products unreliable. [S76]

### Service life

Use technology-level planning ranges only. A reasonable public planning baseline is about 20 years for many tankless systems and roughly 10-15 years for storage tanks, but actual life is strongly affected by installation, water quality, maintenance, duty cycle and repairability. Heat-pump water heaters should not be assigned a brand-specific life expectancy from warranty length alone.

### Hard water

The research did not find a defensible comparative dataset showing that one of these six brands lasts X years longer than another under Modesto hard-water conditions. The engine should therefore use hard water to trigger **maintenance, scale-protection and service requirements**, not a fake brand reliability score.

---

# 10. Head-to-head comparisons

## Navien vs Rinnai: gas tankless

**Choose Navien when:** the NPE-A2's built-in ComfortFlow recirculation/buffer architecture, exact flow-at-rise fit, installation geometry and local service path make it the better house-level match. [S17]

**Choose Rinnai when:** RX/RXP meets the design flow and the homeowner values Rinnai's current recirculation platform and verified Modesto-area PRO service path. The RX/RXP sizing guide is also unusually useful because it shows expected output against inlet-water temperature rather than only headline GPM. [S22], [S49]

**No overall winner.** A Modesto quiz should compare flow at the home's design condition, recirculation design, installation constraints, warranty configuration and live serviceability.

## Rheem vs A. O. Smith: heat pump

**Choose Rheem when:** a specific 120V or 240V ProTerra model has the better FHR/circuit fit and local installer coverage. Rheem's 120V shared-circuit family spans 40-80 gallon nominal sizes. [S08]

**Choose A. O. Smith when:** the Voltex 120V line has the better FHR/circuit fit, or the Voltex X outdoor split architecture solves a tight indoor-air-volume problem. [S36], [S82]

**No overall winner.** Circuit availability, FHR, installation location and serviceability decide.

## Rinnai vs Noritz: gas tankless

**Choose Rinnai when:** RX/RXP passes the flow-at-inlet-temperature test and its recirculation/service network is the stronger local fit.

**Choose Noritz when:** the job is a tank-to-tankless retrofit where EZ Pro's top-mounted connections, retrofit orientation, vent options or EZTR bundle can materially reduce conversion work. [S83]

**No overall winner.** Noritz gets a real conversion-fit edge in some retrofit houses, not a universal performance edge.

## Bradford White vs A. O. Smith: storage

**Choose Bradford White when:** the exact storage model has the right FHR/dimensions/venting and a strong local professional supply/service path. Bradford White's distribution model makes that path part of the product decision. [S14]

**Choose A. O. Smith when:** the exact ProLine model is a better FHR, venting, emissions-rule, availability or service fit. [S09]

**No overall winner.** For storage, exact model availability and local service often matter more than national brand positioning.

---

# 11. Should the quiz brand list change?

## Yes. Make one visible change

Current visible default choices should become:

**Navien | Rinnai | Rheem | A. O. Smith | Noritz | Bradford White | No preference / not sure | Other / existing brand**

### Why add Noritz

- Current 2026 residential product depth is real, not legacy.
- EZ Pro is unusually relevant to the exact tank-to-tankless conversion use case Water Heater Advisor needs to route.
- The manufacturer has a live contractor/service finder with meaningful Modesto-area coverage.
- PACE Supply gives the brand a credible Northern California distribution/parts signal.

Sources: [S83], [S50], [S64]

### Do not add State, American or Ruud as separate default buttons yet

They matter operationally, especially when a homeowner is replacing an existing unit, but they add more user-interface choice than recommendation value at this stage. Accept them through `Other / existing brand`, map them internally to the relevant manufacturer/platform family, and verify exact model equivalence before treating sibling products as interchangeable.

### Brand-mismatch scripts the quiz now needs

**Preferred brand lacks the selected technology:**

> You told us you prefer [Brand]. Based on the rest of your answers, [Technology] is the stronger fit for your home. [Brand] does not currently offer a comparable whole-home product in that category, so we are showing brands that do.

**Navien + heat pump:**

> Navien now offers the NWP500 heat-pump line, so we can keep Navien in the shortlist. We still need to confirm electrical, space/ducting and first-hour demand before recommending a specific model.

**Bradford White + electric tankless:**

> Bradford White currently has point-of-use electric tankless products, but that is not the same as a whole-home electric tankless system. We are not treating that preference as a whole-home match.

---

# 12. What could not be verified

These are not research failures. They are fields that should remain visibly unverified until the right evidence exists.

| Item | Why it matters | What would verify it |
|---|---|---|
| Exact Modesto cold-water inlet design temperature by season/ZIP | Tankless GPM must be calculated at actual design temperature rise. | Reliable local utility/engineering data or measured cold-water temperatures across representative Modesto homes. |
| Complete model-by-model technical ingestion for Navien NHW/NPN families | Current catalog presence is verified, but exact flow/vent/gas data is not yet in the engine. | Download and parse current manufacturer spec sheets/install manuals for every active SKU. |
| Complete model-by-model technical ingestion for Rinnai RUCS/RUS/V families | They remain on current product pages but are not needed for the first decision rules without exact specs. | Current manufacturer tech sheets and model pages. |
| Brand-specific comparative reliability/failure rates | Without a denominator, error-code and complaint data cannot support 'more reliable' claims. | Large warranty-claim/service-call dataset normalized by installed base, model and age. |
| Known bad production years/model lines across all six brands | Anecdotes are not enough to publish an avoid list. | Manufacturer service bulletins/recalls plus statistically meaningful service/warranty evidence. |
| Realistic brand-specific service life under Modesto hard-water conditions | Water quality, maintenance and installation dominate life; no defensible comparative dataset was found. | Local service history by model + water hardness + maintenance history. |
| Exact current Modesto/Central Valley physical parts stock by brand | Distributor network presence does not prove that a specific repair part is on the shelf today. | Direct branch inventory/API check or distributor confirmation by critical part category. |
| Navien NSS status for specific Modesto contractors | Do not call a local company NSS/approved unless current directory output verifies it. | Manufacturer locator query for target ZIP on the date of routing. |
| Bradford White Factory Trained status for specific Modesto contractors | General directory existence does not prove local training status. | Manufacturer directory result showing the BW Factory Trained label for the contractor. |
| Brand-specific installed price bands in Modesto | Public equipment prices do not predict conversion labor, permit, gas, venting, electrical, recirculation or relocation costs. | At least three current local quotes per technology/complexity class, with equipment and upgrade components separated. |
| Consumer financing at manufacturer level for Navien, A.O. Smith, Noritz and Bradford White | Financing may be offered by contractors or channel partners rather than the manufacturer. | Current manufacturer program documentation or verified contractor program pages. |
| Exact model-level water-hardness limits/descaling intervals across every line | These are manual-specific and can affect warranty/maintenance recommendations. | Parse current installation/maintenance manuals for every active model family. |

---

# Recommended engine changes

1. Change tankless sizing output from raw GPM to `required_gpm_at_design_temp_rise`.
2. Add `inlet_water_temp_design_f` and `hot_water_setpoint_f` as explicit sizing inputs/derived fields.
3. Add Noritz to visible brand preference choices.
4. Let Navien survive the brand filter for heat-pump recommendations.
5. Keep electric tankless out of the four-technology v1 engine until panel/service and circuit-count questions exist.
6. Add `model_line`, `verified_flow_points`, `fhr`, `recovery`, `electrical`, `gas_input`, `venting`, `air_volume`, `condensate`, `outdoor_ok`, `ambient_range`, `warranty_conditions` and `source_checked_at` to product records.
7. Add `live_manufacturer_status_checked_at` to contractor records.
8. Separate manufacturer-program status from licensing status.
9. Add a serviceability score based on verified local installer coverage and parts channel, but never call it product quality.
10. Create a legacy-unit recall lookup by model/serial/date range.
11. Collect actual local installed-price observations before turning budget bands into brand rules.
12. Collect outcome data: recommended model, quoted model, sold model, price, reason for change, service issue and homeowner satisfaction.

---

# Appendix A: machine-readable deliverables

The companion JSON contains:

- 6 brand x technology records
- 31 product-line records
- 40 structured selection rules
- 11 warranty profiles
- 6 routing/network records
- 4 historical recall records
- 12 explicit unverified items

---

# Appendix B: source register

All sources below were checked on **2026-08-07** for this research pass. Manufacturer pages can change without notice, so volatile fields should be refreshed before publication/routing.

- **[S01]** https://www.navieninc.com/residential/water-heaters  | checked 2026-08-07
- **[S02]** https://www.navieninc.com/series/nwp500  | checked 2026-08-07
- **[S03]** https://www.rinnai.us/residential  | checked 2026-08-07
- **[S04]** https://www.rinnai.us/residential/faq  | checked 2026-08-07
- **[S05]** https://www.rinnai.us/residential/tankless-water-heaters  | checked 2026-08-07
- **[S06]** https://www.rheem.com/products/residential/water-heating/tank/  | checked 2026-08-07
- **[S07]** https://www.rheem.com/products/residential/water-heating/tankless/  | checked 2026-08-07
- **[S08]** https://www.rheem.com/heatpumpwaterheaters/  | checked 2026-08-07
- **[S09]** https://www.hotwater.com/residential/water-heaters/  | checked 2026-08-07
- **[S10]** https://www.hotwater.com/newsroom/voltex-x-outdoor-split-heat-pump-water-heater.html  | checked 2026-08-07
- **[S11]** https://noritz.com/ez-series  | checked 2026-08-07
- **[S12]** https://noritz.com/nrcr/  | checked 2026-08-07
- **[S13]** https://noritz.com/tankless-groups/  | checked 2026-08-07
- **[S14]** https://www.bradfordwhite.com/explore-our-residential-products/  | checked 2026-08-07
- **[S15]** https://www.bradfordwhite.com/tankless-water-heater/  | checked 2026-08-07
- **[S16]** https://forthepro.bradfordwhite.com/our-products/usa-residential-tankless-electric/kwickshot-tankless-electric-es-efc-eft-discontinued/  | checked 2026-08-07
- **[S17]** https://www.navieninc.com/products/npe-240a2  | checked 2026-08-07
- **[S18]** https://www.navieninc.com/series/npe-a2/npe-a2-series-faqs  | checked 2026-08-07
- **[S19]** https://www.navieninc.com/residential/tankless-water-heaters  | checked 2026-08-07
- **[S20]** https://www.navieninc.com/series/npe-s2/npe-s2-series-faqs  | checked 2026-08-07
- **[S21]** https://www.navieninc.com/products/nwp500-65  | checked 2026-08-07
- **[S22]** https://www.rinnai.us/residential/product-detail/rx199in  | checked 2026-08-07
- **[S23]** https://www.rinnai.us/residential/re-model-series  | checked 2026-08-07
- **[S24]** https://www.rinnai.us/residential/rep-model-series  | checked 2026-08-07
- **[S25]** https://www.rinnai.us/residential/product-detail/rehp50  | checked 2026-08-07
- **[S26]** https://www.rinnai.us/residential/product-detail/rehp65  | checked 2026-08-07
- **[S27]** https://www.rinnai.us/professional/product-detail/rehp80  | checked 2026-08-07
- **[S28]** https://www.rheem.com/product/rheem-proterra-plug-in-heat-pump-water-heater-with-hydroboost-120v-shared-circuit-proph40-t0-rh120-m/  | checked 2026-08-07
- **[S29]** https://www.homedepot.com/p/317100803  | checked 2026-08-07
- **[S30]** https://www.homedepot.com/b/Plumbing-Water-Heaters-Tank-Water-Heaters/Rheem/Residential/80-gal/N-5yc1vZ2fkoqepZ7i0Z1z1cmtuZ1z1t3om  | checked 2026-08-07
- **[S31]** https://www.hotwater.com/products/tankless-adapt-premium-condensing-adapt/athr-199x3-100/100374812.html  | checked 2026-08-07
- **[S32]** https://www.hotwater.com/residential/water-heaters/gas-tankless/  | checked 2026-08-07
- **[S33]** https://www.hotwater.com/products/tankless-mid-efficiency-condensing-adapt/atm-180m-n-100/100384229.html  | checked 2026-08-07
- **[S34]** https://www.hotwater.com/residential/water-heaters/electric-tankless/  | checked 2026-08-07
- **[S35]** https://www.hotwater.com/info-center/electric-water-heaters/electric-tankless.html  | checked 2026-08-07
- **[S36]** https://www.hotwater.com/products/HPTV-66-SG210.html  | checked 2026-08-07
- **[S37]** https://www.hotwater.com/residential/water-heaters/heat-pump-water-heaters/  | checked 2026-08-07
- **[S38]** https://www.hotwater.com/products/ultra-low-nox-atmospheric-vent-proline/gur-50-450/100351415.html  | checked 2026-08-07
- **[S39]** https://noritz.com/products/eztr50  | checked 2026-08-07
- **[S40]** https://noritz.com/products/eztr75  | checked 2026-08-07
- **[S41]** https://help.noritz.com/index.php/knowledge-base/whats-the-difference-between-ez-and-eztr/  | checked 2026-08-07
- **[S42]** https://support.noritz.com/tankless-water-heaters-residential-nrcr-series-nrcr111dv-gq-c3260wxq-ff-us-ng  | checked 2026-08-07
- **[S43]** https://docs.bradfordwhite.com/I%26O/238-54628-00_Current.pdf  | checked 2026-08-07
- **[S44]** https://forthepro.bradfordwhite.com/our-products/usa-residential-heat-pump/aerotherm-series-g2/  | checked 2026-08-07
- **[S45]** https://products.bradfordwhite.com/  | checked 2026-08-07
- **[S46]** https://forthepro.bradfordwhite.com/our-products/usa-residential-tank-type-gas-ultra-low-nox/ultra-low-nox-power-vent-gas/  | checked 2026-08-07
- **[S47]** https://www.rinnai.us/residential/tankless-water-heaters/recirculation-accessories  | checked 2026-08-07
- **[S48]** https://help.noritz.com/index.php/knowledge-base/errorcode90premix/  | checked 2026-08-07
- **[S49]** https://www.rinnai.us/find-pro  | checked 2026-08-07
- **[S50]** https://contractorfinder.noritz.com/contractors-modesto-ca  | checked 2026-08-07
- **[S51]** https://contractorfinder.bradfordwhite.com/  | checked 2026-08-07
- **[S52]** https://local.hotwater.com/where-to-buy/california/modesto  | checked 2026-08-07
- **[S53]** https://www.rheem.com/best-contractors-in-modesto-ca/  | checked 2026-08-07
- **[S54]** https://www.rheem.com/product/rheem-professional-prestige-plug-in-heat-pump-water-heater-dedicated-circuit-proph50-t0-rh120/  | checked 2026-08-07
- **[S55]** https://www.ferguson.com/store/ca/modesto/plumbingpvf-0682  | checked 2026-08-07
- **[S56]** https://www.ferguson.com/category/water-heaters/?prefn1=brand&prefv1=Bradford%2BWhite  | checked 2026-08-07
- **[S57]** https://www.navieninc.com/becomenss  | checked 2026-08-07
- **[S58]** https://www.navieninc.com/  | checked 2026-08-07
- **[S59]** https://www.navieninc.com/products/nwp500-65/warranties  | checked 2026-08-07
- **[S60]** https://noritz.com/warranty  | checked 2026-08-07
- **[S61]** https://support.noritz.com/tankless-water-heaters-residential-ez-series-ez111dv-gq-c3260wx-ff-us-ng  | checked 2026-08-07
- **[S62]** https://docs.bradfordwhite.com/Warranty/238-53321-00_Current.pdf  | checked 2026-08-07
- **[S63]** https://www.navieninc.com/where-to-buy  | checked 2026-08-07
- **[S64]** https://www.pacesupply.com/Divisions/WaterHeaterSolutions  | checked 2026-08-07
- **[S65]** https://www.rinnai.us/pro/dehart-plumbing%2C-heating%2C-and-air-inc./modesto/95356?email=&guid=001TR00000arj8pYAA&zipcode=95336  | checked 2026-08-07
- **[S66]** https://www.pacesupply.com/brands/rinnai-13403480  | checked 2026-08-07
- **[S67]** https://www.rheem.com/find-a-pro/  | checked 2026-08-07
- **[S68]** https://www.hotwater.com/pros/service-provider-enrollment.html  | checked 2026-08-07
- **[S69]** https://www.ferguson.com/category/water-heaters/?prefn1=brand&prefv1=A.O.+Smith  | checked 2026-08-07
- **[S70]** https://procard-v2.noritz.com/  | checked 2026-08-07
- **[S71]** https://media.rinnai.us/salsify_asset/s-d7680150-5ee9-4b1f-9f19-b4e6be7a41c4/100000652-Troubleshooting%20TWH%20Diagnostic%20Codes%20%281%29.pdf  | checked 2026-08-07
- **[S72]** https://www.rheem.com/water-heating/articles/how-to-clean-the-filter-on-your-heat-pump-water-heater/  | checked 2026-08-07
- **[S73]** https://university.hotwater.com/products/tankless/tanklessworkshop/  | checked 2026-08-07
- **[S74]** https://docs.bradfordwhite.com/I%26O/238-54627-00_Current.pdf  | checked 2026-08-07
- **[S75]** https://www.cpsc.gov/Recalls/2019/Navien-Recalls-Tankless-Water-Heaters-and-Boilers-Due-to-Risk-of-Carbon-Monoxide-Poisoning  | checked 2026-08-07
- **[S76]** https://www.cpsc.gov/Recalls/2019/A-O-Smith-Recalls-Ultra-Low-NOx-Water-Heaters-Due-to-Fire-Hazard  | checked 2026-08-07
- **[S77]** https://www.cpsc.gov/Recalls/2016/Rheem-Recalls-to-Repair-Water-Heaters  | checked 2026-08-07
- **[S78]** https://www.cpsc.gov/Recalls/2002/cpsc-bradford-white-corporation-announce-recall-of-gas-water-heater  | checked 2026-08-07
- **[S79]** https://www.navieninc.com/products/nwp500-50/warranties  | checked 2026-08-07
- **[S80]** https://www.navieninc.com/installers/installer-locator-terms-and-conditions  | checked 2026-08-07
- **[S81]** https://www.rheem.com/product/rheem-proterra-plug-in-heat-pump-water-heater-with-hydroboost-120v-shared-circuit-proph65-t0-rh120-m/  | checked 2026-08-07
- **[S82]** https://www.hotwater.com/info-center/voltexX-split-heat-pump.html  | checked 2026-08-07
- **[S83]** https://noritz.com/products/gq-c3261wx-ff-1-us-ez111dv  | checked 2026-08-07
- **[S84]** https://forthepro.bradfordwhite.com/training/  | checked 2026-08-07