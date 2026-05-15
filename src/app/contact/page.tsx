import type { Metadata } from "next";
import { Nav } from "@/components/compounds/Nav";
import { Footer } from "@/components/compounds/Footer";
import { Display } from "@/components/primitives/Display";
import { Lead } from "@/components/primitives/Lead";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Body } from "@/components/primitives/Body";
import { FunnelForm } from "@/components/compounds/FunnelForm";

export const metadata: Metadata = {
  title: "Contact — Start a Film | Crave Collective",
  description:
    "Book a Game Plan Call with Crave Collective. Cinematic video for real estate and local service businesses in Sarasota.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="bg-(--color-bg-canvas) text-(--color-ink-primary)">
      <Nav state="transparent" />

      {/* Section 1 — Hero */}
      <section aria-label="Contact hero" className="px-6 lg:px-12 pt-28 lg:pt-36 pb-12 lg:pb-20">
        <div className="mx-auto w-full max-w-[1680px]">
          <Eyebrow>Start a film</Eyebrow>
          <Display className="mt-6 lg:mt-8 max-w-[20ch] text-[44px] sm:text-[64px] lg:text-[96px] leading-[0.95] text-balance">
            Tell us what you want to make.
          </Display>
          <Lead className="mt-8 max-w-2xl">
            Four quick steps. Pick the service, tell us about it, choose a time, and we&rsquo;ll call you.
          </Lead>
        </div>
      </section>

      {/* Section 2 — Funnel Form */}
      <section aria-label="Booking funnel" className="px-6 lg:px-12 py-10 md:py-16 lg:py-24 border-t border-(--color-line-hairline)">
        <div className="mx-auto h-[min(680px,calc(100dvh-104px))] min-h-[540px] w-full max-w-[720px] md:h-[660px] lg:h-[680px]">
          <FunnelForm />
        </div>
      </section>

      {/* Section 3 — Studio info */}
      <section aria-label="Studio information" className="px-6 lg:px-12 py-16 lg:py-32 border-t border-(--color-line-hairline)">
        <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <Eyebrow>Studio</Eyebrow>
            <Body className="text-(--color-ink-primary)">Sarasota, Florida</Body>
            <Body className="text-(--color-ink-secondary)">Shooting up and down the Gulf Coast</Body>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow>Direct line</Eyebrow>
            <Body className="text-(--color-ink-primary)">
              <a href="mailto:dante@cravecollective.co" className="hover:text-(--color-accent-primary) transition-colors">
                dante@cravecollective.co
              </a>
            </Body>
            <Body className="text-(--color-ink-secondary)">Replies within two business days</Body>
          </div>
          <div className="flex flex-col gap-3">
            <Eyebrow>Find us</Eyebrow>
            <Body className="text-(--color-ink-primary)">
              <a
                href="https://instagram.com/cravecollectivee"
                target="_blank"
                rel="noreferrer"
                className="hover:text-(--color-accent-primary) transition-colors"
              >
                Instagram — @cravecollectivee
              </a>
            </Body>
            <Body className="text-(--color-ink-secondary)">Latest cuts and behind the scenes</Body>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
