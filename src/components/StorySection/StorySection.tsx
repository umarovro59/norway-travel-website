"use client";

import Image from "next/image";
import { ArrowIcon } from "@/components/icons/icons";
import { Reveal } from "@/components/Reveal/Reveal";
import { SectionLabel } from "@/components/SectionLabel/SectionLabel";
import { Stats } from "@/components/Stats/Stats";
import { images } from "@/content/images";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./StorySection.module.css";

export function StorySection() {
  const { t } = useLanguage();
  const story = t.story;
  return (
    <section className={styles.section} id="story" aria-labelledby="story-title">
      <div className={`frame ${styles.grid}`}>
        <Reveal className={styles.copy}>
          <SectionLabel>{story.label}</SectionLabel>
          <h2 id="story-title" className={styles.title}>
            {story.title[0]}
            <br />
            <em>{story.title[1]}</em>
          </h2>
          <div className={styles.body}>
            {story.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <a className={styles.cta} href={story.cta.href}>
            <span>{story.cta.label}</span>
            <span className={styles.ctaIcon} aria-hidden="true">
              <ArrowIcon />
            </span>
          </a>
        </Reveal>

        <Reveal className={styles.media} delay={120}>
          <figure className={styles.photo}>
            <Image
              src={images.story.src}
              alt={t.alt[images.story.id]}
              fill
              sizes="(max-width: 899px) 92vw, 40vw"
              className={styles.image}
              style={{ objectPosition: images.story.focus }}
            />
          </figure>
          <p className={styles.caption} aria-hidden="true">
            <span>{story.caption[0]}</span>
            <span>{story.caption[1]}</span>
          </p>
        </Reveal>

        <Reveal className={styles.note} delay={260}>
          <blockquote className={styles.quote}>
            <p>
              {story.quote[0]}
              <br />
              {story.quote[1]}
            </p>
          </blockquote>
          <svg className={styles.swash} viewBox="0 0 160 14" aria-hidden="true" focusable="false">
            <path d="M2 9c26-6 52-7 78-4s50 3 78-3" />
          </svg>
        </Reveal>

        <Stats items={story.stats} className={styles.stats} />
      </div>
    </section>
  );
}
