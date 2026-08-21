# Deep Research Prompt: Water Heater Advisor Topical Authority Map

Paste everything below the divider into a new ChatGPT Deep Research session. Attach the three keyword files named in the prompt if that session cannot access them directly.

---

## Role

Act as a senior content strategist, information architect, SEO researcher, answer-engine optimization researcher, generative-engine visibility researcher, and evidence editor.

Your assignment is to research and design the complete topical authority map for **Water Heater Advisor**, then produce an implementation packet that a separate ChatGPT build session can use without access to the conversation that produced it.

Do not write generic SEO advice. Every recommendation must become a page, link, evidence requirement, publishing rule, measurement item, or explicit exclusion.

## Project and repository

- Project: **Water Heater Advisor**
- Canonical repository: <https://github.com/ndxtraders/water-heater-advisor>
- Intended production domain: <https://www.waterheateradvisor.com>
- Current public-domain status is not evidence of the canonical application. Inspect the repository's current `main` branch as the source of truth.
- The Next.js application is in `site/`.
- Existing pages must remain intact. This is additive work for a new Resources section.
- Proposed navigation label: **Resources**
- Proposed hub URL: **`/resources/`**
- Proposed hub headline direction: **Water Heater Resources for Homeowners**

Before researching new content, inspect the current repository and inventory every existing indexable route, its purpose, title, search intent, conversion path, and internal links. Do not rely only on the route list in this prompt because the repository may have changed.

## What the business is

Water Heater Advisor is an independent homeowner education, recommendation, and installer-matching site. It is not a plumbing company and does not perform installation or repair work.

The site helps a homeowner:

1. Understand a water-heater problem or decision.
2. Determine which technology and capacity may fit the home.
3. Understand costs, installation requirements, maintenance, incentives, and risks.
4. Receive a useful recommendation through the **Find my system** quiz.
5. Request an introduction to an appropriate installer where matching is available.

The site may be paid by installers for completed work. Payment may influence which eligible installer receives an introduction. It must never influence the system recommendation.

The commercial and editorial advantage is the ability to tell a homeowner when a popular or expensive option is wrong for the home.

## Audience and market model

### Primary audience

United States homeowners across the complete ownership and replacement journey:

- A water heater has failed or is leaking.
- Performance has changed and the homeowner is diagnosing why.
- The homeowner is deciding whether to repair or replace.
- The homeowner is comparing technologies, capacities, brands, models, costs, and installers.
- The homeowner is researching efficiency, maintenance, rebates, permits, code, and long-term ownership.
- The homeowner has already installed a system and needs safe ownership guidance.

### Geographic architecture

Use two coordinated layers:

1. **National evergreen guidance** for questions whose answers do not depend on a specific utility, climate, permit authority, incentive program, or local market.
2. **Local utility-territory guidance** for costs, energy economics, rebates, permits, code administration, climate inputs, water conditions, and installer availability.

Modesto and Turlock, California are the current local examples. Expansion should follow utility territory and evidence availability, not interchangeable city pages.

Do not create thin city pages or swap place names into identical copy.

## Primary conversion path

The default article CTA is the **Find my system** quiz.

The article must answer the reader's question completely before the CTA. The transition should explain why a home-specific recommendation requires details that a general article cannot know.

For readers outside a supported installer market:

- Still provide the complete quiz recommendation.
- State clearly when installer matching is unavailable.
- An optional ZIP code and email waitlist may be recommended, but the recommendation must never be withheld behind a form.

Use different CTAs only when the context genuinely requires it, such as immediate safety guidance, choosing a licensed professional, or reading a directly dependent resource.

## Editorial standard

The voice is plainspoken, independent, evidence-led, and willing to render a conditional verdict.

Most content titles should use the natural question a homeowner asks. When appropriate, use:

- **How to...** for achieving a goal or solving a safe, homeowner-appropriate problem.
- **Why...** for explaining a mechanism, unexpected outcome, or misconception.
- A direct question for People Also Ask style needs.

For question-based articles:

1. Open with a brief, concrete tension or consequence.
2. Give a clear, self-contained answer within approximately the first 100 words.
3. Explain what changes the answer for a particular home.
4. Use short sections, descriptive headings, tables, lists, diagrams, or decision rules only when they improve comprehension.
5. Write for a busy homeowner at approximately an eighth-grade reading level or lower without flattening technical meaning.
6. Define technical terms in plain language.
7. Place evidence near the claim it supports.
8. End with the appropriate next step and a restrained CTA.

