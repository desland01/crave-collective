import type { ReactNode } from "react";
import { Caption } from "@/components/primitives/Caption";

type VideoCardProps = {
  aspect?: "16:9" | "9:16" | "4:3";
  title: ReactNode;
  client?: string;
  posterSrc?: string;
  className?: string;
};

const aspectClass: Record<NonNullable<VideoCardProps["aspect"]>, string> = {
  "16:9": "aspect-[16/9]",
  "9:16": "aspect-[9/16]",
  "4:3": "aspect-[4/3]",
};

export function VideoCard({
  aspect = "16:9",
  title,
  client,
  posterSrc,
  className = "",
}: VideoCardProps) {
  return (
    <figure className={`group block ${className}`}>
      <div
        className={`relative overflow-hidden bg-(--color-bg-elevated) ${aspectClass[aspect]}`}
      >
        {posterSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="absolute inset-0 transition-colors duration-200 group-hover:bg-(--color-ink-overlay-white-8)" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-(--color-ink-primary)/40 text-(--color-ink-primary)">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M 5 3 L 17 10 L 5 17 Z" />
            </svg>
          </span>
        </div>
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4">
        <p
          className="font-display text-s text-(--color-ink-primary)"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </p>
        {client ? <Caption>{client}</Caption> : null}
      </figcaption>
    </figure>
  );
}
