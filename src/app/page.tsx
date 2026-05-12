import { Nav } from "@/components/compounds/Nav";
import { Footer } from "@/components/compounds/Footer";
import { Testimonial } from "@/components/compounds/Testimonial";
import { Pillar } from "@/components/compounds/Pillar";
import { HomeMotion } from "@/components/motion/HomeMotion";
import { Display } from "@/components/primitives/Display";
import { H2 } from "@/components/primitives/H2";
import { H3 } from "@/components/primitives/H3";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Body } from "@/components/primitives/Body";
import { Caption } from "@/components/primitives/Caption";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";

const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/bookings/ss123-c23343ec-b4bd-4762-a7d8-85f203949a397pcgpz";

const clientLogos = [
  { src: "/clients/paintco.png", alt: "PaintCo" },
  { src: "/clients/robbins.png", alt: "Robbins Real Estate" },
  { src: "/clients/compass.png", alt: "Compass" },
  { src: "/clients/vertical-chiropractic.webp", alt: "Vertical Chiropractic" },
  { src: "/clients/rush-cycle.png", alt: "Rush Cycle" },
  { src: "/clients/pod-company.png", alt: "The Pod Company" },
  { src: "/clients/virgin-voyages.png", alt: "Virgin Voyages" },
  { src: "/clients/3form.png", alt: "3form" },
  { src: "/clients/shred.png", alt: "Shred" },
  { src: "/clients/team-ltd.png", alt: "Team Ltd" },
];

