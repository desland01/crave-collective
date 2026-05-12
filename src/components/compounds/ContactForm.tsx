"use client";

import { useState } from "react";
import { FormField } from "@/components/compounds/FormField";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { Body } from "@/components/primitives/Body";
import { Eyebrow } from "@/components/primitives/Eyebrow";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");

    // Collect form data
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name") as string,
      company: data.get("company") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      brief: data.get("brief") as string,
      budget: data.get("budget") as string,
    };

    try {
      // Submit to mailto as fallback — GHL/webhook wiring happens in the web-build phase
      const subject = encodeURIComponent(`Film brief — ${payload.name || "Anonymous"}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nCompany: ${payload.company}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n\nThe film:\n${payload.brief}\n\nBudget: ${payload.budget}`
      );
      // Open mailto as submit mechanism until server action is wired
      window.location.href = `mailto:dante@cravecollective.co?subject=${subject}&body=${body}`;
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-8 py-16">
        <Eyebrow>Brief received</Eyebrow>
        <Body className="max-w-md">
          Your brief is on its way to Dante. You'll hear back within two business days — a yes, a not-this-quarter, or a counter-offer.
        </Body>
      </div>
    );
  }

  return (
    /* [rule: autofill-support] autocomplete attrs enable browser autofill */
    <form
      onSubmit={handleSubmit}
      className="lg:col-span-7 lg:col-start-6 flex flex-col gap-12"
      noValidate
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <FormField label="Your name" name="name" placeholder="Jenna Bryant" autoComplete="name" />
        <FormField label="Company" name="company" placeholder="Robbins Real Estate" autoComplete="organization" />
        <FormField label="Email" name="email" type="email" placeholder="jenna@yourcompany.com" autoComplete="email" />
        <FormField label="Phone" hint="Optional" name="phone" type="tel" placeholder="+1 941 555 0142" autoComplete="tel" />
      </div>
      <FormField
        label="The project"
        name="brief"
        multiline
        rows={5}
        placeholder="A listing film for a Longboat Key waterfront — drone, walk-through, and an owner-on-camera interview."
      />
      <FormField label="Budget" hint="Optional — helps us scope" name="budget" placeholder="$5K — $25K" autoComplete="off" />
      {formState === "error" && (
        <Body className="text-(--color-state-error)">
          Something went wrong. Please email dante@cravecollective.co directly.
        </Body>
      )}
      <div>
        <PrimaryButton
          size="lg"
          type="submit"
          disabled={formState === "submitting"}
        >
          {formState === "submitting" ? "Sending…" : "Send the brief"}
        </PrimaryButton>
      </div>
    </form>
  );
}
