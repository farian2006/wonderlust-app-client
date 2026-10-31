"use client";
import { useState } from "react";
import Image from "next/image";
import { MapPin, CalendarDays, ArrowUpRight, Star, Link } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const res = await fetch("http://localhost:5000/destinations");
const data = await res.json();

const DestinationPage = () => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  const categories = [...new Set(data.map((d) => d.category).filter(Boolean))];

  let destinations = data.filter((d) => {
    const matchCategory =
      category === "" || category === "all" || d.category === category;
    const price = Number(d.price);
    const matchPrice =
      priceRange === "" ||
      priceRange === "all" ||
      (priceRange === "low" && price < 1000) ||
      (priceRange === "mid" && price >= 1000 && price < 3000) ||
      (priceRange === "high" && price >= 3000);
    return matchCategory && matchPrice;
  });

  if (sortBy === "price-asc")
    destinations = [...destinations].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc")
    destinations = [...destinations].sort((a, b) => b.price - a.price);
  if (sortBy === "rating")
    destinations = [...destinations].sort((a, b) => b.rating - a.rating);

  const triggerClass =
    "h-12 w-full justify-between rounded-none border-0 border-b md:border-b-0 md:border-r last:border-0 border-neutral-300 px-4 text-xs uppercase tracking-wide text-neutral-700 shadow-none focus:ring-0";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <h1 className="font-serif text-4xl font-light tracking-tight text-neutral-900">
        Explore All Destinations
      </h1>
      <p className="mt-3 mb-8 text-sm text-neutral-600">
        Find your perfect travel experience from our curated collection
      </p>

      {/* Filters */}
      <div className="grid grid-cols-1 border border-neutral-300 md:grid-cols-3">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="CATEGORY" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="PRICE RANGE" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="low">Under $1000</SelectItem>
            <SelectItem value="mid">$1000 - $3000</SelectItem>
            <SelectItem value="high">$3000+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className={triggerClass}>
            <SelectValue placeholder="SORT BY" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="my-5 text-xs text-neutral-600">
        Showing {destinations.length} destinations
      </p>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-3">
        {destinations.map((d) => (
          <Card
            key={d.id ?? d._id}
            className="gap-0 rounded-none border-0 bg-transparent p-0 shadow-none"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={d.imageUrl}
                  alt="Destination"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <Badge
                  variant="secondary"
                  className="absolute right-2 top-2 gap-1 rounded-sm bg-white/90 text-xs text-neutral-800 hover:bg-white/90"
                >
                  <Star className="h-3 w-3 fill-black text-black" />
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-2 px-2 pb-0 pt-3">
              <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                <MapPin className="h-3.5 w-3.5" />
                <span>{d.country}</span>
              </div>

              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-neutral-900">
                  {d.name}
                </h3>
                <p className="text-sm font-semibold text-neutral-900">
                  ${Number(d.price).toLocaleString()}
                  <span className="text-[10px] font-normal text-neutral-500">
                    /Person
                  </span>
                </p>
              </div>

              <div className="flex items-center pb-2 gap-1.5 text-xs text-neutral-600">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>{d.duration}</span>
              </div>
            </CardContent>

            <CardFooter className="px-0 pb-0 pt-2">
              <Button
                variant="link"
                className="h-auto gap-1.5 px-2 pb-2 text-xs font-normal uppercase tracking-wide text-cyan-600 underline"
              >
                <a href={`/destinations/${d.id ?? d._id}`}>
                  Book Now
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
