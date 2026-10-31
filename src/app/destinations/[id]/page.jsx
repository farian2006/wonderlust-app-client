import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  MapPin,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingCard from "./BookingCard";
export const instant = false;
const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destinations/${id}`);
  const data = await res.json();

  const highlights = Array.isArray(data.highlights) ? data.highlights : [];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Destinations
        </Link>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-sm text-xs">
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-sm border-red-400 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Cancel
          </Button>
        </div>
      </div>
      <div className="relative aspect-16/6 w-full overflow-hidden">
        <Image
          src={data.imageUrl}
          alt="Destination"
          fill
          priority
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-600">
            <MapPin className="h-3.5 w-3.5" />
            <span>{data.country}</span>
          </div>

          <h1 className="mt-2 font-serif text-4xl font-light text-neutral-900">
            {data.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-neutral-700">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-green-500 text-green-500" />
              <strong>{data.rating ?? data.ratings ?? data.rate}</strong>
              {(data.reviews ?? data.reviewCount) ? (
                <span className="text-neutral-500">
                  ({data.reviews ?? data.reviewCount} reviews)
                </span>
              ) : null}
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <CalendarDays className="h-3.5 w-3.5" />
              {data.duration}
            </span>
          </div>

          <h2 className="mt-8 font-serif text-xl text-neutral-900">Overview</h2>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-neutral-600">
            {data.overview ?? data.description}
          </p>

          {highlights.length > 0 && (
            <>
              <h2 className="mt-8 font-serif text-xl text-neutral-900">
                Highlights
              </h2>
              <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-3 text-xs text-neutral-600 sm:grid-cols-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-green-600" />
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <aside>
          <BookingCard price={data.price} destinationId={id} />
        </aside>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
