import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useLang } from "@/i18n/LangContext";

export function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <span
        className="relative w-10 h-10 rounded-2xl flex items-center justify-center text-yellow-900 font-black text-sm overflow-hidden group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500"
        style={{
          background: "linear-gradient(135deg, #facc15 0%, #fde047 100%)",
          boxShadow: "0 8px 24px rgba(250, 204, 21, 0.4)",
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
        <span className="relative">A</span>
      </span>
      <span className="font-extrabold text-lg text-foreground tracking-tight">
        AltDel
      </span>
    </Link>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center bg-secondary rounded-full p-1 gap-0.5">
      <button
        onClick={() => setLang("ru")}
        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
          lang === "ru"
            ? "bg-gradient-to-br from-[#2d3a9e] to-[#1a2452] text-white shadow-md"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLang("zh")}
        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
          lang === "zh"
            ? "bg-gradient-to-br from-[#f472b6] to-[#e879f9] text-white shadow-md"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        中文
      </button>
    </div>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_LINKS = [
    { label: t.nav.services, to: "/#services" },
    { label: t.nav.pricing, to: "/#pricing" },
    { label: t.nav.portfolio, to: "/portfolio" },
    { label: t.nav.faq, to: "/#faq" },
  ];

  const renderLink = (link: { label: string; to: string }) => {
    const cls =
      "relative text-sm text-foreground/65 hover:text-foreground transition-colors font-medium group";
    const underline = (
      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#fbbf24] to-[#f472b6] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    );

    if (link.to.startsWith("/#")) {
      const hash = link.to.slice(1);
      if (location.pathname === "/") {
        return (
          <a key={link.to} href={hash} onClick={() => setOpen(false)} className={cls}>
            {link.label}
            {underline}
          </a>
        );
      }
      return (
        <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={cls}>
          {link.label}
          {underline}
        </Link>
      );
    }
    return (
      <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={cls}>
        {link.label}
        {underline}
      </Link>
    );
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div
        className={`max-w-7xl mx-auto rounded-full px-3 md:px-4 py-2.5 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-2xl shadow-foreground/10"
            : "bg-white/70 backdrop-blur-lg shadow-md"
        }`}
      >
        <Logo />

        <nav className="hidden md:flex items-center gap-8 px-4">
          {NAV_LINKS.map(renderLink)}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher />
          <Link
            to="/#contacts"
            className="group relative inline-flex items-center gap-1.5 px-5 py-2.5 bg-foreground text-background text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-foreground/20"
          >
            <span>{t.nav.order}</span>
            <Icon
              name="ArrowRight"
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
            />
          </Link>
        </div>

        <button
          className="md:hidden w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/70 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <Icon name={open ? "X" : "Menu"} size={18} />
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 bg-white rounded-3xl shadow-2xl px-6 py-5 flex flex-col gap-4 max-w-7xl mx-auto animate-fade-up">
          {NAV_LINKS.map(renderLink)}
          <div className="pt-3 border-t border-secondary">
            <LangSwitcher />
          </div>
          <Link
            to="/#contacts"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-foreground text-background text-sm font-bold rounded-full"
          >
            {t.nav.order}
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      )}
    </header>
  );
}
