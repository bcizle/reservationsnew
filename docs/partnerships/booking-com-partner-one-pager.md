# ReservationsNew x Booking.com Partner One-Pager

Last updated: 2026-06-05

## Request

ReservationsNew LLC is requesting Booking.com Managed Affiliate Partner review, Partner Centre access, and Demand API approval for accommodations search, look, and book.

Preferred approval:

- Booking.com accommodation content/details where approved.
- Accommodation search and availability.
- Order preview.
- Order create / on-site checkout.
- Order details, cancellation, and modification support.

Fallback if the full booking flow cannot be approved immediately:

- Content-only or search-look-redirect approval first.
- Written requirements to upgrade to `/orders/preview` and `/orders/create`.

## Applicant

- Site: https://reservationsnew.com
- Brand: ReservationsNew.com
- Entity: ReservationsNew LLC
- Primary contact: Brent Christensen
- Email: brent@reservationsnew.com
- Country: United States
- Existing accounts: CJ Publisher and Awin Publisher
- Booking.com Partner Centre: account setup in progress

## Product Today

ReservationsNew is a travel planning and hotel-search referral site. It currently publishes:

- Destination guides.
- Blog content.
- Partner search entry points.
- Clear affiliate disclosures.
- Booking.com, Awin, and partner referral links.

Users currently click through to booking providers for current pricing, availability, policies, payment, and checkout. ReservationsNew does not claim to have live Booking.com inventory and does not republish Booking.com property content without approval.

## Desired Booking.com Experience

The target product is a Booking.com-first accommodation booking experience:

1. Traveler searches a destination and dates on ReservationsNew.
2. ReservationsNew retrieves approved Booking.com content, availability, pricing, policies, and review information through the Demand API.
3. Traveler chooses a Booking.com accommodation/room product on ReservationsNew.
4. ReservationsNew calls `/orders/preview` to confirm final price, guest allocation, payment options, policies, and order token.
5. Traveler completes Booking.com-powered checkout on ReservationsNew if approved.
6. ReservationsNew uses approved order endpoints for confirmation, order details, cancellation, modification, support, and reporting.

## Why Booking.com

Booking.com is the best primary partner for ReservationsNew because the site is built around accommodation discovery and destination-based hotel search. Approved Booking.com Demand API access would:

- Improve data accuracy by using Booking.com as the source of truth.
- Reduce conversion drop-off from outbound redirects.
- Give travelers a more consistent booking path.
- Keep Booking.com attribution, content, pricing, policies, and order data within approved API terms.

## Traffic And Growth Plan

Current traffic numbers are still being collected. Until those are available, the partner pitch should emphasize product readiness and planned growth:

- Expand destination content around hotel-intent searches.
- Publish hotel and destination guides targeting US/North America travelers.
- Route accommodation demand primarily to Booking.com.
- Use compliant affiliate disclosures and sponsored link attributes.
- Avoid brand bidding, voucher-code claims, browser extensions, sub-affiliate traffic, and direct-link PPC.

90-day content plan:

- Expand destination coverage for top hotel-intent markets.
- Add hotel-intent landing pages only after content/data rights are clear.
- Improve internal search flows and date handling.
- Prepare the Booking.com API integration behind server-side feature flags.

## Compliance Commitments

ReservationsNew will not:

- Scrape Booking.com.
- Copy or republish Booking.com property content, photos, reviews, scores, prices, or availability without approved rights.
- Cache dynamic availability or pricing outside approved API terms.
- Use Booking.com content with competitor content in a prohibited way.
- Bid on Booking.com brand terms.
- Use Booking.com voucher-code claims.
- Use iframes or similar functionality where prohibited.
- Expose API credentials client-side.
- Store payment card details.
- Log payment fields, API tokens, order tokens, or sensitive booking data.

ReservationsNew will:

- Use server-side API calls.
- Treat Booking.com as the source of truth for content, pricing, policies, payment, order, cancellation, and support data.
- Keep affiliate disclosures visible.
- Use `rel="sponsored"` on affiliate links.
- Validate in sandbox before production launch.
- Complete any Booking.com integration, security, or production review before publishing API-driven Booking.com content or on-site checkout.

## Supporting Materials

- Approval packet: `docs/partnerships/booking-com-approval-packet.md`
- Portal field map: `docs/partnerships/booking-com-portal-field-map.md`
- Portal session checklist: `docs/partnerships/booking-com-portal-session-checklist.md`
- Submission tracker: `docs/partnerships/booking-com-submission-tracker.md`
- Outreach drafts: `docs/partnerships/outreach-drafts/`
