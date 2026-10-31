"use client";

import { useState } from "react";
import { ArrowRight, Check, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const fieldClass =
  "h-10 rounded-sm border-0 bg-neutral-100 text-xs shadow-none focus-visible:ring-1";

const BookingCard = ({ price, destinationId, title }) => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    travelers: 1,
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const total = Number(price) * Number(form.travelers || 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destinationId,
          ...form,
          travelers: Number(form.travelers),
          totalPrice: total,
        }),
      });
      if (!res.ok) throw new Error("Booking failed. Please try again.");

      setOpen(false);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        travelers: 1,
        date: "",
        notes: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="gap-0 rounded-sm p-0 shadow-md lg:sticky lg:top-6">
      <CardContent className="space-y-3 p-5">
        <p className="text-xs text-neutral-500">Starting from</p>
        <p className="text-3xl font-medium text-cyan-600">
          ${Number(price).toLocaleString()}
        </p>
        <p className="text-xs text-neutral-500">per person</p>

        <Input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="mt-3 h-10 rounded-none border-0 border-b bg-neutral-50 text-xs shadow-none focus-visible:ring-0"
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="h-10 w-full rounded-sm bg-cyan-600 text-xs hover:bg-cyan-700">
              Book Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </DialogTrigger>

          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-base font-medium">
                  Book Your Trip
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Fill in your details to book {title ?? "this package"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-xs">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Farian Tazwar"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g., +880 1XXX XXXXXX"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="travelers" className="text-xs">
                    Travelers
                  </Label>
                  <Input
                    id="travelers"
                    name="travelers"
                    type="number"
                    min={1}
                    required
                    value={form.travelers}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="date" className="text-xs">
                    Departure Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs">
                  Special Requests
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special requests or notes..."
                  className="min-h-24 rounded-sm border-0 bg-neutral-100 text-xs shadow-none focus-visible:ring-1"
                />
              </div>

              <div className="flex items-center justify-between rounded-sm bg-neutral-50 px-3 py-2 text-xs">
                <span className="text-neutral-600">Total price</span>
                <span className="text-base font-medium text-cyan-600">
                  ${total.toLocaleString()}
                </span>
              </div>

              {error && <p className="text-xs text-red-600">{error}</p>}

              <DialogFooter className="gap-2 sm:justify-end">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-sm border-red-400 text-xs text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="rounded-sm bg-cyan-600 text-xs hover:bg-cyan-700"
                >
                  <Save className="h-3.5 w-3.5" />
                  {submitting ? "Booking..." : "Confirm Booking"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>

      <CardFooter className="block px-5 pb-5 pt-0">
        <ul className="space-y-2 text-[11px] text-neutral-600">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-green-600" />
              {perk}
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
