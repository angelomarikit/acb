import { homeFaqs } from "./faqs";
import { serviceCategories } from "./serviceCategories";
import { services } from "./services";
import { navLinks, site } from "./site";
import { workItems } from "./work";
import { workGallerySlides } from "./workGallery";
import type { CmsContent } from "../types/cms";

export const defaultCmsContent: CmsContent = {
  siteMeta: {
    name: site.name,
    tagline: site.tagline,
    taglineSub: site.taglineSub,
    partnerLine: site.partnerLine,
    phone: site.phone,
    email: site.email,
    location: site.location,
    disclaimer: site.disclaimer,
    logoUrl: "/logo.png",
  },
  navLinks: [...navLinks],
  hero: {
    imageUrl: "/hero-main.jpg",
    tagline: site.tagline,
    headline: "Government Documents,",
    headlineAccent: " Made Simple.",
    description: `From building permits and civil registry documents to government registrations and international document authentication, ${site.name} helps make the process easier, faster, and more convenient.`,
    checklist: [
      "Building & civil registry documents",
      "Government registrations",
      "Apostille & attestation guidance",
    ],
  },
  about: {
    eyebrow: "About Us",
    title: "Professional Document Assistance You Can Rely On",
    description:
      "At ACB Document Processing Services, we help individuals, families and businesses navigate document-related transactions with greater convenience and confidence. From preparing requirements to coordinating applications and follow-ups, our goal is to simplify complicated procedures and provide responsive, reliable support throughout the process.",
    bannerImageUrl: "/about-banner.jpg",
    values: [
      "Fast and Efficient Processing",
      "Reliable and Trustworthy Assistance",
      "Professional Coordination",
      "Client-Focused Service",
    ],
    signatureName: "Ana Clarisse Blanco",
    signatureRole: "Liaison Officer",
  },
  servicesIntro: {
    eyebrow: "Our Services",
    title: "Assistance for Every Document and Registration Need",
    description:
      "These are the eleven services ACB is built around—from building permits and civil registry records to agency registrations and international document guidance. Processing times and approvals remain subject to the relevant government offices.",
    statNumber: "11",
    statTitle: "Core services",
    statSubtitle: "Document prep, filing support & coordination",
    ctaBottomTitle: "Not sure which service fits your situation?",
    ctaBottomDescription:
      "Tell us what document or registration you need—we'll help identify requirements and next steps.",
  },
  serviceCategories: [...serviceCategories],
  services: [...services],
  workIntro: {
    eyebrow: "Our Work",
    title: "Document Assistance Gallery",
    description:
      "Representative categories of work we support—without publishing private client information.",
  },
  workItems: workItems.map((w) => ({
    slug: w.slug,
    title: w.title,
    category: w.category,
    description: w.description,
  })),
  gallerySlides: [...workGallerySlides],
  process: {
    eyebrow: "Our Process",
    title: "How Our Process Works",
    description:
      "From inquiry to completion, we help you understand requirements and stay informed at each step.",
    steps: [
      { n: "01", title: "Send Your Inquiry", text: "Tell us which document or service you need." },
      { n: "02", title: "Requirements Assessment", text: "We help identify applicable requirements and processing options." },
      { n: "03", title: "Document Preparation", text: "We assist with necessary paperwork and application preparation." },
      { n: "04", title: "Submission and Coordination", text: "Where applicable, we assist with filing, submission and coordination." },
      { n: "05", title: "Updates and Completion", text: "We provide available updates and guidance until the service is completed." },
    ],
  },
  faqSection: {
    eyebrow: "FAQ",
    title: "Frequent Questions",
    description: "Answers about our document processing assistance and how to get started.",
    helperText: "Tap a question to expand — or contact us if yours is not listed.",
  },
  faqs: [...homeFaqs],
  contactSection: {
    eyebrow: "Contact",
    title: "Let Us Handle the Paperwork.",
    description:
      "Need assistance with government documents? Reach out by phone, email, or the form—we'll guide you on requirements and processing options.",
    bulletPoints: [
      "11 core document and registration services",
      "Requirements guidance before you visit an office",
      "Coordination support from inquiry to completion",
    ],
  },
};
