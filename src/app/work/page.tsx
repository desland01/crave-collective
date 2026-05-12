import { Nav } from "@/components/compounds/Nav";
import { Footer } from "@/components/compounds/Footer";
import { Display } from "@/components/primitives/Display";
import { H2 } from "@/components/primitives/H2";
import { Body } from "@/components/primitives/Body";
import { Lead } from "@/components/primitives/Lead";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Caption } from "@/components/primitives/Caption";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";

const R2 = "https://pub-733eaf5743f540d69e17d406d88428c4.r2.dev";

const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/bookings/ss123-c23343ec-b4bd-4762-a7d8-85f203949a397pcgpz";

type Reel = {
  video: string;
  poster: string;
  client: string;
  context: string;
  aspect: "9/16" | "16/9";
};

const featured: Reel = {
  video: `${R2}/videos/reel-dedicated-to-sell.mp4`,
  poster: "/posters/reel-dedicated-to-sell.jpg",
  client: "Dedicated To Sell",
  context: "Sarasota luxury listing — drone, walk-through, and on-camera presence.",
  aspect: "16/9",
};

const realEstateVerticals: Reel[] = [
  {
    video: `${R2}/videos/reel-real-estate.mp4`,
    poster: "/posters/reel-real-estate.jpg",
    client: "RNW Construction",
    context: "Longboat Key at the Promenade — new-build reveal.",
    aspect: "9/16",
  },
];

const localPros: Reel[] = [
  {
    video: `${R2}/videos/reel-painter.mp4`,
    poster: "/posters/reel-painter.jpg",
    client: "Grove Street Painting",
    context: "Owner-on-camera reel for the Sarasota painter.",
    aspect: "9/16",
  },
  {
    video: `${R2}/videos/reel-fitness.mp4`,
    poster: "/posters/reel-fitness.jpg",
    client: "Outdoor coach",
    context: "NoBull-clad athlete portrait — personal trainer brand piece.",
    aspect: "9/16",
  },
  {
    video: `${R2}/videos/reel-chiro.mp4`,
    poster: "/posters/reel-chiro.jpg",
    client: "Vertical Chiropractic",
    context: "Clinician explainer — credibility upfront.",
    aspect: "9/16",
  },
];

const brandFilms: Reel[] = [
  {
    video: `${R2}/videos/reel-sandals.mp4`,
    poster: "/posters/reel-sandals.jpg",
    client: "Sandals Resorts",
    context: "Resort destination film — Caribbean.",
    aspect: "16/9",
  },
  {
    video: `${R2}/videos/reel-virgin-voyages.mp4`,
    poster: "/posters/reel-virgin-voyages.jpg",
    client: "Virgin Voyages",
    context: "Cruise-line destination video — Mallorca.",
    aspect: "16/9",
  },
];

const colorScience: Reel[] = [
  {
    video: `${R2}/videos/reel-colors-you-crave.mp4`,
    poster: "/posters/reel-colors-you-crave.jpg",
    client: "Dante's LUTs — product demo",
    context: "Split-screen graded vs ungraded — the colors you crave, out of the box.",
    aspect: "16/9",
  },
  {
    video: `${R2}/videos/reel-hvar-away.mp4`,
    poster: "/posters/reel-hvar-away.jpg",
    client: "Hvar Away — color in the wild",
    context: "The same color science shipped on a destination brand piece in Croatia.",
    aspect: "16/9",
  },
];

const brandSizzle: Reel = {
  video: `${R2}/videos/hero-loop.mp4`,
  poster: "/posters/hero.jpg",
  client: "Crave Collective",
  context: "Brand sizzle — every vertical, one signature.",
  aspect: "16/9",
};

function ReelTile({ reel, priority = false }: { reel: Reel; priority?: boolean }) {
  return (
    <figure className="flex flex-col gap-4">
      <div
        className={`relative w-full overflow-hidden bg-(--color-bg-elevated) ${
          reel.aspect === "9/16" ? "aspect-[9/16]" : "aspect-[16/9]"
        }`}
      >
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          poster={reel.poster}
          preload={priority ? "metadata" : "none"}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={reel.video} type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-col gap-1">
        <Caption className="text-(--color-ink-primary)">{reel.client}</Caption>
        <Body className="text-(--color-ink-secondary)">{reel.context}</Body>
      </div>
    </figure>
  );
}

