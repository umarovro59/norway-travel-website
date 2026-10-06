"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Dictionary } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";

export type Lang = "en" | "ru";

export const LANGS: Lang[] = ["en", "ru"];
export const STORAGE_KEY = "atw-lang";

const dictionaries: Record<Lang, Dictionary> = { en, ru };

type LanguageContextValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "en" || value === "ru" ? value : null;
  } catch {
    return null;
  }
}

/**
 * One provider for the whole page. The static HTML is rendered in English;
 * a stored choice is applied right after hydration (the inline script in the
 * layout hides the page for that instant so there is no flash of English).
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = readStoredLang();
    // apply the persisted choice once, after hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored && stored !== "en") setLangState(stored);
    else document.documentElement.removeAttribute("data-lang-pending");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const applyMeta = () => {
      document.title = dictionaries[lang].meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", dictionaries[lang].meta.description);
    };
    root.lang = lang;
    applyMeta();
    // Next writes the static <title> during hydration — re-apply once it has settled
    const id = window.setTimeout(applyMeta, 100);
    root.removeAttribute("data-lang-pending");
    return () => window.clearTimeout(id);
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode — the choice simply isn't remembered */
    }
  }, []);

  const value = useMemo(() => ({ lang, t: dictionaries[lang], setLang }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

/** Runs before first paint: marks the page as pending if a non-default language is stored. */
export const languageBootScript = `try{var l=localStorage.getItem("${STORAGE_KEY}");if(l==="ru"){document.documentElement.lang=l;document.documentElement.setAttribute("data-lang-pending","")}}catch(e){}`;
