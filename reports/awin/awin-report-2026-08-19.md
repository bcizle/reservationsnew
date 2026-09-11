# Awin Report — 2026-08-19

**BLUF:** No new approvals. All 17 approved programs are already live on the site, no code changes needed. 25 clicks in the last 7 days (92 over 30 days), zero transactions and zero commission to date.

## Programs

- Approved (API): **17**
- In site config (`AWIN_PARTNERS`): **17** — perfect match, nothing missing, nothing stale
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

## Commissions (last 7 days)

- Transactions: **0**
- Earnings: **$0.00**
- Also checked 30 days: still 0 transactions, $0.00

## Clicks / traffic (last 7 days)

Total: **25 clicks**, 0 impressions tracked.

| Advertiser | Region | Clicks |
|---|---|---|
| Kiwi MX | MX | 6 |
| Sim Local LATAM | MX | 2 |
| NN Hotels | US | 2 |
| GoWithGuide | US | 2 |
| Campspot | US | 2 |
| eSimShop HongKong | US | 1 |
| b0arding.com | US | 1 |
| Xcaret Global | MX | 1 |
| XTV | US | 1 |
| Turbopass US | US | 1 |
| Temptation Experience | US | 1 |
| Swimply | US | 1 |
| Station Casinos | US | 1 |
| ShopRaise | US | 1 |
| Promeed | US | 1 |
| Caesars Rewards | US | 1 |

### 30-day trend (92 clicks total)

Kiwi MX 19 · Sim Local 7 · ShopRaise 7 · NN Hotels 7 · GoWithGuide 6 · Caesars 6 · eSimShop 5 · b0arding 5 · XTV 5 · Turbopass 4 · Temptation 4 · Swimply 4 · Promeed 4 · Xcaret 3 · Station Casinos 3 · Campspot 3

Weekly pace (25) is roughly flat against the 30-day average (~21/week), so traffic is steady but not growing.

## Recommendations

- **Conversion is the problem, not traffic.** 92 clicks over 30 days with 0 transactions is unusual even at low volume. Worth spot-checking that the `cread.php` links land on a valid product page rather than a homepage bounce, and that the advertisers' cookie windows are actually firing.
- **Kiwi.com is the standout** at 19 of 92 clicks (21%). Flights are the demand signal here. Giving Kiwi more surface area (a flights section or dedicated CTA) is the highest-leverage change available with current inventory.
- **One Stop Parking has a card but no Awin application.** It appears in `AWIN_PARTNERS` with `advertiserId: "TODO"` but is in neither the joined nor the pending list. Either apply to the program or drop the card.
- **Greyhound Lines (40028) is pending and travel-relevant** but has no card in the codebase. Worth prepping a card so it can go live the moment it is approved.
- **ScholarTrip (95023) is approved and in code but returned no row** in the advertiser report for either region. Possibly a region-code gap in the report rather than a real issue, but zero clicks in 30 days suggests the card gets little visibility.
- **Booking.com (6776) remains unavailable** to this publisher account. Still falling back to a direct, non-commissioned link. Applying to an alternative major OTA program would close the biggest inventory gap.

## Notes on method

- The `/reports/advertiser` endpoint rejects an empty region list and does not accept a comma-separated list. Queried `region=US` and `region=MX` separately and merged. Worth encoding that in the scheduled task file.
- Transactions checked at both 7 and 30 days to confirm the empty result was not a range artifact.
