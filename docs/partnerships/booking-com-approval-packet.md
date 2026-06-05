# Booking.com Content Approval Packet

Last updated: 2026-06-05

## Goal

Get ReservationsNew approved to use Booking.com content in a compliant way, ideally through Booking.com Demand API access for a content-only or search-look-redirect integration.

The desired end state is not just affiliate links. The desired end state is permission to populate ReservationsNew with Booking.com accommodation content such as property details, photos where allowed, review scores, availability, and pricing through an approved integration.

## Current Status

- Site: https://reservationsnew.com
- Product today: travel planning pages plus partner search/referral links.
- Booking flow today: users click through to partner platforms; ReservationsNew does not complete bookings.
- API/content status: not approved yet. Do not scrape, copy, cache, or republish Booking.com property content outside approved tools/API terms.
- Reviewer-readiness change made: public copy now states that live prices and availability are shown by partner platforms after click-through, while ReservationsNew is pursuing approved Booking.com content/API access.

## Verified Approval Routes

### Route 1 - CJ Booking.com Affiliate Programme

Use this for the standard publisher application and affiliate relationship.

- Official Booking.com affiliate page: https://www.booking.com/affiliate-program/v2/index.html
- Booking.com currently routes registration to CJ.
- CJ Booking.com page: https://www.cj.com/en-gb/publisher/partners/booking.com
- North America application path starts from CJ region selector.

CJ describes eligible publishers as travel bloggers, influencers, and website owners with an active website, blog, or social profile, but social-only publishers are not accepted. For ReservationsNew, the active website is the strongest application asset.

Expected outcome:

- Access to Booking.com affiliate links, banners, widgets, and reporting.
- This does not by itself prove Demand API/content rights.

### Route 2 - Booking.com Managed Affiliate Partner + Partner Centre

Use this for the actual content/API request.

- Demand API overview: https://developers.booking.com/demand/docs/getting-started/overview
- Demand API prerequisites: https://developers.booking.com/demand/docs/getting-started/prerequisites
- Demand API authentication: https://developers.booking.com/demand/docs/development-guide/authentication

Booking.com says Demand API use requires:

- Registered Booking.com Managed Affiliate Partner status.
- Partner Centre access, provided by a Booking.com account manager after the agreed contract is signed.
- API key token generated in Partner Centre.
- `X-Affiliate-Id`.
- Developer Portal access for try-out/sandbox testing.

Demand API supports integration types relevant to ReservationsNew:

- Content only: display Booking.com travel content and redirect users to Booking.com for availability, pricing, and bookings.
- Search, look, and redirect: let users explore prices and availability on the site, then redirect to Booking.com for reservation completion.

Recommended initial ask:

- Request content-only Demand API access first.
- Offer search-look-redirect as the next phase only after content-only approval is clear.
- Avoid asking for full checkout/order creation until there is meaningful traffic and a stronger compliance case.

### Route 3 - Awin Backup / Parallel Outreach

Use this as a fallback or parallel inquiry because Booking.com has recently moved affiliate program routing and some regions/programs may still be visible through Awin.

- Awin Booking.com page: https://www.awin.com/us/advertisers/partner/booking.com
- Awin US contact page: https://www.awin.com/us/contact
- Awin onboarding email listed publicly: onboarding@awin.com

Expected outcome:

- Clarify whether Booking.com North America is still accepting publishers through Awin.
- If accepted, request guidance on whether Awin publisher approval can support escalation to Booking.com managed/API access.

## Application Positioning

Use this concise story in application forms and emails:

> ReservationsNew is a US-based travel planning and affiliate site that helps travelers begin hotel, vacation rental, flight, and car-rental searches with destination guides, transparent disclosures, and partner search links. Users complete reservations directly with booking providers. We want to promote Booking.com as a primary accommodation partner and are seeking approved access to Booking.com content through the appropriate partner path, starting with a content-only integration that redirects users to Booking.com for live availability, pricing, and booking.

Short description:

> Travel planning and affiliate referral site for hotel and trip searches. We publish destination guides and route users to trusted booking providers for current prices and checkout.

Why Booking.com:

> Booking.com is a natural primary partner because ReservationsNew focuses on accommodation discovery and destination-based hotel search. Approved content access would let us show richer, more accurate accommodation information while preserving Booking.com as the checkout and source-of-truth provider.

Traffic source statement:

> Organic search, destination guide content, direct traffic, and future email/social promotion. No brand bidding, no direct linking from paid search, no voucher/coupon claims, no browser extensions, no sub-affiliate network.

Compliance statement:

> ReservationsNew will not scrape Booking.com, will not cache dynamic availability/pricing outside approved terms, will display affiliate disclosures, will use sponsored link attributes, and will send users to Booking.com or approved provider pages for final booking details unless separately approved for a deeper API flow.

## CJ Application Answers

Use these draft answers after the user provides legal/account details.

