"use client";

import { DestinationCard } from "@/components/DestinationCard/DestinationCard";
import { ArrowIcon } from "@/components/icons/icons";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { images } from "@/content/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./DestinationsGrid.module.css";

const items = [
  { id: "lofoten", image: images.destinations.lofoten },
  { id: "trolltunga", image: images.destinations.trolltunga },
  { id: "geirangerfjord", image: images.destinations.geirangerfjord },
  { id: "tromso", image: images.destinations.tromso },
] as const;

export function DestinationsGrid() {
  const { t } = useLanguage();
  const destinations = t.destinations;
  return (
    <section className={styles.section} id="destinations" aria-labelledby="destinations-title">
      <div className="frame">
        <div className={styles.head}>
          <Reveal className={styles.heading}>
            <SectionLabel>{destinations.label}</SectionLabel>
            <h2 id="destinations-title" className={styles.title}>
              {destinations.title[0]}
              <br />
              <em>{destinations.title[1]}</em>
            </h2>
          </Reveal>
          <Reveal className={styles.aside} delay={120}>
            <p>{destinations.description}</p>
            <a className={styles.link} href={destinations.link.href}>
              {destinations.link.label}
              <ArrowIcon className={styles.linkIcon} />
            </a>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {items.map((item, i) => (
            <Reveal as="li" key={item.id} className={styles.item} delay={i * 100}>
              <DestinationCard
                destination={{ id: item.id, image: item.image, ...destinations.items[item.id] }}
                alt={t.alt[item.image.id]}
                index={i}
              />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
