import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Контакты", href: "#contacts" },
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
    name: "Старт",
    price: "490",
    period: "мес",
    desc: "Для личных задач",
    features: ["5 прокси", "10 Гб трафика", "HTTP/HTTPS", "Поддержка 9–21"],
    highlight: false,
  },
  {
    name: "Про",
    price: "1 490",
    period: "мес",
    desc: "Для бизнеса",
    features: [
      "50 прокси",
      "100 Гб трафика",
      "HTTP/HTTPS/SOCKS5",
      "Приоритетная поддержка",
      "Ротация IP",
    ],
    highlight: true,
  },
  {
    name: "Бизнес",
    price: "4 990",
    period: "мес",
    desc: "Для команд и агентств",
    features: [
      "Безлимит прокси",
      "Безлимит трафик",
      "Все протоколы",
      "Поддержка 24/7",
      "Выделенный менеджер",
    ],
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
    <div className="border border-border rounded-lg p-6 bg-card max-w-lg w-full">
      <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">
        Бесплатный тест
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Введите IP или домен прокси"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTest()}
          className="flex-1 border border-border rounded-md px-3 py-2 text-sm font-mono outline-none focus:border-primary/60 transition-colors bg-background text-foreground placeholder:text-muted-foreground/40"
        />
        <button
          onClick={handleTest}
          disabled={loading || !ip.trim()}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          {loading ? "..." : "Проверить"}
        </button>
      </div>

      {step === "testing" && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
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
            <div key={item.label} className="bg-secondary rounded-md px-3 py-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                {item.label}
              </p>
              <p className="text-sm font-mono font-medium truncate text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
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
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#hero" className="font-bold text-base tracking-tight text-foreground">
            Proxy<span className="font-light text-primary">Line</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#pricing"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:opacity-90 transition-opacity"
          >
            Начать
          </a>

          <button
            className="md:hidden p-1 text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-primary"
            >
              Начать →
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        ref={heroSection.ref}
        className="pt-32 pb-24 px-6 max-w-5xl mx-auto"
      >
        <div
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease" }}
          className={heroSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Все серверы работают
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
            Прокси без
            <br />
            <span className="text-primary">компромиссов</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
            Резидентные и дата-центровые прокси для бизнеса и личных задач.
            Попробуйте бесплатно — без регистрации.
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <a
              href="#pricing"
              className="px-6 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              Выбрать тариф
            </a>
            <a
              href="#test"
              className="px-6 py-3 border border-border text-foreground text-sm font-medium rounded-md hover:border-primary/50 transition-colors"
            >
              Тест бесплатно
            </a>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              ["200+", "стран"],
              ["99.9%", "uptime"],
              ["< 20 мс", "задержка"],
              ["24/7", "поддержка"],
            ].map(([val, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-foreground">{val}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-border max-w-5xl mx-auto px-6" />

      {/* FEATURES */}
      <section
        ref={featuresSection.ref}
        className="py-20 px-6 max-w-5xl mx-auto"
      >
        <div
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease" }}
          className={featuresSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-10">
            Возможности
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-background p-8 group">
                <div className="w-8 h-8 flex items-center justify-center mb-4 text-primary/50 group-hover:text-primary transition-colors">
                  <Icon name={f.icon} fallback="Circle" size={20} />
                </div>
                <h3 className="font-semibold text-base mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEST WIDGET */}
      <section id="test" className="py-16 px-6 bg-secondary/40 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Проверить прокси
          </p>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Протестируйте до покупки</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Введите IP прокси и убедитесь в качестве соединения — бесплатно и без регистрации.
          </p>
          <TestWidget />
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        ref={pricingSection.ref}
        className="py-20 px-6 max-w-5xl mx-auto"
      >
        <div
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease" }}
          className={pricingSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Тарифы
          </p>
          <h2 className="text-3xl font-bold mb-10 text-foreground">Простые цены</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-6 flex flex-col ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground ring-2 ring-primary"
                    : "border border-border bg-card"
                }`}
              >
                <p
                  className={`text-xs font-mono uppercase tracking-widest mb-4 ${
                    plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}
                >
                  {plan.desc}
                </p>
                <p className="text-4xl font-bold mb-1">
                  {plan.price}
                  <span
                    className={`text-sm font-normal ml-1 ${
                      plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                    }`}
                  >
                    ₽/{plan.period}
                  </span>
                </p>
                <p className="font-semibold text-lg mb-6">{plan.name}</p>

                <ul className="flex-1 space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Icon
                        name="Check"
                        size={14}
                        className={plan.highlight ? "text-primary-foreground/70" : "text-primary"}
                      />
                      <span className={plan.highlight ? "text-primary-foreground/85" : "text-muted-foreground"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2.5 text-sm font-medium rounded-md transition-opacity ${
                    plan.highlight
                      ? "bg-primary-foreground text-primary hover:opacity-90"
                      : "border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  Выбрать
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVIDER */}
      <div className="border-t border-border max-w-5xl mx-auto px-6" />

      {/* CONTACTS */}
      <section
        id="contacts"
        ref={contactsSection.ref}
        className="py-20 px-6 max-w-5xl mx-auto"
      >
        <div
          style={{ transition: "opacity 0.7s ease, transform 0.7s ease" }}
          className={contactsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
                Контакты
              </p>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Напишите нам</h2>
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
                    <div className="w-8 h-8 flex items-center justify-center border border-border rounded-md mt-0.5">
                      <Icon name={c.icon} fallback="Circle" size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{c.label}</p>
                      <p className="text-sm font-medium text-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="space-y-4">
              {[
                { name: "name", label: "Имя", placeholder: "Иван Иванов", type: "text" },
                { name: "email", label: "Email", placeholder: "ivan@example.com", type: "email" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-xs text-muted-foreground mb-1.5">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors bg-background text-foreground placeholder:text-muted-foreground/40"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs text-muted-foreground mb-1.5">
                  Сообщение
                </label>
                <textarea
                  placeholder="Опишите ваш вопрос..."
                  rows={4}
                  className="w-full border border-border rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary/60 transition-colors bg-background text-foreground placeholder:text-muted-foreground/40 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-sm text-foreground">
            Proxy<span className="font-light text-primary">Line</span>
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 ProxyLine. Все права защищены.
          </p>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
