/**
 * AI Blog Post Generator for ReservationsNew
 *
 * Usage: npx ts-node scripts/generate-blog-post.ts
 *
 * Generates SEO-optimized travel blog posts using the Anthropic Claude API
 * (Haiku 4.5) and saves them as JSON files in content/blog/.
 *
 * Falls back to a template-based post if ANTHROPIC_API_KEY is missing or
 * the API call fails — the cron should never fail silently.
 *
 * Env vars:
 * - ANTHROPIC_API_KEY (required for AI generation; absent → template fallback)
 *
 * Affiliate links are pre-baked Awin-tracked Booking.com deep links
 * (Awin Publisher 2793280, Booking.com Advertiser 6776) — no env-var
 * substitution needed at generation time.
 */

import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

// ============================================================
// CONFIGURATION
// ============================================================

const AWIN_PUBLISHER_ID = "2793280";
const BOOKING_AWIN_ADVERTISER_ID = "6776";

function awinBookingLink(bookingPath: string, label: string): string {
  const sep = bookingPath.includes("?") ? "&" : "?";
  const bookingUrl = `https://www.booking.com${bookingPath}${sep}label=${label}`;
  return `https://www.awin1.com/cread.php?awinmid=${BOOKING_AWIN_ADVERTISER_ID}&awinaffid=${AWIN_PUBLISHER_ID}&ued=${encodeURIComponent(
    bookingUrl,
  )}`;
}

const VALID_CATEGORIES = [
  "Hotel Tips",
  "Destinations",
  "Travel Guides",
  "Budget Travel",
  "Flight Tips",
  "Car Rental",
] as const;

// Template tags are documentation only — the Anthropic call generates its
// own tag list. They stay here so a future fallback path (or a human
// editor) has a sensible starting point.
const TOPIC_TEMPLATES = [
  { template: "Best Budget Hotels in {city} for {year}", category: "Destinations", tags: ["hotels", "budget", "{city_tag}"] },
  { template: "How to Save Money on Hotels in {city}", category: "Hotel Tips", tags: ["savings", "hotels", "{city_tag}"] },
  { template: "{city} Travel Guide: Where to Stay, Eat, and Explore", category: "Travel Guides", tags: ["travel-guide", "{city_tag}", "restaurants", "attractions"] },
  { template: "Cheapest Months to Visit {city} in {year}", category: "Budget Travel", tags: ["budget", "timing", "{city_tag}"] },
  { template: "Top 5 Neighborhoods to Stay in {city}", category: "Destinations", tags: ["hotels", "neighborhoods", "{city_tag}"] },
  { template: "Weekend Getaway: 3 Days in {city}", category: "Travel Guides", tags: ["weekend-trip", "{city_tag}", "itinerary"] },
  { template: "First-Timer's Guide to {city}: Hotels, Food, and Must-Sees", category: "Travel Guides", tags: ["first-time", "{city_tag}", "guide"] },
  { template: "Best Hotels Near the Airport in {city}", category: "Destinations", tags: ["airport-hotels", "{city_tag}", "convenience"] },
  { template: "Romantic Hotels in {city} for Couples", category: "Destinations", tags: ["couples", "romantic", "{city_tag}"] },
  { template: "Best Family Hotels in {city}", category: "Destinations", tags: ["family", "kids", "{city_tag}"] },
  { template: "Hidden Gems in {city}: Off-the-Beaten-Path Neighborhoods", category: "Destinations", tags: ["hidden-gems", "neighborhoods", "{city_tag}"] },
  { template: "{city} on a Budget: How to Spend Less Than $100 a Day", category: "Budget Travel", tags: ["budget", "daily-spend", "{city_tag}"] },
  { template: "Best Time of Year to Visit {city}", category: "Travel Guides", tags: ["timing", "seasons", "weather", "{city_tag}"] },
  { template: "Solo Travel Guide to {city}: Where to Stay and What to Do", category: "Travel Guides", tags: ["solo-travel", "safety", "{city_tag}"] },
  { template: "Where to Eat in {city} Without Breaking the Bank", category: "Budget Travel", tags: ["food", "budget", "restaurants", "{city_tag}"] },
  { template: "Public Transit Guide to {city} for Tourists", category: "Travel Guides", tags: ["transit", "transport", "{city_tag}"] },
  { template: "Best Day Trips from {city}", category: "Travel Guides", tags: ["day-trips", "excursions", "{city_tag}"] },
  { template: "How to Find Last-Minute Hotel Deals in {city}", category: "Hotel Tips", tags: ["last-minute", "deals", "hotels", "{city_tag}"] },
  { template: "Digital Nomad Guide to {city}: Coworking and Coffee", category: "Travel Guides", tags: ["digital-nomad", "remote-work", "{city_tag}"] },
  { template: "{city} Nightlife Guide for Travelers", category: "Destinations", tags: ["nightlife", "bars", "{city_tag}"] },
  { template: "Best Museums and Culture in {city}", category: "Destinations", tags: ["museums", "culture", "{city_tag}"] },
  { template: "Affordable Luxury Hotels in {city}", category: "Hotel Tips", tags: ["luxury", "hotels", "value", "{city_tag}"] },
  { template: "{city} Travel Mistakes Everyone Makes (And How to Avoid Them)", category: "Travel Guides", tags: ["tips", "mistakes", "{city_tag}"] },
  { template: "Packing List for {city}: What You Actually Need", category: "Travel Guides", tags: ["packing", "tips", "{city_tag}"] },
  { template: "Airport Transfer Tips for {city}", category: "Travel Guides", tags: ["airport", "transit", "{city_tag}"] },
  { template: "Seasonal Events and Festivals in {city}", category: "Destinations", tags: ["festivals", "events", "{city_tag}"] },
  { template: "Walking Tours of {city}: Self-Guided Routes Locals Recommend", category: "Travel Guides", tags: ["walking", "self-guided", "{city_tag}"] },
  { template: "Cheap Eats in {city}: Where Locals Actually Go", category: "Budget Travel", tags: ["food", "local", "budget", "{city_tag}"] },
];

