"use client";

import Image from "next/image";
import { FeaturedTour } from "@/components/FeaturedTour/FeaturedTour";
import { ArrowIcon } from "@/components/icons/icons";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { TourList } from "@/components/TourList/TourList";
import { images } from "@/content/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./FeaturedTours.module.css";

export function FeaturedTours() {
  const { t } = useLanguage();
  const tours = t.tours;
  const list = [
    { id: "northernLights", image: images.tours.northernLights, ...tours.items.northernLights },
    { id: "lofotenPhoto", image: images.tours.lofotenPhoto, ...tours.items.lofotenPhoto },
    { id: "arcticWinter", image: images.tours.arcticWinter, ...tours.items.arcticWinter },
  ].map((tour) => ({ ...tour, alt: t.alt[tour.image.id] }));
  return (
    <section className={styles.section} id="tours" aria-labelledby="tours-title">
      <div className={`frame ${styles.panel}`}>
        <div className={styles.texture} aria-hidden="true">
          <Image src={images.tours.fjordsPeaks.src} alt="" fill sizes="40vw" className={styles.textureImage} />
        </div>

        <div className={styles.head}>
          <Reveal>
            <SectionLabel tone="light">{tours.label}</SectionLabel>
            <h2 id="tours-title" className={styles.title}>
              {tours.title[0]}
              <br />
              <em>{tours.title[1]}</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a className={styles.link} href={tours.link.href}>
              {tours.link.label}
              <ArrowIcon className={styles.linkIcon} />
            </a>
          </Reveal>
        </div>

        <div className={styles.body}>
          <Reveal className={styles.featured}>
            <FeaturedTour
              tour={{ id: "fjords-peaks", image: images.tours.fjordsPeaks, ...tours.featured }}
              alt={t.alt[images.tours.fjordsPeaks.id]}
              badge={tours.badge}
              viewLabel={tours.viewTour}
            />
          </Reveal>
          <div className={styles.list}>
            <TourList items={list} />
          </div>
        </div>
      </div>
    </section>
  );
}
