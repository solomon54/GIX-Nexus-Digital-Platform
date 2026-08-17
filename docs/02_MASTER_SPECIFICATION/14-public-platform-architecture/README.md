# Chapter 14 — Public Platform Architecture

**Path:** `02_MASTER_SPECIFICATION/14-public-platform-architecture`  
**Status:** `READY` — no external blockers for the public-facing architecture model  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** Old Ch.10 (Public Website Architecture) + part of old Ch.14 (per CHAPTER-MIGRATION-MAP.md); layered-responsibility model → Ch.21

---

## Purpose

The architecture of the public-facing website: page rendering model, routing,
content delivery, bilingual page structure, and the public/admin boundary.

## What belongs here

- Rendering strategy (static generation vs. server-side — `[OPEN QUESTION]` pending CMS/hosting decision)
- Public route structure and URL model
- Content delivery: how published content reaches the public site
- Public/admin boundary: what is visible to anonymous visitors vs. internal only
- Static fallbacks and graceful degradation
- Bilingual page structure and locale routing

## Open questions touching this chapter

- `[OPEN QUESTION]` Rendering strategy: SSG vs. SSR vs. hybrid — blocked on CMS choice and hosting decision
- `[OPEN QUESTION]` CDN: selection blocked on hosting decision
- `[OPEN QUESTION]` Domain/URL structure: blocked on hosting decision

Mark all unresolved choices with `// OPEN QUESTION: OQ-NNN`.

## What does NOT belong here

- Admin/CMS UI architecture (→ Ch.15 — blocked)
- Layered system responsibility model (→ Ch.21)
- Application-level architecture (→ Ch.22)

## Do NOT

Do not hard-code a cloud vendor SDK or CDN provider.
Keep the architecture deployment-agnostic until hosting is decided.
