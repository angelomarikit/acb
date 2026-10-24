import type { Service } from "../data/services";
import { useContent } from "../context/ContentContext";
import { Button } from "./Button";
import { PageContainer } from "./PageContainer";
import { ScrollReveal } from "./ScrollReveal";
import { SectionGlow } from "./SectionGlow";

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-md transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg md:p-7">
      <div className="absolute inset-y-0 left-0 w-1.5 bg-gold/80 transition-colors group-hover:bg-gold" aria-hidden />
      <div className="flex items-center gap-3 pl-2">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg text-white">
          {num}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">Core service</span>
      </div>
      <h3 className="mt-5 pl-2 font-display text-xl leading-snug text-navy md:text-2xl">{service.title}</h3>
      <p className="mt-3 flex-1 pl-2 text-base leading-relaxed text-charcoal/85">{service.short}</p>
      <a
        href="#contact"
        className="mt-5 pl-2 text-sm font-semibold text-navy underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
      >
        Inquire about this service
      </a>
    </article>
  );
}

export function ServicesSection() {
  const { content } = useContent();
  const { servicesIntro, serviceCategories, services } = content;

  const bySlug = new Map(services.map((s) => [s.slug, s]));
  const serviceIndex = (slug: string) => services.findIndex((s) => s.slug === slug);

  return (
    <section id="services" className="relative w-full scroll-mt-24 overflow-hidden border-y-4 border-gold bg-off-white">
      <div className="relative bg-navy py-12 text-white md:py-16 lg:py-20">
        <SectionGlow variant="gold" />
        <PageContainer className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end xl:grid-cols-[1.2fr_0.8fr]">
            <ScrollReveal direction="up">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">{servicesIntro.eyebrow}</p>
              <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl lg:text-[3.25rem]">{servicesIntro.title}</h2>
              <p className="mt-5 max-w-4xl text-lg leading-relaxed text-white/85 md:text-xl xl:max-w-none">{servicesIntro.description}</p>
            </ScrollReveal>
            <ScrollReveal direction="up" delayMs={120} className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
              <div className="flex flex-1 items-center gap-5 rounded-2xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-sm">
                <p className="font-display text-5xl leading-none text-gold-light md:text-6xl">{servicesIntro.statNumber}</p>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{servicesIntro.statTitle}</p>
                  <p className="mt-1 text-sm text-white/75">{servicesIntro.statSubtitle}</p>
                </div>
              </div>
              <Button
                href="#contact"
                size="lg"
                variant="outline"
                className="shrink-0 justify-center border-white bg-white text-navy hover:border-gold sm:flex-1 lg:flex-none xl:flex-1"
              >
                Get Assistance
              </Button>
            </ScrollReveal>
          </div>
        </PageContainer>
      </div>

      <PageContainer className="relative py-14 md:py-20">
        <SectionGlow variant="navy" />
        {serviceCategories.map((category, catIdx) => {
          const categoryServices = category.slugs
            .map((slug) => bySlug.get(slug))
            .filter((s): s is Service => Boolean(s));

          return (
            <div key={category.id} className={catIdx > 0 ? "mt-14 md:mt-16" : ""}>
              <ScrollReveal direction="fade">
                <div className="mb-6 border-b-2 border-navy/15 pb-4 md:mb-8">
                  <h3 className="font-display text-2xl text-navy md:text-3xl">{category.title}</h3>
                  <p className="mt-2 text-base text-charcoal/75 md:text-lg">{category.blurb}</p>
                </div>
              </ScrollReveal>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {categoryServices.map((service, i) => (
                  <ScrollReveal key={service.slug} direction="up" delayMs={60 * i}>
                    <ServiceCard service={service} index={serviceIndex(service.slug)} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          );
        })}

        <ScrollReveal direction="up" className="mt-14 md:mt-16">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border-2 border-navy/15 bg-white p-8 shadow-md md:flex-row md:items-center md:p-10">
            <div className="max-w-xl">
              <p className="font-display text-2xl text-navy md:text-3xl">{servicesIntro.ctaBottomTitle}</p>
              <p className="mt-3 text-base leading-relaxed text-charcoal/80 md:text-lg">{servicesIntro.ctaBottomDescription}</p>
            </div>
            <Button href="#contact" size="lg" className="shrink-0">
              Get Assistance
            </Button>
          </div>
        </ScrollReveal>
      </PageContainer>
    </section>
  );
}
