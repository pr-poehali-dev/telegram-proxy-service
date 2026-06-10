import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useLang } from "@/i18n/LangContext";
import type { Lang } from "@/i18n/translations";

type Localized = Record<Lang, string>;

type RawProject = {
  title: Localized;
  client: Localized;
  category: string;
  tags: Localized[];
  result: Localized;
  metric: { value: string; label: Localized };
  gradient: string;
  accent: string;
  emoji: string;
  icon: string;
  url?: string;
  image?: string;
};

const RAW_PROJECTS: RawProject[] = [
  {
    title: { ru: "Сайт службы доставки фуршетов", zh: "自助餐配送服务网站" },
    client: { ru: "Фуршетный мастер · Краснодар", zh: "Furshet Master · Krasnodar" },
    category: "corp",
    tags: [
      { ru: "Корпоративный", zh: "企业网站" },
      { ru: "Доставка", zh: "配送" },
    ],
    result: { ru: "Запуск за 7 дней", zh: "7天上线" },
    metric: { value: "24/7", label: { ru: "приём заказов", zh: "接单" } },
    gradient: "from-[#fbbf24] via-[#fb923c] to-[#f472b6]",
    accent: "#db2777",
    icon: "UtensilsCrossed",
    emoji: "🥂",
    url: "https://furshetinbox.ru",
    image: "https://cdn.poehali.dev/projects/ce65ddef-2217-4074-b035-2a6a61d819df/bucket/d681b63f-a3c7-43ef-b73c-058c77dccb0f.jpg",
  },
];

