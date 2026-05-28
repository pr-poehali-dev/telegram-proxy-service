import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getLocalizedServices } from "@/data/services";
import { useLang } from "@/i18n/LangContext";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Бриф",
    desc: "Узнаём задачу, целевую аудиторию и пожелания.",
    icon: "FileText",
    duration: "1 день",
    gradient: "from-[#a78bfa] to-[#818cf8]",
    accent: "#7c3aed",
  },
  {
    num: "02",
    title: "Прототип",
    desc: "Согласуем структуру и логику страниц.",
    icon: "LayoutGrid",
    duration: "1 день",
    gradient: "from-[#60a5fa] to-[#22d3ee]",
    accent: "#0284c7",
  },
  {
    num: "03",
    title: "Дизайн",
    desc: "Создаём уникальный визуал в фирменном стиле.",
    icon: "Palette",
    duration: "2 дня",
    gradient: "from-[#f472b6] to-[#e879f9]",
    accent: "#db2777",
  },
  {
    num: "04",
    title: "Разработка",
    desc: "Верстаем адаптивно, подключаем функции.",
    icon: "Code2",
    duration: "2 дня",
    gradient: "from-[#34d399] to-[#22d3ee]",
    accent: "#059669",
  },
  {
    num: "05",
    title: "Запуск",
    desc: "Размещаем на хостинге, настраиваем аналитику.",
    icon: "Rocket",
    duration: "1 день",
    gradient: "from-[#fbbf24] to-[#fb923c]",
    accent: "#ea580c",
  },
  {
    num: "06",
    title: "Продвижение",
    desc: "Выводим в ТОП Яндекса и приводим клиентов.",
    icon: "TrendingUp",
    duration: "От 1 мес",
    gradient: "from-[#f87171] to-[#fb7185]",
    accent: "#e11d48",
  },
];

const PLANS = [
  {
    name: "Одностраничный",
    price: "15 000",
    subprice: "Срок: 7 дней · с дизайном и текстами",
    desc: "Для старта",
    badge: null as string | null,
    btnLabel: "Заказать лендинг",
    btnSub: null as string | null,
    highlight: false,
    icon: "Sparkles",
    gradient: "from-[#a78bfa] to-[#818cf8]",
    accent: "#7c3aed",
    features: [
      "Уникальный дизайн",
      "Адаптив под мобильные",
      "До 5 секций",
      "Форма заявки на почту",
    ],
  },
  {
    name: "Сайт + SEO",
    price: "25 000",
    subprice: "Лендинг + 3 месяца продвижения в Яндексе",
    desc: "Лучшее предложение",
    badge: "ХИТ ПРОДАЖ" as string | null,
    btnLabel: "Заказать комплекс",
    btnSub: "+ продвижение в подарок" as string | null,
    highlight: true,
    icon: "Rocket",
    gradient: "from-yellow-400 to-yellow-300",
    accent: "#facc15",
    features: [
      "Всё из тарифа «Лендинг»",
      "SEO-оптимизация",
      "Семантическое ядро",
      "Настройка Яндекс.Метрики",
      "Отчёты каждый месяц",
    ],
  },
  {
    name: "Магазин",
    price: "89 000",
    subprice: "Срок: 14 дней · каталог + оплата",
    desc: "Для продаж",
    badge: null as string | null,
    btnLabel: "Заказать магазин",
    btnSub: null as string | null,
    highlight: false,
    icon: "ShoppingBag",
    gradient: "from-[#f472b6] to-[#e879f9]",
    accent: "#db2777",
    features: [
      "Каталог товаров",
      "Корзина и оплата онлайн",
      "Личный кабинет",
      "Интеграция с CRM",
    ],
  },
];

