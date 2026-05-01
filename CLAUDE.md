# CLAUDE.md — ReservationsNew

Codebase context for Claude Code sessions. Read this first before making changes.

---

## 1. Project Overview

**ReservationsNew** (reservationsnew.com) is a travel price comparison and affiliate site. It helps users find and compare hotel, flight, and car rental deals across multiple booking platforms, earning revenue through affiliate commissions.

**Tech stack:**
- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5 (strict mode)
- Tailwind CSS 4 (PostCSS plugin)
- Deployed on Vercel
- GitHub repo: `bcizle/reservationsnew`

**No database.** All data is static (hardcoded destination data, JSON blog files). No auth, no user accounts, no backend state.

---

## 2. Architecture

```
src/
├── app/                          # Next.js App Router (pages + routes)
│   ├── layout.tsx                # Root layout (metadata, GA, fonts, structured data)
│   ├── page.tsx                  # Homepage (v1.0.1)
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # robots.txt config
│   ├── globals.css               # Tailwind theme (CSS custom properties)
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── blog/page.tsx             # Blog index (categories, post cards)
│   ├── blog/[slug]/page.tsx      # Dynamic blog post pages
│   ├── destinations/page.tsx     # Destination listing
│   ├── destinations/[slug]/page.tsx  # Dynamic destination pages
│   ├── search/page.tsx           # Search results (static hotel cards)
│   ├── privacy-policy/page.tsx
│   ├── terms-of-service/page.tsx
│   ├── cookie-policy/page.tsx
│   ├── affiliate-disclosure/page.tsx
│   └── components/
│       └── AwinPartners.tsx      # Awin partner showcase grid
├── components/                   # Shared components
│   ├── Header.tsx                # Sticky nav bar
│   ├── Footer.tsx                # 4-column footer
│   ├── GoogleAnalytics.tsx       # GA4 setup (env var gated)
│   ├── JsonLd.tsx                # Schema.org structured data
│   ├── SearchWidget.tsx          # Client-side search form
│   ├── BookingSearchWidget.tsx   # Booking.com hotel deep-link widget
│   ├── BookingFlightWidget.tsx   # Booking.com flights deep-link widget
│   ├── BookingCarWidget.tsx      # Booking.com car rentals deep-link widget
│   ├── AffiliateLink.tsx         # Affiliate link wrapper (GA event tracking)
│   └── AffiliateBanner.tsx       # Affiliate disclosure banner
└── lib/
    ├── awin.ts                   # Awin config, partner list, link builder
    └── blog.ts                   # Blog post loading (reads JSON from content/)

content/blog/                     # Blog post JSON files (6 posts)
scripts/generate-blog-post.ts     # Template-based blog post generator
.github/workflows/generate-content.yml  # Cron: Mon+Thu 9am UTC
```

**Path alias:** `@/*` maps to `./src/*` (tsconfig.json).

---

## 3. Working Features

- Homepage with hero, destination cards, deal types, Awin partner showcase, testimonials
- Search page with sample hotel cards and "View Deal" affiliate buttons
- 6 destination detail pages (NYC, Paris, Tokyo, London, Cancun, Dubai) with hotel/flight/car widgets
- 6 SEO blog posts with affiliate CTAs and related posts
- Awin affiliate integration: 9 approved partners with deep links
- Booking.com affiliate integration (hotels, flights, cars) via Awin tracking
- Affiliate click tracking via Google Analytics events
- Dynamic sitemap with all pages, destinations, and blog posts
- robots.txt (disallows /api/ and /search?)
- JSON-LD structured data (WebSite, Article, FAQ, Breadcrumb schemas)
- OpenGraph and Twitter Card meta tags on all pages
- Automated blog content pipeline (GitHub Actions, twice weekly)
- Legal pages: privacy policy, terms, cookie policy, affiliate disclosure
- About and contact pages

---

## 4. Key Data Patterns

**Destinations:** Hardcoded in each page component. No shared data file — destination data (name, country, highlights, tips, avg price, IATA code, FAQs) is defined inline in `src/app/destinations/[slug]/page.tsx`.

**Blog posts:** JSON files in `content/blog/`. Each file contains:
```typescript
{
  slug, title, excerpt, date, readTime, category, image, tags,
  content,  // markdown-like string (## and ### headers, **bold**)
  affiliateLinks: [{ label, url, provider }]
}
```
Loaded by `src/lib/blog.ts` — `getAllPosts()`, `getPostBySlug()`, `getRelatedPosts()`, `getAllCategories()`.

**Awin partners:** Defined in `src/lib/awin.ts` as `AWIN_PARTNERS` array. Each entry has `advertiserId` (Awin awinmid), `destinationUrl`, category, description, icon.

---

## 5. API Routes

None currently. All pages are statically rendered or use client-side affiliate link redirects. No `/api/` routes exist in the codebase.

---

## 6. Affiliate Integration Details

### Awin (Primary Network)
- **Publisher ID:** 2793280 (env: `NEXT_PUBLIC_AWIN_PUBLISHER_ID`)
- **9 approved partners** with verified advertiser IDs:
  | Partner | Advertiser ID | Category |
  |---------|--------------|----------|
  | XTV | 110558 | Entertainment |
  | b0arding.com | 116441 | Hotels |
  | Campspot | 22326 | Camping |
  | Sim Local LATAM | 87123 | Travel SIM |
  | eSimShop HK | 124780 | Travel eSIM |
  | ShopRaise | 115325 | Shopping |
  | Turbopass US | 100613 | City Passes |
  | Temptation Experience | 23093 | Resorts |
  | Promeed | 100833 | Travel Comfort |
