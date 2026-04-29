import Link from "next/link";

export default function AffiliateBanner() {
  return (
    <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
      <p className="text-xs text-amber-800">
        <span className="font-semibold">Disclosure:</span> As a Booking.com Affiliate, we earn from qualifying transactions. This page contains affiliate links — if you book through them we may earn a commission at no extra cost to you.{" "}
        <Link href="/affiliate-disclosure" className="underline hover:text-amber-900">
          Learn more
        </Link>
      </p>
    </div>
  );
}
