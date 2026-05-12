import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkArrowProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  className?: string;
};

export function LinkArrow({ children, className = "", ...rest }: LinkArrowProps) {
  return (
    <a
      {...rest}
      className={`group inline-flex items-center gap-3 text-(--color-ink-primary) hover:text-(--color-accent-primary) transition-colors duration-200 ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      <span className="text-caption font-medium uppercase tracking-[0.08em]">{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        <path
          d="M 1 8 L 15 8 M 9 2 L 15 8 L 9 14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
