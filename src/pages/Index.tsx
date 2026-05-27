import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Характеристики", href: "#specs" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  {
    icon: "Zap",
    title: "Скорость до 10 Гбит/с",
    desc: "Минимальные задержки и стабильное соединение без разрывов.",
  },
  {
    icon: "Globe",
    title: "200+ стран",
    desc: "Резидентные и дата-центровые прокси в любой точке мира.",
  },
  {
    icon: "ShieldCheck",
    title: "Анонимность 100%",
    desc: "Не храним логи. Ваши данные остаются только у вас.",
  },
  {
    icon: "RefreshCw",
    title: "Ротация IP",
    desc: "Автоматическая смена IP по расписанию или по запросу.",
  },
];

const PLANS = [
  {
    name: "Год",
    price: "4 200",
    subprice: "≈ 350 ₽ в месяц · экономия 30%",
    desc: "Любимый тариф",
    badge: null as string | null,
    btnLabel: "Купить на год",
    btnSub: null as string | null,
    highlight: false,
  },
  {
    name: "Два года",
    price: "5 700",
    subprice: "≈ 190 ₽ в месяц с учётом подарка",
    desc: "Лучшее предложение",
    badge: "+ 6 МЕС. В ПОДАРОК" as string | null,
    btnLabel: "Купить на 2 года",
    btnSub: "+ 6 месяцев в подарок" as string | null,
    highlight: true,
  },
  {
    name: "Месяц",
    price: "500",
    subprice: "за 30 дней",
    desc: "Для начала",
    badge: null as string | null,
    btnLabel: "Купить на месяц",
    btnSub: null as string | null,
    highlight: false,
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

function TestWidget() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { ip: string; country: string; latency: string }>(null);
  const [step, setStep] = useState<"idle" | "testing" | "done">("idle");

  const handleTest = () => {
    if (!ip.trim()) return;
    setLoading(true);
    setStep("testing");
    setResult(null);

    setTimeout(() => {
      setResult({
        ip: ip.trim(),
        country: "Германия 🇩🇪",
        latency: `${Math.floor(Math.random() * 30 + 8)} мс`,
      });
      setLoading(false);
      setStep("done");
    }, 1800);
  };

  return (
    <div className="rounded-3xl p-6 bg-white shadow-sm max-w-2xl w-full">
      <p className="text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">
        Бесплатный тест
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Введите IP или домен прокси"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTest()}
          className="flex-1 bg-secondary rounded-full px-5 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-accent/40 text-foreground placeholder:text-muted-foreground/60"
        />
        <button
          onClick={handleTest}
          disabled={loading || !ip.trim()}
          className="px-6 py-3 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          {loading ? "..." : "Проверить"}
        </button>
      </div>

      {step === "testing" && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Проверяем соединение...
        </div>
      )}

      {step === "done" && result && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "IP", value: result.ip },
            { label: "Геолокация", value: result.country },
            { label: "Задержка", value: result.latency },
          ].map((item) => (
            <div key={item.label} className="bg-secondary rounded-2xl px-4 py-3">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5 font-bold">
                {item.label}
              </p>
              <p className="text-sm font-bold truncate text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-3">
      <span
        className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground font-black text-xl"
        style={{
          background: "linear-gradient(135deg, #facc15 0%, #fde047 100%)",
          boxShadow: "0 4px 12px rgba(250, 204, 21, 0.35)",
        }}
      >
        P
      </span>
      <span className="font-extrabold text-lg text-foreground">ProxyLine</span>
    </a>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroSection = useInView(0.1);
  const featuresSection = useInView(0.1);
  const pricingSection = useInView(0.1);
  const contactsSection = useInView(0.1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV — пилюля */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl rounded-full shadow-sm px-3 md:px-4 py-2.5 flex items-center justify-between">
          <Logo />

          <nav className="hidden md:flex items-center gap-8 px-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#pricing"
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
          >
            Купить
          </a>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-2 bg-white rounded-3xl shadow-sm px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="text-center px-5 py-3 bg-foreground text-background text-sm font-bold rounded-full"
            >
              Купить
            </a>
          </div>
        )}
      </header>

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
              <h1 className="font-black leading-[1.1] tracking-tight text-foreground text-center my-[9px] py-0 text-[56px]">
                Один <span className="text-accent">клик</span> — и сервер ваш.
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
                Оформите доступ — сервер будет готов к работе через пару минут.
                Инструкции по подключению придут сразу.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-12">
                <a
                  href="#pricing"
                  className="px-7 py-4 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-foreground/20"
                >
                  Купить от 190 ₽/мес
                </a>
                <a
                  href="#pricing"
                  className="px-7 py-4 bg-white text-foreground text-sm font-bold rounded-full hover:bg-white/90 transition-colors shadow-lg shadow-black/5"
                >
                  Попробовать за 10 ₽
                </a>
              </div>

              <p className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground/80 mb-4">
                Принимаем к оплате
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {["VISA", "MC", "МИР", "CRYPTO"].map((m) => (
                  <span
                    key={m}
                    className="px-4 py-2 bg-white rounded-xl text-xs font-bold text-foreground shadow-sm"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        ref={featuresSection.ref}
        className="py-12 px-4 max-w-7xl mx-auto"
      >
        <div
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease" }}
          className={featuresSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 text-center">
            Возможности
          </p>
          <h2 className="text-[56px] leading-[1.1] font-black text-center mb-12 text-foreground">
            Всё уже включено
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-7 hover:-translate-y-1 transition-transform"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-5 rounded-2xl bg-secondary text-accent">
                  <Icon name={f.icon} fallback="Circle" size={22} />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEST WIDGET */}
      <section id="test" className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2] rounded-[2rem] px-6 md:px-16 py-16 text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
            Проверить прокси
          </p>
          <h2 className="text-[56px] leading-[1.1] font-black mb-3 text-foreground">
            Протестируйте до покупки
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-md mx-auto">
            Введите IP прокси и убедитесь в качестве соединения — бесплатно и без регистрации.
          </p>
          <div className="flex justify-center">
            <TestWidget />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        ref={pricingSection.ref}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <div
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease" }}
          className={pricingSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        >
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 text-center">
            Тарифы
          </p>
          <h2 className="text-[56px] leading-[1.1] font-black mb-3 text-center text-foreground">
            Простые цены
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto">
            84% клиентов переходят на длительный тариф уже после первого месяца.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 flex flex-col ${
                  plan.highlight
                    ? "bg-[#2d3a9e] text-white shadow-2xl md:scale-105 z-10"
                    : "bg-white"
                }`}
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

                <p className={`text-sm mb-8 mt-1 ${plan.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                  {plan.subprice}
                </p>

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

          {/* Пробный тариф */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                <Icon name="Clock" size={20} className="text-foreground" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-0.5">
                  Хочется сначала попробовать?
                </p>
                <p className="font-bold text-foreground text-base">Пробный тариф на 24 часа</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Полный доступ на сутки · можно купить один раз
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <p className="text-3xl font-black text-foreground">10 ₽</p>
              <button className="px-6 py-3.5 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity whitespace-nowrap">
                Попробовать за 10 ₽
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section
        id="contacts"
        ref={contactsSection.ref}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <div
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease" }}
          className={contactsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        >
          <div className="bg-white rounded-[2rem] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                  Контакты
                </p>
                <h2 className="text-[56px] leading-[1.1] font-black mb-4 text-foreground">Напишите нам</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                  Ответим в течение нескольких минут в рабочее время.
                  Для срочных вопросов — Telegram.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: "Mail", label: "Email", value: "hello@proxyline.ru" },
                    { icon: "MessageCircle", label: "Telegram", value: "@proxyline_support" },
                    { icon: "Clock", label: "Время работы", value: "Пн–Пт, 9:00–21:00 МСК" },
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

              <form className="space-y-3">
                {[
                  { name: "name", label: "Имя", placeholder: "Иван Иванов", type: "text" },
                  { name: "email", label: "Email", placeholder: "ivan@example.com", type: "email" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs text-muted-foreground mb-1.5 font-bold uppercase tracking-wider">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full bg-secondary rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 transition text-foreground placeholder:text-muted-foreground/60"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-muted-foreground mb-1.5 font-bold uppercase tracking-wider">
                    Сообщение
                  </label>
                  <textarea
                    placeholder="Опишите ваш вопрос..."
                    rows={4}
                    className="w-full bg-secondary rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 transition text-foreground placeholder:text-muted-foreground/60 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 pb-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {[
            "Пользовательское соглашение",
            "Политика конфиденциальности",
            "Статус узлов",
          ].map((label) => (
            <a
              key={label}
              href="#"
              className="flex items-center justify-between px-6 py-4 bg-white hover:bg-secondary rounded-full text-sm font-medium text-foreground transition-colors"
            >
              <span>{label}</span>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
            </a>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <Logo />
          <p className="text-xs text-muted-foreground">
            © 2024 ProxyLine. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}