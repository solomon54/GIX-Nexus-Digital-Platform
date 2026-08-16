# Chapter 36 — Environments & Release Management

**Path:** `02_MASTER_SPECIFICATION/36-environments-release-management`  
**Status:** `PARTIALLY READY` — environment model unblocked; deployment pipeline blocked on hosting  
**Readiness:** Environment definitions can be drafted; deployment steps blocked  
**Migration source:** Not present in old chapter map — inferred as a needed chapter given the split of Ch.37/31

---

## Purpose

The environment strategy (development, staging, production) and the release
management process that governs how content and code reach production.

## What belongs here

- Environment definitions: local dev, staging/preview, production
- Environment-specific configuration rules:
  - `[AM TRANSLATION PENDING]` markers: visible only in dev/staging
  - Draft content: never in production
  - Open Questions / placeholder values: never in production
- Release gate checklist:
  - Source fidelity check passed
  - Bilingual parity confirmed
  - Accessibility check passed
  - No placeholder values in production build
- Branching and release strategy
- Rollback procedure

## Blocked items

- `[OPEN QUESTION]` CI/CD tooling — blocked on hosting/infrastructure decision
- `[OPEN QUESTION]` Production hosting — blocked on hosting decision
- `[OPEN QUESTION]` Staging environment URL — blocked on domain/hosting

## Note on production go-live

Production deployment and go-live are in the "never touch without approval" list.
No deployment pipeline should point to production until explicitly authorized.

## Do NOT

Do not configure a production deployment pipeline without explicit authorization.
