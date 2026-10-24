type Props = {
  src: string;
  alt: string;
  /** cover = photo backgrounds; contain = posters, cards, flat-lay docs */
  fit?: "cover" | "contain";
  aspect?: "video" | "square" | "portrait" | "wide" | "auto";
  className?: string;
  imgClassName?: string;
};

const aspectClass = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/10]",
  auto: "min-h-[240px]",
};

export function MediaFrame({
  src,
  alt,
  fit = "cover",
  aspect = "wide",
  className = "",
  imgClassName = "",
}: Props) {
  const object = fit === "contain" ? "object-contain object-center" : "object-cover object-center";

  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a0a] ${aspect === "auto" ? aspectClass.auto : aspectClass[aspect]} ${className}`}
    >
      <img src={src} alt={alt} className={`absolute inset-0 h-full w-full ${object} ${imgClassName}`} loading="lazy" decoding="async" />
    </div>
  );
}
