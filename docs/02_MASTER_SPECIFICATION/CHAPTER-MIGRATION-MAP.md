# Chapter Migration Map — Old Draft (43 chapters) → New Structure (00–40 + folders)

**Purpose:** This is the traceability document for migrating the existing, already-written
43-chapter draft into this project structure. It guarantees that when the actual content
migration happens (a separate, deliberate pass — not done in this scaffolding step), every
sentence has a defined destination and nothing gets silently dropped.

**Rule for the migration pass:** when moving a chapter's content, check it off in the table
below. If a chapter's content doesn't cleanly fit one destination, split it and note both
destinations — do not paraphrase-and-compress to make it fit one folder. Preserve wording.

## Direct 1:1 chapters (old chapter N → new chapter N, no content change needed)

| Old Ch. | New Ch. | Status |
|---|---|---|
| 00 Document Control | 00 document-control | Direct — migrate as-is |
| 01 Product/Executive Definition | 01 product-executive-definition | Direct — migrate as-is |
| 02 Business & Organizational Understanding | 02 business-organizational-understanding | Direct — migrate as-is |
| 03 Product Vision & Strategic Objectives | 03 product-vision-strategic-objectives | Direct — migrate as-is |
| 04 Business Domain Classification | 04 business-domain-classification | Direct — migrate as-is |
| 05 Stakeholders, Users & Actors | 05 stakeholders-users-actors | Direct — migrate as-is |
| 06 Product Scope & Boundaries | 06 product-scope-boundaries | Direct — migrate as-is |
| 07 Information Architecture | 07 information-architecture | Direct — migrate as-is |
| 08 Functional Requirements | 08 functional-requirements | Direct — migrate as-is |
| 09 Content Architecture & Governance | 09 content-architecture-governance | Direct — migrate as-is |
| 13 Accessibility Boundary (from Ch.19 in old draft) | see note below | See "Split chapters" |

## Renumbered / regrouped chapters (content preserved, chapter number shifts)

