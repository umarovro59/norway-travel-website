import Image from "next/image";
import { ArrowIcon } from "@/components/icons/icons";
import { Reveal } from "@/components/Reveal/Reveal";
import type { SiteImage } from "@/content/images";
import styles from "./TourList.module.css";

export type Tour = {
  id: string;
  title: string;
  duration: string;
  price: string;
  image: SiteImage;
  alt: string;
};

type TourListProps = {
  items: Tour[];
};

export function TourList({ items }: TourListProps) {
  return (
    <ol className={styles.list}>
      {items.map((tour, i) => (
        <Reveal as="li" key={tour.id} className={styles.item} delay={120 + i * 110}>
          <a className={styles.link} href="#contacts">
            <span className={styles.thumb}>
              <Image
                src={tour.image.src}
                alt={tour.alt}
                fill
                sizes="140px"
                className={styles.image}
                style={{ objectPosition: tour.image.focus }}
              />
            </span>
            <span className={styles.body}>
              <span className={styles.index} aria-hidden="true">
                {String(i + 2).padStart(2, "0")}
              </span>
              <span className={styles.title}>{tour.title}</span>
              <span className={styles.meta}>
                <span>{tour.duration}</span>
                <span className={styles.dot} aria-hidden="true" />
                <span>{tour.price}</span>
              </span>
            </span>
            <span className={styles.arrow} aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </Reveal>
      ))}
    </ol>
  );
}
