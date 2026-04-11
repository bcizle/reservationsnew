import { AWIN_PROGRAMS } from "@/lib/awin-programs";
import AwinLink from "@/components/AwinLink";

/**
 * Showcase section for approved Awin affiliate partner programs.
 * Each card links out via a tracked Awin deep link.
 */
export default function AwinPartners() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Our Partners
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted Travel Partners
          </h2>
          <p className="mt-3 text-lg text-text-muted">
            We&apos;ve partnered with the best in travel to give you more ways to
            explore, connect, and save.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AWIN_PROGRAMS.map((program) => (
            <AwinLink
              key={program.id}
              awinmid={program.awinmid}
              destinationUrl={program.destinationUrl}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-primary-light/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-2xl">
                  {program.icon}
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {program.badge ?? program.category}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground transition group-hover:text-primary">
                {program.name}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-text-muted">
                {program.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary">
                Explore {program.name}
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </AwinLink>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          * Links to partner sites are affiliate links. We may earn a commission
          at no extra cost to you.
        </p>
      </div>
    </section>
  );
}
