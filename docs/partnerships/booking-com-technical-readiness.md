# Booking.com Demand API Technical Readiness

Last updated: 2026-06-05

## Purpose

This document describes how ReservationsNew would implement Booking.com Demand API access safely if Booking.com approves Managed Affiliate Partner / Partner Centre access.

The preferred integration is search, look, and book for accommodations. The fallback is content-only or search-look-redirect while Booking.com reviews the path to on-site order creation.

## Current Application

- Framework: Next.js App Router.
- Hosting: Vercel.
- Database: none today.
- Authentication: none today.
- Existing booking behavior: outbound partner referral links only.
- Sensitive Booking.com credentials: none present.
- Current Booking.com content status: not approved.

The site currently avoids claiming it has live Booking.com inventory or republishing Booking.com property content. Current prices, availability, policies, payment, and checkout are shown by the booking provider after click-through.

## Proposed Architecture

### Server-Side API Layer

All Booking.com Demand API calls should be server-side only.

Proposed server routes after approval:

- `POST /api/booking/accommodations/search`
- `POST /api/booking/accommodations/details`
- `POST /api/booking/accommodations/availability`
- `POST /api/booking/orders/preview`
- `POST /api/booking/orders/create`
- `POST /api/booking/orders/details`
- `POST /api/booking/orders/cancel`
- `POST /api/booking/orders/modify`

These routes should:

- Read Booking.com API credentials from server-only environment variables.
- Never expose the API token to browser JavaScript.
- Validate request payloads before calling Booking.com.
- Return only fields approved for display.
- Avoid logging sensitive request/response fields.
- Use feature flags so API-driven content cannot go live before approval.

### Environment Variables

Suggested names:

- `BOOKING_DEMAND_API_BASE_URL`
- `BOOKING_DEMAND_API_TOKEN`
- `BOOKING_AFFILIATE_ID`
- `BOOKING_DEMAND_API_ENVIRONMENT`
- `BOOKING_DEMAND_API_ENABLED`
- `BOOKING_ORDER_CREATE_ENABLED`

Rules:

- Do not use `NEXT_PUBLIC_` for Demand API tokens or affiliate IDs unless Booking.com explicitly says an identifier is safe to expose.
- Store tokens in Vercel environment variables or another secret manager.
- Do not commit credentials to Git.
- Do not paste credentials into chat or issue trackers.

### Checkout Flow

Approved on-site checkout should follow Booking.com's order flow:

1. Search/details/availability returns accommodation products and policies.
2. Traveler selects a room/product.
3. Server calls `/orders/preview`.
4. UI displays final price, policies, payment timing, supported payment options, and guest allocation confirmation.
5. Traveler confirms.
6. Server calls `/orders/create` using the `order_token`.
7. UI displays Booking.com-powered confirmation and next steps.
8. Server can retrieve approved order details for support/reporting.

If Booking.com requires redirect checkout instead, ReservationsNew should use search-look-redirect until order creation is approved.

## Data Handling

### Do Not Store

- Payment card number.
- CVV/security code.
- API token.
- Raw order token.
- Full Booking.com API request/response bodies containing sensitive booking data.
- Any field Booking.com marks as non-cacheable or dynamic.

### May Store After Approval, If Needed

Only if allowed by Booking.com terms:

- Internal request ID.
- Booking/order reference.
- Non-sensitive order status.
- Timestamp.
- Selected destination/date metadata.
- High-level error category.
- Support/audit event history.

### Logging Rules

- Redact payment fields.
- Redact API tokens.
- Redact order tokens.
- Redact personally identifiable booking data unless needed for support and allowed by Booking.com.
- Keep logs out of client analytics tools.

## Compliance Controls

- No scraping.
- No iframe-based Booking.com booking flow if prohibited.
- No fake hotel prices, fake hotel names, fake reviews, or fake availability.
- No Booking.com property photos/descriptions/reviews/scores until approved.
- No brand bidding or direct-link PPC.
- No voucher/coupon claims.
- No browser extensions/toolbars.
- No sub-affiliate flow without approval.
- Clear affiliate disclosures.
- `rel="sponsored"` on affiliate links.

## Launch Gates

Before displaying Booking.com API content:

- Booking.com content/API rights confirmed.
- Partner Centre access granted.
- Demand API sandbox token generated.
- `X-Affiliate-Id` received.
- Sandbox search/details/availability request succeeds.
- Display rules reviewed against Booking.com terms.

Before enabling on-site order creation:

- Booking.com explicitly approves order creation.
- Sandbox `/orders/preview` succeeds.
- Sandbox `/orders/create` succeeds.
- Cancellation/modification/support flow is documented.
- Production credentials are issued.
- Production feature flag is off by default until launch approval.
- Privacy policy and terms cover the on-site booking flow.
- Support email/process is ready.

## Implementation Phases

### Phase 0 - Approval Readiness

- Keep public site in referral mode.
- Maintain reviewer-safe copy.
- Submit CJ/Awin/Partner Centre escalations.
- Gather program status and contact evidence.

### Phase 1 - Sandbox Search

- Add server-only Booking.com client.
- Implement locations/search/details/availability in sandbox.
- Render approved content behind a non-public feature flag.

### Phase 2 - Sandbox Checkout

- Implement order preview.
- Build checkout review page.
- Implement order create in sandbox.
- Build confirmation page.
- Build support/audit trail.

### Phase 3 - Production Review

- Submit sandbox evidence and implementation screenshots to Booking.com if required.
- Complete Booking.com production/security review.
- Enable production with a controlled rollout.

## Open Questions For Booking.com

- What business/traffic threshold is required for Managed Affiliate Partner access?
- Can ReservationsNew start with content-only/search-look-redirect and later upgrade to search-look-book?
- What display rules apply to photos, descriptions, review scores, and availability?
- What fields may be cached and for how long?
- What payment responsibilities does ReservationsNew carry for `/orders/create`?
- Is PCI scope reduced by Booking.com's payment flow, or does ReservationsNew need additional compliance controls?
- What production launch review is required before enabling on-site checkout?
- What support obligations apply after on-site order creation?
