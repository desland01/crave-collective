import type { ReactNode } from "react";

type LeadProps = {
  children: ReactNode;
  className?: string;
};

export function Lead({ children, className = "" }: LeadProps) {
  return (
    <p
      className={`text-s font-medium text-(--color-ink-secondary) ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </p>
  );
}
