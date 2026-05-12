import { Nav } from "@/components/compounds/Nav";
import { Footer } from "@/components/compounds/Footer";
import { Display } from "@/components/primitives/Display";
import { Lead } from "@/components/primitives/Lead";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Body } from "@/components/primitives/Body";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { LinkArrow } from "@/components/primitives/LinkArrow";

const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/bookings/ss123-c23343ec-b4bd-4762-a7d8-85f203949a397pcgpz";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

const SLUG_LABELS: Record<string, string> = {
  "longboat-key": "Longboat Key at the Promenade",
  "grove-street-painting": "Grove Street Painting",
  "robbins-real-estate": "Robbins Real Estate",
};

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const label = SLUG_LABELS[slug] ?? "A film in production";

  return (
    <main id="main-content" className="bg-(--color-bg-canvas) text-(--color-ink-primary)">
      <Nav state="transparent" />

      <section
        aria-label={`${label} — case study`}
        className="relative min-h-screen flex flex-col justify-center px-6 lg:px-12 py-32 lg:py-48"
      >
        <div className="mx-auto w-full max-w-[1280px] flex flex-col gap-12">
          <Eyebrow>Case study · {label}</Eyebrow>
          <Display className="max-w-[20ch] text-[44px] sm:text-[64px] lg:text-[96px] leading-[0.95] text-balance">
            The film is locked. The page is on the way.
          </Display>
          <Lead className="max-w-2xl">
            We are finishing the cut and pulling stills. If you want to see this case study before it ships, book a Game Plan Call and we will walk you through the rough.
          </Lead>
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">
              <PrimaryButton size="lg">Book a Game Plan Call</PrimaryButton>
            </a>
            <LinkArrow href="/">See the rest of the work</LinkArrow>
          </div>
          <div className="mt-12 pt-12 border-t border-(--color-line-hairline) max-w-2xl">
            <Body>
              In the meantime, the homepage reel shows the cinematic style and finished pieces from the same body of work.
            </Body>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
