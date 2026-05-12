"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Caption } from "@/components/primitives/Caption";

type NavProps = {
  state?: "transparent" | "condensed";
  className?: string;
};

const links = [
  { href: "/work", label: "Work" },
  { href: "/store", label: "Store" },
  { href: "/contact", label: "Contact" },
];

const primaryMenuLinks = [
  { href: "/work", label: "Work", detail: "Films + reels" },
  { href: "/store", label: "Store", detail: "LUTs + tools" },
  { href: "/contact", label: "Contact", detail: "Start a brief" },
  { href: "/", label: "Home", detail: "Back to top" },
];

const utilityMenuLinks = [
  { href: "/work", label: "Real Estate" },
  { href: "/work", label: "Brand Films" },
  { href: "/store", label: "Color" },
  { href: "mailto:dante@cravecollective.co", label: "Email" },
  { href: "https://instagram.com/cravecollectivee", label: "Instagram" },
  { href: "/contact", label: "Sarasota" },
];

const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/bookings/ss123-c23343ec-b4bd-4762-a7d8-85f203949a397pcgpz";

export function Nav({ state = "transparent", className = "" }: NavProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const condensed = state === "condensed" || (state === "transparent" && hasScrolled);
  const navTextClass = condensed
    ? "text-(--color-accent-on-accent) hover:opacity-70"
    : "text-(--color-ink-primary) hover:text-(--color-accent-primary)";

  useEffect(() => {
    const updateHeaderState = () => setHasScrolled(window.scrollY > 24);

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          condensed
            ? "border-b border-black/15 bg-(--color-accent-primary)/95 shadow-[0_18px_60px_rgba(11,11,12,0.24)] backdrop-blur-md"
            : "bg-transparent"
        } ${className}`}
      >
        <nav
          className={`mx-auto flex w-full max-w-[1680px] items-center justify-between px-6 lg:px-12 ${
            condensed ? "py-3" : "py-4 lg:py-5"
          }`}
        >
          <Link
            href="/"
            aria-label="Crave Collective — home"
            className={`flex min-h-[48px] items-center transition-colors ${navTextClass}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="lg:hidden text-[20px] tracking-[-0.02em] leading-none">Creative Collective</span>
            <span className="hidden lg:inline text-[22px] tracking-[-0.02em] leading-none">Crave</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 ${navTextClass}`}
                >
                  <Caption className={condensed ? "!text-(--color-accent-on-accent)" : ""}>
                    {link.label}
                  </Caption>
                </Link>
              </li>
            ))}
          </ul>

          <div aria-hidden="true" className="lg:hidden w-[48px]" />
        </nav>
      </header>

      <nav
        aria-label="Mobile menu"
        className="fixed inset-x-0 bottom-0 z-50 lg:hidden px-4 pb-[calc(12px+env(safe-area-inset-bottom))]"
      >
        <div className="border border-(--color-line-hairline) bg-(--color-bg-canvas)/92 p-2 shadow-[0_-18px_60px_rgba(0,0,0,0.32)] backdrop-blur-md">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid min-h-[56px] w-full grid-cols-[32px_1fr_32px] items-center bg-(--color-bg-elevated) px-5 text-sm font-medium uppercase tracking-[0.08em] text-(--color-ink-primary) transition-colors hover:bg-(--color-ink-overlay-white-8)"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span aria-hidden="true" />
            <span className="text-center">Menu</span>
            <span className="flex w-8 flex-col gap-1.5" aria-hidden="true">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[100] bg-(--color-bg-canvas) flex flex-col"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <Link
              href="/"
              aria-label="Crave Collective — home"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-[48px] items-center text-(--color-ink-primary)"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[22px] tracking-[-0.02em] leading-none">Creative Collective</span>
            </Link>
            {/* Close button — [rule: touch-target-size] */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-[48px] w-[48px] items-center justify-center text-(--color-ink-primary)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-8 pt-8">
            <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              {primaryMenuLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[116px] flex-col justify-between border border-(--color-line-hairline) bg-(--color-bg-elevated) p-5 text-(--color-ink-primary) transition-colors hover:bg-(--color-ink-overlay-white-8)"
                >
                  <span
                    className="text-[32px] leading-none tracking-[-0.015em]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="text-[13px] font-medium uppercase tracking-[0.08em] text-(--color-ink-muted)"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {link.detail}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {utilityMenuLinks.map((link) => {
                const isExternal = link.href.startsWith("http");

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[60px] items-center justify-center border border-(--color-line-hairline) px-3 text-center text-sm font-medium uppercase tracking-[0.06em] text-(--color-ink-primary) transition-colors hover:bg-(--color-ink-overlay-white-8)"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-8 text-center">
              <Caption>© Copyright Crave Collective 2026</Caption>
            </div>
          </div>

          <div className="border-t border-(--color-line-hairline) bg-(--color-bg-canvas) px-6 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[56px] w-full items-center justify-center bg-(--color-accent-primary) px-5 text-sm font-medium uppercase tracking-[0.08em] text-(--color-accent-on-accent) transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Book an Appointment
            </a>
          </div>
        </div>
      )}
    </>
  );
}
