"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "cn";
import { serif } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical. Every Detail Was Perfectly Planned. The Resorts Were Luxurious.And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/assests/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guides Were Incredibly Knowledgeable . Highly Recommended!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assests/person1.png",
  },
  {
    quote:
      "Kyoto Trip Was A Dream From Start To Finish. The Temples Were Stunning And The Team Arranged Everything Flawlessly, From Flights To Reservations.",
    name: "Amara Diallo",
    location: "Paris, France",
    image: "/assests/person2.png",
  },
  {
    quote:
      "Marrakech Exceeded All Expectations. The Desert Camp Was Magical And The Local Guides Were Warm, Welcoming And Incredibly Knowledgeable.",
    name: "James Miller",
    location: "London, UK",
    image: "/assests/person1.png",
  },
];

function ArrowButton({ direction, onClick, disabled }) {
  const Icon = direction === "prev" ? ArrowLeft : ArrowRight;
  const label =
    direction === "prev" ? "Previous testimonials" : "Next testimonials";
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      variant="outline"
      size="icon-lg"
      className="rounded-full"
    >
      <Icon />
    </Button>
  );
}

export default function Testimonials() {
  const trackRef = useRef(null);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setIsStart(track.scrollLeft <= 4);
    setIsEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
  }, [updateArrows]);

  function scrollByCards(direction) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const step = card
      ? card.getBoundingClientRect().width + 16
      : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section className="bg-background px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className={cn("text-4xl", serif.className)}>
              What Travelers Say
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Real experiences from our happy travelers
            </p>
          </div>
          <div className="flex gap-2">
            <ArrowButton
              direction="prev"
              onClick={() => scrollByCards(-1)}
              disabled={isStart}
            />
            <ArrowButton
              direction="next"
              onClick={() => scrollByCards(1)}
              disabled={isEnd}
            />
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="mt-8 flex snap-x gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map(({ quote, name, location, image }) => (
            <Card
              key={name}
              className="w-full shrink-0 flex-row gap-0 rounded-sm p-0 shadow-sm snap-start md:w-[calc(50%-0.5rem)]"
            >
              <CardContent className="flex min-h-[240px] flex-1 flex-col p-5">
                <p
                  className={cn(
                    "text-[15px] leading-snug text-foreground",
                    serif.className,
                  )}
                >
                  “{quote}”
                </p>
                <div className="mt-auto pt-6">
                  <CardTitle className="text-[13px] text-brand">
                    — {name}
                  </CardTitle>
                  <CardDescription className="mt-1 text-[11px]">
                    {location}
                  </CardDescription>
                </div>
              </CardContent>
              <div className="relative w-[42%] self-stretch">
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(min-width: 768px) 38vw, 96vw"
                  className="object-cover"
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
