# Chapter 28 — Observability & Reliability

**Path:** `02_MASTER_SPECIFICATION/28-observability-reliability`  
**Status:** `READY` — principles unblocked; specific tooling blocked on hosting/vendor decisions  
**Readiness:** Observability principles and requirements can be drafted  
**Migration source:** Old Ch.34 (Observability, Logging & Audit), renumbered per CHAPTER-MIGRATION-MAP.md

---

## Purpose

How the platform is observed, monitored, and audited — covering uptime monitoring,
logging, error tracking, and content audit trails for the governance workflow.

## What belongs here

- Uptime and availability monitoring requirements
- Error logging and alerting strategy
- Content audit log: record of what was published, by whom, and when
  (essential for the governed content lifecycle — Draft → Review → Approval → Published)
- Application performance monitoring (coordinates with Ch.29)
- Log retention and privacy (coordinates with Ch.33)

## Open questions touching this chapter

- `[OPEN QUESTION]` Monitoring tooling: no specific provider chosen (blocked on hosting)
- `[OPEN QUESTION]` Analytics/tracking scripts: not yet approved — see §8 of `AGENT.md`
  for the "never touch without approval" list

## Note on analytics

Third-party analytics or tracking scripts are in the "never touch without approval"
category. Do not add any analytics code to the Phase 1 build.

## Supporting artifacts

Observability evidence → `07_VERIFICATION/`

## Do NOT

Do not hard-code a specific monitoring vendor.
Do not add analytics or tracking scripts without explicit stakeholder approval.
