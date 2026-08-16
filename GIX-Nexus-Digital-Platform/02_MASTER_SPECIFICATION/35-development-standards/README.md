# Chapter 35 — Development Standards

**Path:** `02_MASTER_SPECIFICATION/35-development-standards`  
**Status:** `READY` — these are project-specific conventions, unblocked  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** NEW chapter (did not exist in old draft — created to formalize `CLAUDE.md`/`AGENT.md` build conventions inside the governed spec per CHAPTER-MIGRATION-MAP.md)

---

## Purpose

The project-specific development standards and conventions that govern how this
platform is built. This is where `CLAUDE.md` and `AGENT.md` conventions become
part of the governed specification, not just agent-rules files.

## What belongs here

- Provenance comment requirement: `// Source: Company Profile PDF, Page N`
  on every hard-coded fact
- Bilingual parity gate: both locales required before merge — enforced as a CI check
- Classification label usage in code comments for content with governance implications
- `// OPEN QUESTION: OQ-NNN` marker convention
- `[AM TRANSLATION PENDING]` marker: visible in dev/staging, never in production builds
- Commit message conventions (referencing governing chapter/fact)
- Code organization conventions
- Dependency management: pinned versions, well-known packages
- Branch strategy
- AI agent workflow: all generated content starts in `08_WORKING_DRAFTS/ai-generated/`
  and is promoted only after human review

## Non-negotiable conventions (from AGENT.md)

- Never mark a placeholder as "done" or "approved" in commit messages
- Never hard-code a company fact without a provenance comment
- Never let an `[OPEN QUESTION]` default be treated as a decision

## Do NOT

Do not add development standards that contradict `CLAUDE.md` or `AGENT.md`.
If this chapter and those files diverge, flag it — this chapter is the spec version,
those files are the enforceable runtime subset.
