import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

export const NAV_LINKS = [
  { label: "Услуги", to: "/#services" },
  { label: "Тарифы", to: "/#pricing" },
  { label: "Портфолио", to: "/portfolio" },
  { label: "FAQ", to: "/#faq" },
];

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

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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

        <Link
          to="/#contacts"
          className="hidden md:inline-flex items-center px-6 py-2.5 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
        >
          Заказать
        </Link>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <Icon name={open ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 bg-white rounded-3xl shadow-sm px-6 py-4 flex flex-col gap-3 max-w-7xl mx-auto">
          {NAV_LINKS.map(renderLink)}
          <Link
            to="/#contacts"
            onClick={() => setOpen(false)}
            className="text-center px-5 py-3 bg-foreground text-background text-sm font-bold rounded-full"
          >
            Заказать
          </Link>
        </div>
      )}
    </header>
  );
}