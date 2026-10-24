import { useState, type FormEvent } from "react";
import { useContent } from "../context/ContentContext";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border-2 border-navy/10 bg-white px-4 py-3 text-charcoal outline-none transition-[border-color,box-shadow] placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/25";

export function ContactForm() {
  const { content } = useContent();
  const services = content.services;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!data.get("consent")) {
      setError("Please confirm consent to data processing.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      await new Promise((r) => setTimeout(r, 600));
      const missing = ["name", "mobile", "email", "service", "message"].some((k) => !String(data.get(k) ?? "").trim());
      if (missing) throw new Error("Please complete all required fields.");
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed. Please try again or call us.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col">
      <div className="mb-6 border-b border-navy/10 pb-5">
        <h3 className="font-display text-2xl text-navy md:text-[1.75rem]">Send an inquiry</h3>
        <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
          Share what you need—we&apos;ll help with requirements and next steps.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold text-navy">Full Name</span>
            <input name="name" required autoComplete="name" className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-semibold text-navy">Mobile Number</span>
            <input name="mobile" required type="tel" autoComplete="tel" className={fieldClass} />
          </label>
        </div>
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-navy">Email Address</span>
          <input name="email" required type="email" autoComplete="email" className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-navy">Service Needed</span>
          <select name="service" required className={fieldClass}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-navy">Message</span>
          <textarea name="message" required rows={5} className={`${fieldClass} resize-y min-h-[120px]`} />
        </label>
        <label className="flex items-start gap-3 rounded-xl border border-navy/10 bg-white px-4 py-3 text-sm text-charcoal/85">
          <input name="consent" type="checkbox" className="mt-1 size-4 accent-navy" />
          <span>I consent to the processing of my personal data for the purpose of responding to this inquiry.</span>
        </label>
      </div>

      {status === "success" ? (
        <p className="mt-4 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-navy" role="status">
          Thank you. We received your inquiry and will contact you soon.
        </p>
      ) : null}
      {status === "error" && error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-navy px-10 text-sm font-semibold text-white shadow-md transition hover:bg-navy-dark disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send Inquiry"}
        </button>
        <p className="text-xs leading-relaxed text-charcoal/55 sm:max-w-[14rem] sm:text-right">
          Do not send sensitive IDs or birth certificates through this form.
        </p>
      </div>
    </form>
  );
}