const FAQ = [
  {
    q: "Сколько стоит сайт под ключ?",
    a: "Базовый лендинг — от 29 000 ₽. Корпоративный сайт — от 59 000 ₽. Интернет-магазин — от 89 000 ₽. Финальная цена зависит от объёма и сложности.",
  },
  {
    q: "За сколько дней сделаете сайт?",
    a: "Лендинг — 7 дней, корпоративный сайт — 10–14 дней, интернет-магазин — 14–21 день. Срок фиксируем в договоре.",
  },
  {
    q: "Как вы продвигаете сайты в Яндексе?",
    a: "Собираем семантическое ядро, оптимизируем тексты и метатеги, настраиваем Яндекс.Вебмастер и Метрику. При необходимости запускаем Яндекс.Директ.",
  },
  {
    q: "Что если мне не понравится результат?",
    a: "На каждом этапе мы согласуем работу. Если что-то не подходит — переделываем без доплат до полного утверждения.",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const gradients = [
    "from-[#a78bfa] to-[#818cf8]",
    "from-[#f472b6] to-[#e879f9]",
    "from-[#34d399] to-[#22d3ee]",
    "from-[#fbbf24] to-[#fb923c]",
  ];
  const accents = ["#7c3aed", "#db2777", "#059669", "#ea580c"];
  const gradient = gradients[idx % gradients.length];
  const accent = accents[idx % accents.length];

  return (
    <div
      className={`group relative bg-white rounded-3xl overflow-hidden transition-all duration-500 ${
        open ? "shadow-2xl" : "hover:shadow-lg"
      }`}
    >
      <div
        className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${gradient} blur-3xl transition-opacity duration-500 ${
          open ? "opacity-25" : "opacity-0 group-hover:opacity-15"
        }`}
      />
      <button
        onClick={() => setOpen(!open)}
        className="relative w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div className="flex items-center gap-4 flex-1">
          <div
            className={`w-11 h-11 shrink-0 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center font-black text-sm shadow-md transition-transform duration-500 ${
              open ? "scale-110 rotate-6" : "group-hover:scale-105"
            }`}
          >
            ?
          </div>
          <span className="font-bold text-foreground text-base md:text-lg leading-snug">
            {q}
          </span>
        </div>
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
            open ? "rotate-45" : ""
          }`}
          style={{ background: open ? accent : "transparent", border: open ? "none" : "1px solid hsl(var(--border))" }}
        >
          <Icon
            name="Plus"
            size={16}
            className={open ? "text-white" : "text-foreground/60"}
          />
        </div>
      </button>
      {open && (
        <div className="relative px-6 pb-6 pl-[88px] text-[15px] text-foreground/70 leading-relaxed animate-fade-up">
          {a}
        </div>
      )}
    </div>
  );
}