export default function WorkIndex() {
  return (
    <main id="main-content" className="bg-(--color-bg-canvas) text-(--color-ink-primary)">
      <Nav state="transparent" />

      {/* Section 1 — Hero intro */}
      <section
        aria-label="Work hero"
        className="px-6 lg:px-12 pt-28 lg:pt-36 pb-12 lg:pb-20"
      >
        <div className="mx-auto w-full max-w-[1680px]">
          <Eyebrow>The work</Eyebrow>
          <Display className="mt-6 lg:mt-8 max-w-[22ch] text-[44px] sm:text-[64px] lg:text-[96px] leading-[0.95] text-balance">
            Cinematic content that earned its results.
          </Display>
          <Lead className="mt-8 max-w-2xl">
            A small selection of recent films. Listings that closed. Reels that booked calendars. Brand pieces that made resorts and cruise lines look like the only choice on the coast.
          </Lead>
        </div>
      </section>

      {/* Section 2 — Featured listing */}
      <section
        aria-label="Featured listing"
        className="px-6 lg:px-12 py-16 lg:py-24 border-t border-(--color-line-hairline)"
      >
        <div className="mx-auto w-full max-w-[1680px] flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="flex flex-col gap-4 max-w-[60ch]">
              <Eyebrow>Featured listing</Eyebrow>
              <H2 className="text-[40px] lg:text-l leading-[1.05] text-balance">
                The listing that sold a $108M year.
              </H2>
            </div>
            <Body className="max-w-md">
              Drone establishing, owner-on-camera narrative, suite walkthrough — the film that closes the showing before the showing.
            </Body>
          </div>
          <ReelTile reel={featured} priority />
        </div>
      </section>

      {/* Section 3 — Real estate verticals */}
      <section
        aria-label="Real estate"
        className="px-6 lg:px-12 py-16 lg:py-24 border-t border-(--color-line-hairline)"
      >
        <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Eyebrow>Real estate</Eyebrow>
            <H2 className="text-[40px] lg:text-m leading-[1.1]">
              Listing films and agent reels.
            </H2>
            <Body>
              Vertical-first content for the producer agents and new-construction teams who need every showing to feel inevitable.
            </Body>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {realEstateVerticals.map((reel) => (
              <ReelTile key={reel.client} reel={reel} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Local pros */}
      <section
        aria-label="Local service pros"
        className="px-6 lg:px-12 py-16 lg:py-24 border-t border-(--color-line-hairline)"
      >
        <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Eyebrow>Local service pros</Eyebrow>
            <H2 className="text-[40px] lg:text-m leading-[1.1]">
              Owner-on-camera, trust upfront.
            </H2>
            <Body>
              Painters, gyms, clinicians — service pros who want to be the obvious local choice. Cinematic enough to earn the click, real enough to earn the booking.
            </Body>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {localPros.map((reel) => (
              <ReelTile key={reel.client} reel={reel} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Brand films */}
      <section
        aria-label="Brand films"
        className="px-6 lg:px-12 py-16 lg:py-24 border-t border-(--color-line-hairline)"
      >
        <div className="mx-auto w-full max-w-[1680px] flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 max-w-[1280px]">
            <div className="flex flex-col gap-4 max-w-[60ch]">
              <Eyebrow>Brand films</Eyebrow>
              <H2 className="text-[40px] lg:text-l leading-[1.05] text-balance">
                Destinations, resorts, and the colors of arrival.
              </H2>
            </div>
            <Body className="max-w-md">
              Long-form work for travel and hospitality brands. Built to be watched, not scrolled past.
            </Body>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {brandFilms.map((reel) => (
              <ReelTile key={reel.client} reel={reel} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Color science */}
      <section
        aria-label="Color science"
        className="px-6 lg:px-12 py-16 lg:py-24 border-t border-(--color-line-hairline)"
      >
        <div className="mx-auto w-full max-w-[1680px] flex flex-col gap-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="flex flex-col gap-4 max-w-[60ch]">
              <Eyebrow>Color science</Eyebrow>
              <H2 className="text-[40px] lg:text-l leading-[1.05] text-balance">
                The color that turns footage into film.
              </H2>
            </div>
            <Body className="max-w-md">
              The grade is the difference between footage and film. Same camera, same light, two different worlds — the LUTs that ship every Crave delivery.
            </Body>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {colorScience.map((reel) => (
              <ReelTile key={reel.client} reel={reel} />
            ))}
          </div>
          <div className="flex items-center gap-6">
            <a href="/store">
              <PrimaryButton size="lg">Get Dante&rsquo;s LUTs</PrimaryButton>
            </a>
            <Body className="text-(--color-ink-muted)">From $45 — install in Premiere, Resolve, FCP.</Body>
          </div>
        </div>
      </section>

      {/* Section 7 — Brand sizzle */}
      <section
        aria-label="Brand sizzle"
        className="px-6 lg:px-12 py-16 lg:py-24 border-t border-(--color-line-hairline)"
      >
        <div className="mx-auto w-full max-w-[1680px] flex flex-col gap-10">
          <div className="flex flex-col gap-4 max-w-[60ch]">
            <Eyebrow>The reel</Eyebrow>
            <H2 className="text-[40px] lg:text-l leading-[1.05] text-balance">
              Every vertical, one signature look.
            </H2>
          </div>
          <ReelTile reel={brandSizzle} />
        </div>
      </section>

      {/* Section 8 — CTA */}
      <section
        aria-label="Book a Game Plan Call"
        className="bg-(--color-bg-elevated) px-6 lg:px-12 py-32 lg:py-48"
      >
        <div className="mx-auto w-full max-w-[1680px] flex flex-col items-center text-center gap-10">
          <Display className="max-w-[16ch] text-[44px] sm:text-[64px] lg:text-display leading-[0.95] text-balance">
            Your film is the next one on this page.
          </Display>
          <Body className="max-w-2xl text-center mx-auto">
            Two projects a quarter. Send the brief — we&rsquo;ll show you the path.
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