const pillars = [
  {
    numeral: "01",
    eyebrow: "Strategy",
    body: "We immerse in your brand to uncover the value, audience, and goals that make every frame work harder for the outcomes you care about.",
  },
  {
    numeral: "02",
    eyebrow: "Content",
    body: "We produce every frame — from prep to color — building cinematic content that reflects the brand and resonates with the people you serve.",
  },
  {
    numeral: "03",
    eyebrow: "Distribution",
    body: "We handle distribution and lead generation so qualified prospects find you while you stay focused on the craft of running your business.",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="bg-(--color-bg-canvas) text-(--color-ink-primary)">
      <HomeMotion />
      <Nav state="transparent" />

      {/* Section 1 — Hero (100vh, full-bleed video) */}
      <section aria-label="Hero" className="relative h-screen w-full overflow-hidden">
        <div data-anim="hero-bg" className="absolute inset-0">
          <video
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            poster="/posters/hero.jpg"
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/hero-loop.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 lg:px-12 pb-16 lg:pb-24">
          <div data-anim="hero-stack" className="mx-auto w-full max-w-[1680px] space-y-6 lg:space-y-8">
            <Eyebrow>Crave Collective — Sarasota</Eyebrow>
            <Display className="max-w-[18ch] text-[44px] sm:text-[64px] lg:text-display leading-[0.95] text-balance">
              Cinematic content that closes.
            </Display>
            <Body className="max-w-[56ch] text-(--color-ink-primary)/80">
              Listing films, brand stories, and lead-generating reels for real-estate teams and home-service businesses.
            </Body>
          </div>
        </div>
      </section>

      {/* Section 2 — Intro statement */}
      <section aria-label="Why Crave" className="bg-(--color-bg-canvas) px-6 lg:px-40 py-32 lg:py-48">
        <div className="mx-auto w-full max-w-[1200px] space-y-12">
          <Eyebrow>Why Crave</Eyebrow>
          <div data-anim="intro-statement">
            <H2 className="text-[32px] lg:text-l leading-[1.15] text-(--color-ink-secondary)">
              We believe video should{" "}
              <span className="text-(--color-ink-primary)">move the needle</span>{" "}
              for your business — not just look good. So we approach every project
              with the outcome first:{" "}
              <span className="text-(--color-ink-primary)">close the listing</span>,{" "}
              <span className="text-(--color-ink-primary)">book the calendar</span>,{" "}
              <span className="text-(--color-ink-primary)">build the brand</span>{" "}
              that brings them back.
            </H2>
          </div>
        </div>
      </section>

      {/* Section 3 — Two-vertical split */}
      <section aria-label="What we make" className="bg-(--color-bg-canvas) border-t border-(--color-line-hairline) px-6 lg:px-12 py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Real Estate column */}
          <div data-anim="vertical-real-estate" className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <Eyebrow>Real Estate</Eyebrow>
              {/* [rule: heading-hierarchy] H2 — only one H1 per page */}
              <H2 className="text-[64px] lg:text-xl leading-[0.95]">
                Listings that close fast.
              </H2>
              <Body className="max-w-[48ch]">
                Listing films, agent reels, and project pieces that turn lookers into showings — footage that makes the property feel inevitable.
              </Body>
            </div>
            <figure className="flex flex-col gap-4">
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-(--color-bg-elevated)">
                <video
                  aria-hidden="true"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/posters/reel-real-estate.jpg"
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src="/videos/reel-real-estate.mp4" type="video/mp4" />
                </video>
              </div>
              <Caption>Longboat Key at the Promenade — RNW Construction</Caption>
            </figure>
          </div>

          {/* Listing-film column */}
          <div data-anim="vertical-home-services" className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <Eyebrow>Listing Films</Eyebrow>
              {/* [rule: heading-hierarchy] H2 — only one H1 per page */}
              <H2 className="text-[64px] lg:text-xl leading-[0.95]">
                Films that sell the home.
              </H2>
              <Body className="max-w-[48ch]">
                Cinematic listing films and agent brand pieces for the properties and producers that need to lead the market — drone, walk-through, and on-camera presence.
              </Body>
            </div>
            <figure className="flex flex-col gap-4">
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-(--color-bg-elevated)">
                <video
                  aria-hidden="true"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/posters/reel-dedicated-to-sell.jpg"
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "35% 50%" }}
                >
                  <source src="/videos/reel-dedicated-to-sell.mp4" type="video/mp4" />
                </video>
              </div>
              <Caption>Dedicated To Sell — Sarasota luxury listing</Caption>
            </figure>
          </div>
        </div>
      </section>

      {/* Section 4 — Combined client marquee */}
      <section aria-label="Trusted by" className="bg-(--color-bg-canvas) py-24 lg:py-32">
        <Eyebrow as="p" className="block text-center mb-16">
          Trusted by
        </Eyebrow>
        <div className="relative overflow-hidden border-y border-(--color-line-hairline) py-12">
          <div
            className="flex w-max items-center gap-32 whitespace-nowrap"
            style={{ animation: `marquee-x 90s linear infinite` }}
          >
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                width={240}
                height={80}
                loading="lazy"
                className="h-20 w-auto shrink-0 opacity-80"
                style={{
                  filter: "grayscale(100%) brightness(0) invert(1) opacity(0.7)",
                }}
              />
            ))}
          </div>
          {/* Edge fade masks for cinematic feel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-32"
            style={{
              background: "linear-gradient(to right, var(--color-bg-canvas), transparent)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-32"
            style={{
              background: "linear-gradient(to left, var(--color-bg-canvas), transparent)",
            }}
          />
        </div>
      </section>

      {/* Section 5 — Process pillars */}
      <section aria-label="How we work" className="bg-(--color-bg-elevated) px-6 lg:px-40 py-32 lg:py-48">
        <div className="mx-auto w-full max-w-[1680px]">
          <div className="flex flex-col gap-6 max-w-[40ch]">
            <Eyebrow>How we work</Eyebrow>
            <H2>A proven process to attract the clients you crave.</H2>
          </div>
          <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {pillars.map((p) => (
              <div key={p.eyebrow} data-anim="pillar">
                <Pillar {...p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Founder note */}
      <section aria-label="A note from Dante" className="bg-(--color-bg-canvas) px-6 lg:px-40 py-32 lg:py-48">
        <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-5">
            <div
              data-anim="founder-portrait"
              className="relative aspect-[4/5] w-full overflow-hidden bg-(--color-bg-elevated)"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/posters/founder-portrait.jpg"
                alt="Behind the scenes — Dante on set"
                width={800}
                height={1000}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div data-anim="founder-text" className="lg:col-span-6 lg:col-start-7 flex flex-col gap-8">
            <Eyebrow>A note from Dante</Eyebrow>
            <H3 className="leading-[1.2]">
              We believe video content should be more than entertaining. It should move the needle. For us, that means working closely with you to understand your unique business and creating cinematic content designed to hit your specific objectives — sales, awareness, loyalty. We&rsquo;re not making content for content&rsquo;s sake. We&rsquo;re making the film that closes the deal.
            </H3>
            <Caption>— Dante, Founder &amp; Creative Director</Caption>
          </div>
        </div>
      </section>

      {/* Section 7 — Testimonials */}
      <section aria-label="What clients say" className="bg-(--color-bg-canvas) border-t border-(--color-line-hairline) px-6 lg:px-40 py-32 lg:py-48">
        <div className="mx-auto w-full max-w-[1680px] space-y-24">
          <Eyebrow as="p" className="block text-center">
            What clients say
          </Eyebrow>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 items-stretch">
            <div data-anim="testimonial" className="flex">
              <Testimonial
                className="h-full justify-between"
                quote="Dante handled video production and Meta ad creation for my business — and the results blew past what I expected. He understands both the creative and the paid media side, and delivers on both."
                attribution="Desmond Landry"
                role="Agency owner"
              />
            </div>
            <div data-anim="testimonial" className="flex">
              <Testimonial
                className="h-full justify-between"
                quote="Hands down my favorite videographer I've ever worked with. Dante has a creative mind that takes my content to the next level — I've closed several homes just from the videos he created for me."
                attribution="Jenna Bryant"
                role="Real-estate agent"
              />
            </div>
            <div data-anim="testimonial" className="flex">
              <Testimonial
                className="h-full justify-between"
                quote="Hands down the best company I've worked with. My revenue is up, my social presence has exploded, and the attention to detail is amazing — they truly position you to be the best."
                attribution="Adnan Dedic"
                role="Service-business owner"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 — Contact CTA */}
      <section aria-label="Book a Game Plan Call" className="bg-(--color-bg-elevated) px-6 lg:px-12 py-32 lg:py-48">
        <div data-anim="contact-cta" className="mx-auto w-full max-w-[1680px] flex flex-col items-center text-center gap-10">
          <Display className="max-w-[16ch] text-[44px] sm:text-[64px] lg:text-display leading-[0.95] text-balance">
            Let&rsquo;s make something cinematic.
          </Display>
          <Body className="max-w-2xl text-center mx-auto">
            Tell us what you&rsquo;re shooting for. We&rsquo;ll show you the path.
          </Body>
          <a href={BOOKING_URL} target="_blank" rel="noreferrer">
            <PrimaryButton size="lg">Book a Game Plan Call</PrimaryButton>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
