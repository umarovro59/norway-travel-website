"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "@/components/Logo/Logo";
import { CloseIcon, MenuIcon } from "@/components/icons/icons";
import { useLanguage } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/i18n/LanguageSwitcher";
import styles from "./Header.module.css";

type HeaderProps = {
  className?: string;
};

/**
 * Lives inside the hero card: logo on the frosted half, links + EN/RU on the
 * photo. Below 1100px the links collapse into a native <dialog> menu.
 */
export function Header({ className }: HeaderProps) {
  const { t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    setOpen(true);
  };
  const closeMenu = () => dialogRef.current?.close();

  const links = [...t.nav, t.signIn];

  return (
    <header className={`${styles.header} ${className ?? ""}`}>
      <Logo className={styles.logo} />

      <nav className={styles.nav} aria-label={t.a11y.mainNav}>
        <ul className={styles.list}>
          {links.map((item) => (
            <li key={item.href}>
              <a className={styles.link} href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
          <li className={styles.langItem}>
            <LanguageSwitcher />
          </li>
        </ul>
      </nav>

      <div className={styles.compact}>
        <LanguageSwitcher className={styles.compactLang} />
        <button
          type="button"
          className={styles.menuButton}
          onClick={openMenu}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <span>{t.a11y.menu}</span>
          <MenuIcon className={styles.menuIcon} />
        </button>
      </div>

      <dialog ref={dialogRef} id="site-menu" className={styles.dialog} aria-label={t.a11y.menu}>
        <div className={styles.dialogInner}>
          <div className={styles.dialogTop}>
            <Logo className={styles.dialogLogo} />
            <button type="button" className={styles.close} onClick={closeMenu}>
              <span>{t.a11y.close}</span>
              <CloseIcon className={styles.menuIcon} />
            </button>
          </div>
          <nav aria-label={t.a11y.mobileNav}>
            <ul className={styles.dialogList}>
              {links.map((item, i) => (
                <li key={item.href} style={{ "--i": i } as CSSProperties}>
                  <a className={styles.dialogLink} href={item.href} onClick={closeMenu}>
                    <span className={styles.dialogIndex}>{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.dialogFoot}>
            <p className={styles.dialogNote}>{t.menuNote}</p>
            <LanguageSwitcher className={styles.dialogLang} />
          </div>
        </div>
      </dialog>
    </header>
  );
}
