import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/blog";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import OptimizedImage from "@/components/OptimizedImage";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export const metadata: Metadata = {
  title: "Travel Blog — Tips, Guides & Deals",
  description: "Read expert travel tips, destination guides, and money-saving advice for your next trip. Stay informed with the ReservationsNew travel blog.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
        ]}
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Travel Blog</h1>
        <p className="mt-3 text-lg text-text-muted">
          Expert tips, destination guides, and money-saving advice for smarter travel.
        </p>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-white">All</span>
          {categories.map((cat) => (
            <span key={cat} className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600">
              {cat}
            </span>
          ))}
        </div>
      )}

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <OptimizedImage
                variant="card"
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-text-muted">
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">{post.category}</span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mt-3 text-lg font-bold text-foreground group-hover:text-primary transition">{post.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{post.excerpt}</p>
              {post.tags && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-text-muted">No blog posts yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
