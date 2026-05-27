import { Link } from "react-router-dom";
import { Logo } from "./SiteHeader";
import Icon from "@/components/ui/icon";

export default function SiteFooter() {
  return (
    <footer className="px-4 pb-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {[
          { label: "Пользовательское соглашение", to: "#" },
          { label: "Политика конфиденциальности", to: "#" },
          { label: "Портфолио", to: "/portfolio" },
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
          © 2026 SiteCraft. Все права защищены.
        </p>
      </div>
    </footer>
  );
}
