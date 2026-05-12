import type { ElementType, ReactNode } from "react";

type CaptionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Caption({ as: Tag = "span", children, className = "" }: CaptionProps) {
  return (
    <Tag
      className={`text-[14px] leading-[1.4] font-medium uppercase tracking-[0.08em] text-(--color-ink-muted) ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </Tag>
  );
}
