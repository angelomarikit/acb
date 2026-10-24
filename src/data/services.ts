export type Service = {
  slug: string;
  title: string;
  short: string;
  overview: string;
  whoNeeds: string[];
  requirements: string[];
  steps: string[];
  reminders: string[];
  faqs: { q: string; a: string }[];
};

const commonReminders = [
  "Processing fees, timelines, and approvals are determined by the relevant government agency.",
  "Confirm current requirements with the issuing office before submission.",
  "We do not guarantee application approval.",
];

const commonSteps = [
  "Send your inquiry and share which document or service you need.",
  "Review applicable requirements and processing options together.",
  "Prepare and organize the necessary paperwork.",
  "Coordinate filing or submission when applicable.",
  "Receive updates and guidance on next steps until completion.",
];

function service(
  slug: string,
  title: string,
  short: string,
  overview: string,
  whoNeeds: string[],
  requirements: string[],
): Service {
  return {
    slug,
    title,
    short,
    overview,
    whoNeeds,
    requirements,
    steps: commonSteps,
    reminders: commonReminders,
    faqs: [
      {
        q: `Who typically needs ${title.toLowerCase()}?`,
        a: whoNeeds.join(" "),
      },
      {
        q: "Can I inquire before visiting an office?",
        a: "Yes. Contact us by phone, email, or the website form to discuss your situation first.",
      },
    ],
  };
}

export const services: Service[] = [
  service(
    "building-permit-services",
    "Building Permit Services",
    "Assistance with preparing, filing, submitting and following up building permit applications.",
    "We help clients organize building permit requirements, prepare application materials, and coordinate follow-up with the relevant offices where applicable.",
    [
      "Property owners, contractors, and businesses pursuing construction or occupancy-related permits.",
    ],
    [
      "Project details and location information",
      "Plans and supporting documents as required by the local building official",
      "Owner or authorized representative identification (as required by the office)",
    ],
  ),
  service(
    "correction-of-birth-services",
    "Correction of Birth Services",
    "Assistance with correction of civil registry birth record information and the corresponding application process.",
    "We guide clients through correction of birth record requests, including document preparation and coordination steps based on applicable civil registry procedures.",
    ["Individuals correcting entries on PSA or local civil registry birth records."],
    [
      "Existing birth certificate copies",
      "Supporting proof for the requested correction (as required)",
      "Valid identification",
    ],
  ),
  service(
    "late-registration-services",
    "Late Registration Services",
    "Assistance with requirements, documentation and applications for late registration of birth.",
    "We assist with late registration cases by helping identify requirements and prepare application packets subject to civil registry rules.",
    ["Individuals registering a birth record beyond the standard timeline."],
    ["Affidavits or supporting documents as required", "Witness or parental documents if applicable", "Valid identification"],
  ),
  service(
    "psa-document-assistance",
    "PSA Document Assistance",
    "Assistance with obtaining PSA-issued civil registry documents, subject to applicable requirements.",
    "We help clients request PSA certificates and related civil registry documents, including guidance on channels and requirements.",
    ["Individuals needing PSA birth, marriage, death, or CENOMAR copies."],
    ["Applicant details matching registry records", "Valid ID", "Authorization if requesting for another person"],
  ),
  service(
    "dfa-passport-assistance",
    "DFA Passport Assistance",
    "Guidance on passport requirements, application preparation and appointment-related procedures.",
    "We provide guidance on passport application requirements, document preparation, and appointment-related steps. DFA processes and approves all passport applications.",
    ["First-time applicants, renewals, and clients needing appointment preparation support."],
    ["Confirmed appointment details (if applicable)", "Supporting civil registry or identification documents", "Forms and fees per DFA guidance"],
  ),
  service(
    "dfa-apostille",
    "DFA Apostille",
    "Assistance with document preparation and processing requirements for DFA apostille services.",
    "We assist with document preparation for DFA apostille processing, including checklist review and coordination guidance.",
    ["Individuals and businesses submitting documents for international use where apostille applies."],
    ["Original documents requiring authentication", "Copies or supporting papers as required", "Valid identification"],
  ),
  service(
    "sss-assistance",
    "SSS Assistance",
    "Support for SSS-related documentation, registrations and applicable transactions.",
    "We help clients prepare SSS-related documentation and understand steps for common membership and transaction requirements.",
    ["Employees, employers, and self-employed members handling SSS documentation."],
    ["Member details and supporting forms", "Valid identification", "Employer information if applicable"],
  ),
  service(
    "pag-ibig-assistance",
    "Pag-IBIG Assistance",
    "Support for Pag-IBIG membership documentation and relevant processing requirements.",
    "We assist with Pag-IBIG documentation preparation and guidance for applicable membership or loan-related requirements.",
    ["Members updating records or preparing Pag-IBIG transaction documents."],
    ["Membership details", "Supporting forms", "Valid identification"],
  ),
  service(
    "philhealth-assistance",
    "PhilHealth Assistance",
    "Support for PhilHealth documentation, registration and related processing.",
    "We help clients organize PhilHealth registration and update requirements based on applicable PhilHealth procedures.",
    ["Individuals and employers handling PhilHealth membership documentation."],
    ["Registration or update forms", "Supporting civil registry or employment documents", "Valid identification"],
  ),
  service(
    "bir-assistance",
    "BIR Assistance",
    "Support for BIR registration, taxpayer documentation and related application requirements.",
    "We assist with BIR registration and taxpayer documentation preparation, including checklist guidance for common business and individual requirements.",
    ["New businesses, professionals, and individuals completing BIR registration steps."],
    ["Business or taxpayer information", "Supporting registration documents", "Valid identification"],
  ),
  service(
    "uae-attestation",
    "UAE Attestation",
    "Guidance and documentation assistance for documents requiring attestation for use in the United Arab Emirates.",
    "We provide documentation guidance for UAE attestation pathways, including preparation steps prior to embassy or agency requirements.",
    ["Clients sending Philippine documents for employment or residency use in the UAE."],
    ["Document type confirmation", "Original and copied documents as required", "Prior authentication steps if applicable"],
  ),
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
