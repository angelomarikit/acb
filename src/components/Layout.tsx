import { useState } from "react";
import { useContent } from "../context/ContentContext";
import { BrandLogo } from "./BrandLogo";
import { HelpWidget } from "./HelpWidget";
import { PageContainer } from "./PageContainer";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  const { site, content } = useContent();
  const navLinks = content.navLinks;
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b-2 border-navy/10 bg-off-white/95 shadow-sm shadow-navy/5 backdrop-blur-md">
        <div className="h-1 w-full bg-gradient-to-r from-gold/80 via-gold to-gold/80" aria-hidden />
        <PageContainer className="grid grid-cols-[1fr_auto] items-center gap-3 py-4 md:grid-cols-[auto_1fr_auto] md:gap-6 md:py-4 lg:py-5">
          <BrandLogo className="md:justify-self-start" />
          <nav
            className="hidden items-center justify-center gap-6 md:flex lg:gap-8 xl:gap-10"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-bold uppercase tracking-[0.14em] text-navy/90 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:text-navy hover:after:w-full lg:text-[0.9375rem]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex lg:gap-4">
            <a
              href={site.phoneTel}
              className="whitespace-nowrap rounded-full border border-navy/15 bg-white/60 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-navy transition hover:border-gold/50 hover:text-gold lg:px-5 lg:text-base"
            >
              {site.phone}
            </a>
            <a
              href="#contact"
              className="rounded-full bg-navy px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-md shadow-navy/25 transition hover:bg-navy-dark lg:px-7 lg:text-sm"
            >
              Get Assistance
            </a>
          </div>
          <button
            type="button"
            className="rounded-full border-2 border-navy/15 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-navy md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </PageContainer>
        {open ? (
          <PageContainer className="border-t border-gold/30 bg-white/50 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-navy/10 pb-3 text-base font-bold uppercase tracking-[0.14em] text-navy last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.phoneTel}
                onClick={() => setOpen(false)}
                className="text-base font-semibold uppercase tracking-wide text-gold"
              >
                {site.phone}
              </a>
              <a href="#contact" onClick={() => setOpen(false)} className="font-semibold uppercase tracking-wide text-navy">
                Get Assistance
              </a>
            </div>
          </PageContainer>
        ) : null}
      </header>

      <main className="w-full flex-1">{children}</main>

      <footer className="relative w-full overflow-hidden border-t-4 border-gold bg-gradient-to-br from-navy via-navy-dark to-navy text-white">
        <div
          className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-gold/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-gold-light/10 blur-3xl"
          aria-hidden
        />

        <PageContainer className="relative grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="lg:col-span-5">
            <BrandLogo variant="footer" />
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">{site.partnerLine}</p>
            <p className="mt-2 font-display text-xl text-gold-light">{site.tagline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={site.phoneTel}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold transition hover:border-gold/50 hover:bg-white/15 sm:text-base"
              >
                {site.phone}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center justify-center rounded-full border border-gold/40 bg-gold/15 px-5 py-3 text-sm font-semibold text-gold-light transition hover:bg-gold/25 sm:text-base"
              >
                Email us
              </a>
            </div>
          </div>

          <nav className="lg:col-span-4" aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">On this page</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-display text-lg uppercase tracking-wide text-white/95 transition hover:text-gold-light md:text-xl lg:text-2xl"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Get started</p>
            <p className="mt-5 text-base leading-relaxed text-white/80">
              Based in <span className="font-semibold text-white">{site.location}</span>. Tell us which document or
              registration you need—we&apos;ll point you to the right service.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex min-h-[3rem] items-center justify-center rounded-full bg-gold px-8 text-sm font-bold uppercase tracking-wide text-navy transition hover:bg-gold-light"
            >
              Get Assistance
            </a>
          </div>
        </PageContainer>

        <div className="relative border-t border-white/10 bg-black/20">
          <PageContainer className="py-6">
            <p className="text-xs leading-relaxed text-white/55 md:text-sm">
              © {new Date().getFullYear()} {site.name}. {site.disclaimer}
            </p>
          </PageContainer>
        </div>
      </footer>

      <HelpWidget />
    </div>
  );
}
