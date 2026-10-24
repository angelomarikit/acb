type Variant = "gold" | "navy" | "mixed";

type Props = {
  variant?: Variant;
  className?: string;
};

/** Soft decorative blurs behind section content (no interaction). */
export function SectionGlow({ variant = "mixed", className = "" }: Props) {
  if (variant === "gold") {
    return (
      <>
        <div className={`pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-gold/20 blur-3xl ${className}`} aria-hidden />
        <div className={`pointer-events-none absolute -bottom-20 right-8 h-56 w-56 rounded-full bg-gold-light/15 blur-3xl ${className}`} aria-hidden />
      </>
    );
  }

  if (variant === "navy") {
    return (
      <>
        <div className={`pointer-events-none absolute -right-32 top-0 h-72 w-72 rounded-full bg-navy/10 blur-3xl ${className}`} aria-hidden />
        <div className={`pointer-events-none absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-navy/5 blur-2xl ${className}`} aria-hidden />
      </>
    );
  }

  return (
    <>
      <div className={`pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl ${className}`} aria-hidden />
      <div className={`pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-gold-light/10 blur-3xl ${className}`} aria-hidden />
    </>
  );
}
