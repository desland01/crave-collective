import Link from "next/link";
import type { ReactNode } from "react";
import { Caption } from "@/components/primitives/Caption";

type CaseStudyTileProps = {
  size?: "full" | "half" | "third";
  href: string;
  client: string;
  title: ReactNode;
  imageSrc?: string;
  className?: string;
};

const sizeClass: Record<NonNullable<CaseStudyTileProps["size"]>, string> = {
  full: "aspect-[16/9]",
  half: "aspect-[4/5]",
  third: "aspect-[3/4]",
};

export function CaseStudyTile({
  size = "half",
  href,
  client,
  title,
  imageSrc,
  className = "",
}: CaseStudyTileProps) {
  return (
    <Link href={href} className={`group block ${className}`}>
      <div
        className={`relative overflow-hidden bg-(--color-bg-elevated) ${sizeClass[size]}`}
      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        ) : null}
        <div className="absolute inset-0 transition-colors duration-200 group-hover:bg-(--color-ink-overlay-white-8)" />
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <Caption>{client}</Caption>
        <p
          className="font-display text-m text-(--color-ink-primary) group-hover:text-(--color-accent-primary) transition-colors duration-200"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </p>
      </div>
    </Link>
  );
}
