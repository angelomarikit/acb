import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** cover fills the frame; contain shows the full graphic (e.g. branded banners). */
  fit?: "cover" | "contain";
};

/** Subtle vertical shift while the banner is in view (respects reduced motion). */
export function ParallaxBanner({ src, alt, className = "", fit = "cover" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (vh - rect.top) / (vh + rect.height);
        const offset = (progress - 0.5) * 28;
        img.style.transform = `scale(1.06) translateY(${offset}px)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`relative h-full min-h-[inherit] w-full overflow-hidden ${fit === "contain" ? "bg-navy-dark" : ""} ${className}`}
      ref={wrapRef}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full transition-transform duration-100 will-change-transform motion-reduce:scale-100 motion-reduce:transform-none ${
          fit === "contain" ? "object-contain object-center" : "object-cover object-[center_42%]"
        }`}
      />
    </div>
  );
}
