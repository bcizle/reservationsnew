# Awin Check — 2026-09-11

**Bottom line:** No new approvals. Site is in sync at 17/17 joined programs. Still zero revenue: 19 clicks in 7 days, 110 in 30 days, 0 transactions, $0.00. One code change made — the dead Travelzoo card was removed.

## Programs

| State | Count | Notes |
|---|---|---|
| Joined (API) | 17 | Exact match to the real IDs in `AWIN_PARTNERS` |
| In site code with real ID | 17 | No drift, no new approvals to add |
| Pending | 6 | Unchanged from yesterday |
| Rejected | 32 | Includes Travelzoo (6394) |

### Pending (6)
- Radisson Hotels US (5907) — Hotels
- Lovability US (32759) — Health & Beauty
- Greyhound Lines US (40028) — Coaches
- The Tour Guy (74246) — Tours
- Mytrip (112832) — Airlines
- Gotogate (112834) — Airlines

## Traffic (advertiser report, US + MX merged)

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

Identical to yesterday's 7-day pull, which means no new clicks were recorded in the last 24 hours.

### Last 30 days — 110 clicks, 0 impressions, 0 transactions, $0.00

Top: Kiwi MX 26, Xcaret 8, Sim Local 7, Caesars 7, Campspot 7, XTV 7, GoWithGuide 6, b0arding 6, eSimShop 6, NN Hotels 5, Station Casinos 4, Temptation 4, Turbopass 4, Promeed 4, Swimply 4, ShopRaise 3, ScholarTrip 2.

## Commissions
- Last 7 days: 0 transactions, $0.00
- Last 30 days: 0 transactions, $0.00

## Changes made
Committed as `367a4a7` and pushed to `main`, which triggers a Vercel deploy.

- Removed the Travelzoo card from `AWIN_PARTNERS` in `src/lib/awin.ts`. The program is confirmed rejected, so the card was sending untracked direct traffic with no commission path.
- Updated the pending list in `CLAUDE.md` from 7 to the actual 6, and noted Travelzoo's rejection.
- Committed the backlog of `reports/` files that earlier scheduled runs had left untracked, plus the `.gitignore` entries for the Awin scratch JSON dumps.

### Build verification caveat
`npm run build` cannot complete in the automation sandbox. Two blockers, both environmental rather than code:

1. `.next/` holds `.fuse_hidden*` files the OneDrive mount will not let the sandbox unlink, so Next's clean step fails with `EPERM`.
2. `node_modules` was installed on Windows, so `lightningcss` is missing its Linux native binary and the CSS step dies on `globals.css`.

What was verified instead: `tsc --noEmit` passes clean, `eslint src/lib/awin.ts` passes clean, and a build against a scratch `distDir` compiled and emitted every route's server bundle before hitting the CSS step.

**Vercel confirmed the real build.** Deployment `dpl_8apNH9s8Tr1FKh17gFeakcMoZXe5` for commit `367a4a7` reached `READY` and is aliased to reservationsnew.com.

## API note for the skill file
Step 4 of the task (`reports/advertiser`) uses `regionCodes`, which the API rejects with `invalid region code list`. The working parameter is singular and single-valued: `region=US`. Multiple regions require one call per region. This run queried `US` and `MX` and merged the results.

## Recommendations
- **Zero conversions on 110 clicks is the real problem.** Awin is recording clicks, so the tracking links work. The failure is downstream. Two things worth ruling out: whether the click volume is crawler traffic rather than humans, and whether the partner mix matches what visitors actually came to the site for.
- **Kiwi MX is 24% of all clicks and is a Mexico-region program.** US visitors clicking through land on a mismatched storefront, which would explain a 0% conversion rate on the single biggest click source. Worth applying to a US-region flights advertiser.
- **Chase Mytrip and Gotogate.** Flights is the highest-intent category on the site and only Kiwi and ScholarTrip are live. Both have been pending long enough to justify a follow-up with the advertiser.
- **Five `TODO` cards remain** (Booking.com, Mytrip, Gotogate, Radisson, One Stop Parking, The Tour Guy). They render and link out but cannot earn. Fine as placeholders while the applications are open; Booking.com is the one worth re-checking since advertiser 6776 is not available to this publisher at all.
