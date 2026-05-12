import type { ElementType, ReactNode } from "react";

type H1Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function H1({ as: Tag = "h1", children, className = "" }: H1Props) {
  return (
    <Tag
      className={`font-display text-xl font-bold ${className}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </Tag>
  );
}
