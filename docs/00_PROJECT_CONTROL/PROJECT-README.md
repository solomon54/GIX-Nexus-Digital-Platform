# GIX Nexus Digital Platform — Project README

## What this project is
A bilingual (English `en-US` / Amharic `am-ET`) informational website and lightweight
content-management layer for **GIX Nexus Telecom and Power**, an Ethiopian-owned
telecommunications and power engineering company headquartered in Addis Ababa.

Phase 1 scope is strictly an **informational platform with governed content review** —
not a CRM, ERP, client portal, or transactional system. See
`02_MASTER_SPECIFICATION/38-future-expansion/` and
`02_MASTER_SPECIFICATION/06-product-scope-boundaries/` for what is explicitly excluded.

## How this project is organized
```
GIX-Nexus-Digital-Platform/
├── CLAUDE.md                     ← agent auto-load rules (repo root, do not move)
├── 00_PROJECT_CONTROL/           ← you are here — rules, structure, authority
├── 01_SOURCE_BASELINE/           ← the one true source of company facts
├── 02_MASTER_SPECIFICATION/      ← the governed 00–40 chapter specification
├── 03_GOVERNANCE/                ← decisions, ADRs, open questions (as living records)
├── 04_PRODUCT/                   ← working backlog only, NOT authoritative
├── 05_ARCHITECTURE/              ← supporting architecture artifacts (diagrams, models)
├── 06_DESIGN/                    ← design system, UX, accessibility, localization assets
├── 07_VERIFICATION/              ← evidence that things were checked, not just specified
├── 08_WORKING_DRAFTS/            ← ALL new content starts here, human-reviewed before promotion
├── 09_RELEASED_DOCUMENTS/        ← accepted, versioned, final documents only
└── 10_IMPLEMENTATION_HANDOFF/    ← packaged handoff to a build team, created only when ready
```

## The one rule that governs everything else
> **`02_MASTER_SPECIFICATION` is the governed 00–40 document.**
> Every other top-level folder supports, evidences, governs, drafts, reviews, releases,
> or eventually implements that document. No folder here is an excuse to invent a
> Chapter 41+. If something doesn't fit chapters 00–40, it belongs in a support folder
> (Governance / Architecture / Design / Verification), not a new numbered chapter.

## Flow of truth
```
Authoritative GIX Sources (PDF, stakeholder input)
        ↓
Frozen Source Baseline v1.0        (01_SOURCE_BASELINE/frozen/)
        ↓
Master Specification 00–40         (02_MASTER_SPECIFICATION/)
        ↓                ↓                ↓
   Governance      Architecture        Design
   (decisions)      (artifacts)      (artifacts)
        ↓                ↓                ↓
                  Verification
                       ↓
              Released Documentation
                       ↓
              Implementation Handoff
```

## For AI agents working in this repo
Read `CLAUDE.md` at repo root every session. For full rationale and edge cases, read
`00_PROJECT_CONTROL/AGENT.md`. The single most important rule: **never write directly
into `02_MASTER_SPECIFICATION/`, `03_GOVERNANCE/`, or `09_RELEASED_DOCUMENTS/`.**
Everything you generate starts in `08_WORKING_DRAFTS/ai-generated/`.
