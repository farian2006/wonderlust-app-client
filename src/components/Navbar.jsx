import Link from "next/link";
import { User } from "lucide-react";
import { cn } from "cn";

const navLinks = [
  { label: "Home", href: "/", active: true },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Admin", href: "#admin" },
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

        <ul className="flex items-center gap-5">
          {authLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                {Icon ? <Icon className="size-3.5" /> : null}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
