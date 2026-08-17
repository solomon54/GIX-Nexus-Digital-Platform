# Chapter 40 — Open Questions & Verification

**Path:** `02_MASTER_SPECIFICATION/40-open-questions-verification`  
**Status:** `READY` — narrative model is unblocked; 166 OQ entries need individual filing  
**Readiness:** Narrative structure can be drafted; actual OQ records live in `03_GOVERNANCE/`  
**Migration source:** Old Ch.40 (split: this chapter handles the narrative; 166 OQ entries + 10 decisions → individual files in `03_GOVERNANCE/`)

---

## Purpose

The **narrative explanation** of the open questions process and the current status
summary. The actual 166 OQ records live as individual OQ-NNN.md files in
`03_GOVERNANCE/open-questions/` — not in this chapter.

## What belongs here

- How Open Questions are identified, tracked, and resolved
- OQ record format explanation (reference `TEMPLATE-OQ.md`)
- Summary: how many OQs exist, how many are resolved, how many are blocking
- Categorization of OQs by domain (CMS, hosting, design, content, localization, etc.)
- The escalation path from `[OPEN QUESTION]` → `[STAKEHOLDER DECISION]`

## The 166 Open Questions

The original 43-chapter draft logged 166 open questions. These must be individually
filed as OQ-001 through OQ-166 in `03_GOVERNANCE/open-questions/` during the
migration pass. Until then, this chapter notes their total count and pending status.

**Key blocking OQs (high priority to resolve):**
- CMS architecture style (blocks Ch.15, Ch.23)
- Hosting / cloud provider (blocks Ch.14, Ch.21, Ch.31, Ch.32, Ch.36)
- Contact form approval (blocks any interactive contact feature)
- Domain selection (blocks Ch.30 SEO, Ch.36 environments)
- Sign-off authority (blocks any content going to production)

## Do NOT

Do not put individual OQ records in this chapter.
Do not resolve an OQ by changing the prose here — create a DEC-NNN in `03_GOVERNANCE/`.
