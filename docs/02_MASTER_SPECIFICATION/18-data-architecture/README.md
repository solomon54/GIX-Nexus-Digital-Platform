# Chapter 18 — Data Architecture

**Path:** `02_MASTER_SPECIFICATION/18-data-architecture`  
**Status:** `PARTIALLY READY` — content model is unblocked; persistent DB schema is blocked on CMS and hosting decisions  
**Readiness:** Content model and data structure can be drafted; avoid prescribing a specific DB engine  
**Migration source:** Old Ch.15 (Data Architecture), renumbered per CHAPTER-MIGRATION-MAP.md

---

## Purpose

How data is structured, stored, and accessed for Phase 1 — primarily the content
data model and the mocked/local JSON layer used during development.

## What belongs here

- Content data model (documents/entities: Service, Sector, FutureObjective, HseqPolicy,
  ContactInfo, TeamMember, etc.)
- Data relationships and constraints
- Locale data structure (how en-US and am-ET content are associated)
- Mocked JSON content layer structure for development
- Data validation rules (e.g., service grouping count must equal 6)

## Blocked items (do not prescribe)

- `[OPEN QUESTION]` Specific database engine: blocked on CMS platform choice
- `[OPEN QUESTION]` Data residency / hosting location: blocked on hosting decision
- `[OPEN QUESTION]` Backup and persistence strategy: follows hosting decision

Use mocked/local JSON for all development work until these are resolved.

## Supporting artifacts

Data model diagrams → `05_ARCHITECTURE/data/`

## Do NOT

Do not create a real persistent database schema for production use.
Do not choose a specific DB product without a stakeholder decision.
Mark all storage-specific choices: `// OPEN QUESTION: pending CMS/hosting decision`.
