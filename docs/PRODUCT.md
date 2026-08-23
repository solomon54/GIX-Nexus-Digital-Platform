# GIX Nexus Digital Platform — Product

## What it is

A bilingual (English + Amharic) informational website with a content management system for GIX Nexus Telecom and Power. Staff manage content through an admin panel. Visitors browse the public site to learn about the company's services, team, capabilities, and how to reach them.

This is **not** a client portal, a transaction system, an RFQ platform, or a CRM. It is an informational and inquiry-intake platform.

---

## Phase 1 — Built and working now

### Public pages (8 pages)

| URL | Content |
|---|---|
| `/en` or `/am` | Home — hero, services overview, news, projects, HSEQ banner, testimonials, CTA |
| `/en/company` | Company — about, Managing Director message, vision/mission/values |
| `/en/services` | Services listing — all 6 service groupings with descriptions |
| `/en/services/[slug]` | Individual service detail page |
| `/en/capabilities` | Technical capabilities — equipment, personnel qualifications, inquiry form |
| `/en/hseq` | HSEQ policy — safety program, Zero Accident Objective |
| `/en/industries` | Industries/sectors — 14 target sectors |
| `/en/future-goals` | Future objectives — 8 planned objectives, clearly labeled as planned |
| `/en/contact` | Contact — MD details, phone, email, address |

All 8 pages exist in both `/en/...` and `/am/...`.

### CMS collections (11 collections)

Users, Services, Sectors, FutureObjectives, Media, Pages, News, Projects, Testimonials, TeamMembers, ServiceInquiries — all defined and operational.

### Inquiry form

The Capabilities page includes a service inquiry form. Submissions are stored in the ServiceInquiries collection and appear in the admin panel for review. Fields include: contact name, job title, organisation, sector, email, phone, service type, project location, expected timeline, and project details.

### Bilingual

Every page and content type supports English and Amharic. Language switching is in the navigation. URL structure: `/en/...` and `/am/...`. Static strings (nav, labels, buttons) are in translation files (`messages/en.json`, `messages/am.json`). CMS content fields are localized — each entry can have separate EN and AM values.

### Themes

Light, dark, and system (follows OS preference). The navigation bar is always dark regardless of theme.

### SEO

Each page has proper `<title>` and `<meta description>` tags, including per-locale versions for Amharic. Alternates are set (`/en` ↔ `/am`). The site uses Next.js metadata API.

### Accessibility

All interactive elements meet WCAG 2.1 AA minimum tap target size (44px). ARIA labels on sections and buttons. Semantic HTML throughout (`<main>`, `<nav>`, `<article>`, `aria-labelledby`, etc.).

### Admin panel

Payload CMS admin at `/admin`. Custom branding (GIX Nexus logo, dark theme). Nav user card shows logged-in user details.

---

## What is NOT in Phase 1

These were explicitly excluded from Phase 1 scope.

| Feature | Why excluded |
|---|---|
| Client portal / authenticated user area | Requires separate decisions on access model, user accounts, and data security |
| RFQ workflow | A structured request-for-quote process requires integration with internal processes not yet defined |
| Fault reporting / ticketing | The company's 24/7 technical support is a service capability, not a software feature. No ticketing system was designed or approved |
| Vendor registration system | "Vendor Registration Ready" is a company status. A digital intake portal for vendors was not approved as a Phase 1 requirement |
| CRM integration | Out of scope — this is a public-facing informational platform, not a sales management tool |
| AI search / semantic search | Not needed for a site of this scale |
| Payments | No transactional features |
| External user authentication | No login for external visitors |
| Project portfolio with named clients | No confirmed named clients exist in the source material — projects collection is ready but content must be provided by GIX Nexus |

---

## Phase 2 — Planned next additions

These require content input from GIX Nexus, then publishing via the admin panel.

- **Real project content** — add actual completed projects (title, description, service category, location, images) to the Projects collection. Placeholder cards are shown on the homepage until real content is added.
- **Team photos and bios** — upload staff photos and short bios to the TeamMembers collection for the Company page
- **News articles** — publish company announcements, project updates, and press releases via the News collection
- **Real testimonials** — publish verified client/partner testimonials via the Testimonials collection (never fabricated)
- **Structured inquiry flow** — once GIX Nexus confirms which team member handles inquiries, add email notification so new submissions trigger an alert
- **News archive page** — a dedicated `/news` listing page (currently linked from the home page but the page itself is not built)
- **Projects portfolio page** — a dedicated `/projects` listing page (linked from home, not yet built as a standalone page)
- **Amharic review** — a native Amharic speaker should review all Amharic translations before the site is announced publicly

---

## Phase 3 — Future features requiring separate decisions

These are technically possible but require dedicated planning, budget, and stakeholder sign-off before any work begins.

- **Vendor portal** — digital intake form for vendors/subcontractors wanting to register with GIX Nexus
- **Document lifecycle management** — version-controlled HSEQ documents, certifications, and policy files
- **GIS / map layer** — showing project locations or coverage areas across Ethiopia
- **AI search** — semantic search across services and capabilities content
- **Analytics dashboard** — internal reporting on site traffic, inquiry volumes, and content performance

---

## Open decisions needed from GIX Nexus

| Decision | Why it matters |
|---|---|
| Who is the admin user? | First admin account needs to be created; that person needs login credentials |
| Production hosting | Where will the live site be deployed? (currently runs on localhost + Supabase dev) |
| Domain | What domain will the live site use? (e.g., gixnexus.com or gixnexustelecom.com) |
| Amharic reviewer | Who will review and approve Amharic translations before public launch? |
| Real project data | What completed projects can be published? Names, locations, service categories, photos |
| Email notification recipient | Who should receive an email when a new inquiry is submitted via the form? |
