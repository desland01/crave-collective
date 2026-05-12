import type { ReactNode } from "react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { H2 } from "@/components/primitives/H2";
import { Lead } from "@/components/primitives/Lead";

type SectionHeaderProps = {
  eyebrow?: string;
  heading: ReactNode;
  lead?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  lead,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <H2>{heading}</H2>
      {lead ? <Lead className="max-w-2xl">{lead}</Lead> : null}
    </div>
  );
}
