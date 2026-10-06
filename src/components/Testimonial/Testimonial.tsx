"use client";

import Image from "next/image";
import { QuoteMark } from "@/components/icons/icons";
import { Reveal } from "@/components/Reveal/Reveal";
import { images } from "@/content/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./Testimonial.module.css";

export function Testimonial() {
  const { t } = useLanguage();
  const testimonial = t.testimonial;
  return (
    <section className={styles.section} aria-label={t.a11y.testimonials}>
      <div className={`frame ${styles.panel}`}>
        <div className={styles.bg} aria-hidden="true">
          <Image
            src={images.testimonial.src}
            alt=""
            fill
            sizes="86vw"
            className={styles.bgImage}
            style={{ objectPosition: images.testimonial.focus }}
          />
        </div>

        <Reveal className={styles.inner}>
          <QuoteMark className={styles.mark} />
          <figure className={styles.figure}>
            <blockquote className={styles.quote}>
              <p>
                {testimonial.quote[0]} <br className={styles.br} />
                {testimonial.quote[1]}
              </p>
            </blockquote>
            <figcaption className={styles.author}>
              {/* placeholder avatar — replace with a portrait when available */}
              <span className={styles.avatar} aria-hidden="true">
                {testimonial.initials}
              </span>
              <span className={styles.who}>
                <span className={styles.name}>{testimonial.name}</span>
                <span className={styles.trip}>{testimonial.trip}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