| Old Ch. (title) | New Ch. | Notes |
|---|---|---|
| 10 Public Website Architecture | 14 public-platform-architecture | Same content, renumbered to make room for a dedicated Localization chapter at 10 |
| 11 Administrative/CMS Architecture | 15 administrative-cms-architecture | Renumbered. Still BLOCKED on CMS-style OQ. |
| 12 Commercial Workflows | 16 commercial-workflow-architecture | Renumbered. Convert to STUB per readiness note — do not carry full RFQ/Fault/Vendor lifecycle detail into the active spec until those OQs resolve. Preserve the full old-chapter content in `08_WORKING_DRAFTS/superseded/` so it isn't lost, just not "live." |
| 13 Trust, HSEQ & Compliance Model | merge into 02 + 25 | HSEQ business content → Ch.02 (business understanding); security/integrity-of-claims content → Ch.25 (security architecture, content-integrity angle). Split, not deleted. |
| 14 Public Platform Architecture | merge into 14 + 21 | Public/admin boundary and conceptual platform areas → Ch.14; layered responsibility model → Ch.21 (system architecture). |
| 15 Data Architecture | 18 data-architecture | Renumbered, content direct. |
| 16 Design Philosophy & Visual Direction | 11 design-system | Renumbered, content direct. |
| 17 Visual Identity System | 11 design-system (append) | Merges into Ch.11 as a section, since old draft split philosophy (16) and identity (17) into two chapters — new structure keeps design as one chapter with sub-sections, detailed tokens deferred to 06_DESIGN/ once approved. |
| 18 Spacing, Grid & Layout System | 11 design-system (append) | Same merge logic as above. |
| 19 Components & UI System | 12 ux-interaction-principles | Renumbered/retitled. |
| 20 Iconography & SVG Language | 11 design-system (append) | Merged as a section of the design chapter. |
| 21 Photography & Media Direction | 26 file-media-management | Renumbered. |
| 22 Motion & Interaction System | 12 ux-interaction-principles (append) | Merged with old Ch.19 content. |
| 23 Light/Dark/System Theme System | 11 design-system (append) | Merged as a section. |
| 24 Responsive Design & Adaptive Layout | 12 ux-interaction-principles (append) | Merged. |
| 25 Accessibility System | 13 accessibility | Renumbered, content direct. |
| 26 SEO & Discoverability System | 30 seo-discoverability | Renumbered, content direct. |
| 27 Performance Architecture | 29 performance-architecture | Renumbered, content direct. |
| 28 Security Architecture | 25 security-architecture | Renumbered. TRIM per the earlier bloat review — keep content-integrity/provenance-protection framing, compress generic enterprise-security boilerplate (vendor-agnostic sections can stay short). |
| 29 Technical Stack & Infrastructure | 31 infrastructure-deployment | Renumbered. Convert numbered vendor-evaluation criteria to explicit CRITERIA-only framing (already labeled Open Question in original — preserve that framing, don't let it read as a chosen stack). |
| 30 Application Architecture | 22 application-architecture | Renumbered, content direct. |
| 31 API Architecture | 23 api-architecture | Renumbered. Still BLOCKED on REST vs GraphQL OQ. |
| 32 Integration Architecture | split: 27 + 16 | Notification/MTA content → Ch.27 (stub, deferred); commercial-integration content → Ch.16 (stub, deferred). |
| 33 Application Logic & State Management | 22 application-architecture (append) | Merged as a section of Ch.22. |
| 34 Observability, Logging & Audit | 28 observability-reliability | Renumbered, content direct. |
| 35 Backup, Recovery & Reliability | 32 backup-recovery-continuity | Renumbered, content direct. |
| 36 Future Platform Expansion | 38 future-expansion | Renumbered, content direct. |
| 37 Explicit Non-Goals | 06 product-scope-boundaries (append) | Merged into Ch.06 as the "explicitly out of scope" section — this is where a builder actually looks for it. |
| 38 Development Phases | 37 implementation-roadmap | Renumbered, content direct. |
| 39 Acceptance / Quality Criteria | 34 testing-quality-assurance | Renumbered, content direct. |
| 40 Open Questions & Decisions Log | split: 39 + 40 (narrative) + 03_GOVERNANCE (live records) | Narrative/model explanation stays as Ch.39 (decisions) and Ch.40 (open questions). The actual 166 OQ entries and 10 decisions get individually filed as OQ-NNN.md / DEC-NNN.md in `03_GOVERNANCE/`, not left as one long table — that's what makes them trackable instead of just documented. |

## Chapters that no longer exist as standalone chapters (content absorbed, not deleted)

| Old Ch. (title) | Destination | Notes |
|---|---|---|
| 41 Documentation Governance & Maintenance | `00_PROJECT_CONTROL/DOCUMENTATION-PRINCIPLES.md`, `CHANGE-CONTROL.md`, and Ch.09 | This chapter WAS project-control material wearing a chapter number. Fully preserved, just relocated to where a contributor would actually look for it. |
| 42 Appendices & Terminology Dictionary | `00_PROJECT_CONTROL/CLASSIFICATION-LABELS.md` + a new `00_PROJECT_CONTROL/TERMINOLOGY.md` (to be created during migration) | Terminology belongs at project-control level, referenced by every chapter, not buried as chapter 42. |
| 43 Implementation Readiness & Technical Handoff | Ch.37 implementation-roadmap + `10_IMPLEMENTATION_HANDOFF/` folder structure | Readiness classification model → Ch.37 narrative. The actual handoff package mechanics → the 10_IMPLEMENTATION_HANDOFF folder itself (populated only when Ch.37 says it's time). |

## New chapters that didn't exist in the old draft

| New Ch. | Why it's new |
|---|---|
| 10 localization-internationalization | Previously scattered across many chapters as a repeated cross-cutting concern (Ch.00 §2.9 note, Ch.06, Ch.08, Ch.09, Ch.16-25 all had their own localization subsections). Consolidating it into one chapter reduces the ~15x repetition found in the old draft while still letting each other chapter reference it. |
| 33 privacy-compliance-governance | Was scattered inside old Ch.12 (Commercial Workflows §13) and Ch.28 (Security §25). Split out because it needs its own home even while mostly Open Questions right now. |
| 35 development-standards | Did not exist explicitly in the old draft — this is new, and pairs directly with `CLAUDE.md`/`AGENT.md`. It's where project-specific build conventions (provenance comments, bilingual-parity-before-merge gate, etc.) live inside the governed spec, not just in the agent-rules file. |

## Chapters intentionally kept as stubs for now (not full content, by design)

Per the earlier review: writing full architecture for features that are still Open
Questions risks the spec looking more "decided" than it is, and tempts an implementing
agent to just build the most detailed thing in front of it. These chapters get a short
deferral note only, with full historical content preserved untouched in
`08_WORKING_DRAFTS/superseded/` so it's not lost — just not treated as live spec:

- Ch.16 commercial-workflow-architecture
- Ch.17 operational-workflow-architecture
- Ch.19 search-retrieval-architecture
- Ch.20 ai-semantic-retrieval-roadmap
- Ch.24 authentication-authorization
- Ch.27 notification-architecture

## Migration checklist (use this when actually doing the content move)

- [ ] Copy old Ch.00–09 into new 00–09 verbatim.
- [ ] Split old Ch.13 (Trust/HSEQ) into Ch.02 + Ch.25 sections.
- [ ] Merge old Ch.16–20, 22–24 into new Ch.11 (design-system) and Ch.12 (ux-interaction) as sub-sections — verify every sub-topic (logo, color, typography, iconography, theming, motion, responsive) has a heading in the merged chapter.
- [ ] Move old Ch.10, 14 into new Ch.14, splitting the layered-responsibility content into Ch.21.
- [ ] Renumber old Ch.15, 21, 25, 26, 27, 28→25, 29→31, 30→22, 31→23, 34→28, 35→32, 36→38, 38→37, 39→34 per table above.
- [ ] Extract old Ch.12 + Ch.32 commercial/notification content into stub form for new Ch.16/27, archive full version in superseded/.
- [ ] Extract old Ch.37 (Non-Goals) into Ch.06 as an explicit subsection.
- [ ] Break old Ch.40's 166 OQs and 10 decisions into individual files in `03_GOVERNANCE/open-questions/` and `03_GOVERNANCE/decisions/`.
- [ ] Extract old Ch.41 into project-control files; old Ch.42 into terminology; old Ch.43 into Ch.37 + the handoff folder.
- [ ] Build new Ch.10 (localization) by consolidating the repeated localization sub-sections found across nearly every old chapter — cite which old chapter each piece came from in a source comment.
- [ ] Build new Ch.35 (development-standards) fresh, informed by CLAUDE.md/AGENT.md.
- [ ] After migration, diff word counts old-total vs new-total; any large unexplained drop is a signal something was lost, not compressed.
