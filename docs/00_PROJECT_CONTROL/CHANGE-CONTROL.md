# Change Control

## Versioning
The Master Specification is versioned as a whole (currently v0, Working Draft).
Version increments are reserved for meaningful, controlled revisions — not for
routine reconciliation, wording correction, or reclassification of a label.

## Change classification
- **Source Correction** — aligning with an updated Company Profile / fixing an
  extraction error. Requires updating `01_SOURCE_BASELINE/frozen/` first.
- **Governance Decision** — recording a stakeholder choice, moving an Open Question
  to a Decision. Requires a new file in `03_GOVERNANCE/decisions/`.
- **Architectural/Design Update** — refining an Inference or Proposed concept into
  something more concrete. Does not require a version bump unless it changes an
  approved requirement.
- **Editorial Clarification** — grammar, cross-references. No governance event needed.

## Process for any change to 02_MASTER_SPECIFICATION
1. Draft the change in `08_WORKING_DRAFTS/ai-generated/` or `human-review/`.
2. If it resolves an Open Question or requires a decision, create the corresponding
   record in `03_GOVERNANCE/`.
3. Human review and approval.
4. Only then is the change applied to `02_MASTER_SPECIFICATION/`.
5. Log the change in `03_GOVERNANCE/change-log/`.

## Non-negotiable
Open Question IDs (OQ-NNN) and Decision IDs (DEC-NNN / ADR-NNN) are never reused or
renumbered, even if the question becomes irrelevant. Mark as `Withdrawn`, don't delete.