Avoid contractor-style sales copy, manufactured urgency, unsupported superlatives, generic introductions, filler conclusions, and content written to reach a word count.

## Safety, legal, and trust boundaries

These requirements are mandatory.

1. The site is not a plumbing company. Do not describe it as performing work.
2. Do not recommend `LocalBusiness` schema, a contractor NAP block, service-business testimonials, or language that implies Water Heater Advisor is the installer.
3. Do not label an installer "authorized," "certified," or equivalent unless that current status is verified in the manufacturer's own directory.
4. Do not give dangerous DIY instructions for gas, combustion, venting, electrical work, pressure relief systems, refrigerants, structural changes, or permit-controlled work.
5. For dangerous or code-dependent work, explain the risk, provide safe immediate actions when authoritative sources support them, and direct the reader to a licensed professional or emergency service as appropriate.
6. There is currently no licensed plumber, contractor, or engineer serving as the named technical reviewer. Do not imply professional review that did not occur.
7. Flag pages that should receive qualified professional review before publication.
8. Use transparent authorship, source links, checked dates, claim scope, confidence, and update triggers.
9. Never publish one supposedly universal average price. Use sourced ranges and itemized cost drivers. Separate national context from verified local prices.
10. Never declare one technology, brand, or model best overall. State who it fits, who it does not fit, and why.
11. Distinguish verified fact, reasonable inference, directional observation, estimate, and unknown.
12. Never invent precision. An explicit unknown is preferable to a confident guess.
13. Flag California referral, privacy, consent, and contractor-law claims for counsel where appropriate. Do not provide legal conclusions.

## Seed keyword evidence

Use these attached files as supporting inputs:

1. `50 plumbing keywords 2026.md`
2. `HIGH INTENT PLUMBING KEYWORDS.md`
3. `Saved Plumbing Repair Keywords Stats 2026-02-04 at 08_51_36 - Saved Plumbing Repair Keywords Stats 2026-02-04 at 08_51_36.csv`

Known limitations:

- The two Markdown files include broad plumbing terms and only limited water-heater-specific terms.
- The CSV is a 2022 through 2025 local general-plumbing export for Twain Harte, Sonora, and nearby markets. It contains no water-heater-specific rows.
- Do not project those local figures onto national water-heater demand.
- Preserve source dates and geographic scope.
- If a volume number lacks verifiable source metadata, label it unverified or directional.

Build a new water-heater-specific question and topic dataset. If paid keyword-volume data is unavailable, do not invent search volume or difficulty. Use observable search behavior and label it directional.

## Governing search principles

Follow current primary-source guidance from search and answer platforms. Verify that the guidance remains current when conducting the research.

- Create people-first content with original value and a clear site purpose.
- Treat individual page usefulness as the core unit. Broad coverage does not make every page rank.
- Use logical information architecture, descriptive URLs, crawlable contextual links, and at least one internal path to every indexable page.
- Do not create a separate thin page for every keyword or wording variation.
- Do not use a proprietary or invented "topical authority score" as if it were a Google metric.
- Do not promise rankings, indexing, featured snippets, rich results, AI citations, or traffic.
- Do not claim that E-E-A-T is one numerical ranking factor.
- Do not claim that schema creates rankings or AI citations.
- Do not require special "GEO schema," an AI text file, or a particular crawler setting unless current official documentation supports that exact claim.
- Do not recommend FAQ or Q&A schema automatically. `QAPage` is for pages where users can submit answers, not ordinary editorial articles. Structured data must match visible content and current eligibility rules.
- Allowing a search or AI crawler creates eligibility, not guaranteed inclusion.

Current official references to verify and use:

- Google people-first content: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>
- Google AI features and websites: <https://developers.google.com/search/docs/appearance/ai-features>
- Google link best practices: <https://developers.google.com/search/docs/crawling-indexing/links-crawlable>
- Google structured-data policies: <https://developers.google.com/search/docs/appearance/structured-data/sd-policies>
- Google Q&A structured-data rules: <https://developers.google.com/search/docs/appearance/structured-data/qapage>
- Bing Webmaster Guidelines: <https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a>
- OpenAI publisher and crawler guidance: <https://help.openai.com/en/articles/12627856-publishers-and-developers-faq>
- Perplexity crawler guidance: <https://docs.perplexity.ai/docs/resources/perplexity-crawlers>

