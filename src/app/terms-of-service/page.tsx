import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ReservationsNew",
  description: "Read the terms and conditions governing the use of ReservationsNew hotel comparison and travel deal services.",
};

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: March 1, 2025</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing and using ReservationsNew (reservationsnew.com), you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not access or use the website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
          <p className="mt-2">
            ReservationsNew is a hotel and travel comparison website. We aggregate and display hotel prices, vacation rental deals, and travel packages from various third-party booking platforms. We do not directly sell, book, or guarantee any travel services. All bookings are completed through the respective third-party provider.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Affiliate Relationships</h2>
          <p className="mt-2">
            ReservationsNew participates in affiliate marketing programs. This means we may earn commissions when you click on links to third-party booking sites and complete a purchase. These affiliate relationships do not affect the prices you pay. For more details, see our <a href="/affiliate-disclosure" className="text-primary underline hover:text-primary-light">Affiliate Disclosure</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Accuracy of Information</h2>
          <p className="mt-2">
            While we strive to display accurate and up-to-date pricing and availability information, we cannot guarantee that all information on our site is complete, current, or error-free. Prices, availability, and deal terms may change without notice and are subject to the terms and conditions of the respective booking providers. Always verify the final price and terms on the booking provider&apos;s website before completing your reservation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. User Conduct</h2>
          <p className="mt-2">You agree not to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Use the site for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the site</li>
            <li>Use automated systems (bots, scrapers) to access the site without permission</li>
            <li>Interfere with or disrupt the site or servers</li>
            <li>Reproduce, duplicate, or exploit any portion of the site for commercial purposes without written consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Intellectual Property</h2>
          <p className="mt-2">
            All content on this website, including text, graphics, logos, images, and software, is the property of ReservationsNew or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, modify, distribute, or republish any content without prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Limitation of Liability</h2>
          <p className="mt-2">
            ReservationsNew is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind. We are not liable for any damages arising from your use of the site, including but not limited to issues with third-party bookings, pricing discrepancies, or service interruptions. Our total liability to you shall not exceed the amount you paid us, if any.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Third-Party Links</h2>
          <p className="mt-2">
            Our website contains links to third-party websites and services. We do not control and are not responsible for the content, privacy policies, or practices of any third-party sites. Your use of third-party websites is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Changes to Terms</h2>
          <p className="mt-2">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page. Your continued use of the site after changes constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">10. Governing Law</h2>
          <p className="mt-2">
            These terms shall be governed by and construed in accordance with the laws of the United States of America, without regard to conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">11. Contact</h2>
          <p className="mt-2">
            For questions about these Terms of Service, contact us at legal@reservationsnew.com or visit our <a href="/contact" className="text-primary underline hover:text-primary-light">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
