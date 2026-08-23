# Chapter 33 — Privacy, Compliance & Governance

**Path:** `02_MASTER_SPECIFICATION/33-privacy-compliance-governance`  
**Status:** `PARTIALLY READY` — privacy requirements for a static site are mostly `[OPEN QUESTION]`  
**Readiness:** Basic privacy posture can be stated; most decisions are open  
**Migration source:** NEW chapter — consolidated from scattered content in old Ch.12 §13 and old Ch.28 §25 per CHAPTER-MIGRATION-MAP.md

---

## Purpose

Privacy requirements, regulatory compliance considerations, and the governance
framework for handling any personal data the platform may touch.

## What belongs here

- Privacy posture for Phase 1: a static informational site collects minimal
  personal data by design (no forms, no accounts, no analytics currently approved)
- Cookie policy requirements (if any third-party scripts are ever added)
- Legal and regulatory considerations for an Ethiopian company with a public website
- Data handling for the CMS admin (internal GIX Nexus staff)
- Contact information display rules (no user-submitted data stored in Phase 1)

## Current Phase 1 privacy status

Phase 1 collects essentially no personal data:
- No contact forms (blocked — `[OPEN QUESTION]`)
- No analytics scripts (not approved)
- No user accounts
- No cookies beyond session/preference (locale, theme) if applicable

This is the privacy-minimal baseline. Any future addition of data-collecting
features must revisit this chapter.

## Open questions

- `[OPEN QUESTION]` Contact form: if ever approved, PII handling must be specified
- `[OPEN QUESTION]` Analytics: if ever approved, cookie consent and data policy needed
- `[OPEN QUESTION]` Applicable Ethiopian data protection regulation requirements

## Do NOT

Do not add analytics, tracking scripts, or data-collecting forms without:
1. Explicit stakeholder approval
2. Revisiting this chapter
3. Adding appropriate consent mechanisms
