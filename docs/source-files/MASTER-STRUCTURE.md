# Master Project Structure — Full Definition

This file is the canonical description of every top-level folder: what it's for,
whether to populate it now, and what NOT to put in it. Read this before creating
any new file or folder in the project.

---

## 00_PROJECT_CONTROL/
Project-level rules and orientation. Populate now. Contents: this file, PROJECT-README,
PROJECT-OBJECTIVE, PROJECT-SCOPE, DOCUMENTATION-PRINCIPLES, AUTHORITY-HIERARCHY,
CLASSIFICATION-LABELS, CHANGE-CONTROL, AGENT.md.

## 01_SOURCE_BASELINE/
The single source of company facts. Populate now.
- `authoritative/` — the original Company Profile PDF and any other primary source
  documents, unmodified.
- `frozen/` — the extracted, versioned Source Baseline (currently v1.0), the document
  every other chapter must trace back to.
- `source-extraction/` — facts broken out by topic (identity, services, personnel,
  HSEQ, future objectives, contact info) for easier cross-referencing.
- `provenance/` — a page-map and register tracing every fact to its source page.
Do NOT edit `authoritative/` files. Do NOT let `frozen/` drift from what
`authoritative/` actually says — any change requires a new version, not an edit.

## 02_MASTER_SPECIFICATION/
The governed 00–40 chapter specification. This is the project's actual deliverable
document. Populate progressively, chapter by chapter, as each reaches DRAFT →
SELF-CHECK → REVIEW → CORRECTION → STAKEHOLDER APPROVAL → FREEZE.
Do NOT create a chapter 41 or beyond. If new material doesn't fit 00–40, it belongs
in a support folder (03–07) instead. See CHAPTER-MIGRATION-MAP.md for exactly where
previously-drafted material (old chapters 41–43) is redistributed.
Do NOT write directly into this folder if you are an AI agent — see CLAUDE.md.

## 03_GOVERNANCE/
Living governance records — the actual decisions, not prose about decisions.
Populate as real decisions get made (not preemptively).
- `decisions/` — DEC-NNN.md files, one decision each.
- `adrs/` — architecture decision records, ADR-NNN.md.
- `open-questions/` — OQ-NNN.md files, one open question each, with status tracking.
- `verification/` — evidence logs (see also 07_VERIFICATION for larger evidence sets).
- `change-log/` — dated record of what changed in the spec and why.
- `review-records/` — sign-off records from technical/stakeholder review stages.
This folder is authoritative for decisions — Chapter 39/40 of the spec is a narrative
SUMMARY of what's in here, never the other way around.

## 04_PRODUCT/
Working backlog and roadmap ideas only. NOT authoritative — this is scratch space.
The moment something here is decided, it must move into the spec via proper governance
(03_GOVERNANCE + the relevant chapter). Do not cite this folder as a source of truth.
Populate only if you find it genuinely useful for day-to-day planning; otherwise skip.

## 05_ARCHITECTURE/
Supporting architecture artifacts — diagrams, data models, API principles — that are
too detailed or too visual to live as prose inside a spec chapter.
Populate only once the corresponding spec chapter has reached at least DRAFT stage.
Do NOT create artifacts here just because the folder exists — see the note in the
chapter's README for what's actually ready to be modeled.

## 06_DESIGN/
Design-system tokens, UX principles, accessibility patterns, localization assets,
and approved (not draft) brand assets.
Populate only once Chapter 11 (Design System) has real, stakeholder-approved inputs
(e.g., an actual logo file, approved color palette). Placeholder/draft assets belong
in 08_WORKING_DRAFTS, not here.

## 07_VERIFICATION/
Evidence that something was actually checked, separate from the spec's claim that
it should work. Populate as verification activities actually happen — audits,
accessibility scans, security reviews, performance tests, source-fidelity checks.

## 08_WORKING_DRAFTS/
Where ALL new content starts — human or AI-generated. Populate continuously.
- `ai-generated/` — first draft, unreviewed.
- `human-review/` — reviewer notes/markup on a draft.
- `revisions/` — subsequent revised drafts.
- `superseded/` — drafts that were replaced; kept for audit trail, not deleted.
Nothing here is authoritative until it's promoted (by a human) into
02_MASTER_SPECIFICATION or 03_GOVERNANCE.

## 09_RELEASED_DOCUMENTS/
Final, versioned, accepted documents only — e.g. "Specification v1.0.pdf". Populate
only at an actual release milestone. Never put drafts here.

## 10_IMPLEMENTATION_HANDOFF/
A packaged bundle for a build team, assembled only once the spec and decisions have
matured enough to hand off. This is a project ARTIFACT, not a new spec chapter.
Do not populate until Phase 1 spec chapters and critical open questions
(CMS choice, hosting, sign-off authority) are resolved.
