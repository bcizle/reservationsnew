# ROADMAP.md — ReservationsNew

> Last updated: 2026-04-17
> Purpose: Guides Cowork sessions. Tasks are sized for daily sessions (1 task per session).
> Priority: Top-to-bottom. Work the next unchecked item unless Brent directs otherwise.
> Reference: `CLAUDE.md` for codebase context, `src/lib/awin.ts` for current affiliate partners.

---

## Tier 1: Revenue Optimization

These tasks directly increase affiliate click-through and conversion rates. Each one moves closer to real revenue.

- [ ] **Replace static hotel cards with live Booking.com API data**
  - Currently search results show hardcoded sample hotels with fake prices
  - Integrate Booking.com Affiliate API (or Rapid API Hotels) to fetch real availability and pricing
  - Display actual prices, ratings, availability, and real booking links
  - Keep existing `BookingSearchWidget` as fallback for destinations without API coverage
  - **Key files:** `src/app/search/page.tsx`, `src/components/BookingSearchWidget.tsx`
  - **Done when:** Search results show real hotel prices and clicking "View Deal" leads to a bookable page

- [ ] **Fix conversion flow: search → results → affiliate click**
  - Audit the full user journey from homepage search to affiliate click
  - SearchWidget currently navigates to `/search?destination=X` — ensure params pass through correctly
  - Add Booking.com deep links with check-in/check-out dates from the search form
  - Ensure every hotel card has a working affiliate link (not just the top cards)
  - **Key files:** `src/components/SearchWidget.tsx`, `src/app/search/page.tsx`, `src/components/AffiliateLink.tsx`
  - **Done when:** A user can search "Paris", see results, click "View Deal", and land on Booking.com with dates pre-filled

- [ ] **Add more affiliate networks (Viator, GetYourGuide, Klook)**
  - Sign up for Viator Partner API, GetYourGuide affiliate, Klook affiliate
  - Add activity/tour recommendations to destination pages (things to do section)
  - Wire affiliate links through `AffiliateLink` component for GA tracking
  - **Key files:** `src/app/destinations/[slug]/page.tsx`, `src/components/AffiliateLink.tsx`
  - **Done when:** Each destination page has 3-5 bookable activities from at least one activities partner

- [ ] **Activate 43 pending Awin programs**
  - Monitor Awin dashboard for newly approved programs
  - As approvals come in, add partners to `AWIN_PARTNERS` array in `src/lib/awin.ts`
  - Prioritize travel-relevant programs (hotels, flights, insurance, car rentals)
  - The daily scheduled task checks for new approvals — review its output
  - **Key files:** `src/lib/awin.ts`, `src/app/components/AwinPartners.tsx`
  - **Done when:** All approved Awin programs are integrated with working affiliate links

- [ ] **A/B test CTA button copy and placement**
  - Test "View Deal" vs "Check Prices" vs "See Availability" on hotel cards
  - Test CTA placement: inline vs sticky bottom bar on destination pages
  - Implement simple A/B test using URL params or localStorage (no external tool needed)
  - Track variant performance via GA events (already tracking `affiliate_click`)
  - **Key files:** `src/app/search/page.tsx`, `src/app/destinations/[slug]/page.tsx`, `src/components/AffiliateLink.tsx`
  - **Done when:** Two variants are running and click-through data is visible in GA

- [ ] **Add travel insurance affiliate (World Nomads or SafetyWing)**
  - Sign up for travel insurance affiliate program
  - Add insurance CTA to destination pages and blog posts about international travel
  - Create a dedicated "Travel Insurance" comparison section or page
  - **Key files:** `src/app/destinations/[slug]/page.tsx`, new component
  - **Done when:** Insurance affiliate links appear on relevant pages with tracking

---

## Tier 2: Content & SEO

Content pipeline improvements and SEO hardening to increase organic traffic.

