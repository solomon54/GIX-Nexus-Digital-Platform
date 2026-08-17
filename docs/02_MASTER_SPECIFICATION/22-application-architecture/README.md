# Chapter 22 — Application Architecture

**Path:** `02_MASTER_SPECIFICATION/22-application-architecture`  
**Status:** `PARTIALLY READY` — app structure patterns unblocked; framework selection is an open question  
**Readiness:** Architecture patterns and constraints can be specified; framework choice must be flagged as open  
**Migration source:** Old Ch.30 (Application Architecture) + old Ch.33 (State Management) per CHAPTER-MIGRATION-MAP.md

---

## Purpose

The frontend application architecture: component model, routing, state management,
and the structural conventions for the bilingual Phase 1 platform.

## What belongs here

- Application structure (component hierarchy, page structure)
- Routing architecture (bilingual routes, locale prefixing)
- State management model (locale state, content state, UI state)
- Data-fetching patterns (from mocked JSON → future CMS API)
- Error boundaries and fallback patterns
- Build conventions (provenance comments, bilingual-parity gates)

## Application architecture constraints

- `[OPEN QUESTION]` Framework: not yet decided (React, Next.js, Vue, SvelteKit, etc.)
  All architectural decisions must be framework-agnostic patterns until resolved
- No authentication or session state — Phase 1 has no auth
- No client-side form submission handling
- Content sourced from mocked/local JSON (→ future: CMS API from Ch.23)

## State management section (from old Ch.33)

- Locale/language state (en-US / am-ET switch)
- Theme state (light/dark/system)
- Content state (loaded from JSON/CMS)
- No user/session state (no auth)

## Supporting artifacts

Application diagrams → `05_ARCHITECTURE/application/`

## Do NOT

Do not hard-code a frontend framework until the tech-stack decision is made.
Do not add auth, session, or user-management state.
Flag framework-specific patterns: `// OPEN QUESTION: framework TBD`.
