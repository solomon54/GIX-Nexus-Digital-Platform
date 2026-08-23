# CLAUDE.md — GIX Nexus Digital Platform

Bilingual (EN/AM) informational site + light CMS for GIX Nexus Telecom and Power, an Ethiopian telecom/power engineering firm. Phase 1 = informational platform only — not a CRM/ERP/portal. Full rules + rationale: `00_PROJECT_CONTROL/AGENT.md`. This file is the enforceable subset — check every task against it before writing code.

## Folder routing — non-negotiable
- **Never write directly into** `02_MASTER_SPECIFICATION/`, `09_RELEASED_DOCUMENTS/`, or `03_GOVERNANCE/`.
- **All generated content starts in** `08_WORKING_DRAFTS/ai-generated/`. It only moves upstream after human review. Promotion from drafts to governed locations is never something you perform yourself — flag it as ready and stop.
- If asked to "update the spec," write the change as a new file in `08_WORKING_DRAFTS/ai-generated/`, referencing which chapter/section it proposes to modify. Do not edit `02_MASTER_SPECIFICATION/` in place.

## Authority hierarchy (when sources conflict)
1. `01_SOURCE_BASELINE/frozen/Source-Baseline-v1.0.md` — facts about the company. Highest authority.
2. Dated artifacts in `03_GOVERNANCE/decisions/` and `03_GOVERNANCE/adrs/` — highest authority for decisions.
3. `02_MASTER_SPECIFICATION/` chapter prose — narrative/summary only. If it disagrees with a governance artifact, the artifact wins and the chapter prose is stale and needs updating (flag it, don't silently pick one).
4. Everything else (`04_PRODUCT/`, `05_ARCHITECTURE/`, `06_DESIGN/`) is working-level support material, not authoritative on its own.

## Never contradict these facts
- 6 service groupings only, exactly: Telecommunications Infrastructure, Fiber Optic Solutions, Satellite & Wireless Communications, Network Infrastructure, Telecom Power Systems, Maintenance & Technical Support.
- "7+ Service Domains" = a quoted company claim, never a 7th category/page/nav item.
- "Zero Accident Objective" and "100% Safety-first approach" = goals/policy, never achievements or metrics.
- No current corporate certifications (ISO etc.) exist — only a future objective.
- The 14 target sectors are prospective, never existing clients — no logos, no testimonials, no case studies.
- "Vendor Registration Ready" = status text only, not a real vendor system.
- Future Objectives always visually/structurally separated from current capabilities — never merged.
- MD: Getachew Teshome, +251 911509555, gixnexustelecom@gmail.com, Addis Ababa. Ops area = "Across Ethiopia" only (not East Africa yet).

## Hard rules
- Every user-facing string ships in `en-US` AND `am-ET` before merge. No English-only placeholders in main.
- Western digits (0–9) only, both locales, always.
- Never invent facts, metrics, clients, projects, headcounts. If it's not in the Source Baseline, it doesn't ship.
- Cite source page in a comment when hard-coding a fact (e.g. `// Source: Company Profile PDF, Page 9`).
- Personnel qualifications (e.g. "Cisco Certified") ≠ corporate certifications. Never group them together.

## Build now, no approval needed
Static/CMS pages for company info, 6 services, HSEQ display, personnel/equipment lists, target sectors (labeled "Sectors We Serve," not "Clients"), Future Objectives page, static contact page. Locale switching, calendar/timezone logic, accessibility baseline (44×44pt targets, 400% zoom), design-system scaffolding (flag any hex/font as placeholder, not final).

## Do NOT build without explicit approval
Auth/login of any kind · CMS backend / real DB (use mocked JSON instead) · hosting/cloud config · contact/inquiry **forms** (static text only for now) · fault reporting or ticketing · vendor registration workflow · RFQ workflow · client portal · AI search · any real email/SMS sending · anything billed.

## When you hit an open question
Pick the most reversible/lowest-commitment option, mark it clearly (`// OPEN QUESTION: ...`), never treat your own placeholder as final or approved.

## Stop and ask a human if asked to
Add a client/testimonial/metric not in the Source Baseline · add login/auth · change the service count · show a Future Objective as current · add a cert badge without a cited source · pick a cloud provider/CMS as final · send real emails or touch real user data.
