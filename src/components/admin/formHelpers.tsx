import type { ReactNode } from "react";
import { uploadCmsMedia } from "../../lib/contentRepository";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-semibold text-navy">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-charcoal/60">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full rounded-xl border-2 border-navy/10 px-3 py-2.5 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";

export function ImageUploadField({
  label,
  value,
  folder,
  onChange,
}: {
  label: string;
  value: string;
  folder: string;
  onChange: (url: string) => void;
}) {
  return (
    <Field label={label} hint="Upload replaces URL, or paste an external URL below.">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        {value ? (
          <img src={value} alt="" className="h-20 w-auto max-w-[8rem] rounded-lg border border-navy/10 object-contain" />
        ) : null}
        <div className="flex flex-1 flex-col gap-2">
          <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} placeholder="/hero-main.jpg or https://..." />
          <input
            type="file"
            accept="image/*"
            className="text-sm"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const url = await uploadCmsMedia(file, folder);
                onChange(url);
              } catch (err) {
                alert(err instanceof Error ? err.message : "Upload failed");
              }
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </Field>
  );
}