const CITIES = [
  "Paris", "London", "Tokyo", "New York", "Barcelona", "Rome", "Lisbon",
  "Amsterdam", "Bangkok", "Bali", "Dubai", "Istanbul", "Prague", "Vienna",
  "Singapore", "Sydney", "Cancun", "Miami", "San Francisco", "Berlin",
  "Copenhagen", "Edinburgh", "Marrakech", "Kyoto", "Seoul", "Montreal",
  "Buenos Aires", "Cape Town", "Reykjavik", "Dubrovnik", "Florence",
  "Porto", "Athens", "Budapest", "Krakow", "Mexico City", "Cartagena",
  // Added 2026-05: round out global coverage with high-search-volume cities.
  "Hong Kong", "Madrid", "Milan", "Stockholm", "Munich", "Dublin",
  "Toronto", "Chicago", "Los Angeles", "Rio de Janeiro", "Cairo", "Hanoi",
];

const IMAGES: Record<string, string> = {
  "Paris": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
  "London": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80",
  "Tokyo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80",
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80",
  "Barcelona": "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&q=80",
  "Rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
  "Dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  "Cancun": "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=1200&q=80",
  "Bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
  "Bangkok": "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80",
  "default": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80",
};

const MIN_WORD_COUNT = 500;
const MAX_RETRIES = 2;

// ============================================================
// TYPES
// ============================================================

interface GeneratedPost {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
}

interface BlogPostFile {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  content: string;
  affiliateLinks: { label: string; url: string; provider: string }[];
}

// ============================================================
// HELPERS
// ============================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).length;
}

// ============================================================
// AI GENERATION
// ============================================================

const BLOG_POST_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    excerpt: { type: "string" },
    content: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    category: { type: "string", enum: [...VALID_CATEGORIES] },
  },
  required: ["title", "excerpt", "content", "tags", "category"],
  additionalProperties: false,
};

