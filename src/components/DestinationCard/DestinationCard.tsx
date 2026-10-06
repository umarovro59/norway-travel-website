import Image from "next/image";
import { ArrowIcon } from "@/components/icons/icons";
import type { SiteImage } from "@/content/images";
import styles from "./DestinationCard.module.css";

export type Destination = {
  id: string;
  name: string;
  region: string;
  description: string;
  image: SiteImage;
};

type DestinationCardProps = {
  destination: Destination;
  alt: string;
  index: number;
};

export function DestinationCard({ destination, alt, index }: DestinationCardProps) {
  const { image } = destination;
  return (
    <article className={styles.card}>
      <a className={styles.link} href="#tours" aria-label={`${destination.name} — ${destination.description}`}>
        <div className={styles.media}>
          <Image
            src={image.src}
            alt={alt}
            fill
            sizes="(max-width: 699px) 78vw, (max-width: 1099px) 44vw, 22vw"
            className={styles.image}
            style={{ objectPosition: image.focus }}
          />
        </div>
        <span className={styles.shade} aria-hidden="true" />

        <div className={styles.top} aria-hidden="true">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{destination.region}</span>
        </div>

        <div className={styles.bottom}>
          <h3 className={styles.name}>{destination.name}</h3>
          <p className={styles.description}>{destination.description}</p>
          <span className={styles.arrow} aria-hidden="true">
            <ArrowIcon />
          </span>
        </div>
      </a>
    </article>
  );
}
