# Awin Report — 2026-07-21

**Bottom line:** No new approvals to add. Booking.com (advertiser 6776) has **closed its Awin program as of 6/30/26**, which breaks the revenue path on the site's primary hotel, flight, and car widgets. That is the only action item that matters this week.

---

## Booking.com program closure

The Awin advertiser report now lists 6776 as **"Booking.com North America - Closed 6/30/26"**, and 6776 no longer appears in the `relationship=joined` programme list. It is still hardcoded in `src/lib/awin.ts` as a Featured Partner and is the backbone of `src/lib/booking.ts` (`buildBookingLink`, `buildBookingHomeLink`, `buildBookingCarLink`, `buildBookingFlightLink`) plus all three Booking widgets.

Effect: those links still resolve to Booking.com through `cread.php`, so users are not broken, but clicks will not be tracked or paid.

No code changes were made for this — reworking the site's primary booking integration is a bigger decision than a scheduled check should make unilaterally.

Options, roughly in order of effort:

- Apply to Booking.com's direct partner program or their replacement network and swap the tracker in `src/lib/booking.ts` (single choke point, so the change is contained)
- Promote an existing approved hotel partner into the Featured slot in the interim — `b0arding.com` (116441) and `NN Hotels` (19428) are the only approved hotel programs, and neither has the inventory breadth to replace Booking.com
- Keep the widgets pointing at Booking.com untracked and treat them as a UX feature rather than a revenue source

Also worth updating: the Booking.com affiliate disclosure language in the codebase, since the relationship no longer exists as described.

---

## Approved programs

**API `joined`: 16. Site `AWIN_PARTNERS` non-TODO entries: 17.** The extra one is Booking.com. Every currently approved program is already live on the site, so nothing was added.

| ID | Program |
|---|---|
| 6145 | Caesars Rewards: Hotels (Global) |
| 19428 | NN Hotels Affiliate Program (US) |
| 19995 | Station Casinos (US) |
| 20563 | Kiwi MX |
| 22326 | Campspot (US) |
| 23093 | Temptation Experience (US) |
| 34947 | Xcaret Global |
| 87121 | GoWithGuide US |
| 87123 | Sim Local LATAM |
| 100613 | Turbopass US |
| 100833 | Promeed |
| 110558 | XTV |
| 115325 | ShopRaise |
| 116441 | b0arding.com |
| 117149 | Swimply |
| 124780 | eSimShop HongKong |

## Pending programs (8)

| ID | Program | On site as TODO? |
|---|---|---|
| 5907 | Radisson Hotels (US) | yes |
| 6394 | Travelzoo (US & Canada) | yes |
| 32759 | Lovability (US) | no |
| 40028 | Greyhound Lines - US | no |
| 74246 | The Tour Guy | yes |
| 95023 | ScholarTrip | no |
| 112832 | Mytrip | yes |
| 112834 | Gotogate | yes |

`One Stop Parking` is on the site as a TODO placeholder but appears in neither the joined nor pending list — the application may have been declined or never submitted. Worth checking the dashboard.

Radisson (5907) is the one to chase. It is the closest thing to a Booking.com substitute in the pending queue.

## Commissions — last 7 days

**Zero.** No transactions returned for the 7-day window, and none for the 30-day window either. Total confirmed commission across all programs: $0.00.

## Clicks and traffic

Impressions report as 0 across the board, which is expected since the site uses text and card links rather than Awin display creatives.

**Last 7 days: 17 clicks**

| Program | Region | Clicks |
|---|---|---|
| Kiwi MX | MX | 6 |
| NN Hotels | US | 2 |
| Turbopass US | US | 2 |
| Caesars Rewards | US | 1 |
| Campspot | US | 1 |
| GoWithGuide US | US | 1 |
| ShopRaise | US | 1 |
| b0arding.com | US | 1 |
| Swimply | US | 1 |
| Sim Local LATAM | MX | 1 |

**Last 30 days: 144 clicks**, spread almost evenly at 7 to 9 clicks per program, with Kiwi MX at 19 as the clear outlier and Booking.com at 6.

That flat distribution across 16 programs is the tell: traffic is landing on the partner grid and clicking through roughly at random rather than arriving with booking intent. 144 clicks producing 0 conversions over 30 days is consistent with low-intent traffic, not with a tracking bug.

## Recommendations

- Resolve the Booking.com replacement. Everything else is noise until the primary hotel path earns again.
- Follow up on Radisson (5907) and Travelzoo (6394) in the Awin dashboard — both are hotel/deal inventory that partly covers the gap.
- Check why One Stop Parking is in the code but in neither API list.
- 144 clicks / 0 conversions over 30 days points at traffic quality, not attribution. The known tech debt items (static fake hotel prices on `/search`, template-generated blog content) are the likeliest culprits for visitors who click but do not book.

## Notes on method

- The `/reports/advertiser` endpoint rejects a missing or bracketed `region` parameter. It requires a single two-letter code per call, so the report was assembled by querying US, GB, MX, CA, DE, FR, ES, IE, IT, NL, PL, SE, BR separately. `HK` is not a valid region code for this endpoint despite eSimShop HongKong being a joined program — its clicks report under US.
- Transaction queries used full `YYYY-MM-DDTHH:MM:SS` timestamps, which the endpoint requires.
- No code changes were made and nothing was committed.
