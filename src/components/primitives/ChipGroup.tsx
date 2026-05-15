"use client";

type ChipGroupProps = {
  options: { value: string; label: string }[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multi?: boolean;
  className?: string;
};

export function ChipGroup({
  options,
  value,
  onChange,
  multi = false,
  className = "",
}: ChipGroupProps) {
  const selected = Array.isArray(value) ? value : [value];

  function handleSelect(optionValue: string) {
    if (multi) {
      const arr = Array.isArray(value) ? value : [value];
      const next = arr.includes(optionValue)
        ? arr.filter((v) => v !== optionValue)
        : [...arr, optionValue];
      onChange(next);
    } else {
      onChange(optionValue);
    }
  }

  return (
    <div
      className={`no-scrollbar flex gap-2 overflow-x-auto ${className}`}
      style={{ scrollSnapType: "x mandatory" }}
      role="listbox"
      aria-multiselectable={multi}
    >
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => handleSelect(opt.value)}
            className={`shrink-0 rounded-full px-5 min-h-[48px] text-sm uppercase tracking-[0.04em] font-medium transition-[background-color,border-color,color] duration-200 ${
              isSelected
                ? "bg-(--color-accent-primary) text-(--color-accent-on-accent) border border-transparent"
                : "bg-(--color-bg-elevated) text-(--color-ink-primary) border border-(--color-line-hairline)"
            }`}
            style={{
              fontFamily: "var(--font-sans)",
              scrollSnapAlign: "start",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
