# Booking.com Content Approval Packet

Last updated: 2026-06-05

## Goal

Get ReservationsNew approved to use Booking.com content in a compliant way, ideally through Booking.com Demand API access for a search, look, and book integration that lets travelers complete accommodation bookings on ReservationsNew.

The desired end state is not just affiliate links. The desired end state is permission to populate ReservationsNew with Booking.com accommodation content such as property details, photos where allowed, review scores, availability, pricing, order preview, payment, booking confirmation, and post-booking order management through an approved integration.

## Current Status

- Site: https://reservationsnew.com
- Product today: travel planning pages plus partner search/referral links.
- Booking flow today: users click through to partner platforms; ReservationsNew does not complete bookings.
- API/content status: not approved yet. Do not scrape, copy, cache, or republish Booking.com property content outside approved tools/API terms.
- Reviewer-readiness change made: public copy now states that live prices and availability are shown by partner platforms after click-through, while ReservationsNew is pursuing approved Booking.com content/API access.
- Account status from Brent Christensen on 2026-06-05:
  - CJ Publisher account exists.
  - Awin publisher account exists.
  - Booking.com Partner Centre account is in progress.
  - Application email: brent@reservationsnew.com.
  - Applicant entity: ReservationsNew LLC / ReservationsNew.com, United States.
- Private applicant details for form filling are stored locally in `docs/partnerships/private/booking-com-applicant-details.local.md`. Do not commit or paste those details into public docs.

## Verified Approval Routes

### Route 1 - CJ Booking.com Affiliate Programme

Use this for the standard publisher application and affiliate relationship.

- Official Booking.com affiliate page: https://www.booking.com/affiliate-program/v2/index.html
- Booking.com currently routes registration to CJ.
- CJ Booking.com page: https://www.cj.com/en-gb/publisher/partners/booking.com
- North America application path starts from CJ region selector.
- North America signup URL observed on 2026-06-05: https://www.cj.com/en-gb/booking-form?cid=b7f06019-c2c9-4060-80e1-1b44324cbf46
- Existing CJ publishers should use the "Sign up here instead" path from that page, which routes into the CJ member advertiser/program flow.

CJ describes eligible publishers as travel bloggers, influencers, and website owners with an active website, blog, or social profile, but social-only publishers are not accepted. For ReservationsNew, the active website is the strongest application asset.

Expected outcome:

- Access to Booking.com affiliate links, banners, widgets, and reporting.
- This does not by itself prove Demand API/content rights.
- The CJ signup page currently says "Content - Disabled" for the affiliate offer. Treat this as a warning that CJ affiliate approval does not grant a product/property content feed or permission to republish Booking.com property data.
- The CJ terms shown on the signup page say customers must complete accommodation bookings on Booking.com. That conflicts with the desired ReservationsNew on-site checkout flow, so on-site booking must be requested through Booking.com Managed Affiliate Partner / Demand API review rather than assumed from CJ.
- The CJ signup page also states no iframes or similar functionality, no software/toolbars/browser extensions, no sub-affiliates without approval, no social-only publisher accounts, no Booking.com voucher-code claims, and no ad hijacking/direct-link PPC behavior.
- The signup page noted that commission is only paid for accommodation reservations even though other products may track.

### Route 2 - Booking.com Managed Affiliate Partner + Partner Centre

Use this for the actual content/API request.

- Demand API overview: https://developers.booking.com/demand/docs/getting-started/overview
- Demand API prerequisites: https://developers.booking.com/demand/docs/getting-started/prerequisites
- Demand API authentication: https://developers.booking.com/demand/docs/development-guide/authentication
- Demand API v3.2 reference: https://developers.booking.com/demand/docs/open-api/3.2/demand-api
- Orders management guide: https://developers.booking.com/demand/docs/orders-api/overview
- Create orders guide: https://developers.booking.com/demand/docs/orders-api/order-preview-create

Current docs check on 2026-06-05:

- Booking.com says Demand API v3.2 is live.
- The v3.2 API reference lists production base URL `https://demandapi.booking.com/3.2/` and sandbox base URL `https://demandapi-sandbox.booking.com/3.2/`.
- The prerequisites page still requires Managed Affiliate Partner status, Partner Centre access, an API token, and `X-Affiliate-Id`.
- The orders guide still confirms `/orders` is the non-redirect booking path for booking and payment directly in the partner application.

Booking.com says Demand API use requires:

