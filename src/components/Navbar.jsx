import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "/destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Admin", href: "/add-destination" },
];

const authLinks = [
  { label: "Profile", href: "#profile", icon: User },
  { label: "Login", href: "#login" },
  { label: "Sign Up", href: "#signup" },
];

export default function Navbar() {
  return (
    <header className="bg-white">
      <nav className="relative mx-auto flex h-11 max-w-7xl items-center justify-between px-2 text-[13px] text-primary">
        <ul className="flex items-center gap-5">
          {navLinks.map(({ label, href, active }) => (
            <li key={label}>
              <Link
                href={href}
                className={cn(
                  "transition-colors hover:text-brand",
                  active &&
                    "font-medium text-brand underline underline-offset-2",
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-tight text-brand"
        >
          Wanderlast
        </Link>

        <ul className="flex items-center gap-1">
          {authLinks.map(({ label, icon: Icon }) => (
            <li key={label}>
              <Button
                variant="ghost"
                size="sm"
                className="text-[13px] font-normal hover:text-brand"
              >
                {Icon ? <Icon data-icon="inline-start" /> : null}
                {label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
