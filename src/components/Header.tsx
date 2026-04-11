import Link from "next/link";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
          Reservations<span className="text-accent">New</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/destinations" className="text-sm font-medium text-gray-600 transition hover:text-primary">
            Destinations
          </Link>
          <Link href="/blog" className="text-sm font-medium text-gray-600 transition hover:text-primary">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 transition hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 transition hover:text-primary">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/#search"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Find Deals
          </Link>
        </div>
      </div>
    </nav>
  );
}
