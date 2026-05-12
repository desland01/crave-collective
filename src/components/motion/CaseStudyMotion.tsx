"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function CaseStudyMotion() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isReduced: "(prefers-reduced-motion: reduce)",
          isMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { isReduced } = context.conditions!;
          if (isReduced) return;

          // Hero: title + lead fade-up
          gsap.from('[data-anim="case-hero"] > *', {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "expo.out",
            delay: 0.2,
          });

          // Metadata strip: fade-in
          gsap.from('[data-anim="case-meta"] > *', {
            y: 24,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: '[data-anim="case-meta"]',
              start: "top 85%",
            },
          });

          // Narrative paragraphs: fade-up
          gsap.from('[data-anim="case-narrative"] > *', {
            y: 32,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: '[data-anim="case-narrative"]',
              start: "top 80%",
            },
          });

          // Stills gallery: each still fades in on scroll
          gsap.utils
            .toArray<HTMLElement>('[data-anim="case-still"]')
            .forEach((el) => {
              gsap.from(el, {
                y: 40,
                opacity: 0,
                duration: 1.0,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 85%",
                },
              });
            });

          // Pull quote: fade-up
          gsap.from('[data-anim="case-pullquote"]', {
            y: 32,
            opacity: 0,
            duration: 1.0,
            ease: "expo.out",
            scrollTrigger: {
              trigger: '[data-anim="case-pullquote"]',
              start: "top 80%",
            },
          });

          // Outcomes: count-up per numeral
          gsap.utils
            .toArray<HTMLElement>('[data-anim="outcome-numeral"]')
            .forEach((el) => {
              const target = parseFloat(el.dataset.target || "0");
              const prefix = el.dataset.prefix || "";
              const suffix = el.dataset.suffix || "";
              const textEl = el.querySelector<HTMLElement>(".numeral-text");
              if (!textEl) return;

              const isInteger = Number.isInteger(target);
              const obj = { val: 0 };

              // Initial state — show "0" with prefix/suffix
              textEl.textContent = `${prefix}${isInteger ? "0" : "0.0"}${suffix}`;

              ScrollTrigger.create({
                trigger: el,
                start: "top 80%",
                once: true,
                onEnter: () => {
                  gsap.to(obj, {
                    val: target,
                    duration: 1.2,
                    ease: "power2.out",
                    onUpdate: () => {
                      const display = isInteger
                        ? Math.round(obj.val).toString()
                        : obj.val.toFixed(1);
                      textEl.textContent = `${prefix}${display}${suffix}`;
                    },
                  });
                },
              });
            });

          // Next-project CTA: fade-up
          gsap.from('[data-anim="case-next"] > *', {
            y: 32,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: {
              trigger: '[data-anim="case-next"]',
              start: "top 80%",
            },
          });
        }
      );
    },
    { scope }
  );

  return <div ref={scope} className="contents" />;
}
