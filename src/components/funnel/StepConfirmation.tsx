"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { H3 } from "@/components/primitives/H3";
import { Body } from "@/components/primitives/Body";

type StepConfirmationProps = {
  selectedDate: string;
  selectedTime: string;
  name: string;
};

function formatDate(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export function StepConfirmation({
  selectedDate,
  selectedTime,
  name,
}: StepConfirmationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (!svgRef.current) return;
      const circle = svgRef.current.querySelector(".check-circle") as SVGCircleElement;
      const check = svgRef.current.querySelector(".check-path") as SVGPathElement;
      if (!circle || !check) return;

      const circleLength = circle.getTotalLength();
      const checkLength = check.getTotalLength();

      gsap.set(circle, { strokeDasharray: circleLength, strokeDashoffset: circleLength });
      gsap.set(check, { strokeDasharray: checkLength, strokeDashoffset: checkLength });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline()
          .to(circle, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" })
          .to(check, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, "-=0.1");
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(circle, { strokeDashoffset: 0 });
        gsap.set(check, { strokeDashoffset: 0 });
      });
    },
    { scope: svgRef }
  );

  const firstName = name.split(" ")[0] || name;

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <svg
        ref={svgRef}
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="check-circle"
          cx="30"
          cy="30"
          r="28"
          stroke="var(--color-accent-primary)"
          strokeWidth="2"
        />
        <path
          className="check-path"
          d="M20 30L27 37L40 23"
          stroke="var(--color-accent-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <H3>Thank you, {firstName}.</H3>

      <Body>
        Your Game Plan Call request is in for {formatDate(selectedDate)} at{" "}
        {formatTime(selectedTime)}.
      </Body>

      <Body className="text-(--color-ink-muted)">
        An automated project email has been sent to dante@cravecollective.co.
      </Body>
    </div>
  );
}
