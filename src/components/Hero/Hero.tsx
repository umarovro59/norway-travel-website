"use client";

import Image, { getImageProps } from "next/image";
import { useCallback, useState, type CSSProperties } from "react";
import { Header } from "@/components/Header/Header";
import { ArrowIcon } from "@/components/icons/icons";
import { images, type SiteImage } from "@/content/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./Hero.module.css";

type SlideId = "fjords" | "lofoten" | "senja";

const slides: { id: SlideId; image: SiteImage }[] = [
  { id: "fjords", image: images.hero.fjords },
  { id: "lofoten", image: images.hero.lofoten },
  { id: "senja", image: images.hero.senja },
];

/** Brand display title — part of the visual identity, never translated. */
const BRAND_TITLE = { top: "Norway", bottom: "Mountains" } as const;

/** the reference shows the middle indicator active — Lofoten */
const INITIAL_SLIDE = 1;

const imageVars = (image: SiteImage) =>
  ({ "--focus": image.focus, "--focus-m": image.focusMobile ?? image.focus }) as CSSProperties;

/* Optimised URL of each slide, used as the photographic fill inside the
   letters on the frosted half (background-clip: text). */
const fillSources = slides.map(
  (slide) =>
    getImageProps({ src: slide.image.src, alt: "", width: 1200, height: 800 }).props.src,
);

function Title({ as: Tag = "div", className, ariaHidden }: { as?: "h1" | "div"; className: string; ariaHidden?: boolean }) {
  return (
    <Tag className={className} aria-hidden={ariaHidden || undefined} lang="en">
      <span className={styles.wordTop}>{BRAND_TITLE.top}</span>
      <span className="sr-only"> </span>
      <span className={styles.wordBottom}>{BRAND_TITLE.bottom}</span>
    </Tag>
  );
}

/**
 * Split hero card: frosted left half, sharp photograph on the right and a
 * title that crosses the seam. The title is rendered as layers that share the
 * card grid — one clipped to the frosted half and filled with the photo, one
 * clipped to the photo half in solid white.
 */
export function Hero() {
  const { t } = useLanguage();
  const [active, setActive] = useState(INITIAL_SLIDE);
  const count = slides.length;

  const go = useCallback((delta: number) => setActive((i) => (i + delta + count) % count), [count]);

  return (
    <section className={styles.hero} id="top" aria-roledescription="carousel" aria-label={t.a11y.carousel}>
      <div className={styles.card}>
        {/* sharp photography */}
        <div className={styles.media}>
          {slides.map((slide, i) => (
            <figure
              key={slide.id}
              className={`${styles.slide} ${i === active ? styles.isActive : ""}`}
              aria-hidden={i !== active}
            >
              <Image
                src={slide.image.src}
                alt={t.alt[slide.image.id]}
                fill
                sizes="100vw"
                loading={i === INITIAL_SLIDE ? "eager" : "lazy"}
                fetchPriority={i === INITIAL_SLIDE ? "high" : "auto"}
                className={styles.photo}
                style={imageVars(slide.image)}
              />
            </figure>
          ))}
        </div>

        {/* frosted half — the same photograph, heavily blurred */}
        <div className={styles.frost} aria-hidden="true">
          {slides.map((slide, i) => (
            <div key={slide.id} className={`${styles.frostSlide} ${i === active ? styles.isActive : ""}`}>
              <Image
                src={slide.image.src}
                alt=""
                fill
                sizes="40vw"
                quality={75}
                className={styles.frostImage}
                style={imageVars(slide.image)}
              />
            </div>
          ))}
          <div className={styles.frostTint} />
        </div>

        {/* title: photo-filled letters on the frosted side … */}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`${styles.layer} ${styles.fillLayer} ${i === active ? styles.isActive : ""}`}
            style={{ ...imageVars(slide.image), "--fill": `url(${fillSources[i]})` } as CSSProperties}
            aria-hidden="true"
          >
            <Title className={styles.title} ariaHidden />
          </div>
        ))}
        {/* … and solid white letters on the photo side (the real heading) */}
        <div className={`${styles.layer} ${styles.solidLayer}`}>
          <Title as="h1" className={styles.title} />
        </div>

        {/* interface */}
        <div className={`${styles.layer} ${styles.ui}`}>
          <Header className={styles.header} />

          <p className={styles.kicker}>{t.hero.kicker}</p>

          <p className={styles.description}>{t.hero.description}</p>
          <a className={styles.cta} href={t.hero.cta.href}>
            {t.hero.cta.label}
          </a>

          <div className={styles.pager} role="group" aria-label={t.a11y.chooseSlide}>
            <span className={styles.pagerLine} aria-hidden="true" />
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className={styles.dot}
                aria-label={t.a11y.show(t.hero.captions[slide.id])}
                aria-current={i === active ? "true" : undefined}
                onClick={() => setActive(i)}
              />
            ))}
            <span className={styles.pagerLine} aria-hidden="true" />
          </div>

          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label={t.a11y.prev}>
              <ArrowIcon direction="left" />
            </button>
            <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label={t.a11y.next}>
              <ArrowIcon />
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            {t.a11y.live(active + 1, count, t.hero.captions[slides[active].id])}
          </p>
        </div>
      </div>
    </section>
  );
}