## Research method

### Phase 1: Audit the existing site

Inspect the current `main` branch and produce a route inventory.

For each existing page, record:

- URL
- page type
- title and primary purpose
- primary question or intent
- audience stage
- national or local scope
- conversion path
- current internal links
- content it already answers
- overlap risk with proposed resources
- whether the new hub should link to it

Protect existing URLs and established conversion paths. Recommend additive links from the Resources system, not rewrites to existing pages.

### Phase 2: Build the subject ontology

Map the complete residential water-heater subject before choosing pages. Include, at minimum:

- emergencies and warning signs
- diagnosis and troubleshooting
- repair versus replacement
- technology types and fuel choices
- household demand and sizing
- installation feasibility and conversion work
- purchase and replacement costs
- operating costs and energy efficiency
- maintenance, lifespan, warranties, and ownership
- brands, product lines, and model-level decisions
- water quality and its effect on equipment
- safety, codes, permits, and licensed work
- incentives, rebates, tax credits, and utility economics
- installer selection and quote evaluation
- local market and utility-territory information
- myths, misconceptions, and emerging technologies

Show parent-child and prerequisite relationships. Identify adjacent topics that should be excluded because they do not help the target homeowner or business purpose.

### Phase 3: Discover the homeowner question universe

Gather natural-language questions from multiple observable sources, including:

- People Also Ask and related searches
- search suggestions and query refinements
- Bing and other answer-engine result patterns
- relevant homeowner forums and community discussions
- retailer and manufacturer support questions
- government, utility, and energy-program guidance
- competitor headings and navigation
- the current site's quiz questions and recommendation outputs

User-generated sources may reveal question wording, confusion, fears, and objections. They are not sufficient evidence for technical, safety, cost, warranty, or performance claims.

For every distinct question, classify:

- homeowner wording
- discovery source, source URL, and observed date
- underlying need
- search intent
- observed search-result or answer-engine format
- urgency
- journey stage
- national or local scope
- answer format
- verified demand data or directional demand evidence
- evidence burden
- safety risk
- commercial relevance
- whether it deserves its own URL, belongs in another page, or should be excluded

Merge wording variants that require substantially the same answer.

### Phase 4: Analyze competitors by cluster

Identify competitors separately for each topic cluster rather than selecting one global competitor list.

Include the strongest relevant pages from:

- independent editorial or advisory sites
- manufacturers
- government, utility, ENERGY STAR, and Department of Energy sources
- retailers where they dominate a commercial query
- local contractors where local intent is present

For each cluster, record:

- dominant page types and result features
- recurring questions and headings
- source quality
- strengths worth matching
- unsupported or oversimplified claims to avoid
- unanswered homeowner questions
- opportunities for original value
- whether Water Heater Advisor already has a stronger asset

Do not copy a competitor's outline or wording.

### Phase 5: Determine the minimum complete authority map

Design the smallest coherent set of pages that covers the important homeowner decisions without thinness or cannibalization.

The architecture should contain, where research supports them:

- `/resources/` hub
- major cluster or pillar pages
- focused question-answer pages
- comparison and decision pages
- local utility-territory pages
- tools, calculators, checklists, and downloadable resources
- connections to relevant existing pages and the quiz

Do not target a predetermined total page count. Explain why each URL must exist independently.

### Phase 6: Prioritize production

Score or rank each proposed page using transparent factors:

- homeowner usefulness
- urgency or consequence
- relevance to the quiz and installer-match journey
- distinct search intent
- observable demand
- competitive opportunity
- evidence strength
- topical dependency
- internal-link value
- production effort
- update burden
- safety or legal review burden

Do not disguise estimates as measured data. Show the inputs behind any scoring model.

Select the Resources Hub plus approximately **12 to 15** first-wave pages. The exact number must follow from dependencies and distinct intent, not a quota.

### Phase 7: Design for SEO, AEO, GEO, and AI search

For every proposed page, specify how it should be easy for a person, search engine, and answer engine to understand:

