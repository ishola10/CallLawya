"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({ value, decimals = 0, prefix = "", suffix = "", durationMs = 1800, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    setCurrent(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          setCurrent(value * easeOutCubic(progress));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  const formatted = current.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString("en-US", { minimumFractionDigits: decimals })}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
    </span>
  );
}
