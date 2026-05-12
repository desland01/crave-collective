import type { ReactNode } from "react";
import { Caption } from "@/components/primitives/Caption";

type TestimonialProps = {
  quote: ReactNode;
  attribution: string;
  role?: string;
  portraitSrc?: string;
  className?: string;
};

export function Testimonial({
  quote,
  attribution,
  role,
  portraitSrc,
  className = "",
}: TestimonialProps) {
  return (
    <figure className={`flex flex-col gap-12 w-full ${className}`}>
      <blockquote
        className="font-display text-s lg:text-m font-normal text-(--color-ink-primary) leading-[1.2]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        “{quote}”
      </blockquote>
      <figcaption className="flex items-center gap-6">
        {portraitSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={portraitSrc}
            alt=""
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-(--color-bg-elevated)" />
        )}
        <div className="flex flex-col gap-1">
          <span
            className="text-(--color-ink-primary)"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {attribution}
          </span>
          {role ? <Caption>{role}</Caption> : null}
        </div>
      </figcaption>
    </figure>
  );
}
