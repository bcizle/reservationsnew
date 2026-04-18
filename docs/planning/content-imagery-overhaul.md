# Content & Imagery Overhaul

> Status: Planning
> Owner: Brent
> Created: 2026-04-17
> Design reference: https://www.guestreservations.com
> Goal: Transform reservationsnew.com from a template-looking scaffold into a visually rich, content-dense travel site that earns user trust on first scroll.

---

## 1. Why this plan exists

The site today is a functional affiliate shell: routes work, schemas render, Awin links fire GA events. But visually it reads as "generic Tailwind template + Unsplash stock." Guestreservations.com sets the bar we want to clear — rich property photography, per-hotel detail pages, immersive city heroes, consistent trust signals.

This document is a phased plan for getting there. Each phase is scoped so the work can be split into evening-sized Cowork sessions.

---

## 2. Audit findings (current state)

Full inventory is in the session that produced this doc. Key gaps:

| Gap | Evidence |
|---|---|
| All imagery is raw Unsplash hotlinks — zero brand differentiation | `src/app/page.tsx:16-53`, `src/app/destinations/page.tsx:9-58`, `content/blog/*.json` |
| `<img>` tags throughout; no `next/image`, no abstraction | All page components; only `images.unsplash.com` + `cf.bstatic.com` whitelisted in `next.config.ts:4-15` |
| Search page hotels are hardcoded fakes with no photos | `src/app/search/page.tsx:19-62, 137-176` — 6 `SAMPLE_HOTELS` with name/stars/price/description but no image field |
| One hero image per destination, no gallery, no map | `src/app/destinations/[slug]/page.tsx:13-169, 217` |
| No hotel detail pages exist | No `/hotels/[slug]` route — cards link straight to affiliate URLs |
| Testimonials hardcoded, faceless | `src/app/page.tsx:79-98` — Sarah M./James L./Priya K., no photos |
| Awin partners rendered as emoji icons | `src/lib/awin.ts:52-165`, `src/app/components/AwinPartners.tsx` |
| Trust section = 4 inline SVG checkmarks | `src/app/page.tsx:119-137` — no partner logos, no press mentions, no security badges |
| `public/` holds only 5 Next.js template SVGs | Nothing custom |

Structure-wise, blog and destination data models are fine — the problem is content and presentation, not architecture.

---

## 3. Image source strategy

Before designing phases, pick the sourcing strategy. Recommendation in **bold**.

| Source | Cost | License | Best for | Notes |
|---|---|---|---|---|
| **Unsplash API** | Free (50 req/hr demo, 5000/hr prod) | Unsplash License — free commercial use, attribution appreciated not required | City heroes, destination galleries, lifestyle/editorial shots | Already in use as hotlinks. Upgrade: fetch via API, cache URLs + photographer credit in our data layer, serve through `next/image`. |
| **Pexels API** | Free, unlimited | Pexels License — free commercial, no attribution | Same as Unsplash; good fallback/secondary pool | Different curation than Unsplash; diversifies look. |
| **Google Places Photos API** | Paid — $7 per 1000 after free tier | Google TOS — must display via their attribution | **Real hotel-specific photos** (exterior/lobby/rooms) | The only realistic way to get authentic per-property photos without a hotel API deal. Must keep attribution overlay. |
| Booking.com image feed | Requires affiliate API approval | Booking.com TOS — use with their widgets | Hotel photos tied to live inventory | Gated — needs Booking Affiliate Partner API access. Worth pursuing in parallel with Tier 1 "live hotel data" task. |
| **Cloudinary** | Free tier: 25GB storage, 25GB bandwidth/mo | — | CDN + on-the-fly transforms (resize, WebP/AVIF, blur placeholder) | Alternative: stay on `next/image` default Vercel optimizer. Vercel includes image optimization on Pro; free tier has limits. |
| AI generation (Midjourney, DALL·E, Flux) | Paid per image | Varies by platform | Unique hero graphics, blog illustrations, patterns | **Do not use for hotels or real destinations** — trust-killer if "the NYC skyline" is subtly wrong. Fine for abstract marketing visuals. |

