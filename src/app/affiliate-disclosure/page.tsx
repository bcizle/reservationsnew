import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "This site contains affiliate links, and we may earn a commission on some of them. Full transparency on how ReservationsNew earns revenue through the Awin affiliate network.",
};

export default function AffiliateDisclosure() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Affiliate Disclosure</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: June 5, 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
        <section className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
          <p className="text-base font-semibold text-foreground">
            Some links on this site earn us a commission. It never costs you extra.
          </p>
          <p className="mt-2 text-sm text-gray-700">
            ReservationsNew participates in the Awin affiliate network (Awin Publisher ID 2793280).
            When you click one of our partner links and complete a booking or purchase, we may earn
            a commission at no additional cost to you.
          </p>
          <p className="mt-2 text-sm text-gray-700">
            Booking.com links on this site are plain referral links. We do not currently have an
            active commission relationship with Booking.com and earn nothing when you book through
            them. We send searches there because of its inventory coverage, not because of any
            payment.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">How We Earn Revenue</h2>
          <p className="mt-2">
            ReservationsNew is a free-to-use hotel and travel comparison service. We earn revenue through affiliate marketing partnerships with booking platforms and travel providers. When you click on a link to a third-party booking site and make a purchase or reservation, we may earn a commission at no additional cost to you. This affiliate revenue is what allows us to keep our service free for all travelers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Our Affiliate Partners</h2>
          <p className="mt-2">
            We work with the following affiliate partners and networks to help you start travel searches:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Booking.com (referral only)</strong> — We link to Booking.com because it is
              the world&apos;s largest accommodation platform, but we have no active commission
              relationship with it and earn nothing from those links. Current prices, availability,
              cancellation options, and verified guest reviews are shown on Booking.com after you
              click through.
            </li>
            <li>
              <strong>Awin partner network</strong> — Beyond Booking.com, we work with a curated
              roster of approved Awin partners covering hotels, city passes, eSIMs, campgrounds,
              boutique stays, and other travel services. Each partner is listed on our homepage
              partner section with the relevant category and a transparent affiliate link.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Does This Affect Prices?</h2>
          <p className="mt-2">
            <strong>No.</strong> The prices you see on third-party booking sites are the same whether or not you arrive through our links. Our affiliate commissions are paid by the booking platforms from their existing margins, not by you. You will never pay more as a result of using our service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">How We Choose What to Recommend</h2>
          <p className="mt-2">Our editorial recommendations and referral links are based on the following criteria, in order of priority:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Price and overall value for the traveler</li>
            <li>User ratings and review scores</li>
            <li>Location and convenience</li>
            <li>Cancellation policy flexibility</li>
          </ul>
          <p className="mt-2">
            We do <strong>not</strong> prioritize editorial recommendations based on commission rates. A partner offering a higher commission will not receive preferential placement in our editorial guidance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Identifying Affiliate Links</h2>
          <p className="mt-2">
            Affiliate links on our site are identified in the following ways:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Links that open in a new tab and direct you to a booking platform</li>
            <li>Buttons labeled with partner names (e.g., &quot;Search Hotels on Booking.com&quot;)</li>
            <li>Content marked with our affiliate disclosure banner</li>
            <li>The <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">rel=&quot;sponsored&quot;</code> attribute in the link HTML</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">FTC Compliance</h2>
          <p className="mt-2">
            In accordance with the Federal Trade Commission (FTC) guidelines, we disclose that ReservationsNew contains affiliate links. This disclosure is intended to comply with the FTC&apos;s 16 CFR Part 255, &quot;Guides Concerning the Use of Endorsements and Testimonials in Advertising.&quot;
          </p>
          <p className="mt-2">
            We are committed to full transparency. Every page on our site that contains affiliate links includes a visible disclosure notice, and this page provides comprehensive information about all our affiliate relationships.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">Questions?</h2>
          <p className="mt-2">
            If you have any questions about our affiliate relationships or how we earn revenue, please don&apos;t hesitate to{" "}
            <Link href="/contact" className="text-primary underline hover:text-primary-light">contact us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
