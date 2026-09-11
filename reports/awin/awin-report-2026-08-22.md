# Awin Report — 2026-08-22

**BLUF:** No new approvals, so no partner code changes were needed. All 17 approved programs are already in `AWIN_PARTNERS`. Clicks fell to 13 over the rolling 7 days, but the day-by-day breakdown shows 6 fresh clicks on 08-21, which corrects the previous report's conclusion that traffic had gone to zero. Still $0.00 commission and zero transactions over the last 30 days.

## Programs

- Approved (API): **17**
- In site config (`AWIN_PARTNERS`): **17 approved + 7 TODO placeholders** — every approved advertiser ID verified present, none missing
- Pending: **7**
- New approvals this run: **none**

Pending list: Radisson Hotels (5907), Travelzoo (6394), Lovability (32759), Greyhound Lines (40028), The Tour Guy (74246), Mytrip (112832), Gotogate (112834).

## Commissions (last 7 and 30 days)

- Transactions, 7 days: **0**
- Transactions, 30 days: **0**
- Total earnings: **$0.00**

## Clicks / traffic (last 7 days)

Total: **13 clicks**, 0 impressions tracked, 8 advertisers with at least one click.

| Advertiser | Region | Clicks |
|---|---|---|
| Kiwi MX | MX | 4 |
| Campspot | US | 2 |
| Sim Local LATAM | MX | 2 |
| Caesars Rewards | US | 1 |
| NN Hotels | US | 1 |
| Promeed | US | 1 |
| Swimply | US | 1 |
| Xcaret Global | MX | 1 |

### Day-by-day (US + MX)

| Date | Clicks |
|---|---|
| 2026-08-13 | 1 |
| 2026-08-14 | 17 |
| 2026-08-15 | 3 |
| 2026-08-16 | 0 |
| 2026-08-17 | 2 |
| 2026-08-18 | 0 |
| 2026-08-19 | 2 |
| 2026-08-20 | 0 |
| 2026-08-21 | 6 |
| 2026-08-22 | 0 (partial day) |

The 08-21 clicks were spread one each across Caesars Rewards, Campspot, Swimply, Kiwi MX, Xcaret Global, and Sim Local LATAM.

## Notes

- **The "no new traffic" reading from the last three reports was wrong.** Pulling per-day numbers instead of only the rolling 7-day total shows traffic arriving in small bursts: 2 clicks on 08-17, 2 on 08-19, 6 on 08-21. The identical 7-day totals in the 08-19 and 08-20 reports were a coincidence of the window sliding, not a stalled pipeline. Future runs should keep the per-day pull.
- **The 7-day total dropped from 24 to 13 because the 08-14 spike (17 clicks) aged out of the window.** That single day is still the majority of all recent traffic. Worth finding out what drove it, since nothing since has come close.
- **Kiwi.com remains the strongest single advertiser** at 4 of 13 clicks (31%). Flight intent has led in every recent report.
- **Zero conversions across roughly 100 lifetime clicks.** At this volume that is not statistically alarming on its own, but the `cread.php` link path still has not been verified end to end. That verification has been recommended in five consecutive reports and remains open.
- The 08-21 spread of exactly one click per advertiser across six different advertisers is the signature of someone browsing the partner grid, not contextual in-content clicks. Grid traffic converts poorly.

## Changes made this run

- Updated `CLAUDE.md` to correct stale Awin figures: it said "9 approved partners" and "43 more programs pending," now corrected to the actual 17 approved (full table with IDs) and 7 pending (named with IDs). This had been flagged in several prior reports.
- **The commit could not be completed.** A stale `.git/index.lock` dated 2026-08-18 is blocking git in this repo, and the sandbox lacks permission to remove it. The `CLAUDE.md` edit is saved on disk but uncommitted. Delete `.git/index.lock` manually and commit.

## Recommendations

- **Delete the stale `.git/index.lock`.** It has been sitting since 08-18 and blocks all commits, including the automated ones this task would otherwise make.
- **Verify one `cread.php` link end to end.** Confirm it lands on the advertiser with `awinaffid=2793280` intact. Open across five reports now; the zero-conversion streak cannot be interpreted until this is ruled in or out.
- **Investigate the 08-14 spike.** 17 clicks in one day versus 0-6 on every other day. If that was a referral, a post that ranked, or a social share, it is the only repeatable acquisition signal in the data.
- **Compare against GA4 sessions.** 13 Awin clicks over 7 days is small enough that GA session counts would quickly show whether this is a traffic problem or a tracking problem.
- **Chase Mytrip (112832) and Gotogate (112834) in pending.** Both are flights, and flights are consistently the top click category.
- Acquisition remains the real constraint. Template-generated blog content caps organic reach; improving content quality would move revenue more than adding partners.

## API notes

- `/reports/advertiser` requires a single `region` parameter per call. It rejects comma-separated lists and rejects the `regionCodes` parameter name entirely. This run queried US, MX, GB, CA, and ES; only US and MX returned data. An advertiser in an unqueried region would be invisible here.
- `/transactions/` caps date ranges at 31 days.