- Registered Booking.com Managed Affiliate Partner status.
- Partner Centre access, provided by a Booking.com account manager after the agreed contract is signed.
- API key token generated in Partner Centre.
- `X-Affiliate-Id`.
- Developer Portal access for try-out/sandbox testing.

Demand API supports integration types relevant to ReservationsNew:

- Content only: display Booking.com travel content and redirect users to Booking.com for availability, pricing, and bookings.
- Search, look, and redirect: let users explore prices and availability on the site, then redirect to Booking.com for reservation completion.

Recommended ask:

- Primary request: search, look, and book / entire booking journey Demand API access for accommodations.
- Required endpoint families for the target product:
  - Accommodation search, availability, details, reviews, and pricing endpoints.
  - Common locations, languages, currencies, and supported payment-card metadata.
  - Orders preview, create, details, cancel, and modification endpoints.
- Fallback request: if full booking access is not available at first review, request content-only or search-look-redirect access immediately and ask for the explicit milestone needed to upgrade to on-site booking.
- Avoid asking for post-booking loyalty or messaging pilots unless Booking.com raises them; focus the first approval on accommodation search, checkout, and order support.

Rationale:

- Booking.com's Demand API docs list "Search, look and book" as the flow for search, booking, and checkout directly on a partner site.
- The `/orders` API collection is the on-site booking layer: it lets travelers book and pay directly in the partner application, and supports post-booking retrieval, cancellations, reporting, and support workflows.
- `/orders/preview` validates final price, payment methods, policies, and booking details before purchase.
- `/orders/create` confirms the booking and processes payment using the `order_token` from preview.

On-site booking implementation posture:

- All Booking.com API calls, affiliate IDs, and API tokens must be server-side only.
- Payment details must never be logged, stored, sent to analytics, or exposed in client-side JavaScript.
- Before production booking goes live, implement a secure checkout architecture, privacy policy updates, support process, cancellation/modification flow, and audit logs for booking attempts.
- Assume Booking.com may require contract review, account manager review, security review, sandbox validation, and possibly payment-processing controls before enabling production order creation.

### Route 3 - Awin Backup / Parallel Outreach

Use this as a fallback or parallel inquiry because Booking.com has recently moved affiliate program routing and some regions/programs may still be visible through Awin.

- Awin Booking.com page: https://www.awin.com/us/advertisers/partner/booking.com
- Awin Booking.com North America express signup URL observed on 2026-06-05: https://ui.awin.com/express-signup/en/awin/6776/8d075a6a-12e4-4552-8643-baf37280b441?t=YW3E6BiLkyO0nOt7dZkHLgC3UM9XOOF9F8pf4icVXVw&utm_campaign=joinbooking&utm_content=northamerica&utm_source=awin.com
- Awin US contact page: https://www.awin.com/us/contact
- Awin onboarding email listed publicly: onboarding@awin.com
- Awin US new business email listed publicly: us-newbusiness@awin.com
- Awin US publisher support route listed publicly: Partner Success Center / Website Help Ticket.

Expected outcome:

- Clarify whether Booking.com North America is still accepting publishers through Awin.
- If accepted, request guidance on whether Awin publisher approval can support escalation to Booking.com managed/API access.
- Awin's public page says Booking.com North America can provide reservation details and dedicated account management. Treat this as useful for escalation and reporting, but not as proof of Demand API property-content or on-site checkout rights.

## Application Positioning

Use this concise story in application forms and emails:

> ReservationsNew is a US-based travel planning and affiliate site that helps travelers research destinations and start hotel, vacation rental, flight, and car-rental searches with transparent disclosures and partner search links. Users currently complete reservations directly with booking providers. We want to make Booking.com the primary accommodation partner and are seeking approved Demand API access for a compliant on-site Booking.com accommodation experience, ideally search, look, and book. If full booking access is not available immediately, we would like content-only or search-look-redirect approval as the first phase with a clear upgrade path.

Short description:

> Travel planning and affiliate referral site for hotel and trip searches. We publish destination guides and route users to trusted booking providers for current prices and checkout.

Why Booking.com:

> Booking.com is a natural primary partner because ReservationsNew focuses on accommodation discovery and destination-based hotel search. Approved Demand API access would let us show richer, more accurate accommodation information and reduce booking friction by allowing travelers to complete reservations on ReservationsNew where permitted by Booking.com's integration terms.

Traffic source statement:

> Organic search, destination guide content, direct traffic, and future email/social promotion. No brand bidding, no direct linking from paid search, no voucher/coupon claims, no browser extensions, no sub-affiliate network.

