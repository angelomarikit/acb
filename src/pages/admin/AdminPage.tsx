import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Field, ImageUploadField, inputClass } from "../../components/admin/formHelpers";
import { useContent } from "../../context/ContentContext";
import { getSupabase, isSupabaseConfigured } from "../../lib/supabase";
import { seedCmsDefaults } from "../../lib/contentRepository";
import type { CmsContent, SectionKey } from "../../types/cms";
import { AdminLogin } from "./AdminLogin";

const TABS: { id: SectionKey | "all"; label: string; keys: SectionKey[] }[] = [
  { id: "siteMeta", label: "Site & nav", keys: ["siteMeta", "navLinks"] },
  { id: "hero", label: "Hero", keys: ["hero"] },
  { id: "servicesIntro", label: "Services", keys: ["servicesIntro", "serviceCategories", "services"] },
  { id: "about", label: "About", keys: ["about"] },
  { id: "workIntro", label: "Work & gallery", keys: ["workIntro", "workItems", "gallerySlides"] },
  { id: "process", label: "Process", keys: ["process"] },
  { id: "faqSection", label: "FAQ", keys: ["faqSection", "faqs"] },
  { id: "contactSection", label: "Contact", keys: ["contactSection"] },
];

export function AdminPage() {
  const { content, updateSection, refresh, fromCms } = useContent();
  const [draft, setDraft] = useState<CmsContent>(content);
  const [tab, setTab] = useState(TABS[0].id);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(content);
  }, [content]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user.email ?? null);
      setAuthLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSessionEmail(session?.user.email ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await getSupabase().auth.signOut();
  }

  async function saveKeys(keys: SectionKey[]) {
    setSaving(true);
    setStatus("");
    try {
      for (const key of keys) {
        await updateSection(key, draft[key]);
      }
      setStatus("Saved.");
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function runSeed() {
    if (!confirm("Overwrite Supabase content with built-in defaults?")) return;
    setSaving(true);
    try {
      await seedCmsDefaults();
      await refresh();
      setStatus("Defaults seeded.");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Seed failed.");
    } finally {
      setSaving(false);
    }
  }

  const currentTab = TABS.find((t) => t.id === tab) ?? TABS[0];

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-off-white p-8">
        <h1 className="font-display text-3xl text-navy">CMS Admin</h1>
        <p className="mt-4 max-w-xl text-charcoal/80">
          Add <code className="rounded bg-white px-1">VITE_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-white px-1">VITE_SUPABASE_ANON_KEY</code> to a <code>.env</code> file, run{" "}
          <code>supabase/schema.sql</code> in your project, then restart <code>npm run dev</code>.
        </p>
        <Link to="/" className="mt-6 inline-block font-semibold text-navy underline">
          ← Back to site
        </Link>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-navy-dark text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold/30 border-t-gold-light" aria-hidden />
        <p className="text-sm font-medium text-white/80">Loading admin…</p>
      </div>
    );
  }

  if (!sessionEmail) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-off-white">
      <header className="overflow-visible border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div className="min-w-0">
            <h1 className="font-display text-2xl text-navy">ACB CMS</h1>
            <p className="text-xs text-charcoal/60">
              {sessionEmail} · {fromCms ? "Live from Supabase" : "Using local defaults"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              to="/"
              className="inline-flex min-h-[2.75rem] items-center rounded-full border border-navy/15 px-4 py-2.5 text-sm font-semibold leading-none text-navy hover:border-gold"
            >
              View site
            </Link>
            <button
              type="button"
              onClick={runSeed}
              className="inline-flex min-h-[2.75rem] items-center rounded-full border border-gold/50 px-4 py-2.5 text-sm font-semibold leading-none text-navy"
            >
              Seed defaults
            </button>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex min-h-[2.75rem] items-center rounded-full bg-navy px-5 py-2.5 text-sm font-semibold leading-none text-white hover:bg-navy-dark"
            >
              Sign out
            </button>
          </div>
        </div>
        <nav className="mx-auto max-w-6xl px-4 pb-5 pt-1 sm:px-6" aria-label="CMS sections">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex min-h-[2.75rem] items-center rounded-full px-4 py-2.5 text-sm font-semibold leading-none transition-colors ${
                  tab === t.id ? "bg-navy text-white shadow-sm" : "bg-white text-navy ring-1 ring-navy/15 hover:ring-gold/50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        {status ? <p className="rounded-xl bg-gold/15 px-4 py-3 text-sm font-medium text-navy">{status}</p> : null}

        {tab === "siteMeta" && (
          <>
            <SectionCard title="Site info" onSave={() => saveKeys(["siteMeta"])} saving={saving}>
              <div className="grid gap-4 md:grid-cols-2">
                {(
                  [
                    ["name", "Business name"],
                    ["tagline", "Tagline"],
                    ["taglineSub", "Tagline subtitle"],
                    ["partnerLine", "Partner line"],
                    ["phone", "Phone"],
                    ["email", "Email"],
                    ["location", "Location"],
                  ] as const
                ).map(([key, label]) => (
                  <Field key={key} label={label}>
                    <input
                      className={inputClass}
                      value={draft.siteMeta[key]}
                      onChange={(e) => setDraft({ ...draft, siteMeta: { ...draft.siteMeta, [key]: e.target.value } })}
                    />
                  </Field>
                ))}
              </div>
              <Field label="Disclaimer">
                <textarea
                  className={inputClass}
                  rows={3}
                  value={draft.siteMeta.disclaimer}
                  onChange={(e) => setDraft({ ...draft, siteMeta: { ...draft.siteMeta, disclaimer: e.target.value } })}
                />
              </Field>
              <ImageUploadField
                label="Logo"
                folder="logo"
                value={draft.siteMeta.logoUrl}
                onChange={(logoUrl) => setDraft({ ...draft, siteMeta: { ...draft.siteMeta, logoUrl } })}
              />
            </SectionCard>
            <SectionCard title="Navigation links" onSave={() => saveKeys(["navLinks"])} saving={saving}>
              {draft.navLinks.map((link, i) => (
                <div key={i} className="grid gap-2 border-b border-navy/10 py-3 md:grid-cols-2">
                  <Field label="Label">
                    <input
                      className={inputClass}
                      value={link.label}
                      onChange={(e) => {
                        const navLinks = [...draft.navLinks];
                        navLinks[i] = { ...navLinks[i], label: e.target.value };
                        setDraft({ ...draft, navLinks });
                      }}
                    />
                  </Field>
                  <Field label="Anchor href">
                    <input
                      className={inputClass}
                      value={link.href}
                      onChange={(e) => {
                        const navLinks = [...draft.navLinks];
                        navLinks[i] = { ...navLinks[i], href: e.target.value };
                        setDraft({ ...draft, navLinks });
                      }}
                    />
                  </Field>
                </div>
              ))}
            </SectionCard>
          </>
        )}

        {tab === "hero" && (
          <SectionCard title="Hero" onSave={() => saveKeys(["hero"])} saving={saving}>
            <ImageUploadField label="Hero image" folder="hero" value={draft.hero.imageUrl} onChange={(imageUrl) => setDraft({ ...draft, hero: { ...draft.hero, imageUrl } })} />
            <Field label="Eyebrow / tagline">
              <input className={inputClass} value={draft.hero.tagline} onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, tagline: e.target.value } })} />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Headline">
                <input className={inputClass} value={draft.hero.headline} onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, headline: e.target.value } })} />
              </Field>
              <Field label="Headline accent (gold part)">
                <input className={inputClass} value={draft.hero.headlineAccent} onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, headlineAccent: e.target.value } })} />
              </Field>
            </div>
            <Field label="Description">
              <textarea className={inputClass} rows={4} value={draft.hero.description} onChange={(e) => setDraft({ ...draft, hero: { ...draft.hero, description: e.target.value } })} />
            </Field>
            <StringListEditor
              label="Hero checklist"
              items={draft.hero.checklist}
              onChange={(checklist) => setDraft({ ...draft, hero: { ...draft.hero, checklist } })}
            />
          </SectionCard>
        )}

        {tab === "servicesIntro" && (
          <>
            <SectionCard title="Services intro (navy band)" onSave={() => saveKeys(["servicesIntro"])} saving={saving}>
              <Field label="Eyebrow">
                <input className={inputClass} value={draft.servicesIntro.eyebrow} onChange={(e) => setDraft({ ...draft, servicesIntro: { ...draft.servicesIntro, eyebrow: e.target.value } })} />
              </Field>
              <Field label="Title">
                <input className={inputClass} value={draft.servicesIntro.title} onChange={(e) => setDraft({ ...draft, servicesIntro: { ...draft.servicesIntro, title: e.target.value } })} />
              </Field>
              <Field label="Description">
                <textarea className={inputClass} rows={4} value={draft.servicesIntro.description} onChange={(e) => setDraft({ ...draft, servicesIntro: { ...draft.servicesIntro, description: e.target.value } })} />
              </Field>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Stat number">
                  <input className={inputClass} value={draft.servicesIntro.statNumber} onChange={(e) => setDraft({ ...draft, servicesIntro: { ...draft.servicesIntro, statNumber: e.target.value } })} />
                </Field>
                <Field label="Stat title">
                  <input className={inputClass} value={draft.servicesIntro.statTitle} onChange={(e) => setDraft({ ...draft, servicesIntro: { ...draft.servicesIntro, statTitle: e.target.value } })} />
                </Field>
                <Field label="Stat subtitle">
                  <input className={inputClass} value={draft.servicesIntro.statSubtitle} onChange={(e) => setDraft({ ...draft, servicesIntro: { ...draft.servicesIntro, statSubtitle: e.target.value } })} />
                </Field>
              </div>
              <Field label="Bottom CTA title">
                <input className={inputClass} value={draft.servicesIntro.ctaBottomTitle} onChange={(e) => setDraft({ ...draft, servicesIntro: { ...draft.servicesIntro, ctaBottomTitle: e.target.value } })} />
              </Field>
              <Field label="Bottom CTA description">
                <textarea className={inputClass} rows={2} value={draft.servicesIntro.ctaBottomDescription} onChange={(e) => setDraft({ ...draft, servicesIntro: { ...draft.servicesIntro, ctaBottomDescription: e.target.value } })} />
              </Field>
            </SectionCard>
            <SectionCard title="Service categories" onSave={() => saveKeys(["serviceCategories"])} saving={saving}>
              {draft.serviceCategories.map((cat, i) => (
                <div key={cat.id} className="mb-4 rounded-xl border border-navy/10 p-4">
                  <Field label="Title">
                    <input
                      className={inputClass}
                      value={cat.title}
                      onChange={(e) => {
                        const serviceCategories = [...draft.serviceCategories];
                        serviceCategories[i] = { ...cat, title: e.target.value };
                        setDraft({ ...draft, serviceCategories });
                      }}
                    />
                  </Field>
                  <Field label="Blurb">
                    <textarea
                      className={inputClass}
                      rows={2}
                      value={cat.blurb}
                      onChange={(e) => {
                        const serviceCategories = [...draft.serviceCategories];
                        serviceCategories[i] = { ...cat, blurb: e.target.value };
                        setDraft({ ...draft, serviceCategories });
                      }}
                    />
                  </Field>
                  <Field label="Service slugs (comma-separated)">
                    <input
                      className={inputClass}
                      value={cat.slugs.join(", ")}
                      onChange={(e) => {
                        const serviceCategories = [...draft.serviceCategories];
                        serviceCategories[i] = { ...cat, slugs: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) };
                        setDraft({ ...draft, serviceCategories });
                      }}
                    />
                  </Field>
                </div>
              ))}
            </SectionCard>
            <SectionCard title="All services (11)" onSave={() => saveKeys(["services"])} saving={saving}>
              {draft.services.map((s, i) => (
                <details key={s.slug} className="mb-3 rounded-xl border border-navy/10 p-3">
                  <summary className="cursor-pointer font-semibold text-navy">
                    {String(i + 1).padStart(2, "0")} — {s.title}
                  </summary>
                  <div className="mt-3 space-y-3">
                    <Field label="Slug">
                      <input
                        className={inputClass}
                        value={s.slug}
                        onChange={(e) => {
                          const services = [...draft.services];
                          services[i] = { ...s, slug: e.target.value };
                          setDraft({ ...draft, services });
                        }}
                      />
                    </Field>
                    <Field label="Title">
                      <input
                        className={inputClass}
                        value={s.title}
                        onChange={(e) => {
                          const services = [...draft.services];
                          services[i] = { ...s, title: e.target.value };
                          setDraft({ ...draft, services });
                        }}
                      />
                    </Field>
                    <Field label="Short description (card)">
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={s.short}
                        onChange={(e) => {
                          const services = [...draft.services];
                          services[i] = { ...s, short: e.target.value };
                          setDraft({ ...draft, services });
                        }}
                      />
                    </Field>
                  </div>
                </details>
              ))}
            </SectionCard>
          </>
        )}

        {tab === "about" && (
          <SectionCard title="About" onSave={() => saveKeys(["about"])} saving={saving}>
            <ImageUploadField label="Banner image" folder="about" value={draft.about.bannerImageUrl} onChange={(bannerImageUrl) => setDraft({ ...draft, about: { ...draft.about, bannerImageUrl } })} />
            <Field label="Eyebrow">
              <input className={inputClass} value={draft.about.eyebrow} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, eyebrow: e.target.value } })} />
            </Field>
            <Field label="Title">
              <input className={inputClass} value={draft.about.title} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, title: e.target.value } })} />
            </Field>
            <Field label="Description">
              <textarea className={inputClass} rows={5} value={draft.about.description} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, description: e.target.value } })} />
            </Field>
            <StringListEditor label="Value cards" items={draft.about.values} onChange={(values) => setDraft({ ...draft, about: { ...draft.about, values } })} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Signature name">
                <input className={inputClass} value={draft.about.signatureName} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, signatureName: e.target.value } })} />
              </Field>
              <Field label="Signature role">
                <input className={inputClass} value={draft.about.signatureRole} onChange={(e) => setDraft({ ...draft, about: { ...draft.about, signatureRole: e.target.value } })} />
              </Field>
            </div>
          </SectionCard>
        )}

        {tab === "workIntro" && (
          <>
            <SectionCard title="Work section heading" onSave={() => saveKeys(["workIntro"])} saving={saving}>
              <Field label="Eyebrow">
                <input className={inputClass} value={draft.workIntro.eyebrow} onChange={(e) => setDraft({ ...draft, workIntro: { ...draft.workIntro, eyebrow: e.target.value } })} />
              </Field>
              <Field label="Title">
                <input className={inputClass} value={draft.workIntro.title} onChange={(e) => setDraft({ ...draft, workIntro: { ...draft.workIntro, title: e.target.value } })} />
              </Field>
              <Field label="Description">
                <textarea className={inputClass} rows={3} value={draft.workIntro.description} onChange={(e) => setDraft({ ...draft, workIntro: { ...draft.workIntro, description: e.target.value } })} />
              </Field>
            </SectionCard>
            <SectionCard title="Gallery slides" onSave={() => saveKeys(["gallerySlides"])} saving={saving}>
              {draft.gallerySlides.map((slide, i) => (
                <div key={i} className="mb-4 rounded-xl border border-navy/10 p-4">
                  <ImageUploadField
                    label={`Slide ${i + 1} image`}
                    folder="gallery"
                    value={slide.src}
                    onChange={(src) => {
                      const gallerySlides = [...draft.gallerySlides];
                      gallerySlides[i] = { ...slide, src };
                      setDraft({ ...draft, gallerySlides });
                    }}
                  />
                  <Field label="Alt text">
                    <input
                      className={inputClass}
                      value={slide.alt}
                      onChange={(e) => {
                        const gallerySlides = [...draft.gallerySlides];
                        gallerySlides[i] = { ...slide, alt: e.target.value };
                        setDraft({ ...draft, gallerySlides });
                      }}
                    />
                  </Field>
                  <Field label="Caption">
                    <input
                      className={inputClass}
                      value={slide.caption ?? ""}
                      onChange={(e) => {
                        const gallerySlides = [...draft.gallerySlides];
                        gallerySlides[i] = { ...slide, caption: e.target.value };
                        setDraft({ ...draft, gallerySlides });
                      }}
                    />
                  </Field>
                </div>
              ))}
              <button
                type="button"
                className="text-sm font-semibold text-navy underline"
                onClick={() =>
                  setDraft({
                    ...draft,
                    gallerySlides: [...draft.gallerySlides, { src: "", alt: "", caption: "" }],
                  })
                }
              >
                + Add slide
              </button>
            </SectionCard>
            <SectionCard title="Work category cards" onSave={() => saveKeys(["workItems"])} saving={saving}>
              {draft.workItems.map((item, i) => (
                <div key={item.slug} className="mb-4 grid gap-2 border-b border-navy/10 pb-4 md:grid-cols-2">
                  <Field label="Title">
                    <input
                      className={inputClass}
                      value={item.title}
                      onChange={(e) => {
                        const workItems = [...draft.workItems];
                        workItems[i] = { ...item, title: e.target.value };
                        setDraft({ ...draft, workItems });
                      }}
                    />
                  </Field>
                  <Field label="Category label">
                    <input
                      className={inputClass}
                      value={item.category}
                      onChange={(e) => {
                        const workItems = [...draft.workItems];
                        workItems[i] = { ...item, category: e.target.value };
                        setDraft({ ...draft, workItems });
                      }}
                    />
                  </Field>
                  <Field label="Description">
                    <textarea
                      className={inputClass}
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const workItems = [...draft.workItems];
                        workItems[i] = { ...item, description: e.target.value };
                        setDraft({ ...draft, workItems });
                      }}
                    />
                  </Field>
                </div>
              ))}
            </SectionCard>
          </>
        )}

        {tab === "process" && (
          <SectionCard title="Process" onSave={() => saveKeys(["process"])} saving={saving}>
            <Field label="Eyebrow">
              <input className={inputClass} value={draft.process.eyebrow} onChange={(e) => setDraft({ ...draft, process: { ...draft.process, eyebrow: e.target.value } })} />
            </Field>
            <Field label="Title">
              <input className={inputClass} value={draft.process.title} onChange={(e) => setDraft({ ...draft, process: { ...draft.process, title: e.target.value } })} />
            </Field>
            <Field label="Description">
              <textarea className={inputClass} rows={3} value={draft.process.description} onChange={(e) => setDraft({ ...draft, process: { ...draft.process, description: e.target.value } })} />
            </Field>
            {draft.process.steps.map((step, i) => (
              <div key={step.n} className="grid gap-2 border-t border-navy/10 py-3 md:grid-cols-3">
                <Field label="Number">
                  <input
                    className={inputClass}
                    value={step.n}
                    onChange={(e) => {
                      const steps = [...draft.process.steps];
                      steps[i] = { ...step, n: e.target.value };
                      setDraft({ ...draft, process: { ...draft.process, steps } });
                    }}
                  />
                </Field>
                <Field label="Title">
                  <input
                    className={inputClass}
                    value={step.title}
                    onChange={(e) => {
                      const steps = [...draft.process.steps];
                      steps[i] = { ...step, title: e.target.value };
                      setDraft({ ...draft, process: { ...draft.process, steps } });
                    }}
                  />
                </Field>
                <Field label="Text">
                  <input
                    className={inputClass}
                    value={step.text}
                    onChange={(e) => {
                      const steps = [...draft.process.steps];
                      steps[i] = { ...step, text: e.target.value };
                      setDraft({ ...draft, process: { ...draft.process, steps } });
                    }}
                  />
                </Field>
              </div>
            ))}
          </SectionCard>
        )}

        {tab === "faqSection" && (
          <>
            <SectionCard title="FAQ section heading" onSave={() => saveKeys(["faqSection"])} saving={saving}>
              <Field label="Eyebrow">
                <input className={inputClass} value={draft.faqSection.eyebrow} onChange={(e) => setDraft({ ...draft, faqSection: { ...draft.faqSection, eyebrow: e.target.value } })} />
              </Field>
              <Field label="Title">
                <input className={inputClass} value={draft.faqSection.title} onChange={(e) => setDraft({ ...draft, faqSection: { ...draft.faqSection, title: e.target.value } })} />
              </Field>
              <Field label="Description">
                <textarea className={inputClass} rows={2} value={draft.faqSection.description} onChange={(e) => setDraft({ ...draft, faqSection: { ...draft.faqSection, description: e.target.value } })} />
              </Field>
              <Field label="Desktop helper text">
                <input className={inputClass} value={draft.faqSection.helperText} onChange={(e) => setDraft({ ...draft, faqSection: { ...draft.faqSection, helperText: e.target.value } })} />
              </Field>
            </SectionCard>
            <SectionCard title="FAQ items" onSave={() => saveKeys(["faqs"])} saving={saving}>
              {draft.faqs.map((faq, i) => (
                <div key={i} className="mb-4 space-y-2 border-b border-navy/10 pb-4">
                  <Field label="Question">
                    <input
                      className={inputClass}
                      value={faq.q}
                      onChange={(e) => {
                        const faqs = [...draft.faqs];
                        faqs[i] = { ...faq, q: e.target.value };
                        setDraft({ ...draft, faqs });
                      }}
                    />
                  </Field>
                  <Field label="Answer">
                    <textarea
                      className={inputClass}
                      rows={3}
                      value={faq.a}
                      onChange={(e) => {
                        const faqs = [...draft.faqs];
                        faqs[i] = { ...faq, a: e.target.value };
                        setDraft({ ...draft, faqs });
                      }}
                    />
                  </Field>
                </div>
              ))}
              <button
                type="button"
                className="text-sm font-semibold text-navy underline"
                onClick={() => setDraft({ ...draft, faqs: [...draft.faqs, { q: "", a: "" }] })}
              >
                + Add FAQ
              </button>
            </SectionCard>
          </>
        )}

        {tab === "contactSection" && (
          <SectionCard title="Contact section" onSave={() => saveKeys(["contactSection"])} saving={saving}>
            <Field label="Eyebrow">
              <input className={inputClass} value={draft.contactSection.eyebrow} onChange={(e) => setDraft({ ...draft, contactSection: { ...draft.contactSection, eyebrow: e.target.value } })} />
            </Field>
            <Field label="Title">
              <input className={inputClass} value={draft.contactSection.title} onChange={(e) => setDraft({ ...draft, contactSection: { ...draft.contactSection, title: e.target.value } })} />
            </Field>
            <Field label="Description">
              <textarea className={inputClass} rows={4} value={draft.contactSection.description} onChange={(e) => setDraft({ ...draft, contactSection: { ...draft.contactSection, description: e.target.value } })} />
            </Field>
            <StringListEditor
              label="Bullet points (left panel)"
              items={draft.contactSection.bulletPoints}
              onChange={(bulletPoints) => setDraft({ ...draft, contactSection: { ...draft.contactSection, bulletPoints } })}
            />
          </SectionCard>
        )}

        <p className="text-xs text-charcoal/50">
          Saving tab: <strong>{currentTab.label}</strong> — keys: {currentTab.keys.join(", ")}
        </p>
      </main>
    </div>
  );
}

function SectionCard({
  title,
  children,
  onSave,
  saving,
}: {
  title: string;
  children: ReactNode;
  onSave: () => void;
  saving: boolean;
}) {
  return (
    <section className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl text-navy">{title}</h2>
        <button
          type="button"
          disabled={saving}
          onClick={onSave}
          className="inline-flex min-h-[2.75rem] shrink-0 items-center rounded-full bg-gold px-6 py-2.5 text-sm font-bold leading-none text-navy disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save section"}
        </button>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function StringListEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (items: string[]) => void }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-navy">{label}</p>
      {items.map((item, i) => (
        <div key={i} className="mb-2 flex gap-2">
          <input
            className={inputClass}
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
          />
          <button type="button" className="shrink-0 text-sm text-red-700" onClick={() => onChange(items.filter((_, j) => j !== i))}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="text-sm font-semibold text-navy underline" onClick={() => onChange([...items, ""])}>
        + Add line
      </button>
    </div>
  );
}
