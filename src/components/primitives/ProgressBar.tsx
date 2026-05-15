"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  className?: string;
};

export function ProgressBar({
  currentStep,
  totalSteps,
  className = "",
}: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!fillRef.current) return;
      const pct = Math.min(Math.max(currentStep / totalSteps, 0), 1) * 100;
      gsap.to(fillRef.current, {
        width: `${pct}%`,
        duration: 0.4,
        ease: "expo.out",
      });
    },
    { scope: containerRef, dependencies: [currentStep, totalSteps] }
  );

  return (
    <div
      ref={containerRef}
      className={`h-[2px] w-full bg-(--color-bg-elevated) ${className}`}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={0}
      aria-valuemax={totalSteps}
    >
      <div
        ref={fillRef}
        className="h-full bg-(--color-accent-primary)"
        style={{ width: 0 }}
      />
    </div>
  );
}
