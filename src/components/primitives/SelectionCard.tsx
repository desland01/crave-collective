"use client";

import type { ReactNode } from "react";

type SelectionCardProps = {
  selected: boolean;
  onSelect: () => void;
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
};

export function SelectionCard({
  selected,
  onSelect,
  icon,
  title,
  description,
  className = "",
}: SelectionCardProps) {
  return (
    <div
      role="option"
      aria-selected={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`flex min-h-[48px] cursor-pointer items-start gap-4 rounded-none px-5 py-4 transition-[border-color,box-shadow] duration-200 ${
        selected
          ? "border-2 border-(--color-accent-primary) shadow-[0_0_12px_rgba(184,130,70,0.15)]"
          : "border border-(--color-line-hairline)"
      } bg-(--color-bg-elevated) ${className}`}
    >
      {icon && <span className="shrink-0 pt-0.5">{icon}</span>}
      <div className="flex flex-col gap-1">
        <span
          className="text-sm text-(--color-ink-primary) leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </span>
        {description && (
          <span
            className="text-caption text-(--color-ink-muted) leading-relaxed"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