**Recommended stack:**
- **Unsplash API** as primary for cities/destinations (free, high quality, already familiar).
- **Pexels API** as backup pool for variety.
- **Google Places Photos API** for per-hotel photography on detail pages (Phase 4).
- **`next/image` on Vercel's optimizer** for transforms. Revisit Cloudinary only if Vercel's image bandwidth becomes a cost issue.
- **No AI-generated travel photography.**

---

## 4. Phased plan

Each phase maps to one or more Cowork sessions. Sessions are sized for a 2–4 hour evening.

---

### Phase 1 — Image Infrastructure (foundation)

**Goal:** Stop using raw `<img>` tags and hotlinked Unsplash URLs. Establish one reusable image pipeline everyone else in this plan will build on.

**Work:**
- Replace all `<img>` with `next/image` across the site. Add `sizes` attributes matched to layout.
- Build a `<SiteImage>` wrapper component that:
  - Wraps `next/image` with our standard props (quality, placeholder, sizes defaults by variant).
  - Accepts a `variant` prop: `hero` / `card` / `thumbnail` / `gallery`.
  - Emits `blur` placeholder from a base64 seed (generate at build time or hardcode for known assets).
  - Accepts optional `credit` prop (photographer name + source) rendered as a small overlay.
- Define size standards in `src/lib/image-sizes.ts`:
  - Hero: 1920×1080 (display 2xl), srcset down to 640w.
  - Card: 640×480 (display lg), srcset down to 320w.
  - Thumbnail: 320×240.
  - Gallery: 1200×800 with 200×150 thumb.
- Extend `next.config.ts` `remotePatterns` to cover: `images.pexels.com`, `lh3.googleusercontent.com` (Google Places), any Cloudinary cloud name if adopted.
- Add a lightweight image manifest: `src/data/images/` with typed JSON per subject (city, blog slug, hotel id) storing `{ url, width, height, alt, credit, source }`. This makes attribution and swaps easy.

**Sessions (2):**
1. `<SiteImage>` component + size constants + `next/image` migration on homepage, destinations index, destinations detail.
2. `next/image` migration on blog index, blog detail, search, footer/header. Image manifest scaffold + type.

**Done when:** Lighthouse image-related warnings drop to zero on homepage. No raw `<img>` grep hits in `src/` except favicon/SVG.

---

### Phase 2 — Destination Page Imagery

**Goal:** Every destination feels like a place, not a card. Guestreservations does this with multi-image treatment + map.

**Work:**
- Build an Unsplash fetch script: `scripts/fetch-destination-images.ts` — for each destination slug, query Unsplash for curated photo IDs (landmarks, skyline, street life), save to `src/data/images/destinations/[slug].json` with URL, dimensions, alt, photographer credit.
- Redesign `src/app/destinations/[slug]/page.tsx` layout:
  - Full-bleed hero (1920×1080) with gradient overlay and city name.
  - New "At a glance" strip below hero — 3–5 thumbnail photos, click to open lightbox gallery.
  - Embed a map (Mapbox static tile first — cheapest; upgrade to interactive later).
  - Keep existing highlights/tips/FAQs/affiliate widgets.
- Centralize destination data into `src/data/destinations.ts`. Currently it's hardcoded inline in the detail page (`src/app/destinations/[slug]/page.tsx:13-169`). This is a known debt item in `CLAUDE.md` §12.3 — fold it into this phase.
- Build out the 6 missing destination detail pages listed in the sitemap but returning 404 (Barcelona, Rome, Lisbon, Bali, Bangkok, Amsterdam — see `CLAUDE.md` §12.4). Do this last in the phase, after the template is image-rich.

**Sessions (4):**
1. Centralize destination data into `src/data/destinations.ts`; no UI changes.
2. Unsplash fetch script + populate image manifests for 6 existing destinations.
3. Destination page layout rebuild — hero, gallery strip, lightbox, static map embed.
4. Author the 6 missing destination pages (Barcelona, Rome, Lisbon, Bali, Bangkok, Amsterdam) using the new template.

