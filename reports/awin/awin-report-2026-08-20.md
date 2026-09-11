# Awin Report — 2026-08-20

**BLUF:** No new approvals. All 17 approved programs are already in `AWIN_PARTNERS`, so no code change, build, or push was needed. 25 clicks over the last 7 days, zero transactions, $0.00 commission. Click totals are identical to yesterday's run, which is worth a look.

## Programs

- Approved (API): **17**
- In site config (`AWIN_PARTNERS`): **17 approved + 7 TODO placeholders** — every approved ID verified present
- Pending: **7**

### Pending programs

| ID | Program |
|----|---------|
| 5907 | Radisson Hotels (US) |
| 6394 | Travelzoo (US & Canada) |
| 32759 | Lovability (US) |
| 40028 | Greyhound Lines - US |
| 74246 | The Tour Guy |
| 112832 | Mytrip |
| 112834 | Gotogate |

Six of these seven already have `advertiserId: "TODO"` cards on the site (Radisson, Travelzoo, The Tour Guy, Mytrip, Gotogate, plus One Stop Parking which is not in any Awin relationship list). Those links fall back to direct URLs and earn nothing until approval lands.

## Commissions (last 7 days: 2026-08-13 to 2026-08-20)

- Transactions: **0**
- Earnings: **$0.00**
- 30-day check: also **0** transactions, $0.00

## Clicks / traffic (last 7 days)

Total: **25 clicks**, 0 impressions tracked, 16 of 17 advertisers with at least one click.

| Advertiser | Region | Clicks |
|---|---|---|
| Kiwi MX | MX | 6 |
| Sim Local LATAM | MX | 2 |
| NN Hotels | US | 2 |
| Campspot | US | 2 |
| Promeed | US | 2 |
| Xcaret Global | MX | 1 |
| Caesars Rewards | US | 1 |
| Station Casinos | US | 1 |
| Temptation Experience | US | 1 |
| GoWithGuide | US | 1 |
| Turbopass US | US | 1 |
| XTV | US | 1 |
| ShopRaise | US | 1 |
| b0arding.com | US | 1 |
| Swimply | US | 1 |
| eSimShop HongKong | US | 1 |
| ScholarTrip | US | 0 |

## Observations

- **Click numbers are byte-for-byte identical to the 2026-08-19 report** (25 total, Kiwi 6, same per-advertiser spread). Either genuinely no new traffic arrived in the last 24 hours, or Awin's advertiser report is lagging. If tomorrow's run is also 25, the reporting pipeline is the likelier culprit.
- **Kiwi.com is still the single strongest signal** at 6 of 25 clicks (24%). Flight intent keeps outperforming everything else in the portfolio. A dedicated flights section or a more prominent Kiwi CTA remains the highest-leverage change available with current inventory.
- **Conversion rate is 0 across 92+ lifetime clicks.** At this volume that is not yet statistically alarming, but it is the number to watch. Confirm at least one link end-to-end lands on the advertiser with tracking intact.
- The distribution is very flat (14 advertisers at exactly 1 click). That pattern usually means clicks are coming from the partner-grid page rather than contextual placements inside content, which converts worse.

## Recommendations

- Verify one Awin `cread.php` link manually end-to-end to rule out a tracking break as the cause of the zero-conversion streak.
- Give Kiwi.com contextual placement inside flight-related blog posts and destination pages rather than only the partner grid.
- `CLAUDE.md` still documents "9 approved partners" and "43 more pending." Both numbers are stale (actual: 17 approved, 7 pending). Worth a docs commit.
- Repo root has accumulated untracked scratch files from prior runs: `joined.json`, `pending.json`, `report.json`, `report_all.json`, `tx.json`, plus six `awin-report-*.md` files. Consider gitignoring the JSON and moving reports into a `reports/` directory.

## API notes

The `/reports/advertiser` endpoint rejects a comma-separated `region` list and rejects `HK` outright. It has to be called once per region code. This run queried `US`, `MX`, and `GB` (GB returned empty). Any future advertiser in an unqueried region would be invisible in the traffic table.
