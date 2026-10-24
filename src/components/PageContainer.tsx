import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
  full?: boolean;
};

/** Full-width section with comfortable edge padding; optional inner cap for very wide screens. */
export function PageContainer({ children, className = "", as: Tag = "div", full = false }: Props) {
  return (
    <Tag
      className={`w-full ${full ? "" : "mx-auto max-w-[min(100%,1680px)]"} px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 ${className}`}
    >
      {children}
    </Tag>
  );
}
