# Daily Activity Log — ReservationsNew

> Maintained by Dispatch. Read by the nightly standup task.
> Newest entries first.

## 2026-06-01
- Auto-generated post: "Best Family Hotels in Cape Town" (commit da858af via github-actions).

## 2026-05-29
- **Xcaret Global added** as approved Awin partner — advertiserId 34947 (commit db4dce3). 17th approved partner.
- Auto-generated post: "Hidden Gems in San Francisco: Off-the-Beaten-Path Neighborhoods" (commit 74b27cc via github-actions).

## 2026-05-27
- Auto-generated post: "Cheapest Months to Visit Lisbon in 2026" (commit 04c5f04 via github-actions).

## 2026-05-25
- Auto-generated post: "Tokyo on a Budget: How to Spend Less Than $100 a Day" (commit 2127ce4 via github-actions).

## 2026-05-22
- Blog pipeline now at 13 posts. All Mon/Wed/Fri runs succeeding. First Friday post under new cadence expected today.

## 2026-05-21
- **Blog cadence bumped to 3x/week** (commit 05a5d6c): Cron changed from Mon/Thu to Mon/Wed/Fri at 9 AM UTC. ~156 posts/year.
- Auto-generated post: "How to Find Last Minute Hotel Deals in Cancun" (commit f8f601d via github-actions).

## 2026-05-18
- Auto-generated post: "Walking Tours of Los Angeles: Self-Guided Routes Locals Recommend" (commit 23547ff via github-actions).

## 2026-05-15
- **Content pipeline expanded** (commit 4cf8503): 18 new topic templates + 12 new cities = 1,344 unique combinations (~3+ years of content at 3x/week).

## 2026-05-14
- Auto-generated posts: Kyoto + Buenos Aires guides (commit ae7fec4 via github-actions).

## 2026-05-11
- Auto-generated post: Istanbul guide (via github-actions).

## 2026-05-07
- Auto-generated post: Budapest guide (commit b30f97c via github-actions).

## 2026-05-04
- Auto-generated post (commit 40a1e87 via github-actions).

## 2026-05-03
- **Kiwi.com (MX) added** as approved Awin partner — advertiserId 20563 (commit a0fcba5). 16th approved partner.
- AI blog pipeline continuing on schedule — 2 auto-generated posts published via GitHub Actions.

## 2026-05-01
- **TravelPayouts fully removed** — replaced with Booking.com car rental + flight links via Awin tracking (commit 9ac25e7). New BookingCarWidget + BookingFlightWidget. All 7 blog posts updated. Env vars cleaned up.
- **AI blog pipeline live** — Claude Haiku 4.5 generates unique travel content. GitHub Actions workflow fixed and tested. First AI post generated: "The Cheapest Months to Visit Cartagena in 2026" (673 words). Runs Mon + Thu at 9 AM UTC.
- Broken Unsplash image fixed on flights blog post
- GitHub Actions secrets configured: ANTHROPIC_API_KEY, BOOKING_AID

## 2026-04-29
- **BOOKING.COM APPROVED!** Full integration shipped (commit 71cda22):
  - buildBookingLink() utility with Awin tracking (mid=6776, affid=2793280)
  - Booking.com as #1 Featured Partner in AWIN_PARTNERS
  - Every destination page has "Search Hotels on Booking.com" CTA
  - Search page: "Hotel prices powered by Booking.com" trust signal
  - Blog posts: end-of-post Booking.com CTA
  - Affiliate disclosure updated with required Booking.com language
  - Homepage: Booking.com trust pill + Featured badge
  - Meta descriptions mention Booking.com
- GoWithGuide (87121) approved and added (commit 3e8d87e)
- Now 15 Awin partners (including Booking.com)

## 2026-04-27
- Awin check: Caesars Rewards Hotels (mid 6145) approved and added (commit b1dd98a)
- Total: 13 Awin partners approved, 16 pending, $0 commissions

## 2026-04-26
- **Booking.com approval prep** — major cleanup (commit cc50cf9):
  - Removed all 14 fictional hotel pages and /hotels routes (301 redirect to /destinations)
  - Search page rebuilt as Booking.com pass-through with live search CTA
  - About page rewritten with mission, partnerships, affiliate disclosure, contact info
  - Sitemap cleaned (removed /hotels URLs, added legal pages)
  - Footer links fixed (no more dead "Vacation Rentals" links)
  - Zero fake hotel names or prices anywhere on site
  - Build: 46 pages, zero errors

## 2026-04-18
- **Google Places photos + interactive maps** added (commit 25ca696):
  - Google Places API for hotel photo lookups with Unsplash fallback
  - Hotel maps (Maps Embed API) on detail pages
  - Destination maps (Maps JS API) with clickable hotel markers
  - PhotoGallery component with lightbox
- **New API key + autocomplete** (commit b1e5f85):
  - Switched to reservationsnew GCP project API key
  - Google Places Autocomplete on homepage "Where to?" search field
  - Shared Maps loader consolidated
  - NEXT_PUBLIC_GOOGLE_PLACES_API_KEY added to Vercel

## 2026-04-17
- **Content overhaul Phase 1-3** (75 pages shipped):
  - OptimizedImage component, next/image migration
  - 14 hotel detail pages with galleries, amenities, reviews, room cards
  - 12 destination pages (6 new: Barcelona, Rome, Lisbon, Bali, Bangkok, Amsterdam)
  - Search page with hotel cards and View Deal buttons
  - Dynamic OG images for all destinations and hotels
  - Partner logos section
  - Content/imagery overhaul plan created

## 2026-04-16
- ROADMAP.md and CLAUDE.md created for the repo
- Daily standup + Awin check scheduled tasks set up

## 2026-04-12
- Awin API integration: awin-api.ts + /api/awin endpoint
- AWIN_API_TOKEN added to Vercel

## 2026-04-11
- Awin affiliate integration: 45+ programs applied, initial 6 approved
- AwinPartners component, View Deal buttons, affiliate tracking links
- Vercel repo connection fixed (was pointed at wrong GitHub repo)
- NEXT_PUBLIC_AWIN_PUBLISHER_ID added to Vercel
- Site went from basic template to full affiliate site in one session
