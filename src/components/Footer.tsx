import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              Reservations<span className="text-accent">New</span>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Compare hotel prices across the world&apos;s top booking platforms. We help travelers
              save time and money by surfacing the best deals in one place.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Explore
            </h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/destinations" className="text-sm text-gray-400 transition hover:text-white">All destinations</Link></li>
              <li><Link href="/search" className="text-sm text-gray-400 transition hover:text-white">Search hotels</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-400 transition hover:text-white">Travel blog</Link></li>
              <li><Link href="/#partners" className="text-sm text-gray-400 transition hover:text-white">Travel partners</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Company
            </h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-gray-400 transition hover:text-white">About us</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-400 transition hover:text-white">Contact</Link></li>
              <li><Link href="/affiliate-disclosure" className="text-sm text-gray-400 transition hover:text-white">How we earn</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Legal
            </h4>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy-policy" className="text-sm text-gray-400 transition hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-sm text-gray-400 transition hover:text-white">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-gray-400 transition hover:text-white">Cookie Policy</Link></li>
              <li><Link href="/affiliate-disclosure" className="text-sm text-gray-400 transition hover:text-white">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ReservationsNew. All rights reserved. We may earn a
            commission when you book through our affiliate partner links — at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
