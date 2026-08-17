# Chapter 06 — Product Scope & Boundaries

**Path:** `02_MASTER_SPECIFICATION/06-product-scope-boundaries`  
**Status:** `READY` — no external blockers  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** Old Chapter 06 (direct 1:1) + old Ch.37 Non-Goals content (appended here per migration map)

---

## Purpose

The authoritative definition of what is in scope for Phase 1, what is explicitly
excluded, and the rationale for each boundary. This chapter wins over `PROJECT-SCOPE.md`
if the two diverge — flag the discrepancy.

## What belongs here

- In-scope Phase 1 deliverables
- Explicit Non-Goals section (migrated from old Ch.37) — this is where a builder
  actually looks for out-of-scope items
- Deferral rationale for each excluded feature
- Phase 2/3 candidates (labeled as such — never as current scope)

## Non-Goals section (migrated from old Ch.37)

This section is where all explicitly out-of-scope items live:
- Authentication / login of any kind
- CRM / ERP / HRIS / project management
- Contact/inquiry forms with real submission handling
- Fault reporting, RFQ workflow, vendor registration workflow
- AI-assisted search or semantic retrieval
- Client portal
- Real-time data, live dashboards
- Multi-tenancy

## What does NOT belong here

- Technical rationale for architecture choices (→ Ch.21 onward)
- Future platform expansion plans (→ Ch.38 — separate, labeled chapter)

## Do NOT

Do not soften Non-Goals into "deferred" framing that implies they're coming soon.
Each non-goal needs a clear "not in Phase 1" statement, not just "future work."
