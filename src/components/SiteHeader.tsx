import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useLang } from "@/i18n/LangContext";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground font-black text-sm"
        style={{
          background: "linear-gradient(135deg, #facc15 0%, #fde047 100%)",
          boxShadow: "0 4px 12px rgba(250, 204, 21, 0.35)",
        }}
      >
        A
      </span>
      <span className="font-extrabold text-lg text-foreground">AltDel</span>
    </Link>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center bg-secondary/70 rounded-full p-1 gap-0.5">
      <button
        onClick={() => setLang("ru")}
        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
          lang === "ru"
            ? "bg-foreground text-background shadow-md"
            : "text-foreground/60 hover:text-foreground"
        }`}
      >
        RU
      </button>
      <button
        onClick={() => setLang("zh")}
        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all ${
          lang === "zh"
            ? "bg-foreground text-background shadow-md"
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
  const location = useLocation();
  const { t } = useLang();

  const NAV_LINKS = [
    { label: t.nav.services, to: "/#services" },
    { label: t.nav.pricing, to: "/#pricing" },
    { label: t.nav.portfolio, to: "/portfolio" },
    { label: t.nav.faq, to: "/#faq" },
  ];

  const renderLink = (link: { label: string; to: string }) => {
    if (link.to.startsWith("/#")) {
      const hash = link.to.slice(1);
      if (location.pathname === "/") {
        return (
          <a
            key={link.to}
            href={hash}
            onClick={() => setOpen(false)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            {link.label}
          </a>
        );
      }
      return (
        <Link
          key={link.to}
          to={link.to}
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          {link.label}
        </Link>
      );
    }
    return (
      <Link
        key={link.to}
        to={link.to}
        onClick={() => setOpen(false)}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-full shadow-sm px-3 md:px-4 py-2.5 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8 px-4">
          {NAV_LINKS.map(renderLink)}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher />
          <Link
            to="/#contacts"
            className="inline-flex items-center px-6 py-2.5 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
          >
            {t.nav.order}
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <Icon name={open ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 bg-white rounded-3xl shadow-sm px-6 py-4 flex flex-col gap-3 max-w-7xl mx-auto">
          {NAV_LINKS.map(renderLink)}
          <div className="pt-2 border-t border-secondary">
            <LangSwitcher />
          </div>
          <Link
            to="/#contacts"
            onClick={() => setOpen(false)}
            className="text-center px-5 py-3 bg-foreground text-background text-sm font-bold rounded-full"
          >
            {t.nav.order}
          </Link>
        </div>
      )}
    </header>
  );
}
