import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lang, translations, Translations } from "./translations";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "ru";
    const saved = localStorage.getItem("altdel_lang") as Lang | null;
    if (saved === "ru" || saved === "zh") return saved;
    return "ru";
  });

  useEffect(() => {
    localStorage.setItem("altdel_lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "ru";
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
