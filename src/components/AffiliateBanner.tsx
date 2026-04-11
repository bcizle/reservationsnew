import Link from "next/link";

export default function AffiliateBanner() {
  return (
    <div className="rounded-lg bg-amber-50 border border-amber-100 px-4 py-3">
      <p className="text-xs text-amber-800">
        <span className="font-semibold">Disclosure:</span> This page contains affiliate links. If you book through our links, we may earn a small commission at no extra cost to you. This helps us keep the site running and provide free travel advice.{" "}
        <Link href="/affiliate-disclosure" className="underline hover:text-amber-900">
          Learn more
        </Link>
      </p>
    </div>
  );
}