- one clear primary question or task
- concise direct answer near the beginning
- clear entity names instead of ambiguous pronouns where helpful
- descriptive headings that reflect real subquestions
- answer-sized passages that remain accurate out of context
- tables, definitions, steps, decision rules, and caveats where appropriate
- primary-source citations placed near factual claims
- visible author, checked date, review status, and update triggers
- descriptive title, description, URL, breadcrumb, and internal anchors
- indexability, canonical, sitemap, and robots requirements
- structured-data recommendation only when accurate, visible, and eligible
- image, diagram, calculator, or downloadable-resource opportunities

Do not sacrifice readability to chase snippets or AI citations.

### Phase 8: Design the internal-link system

Create a self-referencing content architecture.

At minimum:

- The Resources Hub links to every major cluster.
- Every cluster page links back to the hub.
- Supporting pages link to their parent cluster and to genuinely useful sibling pages.
- Existing technology, comparison, brand, local, methodology, installer, emergency, and quiz pages are included where contextually relevant.
- Every proposed indexable page has at least one planned inbound link.
- Anchor text is descriptive and varied naturally.
- Links are justified by the reader's next question, not keyword repetition.
- Unpublished URLs are not linked from production until their destination is released in the same deployment.

Produce an explicit source-to-destination link matrix.

### Phase 9: Specify the publishing foundation

The new Resources section should use a reusable content system while leaving existing pages intact.

Define requirements for:

- structured article source files
- shared layouts and page templates
- content schema and validation
- frontmatter or equivalent metadata
- authorship and review status
- source and checked-date records
- breadcrumbs
- related questions and related resources
- contextual CTAs
- internal-link validation
- sitemap inclusion
- canonical metadata
- structured data
- draft, reviewed, approved, published, and updated states
- update reminders for volatile claims

Do not prescribe a dependency or implementation pattern without first inspecting the current Next.js application. Prefer the simplest architecture that can safely manage dozens of pages.

## Required deliverables

Return the following in one complete implementation packet.

### 1. Executive recommendation

Summarize:

- the recommended authority strategy
- the strongest opportunity
- what should be built first
- what should not be built yet
- the main evidence, safety, legal, and maintenance risks

### 2. Current-site content audit

Provide the complete existing-page inventory and overlap analysis.

### 3. Audience and journey map

Map triggers, questions, fears, decisions, objections, and desired next actions across the complete journey.

### 4. Subject ontology and cluster architecture

Provide both:

- a hierarchical tree
- a short explanation of how the clusters relate

### 5. Question and intent map

Group natural-language questions by cluster. Identify which should receive their own pages, which belong as sections, and which should be excluded.

### 6. Cluster-level competitor analysis

Identify the pages and organizations that set the current standard for each cluster, along with gaps Water Heater Advisor can fill.

### 7. Master content index

Provide one row per existing or proposed URL with these fields:

| Field | Requirement |
|---|---|
| ID | Stable unique ID |
| Status | Existing, proposed, merge, defer, exclude |
| Cluster | Parent topic |
| Page type | Hub, pillar, question, comparison, local, tool, checklist, other |
| Working title | Prefer natural questions, How to, or Why when appropriate |
| Primary question | One distinct user need |
| Primary query concept | Not a list of variants |
| Question-discovery evidence | Source, URL, and observed date |
| Demand evidence | Verified metric with source and date, or directional evidence |
| Result format | Dominant search or answer-engine format observed |
| Intent | Informational, diagnostic, commercial, transactional, navigational |
| Journey stage | Trigger through ownership |
| Geography | National or named utility territory |
| URL | Proposed or existing |
| Parent URL | Immediate parent |
| Unique value | Why this page deserves its own URL |
| Direct-answer thesis | The answer in one or two sentences |
| Evidence burden | Low, moderate, high, professional review required |
| CTA | Default quiz or justified alternative |
| Priority | Wave and rationale |
| Update trigger | What could make the page stale |
| Overlap notes | Merge and cannibalization controls |

### 8. Cannibalization and exclusion register

List merged question variants, pages not worth creating, topics outside scope, and conflicts with existing URLs.

### 9. First-wave publishing plan

Select the Resources Hub plus approximately 12 to 15 pages. Show dependency order and the internal links that must ship together.

### 10. Build-ready brief for every first-wave page

Each brief must include:

