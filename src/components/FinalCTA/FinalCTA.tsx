"use client";

import Image from "next/image";
import { ArrowIcon } from "@/components/icons/icons";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { images } from "@/content/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
  const { t } = useLanguage();
  const finalCta = t.finalCta;
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className={styles.bg} aria-hidden="true">
        <Image
          src={images.cta.src}
          alt=""
          fill
          sizes="100vw"
          className={styles.bgImage}
          style={{ objectPosition: images.cta.focus }}
        />
      </div>

      <div className={`frame ${styles.inner}`}>
        <Reveal className={styles.copy}>
          <SectionLabel tone="light">{finalCta.label}</SectionLabel>
          <h2 id="cta-title" className={styles.title}>
            {finalCta.title[0]}
            <br />
            <em>{finalCta.title[1]}</em>
          </h2>
          <p className={styles.lines}>
            {finalCta.lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <a className={styles.cta} href={finalCta.cta.href}>
            <span>{finalCta.cta.label}</span>
            <ArrowIcon className={styles.ctaIcon} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