- **43 more programs pending approval**
- **Link format:** `https://www.awin1.com/cread.php?awinmid={advertiserId}&awinaffid={publisherId}&ued={encodedUrl}`
- **Link builder:** `buildAwinLink()` in `src/lib/awin.ts` — falls back to direct URL if advertiserId is "TODO"

### Booking.com (via Awin)
- **Awin Publisher ID:** 2793280 (env: `NEXT_PUBLIC_AWIN_PUBLISHER_ID`)
- **Awin Advertiser ID:** 6776 (Booking.com)
- **Disclosure language:** "As a Booking.com Affiliate, I earn from qualifying transactions."
- **Link builders:** `src/lib/booking.ts` exports `buildBookingLink` (hotels), `buildBookingHomeLink` (Booking.com home), `buildBookingCarLink` (cars), `buildBookingFlightLink` (flights). All wrap the destination URL in the Awin `cread.php` tracker.
- **Components:** `BookingSearchWidget` (hotels), `BookingFlightWidget` (flights), `BookingCarWidget` (cars) — all client-side, all routed through Awin.
- **Optional aid:** `NEXT_PUBLIC_BOOKING_AID` is an additional Booking.com legacy param appended to the inner URL when set; Awin tracking is the primary attribution path.

### Affiliate Click Tracking
All affiliate links use the `AffiliateLink` component which fires GA events:
```typescript
gtag("event", "affiliate_click", {
  event_category: "affiliate",
  event_label: provider,  // e.g., "Booking.com", "Awin"
  affiliate_url: href
});
```

---

## 7. Environment Variables

```bash
NEXT_PUBLIC_BOOKING_AID              # Optional legacy Booking.com aid param (Awin handles primary attribution)
NEXT_PUBLIC_GA_MEASUREMENT_ID        # Google Analytics 4 measurement ID (G-XXXXXXXXXX)
NEXT_PUBLIC_SITE_URL                 # Site URL (default: https://reservationsnew.com)
NEXT_PUBLIC_AWIN_PUBLISHER_ID        # Awin publisher ID (default: 2793280)
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY    # Google Places (client-side) for autocomplete
GOOGLE_PLACES_API_KEY                # Google Places (server-side)
ANTHROPIC_API_KEY                    # Used by the blog generator workflow
```

All `NEXT_PUBLIC_*` vars are client-side accessible. See `.env.local.example` for template.

Vercel/GitHub Actions secrets: `BOOKING_AID`, `ANTHROPIC_API_KEY`.

---

## 8. Deployment

- **Platform:** Vercel (auto-deploy on push to `main`)
- **GitHub repo:** `bcizle/reservationsnew`
- **Domain:** reservationsnew.com
- **Build:** `next build` (standard Next.js)
- **Node version:** 20 (GitHub Actions), Vercel default
- **Image optimization:** Remote patterns for `images.unsplash.com` and `cf.bstatic.com`

---

## 9. Content Pipeline

**Automated blog generation** via GitHub Actions (`.github/workflows/generate-content.yml`):
- **Schedule:** Monday and Thursday at 9am UTC
- **Trigger:** Also supports `workflow_dispatch` (manual)
- **Process:**
  1. Runs `scripts/generate-blog-post.ts`
  2. Script picks a random topic template × city combination
  3. Generates a JSON blog post file in `content/blog/`
  4. Skips if the slug already exists (no duplicates)
  5. Commits to `main` with `[skip ci]` tag
  6. Push triggers Vercel auto-deploy

**Generator details** (`scripts/generate-blog-post.ts`):
- 10 topic templates (budget hotels, savings tips, travel guides, etc.)
- 36 city pool (Paris, London, Tokyo, NYC, Barcelona, Rome, etc.)
- Template-based (not AI-generated yet — content is repetitive)
- Includes Unsplash image mapping per city
- Outputs Awin-tracked Booking.com hotel + flight affiliate links

---

## 10. SEO Setup

- **Sitemap:** Dynamic via `src/app/sitemap.ts` — includes static pages, 12 destinations, all blog posts
- **robots.txt:** `src/app/robots.ts` — allows all except `/api/` and `/search?`
- **JSON-LD:** `src/components/JsonLd.tsx` — WebSite (homepage), Article (blog), FAQ (destinations), Breadcrumb
- **Meta tags:** Title templates, OpenGraph, Twitter Cards, canonical URLs on all pages
- **Images:** Unsplash for destinations, Booking.com CDN for hotel images

---

## 11. Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

**Design system:**
- Primary: `#0f4c75` (blue), Accent: `#e8553d` (orange)
- Inter font (next/font/google)
- Responsive: `sm:` and `lg:` breakpoints
- Rounded corners, hover shadows, gradient heroes

---

## 12. Known Issues / Tech Debt

1. **Static hotel data on search page** — search results show hardcoded sample hotels with fake prices, not real API data
2. **Template blog content** — auto-generated posts use string templates, content is repetitive and low quality
3. **Destination data not centralized** — each destination page has hardcoded data inline instead of a shared data file
4. **Sitemap lists 12 destinations but only 6 have detail pages** — Barcelona, Rome, Lisbon, Bali, Bangkok, Amsterdam are in the sitemap but 404
5. **No API routes** — all affiliate links are client-side; no server-side tracking or data fetching
6. **No test suite** — zero tests
7. **No error tracking** — no Sentry or similar
8. **Search form doesn't pass dates to affiliate links consistently** — some widgets ignore check-in/check-out params
