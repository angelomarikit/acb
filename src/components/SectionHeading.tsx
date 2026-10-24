type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  size?: "default" | "lg";
};

export function SectionHeading({ eyebrow, title, description, light, size = "default" }: Props) {
  const lg = size === "lg";

  return (
    <div className={lg ? "max-w-4xl" : "max-w-3xl"}>
      {eyebrow ? (
        <p
          className={`mb-3 font-semibold uppercase tracking-[0.2em] ${lg ? "text-sm" : "text-xs"} ${light ? "text-gold-light" : "text-gold"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display leading-tight ${lg ? "text-4xl md:text-5xl lg:text-[3.25rem]" : "text-3xl md:text-4xl lg:text-[2.75rem]"} ${light ? "text-white" : "text-navy"}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 leading-relaxed ${lg ? "text-lg md:text-xl" : "mt-4 text-base md:text-lg"} ${light ? "text-white/75" : "text-charcoal/80"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
