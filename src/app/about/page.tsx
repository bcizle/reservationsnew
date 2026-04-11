import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — ReservationsNew",
  description: "Learn about ReservationsNew, our mission to help travelers find the best hotel deals, and how our price comparison platform works.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">About ReservationsNew</h1>

      <div className="mt-10 space-y-10 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-foreground">Our Mission</h2>
          <p className="mt-3">
            At ReservationsNew, we believe everyone deserves a great travel experience without overpaying. Our mission is simple: help travelers find the best hotel deals by comparing prices across the world&apos;s top booking platforms — all in one place.
          </p>
          <p className="mt-2">
            We know that searching multiple websites for the best rate is time-consuming and frustrating. That&apos;s why we built ReservationsNew — a fast, transparent, and easy-to-use comparison tool that does the hard work for you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">How It Works</h2>
          <p className="mt-3">
            Our platform searches hundreds of booking sites simultaneously to find you the lowest available prices on hotels, vacation rentals, and travel packages. We display results side by side so you can quickly compare prices, read reviews, and choose the deal that fits your budget and preferences.
          </p>
          <p className="mt-2">
            When you find a deal you like, we redirect you directly to the booking provider&apos;s website where you complete your reservation. We never add hidden fees or markups — the price you see is the price you pay.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">What Makes Us Different</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-foreground">Unbiased Comparisons</h3>
              <p className="mt-1 text-text-muted">We show deals from a wide range of providers, ranked by value — not by commission rate.</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-foreground">No Hidden Fees</h3>
              <p className="mt-1 text-text-muted">Our service is completely free. We earn revenue through affiliate partnerships, never from you.</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-foreground">Global Coverage</h3>
              <p className="mt-1 text-text-muted">From boutique hotels in Paris to beachfront resorts in Cancun, we cover destinations worldwide.</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-foreground">Trusted Reviews</h3>
              <p className="mt-1 text-text-muted">Access millions of verified traveler reviews to make informed booking decisions.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Our Values</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li><strong>Transparency:</strong> We clearly disclose our affiliate relationships and how we earn revenue.</li>
            <li><strong>User-First:</strong> Every decision we make is guided by what&apos;s best for travelers, not advertisers.</li>
            <li><strong>Accuracy:</strong> We work hard to ensure pricing and availability data is as current and accurate as possible.</li>
            <li><strong>Simplicity:</strong> Finding a great hotel deal should be easy, not overwhelming.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Get in Touch</h2>
          <p className="mt-3">
            Have questions, feedback, or partnership inquiries? We&apos;d love to hear from you. Visit our{" "}
            <Link href="/contact" className="text-primary underline hover:text-primary-light">Contact page</Link>{" "}
            or email us at hello@reservationsnew.com.
          </p>
        </section>
      </div>
    </div>
  );
}
