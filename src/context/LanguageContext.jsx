import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import it from '../locales/it.json';
import en from '../locales/en.json';

const dictionaries = { it, en };
const STORAGE_KEY = 'adp-lang';

const LanguageContext = createContext(null);

function getInitialLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'it' || saved === 'en') return saved;
  } catch {
    // localStorage non disponibile (es. navigazione privata): si prosegue senza persistenza
  }
  // Default fisso: Inglese. L'utente passa a Italiano solo cliccando la bandiera IT.
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);
  // "visible" pilota la dissolvenza fluida dei testi durante il cambio lingua
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignora se lo storage non è scrivibile
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const switchLanguage = useCallback(
    (newLang) => {
      if (newLang === lang) return;
      setVisible(false);
      window.setTimeout(() => {
        setLang(newLang);
        setVisible(true);
      }, 200);
    },
    [lang],
  );

  const value = {
    lang,
    switchLanguage,
    visible,
    t: dictionaries[lang],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage deve essere usato dentro <LanguageProvider>');
  return ctx;
}
