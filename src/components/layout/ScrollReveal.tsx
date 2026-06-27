"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  direction?: Direction;
  threshold?: number;
}

/**
 * Wraps children and fades-reveals them when they enter the viewport.
 * Uses IntersectionObserver — pure CSS transitions, no layout-affecting props.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // only reveal once
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const hiddenClass =
    direction === "left"
      ? "sr-hidden-left"
      : direction === "right"
      ? "sr-hidden-right"
      : "sr-hidden";

  const visibleClass =
    direction === "left"
      ? "sr-visible-left"
      : direction === "right"
      ? "sr-visible-right"
      : "sr-visible";

  const delayClass = delay > 0 ? `sr-delay-${delay}` : "";

  return (
    <div
      ref={ref}
      className={`${visible ? visibleClass : hiddenClass} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
