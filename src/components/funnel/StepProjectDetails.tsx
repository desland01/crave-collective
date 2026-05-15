"use client";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { H3 } from "@/components/primitives/H3";
import { ChipGroup } from "@/components/primitives/ChipGroup";
import { FormField } from "@/components/compounds/FormField";

const SCOPE_OPTIONS = [
  { value: "drone", label: "Drone" },
  { value: "digital-av", label: "Digital A/V" },
  { value: "analog-av", label: "Analog A/V" },
  { value: "remote-location", label: "Remote Location" },
  { value: "raw-video-footage-only", label: "Raw Video Footage only" },
  { value: "post-production", label: "Post Production" },
];

const BUDGET_OPTIONS = [
  { value: "5k-10k", label: "$5K–10K" },
  { value: "10k-25k", label: "$10K–25K" },
  { value: "25k-50k", label: "$25K–50K" },
  { value: "50k+", label: "$50K+" },
  { value: "custom", label: "Custom" },
];

type StepProjectDetailsProps = {
  projectScope: string[];
  onScopeChange: (scope: string[]) => void;
  budgetTier: string | null;
  onBudgetChange: (tier: string) => void;
  customBudget: string;
  onCustomBudgetChange: (val: string) => void;
};

export function StepProjectDetails({
  projectScope,
  onScopeChange,
  budgetTier,
  onBudgetChange,
  customBudget,
  onCustomBudgetChange,
}: StepProjectDetailsProps) {
  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <div className="flex flex-col gap-2">
        <Eyebrow>Step 2</Eyebrow>
        <H3>Tell us about it.</H3>
      </div>

      <div className="flex flex-col gap-3">
        <span
          className="text-sm font-medium uppercase tracking-[0.04em] text-(--color-ink-secondary)"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Production needs
        </span>
        <ChipGroup
          options={SCOPE_OPTIONS}
          value={projectScope}
          onChange={(val) => onScopeChange(val as string[])}
          multi
        />
      </div>

      <div className="flex flex-col gap-3">
        <span
          className="text-sm font-medium uppercase tracking-[0.04em] text-(--color-ink-secondary)"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Budget range
        </span>
        <ChipGroup
          options={BUDGET_OPTIONS}
          value={budgetTier ?? ""}
          onChange={(val) => onBudgetChange(val as string)}
        />
        {budgetTier === "custom" && (
          <FormField
            label="Your budget"
            name="customBudget"
            placeholder="e.g. $15,000"
            value={customBudget}
            onChange={(e) => onCustomBudgetChange(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}
