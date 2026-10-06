"use client";

import { Logo } from "@/components/Logo/Logo";
import { SocialIcon } from "@/components/icons/icons";
import credits from "@/content/photo-credits.json";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import styles from "./Footer.module.css";

/* placeholder profiles — replace "#" with real URLs */
const socials = [
  { id: "instagram", href: "#" },
  { id: "youtube", href: "#" },
  { id: "facebook", href: "#" },
] as const;

export function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className={styles.footer} id="contacts">
      <div className="frame">
        <div className={styles.top}>
          <Logo className={styles.logo} />

          <nav aria-label={t.a11y.footerNav}>
            <ul className={styles.nav}>
              {t.nav.map((item) => (
                <li key={item.href}>
                  <a className={styles.link} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className={styles.socials}>
            {socials.map((s) => (
              <li key={s.id}>
                <a className={styles.social} href={s.href} aria-label={t.footer.socials[s.id]}>
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <p className={styles.closing}>
            {t.footer.closing[0]}
            <br />
            {t.footer.closing[1]}
          </p>
          <div className={styles.meta}>
            <LanguageSwitcher className={styles.lang} />
            <p className={styles.legal}>{t.footer.legal(new Date().getFullYear())}</p>
          </div>
        </div>

        {/* attribution required by the CC BY / CC BY-SA licenses (see IMAGE_SOURCES.md) */}
        <details className={styles.credits}>
          <summary>{t.footer.credits}</summary>
          <p className={styles.creditsNote}>{t.footer.creditsNote}</p>
          <ul className={styles.creditsList}>
            {credits.map((c) => (
              <li key={c.file}>
                <span>{lang === "ru" ? c.placeRu : c.place}</span>
                <span>
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {c.author}
                  </a>
                  {" · "}
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer license">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                </span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </footer>
  );
}
