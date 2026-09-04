'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { translations, type Locale, type Translation, isRtl } from './translations';

interface LanguageContextValue {
  locale: Locale;
  t: Translation;
  isRtl: boolean;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'en',
  t: translations.en,
  isRtl: false,
  setLocale: () => {},
  dir: 'ltr',
});

const STORAGE_KEY = 'waste-city-os-locale';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored && ['en', 'fr', 'ar'].includes(stored)) {
      setLocaleState(stored as Locale);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale);
    }
  }, []);

  const rtl = isRtl(locale);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    }
  }, [locale, rtl]);

  return (
    <LanguageContext.Provider value={{
      locale,
      t: translations[locale],
      isRtl: rtl,
      setLocale,
      dir: rtl ? 'rtl' : 'ltr',
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
