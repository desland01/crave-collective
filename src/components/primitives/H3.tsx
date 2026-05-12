import type { ElementType, ReactNode } from "react";

type H3Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function H3({ as: Tag = "h3", children, className = "" }: H3Props) {
  return (
    <Tag
      className={`font-display text-m font-normal ${className}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </Tag>
  );
}
