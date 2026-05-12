import type { ReactNode } from "react";
import { BrassNumeral } from "@/components/primitives/BrassNumeral";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Body } from "@/components/primitives/Body";

type PillarProps = {
  numeral: ReactNode;
  eyebrow: string;
  body: ReactNode;
  className?: string;
};

export function Pillar({ numeral, eyebrow, body, className = "" }: PillarProps) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <BrassNumeral>{numeral}</BrassNumeral>
      <div className="flex flex-col gap-3 border-t border-(--color-line-hairline) pt-6">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Body>{body}</Body>
      </div>
    </div>
  );
}
