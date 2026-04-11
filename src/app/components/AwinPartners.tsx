import { buildAwinLink, AWIN_PARTNERS, type AwinPartner } from "@/lib/awin";

function PartnerCard({ partner }: { partner: AwinPartner }) {
  const href = buildAwinLink(partner.advertiserId, partner.destinationUrl);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={[
        "group relative flex flex-col rounded-2xl border p-6 transition-all",
        "hover:-translate-y-1 hover:shadow-lg",
        partner.topPerformer
          ? "border-amber-300 bg-gradient-to-br from-amber-50 to-white shadow-md"
          : "border-gray-100 bg-white shadow-sm hover:border-blue-200",
      ].join(" ")}
    >
      {partner.badge && (
        <span
          className={[
            "absolute -top-3 left-4 rounded-full px-3 py-0.5 text-xs font-bold",
            partner.topPerformer
              ? "bg-amber-400 text-white"
              : "bg-[#0f4c75] text-white",
          ].join(" ")}
        >
          {partner.topPerformer ? "⭐ " : ""}
          {partner.badge}
        </span>
      )}

      <div className="text-3xl">{partner.icon}</div>

      <span className="mt-3 w-fit rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
        {partner.category}
      </span>

      <h3 className="mt-3 text-base font-bold text-gray-900 transition group-hover:text-[#0f4c75]">
        {partner.name}
      </h3>

      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-gray-500">
        {partner.description}
      </p>

      <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#3282b8] transition group-hover:text-[#0f4c75]">
        Visit Partner
        <svg
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </div>
    </a>
  );
}

export function AwinPartners() {
  return (
    <section id="partners" className="bg-[#f8f9fa] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3282b8]">
            Trusted Partners
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Verified Travel Partners
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            Hand-picked services to make every trip seamless — from hotels and
            camping to connectivity.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AWIN_PARTNERS.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          Some links on this page are affiliate links. We earn a small
          commission at no extra cost to you when you book or purchase through
          our partners.
        </p>
      </div>
    </section>
  );
}
