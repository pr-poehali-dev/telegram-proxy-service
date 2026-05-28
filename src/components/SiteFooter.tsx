import { Link } from "react-router-dom";
import { Logo } from "./SiteHeader";
import Icon from "@/components/ui/icon";
import { useLang } from "@/i18n/LangContext";

export default function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="px-4 pb-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl p-6 md:p-8 mb-6">
        <p className="text-[11px] font-bold text-foreground/50 uppercase tracking-widest mb-4">
          Инфраструктура
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Домен", icon: "Globe", to: "/infra/domen", gradient: "from-[#fbbf24] to-[#fb923c]" },
            { label: "Хостинг", icon: "Server", to: "/infra/hosting", gradient: "from-[#f472b6] to-[#e879f9]" },
            { label: "SSL", icon: "ShieldCheck", to: "/infra/ssl", gradient: "from-[#a78bfa] to-[#818cf8]" },
            { label: "Почта на домене", icon: "Mail", to: "/infra/mail", gradient: "from-[#34d399] to-[#22d3ee]" },
          ].map((m) => (
            <Link
              key={m.label}
              to={m.to}
              className="group flex items-center gap-3 px-4 py-3 bg-secondary/40 hover:bg-secondary rounded-2xl transition-colors"
            >
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.gradient} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
              >
                <Icon name={m.icon} fallback="Circle" size={16} />
              </div>
              <span className="text-sm font-bold text-foreground leading-tight">{m.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {[
          { label: t.footer.terms, to: "#" },
          { label: t.footer.privacy, to: "#" },
          { label: t.footer.portfolio, to: "/portfolio" },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center justify-between px-6 py-4 bg-white hover:bg-secondary rounded-full text-sm font-medium text-foreground transition-colors"
          >
            <span>{item.label}</span>
            <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
          </Link>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <Logo />
        <p className="text-xs text-muted-foreground">
          © 2026 AltDel. {t.footer.rights}.
        </p>
      </div>
    </footer>
  );
}