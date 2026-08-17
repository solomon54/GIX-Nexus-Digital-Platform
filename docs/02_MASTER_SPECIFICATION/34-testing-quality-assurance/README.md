# Chapter 34 — Testing & Quality Assurance

**Path:** `02_MASTER_SPECIFICATION/34-testing-quality-assurance`  
**Status:** `READY` — testing strategy is unblocked  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** Old Ch.39 (Acceptance / Quality Criteria), renumbered per CHAPTER-MIGRATION-MAP.md

---

## Purpose

The testing strategy, quality criteria, and acceptance gates for Phase 1 — with
a particular emphasis on source fidelity verification (facts must match the baseline)
and bilingual parity testing.

## What belongs here

- Acceptance criteria for Phase 1
- Source fidelity test: automated checks that hard-coded facts match the Source Baseline
- Bilingual parity test: both locales present before any content ships
- Accessibility testing requirements (coordinates with Ch.13 and `07_VERIFICATION/accessibility/`)
- Performance testing targets (coordinates with Ch.29)
- Visual regression testing
- Cross-browser and cross-device testing requirements
- Unit, integration, and end-to-end testing strategy
- Content review checklist (part of the governance workflow)

## Unique QA concern: source fidelity

This project has a hard requirement that published content matches source facts.
Testing should include:
- Phone number display matches Source Baseline
- Email display matches Source Baseline
- Service grouping count equals exactly 6
- No Future Objective rendered as current capability
- No client names, logos, or testimonials present
- "7+ Service Domains" never rendered as a structural count

## Supporting artifacts

Test evidence → `07_VERIFICATION/requirements/` and `07_VERIFICATION/release-acceptance/`

## Do NOT

Do not treat automated accessibility scans as a substitute for manual testing.
