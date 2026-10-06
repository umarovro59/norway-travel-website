/**
 * Image manifest — every photograph on the site.
 *
 * All files are real photographs of Norway from Wikimedia Commons, downloaded
 * and resized by scripts/fetch-photos.mjs. Authors and licenses are listed in
 * IMAGE_SOURCES.md and src/content/photo-credits.json (shown in the footer).
 * Alt text lives in the dictionaries (src/i18n) under `alt[<id>]`.
 */

export type ImageId =
  | "heroFjords"
  | "heroLofoten"
  | "heroSenja"
  | "story"
  | "testimonial"
  | "cta"
  | "destLofoten"
  | "destTrolltunga"
  | "destGeiranger"
  | "destTromso"
  | "tourFjords"
  | "tourNorthernLights"
  | "tourLofoten"
  | "tourArctic";

export type SiteImage = {
  id: ImageId;
  src: string;
  width: number;
  height: number;
  /** CSS object-position for cropped frames */
  focus?: string;
  /** object-position override for portrait (mobile) frames */
  focusMobile?: string;
};

const img = (id: ImageId, src: string, width: number, height: number, focus?: string, focusMobile?: string): SiteImage => ({
  id,
  src: `/images/norway/${src}`,
  width,
  height,
  focus,
  focusMobile,
});

export const images = {
  hero: {
    fjords: img("heroFjords", "hero/norway-fjords.jpg", 2560, 1920, "50% 55%", "52% 50%"),
    lofoten: img("heroLofoten", "hero/lofoten-hero.jpg", 2048, 1367, "58% 42%", "64% 50%"),
    senja: img("heroSenja", "hero/senja-segla.jpg", 2560, 1707, "60% 40%", "50% 50%"),
  },
  story: img("story", "story-lovatnet.jpg", 2400, 1800, "54% 50%"),
  testimonial: img("testimonial", "testimonial-kvaloya.jpg", 2400, 1394, "50% 40%"),
  cta: img("cta", "cta-reine.jpg", 2400, 1601, "50% 40%"),
  destinations: {
    lofoten: img("destLofoten", "destinations/lofoten.jpg", 1600, 1204, "46% 50%"),
    trolltunga: img("destTrolltunga", "destinations/trolltunga.jpg", 1600, 1067, "30% 50%"),
    geirangerfjord: img("destGeiranger", "destinations/geirangerfjord.jpg", 1600, 1067, "55% 50%"),
    tromso: img("destTromso", "destinations/tromso-northern-lights.jpg", 1600, 1060, "62% 50%"),
  },
  tours: {
    fjordsPeaks: img("tourFjords", "tours/norway-fjords.jpg", 2000, 1500, "50% 50%"),
    northernLights: img("tourNorthernLights", "tours/northern-lights.jpg", 900, 602, "45% 50%"),
    lofotenPhoto: img("tourLofoten", "tours/lofoten-photo.jpg", 900, 600, "55% 50%"),
    arcticWinter: img("tourArctic", "tours/arctic-winter.jpg", 900, 600, "55% 50%"),
  },
};
