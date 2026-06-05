# Booking.com Approval Submission Tracker

Last updated: 2026-06-05

## Target

Get ReservationsNew approved for Booking.com Demand API access, with search, look, and book as the preferred end state so travelers can complete Booking.com accommodation bookings on ReservationsNew.

Fallback if needed: accept content-only or search-look-redirect approval first, but get written requirements for upgrading to order preview/create and on-site checkout.

## Current Account Status

- CJ Publisher: existing account.
- CJ Booking.com North America program: pending application, verified in CJ on 2026-06-05.
- Awin Publisher: existing account.
- Awin publisher ID: `2793280`.
- Awin Booking.com North America program: joined, verified in Awin on 2026-06-05.
- Booking.com Partner Centre: sign-in returned `USER_NOT_FOUND` / no access rights on 2026-06-05.
- Booking.com Demand API: not approved yet.
- Public application email: brent@reservationsnew.com.
- Applicant entity for public forms: ReservationsNew LLC / ReservationsNew.com.
- Private applicant fields: keep in `docs/partnerships/private/booking-com-applicant-details.local.md` only.

## Evidence To Capture

- CJ publisher/account ID.
- CJ Booking.com North America program status: not applied, pending, approved, rejected, or unknown.
- Awin publisher ID.
- Awin Booking.com North America program status: not applied, pending, approved, rejected, or unknown.
- Any Booking.com program manager, support ticket, or contact email.
- Booking.com Partner Centre login/access status.
- Demand API approval status.
- Demand API sandbox credentials created: yes/no. Never store the token in Git.
- `X-Affiliate-Id` received: yes/no. Never store it in Git unless Booking.com explicitly treats it as public.
- Sandbox request proof:
  - `/common/locations/*`
  - `/accommodations/search`
  - `/accommodations/details`
  - `/accommodations/availability`
  - `/orders/preview`
  - `/orders/create`
  - `/orders/details`

## CJ North America Public Signup Findings

Checked 2026-06-05:

- Public region path: CJ Booking.com page -> North America -> Apply now.
- Direct public signup URL observed: https://www.cj.com/en-gb/booking-form?cid=b7f06019-c2c9-4060-80e1-1b44324cbf46
- Existing CJ publishers should choose "Sign up here instead" on the CJ-powered signup page and apply from inside the existing CJ member account.
- The signup page says "Content - Disabled." This means CJ affiliate approval should not be treated as approval to republish Booking.com property content.
- The visible terms say customers must complete accommodation bookings on Booking.com. This means on-site ReservationsNew checkout needs separate Booking.com Managed Affiliate Partner / Demand API approval.
- Important visible restrictions:
  - No iframes or similar functionality.
  - No Booking.com voucher-code claims.
  - No ad hijacking, direct-link PPC, or brand/search behavior that jeopardizes Booking.com.
  - No toolbars, browser extensions, or similar software.
  - No sub-affiliates without approval.
  - Social-only publishers are not allowed.
  - Commission shown on the signup page is only paid for accommodation reservations.

## Awin Public Program Findings

Checked 2026-06-05:

- Booking.com page: https://www.awin.com/us/advertisers/partner/booking.com
- North America express signup URL observed: https://ui.awin.com/express-signup/en/awin/6776/8d075a6a-12e4-4552-8643-baf37280b441?t=YW3E6BiLkyO0nOt7dZkHLgC3UM9XOOF9F8pf4icVXVw&utm_campaign=joinbooking&utm_content=northamerica&utm_source=awin.com
- Public page says Booking.com North America is advertiser/program `6776`.
- Public page says partners can gain access to reservation details and dedicated account management.
- Awin contact page lists:
  - onboarding@awin.com for applying for Awin access.
  - us-newbusiness@awin.com for new business.
  - Publisher support through Partner Success Center / Website Help Ticket.
- Treat Awin approval as useful evidence and a possible escalation route, but not as proof of Booking.com Demand API content or on-site checkout rights.

## Awin Authenticated Program Findings

Checked 2026-06-05:

- Awin dashboard account: `reservationsnew.com (2793280)`.
- Booking.com North America profile URL: https://ui.awin.com/awin/affiliate/2793280/merchant-profile/6776
- Authenticated status: `Joined`.
- Advertiser/program ID: `6776`.
- Date joined: `Apr 28, 2026`.
- Link status: `Online`.
- Program contact shown in Awin: `global-booking.com@awin.com`.
- Awin compose sender shown after Brent logged in as the application account: `brent@reservationsnew.com`.
- Internal Awin message to Booking.com North America requesting Booking.com Managed Affiliate Partner / Demand API v3.2 escalation was sent on 2026-06-05.

## Day 0 Checklist

