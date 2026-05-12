type MarqueeProps = {
  items: string[];
  durationSeconds?: number;
  className?: string;
};

export function Marquee({ items, durationSeconds = 60, className = "" }: MarqueeProps) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`relative overflow-hidden border-y border-(--color-line-hairline) py-10 ${className}`}
    >
      <div
        className="flex w-max items-center gap-16 whitespace-nowrap"
        style={{
          animation: `marquee-x ${durationSeconds}s linear infinite`,
        }}
      >
        {doubled.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="text-caption font-medium uppercase tracking-[0.08em] text-(--color-ink-muted)"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
