# Awin Check — 2026-09-10

**Bottom line:** No new approvals. Site config is in sync (17/17). Zero commissions and zero transactions in the last 30 days despite 110 clicks.

## Programs

| State | Count | Notes |
|---|---|---|
| Joined (API) | 17 | Exact match to `AWIN_PARTNERS` real IDs |
| In site code with real ID | 17 | No drift |
| Pending | 6 | Was 7 — Travelzoo dropped off |
| Rejected | 32 | Includes Travelzoo (6394) |

### Pending (6)
- Radisson Hotels US (5907) — Hotels
- Lovability US (32759) — Health & Beauty
- Greyhound Lines US (40028) — Coaches
- The Tour Guy (74246) — Tours
- Mytrip (112832) — Airlines
- Gotogate (112834) — Airlines

## Traffic (advertiser report)

Note: the API rejects `regionCodes`; the working param is `region=US` (one call per region). Data below merges US + MX.

### Last 7 days — 19 clicks, 0 impressions, 0 conversions, $0.00
| Advertiser | Clicks |
|---|---|
| Kiwi MX (20563) | 6 |
| XTV (110558) | 3 |
| Campspot (22326) | 2 |
| GoWithGuide (87121) | 2 |
| b0arding.com (116441) | 2 |
| Sim Local LATAM (87123) | 1 |
| Caesars Rewards (6145) | 1 |
| NN Hotels (19428) | 1 |
| Station Casinos (19995) | 1 |

### Last 30 days — 110 clicks, 0 impressions, 0 transactions, $0.00
Top: Kiwi MX 26, Xcaret 8, Sim Local 7, Caesars 7, Campspot 7, XTV 7, GoWithGuide 6, b0arding 6, eSimShop 6, NN Hotels 5.

## Commissions
- Last 7 days: 0 transactions, $0.00
- Last 30 days: 0 transactions, $0.00

## Recommendations
- **Travelzoo card is dead.** 6394 is now in the rejected list, but `AWIN_PARTNERS` still ships a Travelzoo card with `advertiserId: "TODO"`. It sends untracked direct traffic. Either remove it or re-apply.
- **Zero conversions on 110 clicks needs attention.** Clicks are being recorded by Awin, so tracking links work; the drop-off is on the merchant side. Worth checking whether the traffic is bot/crawler and whether the landing pages match search intent.
- **Kiwi MX is 24% of all clicks** but is an MX-region program. If US users are clicking it, they may be landing on a mismatched storefront. Consider whether a US-region flights partner would convert better.
- **Chase the two flight programs.** Mytrip and Gotogate have been pending a while; flights is the highest-intent category on the site and currently has only Kiwi and ScholarTrip live.
- No code changes were made and nothing was committed.
