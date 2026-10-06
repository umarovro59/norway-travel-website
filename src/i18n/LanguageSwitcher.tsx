"use client";

import { LANGS, useLanguage } from "./LanguageProvider";
import styles from "./LanguageSwitcher.module.css";

type LanguageSwitcherProps = {
  className?: string;
};

/** EN / RU toggle — switches the whole interface in place. */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={`${styles.switcher} ${className ?? ""}`} role="group" aria-label={t.a11y.language}>
      {LANGS.map((code, i) => (
        <span key={code} className={styles.item}>
          {i > 0 && (
            <span className={styles.divider} aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            lang={code}
            className={styles.button}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