Compliance statement:

> ReservationsNew will not scrape Booking.com, will not cache dynamic availability/pricing outside approved terms, will display affiliate disclosures, will use sponsored link attributes, and will keep Booking.com as the source of truth for property content, availability, pricing, payment, order, cancellation, and support data through approved Demand API flows.

## CJ Application Answers

Use these draft answers after the user provides legal/account details.

- Website: `https://reservationsnew.com`
- Region: North America if applying as US/Canada traffic.
- Applicant: ReservationsNew LLC / ReservationsNew.com.
- Preferred contact: Brent Christensen.
- Application email: brent@reservationsnew.com.
- Publisher type: Content / travel website / comparison and destination guide.
- Promotional methods: SEO content, destination guides, on-site search referral links, email newsletter if/when launched.
- Restricted methods to avoid: PPC brand bidding, coupon/voucher pages, browser extensions, incentivized traffic unless separately approved, social-only profile application.
- Site description: ReservationsNew is a travel planning and partner search site that helps users start hotel and trip searches with destination context and then click through to booking providers for live prices, policies, and checkout.
- Booking.com placement today: homepage search, destination guides, search results page, blog CTAs, and partner sections with affiliate disclosure.
- Booking.com placement requested: approved Booking.com accommodation search/detail/availability/order flow on ReservationsNew, with Booking.com powering content, pricing, payment, and order data.
- Monthly traffic: USER NEEDED.
- Audience geography: USER NEEDED, likely United States first unless analytics says otherwise.
- Tax/banking details: must be entered by the account owner inside CJ/Awin/Booking.com systems only.

## Demand API Escalation Ask

Use this after confirming the Booking.com program status in CJ/Awin, or when contacting a Booking.com affiliate/contact/account manager.

Subject:

> ReservationsNew request for Booking.com Demand API search/look/book access

Body:

