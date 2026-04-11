import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — ReservationsNew",
  description: "Get in touch with ReservationsNew. Send us your questions, feedback, or partnership inquiries.",
};

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Contact Us</h1>
      <p className="mt-3 text-lg text-text-muted">
        Have a question, feedback, or partnership inquiry? We&apos;d love to hear from you.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">Send Us a Message</h2>
          <form className="mt-6 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                id="subject"
                name="subject"
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
              >
                <option>General Inquiry</option>
                <option>Partnership / Advertising</option>
                <option>Technical Issue</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-primary-light focus:ring-2 focus:ring-primary-light/20"
                placeholder="How can we help you?"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white transition hover:bg-accent-hover"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-foreground">Other Ways to Reach Us</h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Email</h3>
              <p className="mt-1 text-sm text-text-muted">
                General inquiries: hello@reservationsnew.com<br />
                Partnerships: partners@reservationsnew.com<br />
                Privacy concerns: privacy@reservationsnew.com
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Response Time</h3>
              <p className="mt-1 text-sm text-text-muted">
                We aim to respond to all inquiries within 24-48 business hours. For urgent matters, please indicate so in your subject line.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">For Advertisers &amp; Partners</h3>
              <p className="mt-1 text-sm text-text-muted">
                Interested in partnering with ReservationsNew? We work with hotels, booking platforms, and travel service providers worldwide. Reach out to partners@reservationsnew.com to discuss collaboration opportunities.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Report an Issue</h3>
              <p className="mt-1 text-sm text-text-muted">
                Found a broken link, incorrect pricing, or a technical problem? Let us know and we&apos;ll fix it promptly. Select &quot;Technical Issue&quot; in the contact form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
