# Booking.com Approval Portal Field Map

Last updated: 2026-06-05

Use this when logged into CJ, Awin, or Booking.com Partner Centre. It maps likely portal fields to approved ReservationsNew answers and keeps sensitive tax/banking/payment fields out of Git.

## Shared Application Values

| Field | Value |
| --- | --- |
| Website | `https://reservationsnew.com` |
| Brand / platform | ReservationsNew.com |
| Legal entity | ReservationsNew LLC |
| Preferred contact | Brent Christensen |
| Contact email | `brent@reservationsnew.com` |
| Country | United States |
| Audience region | United States / North America unless analytics shows otherwise |
| Publisher type | Content website, travel planning site, destination guide, hotel search referral site |
| Promotional methods | SEO content, destination guides, on-site search referral links, future email/social promotion |
| Restricted methods | No brand bidding, no direct-link PPC, no vouchers/coupons, no browser extensions/toolbars, no sub-affiliates, no social-only traffic, no incentivized/cashback traffic unless separately approved |
| Current booking flow | Travelers click through to booking providers for current prices, policies, availability, payment, and checkout |
| Requested Booking.com flow | Demand API search, look, and book for accommodations, with Booking.com powering content, availability, pricing, order preview, payment, booking confirmation, and post-booking order data |
| Fallback ask | Content-only or search-look-redirect access with written requirements to upgrade to order creation and on-site checkout |

## Short Descriptions

### One-Line Publisher Description

ReservationsNew is a US-based travel planning and hotel search referral site that helps travelers research destinations and start accommodation searches with transparent affiliate disclosures.

### Longer Publisher Description

ReservationsNew publishes destination guides, hotel-search entry points, and travel-planning content for US/North America travelers. Users currently complete reservations directly with booking providers. We want Booking.com to be our primary accommodation partner and are requesting approved Demand API access for a compliant search, look, and book flow on ReservationsNew.

### Demand API / Partner Centre Ask

We are seeking Booking.com Managed Affiliate Partner review, Partner Centre access, Demand API sandbox credentials, and production approval for accommodations search, details, availability, order preview, order create, order details, cancellation, and modification support. If full on-site booking cannot be approved initially, we would like content-only or search-look-redirect approval plus the specific upgrade requirements.

## CJ Existing Publisher Flow

Public route verified: `https://www.cj.com/en-gb/publisher/partners/booking.com` -> North America -> Apply now -> "Already a CJ Publisher? Sign up here instead."

Inside CJ, capture:

- CJ publisher/account ID.
- Booking.com North America advertiser/program status.
- Program contact or message center route.
- Whether ReservationsNew can apply directly from the advertiser page.
- Any rejection/pending reason.

Use this for a program application text field:

> ReservationsNew.com is a US-based travel planning and hotel search referral site operated by ReservationsNew LLC. We publish destination guides, hotel-search entry points, blog content, and transparent affiliate disclosures. Today, travelers click through to booking providers for current prices, availability, policies, payment, and checkout. We want to promote Booking.com as our primary accommodation partner using approved links now, and we are also seeking guidance on the correct Booking.com Managed Affiliate Partner / Demand API path for a future on-site search, look, and book flow. We do not use voucher-code claims, browser extensions, sub-affiliate traffic, social-only traffic, direct-link PPC, or Booking.com brand bidding.

If there is a CJ message/support option after applying, use the CJ follow-up draft in `outreach-drafts/booking-com-cj-support-message.md`.

## Awin Existing Publisher Flow

Public route verified: `https://www.awin.com/us/advertisers/partner/booking.com`; Booking.com North America appears as advertiser/program `6776`.

Inside Awin, capture:

- Awin publisher ID.
- Booking.com North America / advertiser `6776` status.
- Any account manager/contact shown.
- Whether ReservationsNew is approved, pending, declined, or not applied.
- Any message/support ticket ID.

Use this for an Awin application or support text field:

> ReservationsNew.com is a US-based travel planning and hotel search referral site operated by ReservationsNew LLC. We want to promote Booking.com as our primary accommodation partner and are seeking the correct escalation path for Booking.com Managed Affiliate Partner / Demand API approval. The preferred end state is accommodations search, look, and book on ReservationsNew through approved Booking.com API flows. If that cannot be requested through Awin, please point us to the correct Booking.com Partner Centre or account manager process. Our traffic methods are SEO content, destination guides, and on-site referral links. We do not use voucher/coupon claims, browser extensions, sub-affiliate traffic, or Booking.com brand PPC.

## Booking.com Partner Centre / Demand API Flow

Use Partner Centre only after Booking.com grants access or when a Booking.com account manager instructs next steps.

Capture:

- Booking.com account manager/contact name and email.
- Partner Centre login status.
- Contract/agreement status.
- API key generated: yes/no. Do not store the token in Git.
- `X-Affiliate-Id` received: yes/no. Do not store in Git unless Booking.com explicitly treats it as public.
- Sandbox access enabled: yes/no.
- Production access enabled: yes/no.

Demand API capabilities to request:

- Accommodations search.
- Accommodations details/content.
- Accommodations reviews/scores where approved.
- Accommodations availability.
- Common locations, languages, currencies, and supported payment metadata.
- Orders preview.
- Orders create.
- Orders details.
- Orders cancellation.
- Orders modification.

Security posture to state:

- Server-side API calls only.
- No client-side API tokens.
- No scraping.
- No dynamic pricing/availability caching outside approved terms.
- No payment-card storage.
- No payment-card fields in logs, analytics, or screenshots.
- Launch only after sandbox validation and Booking.com production approval.

## User-Only Fields

The account owner must enter these directly in CJ/Awin/Booking.com systems:

- Passwords.
- Email verification links or codes.
- CAPTCHA/reCAPTCHA.
- Legal terms acceptance.
- Tax forms and tax ID fields.
- Banking and payout details.
- Any payment card or billing information.
- Demand API token values.
