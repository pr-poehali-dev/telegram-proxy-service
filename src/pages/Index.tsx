import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const SERVICES = [
  {
    icon: "Layout",
    title: "Лендинги под ключ",
    desc: "Продающая одностраничная посадка с дизайном, текстами и формами.",
  },
  {
    icon: "ShoppingBag",
    title: "Интернет-магазины",
    desc: "Каталог, корзина, оплата, интеграция с CRM и 1С.",
  },
  {
    icon: "Briefcase",
    title: "Корпоративные сайты",
    desc: "Многостраничные сайты для компаний и услуг с понятной структурой.",
  },
  {
    icon: "TrendingUp",
    title: "Продвижение в Яндексе",
    desc: "SEO под Яндекс, Директ, аналитика. Поднимаем в ТОП-10.",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Бриф", desc: "Узнаём задачу, целевую аудиторию и пожелания." },
  { num: "02", title: "Прототип", desc: "Согласуем структуру и логику страниц." },
  { num: "03", title: "Дизайн", desc: "Создаём уникальный визуал в фирменном стиле." },
  { num: "04", title: "Разработка", desc: "Верстаем адаптивно, подключаем функции." },
  { num: "05", title: "Запуск", desc: "Размещаем на хостинге, настраиваем аналитику." },
  { num: "06", title: "Продвижение", desc: "Выводим в ТОП Яндекса и приводим клиентов." },
];

const PLANS = [
  {
    name: "Лендинг",
    price: "29 000",
    subprice: "Срок: 7 дней · с дизайном и текстами",
    desc: "Для старта",
    badge: null as string | null,
    btnLabel: "Заказать лендинг",
    btnSub: null as string | null,
    highlight: false,
    features: [
      "Уникальный дизайн",
      "Адаптив под мобильные",
      "До 5 секций",
      "Форма заявки на почту",
    ],
  },
  {
    name: "Сайт + SEO",
    price: "59 000",
    subprice: "Лендинг + 3 месяца продвижения в Яндексе",
    desc: "Лучшее предложение",
    badge: "ХИТ ПРОДАЖ" as string | null,
    btnLabel: "Заказать комплекс",
    btnSub: "+ продвижение в подарок" as string | null,
    highlight: true,
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-bold text-foreground text-base md:text-lg">{q}</span>
        <Icon
          name="Plus"
          size={20}
          className={`text-muted-foreground transition-transform shrink-0 ${open ? "rotate-45" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-[15px] text-foreground/70 leading-relaxed animate-fade-up">{a}</div>
      )}
    </div>
  );
}

function FaqSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section id="faq" ref={ref} className="py-12 px-4 max-w-4xl mx-auto scroll-mt-24">
      <div className={`reveal-up ${inView ? "is-visible" : ""}`}>
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
          FAQ
        </p>
        <h2 className="text-[56px] font-black text-center mb-12 text-foreground">
          Часто спрашивают
        </h2>
      </div>
      <div className="space-y-3">
        {FAQ.map((item, i) => (
          <div
            key={item.q}
            style={{ animationDelay: `${i * 100}ms` }}
            className={inView ? "animate-fade-up" : "opacity-0"}
          >
            <FaqItem q={item.q} a={item.a} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  const { ref, inView } = useInView(0.1);
  return (
    <section ref={ref} className="py-12 px-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2] rounded-[2rem] px-6 md:px-16 py-16">
        <div className={`reveal-up ${inView ? "is-visible" : ""}`}>
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
            Процесс
          </p>
          <h2 className="text-[56px] font-black mb-12 text-center text-foreground">
            Как мы работаем
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{ animationDelay: `${i * 100}ms` }}
              className={`bg-white rounded-3xl p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${inView ? "animate-fade-up" : "opacity-0"}`}
            >
              <p className="text-3xl font-black text-accent mb-3">{step.num}</p>
              <p className="font-bold text-lg mb-1 text-foreground">{step.title}</p>
              <p className="text-[15px] text-foreground/65 leading-relaxed">{step.desc}</p>
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
          <div className="relative rounded-[2rem] overflow-hidden px-6 py-20 md:py-28 text-center bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2]">
            <div className="pointer-events-none absolute -top-10 -right-10 w-80 h-80 rounded-full bg-yellow-200/60 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white/50 blur-3xl" />

            <div className="relative max-w-3xl mx-auto">
              <h1 className="font-black tracking-tight text-foreground text-center my-[9px] py-0 text-[56px]">
                <span className="animate-word-reveal inline-block">Готовый</span>{" "}
                <span className="animate-word-reveal inline-block text-accent delay-150">сайт</span>{" "}
                <span className="animate-word-reveal inline-block delay-300">за</span>{" "}
                <span className="animate-word-reveal inline-block delay-400">7</span>{" "}
                <span className="animate-word-reveal inline-block delay-500">дней</span>
              </h1>

              <p className="text-base md:text-lg text-foreground/70 max-w-lg mx-auto mb-10 leading-relaxed animate-fade-up delay-600">
                Создаём сайты под ключ и продвигаем в Яндексе.
                Дизайн, разработка и первые клиенты — за одну неделю.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up delay-700">
                <a
                  href="#pricing"
                  className="px-7 py-4 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-foreground/20"
                >
                  Заказать сайт от 29 000 ₽
                </a>
                <a
                  href="#contacts"
                  className="px-7 py-4 bg-white text-foreground text-sm font-bold rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-black/5"
                >
                  Бесплатная консультация
                </a>
              </div>

              <p className="text-[11px] uppercase tracking-widest font-bold text-foreground/60 mb-4 animate-fade-up delay-700">
                Работаем с
              </p>
              <div className="flex flex-wrap justify-center gap-2 animate-fade-up delay-700">
                {["ЯНДЕКС", "1С", "AMOCRM", "BITRIX24", "TILDA"].map((m, i) => (
                  <span
                    key={m}
                    style={{ animationDelay: `${800 + i * 80}ms` }}
                    className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-foreground shadow-sm animate-fade-up hover:-translate-y-0.5 transition-transform"
                  >
                    {m}
                  </span>
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
            Услуги
          </p>
          <h2 className="text-[56px] font-black text-center mb-12 text-foreground">
            Что мы делаем
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((f, i) => (
              <div
                key={f.title}
                style={{ animationDelay: `${i * 120}ms` }}
                className={`bg-white rounded-3xl p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${servicesSection.inView ? "animate-fade-up" : "opacity-0"}`}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-5 rounded-2xl bg-secondary text-accent">
                  <Icon name={f.icon} fallback="Circle" size={22} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-[15px] text-foreground/65 leading-relaxed">{f.desc}</p>
              </div>
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
            Тарифы
          </p>
          <h2 className="text-[56px] font-black mb-3 text-center text-foreground">
            Простые цены
          </h2>
          <p className="text-center text-foreground/65 mb-12 max-w-md mx-auto text-[15px]">
            Фиксированная цена в договоре. Никаких скрытых платежей.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {PLANS.map((plan, idx) => (
              <div
                key={plan.name}
                style={{ animationDelay: `${idx * 130}ms` }}
                className={`rounded-3xl p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300 ${
                  plan.highlight
                    ? "bg-[#2d3a9e] text-white shadow-2xl md:scale-105 z-10"
                    : "bg-white hover:shadow-lg"
                } ${pricingSection.inView ? "animate-fade-up" : "opacity-0"}`}
              >
                {plan.badge && (
                  <span className="self-start mb-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-yellow-400 text-yellow-900">
                    {plan.badge}
                  </span>
                )}

                <p
                  className={`text-xs uppercase tracking-widest font-bold mb-2 ${
                    plan.highlight ? "text-white/60" : "text-muted-foreground"
                  }`}
                >
                  {plan.desc}
                </p>

                <p className={`text-4xl font-black mb-1 ${plan.highlight ? "text-white" : "text-foreground"}`}>
                  {plan.name}
                </p>

                <p className={`text-5xl font-black mt-3 mb-1 ${plan.highlight ? "text-white" : "text-foreground"}`}>
                  {plan.price} <span className="text-2xl font-bold">₽</span>
                </p>

                <p className={`text-sm mb-6 mt-1 ${plan.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  {plan.subprice}
                </p>

                <ul className="space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Icon
                        name="Check"
                        size={16}
                        className={`mt-0.5 shrink-0 ${plan.highlight ? "text-yellow-400" : "text-accent"}`}
                      />
                      <span className={plan.highlight ? "text-white/85" : "text-muted-foreground"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-full text-sm font-bold transition-opacity mt-auto ${
                    plan.highlight
                      ? "bg-yellow-400 text-yellow-900 hover:opacity-90"
                      : "bg-secondary text-foreground hover:opacity-80"
                  }`}
                >
                  <span className="block">{plan.btnLabel}</span>
                  {plan.btnSub && (
                    <span className={`block text-xs font-normal mt-0.5 ${plan.highlight ? "text-yellow-800" : "text-muted-foreground"}`}>
                      {plan.btnSub}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Промо-блок */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                <Icon name="Gift" size={20} className="text-foreground" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-0.5">
                  Не уверены, что нужен сайт?
                </p>
                <p className="font-bold text-foreground text-base">Бесплатный аудит вашего сайта</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Покажем точки роста и план по продвижению
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <p className="text-3xl font-black text-foreground">0 ₽</p>
              <a
                href="#contacts"
                className="px-6 py-3.5 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Получить аудит
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
                  Контакты
                </p>
                <h2 className="text-[56px] font-black mb-4 text-foreground">Напишите нам</h2>
                <p className="text-[15px] text-foreground/65 leading-relaxed mb-8">
                  Расскажите о задаче — мы вернёмся с предложением и сроками
                  в течение нескольких минут.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: "Mail", label: "Email", value: "hello@sitecraft.ru" },
                    { icon: "MessageCircle", label: "Telegram", value: "@sitecraft_team" },
                    { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                    { icon: "Clock", label: "Время работы", value: "Пн–Пт, 10:00–20:00 МСК" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-secondary rounded-2xl mt-0.5 shrink-0">
                        <Icon name={c.icon} fallback="Circle" size={16} className="text-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5 font-bold uppercase tracking-wider">{c.label}</p>
                        <p className="text-sm font-bold text-foreground">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-muted-foreground mb-3 font-bold uppercase tracking-wider">
                  Напишите в удобном мессенджере
                </p>
                {[
                  {
                    name: "MAX",
                    handle: "@sitecraft",
                    desc: "Российский мессенджер",
                    icon: "MessagesSquare",
                    color: "from-[#ffe27a] to-[#facc15]",
                    iconColor: "text-yellow-900",
                    href: "https://max.ru/sitecraft",
                  },
                  {
                    name: "Telegram",
                    handle: "@sitecraft_team",
                    desc: "Ответим за пару минут",
                    icon: "Send",
                    color: "from-[#74c0fc] to-[#339af0]",
                    iconColor: "text-white",
                    href: "https://t.me/sitecraft_team",
                  },
                  {
                    name: "VK",
                    handle: "vk.com/sitecraft",
                    desc: "Сообщения сообщества",
                    icon: "MessageCircle",
                    color: "from-[#5181b8] to-[#2a5885]",
                    iconColor: "text-white",
                    href: "https://vk.com/sitecraft",
                  },
                  {
                    name: "WeChat",
                    handle: "sitecraft_cn",
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
                    className="flex items-center gap-4 bg-secondary hover:bg-secondary/70 rounded-2xl px-5 py-4 transition-colors group"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${s.color}`}
                    >
                      <Icon name={s.icon} fallback="MessageCircle" size={20} className={s.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-base leading-tight">{s.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                    <div className="hidden sm:block text-right">
                      <p className="text-sm font-bold text-foreground">{s.handle}</p>
                    </div>
                    <Icon
                      name="ArrowUpRight"
                      size={18}
                      className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                    />
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