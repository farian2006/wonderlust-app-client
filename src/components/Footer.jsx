import Link from "next/link";
import { cn } from "cn";
import { serif } from "@/lib/fonts";
import NewsletterForm from "@/components/NewsletterForm";

const footerColumns = [
  {
    heading: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Destinations", href: "#destinations" },
      { label: "My Bookings", href: "#bookings" },
      { label: "My Profile", href: "#profile" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "#help-center" },
      { label: "Terms of Service", href: "#terms-of-service" },
      { label: "Privacy Policy", href: "#privacy-policy" },
    ],
  },
];

const socialLinks = [
  {
    label: "X (Twitter)",
    href: "#x",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#linkedin",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM6.119 20.452H4.555V9h1.564v11.452Z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#instagram",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37a4 4 0 1 1-7.75 1.26 4 4 0 0 1 7.75-1.26z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

function ColumnHeading({ children }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-white">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="px-6 py-14 sm:px-10 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className={cn(
                "text-5xl leading-none md:text-6xl",
                serif.className,
              )}
            >
              Wanderlast
            </p>
            <p className="mt-4 text-sm text-white/60">
              Your gateway to extraordinary travel experiences around the world.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <ColumnHeading>Newsletter</ColumnHeading>
            <p className="mt-4 text-sm text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>

          {footerColumns.map(({ heading, links }) => (
            <nav key={heading} aria-label={heading}>
              <ColumnHeading>{heading}</ColumnHeading>
              <ul className="mt-4 space-y-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <ColumnHeading>Contact Us</ColumnHeading>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+17869011622"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderland.com"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  info@wanderland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            &copy; 2026 Wanderlast. All rights reserved.
          </p>
          <ul className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  className="flex size-5 items-center justify-center text-white/60 transition-colors hover:text-white"
                >
                  {icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
