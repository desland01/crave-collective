import type { ElementType, ReactNode } from "react";

type BodyProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Body({ as: Tag = "p", children, className = "" }: BodyProps) {
  return (
    <Tag
      className={`text-xs font-normal text-(--color-ink-secondary) ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </Tag>
  );
}
