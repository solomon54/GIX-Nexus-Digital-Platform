# AGENT.md — GIX Nexus Digital Platform

**Read this file first, every session, before writing any code or content.**
This is the operating contract between you (the AI agent) and this codebase. It is derived from `baseline.md` (source facts) and the 43-chapter Master Specification (governance rules). When in doubt, this file wins over your own judgment — it exists precisely to stop plausible-sounding defaults from becoming production facts.

---

## 0. What this project is

A bilingual (English/Amharic) informational website + lightweight CMS for **GIX Nexus Telecom and Power**, an Ethiopian telecom/power engineering company. Phase 1 is an informational platform with governed content review — **not** a CRM, ERP, client portal, or transactional system. If a task looks like it needs any of those, stop (see §6).

---

## 1. The 10 facts you must never contradict

These come directly from the source Company Profile. Do not paraphrase, "improve," omit, or invent alternatives to these:

1. **Company**: GIX Nexus Telecom and Power — Ethiopian-owned, HQ Addis Ababa, operates "Across Ethiopia" (not beyond — East Africa is a *future objective*, not current state).
2. **Managing Director**: Getachew Teshome. Phone `+251 911509555`. Email `gixnexustelecom@gmail.com`.
3. **Service taxonomy is exactly 6 groupings** — never 5, never 7:
   Telecommunications Infrastructure · Fiber Optic Solutions · Satellite & Wireless Communications · Network Infrastructure · Telecom Power Systems · Maintenance & Technical Support.
4. **"7+ Service Domains"** is a verbatim company claim/headline — render it as a quoted status statement only. **Never** create a 7th category, page, nav item, or database row for it.
5. **HSEQ Policy** and **"Zero Accident Objective"** exist and must be quoted faithfully. The Zero Accident Objective is a **goal/commitment**, never a historical result — never pair it with checkmarks, "100% achieved," or success badges.
6. **"100% Safety-first approach"** = a policy statement, not a performance metric. Do not convert to "100% safety record."
7. **No current corporate certifications exist** (ISO etc.). "Achieve Industry Certifications" is Future Objective #07 only.
8. **14 target-client categories** (Telecom Operators, ISPs, Gov Ministries, NGOs, Banks, Data Centers, Military, Universities, EPC Contractors, etc.) are **prospective sectors**, never existing clients. Never show client logos, testimonials, or case studies — none exist in the source.
9. **"Vendor Registration Ready"** is a status claim only. Do not build or imply a vendor-registration database/portal exists.
10. **8 Future Objectives** (expansion, certifications, tech investment, digital transformation, etc.) must always render with an explicit "Objective / Planned" label, structurally separated from current capabilities — never in the same list, card style, or grid as active services.

If you're ever about to write a sentence that could be pasted into a live procurement document and create a false impression — stop and rewrite it.

---

## 2. Hard invariants (never violate, no exceptions)

- **6 service groupings.** Fixed. The "7+" claim never becomes a 7th grouping.
- **Current vs. Future firewall.** A `FutureObjective` must never appear in a query, list, or view of "current/active services." No shared containers.
- **Bilingual parity.** Every user-facing string ships in both `en-US` and `am-ET` before merge. No English-only placeholders left in main branch.
- **Western digits only** (0–9) — in both locales, no Ge'ez numerals, ever.
- **No fabricated facts.** No invented employee counts, project names, client names, revenue, dates, or metrics. If it's not in `baseline.md` or the master spec, it does not go in the product.
- **Personnel qualifications ≠ corporate certifications.** "Cisco Certified" (a person) must never be visually or structurally grouped as a company accreditation.
- **No auth, no client portal, no CRM/ERP, no payment processing.** These are explicitly out of scope for Phase 1 (see Non-Goals below).
- **Provenance tag on hard-coded facts.** When you hard-code a source fact (e.g., a phone number, a service description), leave a comment citing the source page, e.g. `// Source: Company Profile PDF, Page 9`.

---

## 3. What you're authorized to build right now

These are resolved, unblocked, and safe to implement without further approval:

- Static/CMS-driven pages for: Company Overview, Leadership, Vision/Mission/Core Values (verbatim, attributed), the 6 Service Groupings + sub-capabilities, HSEQ policy display, Personnel role types + equipment inventory (as categories, not headcounts), the 14 target sectors (labeled "Sectors We Serve" / "Target Industries" — never "Our Clients"), Future Objectives page (clearly separated), static Contact page (phone/email/address only).
- Bilingual scaffolding: locale switching, EN/AM content structure, Western-digit formatting utilities, Africa/Addis_Ababa timezone handling, Gregorian + Ethiopian calendar display logic.
- Accessibility baseline: keyboard nav, 44×44pt touch targets, support for 400% zoom/reflow, semantic heading hierarchy, alt-text conventions.
- Visual/design system work not tied to a specific brand asset decision (grid, spacing, typography scale, light/dark theme scaffolding) — as long as no final hex/font is treated as approved-final without you flagging it as a placeholder.
- Basic SEO scaffolding (sitemap generation excluding drafts, semantic metadata) as long as it doesn't require picking a hosting/domain decision.

