"use client";

import { useReducer, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ProgressBar } from "@/components/primitives/ProgressBar";
import { PrimaryButton } from "@/components/primitives/PrimaryButton";
import { StepServiceType } from "@/components/funnel/StepServiceType";
import { StepProjectDetails } from "@/components/funnel/StepProjectDetails";
import { StepSchedule } from "@/components/funnel/StepSchedule";
import { StepContactInfo } from "@/components/funnel/StepContactInfo";
import { StepConfirmation } from "@/components/funnel/StepConfirmation";

type FunnelState = {
  step: 1 | 2 | 3 | 4 | 5;
  direction: "forward" | "back";
  filmingTypes: string[];
  projectScope: string[];
  budgetTier: string | null;
  customBudget: string;
  preferredDate: string | null;
  preferredTime: string | null;
  name: string;
  email: string;
  phone: string;
  submissionState: "idle" | "submitting" | "success" | "error";
  errorMessage: string;
};

type FunnelAction =
  | { type: "SET_FILMING_TYPES"; payload: string[] }
  | { type: "TOGGLE_SCOPE"; payload: string }
  | { type: "SET_SCOPE"; payload: string[] }
  | { type: "SET_BUDGET_TIER"; payload: string }
  | { type: "SET_CUSTOM_BUDGET"; payload: string }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_TIME"; payload: string }
  | { type: "SET_CONTACT"; payload: { field: "name" | "email" | "phone"; value: string } }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string };

const initialState: FunnelState = {
  step: 1,
  direction: "forward",
  filmingTypes: [],
  projectScope: [],
  budgetTier: null,
  customBudget: "",
  preferredDate: null,
  preferredTime: null,
  name: "",
  email: "",
  phone: "",
  submissionState: "idle",
  errorMessage: "",
};

function reducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case "SET_FILMING_TYPES":
      return { ...state, filmingTypes: action.payload };
    case "TOGGLE_SCOPE": {
      const arr = state.projectScope;
      const next = arr.includes(action.payload)
        ? arr.filter((v) => v !== action.payload)
        : [...arr, action.payload];
      return { ...state, projectScope: next };
    }
    case "SET_SCOPE":
      return { ...state, projectScope: action.payload };
    case "SET_BUDGET_TIER":
      return { ...state, budgetTier: action.payload };
    case "SET_CUSTOM_BUDGET":
      return { ...state, customBudget: action.payload };
    case "SET_DATE":
      return { ...state, preferredDate: action.payload, preferredTime: null };
    case "SET_TIME":
      return { ...state, preferredTime: action.payload };
    case "SET_CONTACT":
      return { ...state, [action.payload.field]: action.payload.value };
    case "NEXT_STEP":
      return {
        ...state,
        step: Math.min(state.step + 1, 4) as FunnelState["step"],
        direction: "forward",
      };
    case "PREV_STEP":
      return {
        ...state,
        step: Math.max(state.step - 1, 1) as FunnelState["step"],
        direction: "back",
      };
    case "SUBMIT_START":
      return { ...state, submissionState: "submitting", errorMessage: "" };
    case "SUBMIT_SUCCESS":
      return { ...state, step: 5, submissionState: "success", direction: "forward" };
    case "SUBMIT_ERROR":
      return { ...state, submissionState: "error", errorMessage: action.payload };
    default:
      return state;
  }
}

function isStepValid(state: FunnelState): boolean {
  switch (state.step) {
    case 1:
      return state.filmingTypes.length > 0;
    case 2:
      return true;
    case 3:
      return state.preferredDate !== null && state.preferredTime !== null;
    case 4:
      return state.name.trim() !== "" && state.email.trim() !== "";
    default:
      return true;
  }
}

