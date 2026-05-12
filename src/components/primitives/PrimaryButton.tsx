import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "lg" | "md" | "sm";
  children: ReactNode;
  className?: string;
};

// [rule: touch-target-size] min 48px height; [rule: readable-button-text] min 14px
const sizeStyles: Record<NonNullable<PrimaryButtonProps["size"]>, string> = {
  lg: "px-8 py-4 text-sm min-h-[48px] tracking-[0.04em] uppercase",
  md: "px-6 py-3 text-sm min-h-[48px] tracking-[0.04em] uppercase",
  sm: "px-4 py-3 text-caption min-h-[44px] uppercase tracking-[0.08em]",
};

export function PrimaryButton({
  size = "md",
  children,
  className = "",
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-none bg-(--color-accent-primary) text-(--color-accent-on-accent) font-medium transition-[background-color,opacity] duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed ${sizeStyles[size]} ${className}`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </button>
  );
}
