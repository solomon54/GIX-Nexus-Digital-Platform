# Chapter 23 — API Architecture

**Path:** `02_MASTER_SPECIFICATION/23-api-architecture`  
**Status:** `BLOCKED` — REST vs. GraphQL decision is an unresolved Open Question  
**Readiness:** API principles and content contract can be drafted; specific API style is blocked  
**Migration source:** Old Ch.31 (API Architecture), renumbered per CHAPTER-MIGRATION-MAP.md

---

## BLOCKED NOTICE (partial)

> The API style decision (REST vs. GraphQL) is an Open Question blocked on the
> CMS platform decision (Ch.15). The content API contract principles can be
> specified independently — what data the API must serve is unblocked, but
> the transport style is blocked.

## What belongs here

- Content API surface: what data the public site needs from the CMS/content layer
- API contract: endpoint structure (described API-style-agnostically where possible)
- Bilingual content delivery: how en-US and am-ET content are served
- Versioning strategy
- Rate limiting and caching headers

## Blocking Open Question

- `[OPEN QUESTION]` API style: REST vs. GraphQL — blocked on CMS choice (Ch.15)

## What can be drafted now (unblocked)

- The data contract: what fields/types must be available per content type
- Bilingual payload structure
- Error response patterns
- Cache strategy (conceptual)

## Supporting artifacts

API specification → `05_ARCHITECTURE/api/`

## Do NOT

Do not pick REST or GraphQL as if decided.
Do not build a real API backend — frontend builds against mocked JSON (Ch.22).
