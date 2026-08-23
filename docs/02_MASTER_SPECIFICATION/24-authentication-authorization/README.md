# Chapter 24 — Authentication & Authorization

**Path:** `02_MASTER_SPECIFICATION/24-authentication-authorization`  
**Status:** `DEFERRED-STUB` — no authentication is required or authorized for Phase 1  
**Readiness:** Stub only — do NOT write full content or begin implementation

---

## DEFERRED-STUB NOTICE

> **No authentication of any kind is in scope for Phase 1.**
>
> The public website is fully anonymous. There is no login, no client accounts,
> no session management, and no identity provider.
>
> The CMS admin area may require internal auth in a future phase — but that decision
> is blocked on the CMS platform choice (Ch.15) and has no approved identity provider.
>
> This chapter exists only as a structural placeholder.
> Activation requires explicit `[STAKEHOLDER DECISION]` in `03_GOVERNANCE/decisions/`.

## What this chapter will cover (when activated)

- CMS admin authentication (internal staff only — not public-facing)
- Identity provider selection
- Role-based access for content editors vs. approvers

## Current state

- Public site: fully anonymous — no auth
- CMS admin auth: `[OPEN QUESTION]` — no identity provider chosen

## Do NOT

Do not build login, signup, session management, JWT, OAuth, or any auth flow.
Do not add auth dependencies to the Phase 1 build.
