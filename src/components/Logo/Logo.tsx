"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./Logo.module.css";

type LogoProps = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = "#top" }: LogoProps) {
  const { t } = useLanguage();
  return (
    <a href={href} className={`${styles.logo} ${className ?? ""}`} aria-label={t.a11y.home} lang="en">
      {t.brand.lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </a>
  );
}
