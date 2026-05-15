"use client";

import { DayFlag, DayPicker, SelectionState, UI } from "@daypicker/react";

type BookingCalendarProps = {
  value: string | null;
  onChange: (date: string) => void;
  className?: string;
};

function toYMD(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromYMD(ymd: string | null): Date | undefined {
  if (!ymd) {
    return undefined;
  }

  const [year, month, day] = ymd.split("-").map(Number);

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(year, month - 1, day);
}

function startOfToday(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function formatSelectedDate(date: Date | undefined): string {
  if (!date) {
    return "Choose a shoot-call date.";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function BookingCalendar({ value, onChange, className = "" }: BookingCalendarProps) {
  const today = startOfToday();
  const maxDate = addDays(today, 60);
  const selected = fromYMD(value);

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={(date) => {
          if (date) {
            onChange(toYMD(date));
          }
        }}
        disabled={(date) => date < today || date > maxDate}
        defaultMonth={selected ?? today}
        startMonth={today}
        endMonth={maxDate}
        fixedWeeks
        showOutsideDays
        navLayout="after"
        className="w-full"
        classNames={{
          [UI.Root]: "w-full",
          [UI.Months]: "w-full",
          [UI.Month]: "w-full",
          [UI.MonthCaption]: "mb-3 flex min-h-[40px] items-center",
          [UI.CaptionLabel]:
            "text-sm font-medium uppercase tracking-[0.08em] text-(--color-ink-primary)",
          [UI.Nav]: "absolute right-0 top-0 flex items-center gap-2",
          [UI.PreviousMonthButton]:
            "flex h-10 w-10 items-center justify-center border border-(--color-line-hairline) text-(--color-ink-primary) transition-colors hover:bg-(--color-bg-elevated) disabled:opacity-30",
          [UI.NextMonthButton]:
            "flex h-10 w-10 items-center justify-center border border-(--color-line-hairline) text-(--color-ink-primary) transition-colors hover:bg-(--color-bg-elevated) disabled:opacity-30",
          [UI.Chevron]: "h-4 w-4 fill-(--color-ink-primary)",
          [UI.MonthGrid]: "w-full table-fixed border-collapse",
          [UI.Weekdays]: "border-b border-(--color-line-hairline)",
          [UI.Weekday]:
            "h-8 pb-2 text-center text-[10px] font-medium uppercase tracking-[0.08em] text-(--color-ink-muted)",
          [UI.Week]: "border-b border-(--color-line-hairline)",
          [UI.Day]: "p-0 text-center",
          [UI.DayButton]:
            "mx-auto my-1 flex h-10 w-10 items-center justify-center rounded-none text-sm text-(--color-ink-primary) transition-[background-color,color,border-color] hover:bg-(--color-bg-elevated) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent-primary)",
          [DayFlag.today]:
            "font-semibold text-(--color-accent-primary)",
          [DayFlag.outside]:
            "text-(--color-ink-muted)/40",
          [DayFlag.disabled]:
            "pointer-events-none opacity-25",
          [SelectionState.selected]:
            "bg-(--color-accent-primary) text-(--color-accent-on-accent) hover:bg-(--color-accent-primary)",
        }}
      />
      <p
        className="text-sm text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {formatSelectedDate(selected)}
      </p>
    </div>
  );
}
