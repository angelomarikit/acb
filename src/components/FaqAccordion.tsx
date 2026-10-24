import { useId, useState } from "react";

type Item = { q: string; a: string };

export function FaqAccordion({ items }: { items: readonly Item[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-gold/30 bg-white shadow-xl shadow-navy/10">
      {items.map((item, i) => {
        const expanded = open === i;
        const num = String(i + 1).padStart(2, "0");

        return (
          <div
            key={item.q}
            className={`border-b border-navy/10 last:border-b-0 transition-colors ${
              expanded ? "bg-gradient-to-br from-navy/[0.06] via-white to-gold/[0.12]" : "bg-white hover:bg-off-white/90"
            }`}
          >
            <button
              type="button"
              id={`${baseId}-${i}`}
              aria-expanded={expanded}
              aria-controls={`${baseId}-panel-${i}`}
              className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6 sm:py-5"
              onClick={() => setOpen(expanded ? null : i)}
            >
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  expanded ? "bg-navy text-gold-light" : "bg-gold/20 text-navy"
                }`}
                aria-hidden
              >
                {num}
              </span>
              <span className={`flex-1 font-semibold leading-snug ${expanded ? "text-navy" : "text-navy/90"}`}>
                {item.q}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg leading-none transition-colors ${
                  expanded ? "bg-gold text-navy" : "border border-gold/40 bg-white text-gold"
                }`}
                aria-hidden
              >
                {expanded ? "−" : "+"}
              </span>
            </button>
            {expanded ? (
              <div
                id={`${baseId}-panel-${i}`}
                role="region"
                aria-labelledby={`${baseId}-${i}`}
                className="border-t border-gold/25 bg-navy/[0.03] px-5 pb-6 pt-1 text-sm leading-relaxed text-charcoal/85 sm:px-6 sm:pl-[4.25rem]"
              >
                {item.a}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
