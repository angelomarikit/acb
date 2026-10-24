export type WorkGallerySlide = {
  src: string;
  alt: string;
  caption?: string;
};

/** Add more images under /public and append here for additional slides. */
export const workGallerySlides: WorkGallerySlide[] = [
  {
    src: "/work-gallery.jpg",
    alt: "Organized document packets and transaction folders for processing",
    caption: "Prepared document packets and labeled transaction folders",
  },
  {
    src: "/hero-building-permit.jpg",
    alt: "Building permit and construction-related document assistance",
    caption: "Building permit and construction documentation",
  },
];
