import { Nav } from "@/components/compounds/Nav";
import { Footer } from "@/components/compounds/Footer";
import { LutCompare } from "@/components/compounds/LutCompare";
import { Display } from "@/components/primitives/Display";
import { H2 } from "@/components/primitives/H2";
import { H3 } from "@/components/primitives/H3";
import { Body } from "@/components/primitives/Body";
import { Caption } from "@/components/primitives/Caption";
import { Lead } from "@/components/primitives/Lead";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { BrassNumeral } from "@/components/primitives/BrassNumeral";

const BUY_URL = "https://cravecollective.co/store/p/dantesluts";

const compares = [
  { after: "/store/luts/after-1.jpg", before: "/store/luts/before-1.jpg", alt: "Virgin Voyages cruise deck" },
  { after: "/store/luts/after-2.jpg", before: "/store/luts/before-2.jpg", alt: "Mountain sunset silhouettes" },
  { after: "/store/luts/after-3.jpg", before: "/store/luts/before-3.jpg", alt: "Underwater swimming with fish" },
  { after: "/store/luts/after-4.jpg", before: "/store/luts/before-4.jpg", alt: "Beach portrait" },
  { after: "/store/luts/after-5.jpg", before: "/store/luts/before-5.jpg", alt: "Boxer at gym" },
  { after: "/store/luts/after-6.jpg", before: "/store/luts/before-6.jpg", alt: "Smartwatch close-up" },
  { after: "/store/luts/after-7.jpg", before: "/store/luts/before-7.jpg", alt: "Aerial boat wake" },
  { after: "/store/luts/after-8.jpg", before: "/store/luts/before-8.jpg", alt: "Bride and groom lakeside" },
  { after: "/store/luts/after-9.jpg", before: "/store/luts/before-9.jpg", alt: "Two hands against sky" },
  { after: "/store/luts/after-10.jpg", before: "/store/luts/before-10.jpg", alt: "Woman with surfboard" },
];

const features = [
  {
    title: "LOG and Rec709 ready",
    body: "Professional color grading without the guesswork. Drop on any timeline.",
  },
  {
    title: "Six LUTs per camera profile",
    body: "Sony, Canon, Blackmagic, RED, DJI, Panasonic, and a Rec709 fallback — no matter your gear.",
  },
  {
    title: "Six monitoring LUTs",
    body: "Preview the look on set, frame it the way it&rsquo;ll grade.",
  },
  {
    title: "Premiere, Resolve, FCP",
    body: "Compatible with every major edit suite — and the install guide is in the pack.",
  },
];

const faq = [
  {
    q: "How will I receive my LUTs?",
    a: "Instant download. A zip file emailed to you the second checkout clears.",
  },
  {
    q: "What&rsquo;s in the pack?",
    a: "Six expertly crafted LUTs per camera profile (Sony, Canon, Blackmagic, RED, DJI, Rec709), six matching monitoring LUTs for on-set preview, a step-by-step video tutorial, and a written install guide.",
  },
  {
    q: "What software is compatible?",
    a: "DaVinci Resolve, Premiere Pro, Final Cut Pro, CapCut, and any other NLE that accepts .cube LUTs.",
  },
  {
    q: "Can I customize them?",
    a: "Yes. LUTs are a starting point. Tweak contrast, exposure, white balance, and saturation on top to match the footage and the cut.",
  },
];