function buildPrompt(seedTitle: string, city: string, category: string): string {
  return `Write a 600-800 word travel blog post about: ${seedTitle}

Destination: ${city}
Category hint: ${category}

Requirements:
- Informative, practical, and engaging tone
- Include specific hotel recommendations with price ranges (USD)
- Include local tips that show real knowledge of ${city}
- Mention specific neighborhoods to stay in by name
- Include a section on budget tips
- SEO-optimized for the topic — use the keyword naturally
- No fluff, no filler, no AI clichés ("nestled in", "vibrant tapestry", etc.)
- Write as a knowledgeable travel advisor speaking to a smart reader
- Do NOT include any placeholder text like "[insert X]" or "{city}" — write real content
- Use ## for section headers (at least 3 sections) and **bold** for emphasis
- Word count: between 600 and 800 words for the content field

Output JSON with these fields:
- title: refined version of the topic above (string)
- excerpt: 1-2 sentence summary that would make a reader click (string)
- content: the full article body as markdown with ## headers and **bold** (string)
- tags: 3-5 relevant tags, lowercase, hyphenated (array of strings)
- category: one of: ${VALID_CATEGORIES.join(", ")}`;
}

async function generateWithClaude(
  client: Anthropic,
  seedTitle: string,
  city: string,
  category: string,
): Promise<GeneratedPost> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await client.messages.create({
        model: "claude-haiku-4-5",
        max_tokens: 4096,
        output_config: {
          format: { type: "json_schema", schema: BLOG_POST_SCHEMA },
        },
        messages: [{ role: "user", content: buildPrompt(seedTitle, city, category) }],
      });

      const textBlock = response.content.find((b) => b.type === "text");
      if (!textBlock || textBlock.type !== "text") {
        throw new Error("No text block in response");
      }

      const post = JSON.parse(textBlock.text) as GeneratedPost;
      validatePost(post);
      return post;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`Attempt ${attempt} failed: ${lastError.message}`);
    }
  }

  throw lastError ?? new Error("AI generation failed");
}

function validatePost(post: GeneratedPost): void {
  if (!post.title || !post.excerpt || !post.content || !post.tags || !post.category) {
    throw new Error("Missing required fields in generated post");
  }
  if (!Array.isArray(post.tags) || post.tags.length === 0) {
    throw new Error("Tags must be a non-empty array");
  }
  if (!VALID_CATEGORIES.includes(post.category as (typeof VALID_CATEGORIES)[number])) {
    throw new Error(`Invalid category: ${post.category}`);
  }
  const words = countWords(post.content);
  if (words < MIN_WORD_COUNT) {
    throw new Error(`Content too short: ${words} words (minimum ${MIN_WORD_COUNT})`);
  }
  if (!post.content.includes("##")) {
    throw new Error("Content missing required ## header");
  }
  if (/\[insert [^\]]+\]|\{[a-z_]+\}/i.test(post.content)) {
    throw new Error("Content contains placeholder text");
  }
}

// ============================================================
// TEMPLATE FALLBACK
// ============================================================

function generateContentTemplate(city: string): string {
  return `Planning a trip to ${city}? You've come to the right place. This guide covers everything you need to know about finding the best hotels, saving money, and making the most of your visit to one of the world's most exciting destinations.

## Why Visit ${city}?

${city} attracts millions of visitors each year, and it's easy to see why. From world-class dining and cultural attractions to stunning architecture and vibrant neighborhoods, ${city} delivers an experience that stays with you long after you return home.

## Finding the Best Hotels

The key to a great trip starts with choosing the right accommodation. ${city} offers everything from budget hostels to luxury five-star hotels.

**Compare Prices Across Platforms**: The same room can vary by 20-40% across different booking sites. Always check at least 3-4 platforms before committing.

**Book at the Right Time**: For ${city}, the ideal booking window is typically 2-8 weeks before your trip for the best balance of availability and pricing.

**Consider the Neighborhood**: Central locations are convenient but expensive. Staying slightly outside the tourist core can save 30-50% on your nightly rate.

## Best Neighborhoods to Stay

Choosing the right neighborhood can make or break your trip. Central districts work for first-time visitors who want walkable access. Arts and culture districts offer the best value with character and authenticity. Waterfront areas, where ${city} has them, offer scenic views at varying price points.

## Saving Money on Your Trip

Skip tourist-trap restaurants and seek out neighborhoods where locals eat. Many of ${city}'s best experiences cost nothing — parks, markets, and architectural walks are all free. Research public transit options before you go; day passes and multi-ride cards often save significantly over individual fares.

## When to Visit

Shoulder seasons typically offer the best combination of pleasant weather, manageable crowds, and reasonable prices. For ${city}, this means visiting during the transition months when tourism slows but conditions remain favorable.

## Final Tips

Book your accommodation through a price comparison tool to ensure you're getting the best rate. Read recent reviews (within the last 6 months) for the most accurate picture of a hotel's current condition. ${city} is waiting for you.`;
}

