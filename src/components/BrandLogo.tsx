import { useContent } from "../context/ContentContext";

type Props = {
  variant?: "header" | "footer";
  className?: string;
};

export function BrandLogo({ variant = "header", className = "" }: Props) {
  const { site } = useContent();

  if (variant === "footer") {
    return (
      <a href="#top" className={`inline-block shrink-0 ${className}`}>
        <img
          src={site.logoUrl}
          alt={site.name}
          className="h-14 w-auto max-w-[min(100vw-3rem,380px)] object-contain object-left brightness-0 invert md:h-16 lg:h-[4.25rem]"
        />
      </a>
    );
  }

  return (
    <a href="#top" className={`inline-block shrink-0 transition-opacity hover:opacity-90 ${className}`}>
      <img
        src={site.logoUrl}
        alt={site.name}
        className="h-14 w-auto max-w-[min(100vw-5rem,460px)] object-contain object-left md:h-[3.75rem] lg:h-[4.5rem] xl:h-20"
      />
    </a>
  );
}
