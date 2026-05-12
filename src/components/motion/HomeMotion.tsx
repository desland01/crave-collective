"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomeMotion() {
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

          // Hero: title + body fade-up + parallax-lag bg
          gsap.from('[data-anim="hero-stack"] > *', {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "expo.out",
            delay: 0.2,
          });

          gsap.to('[data-anim="hero-bg"]', {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: '[data-anim="hero-bg"]',
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });

          // Intro statement: fade-up
          gsap.from('[data-anim="intro-statement"]', {
            y: 32,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: '[data-anim="intro-statement"]',
              start: "top 80%",
            },
          });

          // Two-vertical split: stagger left then right
          gsap.from(
            [
              '[data-anim="vertical-real-estate"]',
              '[data-anim="vertical-home-services"]',
            ],
            {
              y: 48,
              opacity: 0,
              duration: 0.9,
              ease: "expo.out",
              stagger: 0.15,
              scrollTrigger: {
                trigger: '[data-anim="vertical-real-estate"]',
                start: "top 75%",
              },
            }
          );

          // Pillars: stagger 150ms
          gsap.from('[data-anim="pillar"]', {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: '[data-anim="pillar"]',
              start: "top 80%",
            },
          });

          // Founder: parallax portrait + fade-up text
          gsap.to('[data-anim="founder-portrait"]', {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: '[data-anim="founder-portrait"]',
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          gsap.from('[data-anim="founder-text"]', {
            y: 32,
            opacity: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: {
              trigger: '[data-anim="founder-text"]',
              start: "top 75%",
            },
          });

          // Testimonials: stagger
          gsap.from('[data-anim="testimonial"]', {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: '[data-anim="testimonial"]',
              start: "top 80%",
            },
          });

          // Contact CTA
          gsap.from('[data-anim="contact-cta"] > *', {
            y: 32,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: '[data-anim="contact-cta"]',
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
