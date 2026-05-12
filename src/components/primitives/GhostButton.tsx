import type { ButtonHTMLAttributes, ReactNode } from "react";

type GhostButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "lg" | "md" | "sm";
  children: ReactNode;
  className?: string;
};

// [rule: touch-target-size] min 48px height; [rule: readable-button-text] min 14px
const sizeStyles: Record<NonNullable<GhostButtonProps["size"]>, string> = {
  lg: "px-8 py-4 text-sm min-h-[48px] tracking-[0.04em] uppercase",
  md: "px-6 py-3 text-sm min-h-[48px] tracking-[0.04em] uppercase",
  sm: "px-4 py-3 text-caption min-h-[44px] uppercase tracking-[0.08em]",
};

export function GhostButton({
  size = "md",
  children,
  className = "",
  ...rest
}: GhostButtonProps) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-none border border-(--color-line-hairline) bg-transparent text-(--color-ink-primary) font-medium transition-colors duration-200 hover:bg-(--color-ink-overlay-white-8) disabled:opacity-40 disabled:cursor-not-allowed ${sizeStyles[size]} ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </button>
  );
}