**Done when:** Each of the 12 destinations has a hero + ≥4-image gallery + map. Sitemap 404s are gone.

---

### Phase 3 — Hotel Card Imagery

**Goal:** Search results stop looking like a spreadsheet. Cards have real photos, pricing, and a visual hierarchy that matches guestreservations' listing rows.

**Work:**
- Extend the `SAMPLE_HOTELS` shape (`src/app/search/page.tsx:19-62`) with `image` (URL), `slug`, `location`, `rating` (numeric), `reviewCount`. This is a prep step even before live API data lands — cards need the shape.
- Seed 20–30 curated hotels across the 12 destinations with Unsplash photos tagged by room/lobby/exterior. Store in `src/data/hotels.ts`.
- Rebuild the hotel card component:
  - Large left-side photo (card variant, 640×480, `object-cover`).
  - Right side: name, star rating (render real stars, not emoji — `src/app/search/page.tsx:65-70` currently uses emoji), numeric rating badge, location, short description, price block with "from $X / night", CTA.
- Fallback strategy for hotels without a photo: generate a city-themed gradient tile with the hotel name — better than a broken image. Put this in `<SiteImage>` as a fallback behavior.
- When the Tier 1 "live Booking.com API" task lands, the card shape is ready. Until then, real-looking seeded data is a huge UX jump over what's there.

**Sessions (2):**
1. Hotel data shape + seed 20–30 hotels with photos, ratings, locations.
2. Rebuild hotel card component + search results layout + fallback tile.

**Done when:** `/search` shows photo-rich cards indistinguishable at a glance from guestreservations' listing rows.

---

### Phase 4 — Content Enrichment (hotel detail pages + richer destination content)

**Goal:** Build the guestreservations-style per-hotel detail page. This is the largest phase and the biggest leap in perceived legitimacy.

**Work:**
- New route: `src/app/hotels/[slug]/page.tsx`.
- Layout per hotel:
  - Hero gallery (5–8 photos, lightbox, swipeable on mobile).
  - Above-fold: name, star rating, review score, location, "Check availability" CTA that deep-links to Booking.com via `BookingSearchWidget`.
  - Amenities section with icon chips (WiFi, pool, gym, breakfast, parking, pet-friendly, etc.). Ship a small `<AmenityIcon>` component backed by lucide-react or heroicons.
  - Room types section (2–4 room cards with photo + description + price-from).
  - "Why book here" — 3 bullet callouts (curated per hotel).
  - Review snippets block (pull 3–5 curated quotes per hotel; structure allows later swap to real aggregate).
  - Nearby attractions: static list + distances, small map.
  - Breadcrumb: Home › Destinations › [City] › [Hotel].
  - JSON-LD `Hotel` schema via `src/components/JsonLd.tsx`.
- Google Places Photos API integration: per hotel, fetch 5–8 photos, cache URLs in the hotel data file, render through `<SiteImage>` with Google attribution overlay.
- Update hotel cards in search results to link to `/hotels/[slug]` instead of direct affiliate — affiliate CTAs live on the detail page. (Keep a fast-path affiliate button on the card for users who want one-click.)
- Add `/hotels/[slug]` URLs to `src/app/sitemap.ts`.
- Enrich destination pages in parallel with "Top hotels in [city]" section linking to these new detail pages.

**Sessions (5):**
1. `<AmenityIcon>` component + amenity taxonomy + hotel data schema extension.
2. `/hotels/[slug]/page.tsx` route + layout skeleton with seeded data (no Google Places yet).
3. Google Places Photos API integration — fetch script, caching, attribution rendering.
4. Room types, reviews, nearby attractions sections + JSON-LD schema + sitemap entry.
5. "Top hotels in [city]" section on destination pages + internal linking pass.

**Done when:** Each seeded hotel has a detail page at least as visually complete as a guestreservations property page. Destination pages link to their top hotels.

