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
 * - NEXT_PUBLIC_BOOKING_AID, NEXT_PUBLIC_TRAVELPAYOUTS_TOKEN (affiliate IDs)
 */

import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";

// ============================================================
// CONFIGURATION
// ============================================================

const BOOKING_AID_PLACEHOLDER = "BOOKING_AID";
const TRAVELPAYOUTS_PLACEHOLDER = "TRAVELPAYOUTS_TOKEN";

const VALID_CATEGORIES = [
  "Hotel Tips",
  "Destinations",
  "Travel Guides",
  "Budget Travel",
  "Flight Tips",
  "Car Rental",
] as const;

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
];

const CITIES = [
  "Paris", "London", "Tokyo", "New York", "Barcelona", "Rome", "Lisbon",
  "Amsterdam", "Bangkok", "Bali", "Dubai", "Istanbul", "Prague", "Vienna",
  "Singapore", "Sydney", "Cancun", "Miami", "San Francisco", "Berlin",
  "Copenhagen", "Edinburgh", "Marrakech", "Kyoto", "Seoul", "Montreal",
  "Buenos Aires", "Cape Town", "Reykjavik", "Dubrovnik", "Florence",
  "Porto", "Athens", "Budapest", "Krakow", "Mexico City", "Cartagena",
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

async function main(): Promise<void> {
  const city = getRandomItem(CITIES);
  const year = new Date().getFullYear();
  const topic = getRandomItem(TOPIC_TEMPLATES);

  const seedTitle = topic.template
    .replace("{city}", city)
    .replace("{year}", year.toString());

  const slug = slugify(seedTitle);
  const contentDir = path.join(process.cwd(), "content", "blog");
  const filePath = path.join(contentDir, `${slug}.json`);

  if (fs.existsSync(filePath)) {
    console.log(`Post already exists: ${slug}. Skipping.`);
    return;
  }

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
        label: `Search Hotels in ${city}`,
        url: `https://www.booking.com/searchresults.html?aid=${BOOKING_AID_PLACEHOLDER}&ss=${encodeURIComponent(city)}`,
        provider: "Booking.com",
      },
      {
        label: `Find Flights to ${city}`,
        url: `https://tp.media/r?marker=${TRAVELPAYOUTS_PLACEHOLDER}&p=4132&u=https%3A%2F%2Fwww.aviasales.com`,
        provider: "TravelPayouts",
      },
    ],
  };

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
  console.log(`Generated (${usedAI ? "AI" : "template"}): ${filePath}`);
  console.log(`Title: ${post.title}`);
  console.log(`Words: ${countWords(post.content)}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
