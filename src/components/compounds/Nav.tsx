"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Caption } from "@/components/primitives/Caption";
import { FunnelForm } from "@/components/compounds/FunnelForm";

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

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M3 10l7-7 7 7M5 8.5V16a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M6 4l10 6-10 6V4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Nav({ state = "transparent", className = "" }: NavProps) {
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [funnelOpen, setFunnelOpen] = useState(false);
  const condensed = state === "condensed" || (state === "transparent" && hasScrolled);
  const navTextClass = condensed
    ? "text-(--color-accent-on-accent) hover:opacity-70"
    : "text-(--color-ink-primary) hover:text-(--color-accent-primary)";

  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayCardsRef = useRef<HTMLDivElement>(null);
  const funnelSheetRef = useRef<HTMLDivElement>(null);
  const funnelScrimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderState = () => setHasScrolled(window.scrollY > 24);
    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    return () => window.removeEventListener("scroll", updateHeaderState);
  }, []);

  useEffect(() => {
    if (!menuOpen && !funnelOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, funnelOpen]);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      if (!overlayRef.current || !overlayCardsRef.current) return;
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        overlayCardsRef.current.children,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "expo.out", delay: 0.15 }
      );
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!overlayRef.current || !overlayCardsRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => setMenuOpen(false),
    });
    tl.to(overlayCardsRef.current.children, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    tl.to(overlayRef.current, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.in",
    }, "-=0.1");
  }, []);

  const openFunnel = useCallback(() => {
    setFunnelOpen(true);
    requestAnimationFrame(() => {
      if (!funnelSheetRef.current || !funnelScrimRef.current) return;
      gsap.fromTo(funnelScrimRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(funnelSheetRef.current, { y: "100%" }, { y: "0%", duration: 0.5, ease: "expo.out" });
    });
  }, []);

  const closeFunnel = useCallback(() => {
    if (!funnelSheetRef.current || !funnelScrimRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => setFunnelOpen(false),
    });
    tl.to(funnelSheetRef.current, { y: "100%", duration: 0.4, ease: "power2.in" });
    tl.to(funnelScrimRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.2");
  }, []);

  const activeTab = pathname === "/" ? "home" : pathname === "/work" ? "work" : null;

  return (
    <>
      {/* Top header — desktop + mobile */}
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

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div
          className="relative border-t bg-(--color-bg-canvas)/80 backdrop-blur-xl"
          style={{ borderColor: "var(--glass-border)" }}
        >
          <div className="grid grid-cols-4 items-center">
            {/* Home */}
            <Link
              href="/"
              className="flex min-h-[56px] flex-col items-center justify-center gap-1"
            >
              <HomeIcon className={activeTab === "home" ? "text-(--color-accent-primary)" : "text-(--color-ink-muted)"} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.06em] ${
                  activeTab === "home" ? "text-(--color-accent-primary)" : "text-(--color-ink-muted)"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Home
              </span>
              {activeTab === "home" && (
                <span className="absolute top-0 left-[12.5%] right-[87.5%] h-[2px] bg-(--color-accent-primary)" />
              )}
            </Link>

            {/* Work */}
            <Link
              href="/work"
              className="flex min-h-[56px] flex-col items-center justify-center gap-1"
            >
              <PlayIcon className={activeTab === "work" ? "text-(--color-accent-primary)" : "text-(--color-ink-muted)"} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.06em] ${
                  activeTab === "work" ? "text-(--color-accent-primary)" : "text-(--color-ink-muted)"
                }`}
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Work
              </span>
              {activeTab === "work" && (
                <span className="absolute top-0 left-[37.5%] right-[37.5%] h-[2px] bg-(--color-accent-primary)" />
              )}
            </Link>

            {/* Start a Film — gold accent */}
            <button
              type="button"
              onClick={openFunnel}
              className="flex min-h-[56px] flex-col items-center justify-center gap-1"
              aria-label="Start a film"
            >
              <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-(--color-accent-primary)">
                <PlusIcon className="text-(--color-accent-on-accent)" />
              </span>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.06em] text-(--color-accent-primary)"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Film
              </span>
            </button>

            {/* Menu */}
            <button
              type="button"
              onClick={openMenu}
              className="flex min-h-[56px] flex-col items-center justify-center gap-1"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <MenuIcon className="text-(--color-ink-muted)" />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.06em] text-(--color-ink-muted)"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Menu
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay — always mounted for GSAP exit animations */}
      {menuOpen && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-[100] bg-(--color-bg-canvas) flex flex-col"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <Link
              href="/"
              aria-label="Crave Collective — home"
              onClick={closeMenu}
              className="flex min-h-[48px] items-center text-(--color-ink-primary)"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[22px] tracking-[-0.02em] leading-none">Creative Collective</span>
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="flex h-[48px] w-[48px] items-center justify-center text-(--color-ink-primary)"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={overlayCardsRef} className="flex-1 overflow-y-auto px-4 pb-8 pt-8">
            <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              {primaryMenuLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
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
                    onClick={closeMenu}
                    className="flex min-h-[60px] items-center justify-center border border-(--color-line-hairline) px-3 text-center text-sm font-medium uppercase tracking-[0.06em] text-(--color-ink-primary) transition-colors hover:bg-(--color-ink-overlay-white-8)"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-8 text-center">
              <Caption>&copy; Copyright Crave Collective 2026</Caption>
            </div>
          </div>

          <div className="border-t border-(--color-line-hairline) bg-(--color-bg-canvas) px-6 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                setTimeout(openFunnel, 400);
              }}
              className="flex min-h-[56px] w-full items-center justify-center bg-(--color-accent-primary) px-5 text-sm font-medium uppercase tracking-[0.08em] text-(--color-accent-on-accent) transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Book a Game Plan Call
            </button>
          </div>
        </div>
      )}

      {/* Funnel bottom sheet */}
      {funnelOpen && (
        <>
          <div
            ref={funnelScrimRef}
            className="fixed inset-0 z-[100] bg-black/60"
            onClick={closeFunnel}
            style={{ opacity: 0 }}
          />
          <div
            ref={funnelSheetRef}
            className="fixed inset-x-0 bottom-0 z-[101] flex h-[92dvh] max-h-[92dvh] flex-col bg-(--color-bg-canvas) lg:hidden"
            style={{
              transform: "translateY(100%)",
              borderRadius: "16px 16px 0 0",
              paddingBottom: "env(safe-area-inset-bottom, 0px)",
            }}
          >
            <div className="flex flex-shrink-0 items-center justify-between px-6 pt-4 pb-2">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.08em] text-(--color-ink-muted)"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Start a film
              </span>
              <button
                onClick={closeFunnel}
                aria-label="Close"
                className="flex h-[36px] w-[36px] items-center justify-center text-(--color-ink-muted)"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="min-h-0 flex-1 px-6 pb-6">
              <FunnelForm />
            </div>
          </div>
        </>
      )}
    </>
  );
}
