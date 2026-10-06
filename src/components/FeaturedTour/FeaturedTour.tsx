import Image from "next/image";
import { ArrowIcon } from "@/components/icons/icons";
import type { SiteImage } from "@/content/images";
import styles from "./FeaturedTour.module.css";

type FeaturedTourProps = {
  tour: {
    id: string;
    title: string;
    description: string;
    meta: string[];
    price: string;
    image: SiteImage;
  };
  alt: string;
  badge: string;
  viewLabel: string;
};

export function FeaturedTour({ tour, alt, badge, viewLabel }: FeaturedTourProps) {
  return (
    <article className={styles.card} aria-labelledby={`tour-${tour.id}`}>
      <div className={styles.media}>
        <Image
          src={tour.image.src}
          alt={alt}
          fill
          sizes="(max-width: 899px) 92vw, 52vw"
          className={styles.image}
          style={{ objectPosition: tour.image.focus }}
        />
      </div>
      <span className={styles.badge}>{badge}</span>

      <div className={styles.panel}>
        <h3 id={`tour-${tour.id}`} className={styles.title}>
          {tour.title}
        </h3>
        <ul className={styles.meta}>
          {tour.meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className={styles.description}>{tour.description}</p>
        <div className={styles.footer}>
          <p className={styles.price}>{tour.price}</p>
          <a className={styles.cta} href="#contacts">
            {viewLabel}
            <span className={styles.ctaIcon} aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
