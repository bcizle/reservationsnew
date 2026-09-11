# Awin Report — 2026-08-21

**BLUF:** No new approvals, so no code change or push was needed. All 17 approved programs are already in `AWIN_PARTNERS`. Traffic dropped to 24 clicks in the rolling 7-day window, down from 25 the last two days, which means zero new clicks arrived and one old click aged out. Still $0.00 commission and zero transactions.

## Programs

- Approved (API): **17**
- In site config (`AWIN_PARTNERS`): **17 approved + 7 TODO placeholders** — every approved advertiser ID verified present
- Pending: **7**
- New approvals this run: **0**
- Code changes made: **none**

### Pending programs (7)

| Advertiser | ID |
|---|---|
| Radisson Hotels (US) | 5907 |
| Travelzoo (US & Canada) | 6394 |
| Lovability (US) | 32759 |
| Greyhound Lines - US | 40028 |
| The Tour Guy | 74246 |
| Mytrip | 112832 |
| Gotogate | 112834 |

Note: all 7 pending advertisers already have placeholder cards in `AWIN_PARTNERS` with `advertiserId: "TODO"` except Lovability and Greyhound. One Stop Parking has a TODO card but does not appear in either API relationship list, so that application may never have been submitted.

## Commissions (last 7 days)

- Transactions: **0**
- Total commission: **$0.00**

A 30-day lookback also returned zero transactions.

## Clicks / traffic (last 7 days)

Total: **24 clicks**, 0 impressions tracked, 16 advertisers with at least one click.

| Advertiser | Region | Clicks |
|---|---|---|
| Kiwi MX | MX | 5 |
| NN Hotels | US | 2 |
| Campspot | US | 2 |
| Promeed | US | 2 |
| Sim Local LATAM | MX | 2 |
| Caesars Rewards | US | 1 |
| Station Casinos | US | 1 |
| Temptation Experience | US | 1 |
| GoWithGuide US | US | 1 |
| Turbopass US | US | 1 |
| XTV | US | 1 |
| ShopRaise | US | 1 |
| b0arding.com | US | 1 |
| Swimply | US | 1 |
| eSimShop HongKong | US | 1 |
| Xcaret Global | MX | 1 |

## Analysis

- **Three consecutive days with no new clicks.** The 08-19 and 08-20 reports both showed 25 clicks with an identical per-advertiser spread. Today's 24 is the same spread minus one Kiwi click. That is exactly what a rolling 7-day window looks like when nothing new comes in. Yesterday's report floated reporting lag as an explanation; the drop to 24 argues against that, because a lagging pipeline would not shed an old click cleanly. The likelier read is that the site itself is getting little or no traffic right now.
- **Worth checking site traffic directly.** Google Analytics sessions for the last 7 days would settle whether this is an Awin tracking problem or an audience problem. If GA also shows near-zero sessions, the affiliate setup is fine and the bottleneck is acquisition.
- **Kiwi.com still leads** at 5 of 24 clicks (21%). Flight intent continues to be the strongest signal in the portfolio, consistent across every recent report.
- **Zero conversions across roughly 90+ lifetime clicks.** At this volume that is not yet statistically damning, but combined with a stalled click count it means there is no data coming in to learn from.

## Recommendations

- Pull GA4 session data for the last 7 days and compare against the 24 Awin clicks. This is the single most useful diagnostic right now and separates a traffic problem from a tracking problem.
- Manually click one `cread.php` link end to end and confirm it lands on the advertiser with the `awinaffid=2793280` parameter intact. This has been recommended in prior reports and remains unverified.
- Acquisition is the real constraint. The auto-generated blog posts are template-based and repetitive (documented tech debt), which caps organic search potential. Improving content quality would do more for revenue than adding more partners.
- `CLAUDE.md` still says "9 approved partners" and "43 more programs pending." Actual numbers are 17 approved and 7 pending. This has been flagged in multiple reports and is worth a one-line docs commit.
- Chase the two flight programs in pending (Mytrip 112832, Gotogate 112834). Given Kiwi's consistent lead, more flight inventory is the best-aligned expansion.

## API notes

The `/reports/advertiser` endpoint requires a single `region` value per call. Comma-separated lists, bracketed lists, and repeated params all return errors. This run queried US, MX, GB, and CA separately and merged the results.
