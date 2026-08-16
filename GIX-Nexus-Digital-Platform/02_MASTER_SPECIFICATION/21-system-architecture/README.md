# Chapter 21 — System Architecture

**Path:** `02_MASTER_SPECIFICATION/21-system-architecture`  
**Status:** `PARTIALLY READY` — layered model and principles unblocked; specific infrastructure choices blocked on hosting/CMS decisions  
**Readiness:** System layers and responsibility model can be drafted; keep deployment-agnostic  
**Migration source:** Part of old Ch.14 (layered responsibility model) per CHAPTER-MIGRATION-MAP.md

---

## Purpose

The overall system architecture: the layered responsibility model showing how
the public website, content management layer, data layer, and external interfaces
relate — without prescribing vendor-specific choices that are still open.

## What belongs here

- System layers: presentation, application, content/data, delivery
- Component responsibility map: what each layer owns
- Integration touchpoints between layers
- Deployment topology model (deployment-agnostic — no vendor names)
- System-level quality attributes: availability, resilience, maintainability

## Deployment-agnostic requirement

- `[OPEN QUESTION]` Cloud provider: not decided
- `[OPEN QUESTION]` Hosting region: data residency for Ethiopia not yet decided
- `[OPEN QUESTION]` CDN: not decided
- All infrastructure references must use generic terms until resolved

## Supporting artifacts

System diagrams → `05_ARCHITECTURE/system/`

## Do NOT

Do not reference a specific cloud vendor (AWS, Azure, GCP, etc.) as if chosen.
Do not reference a specific CDN or edge network as if chosen.
Keep everything deployment-agnostic.