> Hello,
>
> I operate ReservationsNew (https://reservationsnew.com), a US-based travel planning and affiliate referral site focused on hotel search, destination guides, and partner booking links. The applicant entity is ReservationsNew LLC and the primary contact is Brent Christensen at brent@reservationsnew.com.
>
> We would like to make Booking.com our primary accommodation partner and are requesting guidance on the correct path to become a Booking.com Managed Affiliate Partner with Partner Centre access and Demand API credentials.
>
> Our preferred integration is search, look, and book for accommodations: display approved Booking.com accommodation content, availability, pricing, cancellation policies, order preview, payment, booking confirmation, and post-booking order details on ReservationsNew through the Demand API. We understand this likely requires account manager review, contract approval, Partner Centre access, sandbox validation, and production approval before launch.
>
> If full on-site booking access is not available as the first approval step, we would like to start with content-only or search-look-redirect access and get a clear list of requirements to upgrade to order creation and on-site checkout.
>
> We will not scrape Booking.com, cache dynamic pricing/availability outside approved terms, use Booking.com content with competitor content in a prohibited way, bid on Booking.com brand terms, expose API credentials client-side, or store payment card details. Affiliate disclosures and `rel="sponsored"` links are already present on the site.
>
> Could you please advise the requirements for Managed Affiliate Partner approval, Partner Centre access, Demand API sandbox credentials, and production approval for the search/look/book flow?
>
> Thank you,
> Brent Christensen
> ReservationsNew
> brent@reservationsnew.com

## CJ / Booking.com Support Follow-Up

Use this inside CJ support/messages if there is no obvious Booking.com program contact.

Subject:

> Booking.com Demand API / Partner Centre escalation for ReservationsNew

Body:

> Hello,
>
> ReservationsNew LLC is an existing CJ publisher applicant/publisher for ReservationsNew.com. We are trying to identify the correct Booking.com contact or process for Managed Affiliate Partner / Partner Centre / Demand API approval.
>
> The target integration is Booking.com accommodations search, look, and book on ReservationsNew through the Demand API. If full booking is not available initially, we would like content-only or search-look-redirect access with the upgrade requirements for order creation.
>
> Could you route this request to the Booking.com affiliate program manager or confirm where we should submit the Partner Centre / Demand API access request?
>
> Thank you,
> Brent Christensen
> ReservationsNew LLC
> brent@reservationsnew.com

## Awin Backup Email

Send to onboarding@awin.com only if CJ path is delayed or we need clarification.

Subject:

> Booking.com North America publisher application and content access path

Body:

> Hello Awin Onboarding,
>
> I operate ReservationsNew (https://reservationsnew.com), a US-focused travel planning and affiliate referral site. The applicant entity is ReservationsNew LLC and the primary contact is Brent Christensen at brent@reservationsnew.com.
>
> Booking.com's affiliate page currently points us to CJ, but Awin also has a Booking.com North America program page. Can you confirm whether Booking.com North America is currently accepting publishers through Awin, and whether Awin approval can support escalation toward Booking.com Managed Affiliate Partner / Demand API access?
>
> Our preferred end state is Booking.com accommodations search, look, and book on ReservationsNew through approved Demand API access. If that cannot be requested through Awin, could you point us to the correct Booking.com Partner Centre or account manager escalation path?
>
> Our promotional methods are travel content, destination guides, and on-site partner search links. We do not use coupon/voucher claims, browser extensions, sub-affiliate traffic, or Booking.com brand bidding.
>
> Thank you,
> Brent Christensen
> ReservationsNew
> brent@reservationsnew.com

## User-Owned Information Needed

The user must provide or personally enter:

- CJ account status: existing account.
- Awin account status: existing account.
- Booking.com Partner Centre status: trying to get account access.
- Applicant legal name/company/contact details: provided by Brent; stored only in the local private applicant details file.
- Tax country and tax form information.
- Banking/payout details.
- Website traffic numbers from GA, Vercel, Search Console, or another analytics source.
- Primary audience geography.
- Whether ReservationsNew has a newsletter or social profiles to list.
- Permission for Codex/browser assistance on forms, with the user handling CAPTCHA, email verification, legal acceptance, tax, and banking details.

## Submission Sequence

1. In CJ, confirm whether ReservationsNew is already approved for Booking.com North America or still needs to apply.
2. If not approved in CJ, apply through the CJ Booking.com North America program with the draft answers above.
3. Complete email verification, tax, banking, and compliance profile directly in CJ/Awin; the account owner must enter sensitive tax/banking data.
4. Capture evidence: CJ publisher ID, Booking.com program status, Awin publisher ID, Awin Booking.com status, and any program manager/contact details.
5. Use CJ support/program messages to ask for Booking.com Managed Affiliate Partner / Partner Centre / Demand API escalation.
6. Submit the Demand API escalation email with the primary ask: search, look, and book. Include fallback language for content-only or search-look-redirect if needed. Attach or reference the partner one-pager and technical readiness note if the portal/email allows attachments.
7. If no response after 5 business days, send the CJ follow-up and Awin backup inquiry.
8. Once Partner Centre access is granted, generate API credentials securely and test only in sandbox first.
9. Build the approved integration in phases:
   - Phase 1: server-side authentication, locations, accommodation search/details/availability.
   - Phase 2: order preview, checkout page, order create in sandbox, confirmation page.
   - Phase 3: order details, cancellation/modification support, customer support workflow, audit logging.
10. Request/complete any Booking.com integration/security/production review before publishing API-driven Booking.com content or on-site checkout.

## Follow-Up Cadence

- Day 0: verify CJ and Awin Booking.com status; submit CJ application if not already approved.
- Day 1: verify email and complete CJ profile.
- Day 3: check application status; respond to any reviewer questions.
- Day 5: if pending, send polite support follow-up.
- After CJ or Awin Booking.com approval: send Demand API search/look/book escalation request.
- 5 business days after API request: follow up with CJ/Booking contact.
- 10 business days after API request: try Awin backup/parallel path if not already done.

## Attachment-Ready Supporting Docs

- Partner one-pager: `booking-com-partner-one-pager.md`
- Technical readiness note: `booking-com-technical-readiness.md`
- Portal field map: `booking-com-portal-field-map.md`
- Portal session checklist: `booking-com-portal-session-checklist.md`

## Red Lines

- Do not scrape Booking.com pages.
- Do not copy Booking.com photos, property descriptions, reviews, scores, prices, or availability into ReservationsNew without approved rights.
- Do not cache dynamic prices or availability outside Booking.com API terms.
- Do not claim ReservationsNew has live Booking.com inventory until approved integration exists.
- Do not use fake hotel cards, fake prices, fake reviews, or unverifiable testimonials.
- Do not run Booking.com brand PPC campaigns or voucher/coupon pages.
- Do not publish API credentials to GitHub or expose them in client-side code.
- Do not collect real payment cards on ReservationsNew until Booking.com has approved the order creation flow and the production checkout architecture is reviewed.
- Do not log payment card fields, API tokens, order tokens, or personal booking data.