---

### Phase 5 — Trust & Polish

**Goal:** The last 10% that makes a polished site feel polished. Most of this is low-code but high-impact.

**Work:**
- **Partner logos strip.** Replace emoji Awin icons (`src/app/components/AwinPartners.tsx`, `src/lib/awin.ts:52-165`) with real partner logos. Download SVG/PNG from each advertiser's press kit; store in `public/partners/`. Lay out as a grayscale logo wall that colorizes on hover.
- **"As featured in" row.** Even if we don't have press yet, the pattern (major travel publications logo strip) is what legit sites show. Stub with Booking.com / Expedia / Hotels.com / Skyscanner / Kayak partner-network logos under an honest heading like "Compare deals from" rather than fake press.
- **Testimonials overhaul** (`src/app/page.tsx:79-98`): add avatars (Unsplash portrait category), add booking detail ("Saved $312 on a 5-night stay at the Park Central, NYC"), add a verified-via-Google-review badge style. Consider swapping to real Trustpilot/Google embed widget later.
- **Security/trust badges** near checkout CTAs: SSL padlock, "Secure checkout via [partner]", BBB-style accreditation row. Use real ones where honest (SSL is real), stock treatment for the category where needed.
- **Typography + spacing sweep:** audit heading scale, line-height, section padding across all pages. Guestreservations is visually calm — we're visually noisy. Tighten.
- **Favicon + OG images:** custom 512×512 favicon, OG template for destinations and hotels (generate via `@vercel/og`).

**Sessions (3):**
1. Partner logos + "Compare deals from" row.
2. Testimonials overhaul with avatars + verification styling.
3. Typography/spacing sweep + trust badges + OG image templates.

**Done when:** First-scroll impression passes the "does this look like a real business?" test.

---

## 5. Session summary

Total: **16 Cowork sessions** (~8 weeks at 2 sessions/week).

| Phase | Sessions | Output |
|---|---|---|
| 1 — Image Infrastructure | 2 | `<SiteImage>`, `next/image` everywhere, image manifest |
| 2 — Destination Imagery | 4 | 12 destinations, heroes + galleries + maps, centralized data |
| 3 — Hotel Card Imagery | 2 | Photo-rich search cards, fallback tiles |
| 4 — Content Enrichment | 5 | `/hotels/[slug]` detail pages, Google Places, schema |
| 5 — Trust & Polish | 3 | Real logos, testimonials, typography, OG |

---

## 6. Open questions / decisions for Brent

1. **Google Places Photos budget.** ~$7 per 1,000 photo refs. For 50 hotels × 8 photos = 400 refs per seeding pass. Trivial cost unless we scale to thousands of hotels. Approve?
2. **Cloudinary vs Vercel image optimizer.** Staying on Vercel is free and zero-ops. Cloudinary gives more transform control. Recommend default to Vercel; revisit only if bandwidth bills appear.
3. **Booking Affiliate Partner API.** Applying unlocks real photo feeds tied to live availability — removes the need for most Google Places calls. Worth applying in parallel with Phase 3; blocks nothing if rejected.
4. **Testimonials — fabricated vs. sourced.** Current testimonials are invented. Long-term we need real ones (Trustpilot widget, Google Reviews). Short-term in Phase 5: keep fabricated but believable, or leave blank until real reviews exist? Leaning toward a "Join our first users" stance rather than invented quotes.
5. **Lightbox library.** `yet-another-react-lightbox` is clean; rolling our own is ~100 lines. Preference?

---

## 7. Success criteria

- Homepage, destinations, and search pass a "squint test" against guestreservations — photo density, typography calm, trust signals visible.
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on mobile.
- Every hotel shown on the site has a detail page with ≥5 photos.
- Every destination has a hero + ≥4-image gallery + map.
- No raw `<img>` tags in `src/`.
- Partner section uses real logos, not emoji.
- GA `affiliate_click` events still fire (no regressions from the rebuild).
