# Booking.com Portal Session Checklist

Last updated: 2026-06-05

Use this during a logged-in CJ/Awin/Booking.com session. The goal is to turn account access into documented evidence and outbound escalation messages.

## Ground Rules

- Do not paste passwords, tax IDs, bank details, API keys, `X-Affiliate-Id`, order tokens, or payment-card details into chat or Git.
- Do not screenshot pages containing tax, banking, payment, or API token values.
- If a portal asks for CAPTCHA, email verification, legal acceptance, tax, or banking, Brent must complete that step directly.
- Record statuses and ticket IDs in `booking-com-submission-tracker.md`.
- Use `booking-com-portal-field-map.md` for form answers.
- If Codex/Chrome reports that another extension UI is open, Brent should dismiss or complete that Chrome extension popup/window, then ask Codex to continue from the CJ/Awin tabs.

## CJ Session

1. Log in to CJ as the existing publisher.
2. Search advertisers/programs for `Booking.com North America`.
3. If not found, open the public North America route and choose the existing-publisher path:
   - `https://www.cj.com/en-gb/booking-form?cid=b7f06019-c2c9-4060-80e1-1b44324cbf46`
4. Capture:
   - CJ publisher/account ID.
   - Booking.com North America status: not applied, pending, approved, declined, or unavailable.
   - Any program contact/message center route.
   - Any visible reason for pending/decline.
5. If not applied, apply using the CJ text from `booking-com-portal-field-map.md`.
6. If approved or pending with a message route, send `outreach-drafts/booking-com-cj-support-message.md`.
7. Update the tracker with the date, status, and any ticket/contact ID.

## Awin Session

1. Log in to Awin as the existing publisher.
2. Search for Booking.com North America or advertiser/program `6776`.
3. If not found, open the public program route:
   - `https://ui.awin.com/express-signup/en/awin/6776/8d075a6a-12e4-4552-8643-baf37280b441?t=YW3E6BiLkyO0nOt7dZkHLgC3UM9XOOF9F8pf4icVXVw&utm_campaign=joinbooking&utm_content=northamerica&utm_source=awin.com`
4. Capture:
   - Awin publisher ID.
   - Booking.com North America / advertiser `6776` status.
   - Any account manager/contact.
   - Any application, message, or ticket ID.
5. If not applied, apply with the Awin text from `booking-com-portal-field-map.md`.
6. If approved or pending with a message route, send `outreach-drafts/booking-com-awin-support-message.md`.
7. If there is no logged-in support route, send the public backup email draft to `onboarding@awin.com`.
8. Update the tracker with the date, status, and any ticket/contact ID.

## Booking.com Partner Centre Session

1. Continue Partner Centre account setup only through official Booking.com pages.
2. Capture:
   - Whether login exists.
   - Whether a Booking.com account manager/contact is shown.
   - Whether a contract/agreement step is pending.
   - Whether Demand API access is visible.
3. If a contact/support route exists, send `outreach-drafts/booking-com-demand-api-escalation.md`.
4. If API credentials are generated:
   - Store them only in a local secret manager or `.env.local`.
   - Never commit them.
   - Never paste them into chat.
5. If sandbox access is enabled, test only non-production/sandbox requests first.

## Tracker Update Format

Append notes like this:

```md
- 2026-06-05: CJ Booking.com North America status: pending. CJ publisher ID captured privately. Sent Demand API escalation through CJ message center, ticket/message ID: ____.
```

If sensitive IDs are not safe to commit, write:

```md
- 2026-06-05: CJ publisher ID captured privately. Booking.com North America status: approved. Demand API escalation sent through CJ message center, ticket/message ID captured privately.
```

## Decision Tree

- CJ approved + program contact exists: send Demand API escalation through CJ first.
- CJ not approved but Awin approved: send Awin support message asking for Booking.com Managed Affiliate Partner / Demand API escalation.
- Both CJ and Awin pending: complete both applications, then wait 3 business days before support follow-up.
- Partner Centre contact exists: send Demand API escalation there even if CJ/Awin status is pending.
- Booking.com rejects full on-site booking: ask for content-only/search-look-redirect approval plus written upgrade requirements for `/orders/preview` and `/orders/create`.
