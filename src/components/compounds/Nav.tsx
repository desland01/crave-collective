"use client";

import Link from "next/link";
import { useState } from "react";
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

export function Nav({ state = "transparent", className = "" }: NavProps) {
  const condensed = state === "condensed";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 ${
          condensed
            ? "border-b border-(--color-line-hairline) bg-(--color-bg-elevated)/90 backdrop-blur-md"
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
            className="block text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[20px] lg:text-[22px] tracking-[-0.02em] leading-none">Crave</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-10">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors duration-200"
                >
                  <Caption>{link.label}</Caption>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger — [rule: touch-target-size] 48×48 tap area */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="lg:hidden flex items-center justify-center w-12 h-12 -mr-3 text-(--color-ink-primary)"
          >
            {/* Hamburger icon */}
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
              <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[100] bg-(--color-bg-canvas) flex flex-col px-6 pt-6 pb-12"
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="Crave Collective — home"
              onClick={() => setMenuOpen(false)}
              className="block text-(--color-ink-primary)"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[22px] tracking-[-0.02em] leading-none">Crave</span>
            </Link>
            {/* Close button — [rule: touch-target-size] */}
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="flex items-center justify-center w-12 h-12 -mr-3 text-(--color-ink-primary)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <ul className="mt-16 flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors duration-200 border-b border-(--color-line-hairline)"
                  style={{ fontFamily: "var(--font-display)", fontSize: "40px", lineHeight: "1.15", letterSpacing: "-0.015em" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact anchor */}
          <div className="mt-auto">
            <Caption className="text-(--color-ink-muted)">dante@cravecollective.co</Caption>
          </div>
        </div>
      )}
    </>
  );
}