1. Stable page ID
2. Page type and cluster
3. Recommended URL
4. Primary title and two evidence-based alternatives
5. Exact homeowner question
6. Search intent and journey stage
7. Reader situation, stakes, and desired outcome
8. Unique promise and reason the page deserves its own URL
9. Short hook direction
10. A 40 to 80 word direct-answer draft
11. Complete H2 and H3 outline
12. Questions answered under each section
13. Decision rules, tables, diagrams, checklists, or tools needed
14. Required claims and prohibited overclaims
15. Approved source plan with primary-source URLs
16. Claims requiring local data or professional review
17. Internal links into the page
18. Internal links out of the page, including anchor concept and reader reason
19. CTA transition and CTA
20. Metadata title and description direction
21. Appropriate structured-data type, or `none`
22. Image or illustration requirements
23. Readability and editorial checks
24. Update triggers and recommended review interval
25. Definition of done

### 11. Resources Hub specification

Define:

- page purpose
- headline and opening promise
- cluster organization
- featured paths for urgent, diagnostic, replacement, comparison, and ownership needs
- how existing pages appear in the hub
- quiz transition
- crawlable links and breadcrumb behavior
- empty-state rule for clusters not yet published
- mobile scanning and accessibility requirements

### 12. Internal-link matrix

Use these columns:

| Source URL | Destination URL | Anchor concept | Placement | Reader reason | Release dependency |
|---|---|---|---|---|---|

Include existing and proposed pages. Confirm that every first-wave page has an inbound path and no planned orphan.

### 13. Source and claim ledger

For every high-impact or volatile claim, record:

| Claim ID | Page ID | Claim | Scope | Source title | Source URL | Publisher | Publication or revision date | Checked date | Evidence type | Confidence | Limitations | Update trigger |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Prioritize:

1. Government, code, regulator, utility, ENERGY STAR, and Department of Energy sources
2. Manufacturer specifications, installation manuals, and warranty documents
3. Standards and original research
4. Reputable independent technical sources
5. Retail or installer sources only where they own the relevant fact or provide clearly scoped market evidence

Competitor pages and user-generated discussions may reveal questions. They do not establish technical facts.

### 14. Non-article resource roadmap

Evaluate calculators, decision trees, checklists, comparison tools, rebate finders, maintenance schedules, quote-review tools, and printable installer question sheets. Rank them by homeowner usefulness, business value, evidence requirements, and build effort.

### 15. Publishing-system requirements

Provide a concise implementation specification for the separate build session. Include content fields, validation rules, reusable modules, draft-to-publish states, link checks, source rendering, and update tracking.

### 16. Technical SEO and answer-engine checklist

Include crawlability, indexability, canonicals, sitemap, metadata, breadcrumbs, structured data, visible source information, AI crawler considerations, performance, mobile readability, and accessibility. Label platform-specific requirements and avoid guarantees.

### 17. Measurement plan

Define the baseline and review cadence for:

- indexed pages
- crawl and coverage errors
- impressions, clicks, queries, pages, and positions in Google Search Console
- Bing Webmaster Tools data
- quiz starts and completions by content page
- installer-match requests by content page and market
- internal-link engagement
- observed AI-search referrals or citations, without treating them as guaranteed or fully measurable
- content freshness and overdue source checks

### 18. Open questions and unresolved evidence

List anything the research could not verify, why it matters, and the safest way to verify it.

### 19. Build-session kickoff

End with a concise block that can be pasted into a separate ChatGPT build session. It must state:

- the repository and source of truth
- the additive scope
- the exact first-wave pages
- the governing content and safety rules
- the required publishing foundation
- the internal-link release dependencies
- the required QA sequence
- the rule that no commit, push, deployment, or existing-page rewrite is authorized unless the owner explicitly approves it in that build session

## Output quality gates

Before returning the implementation packet, verify all of the following:

- Every proposed page serves a distinct user need.
- No page is created solely for a keyword variation.
- Existing pages are protected from unnecessary overlap.
- The national and local layers are clearly separated.
- Dangerous DIY topics route to a licensed professional.
- No professional review is implied.
- Volatile claims have sources, checked dates, and update triggers.
- Every first-wave page has at least one planned inbound link.
- Internal links reflect the reader's next question.
- The quiz remains the default CTA and the answer is never gated.
- The hub and first-wave pages form a coherent release, not isolated posts.
- Schema recommendations are page-appropriate and current.
- Demand estimates are labeled honestly.
- Competitors were selected by cluster.
- The implementation packet can stand alone without this prompt or its original conversation.
