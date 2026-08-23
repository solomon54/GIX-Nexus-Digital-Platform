# GIX Nexus Digital Platform — Roadmap

---

## Phase 1 — Complete

Everything below is built and working.

### Public site
- [x] Home page — hero, services overview, HSEQ banner, news cards, project cards, testimonials section, CTA
- [x] Company page — about, MD message, vision/mission/core values
- [x] Services listing page — all 6 service groupings
- [x] Service detail pages — individual page per service (dynamic routing)
- [x] Capabilities page — technical personnel, equipment, inquiry form
- [x] HSEQ page — safety policy, Zero Accident Objective, HSEQ program elements
- [x] Industries page — all 14 target sectors
- [x] Future Goals page — all 8 planned objectives, labeled as planned
- [x] Contact page — MD contact details, phone, email, address

### CMS
- [x] Payload CMS installed and configured
- [x] 11 collections defined: Users, Services, Sectors, FutureObjectives, Media, Pages, News, Projects, Testimonials, TeamMembers, ServiceInquiries
- [x] Admin panel with GIX Nexus branding (dark theme, logo, icon)
- [x] Service inquiry form with full status lifecycle (New → Reviewing → Contacted → Proposal Sent → Converted → Closed)
- [x] Internal notes field on inquiries (not visible to submitters)

### Bilingual
- [x] English and Amharic locales configured (`/en/...` and `/am/...`)
- [x] All pages available in both languages
- [x] CMS fields localized — each content item has EN and AM fields
- [x] Amharic fallback to English when AM content is not yet set
- [x] Translation files for all static strings (nav, buttons, labels)

### Design & UX
- [x] Light / dark / system themes
- [x] Navigation always-dark rule
- [x] Brand colors (#008CFF, #65D51A) consistently applied
- [x] Noto Sans (English) + Noto Sans Ethiopic (Amharic) typography
- [x] Responsive layout — mobile, tablet, desktop

### SEO & accessibility
- [x] Per-page `<title>` and `<meta description>` in both locales
- [x] Canonical alternates (`/en` ↔ `/am`)
- [x] 44px minimum tap targets on all interactive elements
- [x] ARIA labels and semantic HTML throughout
- [x] Keyboard navigation support

### Infrastructure
- [x] PostgreSQL database (Supabase)
- [x] Email via Resend (inquiry notifications)
- [x] Node 20 pinned (.nvmrc), CSS noop loader for dev/build

---

## Phase 2 — Next

These require GIX Nexus to provide content or make decisions. No new code is needed for most of these.

### Content to add (via admin panel)
- [ ] Real project entries — add completed projects with titles, descriptions, service categories, locations, and photos
- [ ] Team member profiles — upload staff photos and short bios for the Company page
- [ ] News articles — publish the first company announcements and project updates
- [ ] Real testimonials — gather and publish verified client/partner quotes

### New pages to build
- [ ] News archive page (`/en/news`) — a dedicated listing of all published news articles (the homepage links to it but the page is not yet built)
- [ ] Projects portfolio page (`/en/projects`) — a dedicated listing of all published projects (the homepage links to it but the page is not yet built)

### Improvements
- [ ] Email notification on new inquiry submission — alert the designated team member when a form is submitted
- [ ] Structured inquiry follow-up — confirm which team member owns incoming inquiries
- [ ] Amharic review — have a native speaker review all current Amharic translations before public launch

---

## Phase 3 — Later

These require separate decisions, planning, and budget before any work begins.

- [ ] Vendor portal — digital intake for vendors/subcontractors wanting to register with GIX Nexus
- [ ] Document management — version-controlled HSEQ documents and policy files with lifecycle tracking
- [ ] GIS / project map — displaying project locations or coverage areas across Ethiopia
- [ ] AI/semantic search — searching across service descriptions, capabilities, and technical content
- [ ] Analytics dashboard — internal reporting on site traffic, inquiry volumes, and content engagement

---

## Open decisions needed

| Decision | Status |
|---|---|
| Production hosting platform | Not decided |
| Domain name for live site | Not decided |
| First admin user login credentials | Not created |
| Amharic reviewer | Not identified |
| Real project data to publish | Not provided |
| Inquiry email notification recipient | Not decided |
