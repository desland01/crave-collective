"use client";

import { useEffect, useId, useState } from "react";
import type {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";
import {
  TextInputSheet,
  type TextInputSheetType,
} from "@/components/compounds/TextInputSheet";

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

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 10.75V13h2.25l6.62-6.62-2.25-2.25L3 10.75zM10.28 3.47l.72-.72a1.06 1.06 0 011.5 0l.75.75a1.06 1.06 0 010 1.5l-.72.72"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function toValueString(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  return String(value);
}

function labelToString(label: ReactNode): string {
  return typeof label === "string" ? label : "Field";
}

function toSheetType(type: unknown): TextInputSheetType {
  return type === "email" || type === "tel" || type === "url" || type === "search"
    ? type
    : "text";
}

export function FormField(props: FormFieldProps) {
  const id = useId();
  const hintId = useId();
  const { label, hint, state = "default", multiline, ...rest } = props as FormFieldProps & {
    multiline?: boolean;
  };
  const isError = state === "error";
  const [sheetOpen, setSheetOpen] = useState(false);
  const attrs = rest as InputHTMLAttributes<HTMLInputElement> &
    TextareaHTMLAttributes<HTMLTextAreaElement>;
  const {
    className = "",
    defaultValue,
    disabled,
    maxLength,
    name,
    onChange,
    placeholder,
    value,
    ...fieldAttrs
  } = attrs;
  const [internalValue, setInternalValue] = useState(toValueString(defaultValue ?? value));
  const activeValue = value !== undefined ? toValueString(value) : internalValue;
  const hasValue = activeValue.trim().length > 0;
  const fieldLabel = labelToString(label);
  const displayPlaceholder = toValueString(placeholder) || fieldLabel;

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(toValueString(value));
    }
  }, [value]);

  function handleDesktopChange(
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) {
    setInternalValue(event.currentTarget.value);
    onChange?.(event as never);
  }

  function commitSheetValue(nextValue: string) {
    setInternalValue(nextValue);
    onChange?.({
      target: { name, value: nextValue },
      currentTarget: { name, value: nextValue },
    } as never);
  }

  const borderColor = isError
    ? "border-(--color-state-error) focus:border-(--color-state-error)"
    : "border-(--color-line-hairline) focus:border-(--color-ink-primary)";
  const desktopFieldClass = `peer block w-full min-h-12 rounded-none border bg-transparent px-3 pb-2 pt-5 text-[16px] text-(--color-ink-primary) outline-none transition-colors duration-200 placeholder:text-transparent ${borderColor} ${className}`;
  const desktopLabelClass =
    "pointer-events-none absolute left-3 top-2 origin-[0] text-[11px] font-medium uppercase tracking-[0.08em] text-(--color-ink-muted) transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[16px] peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-medium peer-focus:uppercase peer-focus:tracking-[0.08em] peer-focus:text-(--color-ink-primary)";
  const mobileButtonClass = `flex min-h-[56px] w-full items-center justify-between gap-4 border bg-(--color-bg-elevated) px-4 py-3 text-left transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
    multiline ? "min-h-[96px] items-start" : ""
  } ${
    isError
      ? "border-(--color-state-error)"
      : "border-(--color-line-hairline) active:border-(--color-ink-primary)"
  }`;

  return (
    <div className="flex flex-col gap-2">
      <div className="hidden md:block">
        <div className="relative">
          {multiline ? (
            <textarea
              {...(fieldAttrs as TextareaHTMLAttributes<HTMLTextAreaElement>)}
              id={id}
              name={name}
              value={activeValue}
              onChange={handleDesktopChange}
              rows={(rest as TextareaProps).rows ?? 4}
              placeholder=" "
              disabled={disabled}
              maxLength={maxLength}
              aria-invalid={isError ? true : undefined}
              aria-describedby={hint ? hintId : undefined}
              className={`${desktopFieldClass} resize-none`}
              style={{ fontFamily: "var(--font-sans)" }}
            />
          ) : (
            <input
              {...(fieldAttrs as InputHTMLAttributes<HTMLInputElement>)}
              id={id}
              name={name}
              value={activeValue}
              onChange={handleDesktopChange}
              placeholder=" "
              disabled={disabled}
              maxLength={maxLength}
              aria-invalid={isError ? true : undefined}
              aria-describedby={hint ? hintId : undefined}
              className={desktopFieldClass}
              style={{ fontFamily: "var(--font-sans)" }}
            />
          )}
          <label
            htmlFor={id}
            className={desktopLabelClass}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {label}
          </label>
        </div>
      </div>

      <div className="md:hidden">
        <button
          type="button"
          disabled={disabled}
          aria-label={hasValue ? `Edit ${fieldLabel}: ${activeValue}` : `Enter ${fieldLabel}`}
          aria-describedby={hint ? hintId : undefined}
          onClick={() => setSheetOpen(true)}
          className={mobileButtonClass}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <span className="min-w-0 flex-1">
            {hasValue ? (
              <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.08em] text-(--color-ink-muted)">
                {label}
              </span>
            ) : null}
            <span
              className={`block text-[16px] leading-snug ${
                hasValue ? "text-(--color-ink-primary)" : "text-(--color-ink-muted)"
              } ${
                multiline
                  ? "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
                  : "truncate"
              }`}
            >
              {hasValue ? activeValue : displayPlaceholder}
            </span>
          </span>
          <span className="shrink-0 pt-1 text-(--color-ink-muted)">
            <PencilIcon />
          </span>
        </button>
      </div>

      {hint ? (
        <span
          id={hintId}
          className={`text-caption ${
            isError ? "text-(--color-state-error)" : "text-(--color-ink-muted)"
          }`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {hint}
        </span>
      ) : null}

      <TextInputSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        value={activeValue}
        onChange={commitSheetValue}
        label={fieldLabel}
        type={toSheetType((rest as InputProps).type)}
        inputMode={(rest as InputProps).inputMode}
        autoComplete={toValueString((rest as InputProps).autoComplete)}
        placeholder={displayPlaceholder}
        multiline={multiline}
        rows={(rest as TextareaProps).rows ?? 4}
        maxLength={typeof maxLength === "number" ? maxLength : undefined}
        error={isError && typeof hint === "string" ? hint : undefined}
      />
    </div>
  );
}
