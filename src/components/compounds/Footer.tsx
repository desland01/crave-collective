import Link from "next/link";
import { Caption } from "@/components/primitives/Caption";
import { Body } from "@/components/primitives/Body";

export function Footer() {
  return (
    <footer className="border-t border-(--color-line-hairline) bg-(--color-bg-canvas)">
      <div className="mx-auto w-full max-w-[1680px] px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            {/* Typographic fallback (kept for reference):
                <p className="font-display text-m text-(--color-ink-primary)">Crave Collective</p>
            */}
            <Link
              href="/"
              aria-label="Crave Collective — home"
              className="block text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-[32px] tracking-[-0.02em] leading-none">Crave Collective</span>
            </Link>
            <Body className="mt-6 max-w-md">
              Cinematic content for real-estate agents and home-service businesses in Sarasota and beyond.
            </Body>
          </div>
          <div>
            <Caption>Studio</Caption>
            <ul className="mt-6 space-y-3">
              <li>
                <Link
                  href="/work"
                  className="text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors"
                >
                  Store — LUTs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={"https://api.leadconnectorhq.com/widget/bookings/ss123-c23343ec-b4bd-4762-a7d8-85f203949a397pcgpz"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors"
                >
                  Book a Game Plan Call
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/cravecollectivee"
                  target="_blank"
                  rel="noreferrer"
                  className="text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <Caption>Contact</Caption>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href="mailto:dante@cravecollective.co"
                  className="text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors"
                >
                  dante@cravecollective.co
                </a>
              </li>
              <li className="text-(--color-ink-secondary)">Sarasota, Florida</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 lg:mt-24 flex flex-col lg:flex-row justify-between gap-6 border-t border-(--color-line-hairline) pt-8">
          <Caption>© Copyright Crave Collective 2026 — All Rights Reserved</Caption>
          <Caption>Sarasota · Florida</Caption>
        </div>
      </div>
    </footer>
  );
}
