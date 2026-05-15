"use client";

import { Eyebrow } from "@/components/primitives/Eyebrow";
import { H3 } from "@/components/primitives/H3";
import { FormField } from "@/components/compounds/FormField";

type StepContactInfoProps = {
  name: string;
  onNameChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
  phone: string;
  onPhoneChange: (val: string) => void;
};

export function StepContactInfo({
  name,
  onNameChange,
  email,
  onEmailChange,
  phone,
  onPhoneChange,
}: StepContactInfoProps) {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>Step 4</Eyebrow>
        <H3>How should we reach you?</H3>
      </div>

      <FormField
        label="Your name"
        name="funnel-name"
        placeholder="Jenna Bryant"
        autoComplete="name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />

      <FormField
        label="Email"
        name="funnel-email"
        type="email"
        placeholder="jenna@yourcompany.com"
        autoComplete="email"
        inputMode="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />

      <FormField
        label="Phone"
        name="funnel-phone"
        type="tel"
        hint="For scheduling updates"
        placeholder="+1 941 555 0142"
        autoComplete="tel"
        inputMode="tel"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
      />
    </div>
  );
}
