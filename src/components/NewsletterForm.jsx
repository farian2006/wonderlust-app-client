"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  }

  if (subscribed) {
    return (
      <p className="flex h-11 items-center text-sm text-brand" role="status">
        Thanks for subscribing!
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-56 items-center rounded-md bg-white/10"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter email"
        className="h-11 min-w-0 flex-1 bg-transparent px-4 text-sm text-white placeholder:text-white/50 focus:outline-none"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        aria-label="Subscribe to the newsletter"
        className="h-11 w-11 shrink-0 rounded-md text-white/70 hover:bg-white/10 hover:text-white"
      >
        <ArrowUpRight data-icon="inline-end" />
      </Button>
    </form>
  );
}
