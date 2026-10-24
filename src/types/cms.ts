import type { Service } from "../data/services";

export type NavLink = { href: string; label: string };

export type SiteMeta = {
  name: string;
  tagline: string;
  taglineSub: string;
  partnerLine: string;
  phone: string;
  email: string;
  location: string;
  disclaimer: string;
  logoUrl: string;
};

export type HeroContent = {
  imageUrl: string;
  tagline: string;
  headline: string;
  headlineAccent: string;
  description: string;
  checklist: string[];
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  description: string;
  bannerImageUrl: string;
  values: string[];
  signatureName: string;
  signatureRole: string;
};

export type ServicesIntroContent = {
  eyebrow: string;
  title: string;
  description: string;
  statNumber: string;
  statTitle: string;
  statSubtitle: string;
  ctaBottomTitle: string;
  ctaBottomDescription: string;
};

export type WorkIntroContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  category: string;
  description: string;
};

export type GallerySlide = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProcessContent = {
  eyebrow: string;
  title: string;
  description: string;
  steps: { n: string; title: string; text: string }[];
};

export type FaqSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  helperText: string;
};

export type FaqItem = { q: string; a: string };

export type ContactSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  bulletPoints: string[];
};

export type ServiceCategory = {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
};

export type CmsContent = {
  siteMeta: SiteMeta;
  navLinks: NavLink[];
  hero: HeroContent;
  about: AboutContent;
  servicesIntro: ServicesIntroContent;
  serviceCategories: ServiceCategory[];
  services: Service[];
  workIntro: WorkIntroContent;
  workItems: WorkItem[];
  gallerySlides: GallerySlide[];
  process: ProcessContent;
  faqSection: FaqSectionContent;
  faqs: FaqItem[];
  contactSection: ContactSectionContent;
};

export type SectionKey = keyof CmsContent;

export const SECTION_KEYS: SectionKey[] = [
  "siteMeta",
  "navLinks",
  "hero",
  "about",
  "servicesIntro",
  "serviceCategories",
  "services",
  "workIntro",
  "workItems",
  "gallerySlides",
  "process",
  "faqSection",
  "faqs",
  "contactSection",
];