- [ ] **Content & imagery overhaul (guestreservations.com-level polish)**
  - Full plan: [`docs/planning/content-imagery-overhaul.md`](docs/planning/content-imagery-overhaul.md)
  - Replace placeholder/stock imagery across the site with real, photo-dense content; add per-hotel detail pages, galleries, maps, and real trust signals. Design reference: guestreservations.com.
  - Scoped as 5 phases / 16 Cowork sessions. Work them in order — each depends on the previous.
  - **Phase 1 — Image Infrastructure** (2 sessions)
    - [ ] Build `<SiteImage>` wrapper + size constants + `next/image` migration (homepage, destinations)
    - [ ] Finish `next/image` migration (blog, search, header/footer) + image manifest scaffold
  - **Phase 2 — Destination Page Imagery** (4 sessions)
    - [ ] Centralize destination data into `src/data/destinations.ts` (removes tech debt from `CLAUDE.md` §12.3)
    - [ ] Unsplash fetch script + image manifests for 6 existing destinations
    - [ ] Rebuild destination page: full-bleed hero, gallery strip, lightbox, static map embed
    - [ ] Build 6 missing destination pages (Barcelona, Rome, Lisbon, Bali, Bangkok, Amsterdam) — clears `CLAUDE.md` §12.4
  - **Phase 3 — Hotel Card Imagery** (2 sessions)
    - [ ] Extend hotel data shape (image, slug, location, rating, reviewCount) + seed 20–30 hotels
    - [ ] Rebuild hotel card layout with real photo, numeric rating, price block, fallback tile
  - **Phase 4 — Content Enrichment: hotel detail pages** (5 sessions)
    - [ ] `<AmenityIcon>` component + amenity taxonomy + extended hotel schema
    - [ ] New `/hotels/[slug]` route + layout skeleton with seeded data
    - [ ] Google Places Photos API integration (5–8 photos/hotel, cached, with attribution)
    - [ ] Rooms / reviews / nearby attractions sections + JSON-LD `Hotel` schema + sitemap entries
    - [ ] "Top hotels in [city]" section on destination pages + internal linking pass
  - **Phase 5 — Trust & Polish** (3 sessions)
    - [ ] Real partner logos (replace emoji in `AwinPartners.tsx`) + "Compare deals from" logo row
    - [ ] Testimonials overhaul — avatars, booking detail, verification styling
    - [ ] Typography/spacing sweep + trust badges + `@vercel/og` image templates
  - **Done when:** Site passes the "squint test" against guestreservations.com; Lighthouse mobile Performance ≥ 90 / A11y ≥ 95 / SEO ≥ 95; every hotel has a detail page with ≥5 photos; no raw `<img>` tags remain in `src/`.

- [ ] **Upgrade blog generator from templates to AI-generated content**
  - Current `scripts/generate-blog-post.ts` uses template strings — content is repetitive
  - Integrate Claude API or OpenAI to generate unique, high-quality posts
  - Add keyword targeting: pass target keyword to the generator, optimize title/headings/content
  - Keep the Monday/Thursday GitHub Actions schedule
  - **Key files:** `scripts/generate-blog-post.ts`, `.github/workflows/generate-content.yml`
  - **Done when:** Generated posts read as unique, helpful content (not obvious templates)

- [ ] **Add 12 more destination pages (cover top 20 travel cities)**
  - Currently have 6 destination detail pages (NYC, Paris, Tokyo, London, Cancun, Dubai)
  - Sitemap already lists 12 destinations — build out Barcelona, Rome, Lisbon, Bali, Bangkok, Amsterdam
  - Each page needs: hero, quick stats, hotel search widget, flight widget, highlights, tips, FAQs
  - **Key files:** `src/app/destinations/[slug]/page.tsx`, `src/app/sitemap.ts`
  - **Done when:** All 12 sitemap destinations have fully-built detail pages

- [ ] **Add internal linking between blog posts and destinations**
  - Blog posts should link to relevant destination pages (e.g., "best hotels in Paris" → `/destinations/paris`)
  - Destination pages should link to related blog posts
  - Add "Related Destinations" section to blog posts, "Related Articles" section to destination pages
  - **Key files:** `src/app/blog/[slug]/page.tsx`, `src/app/destinations/[slug]/page.tsx`, `src/lib/blog.ts`
  - **Done when:** Every blog post links to at least 1 destination, every destination links to at least 1 blog post

- [ ] **Keyword research and content gap analysis**
  - Use Google Search Console (once connected) or free tools to find high-volume travel keywords
  - Create a content calendar targeting: "cheap hotels in [city]", "best time to visit [city]", "[city] travel guide 2026"
  - Update blog generator topic templates to target these keywords
  - **Key files:** `scripts/generate-blog-post.ts`
  - **Done when:** Content calendar exists with 20+ target keywords mapped to planned posts