- Website: `https://reservationsnew.com`
- Region: North America if applying as US/Canada traffic.
- Publisher type: Content / travel website / comparison and destination guide.
- Promotional methods: SEO content, destination guides, on-site search referral links, email newsletter if/when launched.
- Restricted methods to avoid: PPC brand bidding, coupon/voucher pages, browser extensions, incentivized traffic unless separately approved, social-only profile application.
- Site description: ReservationsNew is a travel planning and partner search site that helps users start hotel and trip searches with destination context and then click through to booking providers for live prices, policies, and checkout.
- Booking.com placement: homepage search, destination guides, search results page, blog CTAs, and partner sections with affiliate disclosure.
- Monthly traffic: USER NEEDED.
- Audience geography: USER NEEDED, likely United States first unless analytics says otherwise.
- Contact email: USER NEEDED.
- Legal/business name: USER NEEDED.
- Tax/banking details: USER NEEDED, must be entered by the account owner.

## Demand API Escalation Ask

Use this after CJ approval or when contacting a Booking.com affiliate/contact/account manager.

Subject:

> ReservationsNew request for Booking.com content-only Demand API access

Body:

> Hello,
>
> I operate ReservationsNew (https://reservationsnew.com), a travel planning and affiliate referral site focused on hotel search, destination guides, and partner booking links. Users complete reservations directly with booking providers.
>
> We would like to make Booking.com our primary accommodation content partner and are requesting guidance on the correct path to become a Booking.com Managed Affiliate Partner with Partner Centre access and Demand API credentials.
>
> Our preferred first integration is content-only: display approved Booking.com accommodation content on ReservationsNew and redirect users to Booking.com for live availability, pricing, policies, and booking. We will not scrape Booking.com, cache dynamic pricing/availability outside approved terms, use Booking.com content with competitor content in a prohibited way, or bid on Booking.com brand terms. Affiliate disclosures and `rel="sponsored"` links are already present on the site.
>
> Could you please advise the requirements for account manager review, contract approval, Partner Centre access, and Demand API sandbox credentials?
>
> Thank you,
> USER NAME
> ReservationsNew
> USER EMAIL

## Awin Backup Email

Send to onboarding@awin.com only if CJ path is delayed or we need clarification.

Subject:

> Booking.com North America publisher application and content access path

Body:

> Hello Awin Onboarding,
>
> I operate ReservationsNew (https://reservationsnew.com), a US-focused travel planning and affiliate referral site. We are seeking the correct current path to promote Booking.com and eventually request approved Booking.com content/API access.
>
> Booking.com's affiliate page currently points us to CJ, but Awin also has a Booking.com North America program page. Can you confirm whether Booking.com North America is currently accepting new publishers through Awin, and whether Awin approval can support escalation toward Booking.com Managed Affiliate Partner / Demand API access?
>
> Our promotional methods are travel content, destination guides, and on-site partner search links. We do not use coupon/voucher claims, browser extensions, sub-affiliate traffic, or Booking.com brand bidding.
>
> Thank you,
> USER NAME
> ReservationsNew
> USER EMAIL

## User-Owned Information Needed

The user must provide or personally enter:

- CJ account status: existing account or new account.
- Awin account status: existing account or new account.
- Booking.com Partner Centre status: existing login or no access.
- Applicant legal name or company name.
- Country, business address, phone number, and contact email.
- Tax country and tax form information.
- Banking/payout details.
- Website traffic numbers from GA, Vercel, Search Console, or another analytics source.
- Primary audience geography.
- Whether ReservationsNew has a newsletter or social profiles to list.
- Permission for Codex/browser assistance on forms, with the user handling CAPTCHA, email verification, legal acceptance, tax, and banking details.

## Submission Sequence

1. Apply through CJ Booking.com North America.
2. Complete email verification, tax, banking, and compliance profile.
3. After CJ acceptance, collect the CJ publisher ID and Booking.com program approval evidence.
4. Ask CJ support or the Booking.com program contact for the managed affiliate / Demand API escalation path.
5. Submit the Demand API escalation email.
6. If no response after 5 business days, send Awin backup inquiry and/or CJ support follow-up.
7. Once Partner Centre access is granted, generate API credentials securely and test only in sandbox first.
8. Build a content-only integration against approved endpoints.
9. Request/complete any Booking.com integration review before publishing API-driven content.

## Follow-Up Cadence

- Day 0: submit CJ application.
- Day 1: verify email and complete CJ profile.
- Day 3: check application status; respond to any reviewer questions.
- Day 5: if pending, send polite support follow-up.
- After CJ approval: send Demand API escalation request.
- 5 business days after API request: follow up with CJ/Booking contact.
- 10 business days after API request: try Awin backup/parallel path if not already done.

## Red Lines

- Do not scrape Booking.com pages.
- Do not copy Booking.com photos, property descriptions, reviews, scores, prices, or availability into ReservationsNew without approved rights.
- Do not cache dynamic prices or availability outside Booking.com API terms.
- Do not claim ReservationsNew has live Booking.com inventory until approved integration exists.
- Do not use fake hotel cards, fake prices, fake reviews, or unverifiable testimonials.
- Do not run Booking.com brand PPC campaigns or voucher/coupon pages.
- Do not publish API credentials to GitHub or expose them in client-side code.

