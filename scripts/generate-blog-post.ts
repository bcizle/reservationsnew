/**
 * AI Blog Post Generator for ReservationsNew
 *
 * Usage: npx ts-node scripts/generate-blog-post.ts
 *
 * This script generates SEO-optimized travel blog posts and saves them
 * as JSON files in the content/blog/ directory.
 *
 * Prerequisites:
 * - Set OPENAI_API_KEY or ANTHROPIC_API_KEY in .env.local
 * - npm install -g ts-node (or use npx)
 *
 * For automation, set up a GitHub Action or Vercel Cron to run this
 * on a schedule (e.g., 2x per week).
 */

import fs from "fs";
import path from "path";

// ============================================================
// CONFIGURATION - Edit these to customize content generation
// ============================================================

const SITE_NAME = "ReservationsNew";
const BOOKING_AID_PLACEHOLDER = "BOOKING_AID";
const TRAVELPAYOUTS_PLACEHOLDER = "TRAVELPAYOUTS_TOKEN";

// Topics pool - the script randomly picks from these
const TOPIC_TEMPLATES = [
  { template: "Best Budget Hotels in {city} for {year}", category: "Destination Guides", tags: ["hotels", "budget", "{city_tag}"] },
  { template: "How to Save Money on Hotels in {city}", category: "Tips & Tricks", tags: ["savings", "hotels", "{city_tag}"] },
  { template: "{city} Travel Guide: Where to Stay, Eat, and Explore", category: "Travel Guides", tags: ["travel-guide", "{city_tag}", "restaurants", "attractions"] },
  { template: "Cheapest Months to Visit {city} in {year}", category: "Tips & Tricks", tags: ["budget", "timing", "{city_tag}"] },
  { template: "Top 5 Neighborhoods to Stay in {city}", category: "Destination Guides", tags: ["hotels", "neighborhoods", "{city_tag}"] },
  { template: "Weekend Getaway: 3 Days in {city}", category: "Travel Guides", tags: ["weekend-trip", "{city_tag}", "itinerary"] },
  { template: "First-Timer's Guide to {city}: Hotels, Food, and Must-Sees", category: "Travel Guides", tags: ["first-time", "{city_tag}", "guide"] },
  { template: "Best Hotels Near the Airport in {city}", category: "Destination Guides", tags: ["airport-hotels", "{city_tag}", "convenience"] },
  { template: "Romantic Hotels in {city} for Couples", category: "Destination Guides", tags: ["couples", "romantic", "{city_tag}"] },
  { template: "Best Family Hotels in {city}", category: "Destination Guides", tags: ["family", "kids", "{city_tag}"] },
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

// ============================================================
// GENERATOR LOGIC
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

function generatePost(): void {
  const city = getRandomItem(CITIES);
  const year = new Date().getFullYear();
  const topic = getRandomItem(TOPIC_TEMPLATES);

  const title = topic.template
    .replace("{city}", city)
    .replace("{year}", year.toString());

  const slug = slugify(title);
  const cityTag = city.toLowerCase().replace(/\s+/g, "-");
  const tags = topic.tags.map((t) => t.replace("{city_tag}", cityTag));
  const image = IMAGES[city] || IMAGES["default"];

  const date = new Date().toISOString().split("T")[0];

  // Generate a content template (in production, replace this with an AI API call)
  const content = generateContentTemplate(title, city, topic.category);

  const post = {
    slug,
    title,
    excerpt: `Discover the best travel tips and hotel deals for ${city}. Our comprehensive guide covers where to stay, what to see, and how to save money on your trip.`,
    date,
    readTime: `${Math.floor(Math.random() * 4) + 5} min read`,
    category: topic.category,
    image,
    tags,
    content,
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

  // Write to content directory
  const contentDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const filePath = path.join(contentDir, `${slug}.json`);

  if (fs.existsSync(filePath)) {
    console.log(`Post already exists: ${slug}. Skipping.`);
    return;
  }

  fs.writeFileSync(filePath, JSON.stringify(post, null, 2));
  console.log(`Generated: ${filePath}`);
  console.log(`Title: ${title}`);
  console.log(`Category: ${topic.category}`);
  console.log(`Tags: ${tags.join(", ")}`);
}

function generateContentTemplate(title: string, city: string, category: string): string {
  // This is a template-based generator. For AI-powered content:
  // 1. Replace this function with an API call to Claude or GPT
  // 2. Use the title, city, and category as the prompt context
  // 3. Ask the AI to write a 1500-2000 word SEO-optimized article
  //
  // Example prompt for AI:
  // "Write a 1500-word SEO-optimized travel blog post titled '{title}'.
  //  Include practical advice, specific hotel recommendations with price ranges,
  //  local tips, and natural keyword usage. Use ## for section headings.
  //  Mention comparing prices and booking in advance as tips.
  //  The article should help travelers planning a trip to {city}."

  return `Planning a trip to ${city}? You've come to the right place. This guide covers everything you need to know about finding the best hotels, saving money, and making the most of your visit to one of the world's most exciting destinations.

## Why Visit ${city}?

${city} attracts millions of visitors each year, and it's easy to see why. From world-class dining and cultural attractions to stunning architecture and vibrant neighborhoods, ${city} delivers an experience that stays with you long after you return home. Whether you're traveling for a romantic getaway, family vacation, or solo adventure, this city has something for everyone.

## Finding the Best Hotels

The key to a great trip starts with choosing the right accommodation. ${city} offers everything from budget hostels and boutique guesthouses to luxury five-star hotels. Here are some tips for finding the best deals:

**Compare Prices Across Platforms**: The same room can vary by 20-40% across different booking sites. Always check at least 3-4 platforms before committing. Price comparison tools make this easy by aggregating rates from hundreds of booking sites in seconds.

**Book at the Right Time**: For ${city}, the ideal booking window is typically 2-8 weeks before your trip for the best balance of availability and pricing. Booking too far in advance or at the last minute often means higher prices.

**Consider the Neighborhood**: Central locations are convenient but expensive. Staying slightly outside the tourist core — even a 10-15 minute transit ride away — can save 30-50% on your nightly rate while still giving easy access to major attractions.

## Best Neighborhoods to Stay

Choosing the right neighborhood can make or break your trip. Here are some top areas to consider:

**Central/Tourist District**: Best for first-time visitors who want walkable access to major attractions. Expect to pay premium rates, but you'll save on transportation costs.

**Arts & Culture District**: Often the best value for travelers who want character and authenticity. These neighborhoods typically feature independent restaurants, galleries, and a more local atmosphere.

**Waterfront/Beach Area**: If ${city} has a waterfront, staying nearby offers scenic views and a relaxed atmosphere. Prices vary widely depending on the specific location and season.

## Saving Money on Your Trip

Beyond hotel savings, there are several ways to stretch your travel budget in ${city}:

**Eat like a local**: Skip tourist-trap restaurants and seek out neighborhoods where locals eat. Street food markets are often the best value and the most authentic culinary experience.

**Free attractions**: Many of ${city}'s best experiences cost nothing — parks, markets, street art, and architectural walks are all free. Check if museums offer free admission days.

**Transportation**: Research public transit options before you go. Day passes and multi-ride cards often save significantly over individual fares or taxis.

## When to Visit

Timing matters for both weather and pricing. Shoulder seasons (the periods between peak and off-peak) typically offer the best combination of pleasant weather, manageable crowds, and reasonable prices. For ${city}, this means visiting during the transition months when tourism slows but conditions remain favorable.

## Final Tips

Book your accommodation through a price comparison tool to ensure you're getting the best rate. Read recent reviews (within the last 6 months) for the most accurate picture of a hotel's current condition. And don't forget travel insurance — it's a small investment that can save thousands if plans change unexpectedly.

${city} is waiting for you. Start planning your trip today and discover why millions of travelers fall in love with this incredible destination every year.`;
}

// Run the generator
generatePost();
console.log("\nDone! Run 'npm run build' to include the new post in your site.");
