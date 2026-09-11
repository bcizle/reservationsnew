# Awin Affiliate Check — 2026-08-18

Automated scheduled run. Publisher ID 2793280. Window: 2026-08-11 to 2026-08-18 (UTC).

## Bottom line

- **No new approvals.** 17 joined programs on Awin, all 17 already live in the site. No code changes needed, nothing committed.
- **The Booking.com fix from yesterday is live.** Homepage now serves 17 valid `awinmid` values and zero references to the dead advertiser 6776.
- 25 clicks in the last 7 days, 0 conversions, $0.00 commission. Also $0.00 over the last 30 days.
- Pending queue unchanged at 7 programs.

## Program status

| Metric | Count |
|---|---|
| Joined (Awin API) | 17 |
| In `AWIN_PARTNERS` with a real ID | 17 |
| Missing from site | 0 |
| Pending (Awin API) | 7 |

### Joined programs (all present in `src/lib/awin.ts`)

| ID | Program | Region |
|---|---|---|
| 6145 | Caesars Rewards: Hotels (Global) | US |
| 19428 | NN Hotels | US |
| 19995 | Station Casinos | US |
| 20563 | Kiwi MX | MX |
| 22326 | Campspot | US |
| 23093 | Temptation Experience | US |
| 34947 | Xcaret Global | MX |
| 87121 | GoWithGuide | US |
| 87123 | Sim Local LATAM | MX |
| 95023 | ScholarTrip | US |
| 100613 | Turbopass US | US |
| 100833 | Promeed | US |
| 110558 | XTV | US |
| 115325 | ShopRaise | US |
| 116441 | b0arding.com | US |
| 117149 | Swimply | US |
| 124780 | eSimShop HongKong | US |

### Pending programs (7, unchanged from last run)

| ID | Program | Region |
|---|---|---|
| 5907 | Radisson Hotels (US) | US |
| 6394 | Travelzoo (US & Canada) | US |
| 32759 | Lovability (US) | US |
| 40028 | Greyhound Lines - US | US |
| 74246 | The Tour Guy | US |
| 112832 | Mytrip | AR |
| 112834 | Gotogate | MX |

Radisson, Travelzoo, Mytrip, Gotogate, and The Tour Guy already have placeholder cards on the site with `advertiserId: "TODO"`, so they emit direct links until approval lands.

## Commissions (last 7 days, and last 30 days)

No transactions in either window. 0 transactions, **$0.00** confirmed and $0.00 pending across every advertiser.

## Clicks and traffic (2026-08-11 to 2026-08-18)

**Total: 25 clicks, 0 impressions, 0 conversions.**

| Program | Region | Clicks |
|---|---|---|
| Kiwi MX | MX | 6 |
| NN Hotels | US | 2 |
| Campspot | US | 2 |
| GoWithGuide | US | 2 |
| Sim Local LATAM | MX | 2 |
| Caesars Rewards | US | 1 |
| Station Casinos | US | 1 |
| Temptation Experience | US | 1 |
| Turbopass US | US | 1 |
| Promeed | US | 1 |
| XTV | US | 1 |
| ShopRaise | US | 1 |
| b0arding.com | US | 1 |
| Swimply | US | 1 |
| eSimShop HongKong | US | 1 |
| Xcaret Global | MX | 1 |

Down from 30 clicks the prior week. Impressions report as 0 across the board, which is expected since the site uses text and card links rather than Awin display creatives.

## Live site verification

`GET https://reservationsnew.com/` returns 200 and contains 17 distinct `awinmid` values, all matching joined advertiser IDs. No `awinmid=6776` anywhere in the rendered HTML, confirming yesterday's Booking.com repair deployed cleanly through Vercel.

## Recommendations

1. **Click volume is the real ceiling.** 25 clicks a week will not convert regardless of program mix. Traffic acquisition, not affiliate plumbing, is the binding constraint right now.
2. **Kiwi MX is the top click earner two weeks running** (6 of 25 clicks). It is a flight metasearch program and the closest substitute for the Booking.com flight path that just got unwrapped. Worth promoting it into the flight widget rather than leaving it as a partner card.
3. **Booking.com links now earn nothing.** They are plain referrals since advertiser 6776 is not available to this account. Either apply to Booking.com's own affiliate program directly, or shift hotel intent toward Campspot, NN Hotels, b0arding.com, and Caesars, which are joined and payable.
4. **Chase the pending queue.** Radisson (5907) and Travelzoo (6394) have been pending for weeks. Both are hotel and deals inventory that fits the site far better than eSIM and shopping programs. A follow-up message through the Awin dashboard is the only lever here.
5. **Repo housekeeping still open.** `joined.json`, `pending.json`, `report.json`, `report_all.json`, and `tx.json` remain untracked scratch files in the repo root. Left in place this run because the git index in this environment is read-only, but they should be deleted or gitignored.

## Notes on this run

- The `/reports/advertiser` endpoint requires the query parameter `region` (not `regionCode`), and only accepts one region per call. Pulled US and MX separately, which covers every joined program.
- No commits were made. Nothing in `src/lib/awin.ts` needed to change.
