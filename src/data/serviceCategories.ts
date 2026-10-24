export type ServiceCategory = {
  id: string;
  title: string;
  blurb: string;
  slugs: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "permits-registry",
    title: "Building & Civil Registry",
    blurb: "Permits and PSA-related birth and registry documents.",
    slugs: [
      "building-permit-services",
      "correction-of-birth-services",
      "late-registration-services",
      "psa-document-assistance",
    ],
  },
  {
    id: "dfa-travel",
    title: "DFA, Authentication & International",
    blurb: "Passport guidance, apostille, and documents for use abroad—including UAE attestation.",
    slugs: ["dfa-passport-assistance", "dfa-apostille", "uae-attestation"],
  },
  {
    id: "gov-benefits",
    title: "Government Agencies",
    blurb: "SSS, Pag-IBIG, PhilHealth, and BIR documentation support.",
    slugs: ["sss-assistance", "pag-ibig-assistance", "philhealth-assistance", "bir-assistance"],
  },
];
