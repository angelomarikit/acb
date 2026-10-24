import { useCallback, useEffect, useState } from "react";
import { useContent } from "../context/ContentContext";

const INTERVAL_MS = 5500;

export function WorkGalleryCarousel() {
  const { content } = useContent();
  const workGallerySlides = content.gallerySlides.filter((s) => s.src.trim());
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = workGallerySlides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [count, paused]);

  if (count === 0) return null;

  const slide = workGallerySlides[index];

  return (
    <figure
      className="mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[26rem] lg:max-w-[28rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] shadow-md">
        <div className="relative aspect-[3/4] w-full">
          {workGallerySlides.map((item, i) => (
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-contain object-center p-2 transition-opacity duration-700 ease-in-out motion-reduce:transition-none sm:p-3 ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {slide.caption ? (
        <figcaption className="mt-3 text-center text-sm leading-snug text-white/80">{slide.caption}</figcaption>
      ) : null}

      {count > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {workGallerySlides.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Show slide ${i + 1}: ${item.alt}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-gold-light" : "w-2 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      ) : null}
    </figure>
  );
}
