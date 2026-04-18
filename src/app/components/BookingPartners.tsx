const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID || "";

interface BookingPartner {
  name: string;
  tagline: string;
  /** Brand text color (Tailwind) used on white pill */
  textClass: string;
  /** Background for the pill/circle that holds the initial */
  swatchClass: string;
  /** Initial or short mark to display */
  mark: string;
  url: string;
}

const partners: BookingPartner[] = [
  {
    name: "Booking.com",
    tagline: "28M+ listings worldwide",
    textClass: "text-[#003580]",
    swatchClass: "bg-[#003580]",
    mark: "B.",
    url: BOOKING_AID
      ? `https://www.booking.com/index.html?aid=${BOOKING_AID}`
      : "https://www.booking.com/",
  },
  {
    name: "Expedia",
    tagline: "Flight + hotel bundles",
    textClass: "text-[#fcc700]",
    swatchClass: "bg-[#00355F]",
    mark: "e",
    url: "https://www.expedia.com/",
  },
  {
    name: "Hotels.com",
    tagline: "Earn reward nights",
    textClass: "text-[#d32f2f]",
    swatchClass: "bg-[#d32f2f]",
    mark: "H",
    url: "https://www.hotels.com/",
  },
  {
    name: "Trivago",
    tagline: "Compare 100s of sites",
    textClass: "text-[#d12b1a]",
    swatchClass: "bg-[#d12b1a]",
    mark: "t",
    url: "https://www.trivago.com/",
  },
];

export function BookingPartners() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#3282b8]">
            Compare Across
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            The World&apos;s Top Booking Platforms
          </h2>
          <p className="mt-3 text-base text-gray-500">
            We scan millions of listings from the sites you already trust.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${p.swatchClass} text-xl font-extrabold text-white`}
                aria-hidden="true"
              >
                {p.mark}
              </div>
              <div className="min-w-0">
                <p className={`truncate text-sm font-bold ${p.textClass}`}>{p.name}</p>
                <p className="truncate text-xs text-gray-500">{p.tagline}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
