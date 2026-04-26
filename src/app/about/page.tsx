import type { Metadata } from "next";
import Link from "next/link";
import { AWIN_PARTNERS } from "@/lib/awin";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://reservationsnew.com";

export const metadata: Metadata = {
  title: "About Us — ReservationsNew",
  description:
    "ReservationsNew is a travel price comparison platform that helps travelers find the best hotel deals across top booking platforms. Learn about our mission, partnerships, and how we make money.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About ReservationsNew",
    description:
      "A travel price comparison platform helping travelers find the best hotel deals across top booking platforms.",
    url: `${siteUrl}/about`,
  },
};

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">About us</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        We help travelers compare hotel prices in one place
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
        ReservationsNew is a travel price comparison platform that helps travelers find the best
        hotel deals across top booking platforms. We exist for one reason: searching multiple
        booking sites for the same room is slow, repetitive, and easy to get wrong. We bring the
        deals together.
      </p>

      <div className="mt-12 space-y-12 text-sm leading-relaxed text-gray-700">
        {/* Mission */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Our mission</h2>
          <p className="mt-3">
            Every traveler deserves a great trip without overpaying. We build editorial destination
            guides and pass your search through to the booking platforms with the largest live
            inventory — so you can compare real-time prices, read verified reviews, and book with
            confidence in a few clicks.
          </p>
          <p className="mt-3">
            We don&apos;t hold inventory. We don&apos;t take payment. The price you see on the
            booking platform is the price you pay. Our job is to get you there fast.
          </p>
        </section>

        {/* How we make money */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">How we make money</h2>
          <p className="mt-3">
            <strong>We earn affiliate commissions when you book through our links — at no extra
            cost to you.</strong> When you click a partner link on ReservationsNew and complete a
            booking, the partner (e.g. Booking.com, Aviasales, Awin merchants) pays us a small
            referral fee. The price you pay is the same as if you had visited the partner directly.
          </p>
          <p className="mt-3">
            That&apos;s the whole business model. We never charge you, never sell your personal
            data, and never inject hidden markups into prices. For the full breakdown, read our{" "}
            <Link href="/affiliate-disclosure" className="text-primary underline hover:text-primary-light">
              affiliate disclosure
            </Link>
            .
          </p>
        </section>

        {/* Partnerships */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Our partnerships</h2>
          <p className="mt-3">
            We work with a curated set of trusted booking platforms and travel-services partners.
            Our primary hotel inventory partner is <strong>Booking.com</strong>, which lists over
            28 million accommodations worldwide. We also surface flight inventory through the{" "}
            <strong>Aviasales / TravelPayouts</strong> network and a hand-picked roster of{" "}
            <strong>{AWIN_PARTNERS.length} approved travel partners</strong> from the Awin
            affiliate network — covering city passes, eSIMs, campgrounds, boutique hotels, and
            more.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {AWIN_PARTNERS.slice(0, 8).map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-xs"
              >
                <span className="text-base">{p.icon}</span>
                <div>
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="text-text-muted">{p.category}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-text-muted">
            See the full partner list on our{" "}
            <Link href="/#partners" className="text-primary underline hover:text-primary-light">
              homepage partner section
            </Link>
            .
          </p>
        </section>

        {/* What makes us different */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">What makes us different</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-foreground">Honest comparisons</h3>
              <p className="mt-1 text-text-muted">
                We send your search directly to the booking platform with the broadest inventory.
                No bait-and-switch.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-foreground">No hidden fees</h3>
              <p className="mt-1 text-text-muted">
                Our service is free. We never add markups. Affiliate commissions come from the
                partner, not from you.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-foreground">Real editorial content</h3>
              <p className="mt-1 text-text-muted">
                Our destination guides are written and curated by our team — not auto-generated
                affiliate filler.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 p-5">
              <h3 className="font-semibold text-foreground">Transparent disclosure</h3>
              <p className="mt-1 text-text-muted">
                Every affiliate link is marked sponsored and the disclosure banner appears on every
                page that contains one.
              </p>
            </div>
          </div>
        </section>

        {/* Our team */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Our team</h2>
          <p className="mt-3">
            ReservationsNew was founded by travel enthusiasts who got tired of opening eight tabs
            to price the same hotel room. We&apos;re a small, independent team based in the United
            States, focused on making travel research fast, transparent, and trustworthy.
          </p>
          <p className="mt-3">
            We don&apos;t accept paid placements in our editorial guides. Hotels and partners
            cannot pay to be ranked higher. Recommendations are based on inventory breadth,
            booking-platform reputation, and traveler reviews.
          </p>
        </section>

        {/* Our values */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Our values</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Transparency.</strong> We disclose every affiliate relationship on every page
              where a sponsored link appears.
            </li>
            <li>
              <strong>Traveler-first.</strong> Every product decision is judged against one
              question: does it actually help the traveler get a better price or a better trip?
            </li>
            <li>
              <strong>Accuracy.</strong> Pricing and availability come from the booking platform in
              real time — not from cached data we hope is still right.
            </li>
            <li>
              <strong>Simplicity.</strong> The whole site should fit in a few clicks, not a funnel.
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="rounded-2xl bg-surface p-6">
          <h2 className="text-xl font-semibold text-foreground">Get in touch</h2>
          <p className="mt-3">
            Questions, feedback, partnership inquiries, or a mistake we should fix?
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <strong>General:</strong>{" "}
              <a className="text-primary underline hover:text-primary-light" href="mailto:hello@reservationsnew.com">
                hello@reservationsnew.com
              </a>
            </li>
            <li>
              <strong>Partnerships:</strong>{" "}
              <a className="text-primary underline hover:text-primary-light" href="mailto:partners@reservationsnew.com">
                partners@reservationsnew.com
              </a>
            </li>
            <li>
              <strong>Privacy:</strong>{" "}
              <a className="text-primary underline hover:text-primary-light" href="mailto:privacy@reservationsnew.com">
                privacy@reservationsnew.com
              </a>
            </li>
          </ul>
          <p className="mt-4">
            Or use our{" "}
            <Link href="/contact" className="text-primary underline hover:text-primary-light">
              contact form
            </Link>
            . We aim to reply within 24 to 48 business hours.
          </p>
        </section>
      </div>
    </div>
  );
}
