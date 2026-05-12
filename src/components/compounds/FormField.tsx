"use client";

import { useId } from "react";
import type { TextareaHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  label: ReactNode;
  hint?: ReactNode;
  state?: "default" | "focused" | "filled" | "error";
};

type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
    multiline?: false;
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
  };

type FormFieldProps = InputProps | TextareaProps;

export function FormField(props: FormFieldProps) {
  const id = useId();
  // Destructure multiline so it doesn't get forwarded to DOM [rule: no-invalid-dom-attrs]
  const { label, hint, state = "default", multiline, ...rest } = props as FormFieldProps & { multiline?: boolean };
  const isError = state === "error";

  const borderColor = isError
    ? "border-(--color-state-error)"
    : "border-(--color-line-hairline) focus-within:border-(--color-ink-primary)";

  // font-size ≥ 16px prevents iOS auto-zoom on focus [rule: form-input-font-size]
  const sharedClass = `w-full bg-transparent text-(--color-ink-primary) placeholder:text-(--color-ink-muted) outline-none border-0 border-b ${borderColor} pb-3 transition-colors duration-200 text-[16px] lg:text-xs`;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-caption font-medium uppercase tracking-[0.08em] text-(--color-ink-muted)"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={id}
          rows={(rest as TextareaProps).rows ?? 4}
          className={`${sharedClass} resize-none`}
          style={{ fontFamily: "var(--font-sans)" }}
        />
      ) : (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          id={id}
          className={sharedClass}
          style={{ fontFamily: "var(--font-sans)" }}
        />
      )}
      {hint ? (
        <span
          className={`text-caption ${isError ? "text-(--color-state-error)" : "text-(--color-ink-muted)"}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {hint}
        </span>
      ) : null}
    </div>
  );
}
