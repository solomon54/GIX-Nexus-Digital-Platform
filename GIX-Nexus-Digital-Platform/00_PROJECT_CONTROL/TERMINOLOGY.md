# Terminology Dictionary — GIX Nexus Digital Platform

**Source:** Consolidated from the original Master Specification Ch.42 (Appendices &
Terminology Dictionary), per CHAPTER-MIGRATION-MAP.md, which relocated this content
from chapter 42 to project-control level so it is referenced by every chapter rather
than buried as a late appendix.

**Authority:** `AUTHORITY-HIERARCHY.md` — this file reflects SOURCE-DERIVED FACTS and
project governance conventions. Any term whose definition requires a stakeholder
decision is marked `[OPEN QUESTION: OQ-NNN]` until resolved.

---

## How to use this file

- **Before writing any spec chapter**, check this file for the canonical spelling,
  meaning, and classification of every key term.
- **When a new term appears** in a working draft, add it here before the draft is
  promoted to `02_MASTER_SPECIFICATION/`.
- **Do not** redefine a term in a chapter — reference this file.

---

## A

### "7+ Service Domains"
`[SOURCE-DERIVED FACT]`
A verbatim company claim/headline from the GIX Nexus Company Profile. This is a
**quoted self-statement** by the company, not a structural count. It never becomes
a 7th service grouping, nav item, page, or database row. Render only as an attributed
marketing headline.
> Source: Company Profile PDF — exact page TBD at source-extraction.

### Across Ethiopia
`[SOURCE-DERIVED FACT]`
The documented operational territory of GIX Nexus Telecom and Power. Always use
this phrasing — not "Ethiopia-wide," not "nationwide," not "East Africa."
East Africa expansion is a Future Objective only.

---

## B

### Bilingual Parity
`[REQUIRED]`
The project-wide rule that every user-facing string must exist in both `en-US`
and `am-ET` before merge. Not a nice-to-have; a merge gate. See Ch.10
(Localization & Internationalization).

### Blocked Chapter
`[REQUIRED]` (governance term)
A spec chapter whose content cannot be finalized because one or more Open Questions
are unresolved. A blocked chapter exists as a DEFERRED-STUB in
`02_MASTER_SPECIFICATION/` until the blocking OQ is resolved via `03_GOVERNANCE/`.

---

## C

### Classification Label
`[REQUIRED]`
One of the 10 labels defined in `CLASSIFICATION-LABELS.md` that must appear on
every non-trivial statement in project documentation. See that file for the full table.

### Content Lifecycle
`[PRODUCT DECISION — pending]`  `[OPEN QUESTION]`
The governed workflow: Draft → Technical Review → Stakeholder Approval → Published.
The exact tooling (CMS platform, review interface) is unresolved. The workflow
stages themselves are confirmed for Phase 1.

### Current Capability
`[REQUIRED]` (governance term)
Anything GIX Nexus Telecom and Power demonstrably does today, as evidenced by the
Source Baseline. Must never appear in the same list, card, section, or page as a
Future Objective.

---

## D

### DEFERRED-STUB
`[REQUIRED]` (governance term)
A chapter that exists as a placeholder with a deferral notice only. Full content
is preserved in `08_WORKING_DRAFTS/superseded/`. A stub must not be implemented
as if it were live specification.

### DEC-NNN
`[REQUIRED]` (governance term)
A numbered Decision Record file in `03_GOVERNANCE/decisions/`. Every resolved Open
Question must produce a DEC-NNN file. IDs are never reused or renumbered.

---

## E

### Ethiopian Calendar
`[REQUIRED]`
The Ethiopic calendar system (13 months). The platform must be able to display
dates in this calendar alongside the Gregorian calendar. See Ch.10. Western digits
(0–9) only — no Ge'ez numerals even in Ethiopian calendar display.

---

## F

### Future Objective
`[SOURCE-DERIVED FACT]` / `[PROPOSED/FUTURE]`
One of the 8 documented future objectives from the GIX Nexus Company Profile
(East Africa expansion, ISO certifications, tech investment, digital transformation, etc.).
Must always render with an explicit "Objective / Planned" label, structurally
separated from Current Capabilities. Never co-located in a list or grid with
active services.

---

## G

### GIX Nexus Telecom and Power
`[SOURCE-DERIVED FACT]`
The full, exact legal-style name of the company. Use this in formal contexts.
"GIX Nexus" is acceptable as a short form in running prose. Never invent variants.

### Ge'ez Numerals
`[REQUIRED]` (prohibition)
Traditional Ethiopic numeric characters. **Prohibited** throughout this platform
in both locales. Western digits (0–9) only, always.

---

## H

