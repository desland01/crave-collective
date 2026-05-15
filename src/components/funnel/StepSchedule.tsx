"use client";

import { useEffect, useState } from "react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { H3 } from "@/components/primitives/H3";
import { Body } from "@/components/primitives/Body";
import { BookingCalendar } from "@/components/primitives/BookingCalendar";
import { TimeSlotGrid } from "@/components/primitives/TimeSlotGrid";

type StepScheduleProps = {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
  selectedTime: string | null;
  onTimeChange: (time: string) => void;
};

type SlotMap = Record<string, { slots: string[] }>;

function todayYMD(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function StepSchedule({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
}: StepScheduleProps) {
  const [slotMap, setSlotMap] = useState<SlotMap>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) {
      onDateChange(todayYMD());
      return;
    }

    if (slotMap[selectedDate] !== undefined) return;

    let cancelled = false;
    setLoading(true);

    fetch(`/api/calendar/slots?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data: SlotMap | { error: string }) => {
        if (!cancelled) {
          if ("error" in data) {
            setSlotMap((prev) => ({ ...prev, [selectedDate]: { slots: [] } }));
          } else {
            setSlotMap((prev) => ({ ...prev, ...data }));
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSlotMap((prev) => ({ ...prev, [selectedDate]: { slots: [] } }));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedDate, onDateChange, slotMap]);

  const slots = selectedDate ? slotMap[selectedDate]?.slots ?? [] : [];
  const noSlots = !loading && slots.length === 0 && selectedDate;

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>Step 3</Eyebrow>
        <H3>Pick a time for your Game Plan Call.</H3>
      </div>

      <BookingCalendar value={selectedDate} onChange={onDateChange} />

      {noSlots ? (
        <Body className="text-(--color-ink-muted)">
          No availability on this day &mdash; try another date.
        </Body>
      ) : (
        <TimeSlotGrid
          slots={slots}
          value={selectedTime}
          onChange={onTimeChange}
          loading={loading}
        />
      )}
    </div>
  );
}
