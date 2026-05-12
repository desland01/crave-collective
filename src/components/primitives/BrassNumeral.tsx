import type { ElementType, ReactNode } from "react";

type BrassNumeralProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function BrassNumeral({
  as: Tag = "span",
  children,
  className = "",
}: BrassNumeralProps) {
  return (
    <Tag
      className={`font-display text-l font-normal text-(--color-accent-primary) ${className}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </Tag>
  );
}
