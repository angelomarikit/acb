import { Button } from "../components/Button";
import { ContactForm } from "../components/ContactForm";
import { FaqAccordion } from "../components/FaqAccordion";
import { WorkGalleryCarousel } from "../components/WorkGalleryCarousel";
import { PageContainer } from "../components/PageContainer";
import { ParallaxBanner } from "../components/ParallaxBanner";
import { ScrollParallaxImage } from "../components/ScrollParallaxImage";
import { ScrollReveal } from "../components/ScrollReveal";
import { SectionGlow } from "../components/SectionGlow";
import { SectionHeading } from "../components/SectionHeading";
import { ServicesSection } from "../components/ServicesSection";
import { useContent } from "../context/ContentContext";

export function LandingPage() {
  const { content, site } = useContent();
  const { hero, about, workIntro, workItems, process, faqSection, faqs, contactSection } = content;

  return (
    <>
      <section id="top" className="relative w-full scroll-mt-20 overflow-hidden bg-white">
        <SectionGlow variant="navy" />
        <PageContainer className="relative pt-6 pb-10 md:pt-8 md:pb-14">
          <ScrollReveal direction="fade">
            <ScrollParallaxImage src={hero.imageUrl} alt={`${site.name} — professional document assistance`} />
          </ScrollReveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <ScrollReveal direction="up" delayMs={80}>
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{hero.tagline}</p>
                <h1 className="font-display text-4xl leading-[1.08] text-navy md:text-5xl xl:text-6xl">
                  {hero.headline}
                  <span className="text-gold">{hero.headlineAccent}</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/85 md:text-lg">{hero.description}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={160}>
              <div className="flex flex-col gap-4 lg:items-stretch">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <Button href="#contact" size="lg">
                    Get Assistance
                  </Button>
                  <Button href="#services" variant="outline" size="lg">
                    Explore Our Services
                  </Button>
                </div>
                <ul className="grid gap-2 text-sm text-charcoal/80 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {hero.checklist.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-gold">✓</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </PageContainer>
      </section>

      <ServicesSection />

      <section id="about" className="relative w-full scroll-mt-24 overflow-hidden bg-white py-14 md:py-20">
        <SectionGlow variant="gold" />
        <PageContainer className="relative">
          <ScrollReveal direction="up">
          <div className="grid overflow-hidden rounded-2xl border border-navy/10 bg-off-white shadow-sm transition-shadow duration-500 hover:shadow-lg lg:min-h-[min(720px,82vh)] lg:grid-cols-2">
            <ScrollReveal direction="left" className="h-full min-h-[320px] sm:min-h-[400px] lg:min-h-full">
              <ParallaxBanner
                src={about.bannerImageUrl}
                alt={`${about.signatureName} — ${site.name}, ${about.signatureRole}`}
                fit="contain"
                className="min-h-[320px] sm:min-h-[400px] lg:min-h-full"
              />
            </ScrollReveal>
            <div className="flex flex-col justify-center px-5 py-12 sm:px-8 lg:px-10 xl:px-12 lg:py-16">
              <ScrollReveal direction="right">
              <SectionHeading size="lg" eyebrow={about.eyebrow} title={about.title} description={about.description} />
              </ScrollReveal>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
                {about.values.map((v, i) => (
                  <ScrollReveal key={v} direction="up" delayMs={80 * i}>
                    <div className="flex h-full min-h-[4.5rem] items-center rounded-2xl border border-navy/10 bg-white px-5 py-4 text-base font-semibold leading-snug text-navy shadow-sm md:min-h-[5rem] md:px-6 md:py-5 md:text-lg">
                      {v}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <ScrollReveal direction="up" delayMs={360}>
                <p className="mt-8 text-base text-charcoal/70 md:text-lg">
                  <strong className="text-navy">{about.signatureName}</strong> — {about.signatureRole}
                </p>
              </ScrollReveal>
            </div>
          </div>
          </ScrollReveal>
        </PageContainer>
      </section>

      <section id="work" className="relative w-full scroll-mt-24 overflow-hidden bg-navy py-14 text-white md:py-20">
        <SectionGlow variant="gold" />
        <PageContainer className="relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
            <ScrollReveal direction="left">
              <SectionHeading light eyebrow={workIntro.eyebrow} title={workIntro.title} description={workIntro.description} />
            </ScrollReveal>
            <ScrollReveal direction="right" delayMs={100}>
              <WorkGalleryCarousel />
            </ScrollReveal>
          </div>
        </PageContainer>
        <PageContainer className="relative mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {workItems.map((item, i) => (
            <ScrollReveal key={item.slug} direction="up" delayMs={70 * i}>
              <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-light">{item.category}</p>
                <h3 className="mt-2 font-display text-xl text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/75">{item.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </PageContainer>
      </section>

      <section id="process" className="relative w-full scroll-mt-24 overflow-hidden bg-white py-14 md:py-20">
        <SectionGlow variant="navy" />
        <PageContainer className="relative">
          <ScrollReveal direction="up">
            <SectionHeading eyebrow={process.eyebrow} title={process.title} description={process.description} />
          </ScrollReveal>
          <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
            {process.steps.map((step, i) => (
              <ScrollReveal key={step.n} direction="up" delayMs={80 * i}>
                <div className="h-full rounded-2xl border border-navy/10 bg-off-white p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-md">
                  <p className="text-sm font-semibold text-gold">{step.n}</p>
                  <h3 className="mt-2 font-display text-lg text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/75">{step.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </PageContainer>
      </section>

      <section id="faq" className="relative w-full scroll-mt-24 overflow-hidden bg-navy py-14 md:py-20">
        <SectionGlow />
        <PageContainer className="relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-14">
            <ScrollReveal direction="left">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8 lg:sticky lg:top-28">
              <SectionHeading light eyebrow={faqSection.eyebrow} title={faqSection.title} description={faqSection.description} />
              <p className="mt-6 hidden text-sm font-medium text-gold-light lg:block">{faqSection.helperText}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delayMs={120}>
              <FaqAccordion items={faqs} />
            </ScrollReveal>
          </div>
        </PageContainer>
      </section>

      <section id="contact" className="relative w-full scroll-mt-24 overflow-hidden bg-off-white py-14 md:py-20">
        <SectionGlow variant="gold" />
        <PageContainer className="relative">
          <ScrollReveal direction="up">
          <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-xl shadow-navy/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-navy/10">
            <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-stretch">
              <div className="relative flex min-h-full flex-col bg-gradient-to-br from-navy via-navy to-navy-dark px-6 py-10 text-white sm:px-8 lg:px-10 lg:py-12">
                <div
                  className="pointer-events-none absolute -right-16 top-8 h-48 w-48 rounded-full bg-gold/15 blur-2xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black/20 to-transparent"
                  aria-hidden
                />
                <SectionHeading light eyebrow={contactSection.eyebrow} title={contactSection.title} description={contactSection.description} />
                <ul className="relative mt-8 flex flex-1 flex-col gap-3 lg:mt-10 lg:gap-4">
                  <li className="flex min-h-[4.5rem] flex-1 lg:min-h-[5.5rem]">
                    <a
                      href={site.phoneTel}
                      className="flex w-full flex-col justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-5 transition hover:border-gold/40 hover:bg-white/15 sm:flex-row sm:items-center sm:justify-between lg:px-6 lg:py-6"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">Mobile</span>
                      <span className="mt-1 text-lg font-semibold sm:mt-0 lg:text-xl">{site.phone}</span>
                    </a>
                  </li>
                  <li className="flex min-h-[4.5rem] flex-1 lg:min-h-[5.5rem]">
                    <a
                      href={`mailto:${site.email}`}
                      className="flex w-full flex-col justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-5 transition hover:border-gold/40 hover:bg-white/15 sm:flex-row sm:items-center sm:justify-between lg:px-6 lg:py-6"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">Email</span>
                      <span className="mt-1 break-all text-sm font-medium sm:mt-0 sm:text-base lg:text-lg">{site.email}</span>
                    </a>
                  </li>
                  <li className="flex min-h-[4.5rem] flex-1 lg:min-h-[5.5rem]">
                    <div className="flex w-full flex-col justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-5 lg:px-6 lg:py-6">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">Location</span>
                      <p className="mt-2 text-base font-medium lg:text-lg">{site.location}</p>
                    </div>
                  </li>
                </ul>
                <div className="relative mt-8 border-t border-white/15 pt-8 lg:mt-auto">
                  <p className="font-display text-2xl leading-snug text-gold-light lg:text-[1.65rem]">{site.tagline}</p>
                  <p className="mt-2 text-sm text-white/75">{site.taglineSub}</p>
                  <ul className="mt-5 space-y-2.5 text-sm text-white/85">
                    {contactSection.bulletPoints.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-gold-light" aria-hidden>
                          ✓
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex min-h-full flex-col border-t border-navy/10 bg-gradient-to-b from-off-white to-white px-6 py-10 sm:px-8 lg:border-t-0 lg:border-l lg:px-10 lg:py-12">
                <ContactForm />
              </div>
            </div>
          </div>
          </ScrollReveal>
        </PageContainer>
      </section>
    </>
  );
}