**Default posture: prefer static/informational build-out. It has no open blockers.**

---

## 4. What's blocked — do not build these without an explicit human decision

| Feature | Blocked by | What to do instead |
|---|---|---|
| CMS backend / content DB | CMS architecture style undecided (headless vs. traditional) | Build the frontend against a mocked/local JSON content layer so work isn't wasted; flag the CMS choice as needed |
| Hosting / deployment | Cloud vs. local Ethiopia hosting, data residency | Keep the build deployment-agnostic; don't hard-code a cloud vendor's SDK |
| Any inquiry/contact **form** (vs. static text) | Not yet approved — Phase 1 may be display-only | Build the static contact display first; keep form component isolated/optional so it can be dropped in later without refactor |
| Fault reporting / ticketing | Not approved | Do not build — 24/7 support is represented as a status claim + contact info only |
| Vendor registration workflow | Not approved | Do not build — represent "Vendor Registration Ready" as text only |
| RFQ workflow | Not approved | Do not build |
| Authentication of any kind | No identity provider chosen | Do not build login/signup — nothing in Phase 1 requires it |
| AI search / semantic retrieval | Phase 3 concept, not authorized | Do not build |
| Client portal | Explicitly excluded from Phase 1 | Do not build |

If a task description asks you to build one of these, **do not silently implement a "reasonable" version** — stop and ask, or implement the smallest inert placeholder and clearly mark it as disabled/not-live.

---

## 5. Safe defaults when you hit an open question

You will hit unresolved questions constantly (there are 166 logged). Rule: **never resolve an open question by picking an answer and moving on.** Instead:

1. Choose the **most reversible, lowest-commitment** default (e.g., mock data over a real DB integration; a disabled form over a wired one; a placeholder color token over a "final" brand color).
2. Leave a clear `// OPEN QUESTION:` or `<!-- OPEN QUESTION -->` comment describing what's undecided and referencing it if it matches a known one (e.g., OQ-107, OQ-108).
3. Never mark your own placeholder as "done" or "approved" in commit messages or docs.

---

## 6. Escalation triggers — stop and ask a human

Stop immediately and surface the issue (don't proceed, don't guess) if you encounter any of these:

- A request to add a client name, testimonial, project case study, or metric not present in `baseline.md`.
- A request to "just add a login" or any authentication/authorization feature.
- A request to change the service taxonomy count (adding/removing a grouping).
- A request to represent a Future Objective as current/active.
- A request to add a certification badge (ISO, etc.) without a cited source.
- Any task that would require choosing a cloud provider, hosting region, or CMS product as if it were final.
- A request to translate HSEQ or safety content using automated/unreviewed machine translation for production copy (draft/preview is fine, just flag it).
- Anything that touches real user data, forms with PII, or would send actual emails/notifications to GIX staff — these need explicit go-ahead since Phase 1 intake is unresolved.

---

## 7. Content & code conventions

- **Amharic content**: never leave untranslated; if you can't produce a reviewed Amharic string, use an explicit `[AM TRANSLATION PENDING]` marker visible only in dev/staging, never shipped to what could be seen as production.
- **Quoted company statements** (Vision, Mission, "7+ Service Domains," HSEQ Policy) render as attributed quotes, not rewritten copy — don't "clean up" the wording.
- **No promotional adjectives** ("leading," "best-in-class," "world-class") in your own generated copy — even though the company's own Vision statement uses "leading," that's a quoted self-statement, not license for you to use it elsewhere.
- **Commits/PRs**: reference which chapter/fact governs a change where relevant (e.g., "Implements 6-grouping service nav per baseline.md §3").
- **Don't restructure the 6-grouping taxonomy** for "cleaner UX" — it's locked, not a suggestion.

---

## 8. Quick-reference: the "never touch without approval" list

- Production deployment / go-live
- Real email sending or SMS integration
- Any database schema meant for real persistent data (vs. local dev scaffolding)
- Domain/DNS configuration
- Third-party analytics or tracking scripts
- Anything billed (paid APIs, cloud services with cost)

If a task would trigger any of the above, implement everything up to that boundary, then stop and flag exactly what remains before it can go live.

---

## 9. One-line philosophy

**Build the parts that are true and settled. Scaffold — but never finalize — the parts that aren't. Never let an assumption become a fact just because it compiled.**
