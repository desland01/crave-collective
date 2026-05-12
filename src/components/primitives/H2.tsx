import type { ElementType, ReactNode } from "react";

type H2Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function H2({ as: Tag = "h2", children, className = "" }: H2Props) {
  return (
    <Tag
      className={`font-display text-l font-normal ${className}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </Tag>
  );
}
