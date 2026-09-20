"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { translations, Locale, TranslationKey } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  setLocale: (locale: Locale) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    // Sync with cookie and localStorage if they differ
    try {
      const match = document.cookie.match(new RegExp("(^| )ezylang=([^;]+)"));
      const cookieLang = match ? (match[2] as Locale) : null;
      const localLang = localStorage.getItem("ezylang") as Locale | null;
      const preferredLang = cookieLang || localLang || initialLocale;

      if (preferredLang === "ar" || preferredLang === "en") {
        if (preferredLang !== locale) {
          setLocaleState(preferredLang);
        }
        document.documentElement.lang = preferredLang;
        document.documentElement.dir = preferredLang === "ar" ? "rtl" : "ltr";
        localStorage.setItem("ezylang", preferredLang);
        document.cookie = `ezylang=${preferredLang}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch {}
  }, [initialLocale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("ezylang", newLocale);
      document.cookie = `ezylang=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale;
      document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
    } catch {}
  };

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  const dir = locale === "ar" ? "rtl" : "ltr";
  const isRTL = locale === "ar";

  const t = useMemo(() => {
    return (key: TranslationKey, fallback?: string): string => {
      const dict = translations[locale] || translations.en;
      return (
        (dict as any)[key] || fallback || (translations.en as any)[key] || key
      );
    };
  }, [locale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dir,
        isRTL,
        setLocale,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
