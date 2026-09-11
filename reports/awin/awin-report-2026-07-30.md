# Awin Affiliate Check — 2026-07-30

Automated scheduled run. Publisher ID 2793280. Window: 2026-07-23 to 2026-07-30 (UTC).

## Bottom line
- 17 joined programs on Awin; site now covers all of them plus Booking.com.
- 1 new approval found and added to the site: **ScholarTrip** (mid 95023).
- Code committed locally but **not pushed** — no GitHub credentials in the sandbox.
- 23 clicks in the last 7 days, 0 conversions, $0 commission.

## Programs: API vs site
| | Count |
|---|---|
| Joined (Awin API) | 17 |
| Pending (Awin API) | 7 |
| New approvals added to site this run | 1 (ScholarTrip) |

### Joined programs (all now in site)
Caesars Rewards (6145), NN Hotels (19428), Station Casinos (19995), Kiwi MX (20563), Campspot (22326), Temptation Experience (23093), Xcaret Global (34947), GoWithGuide US (87121), Sim Local LATAM (87123), ScholarTrip (95023 — NEW), Turbopass US (100613), Promeed (100833), XTV (110558), ShopRaise (115325), b0arding.com (116441), Swimply (117149), eSimShop HongKong (124780). Plus Booking.com (6776) managed separately.

### Pending programs (7)
- Radisson Hotels (5907) — already staged in site as TODO
- Travelzoo (6394) — already staged as TODO
- The Tour Guy (74246) — already staged as TODO
- Mytrip (112832) — already staged as TODO
- Gotogate (112834) — already staged as TODO
- Greyhound Lines US (40028) — travel-relevant, NOT yet staged in site
- Lovability (32759) — sexual-wellness brand, off-topic for the site; recommend declining

## Commissions (last 7 days)
No transactions. 0 transactions, $0.00 total earnings.

## Clicks / traffic (last 7 days, region US)
Total: **23 clicks**, 0 impressions, 0 conversions.

| Advertiser | Clicks |
|---|---|
| ShopRaise | 3 |
| eSimShop HongKong | 3 |
| Caesars Rewards | 2 |
| NN Hotels | 2 |
| Temptation Experience | 2 |
| Promeed | 2 |
| XTV | 2 |
| b0arding.com | 2 |
| Station Casinos | 1 |
| Campspot | 1 |
| GoWithGuide | 1 |
| Turbopass | 1 |
| Swimply | 1 |

## Actions taken
- Added ScholarTrip to AWIN_PARTNERS in src/lib/awin.ts (Flights category).
- TypeScript typecheck (tsc --noEmit) passed.
- Committed locally: 3867d29.

## Needs your attention
1. **Push the commit.** `git push origin main` from your machine (sandbox has no GitHub auth). Commit 3867d29 is waiting on main.
2. **Delete 3 stale git lock files** that OneDrive prevented removal of: `.git/HEAD.lock`, `.git/index.lock`, `.git/objects/maintenance.lock`. They are empty but may block local git until removed.
3. **Impressions read 0 everywhere** while clicks track fine — impression tracking likely isn't firing, though this doesn't affect commissions.
4. **"One Stop Parking"** is staged in the site as a TODO partner but does not appear in either the joined or pending API lists — verify its application status in the dashboard.
5. Consider pre-staging **Greyhound (40028)** as a TODO partner so it goes live the moment it's approved.
