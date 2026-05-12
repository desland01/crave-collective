import type { ElementType, ReactNode } from "react";

type EyebrowProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ as: Tag = "span", children, className = "" }: EyebrowProps) {
  return (
    <Tag
      className={`text-[14px] leading-[1.4] font-medium uppercase tracking-[0.08em] text-(--color-accent-primary) ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </Tag>
  );
}
