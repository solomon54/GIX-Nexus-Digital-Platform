# Chapter 30 — SEO & Discoverability

**Path:** `02_MASTER_SPECIFICATION/30-seo-discoverability`  
**Status:** `READY` — SEO scaffolding is unblocked (with caveat on domain/hosting)  
**Readiness:** Draft content may be started in `08_WORKING_DRAFTS/ai-generated/`  
**Migration source:** Old Ch.26 (SEO & Discoverability System), renumbered per CHAPTER-MIGRATION-MAP.md

---

## Purpose

How the GIX Nexus platform is discovered by search engines — structured data,
semantic metadata, sitemap, and bilingual SEO patterns.

## What belongs here

- Semantic HTML and metadata requirements
- Title and description tag conventions for bilingual pages
- Open Graph and social sharing metadata
- Structured data / schema.org markup (Organization, Service, ContactPoint)
- Sitemap generation (excluding drafts and unpublished content)
- Robots.txt configuration
- Canonical URL strategy for bilingual pages
- Hreflang tags for en-US / am-ET language pairs

## Critical source fidelity note

All SEO metadata (descriptions, structured data) must use source-derived facts only.
No invented taglines, metrics, or client references in structured data or meta descriptions.

## Open questions

- `[OPEN QUESTION]` Domain: not yet decided — keep sitemap base URL as a configurable
  placeholder, never hard-coded as if final
- `[OPEN QUESTION]` Hosting: affects robots.txt environment logic

## Do NOT

Do not hard-code a production domain.
Do not put fabricated metrics or client claims in structured data.
