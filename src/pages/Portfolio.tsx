import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const CATEGORIES = [
  { id: "all", label: "Все" },
  { id: "landing", label: "Лендинги" },
  { id: "shop", label: "Магазины" },
  { id: "corp", label: "Корпоративные" },
  { id: "seo", label: "Продвижение" },
];

type Project = {
  title: string;
  client: string;
  category: string;
  tags: string[];
  result: string;
  metric: { value: string; label: string };
  gradient: string;
  accent: string;
  emoji: string;
  icon: string;
};

const PROJECTS: Project[] = [
  {
    title: "Сайт для стоматологии",
    client: "Клиника «Улыбка»",
    category: "corp",
    tags: ["Корпоративный", "SEO"],
    result: "ТОП-3 Яндекса по 12 запросам",
    metric: { value: "×4", label: "рост заявок" },
    gradient: "from-[#34d399] via-[#22d3ee] to-[#60a5fa]",
    accent: "#0891b2",
    icon: "Briefcase",
    emoji: "🦷",
  },
  {
    title: "Лендинг курса по фитнесу",
    client: "Тренер Мария Кузнецова",
    category: "landing",
    tags: ["Лендинг", "Дизайн"],
    result: "120 заявок в первую неделю",
    metric: { value: "8%", label: "конверсия" },
    gradient: "from-[#a78bfa] via-[#818cf8] to-[#60a5fa]",
    accent: "#7c3aed",
    icon: "Layout",
    emoji: "💪",
  },
  {
    title: "Интернет-магазин косметики",
    client: "GlowShop",
    category: "shop",
    tags: ["Магазин", "1С"],
    result: "Каталог 800+ товаров",
    metric: { value: "+220%", label: "оборот" },
    gradient: "from-[#f472b6] via-[#e879f9] to-[#a78bfa]",
    accent: "#db2777",
    icon: "ShoppingBag",
    emoji: "💄",
  },
  {
    title: "Продвижение автосервиса",
    client: "СТО «Гараж 47»",
    category: "seo",
    tags: ["SEO", "Яндекс.Директ"],
    result: "Сокращение цены заявки в 3 раза",
    metric: { value: "TOP-5", label: "Яндекс" },
    gradient: "from-[#fbbf24] via-[#fb923c] to-[#f87171]",
    accent: "#ea580c",
    icon: "TrendingUp",
    emoji: "🚗",
  },
  {
    title: "Сайт строительной компании",
    client: "СтройМастер",
    category: "corp",
    tags: ["Корпоративный", "Каталог"],
    result: "Запуск за 12 дней",
    metric: { value: "60", label: "проектов" },
    gradient: "from-[#34d399] via-[#22d3ee] to-[#60a5fa]",
    accent: "#0891b2",
    icon: "Briefcase",
    emoji: "🏗️",
  },
  {
    title: "Лендинг свадебного фотографа",
    client: "Анна Соколова",
    category: "landing",
    tags: ["Лендинг", "Портфолио"],
    result: "Запись на 4 месяца вперёд",
    metric: { value: "×6", label: "обращений" },
    gradient: "from-[#a78bfa] via-[#818cf8] to-[#60a5fa]",
    accent: "#7c3aed",
    icon: "Layout",
    emoji: "📸",
  },
  {
    title: "Магазин детских товаров",
    client: "MiniKid",
    category: "shop",
    tags: ["Магазин", "amoCRM"],
    result: "Средний чек +35%",
    metric: { value: "2 500", label: "товаров" },
    gradient: "from-[#f472b6] via-[#e879f9] to-[#a78bfa]",
    accent: "#db2777",
    icon: "ShoppingBag",
    emoji: "🧸",
  },
  {
    title: "SEO продвижение юр. компании",
    client: "Право и Партнёры",
    category: "seo",
    tags: ["SEO", "Контент"],
    result: "ТОП-10 по 47 запросам",
    metric: { value: "×5", label: "трафика" },
    gradient: "from-[#fbbf24] via-[#fb923c] to-[#f87171]",
    accent: "#ea580c",
    icon: "TrendingUp",
    emoji: "⚖️",
  },
];

