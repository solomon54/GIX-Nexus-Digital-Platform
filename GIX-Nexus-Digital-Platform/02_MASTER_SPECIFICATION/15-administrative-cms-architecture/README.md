# Chapter 15 — Administrative & CMS Architecture

**Path:** `02_MASTER_SPECIFICATION/15-administrative-cms-architecture`  
**Status:** `BLOCKED` — CMS architecture style (headless vs. traditional) is an unresolved Open Question  
**Readiness:** Structural scaffolding only — do NOT write full content; keep as DEFERRED-STUB until the CMS OQ is resolved  
**Migration source:** Old Ch.11 (Administrative/CMS Architecture), renumbered per CHAPTER-MIGRATION-MAP.md

---

## DEFERRED-STUB NOTICE

> This chapter cannot be finalized until the CMS platform decision is made.
> **Do not implement a CMS backend** — build the frontend against a mocked/local
> JSON content layer so work isn't wasted. See `AGENT.md` §4.
>
> Full historical draft content is preserved in `08_WORKING_DRAFTS/superseded/`
> (migrate old Ch.11 there during the content migration pass).

## Blocking Open Question

- `[OPEN QUESTION]` CMS architecture style: headless CMS vs. traditional CMS vs. custom.
  This decision affects the admin UI, content API, editorial workflow tooling, and hosting.
  Resolution required before this chapter can be written.

## What this chapter will cover (once unblocked)

- CMS platform selection rationale (once decided)
- Admin UI structure
- Editorial workflow implementation (Draft → Review → Approval → Published)
- Content API design (references Ch.23)
- Role/permission model for content editors (note: no auth in public site — this is
  internal CMS auth only, which is a separate decision from Phase 1 public auth)

## Build now (unblocked)

- Content model (→ Ch.09) — does not depend on CMS platform choice
- Mocked/local JSON content layer for frontend development

## Do NOT

Do not build a real CMS backend.
Do not choose or hard-code a CMS platform without an explicit stakeholder decision
recorded in `03_GOVERNANCE/decisions/`.