function generateFallbackPost(seedTitle: string, city: string, category: string): GeneratedPost {
  return {
    title: seedTitle,
    excerpt: `Discover the best travel tips and hotel deals for ${city}. Our comprehensive guide covers where to stay, what to see, and how to save money on your trip.`,
    content: generateContentTemplate(city),
    tags: ["hotels", "travel-tips", city.toLowerCase().replace(/\s+/g, "-")],
    category,
  };
}

// ============================================================
// MAIN
// ============================================================

function buildSlug(seedTitle: string, year: number): string {
  const base = slugify(seedTitle);
  return base.endsWith(`-${year}`) ? base : `${base}-${year}`;
}

async function main(): Promise<void> {
  const year = new Date().getFullYear();
  const contentDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  type Combo = {
    city: string;
    topic: (typeof TOPIC_TEMPLATES)[number];
    seedTitle: string;
    slug: string;
    filePath: string;
  };

  const totalCombos = CITIES.length * TOPIC_TEMPLATES.length;
  const unused: Combo[] = [];
  for (const c of CITIES) {
    for (const t of TOPIC_TEMPLATES) {
      const title = t.template
        .replace("{city}", c)
        .replace("{year}", year.toString());
      const s = buildSlug(title, year);
      const fp = path.join(contentDir, `${s}.json`);
      if (!fs.existsSync(fp)) {
        unused.push({ city: c, topic: t, seedTitle: title, slug: s, filePath: fp });
      }
    }
  }

  if (unused.length === 0) {
    throw new Error(
      `All ${totalCombos} topic/city combos for ${year} have already been generated. ` +
        `Add more templates to TOPIC_TEMPLATES or cities to CITIES to keep the pipeline producing posts.`,
    );
  }

  const pick = getRandomItem(unused);
  const { city, topic, seedTitle, slug, filePath } = pick;
  console.log(
    `Selected fresh slug "${slug}" (city: ${city}, topic: "${topic.template}"). ` +
      `${unused.length}/${totalCombos} combos remaining for ${year}.`,
  );

  let generated: GeneratedPost;
  let usedAI = false;

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic();
      generated = await generateWithClaude(client, seedTitle, city, topic.category);
      usedAI = true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`Claude generation failed (${msg}). Falling back to template.`);
      generated = generateFallbackPost(seedTitle, city, topic.category);
    }
  } else {
    console.warn("ANTHROPIC_API_KEY not set. Using template fallback.");
    generated = generateFallbackPost(seedTitle, city, topic.category);
  }

  if (!generated.content.trim() || countWords(generated.content) < 200) {
    throw new Error(
      `Refusing to write post: content is empty or implausibly short (${countWords(
        generated.content,
      )} words). This indicates a bug in the AI path or the template fallback.`,
    );
  }

  const cityTag = city.toLowerCase().replace(/\s+/g, "-");
  const post: BlogPostFile = {
    slug,
    title: generated.title,
    excerpt: generated.excerpt,
    date: new Date().toISOString().split("T")[0],
    readTime: `${Math.max(4, Math.ceil(countWords(generated.content) / 200))} min read`,
    category: generated.category,
    image: IMAGES[city] || IMAGES["default"],
    tags: generated.tags.length > 0 ? generated.tags : [cityTag],
    content: generated.content,
    affiliateLinks: [
      {
        label: `Search Hotels in ${city} on Booking.com`,
        url: awinBookingLink(
          `/searchresults.html?ss=${encodeURIComponent(city)}`,
          `reservationsnew-blog-${cityTag}-hotels`,
        ),
        provider: "Booking.com",
      },
      {
        label: `Find Flights to ${city} on Booking.com`,
        url: awinBookingLink(
          `/flights/index.html?to=${encodeURIComponent(city)}`,
          `reservationsnew-blog-${cityTag}-flights`,
        ),
        provider: "Booking.com",
      },
    ],
  };

  fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
  console.log(`Generated (${usedAI ? "AI" : "template"}): ${filePath}`);
  console.log(`Title: ${post.title}`);
  console.log(`Words: ${countWords(post.content)}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
