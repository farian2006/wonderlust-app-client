"use client";

import { useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { cn } from "cn";
import { serif } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

const categories = [
  "Beach",
  "Mountain",
  "Adventure",
  "Cultural",
  "Cruise",
  "Honeymoon",
  "Wildlife",
];

function Field({ id, label, children, className }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

export default function AddDestinationPage() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setSuccess(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      ...form,
      price: form.price ? Number(form.price) : null,
    };
    console.log("New travel package:", payload);
    setForm(initialForm);
    setSuccess(true);

    const res = await fetch("http://localhost:5000/add-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
  }
  function handleCancel() {
    setForm(initialForm);
    setSuccess(false);
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-8">
        <h1
          className={cn(
            "text-4xl text-foreground md:text-5xl flex justify-center",
            serif.className,
          )}
        >
          Add New Travel Package
        </h1>

        <Card className="mx-auto mt-8 max-w-2xl py-10 shadow-sm">
          <CardContent className="px-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field id="name" label="Destination Name">
                <Input
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Bali Paradise"
                  className="h-11 rounded-md bg-muted/60"
                />
              </Field>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="country" label="Country">
                  <Input
                    id="country"
                    name="country"
                    required
                    value={form.country}
                    onChange={(event) =>
                      updateField("country", event.target.value)
                    }
                    placeholder="Indonesia"
                    className="h-11 rounded-md bg-muted/60"
                  />
                </Field>

                <Field id="category" label="Category">
                  <Select
                    value={form.category || null}
                    onValueChange={(value) => updateField("category", value)}
                  >
                    <SelectTrigger
                      id="category"
                      className="h-11 w-full rounded-md bg-muted/60"
                    >
                      <SelectValue placeholder="Beach" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field id="price" label="Price (USD)">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    required
                    value={form.price}
                    onChange={(event) =>
                      updateField("price", event.target.value)
                    }
                    placeholder="e.g., 1299"
                    className="h-11 rounded-md bg-muted/60"
                  />
                </Field>

                <Field id="duration" label="Duration">
                  <Input
                    id="duration"
                    name="duration"
                    required
                    value={form.duration}
                    onChange={(event) =>
                      updateField("duration", event.target.value)
                    }
                    placeholder="e.g., 7 Days/6 Nights"
                    className="h-11 rounded-md bg-muted/60"
                  />
                </Field>
              </div>

              <Field id="departureDate" label="Departure Date">
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  required
                  value={form.departureDate}
                  onChange={(event) =>
                    updateField("departureDate", event.target.value)
                  }
                  className="h-11 rounded-md bg-muted/60"
                />
              </Field>

              <Field id="imageUrl" label="Image URL">
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={form.imageUrl}
                  onChange={(event) =>
                    updateField("imageUrl", event.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                  className="h-11 rounded-md bg-muted/60"
                />
              </Field>

              <Field id="description" label="Description">
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Describe the travel experience..."
                  className="rounded-md bg-muted/60"
                />
              </Field>

              <div className="flex items-center justify-end gap-3 pt-2">
                {success ? (
                  <p className="mr-auto text-sm text-brand" role="status">
                    Travel package added successfully!
                  </p>
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-10 border-destructive/30 rounded-md text-[13px] text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 data-icon="inline-start" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-10 rounded-md bg-brand text-[13px] hover:bg-brand/85"
                >
                  <Save data-icon="inline-start" />
                  Add Travel Package
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
