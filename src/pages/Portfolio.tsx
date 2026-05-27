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
  emoji: string;
};

const PROJECTS: Project[] = [
  {
    title: "Сайт для стоматологии",
    client: "Клиника «Улыбка»",
    category: "corp",
    tags: ["Корпоративный", "SEO"],
    result: "ТОП-3 Яндекса по 12 запросам",
    metric: { value: "×4", label: "рост заявок" },
    gradient: "from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2]",
    emoji: "🦷",
  },
  {
    title: "Лендинг курса по фитнесу",
    client: "Тренер Мария Кузнецова",
    category: "landing",
    tags: ["Лендинг", "Дизайн"],
    result: "120 заявок в первую неделю",
    metric: { value: "8%", label: "конверсия" },
    gradient: "from-[#fde68a] via-[#fef3c7] to-[#fce7f3]",
    emoji: "💪",
  },
  {
    title: "Интернет-магазин косметики",
    client: "GlowShop",
    category: "shop",
    tags: ["Магазин", "1С"],
    result: "Каталог 800+ товаров",
    metric: { value: "+220%", label: "оборот" },
    gradient: "from-[#fbcfe8] via-[#f5d0fe] to-[#ddd6fe]",
    emoji: "💄",
  },
  {
    title: "Продвижение автосервиса",
    client: "СТО «Гараж 47»",
    category: "seo",
    tags: ["SEO", "Яндекс.Директ"],
    result: "Сокращение цены заявки в 3 раза",
    metric: { value: "TOP-5", label: "Яндекс" },
    gradient: "from-[#bae6fd] via-[#bfdbfe] to-[#c7d2fe]",
    emoji: "🚗",
  },
  {
    title: "Сайт строительной компании",
    client: "СтройМастер",
    category: "corp",
    tags: ["Корпоративный", "Каталог"],
    result: "Запуск за 12 дней",
    metric: { value: "60", label: "проектов" },
    gradient: "from-[#fef3c7] via-[#fee2e2] to-[#fce7f3]",
    emoji: "🏗️",
  },
  {
    title: "Лендинг свадебного фотографа",
    client: "Анна Соколова",
    category: "landing",
    tags: ["Лендинг", "Портфолио"],
    result: "Запись на 4 месяца вперёд",
    metric: { value: "×6", label: "обращений" },
    gradient: "from-[#fce7f3] via-[#fbcfe8] to-[#fde68a]",
    emoji: "📸",
  },
  {
    title: "Магазин детских товаров",
    client: "MiniKid",
    category: "shop",
    tags: ["Магазин", "amoCRM"],
    result: "Средний чек +35%",
    metric: { value: "2 500", label: "товаров" },
    gradient: "from-[#bbf7d0] via-[#bae6fd] to-[#ddd6fe]",
    emoji: "🧸",
  },
  {
    title: "SEO продвижение юр. компании",
    client: "Право и Партнёры",
    category: "seo",
    tags: ["SEO", "Контент"],
    result: "ТОП-10 по 47 запросам",
    metric: { value: "×5", label: "трафика" },
    gradient: "from-[#e0e7ff] via-[#ddd6fe] to-[#fbcfe8]",
    emoji: "⚖️",
  },
];

const STATS = [
  { value: "150+", label: "Проектов" },
  { value: "94%", label: "Клиентов остаются" },
  { value: "7 дней", label: "Средний срок" },
  { value: "5 лет", label: "На рынке" },
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
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
              Портфолио
            </p>
            <h1 className="font-black leading-[1.1] tracking-tight text-foreground text-center text-[56px]">
              Сделали — <span className="text-accent">показываем</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mt-6 leading-relaxed">
              150+ сайтов и проектов продвижения для бизнеса по всей России.
              Каждый — с реальным результатом и довольным клиентом.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-12">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white/80 rounded-2xl py-5">
                  <p className="text-3xl font-black text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{s.label}</p>
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
              className="bg-white rounded-3xl overflow-hidden hover:-translate-y-1 transition-transform group cursor-pointer"
            >
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                <span className="text-8xl group-hover:scale-110 transition-transform">{p.emoji}</span>
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/90 rounded-full text-[11px] font-bold text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 bg-white rounded-2xl px-4 py-2 text-right">
                  <p className="text-xl font-black text-foreground leading-tight">{p.metric.value}</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                    {p.metric.label}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs text-muted-foreground mb-1 font-medium">{p.client}</p>
                <h3 className="font-bold text-lg text-foreground mb-3 leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex items-center gap-2">
                  <Icon name="TrendingUp" size={14} className="text-accent shrink-0" />
                  {p.result}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            В этой категории пока пусто
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
