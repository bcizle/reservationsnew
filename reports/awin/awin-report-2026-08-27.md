# Awin Check — 2026-08-27

**Bottom line:** No new approvals. Site config is fully in sync with the API (17 approved, 17 in code). 44 clicks in the last 7 days, 0 conversions, $0.00 commission.

---

## Program status

| | API | Site (`src/lib/awin.ts`) |
|---|---|---|
| Approved (joined) | 17 | 17 |
| Pending | 7 | 6 listed as TODO cards |

**No newly approved programs.** No code changes were required, so nothing was committed or pushed.

### Approved (17)

6145 Caesars Rewards · 19428 NN Hotels · 19995 Station Casinos · 20563 Kiwi MX · 22326 Campspot · 23093 Temptation Experience · 34947 Xcaret Global · 87121 GoWithGuide · 87123 Sim Local LATAM · 95023 ScholarTrip · 100613 Turbopass US · 100833 Promeed · 110558 XTV · 115325 ShopRaise · 116441 b0arding.com · 117149 Swimply · 124780 eSimShop HK

All 17 present in `AWIN_PARTNERS` with matching advertiser IDs.

### Pending (7)

5907 Radisson Hotels · 6394 Travelzoo · 32759 Lovability · 40028 Greyhound Lines · 74246 The Tour Guy · 112832 Mytrip · 112834 Gotogate

Unchanged from last check. All still sitting in "pending" with no movement.

---

## Commissions (last 7 days: Aug 20–27)

- Transactions: **0**
- Total commission: **$0.00**
- 30-day check also returned 0 transactions.

---

## Clicks / traffic

### Last 7 days — 44 clicks total, 0 impressions, 0 conversions

| Advertiser | Region | Clicks |
|---|---|---|
| Kiwi MX | MX | 5 |
| Sim Local LATAM | MX | 4 |
| eSimShop HongKong | US | 3 |
| Xcaret Global | MX | 3 |
| Swimply | US | 3 |
| Campspot | US | 3 |
| Caesars Rewards | US | 3 |
| b0arding.com | US | 2 |
| XTV | US | 2 |
| Turbopass US | US | 2 |
| Temptation Experience | US | 2 |
| Station Casinos | US | 2 |
| ShopRaise | US | 2 |
| ScholarTrip | US | 2 |
| Promeed | US | 2 |
| NN Hotels | US | 2 |
| GoWithGuide | US | 2 |

### Last 30 days — 95 clicks total, 0 conversions

Top: Kiwi MX (18), Sim Local LATAM (8), GoWithGuide (6), Caesars Rewards (6), eSimShop HK (5), XTV (5), Swimply (5), ShopRaise (5), Promeed (5), NN Hotels (5), Campspot (5).

---

## Observations & recommendations

- **Clicks are flat and evenly spread.** 44 clicks across 17 advertisers over a week, most sitting at 2 to 3 each. That distribution looks like partner-grid browsing rather than intent-driven traffic. The grid is doing its job as a directory but not funneling anyone.
- **Zero conversions on 95 clicks over 30 days.** Sample size is still too small to call a conversion-rate problem, but it is worth watching. If the next 30 days add another ~100 clicks with no transactions, suspect attribution rather than bad luck.
- **Impressions report 0 across the board.** Awin only counts impressions for served creative (banners/display). Since the site uses text and card deep links, this is expected, not a tracking failure.
- **Kiwi MX is the clear leader** (18 of 95 clicks, ~19%). Worth giving it more prominent placement or building a flight-focused page around it.
- **7 programs still pending, several for months.** Radisson, Travelzoo, Greyhound, and The Tour Guy have not moved. Recommend messaging those advertisers directly through the Awin dashboard, or dropping the stale cards so the grid isn't padded with links that earn nothing.
- **Booking.com (6776) remains unavailable** to publisher 2793280 — absent from every relationship list. Its card still falls back to a direct link and earns nothing. Either apply to the program formally or replace the card with an approved hotel partner (b0arding.com or NN Hotels).

---

## Notes on API usage

The `/reports/advertiser` endpoint requires `region=XX` (singular, one region code per call). `regionCodes=` and comma-separated lists both return a 400. Data was gathered by looping single-region calls across US, GB, CA, MX, BR, DE, FR, ES, IT, NL, IE, AU, HK, SG, PL, SE.
