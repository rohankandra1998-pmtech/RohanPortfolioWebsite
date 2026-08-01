"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(
          "[data-home-intro], [data-home-float], [data-home-word], .home-work-card .project-card",
          { clearProps: "all" },
        );
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-home-intro]", {
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          y: 32,
        })
        .from(
          "[data-home-float]",
          {
            autoAlpha: 0,
            duration: 1.05,
            rotate: 2.5,
            scale: 0.88,
            y: 48,
          },
          0.18,
        );

      gsap.to("[data-home-float]", {
        ease: "none",
        rotate: -1.5,
        scrollTrigger: {
          end: "bottom top",
          scrub: 0.8,
          start: "top top",
          trigger: ".home-hero",
        },
        yPercent: -12,
      });

      const wordSection = document.querySelector("[data-home-word-section]");
      const words = gsap.utils.toArray<HTMLElement>("[data-home-word]");

      if (wordSection && words.length > 0) {
        gsap.fromTo(
          words,
          { opacity: 0.12, y: 10 },
          {
            ease: "none",
            opacity: 1,
            stagger: 0.07,
            scrollTrigger: {
              end: "bottom 46%",
              scrub: 0.7,
              start: "top 82%",
              trigger: wordSection,
            },
            y: 0,
          },
        );
      }

      const cardWrappers =
        gsap.utils.toArray<HTMLElement>(".home-work-card");
      const cardPanels = gsap.utils.toArray<HTMLElement>(
        ".home-work-card .project-card",
      );

      cardPanels.forEach((card, index) => {
        const cardWrapper = cardWrappers[index];
        const nextCardWrapper = cardWrappers[index + 1];

        gsap.from(card, {
          autoAlpha: 0,
          ease: "power2.out",
          scrollTrigger: {
            end: "top 56%",
            scrub: 0.55,
            start: "top 92%",
            trigger: cardWrapper,
          },
          y: 80,
        });

        if (nextCardWrapper) {
          gsap.to(card, {
            ease: "none",
            opacity: 0.34,
            scale: 0.94,
            scrollTrigger: {
              end: "top 20%",
              scrub: 0.65,
              start: "top 72%",
              trigger: nextCardWrapper,
            },
            y: -28,
          });
        }
      });
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
