# Chapter 27 — Notification Architecture

**Path:** `02_MASTER_SPECIFICATION/27-notification-architecture`  
**Status:** `DEFERRED-STUB` — real email/SMS sending and notification infrastructure are explicitly not approved for Phase 1  
**Readiness:** Stub only — do NOT write full content or begin implementation

---

## DEFERRED-STUB NOTICE

> **No real notification sending (email, SMS, push) is authorized for Phase 1.**
>
> Phase 1 contact information is static display only (phone number and email address
> as text — no form submission, no outbound messages sent by the platform).
>
> The notification integration from old Ch.32 (MTA/email infrastructure) is
> archived in `08_WORKING_DRAFTS/superseded/` and not live specification.
>
> Activation requires explicit `[STAKEHOLDER DECISION]` in `03_GOVERNANCE/decisions/`.

## Blocking Open Questions

- Whether any inquiry/contact form is ever approved (currently blocked)
- Email/MTA provider selection
- Whether CMS approval workflow requires notification emails to content approvers

## What this chapter will cover (when activated)

- Email notification infrastructure (MTA selection, deliverability)
- In-app notifications for CMS workflow events
- External notification triggers (if contact form ever approved)

## Do NOT

Do not build email sending, SMS, push notifications, or any outbound communication.
Do not add an email provider SDK to Phase 1 dependencies.
