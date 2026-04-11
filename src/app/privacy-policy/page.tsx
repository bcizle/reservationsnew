import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ReservationsNew",
  description: "Learn how ReservationsNew collects, uses, and protects your personal information when you use our hotel comparison service.",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-text-muted">Last updated: March 1, 2025</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Introduction</h2>
          <p className="mt-2">
            ReservationsNew (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website reservationsnew.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. By using the site, you consent to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Information We Collect</h2>
          <p className="mt-2">We may collect the following types of information:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong>Personal Information:</strong> Name, email address, and other contact details you voluntarily provide through our contact form or newsletter signup.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our site, including pages visited, time spent on pages, click patterns, and referring URLs.</li>
            <li><strong>Device Information:</strong> Browser type, operating system, device type, screen resolution, and IP address.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and similar technologies to enhance your experience and collect analytics data. See our Cookie Policy for more details.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. How We Use Your Information</h2>
          <p className="mt-2">We use the information we collect to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Provide, operate, and maintain our website and services</li>
            <li>Improve, personalize, and expand our website content and features</li>
            <li>Understand and analyze usage trends to enhance user experience</li>
            <li>Display relevant hotel deals and travel offers based on your searches</li>
            <li>Communicate with you about updates, promotions, and customer support</li>
            <li>Detect, prevent, and address technical issues or fraudulent activity</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Third-Party Services</h2>
          <p className="mt-2">
            Our website contains links to third-party booking sites and travel providers. When you click through to these external sites, their own privacy policies apply. We are not responsible for the privacy practices of these third-party services. We encourage you to review the privacy policies of any site you visit through our links.
          </p>
          <p className="mt-2">
            We work with affiliate networks and advertising partners who may use cookies and tracking technologies to serve relevant advertisements. These partners include but are not limited to Awin, Trivago, and other travel affiliate programs.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Data Retention</h2>
          <p className="mt-2">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law. Usage data is generally retained for analytics purposes for up to 26 months.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
          <p className="mt-2">Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>The right to access the personal data we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your personal data</li>
            <li>The right to object to processing of your personal data</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time</li>
          </ul>
          <p className="mt-2">To exercise any of these rights, please contact us at privacy@reservationsnew.com.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Security</h2>
          <p className="mt-2">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this page periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">9. Contact Us</h2>
          <p className="mt-2">
            If you have any questions about this Privacy Policy, please contact us at privacy@reservationsnew.com or visit our <a href="/contact" className="text-primary underline hover:text-primary-light">Contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
