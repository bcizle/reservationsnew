import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import AffiliateLink from "@/components/AffiliateLink";
import AffiliateBanner from "@/components/AffiliateBanner";
import BookingSearchWidget from "@/components/BookingSearchWidget";
import OptimizedImage from "@/components/OptimizedImage";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ReservationsNew Blog`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.title }],
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  };
}

function renderContent(content: string) {
  // Split content by double newlines into blocks
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 mb-3 text-xl font-bold text-foreground">
          {trimmed.replace("## ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={i} className="mt-6 mb-2 text-lg font-semibold text-foreground">
          {trimmed.replace("### ", "")}
        </h3>
      );
    }
    // Handle bold text within paragraphs
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-sm leading-relaxed text-gray-700">
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 2);

  return (
    <div>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        url={`${siteUrl}/blog/${slug}`}
        image={post.image}
        datePublished={post.date}
        author="ReservationsNew"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteUrl },
          { name: "Blog", url: `${siteUrl}/blog` },
          { name: post.title, url: `${siteUrl}/blog/${slug}` },
        ]}
      />

      {/* Hero image */}
      <div className="relative h-64 w-full overflow-hidden sm:h-96">
        <OptimizedImage
          variant="hero"
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">{post.category}</span>
          <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{post.title}</h1>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Affiliate disclosure */}
        <div className="mt-6">
          <AffiliateBanner />
        </div>

        {/* Article content */}
        <div className="mt-8 space-y-4">
          {renderContent(post.content)}
        </div>

        {/* Affiliate links section */}
        {post.affiliateLinks && post.affiliateLinks.length > 0 && (
          <div className="mt-10 rounded-2xl bg-surface p-6">
            <h3 className="text-lg font-bold text-foreground">Book Your Trip</h3>
            <p className="mt-1 text-sm text-text-muted">Find the best deals through our trusted partners:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {post.affiliateLinks.map((link) => (
                <AffiliateLink
                  key={link.label}
                  href={link.url}
                  provider={link.provider}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover"
                >
                  {link.label}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </AffiliateLink>
              ))}
            </div>
          </div>
        )}

        {/* Booking widget */}
        <div className="mt-8">
          <BookingSearchWidget />
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-lg font-bold text-foreground">Related Articles</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group overflow-hidden rounded-xl border border-gray-100 shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <OptimizedImage
                      variant="card"
                      src={related.image}
                      alt={related.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-text-muted">{related.category}</span>
                    <h4 className="mt-1 text-sm font-semibold text-foreground group-hover:text-primary transition">{related.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-surface p-8 text-center">
          <h3 className="text-lg font-bold text-foreground">Ready to find your next hotel deal?</h3>
          <p className="mt-2 text-sm text-text-muted">Compare prices from top booking sites and save on your next trip.</p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-accent px-8 py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
          >
            Start Comparing Prices
          </Link>
        </div>

        <div className="mt-8">
          <Link href="/blog" className="text-sm text-primary underline hover:text-primary-light">
            &larr; Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
