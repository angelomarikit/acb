import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

/** Hero / feature image with load fade-in and subtle scroll parallax. */
export function ScrollParallaxImage({ src, alt, className = "", imgClassName = "" }: Props) {
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
        const offset = (progress - 0.5) * 36;
        img.style.transform = `translateY(${offset}px) scale(1.01)`;
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
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className={`animate-hero-in mx-auto w-full max-w-[1680px] object-contain object-center motion-reduce:animate-none ${imgClassName}`}
      />
    </div>
  );
}