export default function Portfolio() {
  const { t, lang } = useLang();

  const STATS = [
    {
      value: "ChatGPT",
      label: t.portfolio.stats.projects,
      icon: "Sparkles",
      gradient: "from-[#a78bfa] to-[#818cf8]",
    },
    {
      value: "Freepik",
      label: t.portfolio.stats.clients,
      icon: "Image",
      gradient: "from-[#f472b6] to-[#e879f9]",
    },
    {
      value: "Framer",
      label: t.portfolio.stats.avgTime,
      icon: "Frame",
      gradient: "from-[#34d399] to-[#22d3ee]",
    },
    {
      value: "DeepSeek",
      label: t.portfolio.stats.years,
      icon: "Brain",
      gradient: "from-[#fbbf24] to-[#fb923c]",
    },
  ];

  const filtered = RAW_PROJECTS.map((p) => ({
    title: p.title[lang],
    client: p.client[lang],
    category: p.category,
    tags: p.tags.map((tag) => tag[lang]),
    result: p.result[lang],
    metric: { value: p.metric.value, label: p.metric.label[lang] },
    gradient: p.gradient,
    accent: p.accent,
    emoji: p.emoji,
    icon: p.icon,
    url: p.url,
    image: p.image,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="pt-28 pb-8 px-4 max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-[0_30px_80px_-30px_rgba(80,70,200,0.25)] px-6 md:px-12 py-12 md:py-16">
          <div className="pointer-events-none absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-[#ede9fe] to-[#faf5ff] blur-3xl opacity-70" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-5">
                {t.portfolio.label}
              </p>
              <h1 className="font-extrabold tracking-tight text-foreground text-[44px] md:text-[64px] leading-[0.95]">
                {t.portfolio.titlePre}{" "}
                <span className="text-accent">{t.portfolio.titleHi}</span>
              </h1>
              <p className="text-base md:text-lg text-foreground/60 max-w-md mx-auto lg:mx-0 mt-6 leading-relaxed">
                {t.portfolio.subtitle}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
                <Link
                  to="/#contacts"
                  className="px-7 py-4 bg-accent text-white text-sm font-bold rounded-2xl shadow-lg shadow-accent/30 hover:opacity-90 transition-opacity"
                >
                  {t.portfolio.ctaDiscuss}
                </Link>
                <Link
                  to="/#pricing"
                  className="px-7 py-4 bg-white text-foreground text-sm font-bold rounded-2xl border border-secondary hover:bg-secondary/40 transition-colors"
                >
                  {t.portfolio.ctaPricing}
                </Link>
              </div>

              {/* PLATFORMS */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-8">
                {[
                  { label: "Tilda", icon: "Layout", gradient: "from-[#fbbf24] to-[#fb923c]" },
                  { label: "WordPress", icon: "Globe", gradient: "from-[#60a5fa] to-[#818cf8]" },
                  { label: "Shopify", icon: "ShoppingBag", gradient: "from-[#34d399] to-[#22d3ee]" },
                  { label: "Bitrix", icon: "Briefcase", gradient: "from-[#f472b6] to-[#e879f9]" },
                ].map((p) => (
                  <div
                    key={p.label}
                    className="group inline-flex items-center gap-2 px-3.5 py-2 bg-secondary/40 rounded-full hover:bg-white hover:shadow-md transition-all"
                  >
                    <div
                      className={`w-5 h-5 rounded-md bg-gradient-to-br ${p.gradient} text-white flex items-center justify-center shrink-0`}
                    >
                      <Icon name={p.icon} fallback="Circle" size={11} />
                    </div>
                    <span className="text-sm font-bold text-foreground">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — illustration */}
            <div className="relative">
              <div className="pointer-events-none absolute -top-8 -right-8 w-40 h-40 rounded-full bg-yellow-200/50 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-6 w-48 h-48 rounded-full bg-[#ede9fe] blur-2xl" />
              <img
                src="https://cdn.poehali.dev/projects/ce65ddef-2217-4074-b035-2a6a61d819df/bucket/3ae0a300-d6df-4751-92b1-294863c80926.jpg"
                alt="Modern Website Design"
                className="relative w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="px-4 max-w-7xl mx-auto pb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            {lang === "zh" ? "我们使用的工具" : "Инструменты, которые мы используем"}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group relative bg-white rounded-3xl py-7 px-5 shadow-[0_20px_50px_-30px_rgba(80,70,200,0.4)] hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${s.gradient} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity duration-500`}
              />
              <div
                className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${s.gradient} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}
              >
                <Icon name={s.icon} fallback="Circle" size={20} />
              </div>
              <p className="relative text-lg md:text-xl font-bold text-foreground">{s.value}</p>
              <p className="relative text-xs text-foreground/55 mt-1.5 font-bold uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="px-4 max-w-7xl mx-auto pb-16">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">
            {lang === "zh" ? "我们的作品" : "Наши работы"}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
            {lang === "zh" ? "我们做的项目" : "Что мы создаём"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, idx) => {
            const Wrapper = p.url ? "a" : "article";
            const wrapperProps = p.url
              ? {
                  href: p.url,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                }
              : {};
            return (
            <Wrapper
              key={idx}
              {...wrapperProps}
              className="group relative bg-white rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer block"
            >
              {/* Цветное превью */}
              <div
                className={`relative aspect-[4/3] bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <>
                    <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/30 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
                    <span className="relative text-8xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 drop-shadow-lg">
                      {p.emoji}
                    </span>
                  </>
                )}

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

                <div className="absolute top-4 right-4 w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Icon name={p.icon} fallback="Circle" size={18} style={{ color: p.accent }} />
                </div>

                <div className="absolute bottom-4 right-4 bg-white rounded-2xl px-4 py-2.5 text-right shadow-xl group-hover:scale-110 transition-transform">
                  <p className="text-xl font-semibold leading-tight" style={{ color: p.accent }}>
                    {p.metric.value}
                  </p>
                  <p className="text-[10px] text-foreground/55 font-bold uppercase tracking-wider">
                    {p.metric.label}
                  </p>
                </div>
              </div>

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
            </Wrapper>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl py-16 px-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
              <Icon name="SearchX" size={28} className="text-foreground/40" />
            </div>
            <p className="text-foreground/65 font-medium">{t.portfolio.empty}</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-4 max-w-7xl mx-auto pb-16">
        <div className="bg-[#2d3a9e] text-white rounded-[2rem] px-8 py-16 md:py-20 text-center relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-10 w-80 h-80 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-[56px] leading-[1.1] font-semibold mb-4">
              {t.portfolio.ctaTitle}
            </h2>
            <p className="text-white/70 mb-10 text-base md:text-lg">
              {t.portfolio.ctaSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/#contacts"
                className="px-7 py-4 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
              >
                {t.portfolio.ctaDiscuss}
              </Link>
              <Link
                to="/#pricing"
                className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full transition-colors"
              >
                {t.portfolio.ctaPricing}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}