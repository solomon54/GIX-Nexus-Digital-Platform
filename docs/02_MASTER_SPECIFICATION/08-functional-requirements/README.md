# Chapter 08 — Functional Requirements

**Path:** `02_MASTER_SPECIFICATION/08-functional-requirements`  
**Status:** `READY` — no external blockers  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** Old Chapter 08 (direct 1:1 per CHAPTER-MIGRATION-MAP.md)

---

## Purpose

All confirmed functional requirements for Phase 1. Requirements are classified per
`CLASSIFICATION-LABELS.md` — only `[REQUIRED]` or `[PRODUCT DECISION — confirmed]`
items belong in this chapter's body. Unresolved items stay as `[OPEN QUESTION]`.

## Requirement areas for Phase 1

- Public website display: company overview, 6 services, HSEQ, target sectors,
  future objectives, static contact
- Locale switching: en-US ↔ am-ET, with western-digit formatting
- CMS content lifecycle: Draft → Technical Review → Stakeholder Approval → Published
- Accessibility requirements (see Ch.13 for detail)
- SEO requirements (see Ch.30 for detail)
- Bilingual parity gate (both locales required before any content is published)

## What does NOT belong here

- Architecture or implementation decisions (→ Ch.21+)
- Requirements that are explicitly out of scope (→ Ch.06 Non-Goals)
- Open questions disguised as requirements

## Format convention

Each requirement should state:
- ID: REQ-NNN
- Classification label
- Statement (what the system must do)
- Source (which baseline fact or stakeholder decision drives it)
- Blocking OQ, if any

## Do NOT

Do not write requirements for: auth, forms, CRM, vendor portal, AI search.
Do not treat an `[INFERENCE]` as a confirmed `[REQUIRED]` — only after approval.
