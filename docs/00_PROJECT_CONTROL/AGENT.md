# AGENT.md — GIX Nexus Digital Platform (Full Reference)

**Read `CLAUDE.md` at repo root first — it's the enforceable subset auto-loaded every
session.** This file is the fuller reference: the "why," the edge cases, and the
complete blocked-feature table. Consult it when a task is genuinely ambiguous.

---

## 0. What this project is

A bilingual (English/Amharic) informational website + lightweight CMS for **GIX Nexus
Telecom and Power**, an Ethiopian telecom/power engineering company. Phase 1 is an
informational platform with governed content review — **not** a CRM, ERP, client
portal, or transactional system. If a task looks like it needs any of those, stop
(see §6).

---

## 1. The 10 facts you must never contradict

Source: `01_SOURCE_BASELINE/frozen/Source-Baseline-v1.0.md`. Do not paraphrase,
"improve," omit, or invent alternatives to these:

1. **Company**: GIX Nexus Telecom and Power — Ethiopian-owned, HQ Addis Ababa,
   operates "Across Ethiopia" (not beyond — East Africa is a *future objective*).
2. **Managing Director**: Getachew Teshome. Phone `+251 911509555`. Email
   `gixnexustelecom@gmail.com`.
3. **Service taxonomy is exactly 6 groupings** — never 5, never 7:
   Telecommunications Infrastructure · Fiber Optic Solutions · Satellite & Wireless
   Communications · Network Infrastructure · Telecom Power Systems · Maintenance &
   Technical Support.
4. **"7+ Service Domains"** is a verbatim company claim/headline — render it as a
   quoted status statement only. **Never** create a 7th category, page, nav item,
   or database row for it.
5. **HSEQ Policy** and **"Zero Accident Objective"** must be quoted faithfully. The
   Zero Accident Objective is a **goal/commitment**, never a historical result.
6. **"100% Safety-first approach"** = a policy statement, not a performance metric.
7. **No current corporate certifications exist** (ISO etc.). "Achieve Industry
   Certifications" is a Future Objective only.
8. **14 target-client categories** are **prospective sectors**, never existing
   clients. No client logos, testimonials, or case studies — none exist in the source.
9. **"Vendor Registration Ready"** is a status claim only — no real vendor system implied.
10. **8 Future Objectives** must always render with an explicit "Objective / Planned"
    label, structurally separated from current capabilities.

---

## 2. Hard invariants (never violate, no exceptions)

- 6 service groupings, fixed.
- Current vs. Future firewall — no shared containers, ever.
- Bilingual parity — both `en-US` and `am-ET` before merge.
- Western digits only (0–9), both locales.
- No fabricated facts, clients, projects, metrics.
- Personnel qualifications ≠ corporate certifications.
- No auth, no client portal, no CRM/ERP, no payment processing in Phase 1.
- Provenance tag on hard-coded facts: `// Source: Company Profile PDF, Page 9`.

---

## 3. Folder routing (see also CLAUDE.md)

- **Never write directly into** `02_MASTER_SPECIFICATION/`, `09_RELEASED_DOCUMENTS/`,
  or `03_GOVERNANCE/`.
- **All generated content starts in** `08_WORKING_DRAFTS/ai-generated/`.
- If your task is actual product code (not documentation), it lives outside this
  documentation tree entirely (e.g., a sibling `/src` or `/app` folder) — this
  structure governs documentation and decisions, not the codebase itself. Still
  follow §1/§2 invariants when writing product code.
- Check the specific chapter's own `README.md` inside `02_MASTER_SPECIFICATION/`
  before drafting content for it — each one states whether it's `ready`,
  `blocked`, or `deferred-stub`. Don't write full content for a deferred-stub chapter.

---

## 4. What you're authorized to build right now

- Static/CMS-driven pages for: Company Overview, Leadership, Vision/Mission/Core
  Values (verbatim, attributed), the 6 Service Groupings + sub-capabilities, HSEQ
  policy display, Personnel role types + equipment inventory (categories, not
  headcounts), the 14 target sectors ("Sectors We Serve" — never "Our Clients"),
  Future Objectives page (clearly separated), static Contact page.
- Bilingual scaffolding: locale switching, Western-digit formatting, Africa/Addis_Ababa
  timezone handling, Gregorian + Ethiopian calendar display.
- Accessibility baseline: keyboard nav, 44×44pt touch targets, 400% zoom/reflow,
  semantic heading hierarchy, alt-text conventions.
- Design-system scaffolding not tied to a final brand decision (grid, spacing,
  typography scale, theme scaffolding) — flag any hex/font as placeholder.
- Basic SEO scaffolding (sitemap excluding drafts, semantic metadata).

**Default posture: prefer static/informational build-out. It has no open blockers.**

---

## 5. What's blocked — do not build without an explicit human decision

| Feature | Blocked by | Do instead |
|---|---|---|
| CMS backend / content DB | CMS architecture style undecided | Build frontend against mocked/local JSON |
| Hosting / deployment | Cloud vs. local Ethiopia hosting, data residency | Keep deployment-agnostic |
| Inquiry/contact **form** | Not yet approved | Static contact display; isolate form component for later |
| Fault reporting / ticketing | Not approved | Do not build |
| Vendor registration workflow | Not approved | Represent as text status only |
| RFQ workflow | Not approved | Do not build |
| Authentication | No identity provider chosen | Do not build login/signup |
| AI search / semantic retrieval | Phase 3 concept | Do not build |
| Client portal | Explicitly excluded from Phase 1 | Do not build |

---

## 6. Safe defaults when you hit an open question

1. Choose the **most reversible, lowest-commitment** default.
2. Leave a `// OPEN QUESTION:` comment, referencing the OQ ID if one exists in
   `03_GOVERNANCE/open-questions/`.
3. Never mark your own placeholder as "done" or "approved."

---

## 7. Escalation triggers — stop and ask a human

- Adding a client name, testimonial, project case study, or metric not in the
  Source Baseline.
- Adding login/auth of any kind.
- Changing the service taxonomy count.
- Representing a Future Objective as current/active.
- Adding a certification badge without a cited source.
- Choosing a cloud provider, hosting region, or CMS product as if final.
- Automated/unreviewed machine translation for production HSEQ or safety copy.
- Anything touching real user data, PII, or real outbound email/notifications.

---

## 8. Content & code conventions

- Amharic content: never leave untranslated; use `[AM TRANSLATION PENDING]` markers
  visible only in dev/staging.
- Quoted company statements render as attributed quotes, not rewritten copy.
- No promotional adjectives ("leading," "best-in-class") in your own generated copy.
- Commits/PRs reference the governing chapter/fact where relevant.
- Don't restructure the 6-grouping taxonomy for "cleaner UX."

---

## 9. Never touch without approval

Production deployment/go-live · real email/SMS sending · any DB schema meant for
real persistent data · domain/DNS configuration · third-party analytics/tracking ·
anything billed.

---

## 10. One-line philosophy

**Build the parts that are true and settled. Scaffold — but never finalize — the
parts that aren't. Never let an assumption become a fact just because it compiled.**
