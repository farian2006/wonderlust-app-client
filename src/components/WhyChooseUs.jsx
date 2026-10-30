import { Headset, Map, ShieldCheck } from "lucide-react";
import { cn } from "cn";
import { serif } from "@/lib/fonts";

const features = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-soft px-6 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className={cn("text-center text-4xl md:text-5xl", serif.className)}>
          Why Choose Wanderlust
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-sm bg-white p-6 shadow-sm">
              <Icon className="size-9 text-brand" strokeWidth={1.8} />
              <h3
                className={cn("mt-5 text-[22px] leading-snug", serif.className)}
              >
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
