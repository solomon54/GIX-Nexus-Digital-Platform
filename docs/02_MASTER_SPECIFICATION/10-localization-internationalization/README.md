# Chapter 10 — Localization & Internationalization

**Path:** `02_MASTER_SPECIFICATION/10-localization-internationalization`  
**Status:** `READY` — no external blockers  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** NEW chapter (did not exist in old draft — consolidates ~15 scattered
localization sub-sections from across old Ch.00, 06, 08, 09, 16–25 per CHAPTER-MIGRATION-MAP.md)

---

## Purpose

The single authoritative chapter for all internationalization and localization
requirements and decisions. Reduces the ~15x repetition of localization sub-sections
found across the old 43-chapter draft.

## What belongs here

- Locale definitions: `en-US` (primary) and `am-ET` (required parity)
- Western digit requirement: 0–9 only, both locales, no Ge'ez numerals, ever
- Amharic script handling: font selection considerations, text direction, rendering
- Locale switching: URL strategy, cookie/preference handling
- Ethiopia timezone: Africa/Addis_Ababa (UTC+3, no DST)
- Calendar display: Gregorian + Ethiopian calendar logic
- Number formatting, currency display (if any)
- Bilingual parity gate: both locales required before merge
- `[AM TRANSLATION PENDING]` marker usage — visible only in dev/staging
- Translation workflow: reviewed vs. machine-translated content rules
  (HSEQ/safety content: reviewed translation mandatory for production)

## Firm constraints

- Ge'ez numerals: **never**, even in Ethiopian calendar display
- Amharic production content: never shipped as unreviewed machine translation
- EN-only placeholders: never in main branch

## Supporting artifacts

Localization assets → `06_DESIGN/localization/`

## Source from old chapters (cite when migrating)

When consolidating content from the old draft's ~15 scattered localization sub-sections,
include a source comment: `<!-- Source: Old Ch.NN §N.N localization sub-section -->`

## Do NOT

Do not add a third locale without a `[STAKEHOLDER DECISION]` record in `03_GOVERNANCE/`.
