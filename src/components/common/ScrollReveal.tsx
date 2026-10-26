"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

function isLayoutContainer(element: Element) {
  if (element instanceof HTMLElement && element.dataset.reveal === "whole") return false;
  const { display } = getComputedStyle(element);
  return (display === "grid" || display === "flex") && element.children.length > 1;
}

const isTallerThanScreen = (element: Element) => element.getBoundingClientRect().height > window.innerHeight;

function expand(element: Element): Element[] {
  if (isLayoutContainer(element)) return [...element.children];
  if (isTallerThanScreen(element) && element.children.length > 1) return [...element.children].flatMap(expand);
  return [element];
}

function collectTargets(main: HTMLElement) {
  const targets: { element: HTMLElement; order: number }[] = [];
  main.querySelectorAll<HTMLElement>(":scope > section, :scope > div > section").forEach((section) => {
    const blocks = isLayoutContainer(section) ? [section] : [...section.children];
    blocks.forEach((block) => {
      const staggered = isLayoutContainer(block);
      expand(block).forEach((item, index) => {
        if (item instanceof HTMLElement) {
          targets.push({ element: item, order: staggered ? Math.min(index, MAX_STAGGER_STEPS) : 0 });
        }
      });
    });
  });
  return targets;
}

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanup = (element: HTMLElement) => {
      element.classList.remove("reveal", "is-visible");
      element.style.removeProperty("transition-delay");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          element.classList.add("is-visible");
          element.addEventListener("transitionend", () => cleanup(element), { once: true });
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const frame = requestAnimationFrame(() => {
      collectTargets(main).forEach(({ element, order }) => {
        if (element.getBoundingClientRect().top < window.innerHeight) return;
        element.classList.add("reveal");
        element.style.transitionDelay = `${order * STAGGER_MS}ms`;
        observer.observe(element);
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      main.querySelectorAll<HTMLElement>(".reveal").forEach(cleanup);
    };
  }, [pathname]);

  return null;
}
