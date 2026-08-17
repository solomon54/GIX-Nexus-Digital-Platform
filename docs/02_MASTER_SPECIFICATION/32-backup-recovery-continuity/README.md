# Chapter 32 — Backup, Recovery & Continuity

**Path:** `02_MASTER_SPECIFICATION/32-backup-recovery-continuity`  
**Status:** `PARTIALLY READY` — requirements and targets unblocked; specific implementation blocked on hosting  
**Readiness:** RTO/RPO targets and backup requirements can be drafted  
**Migration source:** Old Ch.35 (Backup, Recovery & Reliability), renumbered per CHAPTER-MIGRATION-MAP.md

---

## Purpose

Requirements and strategy for data backup, disaster recovery, and business
continuity for the Phase 1 platform.

## What belongs here

- Recovery time objective (RTO) and recovery point objective (RPO) targets
- Content backup requirements (the content database / CMS data)
- Static asset backup
- Disaster recovery runbook requirements
- Continuity requirements for the governance workflow
  (what happens if the CMS is unavailable during a content review cycle)

## Blocked items

- `[OPEN QUESTION]` Specific backup tooling and provider — blocked on hosting choice
- `[OPEN QUESTION]` Backup storage location — blocked on data residency decision

## Do NOT

Do not specify a backup provider or storage vendor until hosting is decided.
