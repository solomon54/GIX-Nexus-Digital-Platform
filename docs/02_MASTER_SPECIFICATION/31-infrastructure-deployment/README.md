# Chapter 31 — Infrastructure & Deployment

**Path:** `02_MASTER_SPECIFICATION/31-infrastructure-deployment`  
**Status:** `BLOCKED` — cloud vs. local Ethiopia hosting and data residency are unresolved Open Questions  
**Readiness:** Infrastructure principles and evaluation criteria can be documented; no vendor-specific choices  
**Migration source:** Old Ch.29 (Technical Stack & Infrastructure), renumbered; vendor-evaluation criteria framing preserved per migration map

---

## BLOCKED NOTICE (partial)

> Vendor and hosting decisions are blocked. This chapter contains criteria and
> principles only — **not a decided stack**.
> 
> All numbered vendor-evaluation criteria from the old draft are preserved as
> CRITERIA, not choices. Do not let them read as a decided stack.

## What belongs here

- Deployment model principles (deployment-agnostic)
- Infrastructure requirements and evaluation criteria (without picking a vendor)
- Hosting decision criteria: latency for Ethiopian users, data residency, cost,
  reliability, support
- CI/CD pipeline requirements
- Environment strategy (dev, staging, production) — coordinates with Ch.36
- Container/build requirements (if applicable)

## Blocking Open Questions

- `[OPEN QUESTION]` Cloud provider: AWS, Azure, GCP, local Ethiopian DC, hybrid
- `[OPEN QUESTION]` Data residency: Ethiopia-local hosting vs. international hosting
- `[OPEN QUESTION]` CDN provider
- `[OPEN QUESTION]` Domain registrar and DNS

## Do NOT

Do not pick a cloud provider, hosting region, or CDN as if decided.
Do not write criteria so narrowly that they imply a vendor choice.
Mark all vendor-specific references: `// OPEN QUESTION: vendor TBD`.
