import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Field, inputClass } from "../../components/admin/formHelpers";
import { useContent } from "../../context/ContentContext";
import { getSupabase } from "../../lib/supabase";

export function AdminLogin() {
  const { site } = useContent();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  async function signIn(e: FormEvent) {
    e.preventDefault();
    setStatus("");
    setSigningIn(true);
    try {
      const { error } = await getSupabase().auth.signInWithPassword({ email, password });
      if (error) setStatus(error.message);
    } finally {
      setSigningIn(false);
    }
  }

  const isError = status.length > 0 && !status.toLowerCase().includes("signed in");

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-navy-dark lg:flex-row">
      <div
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-gold-light/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col justify-center border-b border-white/10 px-8 py-12 lg:border-b-0 lg:border-r lg:px-14 lg:py-16 xl:px-20">
        <div className="mx-auto w-full max-w-lg lg:mx-0">
          <div className="inline-flex rounded-xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-white/20">
            <img src={site.logoUrl} alt={site.name} className="h-12 w-auto object-contain md:h-14" />
          </div>
          <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-gold-light">Content management</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-white md:text-5xl">ACB CMS Admin</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">{site.partnerLine}</p>
          <ul className="mt-8 space-y-3 text-sm text-white/85">
            {["Edit every landing page section", "Upload hero, banner & gallery images", "Publish changes to your live site"].map((line) => (
              <li key={line} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/25 text-xs font-bold text-gold-light">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-6 py-12 lg:px-12 lg:py-16">
        <form
          onSubmit={signIn}
          className="w-full max-w-md rounded-2xl border border-gold/30 bg-white p-8 shadow-2xl shadow-black/25 md:p-10"
        >
          <div className="mb-8 border-b border-navy/10 pb-6">
            <h2 className="font-display text-2xl text-navy">Welcome back</h2>
            <p className="mt-2 text-sm text-charcoal/70">Sign in with your Supabase admin account.</p>
          </div>

          <div className="space-y-5">
            <Field label="Email address">
              <input
                className={inputClass}
                type="email"
                required
                autoComplete="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Password">
              <input
                className={inputClass}
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
          </div>

          {status ? (
            <p
              className={`mt-5 rounded-xl px-4 py-3 text-sm ${isError ? "border border-red-200 bg-red-50 text-red-800" : "border border-gold/40 bg-gold/10 text-navy"}`}
              role={isError ? "alert" : "status"}
            >
              {status}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={signingIn}
            className="mt-8 flex w-full min-h-[3rem] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-navy to-navy-dark py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-navy/30 transition hover:brightness-110 disabled:opacity-60"
          >
            {signingIn ? "Signing in…" : "Sign in to CMS"}
          </button>

          <Link
            to="/"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-navy/70 transition hover:text-gold"
          >
            <span aria-hidden>←</span> Back to website
          </Link>
        </form>
      </div>
    </div>
  );
}