function FaqSection() {
  const { ref, inView } = useInView(0.1);
  const { t } = useLang();
  return (
    <section id="faq" ref={ref} className="py-12 px-4 max-w-4xl mx-auto scroll-mt-24">
      <div className={`reveal-up ${inView ? "is-visible" : ""}`}>
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
          {t.faq.label}
        </p>
        <h2 className="text-[56px] font-black text-center mb-12 text-foreground">
          {t.faq.title}
        </h2>
      </div>
      <div className="space-y-3">
        {FAQ.map((item, i) => (
          <div
            key={item.q}
            style={{ animationDelay: `${i * 100}ms` }}
            className={inView ? "animate-fade-up" : "opacity-0"}
          >
            <FaqItem q={item.q} a={item.a} idx={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  const { ref, inView } = useInView(0.1);
  const { t } = useLang();
  return (
    <section ref={ref} className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2] rounded-[2rem] px-6 md:px-16 py-16">
        <div className={`reveal-up ${inView ? "is-visible" : ""}`}>
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
            {t.process.label}
          </p>
          <h2 className="text-[56px] font-black mb-12 text-center text-foreground">
            {t.process.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{ animationDelay: `${i * 100}ms` }}
              className={`group relative bg-white rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden ${inView ? "animate-fade-up" : "opacity-0"}`}
            >
              {/* Огромный номер на фоне */}
              <span
                className="absolute -top-6 -right-2 text-[140px] font-black leading-none select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"
                style={{ color: step.accent }}
              >
                {step.num}
              </span>

              {/* Градиентное пятно */}
              <div
                className={`absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-gradient-to-br ${step.gradient} opacity-[0.08] blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
              />

              {/* Верх: иконка и шаг */}
              <div className="relative flex items-start justify-between mb-6">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
                >
                  <Icon name={step.icon} fallback="Circle" size={24} />
                </div>
                <div className="text-right">
                  <p
                    className="text-[11px] uppercase tracking-widest font-bold mb-0.5"
                    style={{ color: step.accent }}
                  >
                    {t.process.step} {step.num}
                  </p>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-secondary rounded-full">
                    <Icon name="Clock" size={11} className="text-foreground/60" />
                    <span className="text-[11px] font-bold text-foreground/70">
                      {step.duration}
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="relative font-bold text-xl mb-2 text-foreground leading-tight">
                {step.title}
              </h3>
              <p className="relative text-[15px] text-foreground/65 leading-relaxed mb-5">
                {step.desc}
              </p>

              {/* Прогресс-полоска */}
              <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${step.gradient} rounded-full transition-all duration-700`}
                  style={{
                    width: `${((i + 1) / PROCESS_STEPS.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const heroSection = useInView(0.1);
  const servicesSection = useInView(0.1);
  const pricingSection = useInView(0.1);
  const contactsSection = useInView(0.1);
  const { t, lang } = useLang();
  const SERVICES = getLocalizedServices(lang);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section
        id="hero"
        ref={heroSection.ref}
        className="pt-28 pb-12 px-4 max-w-7xl mx-auto"
      >
        <div
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease" }}
          className={heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        >
          <div className="relative rounded-[2rem] overflow-hidden px-6 py-16 md:py-24 text-center bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2]">
            {/* Цветные градиентные пятна как в карточках */}
            <div className="pointer-events-none absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#fbbf24] to-[#fb923c] opacity-25 blur-3xl animate-float" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#a78bfa] to-[#f472b6] opacity-25 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
            <div className="pointer-events-none absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#34d399] to-[#22d3ee] opacity-15 blur-3xl" />

            <div className="relative max-w-3xl mx-auto">
              {/* Бейдж как на карточках */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md animate-fade-up">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
                </span>
                <span className="text-xs font-bold text-foreground uppercase tracking-widest">Партнер Reg.ru</span>
              </div>

              <h1 className="font-black tracking-tight text-foreground text-center my-[9px] py-0 text-[56px]">
                <span className="animate-word-reveal inline-block">{t.hero.ready}</span>{" "}
                <span className="animate-word-reveal inline-block text-accent delay-150 relative">
                  {t.hero.site}
                  <span className="absolute -bottom-1 left-0 right-0 h-2 bg-yellow-300/60 -z-10 rounded-full" />
                </span>{" "}
                <span className="animate-word-reveal inline-block delay-300">{t.hero.inDays}</span>
              </h1>

              <p className="text-base md:text-lg text-foreground/70 max-w-lg mx-auto mt-6 mb-10 leading-relaxed animate-fade-up delay-600">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up delay-700">
                <a
                  href="#pricing"
                  className="group inline-flex items-center gap-2 px-7 py-4 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-foreground/20"
                >
                  {t.hero.orderBtn}
                  <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contacts"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-white text-foreground text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-black/5"
                >
                  <Icon name="MessageCircle" size={16} />
                  {t.hero.consultBtn}
                </a>
              </div>

              {/* Иконки сервисов в едином стиле карточек */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-3xl mx-auto">
                {[
                  { label: "Яндекс", icon: "Search", gradient: "from-[#fbbf24] to-[#fb923c]", accent: "#ea580c" },
                  { label: "1С", icon: "Database", gradient: "from-[#f472b6] to-[#e879f9]", accent: "#db2777" },
                  { label: "amoCRM", icon: "Users", gradient: "from-[#a78bfa] to-[#818cf8]", accent: "#7c3aed" },
                  { label: "Bitrix24", icon: "Briefcase", gradient: "from-[#34d399] to-[#22d3ee]", accent: "#0891b2" },
                  { label: "Tilda", icon: "Layout", gradient: "from-[#60a5fa] to-[#a78bfa]", accent: "#2563eb" },
                ].map((m, i) => (
                  <div
                    key={m.label}
                    style={{ animationDelay: `${800 + i * 80}ms` }}
                    className="group relative bg-white rounded-2xl p-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-up"
                  >
                    <div
                      className={`absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br ${m.gradient} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative mx-auto w-10 h-10 rounded-2xl bg-gradient-to-br ${m.gradient} text-white flex items-center justify-center mb-2 shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
                    >
                      <Icon name={m.icon} fallback="Circle" size={18} />
                    </div>
                    <p className="relative text-xs font-bold text-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        ref={servicesSection.ref}
        className="py-12 px-4 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className={`reveal-up ${servicesSection.inView ? "is-visible" : ""}`}>
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
            {t.services.label}
          </p>
          <h2 className="text-[56px] font-black text-center mb-12 text-foreground">
            {t.services.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((f, i) => (
              <Link
                key={f.slug}
                to={`/services/${f.slug}`}
                style={{ animationDelay: `${i * 120}ms` }}
                className={`group relative bg-white rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden ${servicesSection.inView ? "animate-fade-up" : "opacity-0"}`}
              >
                {/* Градиентное пятно в углу */}
                <div
                  className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-20 blur-2xl group-hover:opacity-40 group-hover:scale-125 transition-all duration-500`}
                />

                {/* Бейдж */}
                <div className="relative flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                  >
                    <Icon name={f.icon} fallback="Circle" size={24} />
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${f.accent}15`, color: f.accent }}
                  >
                    {f.badge}
                  </span>
                </div>

                <h3 className="relative font-bold text-xl mb-2 text-foreground leading-tight">
                  {f.title}
                </h3>
                <p className="relative text-[15px] text-foreground/65 leading-relaxed mb-6">
                  {f.desc}
                </p>

                {/* Цена и срок */}
                <div className="relative flex items-center justify-between pt-5 border-t border-secondary">
                  <div>
                    <p className="text-[10px] text-foreground/50 uppercase tracking-wider font-bold mb-0.5">
                      {t.services.price}
                    </p>
                    <p className="text-sm font-bold text-foreground">{f.price}</p>
                  </div>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform"
                    style={{ background: f.accent }}
                  >
                    <Icon name="ArrowRight" size={16} className="text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <ProcessSection />

      {/* PROCESS-END */}

      {/* PRICING */}
      <section
        id="pricing"
        ref={pricingSection.ref}
        className="py-16 px-4 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className={`reveal-up ${pricingSection.inView ? "is-visible" : ""}`}>
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
            {t.pricing.label}
          </p>
          <h2 className="text-[56px] font-black mb-3 text-center text-foreground">
            {t.pricing.title}
          </h2>
          <p className="text-center text-foreground/65 mb-12 max-w-md mx-auto text-[15px]">
            {t.pricing.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {PLANS.map((plan, idx) => (
              <div
                key={plan.name}
                style={{ animationDelay: `${idx * 130}ms` }}
                className={`group relative rounded-3xl p-8 flex flex-col overflow-hidden hover:-translate-y-2 transition-all duration-500 ${
                  plan.highlight
                    ? "bg-[#2d3a9e] text-white shadow-2xl md:scale-105 z-10"
                    : "bg-white hover:shadow-2xl"
                } ${pricingSection.inView ? "animate-fade-up" : "opacity-0"}`}
              >
                {/* Градиентное пятно */}
                <div
                  className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${plan.gradient} blur-3xl pointer-events-none transition-all duration-500 ${
                    plan.highlight ? "opacity-30" : "opacity-15 group-hover:opacity-30 group-hover:scale-125"
                  }`}
                />

                {/* Верх — иконка и бейдж */}
                <div className="relative flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${plan.gradient} text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
                  >
                    <Icon name={plan.icon} fallback="Sparkles" size={24} />
                  </div>
                  {plan.badge && (
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-400 text-yellow-900 shadow-lg">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p
                  className={`relative text-[11px] uppercase tracking-widest font-bold mb-1 ${
                    plan.highlight ? "text-white/60" : "text-foreground/50"
                  }`}
                >
                  {plan.desc}
                </p>

                <p className={`relative text-3xl font-black mb-4 ${plan.highlight ? "text-white" : "text-foreground"}`}>
                  {plan.name}
                </p>

                {/* Цена в стеклянной плашке */}
                <div
                  className={`relative rounded-2xl p-4 mb-5 ${
                    plan.highlight ? "bg-white/10 backdrop-blur-sm border border-white/20" : "bg-secondary"
                  }`}
                >
                  <p className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-foreground"}`}>
                    {plan.price}{" "}
                    <span className={`text-lg font-bold ${plan.highlight ? "text-white/70" : "text-foreground/60"}`}>
                      ₽
                    </span>
                  </p>
                  <p className={`text-xs mt-1 ${plan.highlight ? "text-white/60" : "text-foreground/60"}`}>
                    {plan.subprice}
                  </p>
                </div>

                <ul className="relative space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          plan.highlight ? "bg-yellow-400" : ""
                        }`}
                        style={!plan.highlight ? { background: plan.accent } : undefined}
                      >
                        <Icon name="Check" size={12} className={plan.highlight ? "text-yellow-900" : "text-white"} />
                      </div>
                      <span className={`text-[14px] ${plan.highlight ? "text-white/85" : "text-foreground/75"}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`relative w-full py-4 rounded-full text-sm font-bold transition-all duration-300 mt-auto group-hover:scale-[1.02] ${
                    plan.highlight
                      ? "bg-yellow-400 text-yellow-900 hover:shadow-2xl hover:shadow-yellow-400/40"
                      : "bg-foreground text-background hover:shadow-xl"
                  }`}
                >
                  <span className="block">{plan.btnLabel}</span>
                  {plan.btnSub && (
                    <span className={`block text-xs font-normal mt-0.5 ${plan.highlight ? "text-yellow-800" : "text-background/70"}`}>
                      {plan.btnSub}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Промо-блок */}
          <div className="group relative mt-4 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl px-6 py-6 hover:shadow-2xl transition-all duration-500">
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-gradient-to-br from-[#34d399] to-[#22d3ee] opacity-15 blur-3xl group-hover:opacity-30 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#34d399] to-[#22d3ee] text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                <Icon name="Gift" size={22} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest font-bold text-[#059669] mb-0.5">
                  {t.pricing.promoSmall}
                </p>
                <p className="font-bold text-foreground text-lg leading-tight">{t.pricing.promoTitle}</p>
                <p className="text-xs text-foreground/60 mt-1">
                  {t.pricing.promoDesc}
                </p>
              </div>
            </div>
            <div className="relative flex items-center gap-4 shrink-0">
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest font-bold text-foreground/50">{t.services.price}</p>
                <p className="text-3xl font-black text-foreground leading-none">{t.pricing.free}</p>
              </div>
              <a
                href="#contacts"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity whitespace-nowrap group-hover:scale-105"
              >
                {t.pricing.promoBtn}
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* CONTACTS */}
      <section
        id="contacts"
        ref={contactsSection.ref}
        className="py-16 px-4 max-w-7xl mx-auto scroll-mt-24"
      >
        <div className={`reveal-up ${contactsSection.inView ? "is-visible" : ""}`}>
          <div className="bg-white rounded-[2rem] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                  {t.contacts.label}
                </p>
                <h2 className="text-[56px] font-black mb-4 text-foreground">{t.contacts.title}</h2>
                <p className="text-[15px] text-foreground/65 leading-relaxed mb-8">
                  {t.contacts.subtitle}
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: "Mail",
                      label: t.contacts.emailLabel,
                      value: "hello@altdel.ru",
                      gradient: "from-[#a78bfa] to-[#818cf8]",
                    },
                    {
                      icon: "Phone",
                      label: t.contacts.phoneLabel,
                      value: "+7 (495) 000-00-00",
                      gradient: "from-[#34d399] to-[#22d3ee]",
                    },
                    {
                      icon: "MapPin",
                      label: t.contacts.officeLabel,
                      value: t.contacts.office,
                      gradient: "from-[#f472b6] to-[#e879f9]",
                    },
                    {
                      icon: "Clock",
                      label: t.contacts.hoursLabel,
                      value: t.contacts.hours,
                      gradient: "from-[#fbbf24] to-[#fb923c]",
                    },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary/60 transition-colors"
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${c.gradient} text-white rounded-2xl shrink-0 shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
                      >
                        <Icon name={c.icon} fallback="Circle" size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-foreground/50 mb-0.5 font-bold uppercase tracking-widest">
                          {c.label}
                        </p>
                        <p className="text-sm font-bold text-foreground truncate">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground mb-3 font-bold uppercase tracking-wider">
                  {t.contacts.writeIn}
                </p>
                {[
                  {
                    name: "MAX",
                    handle: "@altdel",
                    desc: "Российский мессенджер",
                    icon: "MessagesSquare",
                    color: "from-[#ffe27a] to-[#facc15]",
                    iconColor: "text-yellow-900",
                    href: "https://max.ru/altdel",
                  },
                  {
                    name: "Telegram",
                    handle: "@altdel_team",
                    desc: "Ответим за пару минут",
                    icon: "Send",
                    color: "from-[#74c0fc] to-[#339af0]",
                    iconColor: "text-white",
                    href: "https://t.me/altdel_team",
                  },
                  {
                    name: "VK",
                    handle: "vk.com/altdel",
                    desc: "Сообщения сообщества",
                    icon: "MessageCircle",
                    color: "from-[#5181b8] to-[#2a5885]",
                    iconColor: "text-white",
                    href: "https://vk.com/altdel",
                  },
                  {
                    name: "WeChat",
                    handle: "altdel_cn",
                    desc: "Работаем с Китаем",
                    icon: "MessageSquare",
                    color: "from-[#7bed9f] to-[#2ed573]",
                    iconColor: "text-white",
                    href: "#",
                  },
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-4 bg-white border-2 border-secondary hover:border-transparent hover:shadow-2xl rounded-2xl px-5 py-4 transition-all duration-500 overflow-hidden"
                  >
                    <div
                      className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${s.color} opacity-0 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${s.color} shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
                    >
                      <Icon name={s.icon} fallback="MessageCircle" size={20} className={s.iconColor} />
                    </div>
                    <div className="relative flex-1 min-w-0">
                      <p className="font-bold text-foreground text-base leading-tight">{s.name}</p>
                      <p className="text-xs text-foreground/55 mt-0.5">{s.desc}</p>
                    </div>
                    <div className="relative hidden sm:block text-right">
                      <p className="text-sm font-bold text-foreground/80">{s.handle}</p>
                    </div>
                    <div className="relative w-9 h-9 rounded-full bg-secondary group-hover:bg-foreground flex items-center justify-center shrink-0 transition-colors">
                      <Icon
                        name="ArrowUpRight"
                        size={16}
                        className="text-foreground group-hover:text-background transition-colors"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}