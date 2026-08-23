# Chapter 39 — Decision Register & ADRs

**Path:** `02_MASTER_SPECIFICATION/39-decision-register-adrs`  
**Status:** `READY` — narrative summary model is unblocked  
**Readiness:** Narrative structure can be drafted; actual decisions live in `03_GOVERNANCE/`  
**Migration source:** Old Ch.40 (split: this chapter handles the narrative/model; live records → `03_GOVERNANCE/`)

---

## Purpose

The **narrative summary** of how decisions are made and recorded for this project.
The actual decision records (DEC-NNN.md, ADR-NNN.md) live in `03_GOVERNANCE/decisions/`
and `03_GOVERNANCE/adrs/` — not here. This chapter is the explanation and index.

## What belongs here

- How decisions are classified and recorded (reference to `CLASSIFICATION-LABELS.md`)
- Decision record format explanation (reference to `TEMPLATE-DEC.md`)
- ADR format explanation (reference to `TEMPLATE-ADR.md`)
- Summary index of all recorded decisions (not the full records — those are in `03_GOVERNANCE/`)
- How this chapter relates to `03_GOVERNANCE/` (governance folder wins in case of conflict)

## The authoritative records are in `03_GOVERNANCE/`

`03_GOVERNANCE/decisions/` and `03_GOVERNANCE/adrs/` are authoritative.
If this chapter's summary conflicts with a DEC-NNN or ADR-NNN file, the governance
record wins and this chapter is stale — flag it, don't silently update just the prose.

## Current decision count

- Decisions recorded: 10 (from original 43-chapter draft — to be filed individually
  as DEC-001 through DEC-010 in `03_GOVERNANCE/decisions/` during migration)
- ADRs: 0 (to be created as architectural decisions are confirmed)

## Do NOT

Do not put full decision content in this chapter — only summary and index.
Do not treat this chapter as authoritative over the governance records.