const STATS = [
  { value: "150+", label: "Проектов", icon: "Folder", gradient: "from-[#a78bfa] to-[#818cf8]" },
  { value: "94%", label: "Клиентов остаются", icon: "Heart", gradient: "from-[#f472b6] to-[#e879f9]" },
  { value: "7 дней", label: "Средний срок", icon: "Zap", gradient: "from-[#34d399] to-[#22d3ee]" },
  { value: "5 лет", label: "На рынке", icon: "Award", gradient: "from-[#fbbf24] to-[#fb923c]" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden px-6 py-20 md:py-24 text-center bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2]">
          <div className="pointer-events-none absolute -top-10 -right-10 w-80 h-80 rounded-full bg-yellow-200/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white/50 blur-3xl" />

          <div className="relative max-w-3xl mx-auto">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-4">
              Портфолио
            </p>
            <h1 className="font-black tracking-tight text-foreground text-center text-[56px]">
              Сделали — <span className="text-accent">показываем</span>
            </h1>
            <p className="text-base md:text-lg text-foreground/65 max-w-lg mx-auto mt-6 leading-relaxed">
              150+ сайтов и проектов продвижения для бизнеса по всей России.
              Каждый — с реальным результатом и довольным клиентом.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="group relative bg-white rounded-3xl py-5 px-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div
                    className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.gradient} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-500`}
                  />
                  <div
                    className={`relative mx-auto w-10 h-10 rounded-2xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon name={s.icon} fallback="Circle" size={18} />
                  </div>
                  <p className="relative text-2xl md:text-3xl font-black text-foreground">{s.value}</p>
                  <p className="relative text-xs text-foreground/55 mt-1 font-bold uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-4 max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                filter === cat.id
                  ? "bg-foreground text-background"
                  : "bg-white text-foreground hover:bg-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="px-4 max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, idx) => (
            <article
              key={idx}
              className="group relative bg-white rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Цветное превью */}
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />

                <span className="relative text-8xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 drop-shadow-lg">
                  {p.emoji}
                </span>

                {/* Теги */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-bold text-foreground shadow-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Иконка услуги */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Icon name={p.icon} fallback="Circle" size={18} style={{ color: p.accent }} />
                </div>

                {/* Метрика */}
                <div className="absolute bottom-4 right-4 bg-white rounded-2xl px-4 py-2.5 text-right shadow-xl group-hover:scale-110 transition-transform">
                  <p className="text-xl font-black leading-tight" style={{ color: p.accent }}>
                    {p.metric.value}
                  </p>
                  <p className="text-[10px] text-foreground/55 font-bold uppercase tracking-wider">
                    {p.metric.label}
                  </p>
                </div>
              </div>

              {/* Низ карточки */}
              <div className="relative p-6">
                <div
                  className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${p.gradient} opacity-0 blur-3xl group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}
                />
                <p className="relative text-[11px] text-foreground/50 mb-1 font-bold uppercase tracking-widest">
                  {p.client}
                </p>
                <h3 className="relative font-bold text-lg text-foreground mb-3 leading-snug">
                  {p.title}
                </h3>
                <div className="relative flex items-center justify-between pt-4 border-t border-secondary">
                  <p className="text-sm text-foreground/70 leading-relaxed flex items-center gap-2 flex-1 min-w-0">
                    <Icon
                      name="TrendingUp"
                      size={14}
                      className="shrink-0"
                      style={{ color: p.accent }}
                    />
                    <span className="truncate">{p.result}</span>
                  </p>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 ml-3 group-hover:translate-x-1 transition-transform"
                    style={{ background: p.accent }}
                  >
                    <Icon name="ArrowRight" size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl py-16 px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
              <Icon name="SearchX" size={28} className="text-foreground/40" />
            </div>
            <p className="text-foreground/65 font-medium">В этой категории пока пусто</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-4 max-w-7xl mx-auto pb-16">
        <div className="bg-[#2d3a9e] text-white rounded-[2rem] px-8 py-16 md:py-20 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-10 w-80 h-80 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-[56px] leading-[1.1] font-black mb-4">
              Хотите так же?
            </h2>
            <p className="text-white/70 mb-10 text-base md:text-lg">
              Расскажите о своём проекте — соберём команду и запустим сайт за 7 дней.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/#contacts"
                className="px-7 py-4 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
              >
                Обсудить проект
              </Link>
              <Link
                to="/#pricing"
                className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full transition-colors"
              >
                Посмотреть тарифы
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}