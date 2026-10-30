import { ArrowRight } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import { cn } from "cn";

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/ 3 Days" },
  { label: "Budget", placeholder: "$0- $3000" },
  { label: "People", placeholder: "5 -10" },
];

export default function Banner() {
  return (
    <section className="relative flex min-h-115 flex-col overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/assests/Banner.png")` }}
      />
      <div className="relative flex flex-1 items-center justify-center px-4 pb-12 pt-20 text-center">
        <div className="max-w-3xl">
          <h1 className={cn("text-4xl leading-[1.12] text-white md:text-6xl", serif.className)}>
            Discover Your
            <br />
            Next Adventure
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/90 md:text-base">
            Explore breathtaking destinations and create unforgettable memories with
            our curated travel experiences.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="flex h-11 items-center gap-2 bg-brand px-7 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-brand/85"
            >
              Explore Now
              <ArrowRight className="size-4" data-icon="inline-end" />
            </button>
            <button
              type="button"
              className="h-11 bg-white/35 px-7 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white/50"
            >
              View Destination
            </button>
          </div>
        </div>
      </div>
      <div className="relative mt-auto grid grid-cols-2 bg-[#0e2e3a]/80 backdrop-blur-sm md:grid-cols-[repeat(4,1fr)_auto]">
        {searchFields.map(({ label, placeholder }, index) => (
          <button
            key={label}
            type="button"
            className={cn(
              "px-5 py-4 text-left transition-colors hover:bg-white/5",
              index > 0 && "border-l border-white/10"
            )}
          >
            <span className="block text-[13px] font-semibold text-white">{label}</span>
            <span className="mt-0.5 block text-xs text-white/60">{placeholder}</span>
          </button>
        ))}
        <button
          type="button"
          className="col-span-2 flex items-center justify-center gap-2 bg-brand px-12 text-sm font-medium text-white transition-colors hover:bg-brand/85 md:col-span-1"
        >
          Search
        </button>
      </div>
    </section>
  );
}
