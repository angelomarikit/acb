import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  className?: string;
};

const variants = {
  primary: "bg-navy text-white hover:bg-navy-dark border border-navy shadow-sm",
  outline: "bg-white text-navy border border-navy/25 hover:border-gold hover:text-navy-dark shadow-sm",
  ghost: "bg-white/10 text-white border border-white/20 hover:bg-white/15",
};

const sizes = {
  md: "px-7 py-3 text-sm font-semibold",
  lg: "px-9 py-4 text-base font-semibold md:px-11 md:py-[1.125rem] md:text-lg",
};

export function Button({ href, children, variant = "primary", size = "md", className = "" }: Props) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[48px] items-center justify-center rounded-full transition-colors ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
