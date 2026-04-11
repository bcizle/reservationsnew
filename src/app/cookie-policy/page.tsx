import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — ReservationsNew",
  description: "Understand how ReservationsNew uses cookies and similar technologies to improve your browsing experience.",
};

export default function CookiePolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Cookie Policy</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: March 1, 2025</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. What Are Cookies?</h2>
          <p className="mt-2">
            Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work efficiently, provide a better user experience, and supply information to site owners. Cookies can be &quot;persistent&quot; (remaining on your device between sessions) or &quot;session&quot; cookies (deleted when you close your browser).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. How We Use Cookies</h2>
          <p className="mt-2">ReservationsNew uses cookies for the following purposes:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong>Essential Cookies:</strong> Required for the website to function properly. These enable core features like page navigation and access to secure areas.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting usage information anonymously.</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences and settings, such as language choice and search history, to provide a personalized experience.</li>
            <li><strong>Advertising Cookies:</strong> Used by our affiliate partners to track referrals and display relevant travel deals. These cookies help us earn commissions when you book through our links.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Third-Party Cookies</h2>
          <p className="mt-2">
            Some cookies are placed by third-party services that appear on our pages. We use services from partners including Google Analytics, affiliate networks (such as Awin), and booking platform partners. These third parties may use cookies to collect information about your online activities across different websites.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Managing Cookies</h2>
          <p className="mt-2">
            You can control and manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites. Please note that disabling cookies may affect the functionality of our website.
          </p>
          <p className="mt-2">
            To learn more about managing cookies in your browser, visit your browser&apos;s help documentation or the website allaboutcookies.org.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Contact Us</h2>
          <p className="mt-2">
            If you have questions about our use of cookies, please contact us at privacy@reservationsnew.com or visit our <a href="/contact" className="text-primary underline hover:text-primary-light">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
