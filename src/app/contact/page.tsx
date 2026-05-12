import { Nav } from "@/components/compounds/Nav";
import { Footer } from "@/components/compounds/Footer";
import { Display } from "@/components/primitives/Display";
import { Lead } from "@/components/primitives/Lead";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Body } from "@/components/primitives/Body";
import { ContactForm } from "@/components/compounds/ContactForm";

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
            We take two new projects a quarter. Send a short note on who you are, what you&rsquo;re building, and the room you want to film in.
          </Lead>
        </div>
      </section>

      {/* Section 2 — Form */}
      <section aria-label="Contact form" className="px-6 lg:px-12 py-16 lg:py-32 border-t border-(--color-line-hairline)">
        <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>The brief</Eyebrow>
            <Body className="mt-6 max-w-sm">
              Six fields. None of them are required. We answer every brief within two business days, with a yes, a not-this-quarter, or a counter-offer.
            </Body>
          </div>
          <ContactForm />
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
