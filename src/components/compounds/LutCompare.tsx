"use client";

import { useState } from "react";
import { Caption } from "@/components/primitives/Caption";

type LutCompareProps = {
  after: string;
  before: string;
  alt: string;
  index: number;
};

export function LutCompare({ after, before, alt, index }: LutCompareProps) {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <figure className="flex flex-col gap-3">
      <button
        type="button"
        onMouseEnter={() => setShowBefore(true)}
        onMouseLeave={() => setShowBefore(false)}
        onFocus={() => setShowBefore(true)}
        onBlur={() => setShowBefore(false)}
        onClick={() => setShowBefore((s) => !s)}
        aria-label={`Toggle before / after for image ${index + 1}`}
        className="group relative block aspect-[16/9] w-full overflow-hidden bg-(--color-bg-elevated) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent-primary)"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after}
          alt={`${alt} — graded with Dante's LUTs`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            showBefore ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt={`${alt} — ungraded log footage`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            showBefore ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute top-4 left-4 bg-(--color-bg-canvas)/85 backdrop-blur-sm px-3 py-1.5">
          <Caption className="text-(--color-ink-primary)">
            {showBefore ? "Ungraded" : "Graded"}
          </Caption>
        </div>
      </button>
      <Caption className="text-(--color-ink-muted)">Hover or tap to compare.</Caption>
    </figure>
  );
}
