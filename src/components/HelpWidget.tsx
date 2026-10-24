import { useEffect, useId, useState } from "react";
import { useContent } from "../context/ContentContext";

export function HelpWidget() {
  const { site, content } = useContent();
  const homeFaqs = content.faqs;
  const [open, setOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [showTeaser, setShowTeaser] = useState(true);
  const baseId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (open && mobile) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function openPanel() {
    setOpen(true);
    setShowTeaser(false);
  }

  function closePanel() {
    setOpen(false);
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close help panel"
          className="fixed inset-0 z-[60] bg-navy/40 backdrop-blur-[2px] md:hidden"
          onClick={closePanel}
        />
      ) : null}

      <div className="fixed bottom-4 right-4 z-[70] flex max-w-[min(100vw-1.5rem,22rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6 sm:max-w-none">
        {open ? (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${baseId}-title`}
            className="flex w-[min(100vw-1.5rem,26rem)] max-h-[min(82vh,36rem)] flex-col overflow-hidden rounded-2xl border-2 border-gold/40 bg-white shadow-2xl shadow-navy/30 sm:w-[28rem]"
          >
            <div className="shrink-0 bg-gradient-to-br from-navy to-navy-dark px-5 py-5 text-white">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-light">Quick help</p>
                  <h2 id={`${baseId}-title`} className="font-display text-2xl leading-tight">
                    FAQ &amp; Contact
                  </h2>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={closePanel}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-xl leading-none transition hover:bg-white/10"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-gold">Contact us</p>
              <div className="mt-3 flex flex-col gap-2.5">
                <a
                  href={site.phoneTel}
                  className="rounded-xl border-2 border-navy/10 bg-off-white px-4 py-3.5 text-base font-bold text-navy transition hover:border-gold/50"
                >
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-xl border-2 border-navy/10 bg-off-white px-4 py-3.5 text-sm font-semibold text-navy transition hover:border-gold/50 break-all sm:text-base"
                >
                  {site.email}
                </a>
                <a
                  href="#contact"
                  onClick={closePanel}
                  className="rounded-xl bg-navy px-4 py-3.5 text-center text-base font-bold text-white transition hover:bg-navy-dark"
                >
                  Open contact form
                </a>
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-gold">Frequent questions</p>
              <div className="mt-3 divide-y divide-navy/10 rounded-xl border-2 border-navy/10">
                {homeFaqs.map((item, i) => {
                  const expanded = faqOpen === i;
                  return (
                    <div key={item.q}>
                      <button
                        type="button"
                        id={`${baseId}-faq-${i}`}
                        aria-expanded={expanded}
                        aria-controls={`${baseId}-faq-panel-${i}`}
                        onClick={() => setFaqOpen(expanded ? null : i)}
                        className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/25 text-sm font-bold text-navy">
                          {expanded ? "−" : "+"}
                        </span>
                        <span className="text-sm font-semibold leading-snug text-navy sm:text-base">{item.q}</span>
                      </button>
                      {expanded ? (
                        <p
                          id={`${baseId}-faq-panel-${i}`}
                          role="region"
                          aria-labelledby={`${baseId}-faq-${i}`}
                          className="px-4 pb-4 pl-[3.25rem] text-sm leading-relaxed text-charcoal/85"
                        >
                          {item.a}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
              <a
                href="#faq"
                onClick={closePanel}
                className="mt-5 inline-block text-sm font-bold text-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold"
              >
                View full FAQ section
              </a>
            </div>
          </div>
        ) : null}

        {!open && showTeaser ? (
          <div className="animate-help-teaser motion-reduce:animate-none relative mr-1 w-full max-w-[17.5rem] sm:max-w-xs">
            <button
              type="button"
              onClick={openPanel}
              className="relative w-full rounded-2xl border-2 border-gold/50 bg-white px-4 py-3.5 pr-10 text-left shadow-xl shadow-navy/15 transition hover:border-gold"
            >
              <p className="text-base font-bold leading-snug text-navy">Have questions?</p>
              <p className="mt-1 text-sm leading-snug text-charcoal/80">Tap for FAQ answers &amp; contact info.</p>
            </button>
            <button
              type="button"
              aria-label="Dismiss hint"
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-sm text-charcoal/50 hover:bg-off-white hover:text-navy"
            >
              ×
            </button>
            <div
              className="absolute -bottom-2 right-10 h-4 w-4 rotate-45 border-b-2 border-r-2 border-gold/50 bg-white"
              aria-hidden
            />
          </div>
        ) : null}

        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? `${baseId}-title` : undefined}
          onClick={() => (open ? closePanel() : openPanel())}
          className={`animate-help-ring motion-reduce:animate-none flex w-full max-w-[17.5rem] items-center justify-center gap-3 rounded-2xl border-2 border-gold bg-navy px-5 py-4 text-base font-bold text-white shadow-xl shadow-navy/35 transition hover:bg-navy-dark sm:max-w-none sm:min-w-[15.5rem] sm:rounded-full sm:py-4 sm:text-lg ${open ? "animate-none" : ""}`}
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-black text-navy"
            aria-hidden
          >
            ?
          </span>
          <span>{open ? "Close help" : "Help & FAQ"}</span>
        </button>
      </div>
    </>
  );
}
