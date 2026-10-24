import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "left" | "right" | "fade";

type Props = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delayMs?: number;
};

const hidden: Record<Direction, string> = {
  up: "translate-y-10 scale-[0.98] opacity-0",
  left: "-translate-x-12 scale-[0.98] opacity-0",
  right: "translate-x-12 scale-[0.98] opacity-0",
  fade: "scale-[0.97] opacity-0",
};

export function ScrollReveal({ children, className = "", direction = "up", delayMs = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-none motion-reduce:scale-100 ${shown ? "translate-x-0 translate-y-0 scale-100 opacity-100" : hidden[direction]} ${className}`}
      style={{ transitionDelay: shown ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
