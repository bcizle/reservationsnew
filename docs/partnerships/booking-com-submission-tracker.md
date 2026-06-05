# Booking.com Approval Submission Tracker

Last updated: 2026-06-05

## Target

Get ReservationsNew approved for Booking.com Demand API access, with search, look, and book as the preferred end state so travelers can complete Booking.com accommodation bookings on ReservationsNew.

Fallback if needed: accept content-only or search-look-redirect approval first, but get written requirements for upgrading to order preview/create and on-site checkout.

## Current Account Status

- CJ Publisher: existing account.
- Awin Publisher: existing account.
- Booking.com Partner Centre: account access in progress.
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

## Day 0 Checklist

- [ ] Log in to CJ with the existing publisher account.
- [ ] Search for Booking.com North America.
- [ ] Record current status in this tracker.
- [ ] If not approved, apply with the copy in `booking-com-approval-packet.md`.
- [ ] Confirm CJ profile, website, tax, and payout settings are complete.
- [ ] Log in to Awin.
- [ ] Record Booking.com North America status in this tracker.
- [ ] If a Booking.com contact or message center exists, send the Demand API escalation ask.
- [ ] If no contact exists, send the CJ support follow-up draft.
- [ ] Continue Partner Centre account setup.

## Missing Inputs

- Monthly sessions/users/pageviews.
- Search Console clicks/impressions if available.
- Primary traffic geography.
- Planned content volume for the next 90 days.
- Newsletter/social profiles, if any.
- CJ publisher ID.
- Awin publisher ID.
- Current Booking.com program statuses in CJ and Awin.

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
