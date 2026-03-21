"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { PortfolioTranslations } from "@/locales/types";
import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

type Locale = "en" | "vi";

interface LocaleContextType {
  locale: Locale;
  translations: PortfolioTranslations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const STORAGE_KEY = "locale";

const translationsMap: Record<Locale, PortfolioTranslations> = {
  en: en as PortfolioTranslations,
  vi: vi as PortfolioTranslations,
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "en" || stored === "vi") {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "vi" ? "vi" : "en";
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "vi" ? "en" : "vi")),
    [],
  );

  const translations = translationsMap[locale];

  return (
    <LocaleContext.Provider
      value={{ locale, translations, setLocale, toggleLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
