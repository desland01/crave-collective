"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { useKeyboardHeight } from "@/hooks/useKeyboardHeight";

export type TextInputSheetType = "text" | "email" | "tel" | "url" | "search";

type TextInputSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: string;
  onChange: (value: string) => void;
  label: string;
  type?: TextInputSheetType;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  error?: string;
};

const focusableSelector =
  'button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])';

export function TextInputSheet({
  open,
  onOpenChange,
  value,
  onChange,
  label,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  multiline = false,
  rows = 4,
  maxLength,
  error,
}: TextInputSheetProps) {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const fieldId = useId();
  const errorId = useId();
  const { keyboardHeight } = useKeyboardHeight();

  const commitAndClose = useCallback(() => {
    onChange(localValue);
    onOpenChange(false);
  }, [localValue, onChange, onOpenChange]);

  useEffect(() => {
    if (open) {
      setLocalValue(value);
    }
  }, [open, value]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 100);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [open]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      commitAndClose();
      return;
    }

    if (event.key === "Enter" && !multiline && event.target === inputRef.current) {
      event.preventDefault();
      commitAndClose();
      return;
    }

    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    const focusable = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)
    ).filter((element) => !element.hasAttribute("disabled"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (!first || !last) {
      return;
    }

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!open || typeof document === "undefined") {
    return null;
  }

  const panelStyle: CSSProperties = {
    paddingBottom:
      keyboardHeight > 0 ? keyboardHeight + 20 : "calc(20px + env(safe-area-inset-bottom, 0px))",
  };
  const inputClasses = `w-full rounded-none border bg-(--color-bg-canvas) px-4 py-3 text-[16px] text-(--color-ink-primary) outline-none transition-colors duration-200 placeholder:text-(--color-ink-muted) ${
    error
      ? "border-(--color-state-error) focus:border-(--color-state-error)"
      : "border-(--color-line-hairline) focus:border-(--color-ink-primary)"
  }`;

  return createPortal(
    <div className="fixed inset-0 z-[200] md:hidden" onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-label="Close input sheet"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full cursor-default bg-black/65"
        onClick={commitAndClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className="absolute inset-x-0 bottom-0 max-h-[86dvh] overflow-y-auto rounded-t-[16px] border-t border-(--color-line-hairline) bg-(--color-bg-canvas) px-5 pt-4 shadow-[0_-24px_80px_rgba(0,0,0,0.45)]"
        style={panelStyle}
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-5 h-1 w-12 rounded-full bg-(--color-line-hairline)"
        />
        <label
          id={labelId}
          htmlFor={fieldId}
          className="mb-3 block text-[12px] font-medium uppercase tracking-[0.08em] text-(--color-ink-muted)"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {label}
        </label>

        {multiline ? (
          <textarea
            ref={inputRef as RefObject<HTMLTextAreaElement>}
            id={fieldId}
            value={localValue}
            onChange={(event) => setLocalValue(event.target.value)}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={`${inputClasses} min-h-[132px] resize-none`}
            style={{ fontFamily: "var(--font-sans)" }}
          />
        ) : (
          <input
            ref={inputRef as RefObject<HTMLInputElement>}
            id={fieldId}
            value={localValue}
            onChange={(event) => setLocalValue(event.target.value)}
            type={type}
            inputMode={inputMode}
            autoComplete={autoComplete}
            placeholder={placeholder}
            maxLength={maxLength}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={`${inputClasses} min-h-12`}
            style={{ fontFamily: "var(--font-sans)" }}
          />
        )}

        {error ? (
          <p
            id={errorId}
            className="mt-2 text-sm text-(--color-state-error)"
            role="alert"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {error}
          </p>
        ) : null}

        <PrimaryButton type="button" size="lg" className="mt-5 w-full" onClick={commitAndClose}>
          Done
        </PrimaryButton>
      </div>
    </div>,
    document.body
  );
}
