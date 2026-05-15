"use client";

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

type TimeSlotGridProps = {
  slots: string[];
  value: string | null;
  onChange: (slot: string) => void;
  loading?: boolean;
  className?: string;
};

export function TimeSlotGrid({
  slots,
  value,
  onChange,
  loading = false,
  className = "",
}: TimeSlotGridProps) {
  if (loading) {
    return (
      <div className={`grid grid-cols-3 gap-2 ${className}`}>
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="min-h-[48px] animate-pulse rounded-none bg-(--color-bg-elevated) border border-(--color-line-hairline)"
          />
        ))}
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div
        className={`flex min-h-[96px] items-center justify-center ${className}`}
      >
        <span
          className="text-sm text-(--color-ink-muted)"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          No slots available
        </span>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-3 gap-2 ${className}`}
      role="listbox"
    >
      {slots.map((slot) => {
        const isSelected = value === slot;
        return (
          <button
            key={slot}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onChange(slot)}
            className={`min-h-[48px] rounded-none text-sm font-medium transition-[background-color,border-color,color] duration-200 ${
              isSelected
                ? "bg-(--color-accent-primary) text-(--color-accent-on-accent) border border-transparent"
                : "bg-(--color-bg-elevated) text-(--color-ink-primary) border border-(--color-line-hairline)"
            }`}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {formatTime(slot)}
          </button>
        );
      })}
    </div>
  );
}
