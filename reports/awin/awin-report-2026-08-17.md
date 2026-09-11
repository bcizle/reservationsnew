# Awin Affiliate Check — 2026-08-17

Automated scheduled run. Publisher ID 2793280. Window: 2026-08-10 to 2026-08-17 (UTC).

## Bottom line

- **No new approvals.** 17 joined programs on Awin, all 17 already in the site. Nothing to add.
- **Critical bug found and fixed:** Booking.com advertiser 6776 is not a valid relationship for this account. Every Booking.com link on the site returned "This link is inactive." Fixed, committed, and pushed as `1be5798` and `29bfd48`.
- The unpushed ScholarTrip commit from the 2026-07-30 run is now pushed too (`bb03477`).
- 30 clicks in the last 7 days, 0 conversions, $0.00 commission.

## The Booking.com problem

Booking.com is the site's primary conversion path: hotel, flight, and car widgets, homepage CTAs, destination pages, and 43 blog posts all funneled through `awinmid=6776`.

What the API says: advertiser 6776 appears in **none** of publisher 2793280's relationship lists. Not joined, not pending, not suspended, not rejected, and not in the 21,316-program `notjoined` catalog. It is not visible to this account at all.

What a live fetch returns:

```
GET https://www.awin1.com/cread.php?awinmid=6776&awinaffid=2793280&ued=<booking url>
→ 200 OK
  <body>This link is inactive.</body>
```

A control fetch against Campspot (22326) returned the real Campspot page, so the tracker itself is fine. Advertiser 6776 specifically is dead.

This means visitors clicking "Search Hotels" were landing on a blank error page, not Booking.com. That is a far bigger problem than lost commission, and it plausibly explains why click volume is steady while conversions have been zero for months.

### What was changed

| File | Change |
|---|---|
| `src/lib/booking.ts` | Awin wrapping now gated behind `NEXT_PUBLIC_BOOKING_AWIN_MID` (empty by default). Falls back to direct Booking.com URLs so links work. |
| `src/lib/awin.ts` | Booking.com partner card `advertiserId` set to `"TODO"` so `buildAwinLink` emits a direct link. Verified-ID list refreshed against the API. |
| `content/blog/*.json` | 101 dead `cread.php` links unwrapped across 51 posts, back to their underlying Booking.com URLs. |
| `scripts/generate-blog-post.ts` | Stops baking mid 6776 into newly generated posts. Reads `BOOKING_AWIN_MID` if you set one. |
| `about`, `affiliate-disclosure`, 3 widgets, `AffiliateBanner`, `page.tsx`, `blog/[slug]`, `destinations/[slug]` | Removed the "As a Booking.com Affiliate, we earn from qualifying transactions" claim in 9 places, plus 2 more "via our Awin affiliate link" captions. That relationship does not exist, and stating it is an FTC disclosure accuracy problem. Replaced with an accurate generic affiliate disclosure plus an explicit note that Booking.com links are plain referrals. Also dropped the "Featured Partner" badge from the Booking.com card, which earns nothing. |

Verified: `tsc --noEmit` clean, `next build` succeeds (84 static pages), and no `awinmid=6776` remains in any rendered HTML. Pushed to `main`, so Vercel is deploying.

A subagent audit of the first commit caught 8 blog posts that the rebase pulled in from `origin/main` after my initial pass, still carrying 16 dead links, plus two stale "via Awin" captions. Those are fixed in the follow-up commit `29bfd48`.

To restore tracking later, set `NEXT_PUBLIC_BOOKING_AWIN_MID` in Vercel to a confirmed advertiser ID. No code change needed.

## Programs: API vs site

| | Count |
|---|---|
| Joined (Awin API) | 17 |
| Already in site | 17 |
| New approvals this run | 0 |
| Pending (Awin API) | 7 |

### Joined programs

Caesars Rewards (6145), NN Hotels (19428), Station Casinos (19995), Kiwi MX (20563), Campspot (22326), Temptation Experience (23093), Xcaret Global (34947), GoWithGuide US (87121), Sim Local LATAM (87123), ScholarTrip (95023), Turbopass US (100613), Promeed (100833), XTV (110558), ShopRaise (115325), b0arding.com (116441), Swimply (117149), eSimShop HongKong (124780).

### Pending programs (7, unchanged from last run)

| Program | ID | Site status |
|---|---|---|
| Radisson Hotels | 5907 | staged as TODO |
| Travelzoo | 6394 | staged as TODO |
| Lovability | 32759 | not staged (off-topic, recommend declining) |
| Greyhound Lines US | 40028 | not staged |
| The Tour Guy | 74246 | staged as TODO |
| Mytrip | 112832 | staged as TODO |
| Gotogate | 112834 | staged as TODO |

None have moved in three weeks.

## Commissions (last 7 days)

No transactions. 0 transactions, **$0.00** total. Pending and confirmed commission both $0.00 across all advertisers.

## Clicks / traffic (last 7 days)

**30 clicks**, 0 impressions, 0 conversions. The API rejects multi-region queries, so US and MX were pulled separately and merged.

| Advertiser | Region | Clicks |
|---|---|---|
| Kiwi MX | MX | 7 |
| Sim Local LATAM | MX | 3 |
| GoWithGuide US | US | 3 |
| NN Hotels | US | 2 |
| Campspot | US | 2 |
| Temptation Experience | US | 2 |
| XTV | US | 2 |
| Xcaret Global | MX | 1 |
| Caesars Rewards | US | 1 |
| Station Casinos | US | 1 |
| Turbopass US | US | 1 |
| Promeed | US | 1 |
| ShopRaise | US | 1 |
| b0arding.com | US | 1 |
| Swimply | US | 1 |
| eSimShop HongKong | US | 1 |

Up from 23 clicks last week. Kiwi MX is now the single biggest click driver, which is notable given it was added recently.

## Recommendations

1. **Decide on hotels.** With Booking.com unavailable, the site has no hotel monetization on its main conversion path. Options, roughly in order of effort: apply to Booking.com's direct partner program at partner.booking.com (not Awin); promote b0arding.com (116441, already approved, Amadeus inventory) to the primary hotel widget; or apply to Expedia/Hotels.com via a different network. This is the highest-value open decision.
2. **Verify with Awin support** whether Booking.com is available to US publishers on this account at all. It is absent from the entire notjoined catalog, which suggests a regional or account-level restriction rather than a simple "not applied yet."
3. **Impressions still read 0** everywhere while clicks track normally. Same as last week. Doesn't affect commission, but the impression pixel appears not to fire.
4. **"One Stop Parking"** remains staged in the site as a TODO partner but appears in no API list. Either it was never applied for or the application vanished.
5. **Consider pre-staging Greyhound (40028)** so it goes live the moment it is approved.
6. **Repo housekeeping:** `joined.json`, `pending.json`, `report.json`, `report_all.json`, and `tx.json` are untracked scratch files sitting in the repo root from earlier runs. Safe to delete or gitignore.

## Actions taken

- Cleared 3 stale git lock files that had been blocking commits since 2026-07-30.
- Committed the Booking.com fix and rebased onto `origin/main`.
- Pushed `bb03477` (ScholarTrip, previously stuck), `1be5798` (the fix), and `29bfd48` (follow-up catch). Working tree clean, local and remote in sync.
- Ran an independent audit of the change before finalizing, which is what surfaced the 8 missed blog posts.