- [ ] **Add Google Search Console verification**
  - Add verification meta tag or DNS record
  - Submit sitemap URL to Search Console
  - Monitor indexing status and fix any crawl errors
  - **Key files:** `src/app/layout.tsx` (for meta tag verification)
  - **Done when:** Site is verified in Search Console and sitemap is submitted

- [ ] **Optimize page load speed and Core Web Vitals**
  - Audit with Lighthouse and PageSpeed Insights
  - Optimize images: add proper `sizes` attribute, use next/image `priority` on above-fold images
  - Lazy-load below-fold affiliate widgets (Booking.com flight/car widgets, Awin scripts)
  - **Key files:** `src/app/layout.tsx`, all page components
  - **Done when:** Lighthouse performance score is 90+ on mobile

---

## Tier 3: Platform Features

Features that increase user retention and repeat visits.

- [ ] **Email newsletter signup with travel deals**
  - Add email capture form to homepage, blog posts, and destination pages
  - Integrate with email service (Resend, ConvertKit, or Mailchimp)
  - Set up weekly automated email with new blog posts and top deals
  - **Key files:** new component, `src/app/layout.tsx` or page-level integration
  - **Done when:** Users can subscribe, and a weekly email sends automatically

- [ ] **User accounts with saved searches**
  - Add NextAuth.js with email/Google login
  - Save search history (destination, dates, filters)
  - "Save this search" button on search results page
  - **Key files:** new `src/app/api/auth/` routes, `src/app/search/page.tsx`
  - **Done when:** Users can sign in, save a search, and see it on their dashboard

- [ ] **Price alerts (email when prices drop)**
  - Requires: user accounts + live hotel API data (Tier 1 tasks)
  - User sets alert: "Notify me when Paris hotels under $150/night"
  - Cron job checks prices daily, sends email via newsletter service when threshold met
  - **Key files:** new cron route, new alert model
  - **Done when:** A user can set an alert and receive an email when the condition triggers

- [ ] **User reviews and ratings**
  - Let users rate destinations and hotels they've booked through the site
  - Display average ratings on destination pages and search results
  - Generates unique content (good for SEO)
  - **Key files:** `src/app/destinations/[slug]/page.tsx`, new review component
  - **Done when:** Users can submit reviews and see aggregate ratings

- [ ] **Multi-currency support**
  - Auto-detect user location via IP or browser locale
  - Show prices in user's local currency
  - Currency selector in header
  - **Key files:** `src/components/Header.tsx`, all price display components
  - **Done when:** Users outside the US see prices in their local currency

---

## Tier 4: Growth

Longer-term features that expand reach. Each requires its own planning pass.

- [ ] **Mobile optimization audit and PWA**
  - Ensure all pages are fully responsive (test on real devices)
  - Add PWA manifest for "Add to Home Screen" support
  - Offline fallback page
  - **Key files:** `src/app/layout.tsx`, new `manifest.json`
  - **Done when:** Site passes mobile usability test, PWA installs on mobile

- [ ] **Social media integration**
  - Auto-post new blog articles to Twitter/X and Facebook
  - Add social share buttons to blog posts and destination pages
  - Create shareable deal cards (OG image generation)
  - **Key files:** `.github/workflows/generate-content.yml`, blog page components
  - **Done when:** New blog posts auto-share to at least one social platform

- [ ] **Paid advertising setup (Google Ads)**
  - Create Google Ads campaigns targeting high-intent travel keywords
  - Landing pages optimized for paid traffic (minimal navigation, strong CTA)
  - Track ROAS: ad spend vs affiliate commission earned
  - **Done when:** At least one campaign is running with positive ROAS tracking

- [ ] **Strategic partnerships**
  - Reach out to travel bloggers and influencers for guest posts and backlinks
  - Partner with travel agencies for co-branded content
  - Explore white-label hotel search widget for other travel sites
  - **Done when:** At least one partnership is active generating referral traffic

---

## Not-in-v1 (Deferred with Trigger Conditions)

| Item | Trigger to reconsider |
|------|----------------------|
| Hotel booking engine (direct bookings) | Affiliate commission > $1k/mo and hotel API integration stable |
| Flight booking engine | Hotel affiliate revenue proven, >10k monthly visitors |
| Mobile app (React Native) | >50k monthly visitors, PWA engagement data shows demand |
| AI travel assistant / chatbot | User accounts active, search data sufficient for personalization |
| Multi-language support (i18n) | >20% traffic from non-English countries |
| Loyalty / rewards program | >1k registered users with repeat bookings |
