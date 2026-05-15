"use client";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { H3 } from "@/components/primitives/H3";
import { SelectionCard } from "@/components/primitives/SelectionCard";

const SERVICE_OPTIONS = [
  "Real-Estate Listing",
  "Brand Content",
  "Agent Reel",
  "Organic Social",
  "Website Content",
  "Something Else",
] as const;

type StepServiceTypeProps = {
  value: string[];
  onChange: (filmingTypes: string[]) => void;
};

export function StepServiceType({ value, onChange }: StepServiceTypeProps) {
  function handleSelect(option: string) {
    const next = value.includes(option)
      ? value.filter((item) => item !== option)
      : [...value, option];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>Step 1</Eyebrow>
        <H3>What are we filming?</H3>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-3" role="listbox" aria-multiselectable="true">
        {SERVICE_OPTIONS.map((option) => (
          <SelectionCard
            key={option}
            selected={value.includes(option)}
            onSelect={() => handleSelect(option)}
            title={option}
          />
        ))}
      </div>
    </div>
  );
}
