# Chapter 25 — Security Architecture

**Path:** `02_MASTER_SPECIFICATION/25-security-architecture`  
**Status:** `READY` — content-integrity and provenance-protection framing is unblocked  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** Old Ch.28 (Security Architecture) — trimmed per migration map (compress generic enterprise-security boilerplate; retain content-integrity/provenance-protection framing) + security/integrity-of-claims content from old Ch.13

---

## Purpose

Security for a Phase 1 informational website: the focus is on content integrity,
source fidelity protection, and the minimal attack surface of a static/CMS-driven site.

## What belongs here

- Content integrity: preventing unauthorized modification of published source facts
- Provenance protection: ensuring quoted company statements cannot be silently altered
- Static site security baseline (headers, CSP, HTTPS)
- Input validation (for any future form components, even if not active yet)
- Dependency management and supply chain hygiene
- Secrets management (no secrets in client-side code)
- Security for the CMS admin interface (once auth is unblocked — see Ch.24)

## What does NOT belong here

- Generic enterprise security boilerplate (compress — this is a Phase 1 informational site)
- Authentication design (→ Ch.24 — deferred stub)
- Application auth for end-users (→ not in Phase 1)

## Security content migrated from old Ch.13

The integrity-of-claims and provenance-protection framing (ensuring that source
facts cannot be misrepresented — a business risk, not just a technical one) comes
from old Ch.13 and belongs here as the security angle on content fidelity.

## Supporting artifacts

Security review evidence → `07_VERIFICATION/security/`

## Do NOT

Do not pad this chapter with generic enterprise-security content that doesn't apply
to a Phase 1 static informational site.
