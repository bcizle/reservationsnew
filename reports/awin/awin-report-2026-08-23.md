# Awin Check — 2026-08-23

**BLUF:** No new approvals, so no partner code changes were needed. All 17 approved programs are already in `AWIN_PARTNERS`. Traffic is 10 clicks over the rolling 7 days with two consecutive zero days (08-22 and 08-23). Still $0.00 commission and zero transactions across the last 30 days. One process fix this run: the advertiser report parameter is `region`, not `regionCodes`, and prior runs were silently reading stale cached JSON files instead of live data.

---

## Programs

| | Count |
|---|---|
| Approved (API) | 17 |
| In `AWIN_PARTNERS` (site) | 17 |
| New approvals this run | 0 |
| Pending | 7 |

Approved and in code, all matched by advertiser ID: Caesars Rewards (6145), NN Hotels (19428), Station Casinos (19995), Kiwi MX (20563), Campspot (22326), Temptation Experience (23093), Xcaret Global (34947), GoWithGuide (87121), Sim Local LATAM (87123), ScholarTrip (95023), Turbopass US (100613), Promeed (100833), XTV (110558), ShopRaise (115325), b0arding.com (116441), Swimply (117149), eSimShop HongKong (124780).

Still pending, unchanged from last run: Radisson Hotels (5907), Travelzoo (6394), Lovability (32759), Greyhound Lines (40028), The Tour Guy (74246), Mytrip (112832), Gotogate (112834).

## Commissions

Zero. No transactions returned for the 7-day window, and none for the trailing 30 days either. Total earnings $0.00.

## Clicks and traffic, 2026-08-16 to 2026-08-23

Total: **10 clicks**, 0 impressions tracked, 7 advertisers with at least one click.

| Advertiser | Region | Clicks |
|---|---|---|
| Kiwi MX (20563) | MX | 3 |
| Campspot (22326) | US | 2 |
| Xcaret Global (34947) | MX | 1 |
| Sim Local LATAM (87123) | MX | 1 |
| Caesars Rewards (6145) | US | 1 |
| Promeed (100833) | US | 1 |
| Swimply (117149) | US | 1 |

Per day:

| Date | Clicks |
|---|---|
| 08-16 | 0 |
| 08-17 | 2 |
| 08-18 | 0 |
| 08-19 | 2 |
| 08-20 | 0 |
| 08-21 | 6 |
| 08-22 | 0 |
| 08-23 | 0 |

Only US and MX regions show any activity. GB, CA, ES, FR, DE, IT, NL, BR, AU and IE all returned empty.

## Findings

- **The advertiser report query in the task file is wrong.** `regionCodes` returns HTTP 400 with `invalid region code list`. The working parameter is `region`, one region code per request; comma-separated lists and bracket syntax both fail. The task file should be updated to loop `region=US` and `region=MX` at minimum.
- **Prior runs may have reported stale numbers.** Cached response files from earlier runs persisted in the scratch directory and could not be overwritten, so a parser that globbed those files read old data while the live calls were quietly failing with 400. This run confirmed the live figures independently with same-day queries.
- **A date-range quirk worth knowing:** `startDate=D&endDate=D+1` returns the same total as `startDate=D-1&endDate=D`, so multi-day windows double-count at the boundary. Use `startDate=D&endDate=D` for a single day. The per-day table above uses same-day queries.
- **Two consecutive zero-click days.** 08-22 and 08-23 both returned nothing. That is the first two-day gap in the recent data. Not alarming at this volume, but it means the 08-21 burst was a one-off rather than a new baseline.
- **Kiwi.com is still the leading advertiser** at 3 of 10 clicks. Flight intent has led every recent report.
- **Zero conversions on roughly 110 lifetime clicks.** The `cread.php` link path still has not been verified end to end. This has been open for six consecutive reports.

## Recommendations

- **Verify one affiliate link end to end.** Click a live `cread.php` link, confirm it lands on the merchant with the Awin cookie set, and confirm the click shows up in the Awin dashboard within 24 hours. Six reports of zero conversions on nonzero clicks justifies ruling out a tracking break before anything else.
- **Fix the scheduled task file** to use `region` instead of `regionCodes`, and have it write raw responses to a unique per-run directory so stale files cannot be picked up again.
- **Chase the 7 pending programs.** Radisson, Travelzoo, Mytrip and Gotogate are all directly on-theme for a travel comparison site and would add real inventory. Several have been pending for months; a nudge through the Awin dashboard is cheap.
- **Compare against GA4 sessions.** 10 Awin clicks over 7 days is small enough that session counts would quickly show whether this is a traffic problem or a tracking problem.
