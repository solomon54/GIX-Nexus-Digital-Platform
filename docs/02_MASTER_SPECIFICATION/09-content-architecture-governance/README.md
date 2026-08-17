# Chapter 09 — Content Architecture & Governance

**Path:** `02_MASTER_SPECIFICATION/09-content-architecture-governance`  
**Status:** `READY` — no external blockers  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** Old Chapter 09 (direct 1:1 per CHAPTER-MIGRATION-MAP.md)

---

## Purpose

How content is structured, typed, governed, and maintained. The content model
and the workflow that ensures source fidelity is preserved across the content
lifecycle.

## What belongs here

- Content model: types, fields, relationships
- Content lifecycle stages: Draft → Technical Review → Stakeholder Approval → Published
- Bilingual parity rule (both locales required before publish)
- Source fidelity gate: quoted statements remain verbatim, attributed
- Content ownership and approval authority
- Archiving and version history of published content

## Critical governance rules for content

- Quoted company statements (Vision, Mission, HSEQ policy, "7+ Service Domains")
  must render as attributed quotes — never rewritten by an editor or agent
- Future Objectives content must be structurally gated from current-capability content
  at the content model level, not just at display level
- No content type for "clients," "testimonials," "case studies," or "certifications"
  (none exist in Phase 1)
- `[AM TRANSLATION PENDING]` markers must be visible in staging, never in production

## What does NOT belong here

- CMS platform selection (blocked — `[OPEN QUESTION]`) → Ch.15
- UI for the CMS admin interface → Ch.15

## Do NOT

Do not design content types that would allow mixing Future Objectives with current
services in a single query or list view.