- [x] Log in to CJ with the existing publisher account.
- [x] Search for Booking.com North America, or open the existing-publisher signup path from the CJ North America form.
- [x] Record current status in this tracker.
- [ ] If not approved, apply with the copy in `booking-com-approval-packet.md`.
- [ ] Confirm CJ profile, website, tax, and payout settings are complete.
- [x] Log in to Awin.
- [x] Check advertiser/program `6776` or the Booking.com North America express signup path.
- [x] Record Booking.com North America status in this tracker.
- [x] If a Booking.com contact or message center exists, send the Demand API escalation ask.
- [ ] If no contact exists, send the CJ support follow-up draft.
- [ ] Continue Partner Centre account setup.

## Execution Artifacts

- Partner one-pager: `booking-com-partner-one-pager.md`
- Technical readiness note: `booking-com-technical-readiness.md`
- Portal field map: `booking-com-portal-field-map.md`
- Portal session checklist: `booking-com-portal-session-checklist.md`
- Demand API escalation draft: `outreach-drafts/booking-com-demand-api-escalation.md`
- CJ support/message draft: `outreach-drafts/booking-com-cj-support-message.md`
- Awin support/message draft: `outreach-drafts/booking-com-awin-support-message.md`
- Awin public email draft: `outreach-drafts/booking-com-awin-public-email.eml`

## Missing Inputs

- Monthly sessions/users/pageviews.
- Search Console clicks/impressions if available.
- Primary traffic geography.
- Planned content volume for the next 90 days.
- Newsletter/social profiles, if any.
- CJ publisher ID captured privately in the gitignored applicant details file.

## Traffic Pitch Defaults

Use only if current analytics are unavailable:

> ReservationsNew is early-stage and building a Booking.com-first travel planning surface. The site already has destination pages, search referral flows, blog content, affiliate disclosures, and a clear compliance posture. The next 90-day plan is to expand destination and hotel-intent content, route accommodation demand to Booking.com, and use approved Demand API access to improve conversion and data accuracy.

## Submission Links

- Booking.com affiliate page: https://www.booking.com/affiliate-program/v2/index.html
- CJ Booking.com page: https://www.cj.com/en-gb/publisher/partners/booking.com
- Awin Booking.com page: https://www.awin.com/us/advertisers/partner/booking.com
- Awin contact page: https://www.awin.com/us/contact
- Demand API docs: https://developers.booking.com/demand/docs
- Demand API prerequisites: https://developers.booking.com/demand/docs/getting-started/prerequisites
- Orders API overview: https://developers.booking.com/demand/docs/orders-api/overview
- Create orders guide: https://developers.booking.com/demand/docs/orders-api/order-preview-create

## Next Status Notes

Append dated notes here as submissions happen.

- 2026-06-05: Public site copy and approval packet prepared. User confirmed existing CJ and Awin accounts, public application email, applicant entity, and preference for on-site booking rather than redirect-only flow.
- 2026-06-05: Deployed approval-readiness copy cleanup in commit `3eb9e30`. Live checks passed for the homepage, `/destinations/paris`, and `/search?q=Paris`: public copy now presents ReservationsNew as a destination guide / partner-search referral site and no longer shows the old live-pricing, scan-millions, or hotels-available claims.
- 2026-06-05: Rechecked official Booking.com Demand API docs. Demand API v3.2 is live; prerequisites still require Managed Affiliate Partner status, Partner Centre access, API token, and `X-Affiliate-Id`; `/orders` remains the on-site booking path. CJ publisher ID captured privately from the CJ sign-in context.
- 2026-06-05: Earlier Chrome automation retry for Awin and Gmail returned the same blocker: Chrome is blocking automation because another extension UI is open on the page. No email-sending connector is available in this Codex environment.
- 2026-06-05: Chrome automation connected after Brent closed the extra Chrome windows. CJ Advertisers showed `Booking.com North America` under pending applications. CJ message center was available, and a Demand API v3.2 / Partner Centre escalation was sent to Booking.com North America from CJ mail. Sent Items confirmed the message with date `5-Jun-2026`.
- 2026-06-05: Booking.com Affiliate Partner Centre sign-in returned `USER_NOT_FOUND` and said the account has no access rights. The public `Sign up now` route redirected back to the Booking.com affiliate landing page, whose registration path points to CJ rather than a standalone Partner Centre signup.
- 2026-06-05: Retried Awin express signup again after the Chrome cleanup. The existing Awin tab and a fresh Awin tab both still hit Chrome's "another extension UI is open" blocker on the Awin page, so authenticated Awin Booking.com status was not captured in that pass.
- 2026-06-05: Brent logged into Awin as `brent@reservationsnew.com`. Awin showed ReservationsNew already joined to Booking.com North America advertiser/program `6776`, with date joined `Apr 28, 2026`, link status `Online`, and Awin publisher ID `2793280`. Brent confirmed the internal Awin message requesting Booking.com Managed Affiliate Partner / Demand API v3.2 escalation was sent from the open Awin compose modal.
