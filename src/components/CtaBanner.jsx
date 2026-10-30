import { ArrowRight } from "lucide-react";
import { cn } from "cn";
import { serif } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default function CtaBanner() {
  return (
    <section className="relative flex flex-col overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("/assests/CTA.png")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[#052e1f]/60" />
      <div className="relative flex flex-col items-center px-4 py-28 text-center md:py-40">
        <h2
          className={cn(
            "max-w-3xl text-4xl leading-[1.12] text-white md:text-6xl",
            serif.className,
          )}
        >
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/80 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button
          size="lg"
          className="mt-8 h-11 rounded-none bg-white px-7 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-white/85"
        >
          Book Your Trip Today
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
}