export default function StorePage() {
  return (
    <main id="main-content" className="bg-(--color-bg-canvas) text-(--color-ink-primary)">
      <Nav state="transparent" />

      {/* Section 1 — Product hero */}
      <section
        aria-label="Dante's LUTs"
        className="px-6 lg:px-12 pt-28 lg:pt-36 pb-16 lg:pb-24"
      >
        <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <Eyebrow>The store</Eyebrow>
            <Display className="max-w-[16ch] text-[44px] sm:text-[64px] lg:text-[96px] leading-[0.95] text-balance">
              The colors you crave.
            </Display>
            <Lead className="max-w-2xl">
              A soft and vibrant filmic look — six LUTs per camera profile, six monitoring LUTs, and a video install guide. The same color science that ships every Crave delivery.
            </Lead>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 mt-4">
              <span
                className="text-[40px] lg:text-m leading-none text-(--color-ink-primary)"
                style={{ fontFamily: "var(--font-display)" }}
              >
                $45
              </span>
              <span
                className="text-[20px] leading-none text-(--color-ink-muted) line-through"
                style={{ fontFamily: "var(--font-display)" }}
              >
                $55
              </span>
              <Caption className="text-(--color-accent-primary)">Sale — limited launch price</Caption>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mt-2">
              <a href={BUY_URL} target="_blank" rel="noreferrer">
                <PrimaryButton size="lg">Grab the LUT pack</PrimaryButton>
              </a>
              <Caption className="text-(--color-ink-muted)">Instant download — install in 2 minutes.</Caption>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-(--color-bg-elevated)">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/store/luts/thumbnail.jpg"
                alt="Dante's LUTs — graded cruise deck"
                width={1200}
                height={1500}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-(--color-bg-canvas)/85 backdrop-blur-sm px-3 py-1.5">
                <Caption className="text-(--color-ink-primary)">Graded — Sony Fx3, S-Log3, Kodak LUT</Caption>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 — Before / After grid */}
      <section
        aria-label="Before and after"
        className="px-6 lg:px-12 py-16 lg:py-24 border-t border-(--color-line-hairline)"
      >
        <div className="mx-auto w-full max-w-[1680px] flex flex-col gap-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="flex flex-col gap-4 max-w-[60ch]">
              <Eyebrow>Before / after</Eyebrow>
              <H2 className="text-[40px] lg:text-l leading-[1.05] text-balance">
                Same footage. The grade is the difference.
              </H2>
            </div>
            <Body className="max-w-md">
              Hover or tap any tile to swap between the graded look and the original log footage.
            </Body>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {compares.map((c, i) => (
              <LutCompare key={c.after} after={c.after} before={c.before} alt={c.alt} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Features */}
      <section
        aria-label="What's in the pack"
        className="bg-(--color-bg-elevated) px-6 lg:px-12 py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-[1680px] flex flex-col gap-16">
          <div className="flex flex-col gap-6 max-w-[40ch]">
            <Eyebrow>What you get</Eyebrow>
            <H2>Soft, vibrant, filmic. Out of the box.</H2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
            {features.map((f, i) => (
              <div key={f.title} className="flex flex-col gap-6">
                <BrassNumeral>{String(i + 1).padStart(2, "0")}</BrassNumeral>
                <div className="flex flex-col gap-3 border-t border-(--color-line-hairline) pt-6">
                  <H3 className="text-[24px] lg:text-[32px]">{f.title}</H3>
                  <Body>{f.body}</Body>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — FAQ */}
      <section
        aria-label="Frequently asked questions"
        className="px-6 lg:px-12 py-24 lg:py-32 border-t border-(--color-line-hairline)"
      >
        <div className="mx-auto w-full max-w-[1680px] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Eyebrow>FAQ</Eyebrow>
            <H2 className="text-[32px] lg:text-m leading-[1.1]">
              Questions before checkout.
            </H2>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-8">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group border-t border-(--color-line-hairline) pt-6 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                  <H3 className="text-[20px] lg:text-[24px] leading-[1.3]">{item.q}</H3>
                  <span
                    aria-hidden="true"
                    className="text-(--color-ink-muted) text-2xl leading-none mt-1 transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <Body className="mt-4 max-w-2xl">{item.a}</Body>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section
        aria-label="Buy the LUT pack"
        className="bg-(--color-bg-elevated) px-6 lg:px-12 py-32 lg:py-48"
      >
        <div className="mx-auto w-full max-w-[1680px] flex flex-col items-center text-center gap-10">
          <Display className="max-w-[18ch] text-[44px] sm:text-[64px] lg:text-display leading-[0.95] text-balance">
            Color science you can install in two minutes.
          </Display>
          <Body className="max-w-2xl text-center mx-auto">
            One download. Six camera profiles. Every NLE.
          </Body>
          <a href={BUY_URL} target="_blank" rel="noreferrer">
            <PrimaryButton size="lg">Grab the LUT pack — $45</PrimaryButton>
          </a>
          <Caption className="text-(--color-ink-muted)">
            Checkout opens at cravecollective.co — instant zip on confirmation.
          </Caption>
        </div>
      </section>

      <Footer />
    </main>
  );
}