export function FunnelForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const stepRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevStep = useRef(state.step);

  useGSAP(
    () => {
      if (!stepRef.current || prevStep.current === state.step) return;
      const dir = state.direction;
      contentRef.current?.scrollTo({ top: 0, behavior: "auto" });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          stepRef.current,
          {
            x: dir === "forward" ? 120 : -120,
            opacity: 0,
            rotateY: dir === "forward" ? 3 : -3,
            scale: 0.98,
          },
          { x: 0, opacity: 1, rotateY: 0, scale: 1, duration: 0.5, ease: "back.out(1.35)" }
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(stepRef.current, { x: 0, opacity: 1, rotateY: 0, scale: 1 });
      });

      prevStep.current = state.step;
    },
    { dependencies: [state.step, state.direction] }
  );

  const handleSubmit = useCallback(async () => {
    dispatch({ type: "SUBMIT_START" });
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filmingTypes: state.filmingTypes,
          projectScope: state.projectScope,
          budgetTier: state.budgetTier,
          customBudget: state.customBudget,
          preferredDate: state.preferredDate,
          preferredTime: state.preferredTime,
          name: state.name,
          email: state.email,
          phone: state.phone,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        dispatch({ type: "SUBMIT_SUCCESS" });
      } else {
        dispatch({ type: "SUBMIT_ERROR", payload: data.error || "Something went wrong." });
      }
    } catch {
      dispatch({ type: "SUBMIT_ERROR", payload: "Network error. Please try again." });
    }
  }, [state]);

  const handleNext = () => {
    if (state.step === 4) {
      handleSubmit();
    } else {
      dispatch({ type: "NEXT_STEP" });
    }
  };

  const valid = isStepValid(state);
  const isSubmitting = state.submissionState === "submitting";

  return (
    <div className="flex h-full min-h-[500px] flex-col overflow-hidden md:min-h-[620px]">
      {state.step < 5 && (
        <div className="flex-shrink-0 pb-5">
          <ProgressBar currentStep={state.step} totalSteps={4} />
        </div>
      )}

      <div
        ref={contentRef}
        className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1"
        style={{ perspective: "1200px" }}
      >
        <div ref={stepRef} className="min-h-full">
          {state.step === 1 && (
            <StepServiceType
              value={state.filmingTypes}
              onChange={(v) => dispatch({ type: "SET_FILMING_TYPES", payload: v })}
            />
          )}
          {state.step === 2 && (
            <StepProjectDetails
              projectScope={state.projectScope}
              onScopeChange={(v) => dispatch({ type: "SET_SCOPE", payload: v })}
              budgetTier={state.budgetTier}
              onBudgetChange={(v) => dispatch({ type: "SET_BUDGET_TIER", payload: v })}
              customBudget={state.customBudget}
              onCustomBudgetChange={(v) => dispatch({ type: "SET_CUSTOM_BUDGET", payload: v })}
            />
          )}
          {state.step === 3 && (
            <StepSchedule
              selectedDate={state.preferredDate}
              onDateChange={(v) => dispatch({ type: "SET_DATE", payload: v })}
              selectedTime={state.preferredTime}
              onTimeChange={(v) => dispatch({ type: "SET_TIME", payload: v })}
            />
          )}
          {state.step === 4 && (
            <StepContactInfo
              name={state.name}
              onNameChange={(v) =>
                dispatch({ type: "SET_CONTACT", payload: { field: "name", value: v } })
              }
              email={state.email}
              onEmailChange={(v) =>
                dispatch({ type: "SET_CONTACT", payload: { field: "email", value: v } })
              }
              phone={state.phone}
              onPhoneChange={(v) =>
                dispatch({ type: "SET_CONTACT", payload: { field: "phone", value: v } })
              }
            />
          )}
          {state.step === 5 && (
            <StepConfirmation
              selectedDate={state.preferredDate!}
              selectedTime={state.preferredTime!}
              name={state.name}
            />
          )}
        </div>
      </div>

      {state.step < 5 && (
        <div className="flex flex-shrink-0 items-center gap-3 border-t border-(--color-line-hairline) pt-4">
          {state.step > 1 ? (
            <button
              type="button"
              onClick={() => dispatch({ type: "PREV_STEP" })}
              className="min-h-[48px] px-3 text-sm font-medium text-(--color-ink-muted) transition-colors duration-200 hover:text-(--color-ink-primary)"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Back
            </button>
          ) : (
            null
          )}
          <PrimaryButton
            size="lg"
            disabled={!valid || isSubmitting}
            onClick={handleNext}
            className="ml-auto flex-1 md:flex-none md:min-w-[180px]"
          >
            {isSubmitting
              ? "Booking..."
              : state.step === 4
                ? "Book My Call"
                : "Continue"}
          </PrimaryButton>
        </div>
      )}

      {state.submissionState === "error" && (
        <p
          className="mt-3 flex-shrink-0 text-center text-sm text-(--color-state-error)"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {state.errorMessage}
        </p>
      )}
    </div>
  );
}
