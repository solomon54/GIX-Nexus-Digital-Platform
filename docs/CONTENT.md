# GIX Nexus Digital Platform — CMS User Guide

Audience: GIX Nexus staff. No technical knowledge required to use this guide.

---

## Accessing the admin panel

Go to: **`https://gix-nexus-telecom.vercel.app/admin`**  
During development: `http://localhost:3000/admin`

Log in with your admin email and password. If you don't have an account yet, ask whoever set up the platform to create one for you.

---

## What you can manage

| Section | What it does |
|---|---|
| **Services** | The 6 service groupings shown on the Services page. Edit descriptions and capabilities. Do not add a 7th service. |
| **Sectors** | The 14 target-client sectors shown on the Industries page. Edit names and descriptions. |
| **Future Objectives** | The 8 planned objectives shown on the Future Goals page. Edit titles and descriptions. Always shown with a "Planned" label on the site. |
| **News** | Company news and announcements. Add, edit, and publish articles. |
| **Projects** | Completed and ongoing projects. Add project details, photos, and descriptions. |
| **Testimonials** | Client and partner testimonials. Only publish real, verified quotes — never fabricated ones. |
| **Team Members** | Staff profiles for the Company page. Add photos and short bios. |
| **Media** | All uploaded files (images, documents). Reused across collections. |
| **Service Inquiries** | Submissions from the inquiry form on the Capabilities page. Read and respond here. |
| **Users** | Admin panel user accounts. Add or remove staff access. |

---

## Adding a news article

1. In the admin panel, go to **News**
2. Click **Create New**
3. Fill in:
   - **Title** — the article headline
   - **Excerpt** — 2–3 sentences that appear on the homepage news cards
   - **Body** — the full article content (rich text editor)
   - **Cover Image** — upload a photo (optional but recommended)
   - **Category** — choose from Announcement, Project Update, Company News, or Partnership
   - **Published At** — the date/time the article should be attributed to
4. Switch to **Amharic** using the locale selector at the top of the form and fill in the Amharic versions of Title, Excerpt, and Body
5. Set **Status** to **Published** when ready, or leave as **Draft** to save without publishing
6. Click **Save**

The article will appear on the homepage (latest 3) and on the News archive page.

---

## Adding a project

1. In the admin panel, go to **Projects**
2. Click **Create New**
3. Fill in:
   - **Title** — descriptive project name (e.g., "Fiber Optic Network Deployment — Addis Ababa")
   - **Excerpt** — short summary for the project card
   - **Description** — full project details (rich text)
   - **Service Category** — choose the relevant service grouping
   - **Location** — where in Ethiopia (e.g., "Addis Ababa, Ethiopia")
   - **Client Sector** — the sector category only (e.g., "Government Ministry"). Do not use specific client names unless explicitly authorized
   - **Completed At** — project completion date
   - **Cover Image** — main project photo
   - **Gallery** — additional project photos (optional)
4. Add Amharic translations using the locale selector
5. Set **Status** to **Published** when ready
6. Click **Save**

---

## Publishing a testimonial

1. In the admin panel, go to **Testimonials**
2. Click **Create New**
3. Fill in:
   - **Quote** — the exact verbatim quote from the client or partner
   - **Author Name** — full name of the person
   - **Author Role** — their job title (e.g., "Project Manager")
   - **Organisation** — company name, only if the person has authorized you to publish it
   - **Sector** — use this instead of Organisation name if the name cannot be published
   - **Avatar** — photo of the person (optional)
4. Add Amharic translation for the quote using the locale selector
5. Set **Status** to **Published** when ready
6. Click **Save**

**Important:** Only publish testimonials with explicit permission from the person quoted. Never write or fabricate testimonials.

---

## Service inquiries

When someone submits the inquiry form on the Capabilities page, the submission appears in the **Service Inquiries** section of the admin panel.

### Finding new inquiries

Go to **Service Inquiries**. The default view shows the most recent submissions. New submissions have the status **New** (🆕).

### Fields you'll see

- **Contact Name, Job Title, Organisation, Sector** — who submitted it
- **Email, Phone** — how to reach them
- **Service Required** — which service they're asking about
- **Project Location, Expected Timeline, Project Details** — what they need
- **Submitted At** — when the form was submitted

### Tracking status

Use the **Status** field to track where the inquiry is in your process:

| Status | Meaning |
|---|---|
| 🆕 New | Just received, not yet reviewed |
| 👀 Under Review | Someone is looking at it |
| 📞 Contacted | You've reached out to the person |
| 📋 Proposal Sent | You've sent them a proposal or quote |
| ✅ Converted | This inquiry became a project |
| ❌ Closed | No longer active (declined, no response, etc.) |

### Internal notes

The **Internal Notes** field is for your team only. Anything you write here is not visible to the person who submitted the inquiry. Use it to record actions taken, follow-up notes, or context.

---

## Bilingual editing

Every piece of content can be edited in both English and Amharic.

1. Open any content item (e.g., a News article)
2. At the top of the edit form, look for the **locale selector** (it shows the current language)
3. Click it and switch to **አማርኛ (Amharic)**
4. Fill in the Amharic versions of each localized field
5. Save

If an Amharic value isn't set for a field, the site automatically falls back to the English value. So you can publish English content first and add Amharic translations later.

---

## Content rules

**What you must always do:**

- Use exact names from the company profile for services, sectors, and objectives
- Label future objectives as "Planned" or "Objective" — never as current capabilities
- Use sector categories for client references (e.g., "Government Ministry") unless a client has explicitly consented to being named
- Only publish testimonials that are real and have been approved by the person quoted
- Keep the Amharic content semantically consistent with the English — don't add claims or superlatives that aren't in the English version

**What you must never do:**

- Add a 7th service to the Services collection
- Claim the company holds ISO or corporate-level certifications — that is a future objective
- State that the company currently operates in East Africa — current operations are across Ethiopia only
- Write "zero accidents to date" or equivalent — the Zero Accident Objective is a goal, not a record
- Invent project details or client names that haven't been confirmed
- Fabricate or edit testimonials

---

## Who approves what

| Content type | Who can draft | Who should approve before publishing |
|---|---|---|
| Services, HSEQ, Future Objectives | Any admin | Managing Director (technical accuracy matters here) |
| News and announcements | Any admin | Managing Director or General Manager |
| Projects | Any admin | Project Engineer or Managing Director (verify accuracy) |
| Testimonials | Any admin | Managing Director (ensure client consent is confirmed) |
| Team Members | Any admin | Managing Director |
| Service Inquiry responses | Any admin | Handle directly — no approval needed for internal status updates |
