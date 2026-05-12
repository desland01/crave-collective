import type { ElementType, ReactNode } from "react";

type DisplayProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Display({ as: Tag = "h1", children, className = "" }: DisplayProps) {
  return (
    <Tag
      className={`font-display text-display font-black ${className}`}
      style={{ fontFamily: "var(--font-display)" }}
    >
      {children}
    </Tag>
  );
}