### HSEQ
`[SOURCE-DERIVED FACT]`
Health, Safety, Environment & Quality. The company's stated policy framework
including the "Zero Accident Objective" and "100% Safety-first approach."
Both are goals/commitments, never historical achievements or performance metrics.
Do not render either with checkmarks, success badges, or "100% achieved" framing.

---

## I

### Inference
`[REQUIRED]` (classification label)
A statement derived from source material that is not explicitly stated in the source.
Never presented as a SOURCE-DERIVED FACT. Requires verification before promotion.

---

## L

### Locale
`[REQUIRED]`
Either `en-US` (English) or `am-ET` (Amharic). These are the only two supported
locales for Phase 1. No other locale may be added without a STAKEHOLDER DECISION.

---

## M

### Managing Director
`[SOURCE-DERIVED FACT]`
**Getachew Teshome.** Phone: `+251 911509555`. Email: `gixnexustelecom@gmail.com`.
Office: Addis Ababa, Ethiopia.
> Source: Company Profile PDF — exact page TBD at source-extraction.

---

## O

### Open Question (OQ-NNN)
`[REQUIRED]` (governance term)
A genuinely unresolved issue tracked as an individual file in
`03_GOVERNANCE/open-questions/`. There are 166 logged open questions from the
original 43-chapter draft. IDs are never reused. Use `[AM TRANSLATION PENDING]`
or `// OPEN QUESTION: OQ-NNN` markers in code/content until resolved.

---

## P

### Phase 1
`[PRODUCT DECISION — confirmed]`
The current project phase. Scope: informational website + lightweight CMS with
governed content review. Explicitly excludes: authentication, CRM/ERP, client
portal, transactional workflows, AI search. See `PROJECT-SCOPE.md`.

### Provenance Tag
`[REQUIRED]`
A code or doc comment citing the source page for any hard-coded fact.
Example: `// Source: Company Profile PDF, Page 9`.
Required on every hard-coded source fact. Non-negotiable.

### Prospective Sector
`[REQUIRED]` (display convention)
One of the 14 target client categories from the Company Profile. These are sectors
GIX Nexus intends to serve — not confirmed existing clients. Always labeled
"Sectors We Serve" or "Target Industries." Never shown as client logos, references,
or testimonials.

---

## S

### Service Grouping
`[SOURCE-DERIVED FACT]`
One of exactly **6** (never 5, never 7) service taxonomy entries:
1. Telecommunications Infrastructure
2. Fiber Optic Solutions
3. Satellite & Wireless Communications
4. Network Infrastructure
5. Telecom Power Systems
6. Maintenance & Technical Support

This taxonomy is locked. It is never restructured for "cleaner UX."

### Source Baseline
`[REQUIRED]` (governance term)
The single versioned document in `01_SOURCE_BASELINE/frozen/` that every spec
chapter traces back to. Currently: Source-Baseline-v1.0.md. The highest authority
for company facts after the original authoritative source documents.

### Stakeholder-Approved Decision
`[REQUIRED]` (classification label)
A decision explicitly supplied or approved by the project owner. A statement does
not become a STAKEHOLDER DECISION through confident phrasing — only through a
recorded approval event in `03_GOVERNANCE/decisions/`.

---

## T

### Target Industries / Sectors We Serve
`[SOURCE-DERIVED FACT]`
The display label for the 14 prospective client categories. This is the **only**
acceptable framing — never "Our Clients," "Clients," "Partners," or "Case Studies."

### TERMINOLOGY.md (this file)
Relocated from old Ch.42 (Appendices & Terminology Dictionary) per
`CHAPTER-MIGRATION-MAP.md`. Lives at project-control level so it is reachable
by every chapter and every agent session.

---

## V

### "Vendor Registration Ready"
`[SOURCE-DERIVED FACT]`
A verbatim status claim from the Company Profile. Rendered as text only.
No vendor-registration database, portal, or workflow is implied or built.

---

## W

### Western Digits
`[REQUIRED]`
The numerals 0–9 as used in the Latin script. Required in both `en-US` and `am-ET`
throughout the platform. Ge'ez (Ethiopic) numerals are explicitly prohibited.

### Working Draft
`[REQUIRED]` (governance term)
Any document in `08_WORKING_DRAFTS/`. Nothing here is authoritative regardless of
how complete it appears. All content must be promoted via human review before
entering `02_MASTER_SPECIFICATION/`.

---

## Z

### Zero Accident Objective
`[SOURCE-DERIVED FACT]`
A verbatim company safety commitment from the HSEQ policy. It is a **goal**, not
a historical result. Never paired with checkmarks, "100% achieved," or any success
badge. Render as an attributed company statement under HSEQ.
> Source: Company Profile PDF — exact page TBD at source-extraction.

---

*Last updated: Scaffolding pass — 2026-08-17. Pending: page citations to be filled in
once `01_SOURCE_BASELINE/frozen/Source-Baseline-v1.0.md` is populated.*
