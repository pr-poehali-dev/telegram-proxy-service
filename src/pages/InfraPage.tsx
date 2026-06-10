import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type InfraService = {
  slug: string;
  label: string;
  icon: string;
  gradient: string;
  accent: string;
  tagline: string;
  description: string;
  price: string;
  features: { icon: string; title: string; desc: string }[];
  faq: { q: string; a: string }[];
};

const INFRA: Record<string, InfraService> = {
  domen: {
    slug: "domen",
    label: "Домен",
    icon: "Globe",
    gradient: "from-[#fbbf24] to-[#fb923c]",
    accent: "#ea580c",
    tagline: "Подберём и зарегистрируем красивый домен",
    description:
      "Поможем выбрать звучное и короткое имя для вашего сайта. Зарегистрируем домен в любой зоне — .ru, .com, .рф, .store и других. Настроим DNS, продлим вовремя и защитим от перехвата.",
    price: "от 199 ₽ / год",
    features: [
      { icon: "Search", title: "Подбор имени", desc: "Найдём свободные варианты в нужной зоне" },
      { icon: "ShieldCheck", title: "Защита", desc: "Whois-приватность и блокировка передачи" },
      { icon: "Settings", title: "Настройка DNS", desc: "Привязка к хостингу и почте" },
      { icon: "RefreshCw", title: "Автопродление", desc: "Не потеряете домен по забывчивости" },
    ],
    faq: [
      { q: "В какой зоне лучше регистрировать?", a: "Для российского рынка — .ru или .рф. Для международного — .com. Поможем выбрать по вашему бизнесу." },
      { q: "На кого регистрируется домен?", a: "Домен оформляется на вас — физлицо или компанию. Все права принадлежат вам." },
    ],
  },
  hosting: {
    slug: "hosting",
    label: "Хостинг",
    icon: "Server",
    gradient: "from-[#f472b6] to-[#e879f9]",
    accent: "#db2777",
    tagline: "Быстрый и надёжный хостинг для вашего сайта",
    description:
      "Размещаем сайты на серверах в России с гарантией uptime 99.9%. SSD-диски, ежедневные бэкапы, защита от DDoS и поддержка 24/7. Настроим всё под ключ — вам остаётся только пользоваться.",
    price: "от 250 ₽ / месяц",
    features: [
      { icon: "Zap", title: "SSD-диски", desc: "Сайт загружается за доли секунды" },
      { icon: "Database", title: "Бэкапы", desc: "Резервные копии каждый день" },
      { icon: "ShieldAlert", title: "Anti-DDoS", desc: "Защита от атак включена" },
      { icon: "Headphones", title: "Поддержка 24/7", desc: "Отвечаем в любое время" },
    ],
    faq: [
      { q: "Подходит для интернет-магазина?", a: "Да, мы подберём тариф под нагрузку — от лендинга до магазина с тысячами товаров." },
      { q: "Можно перенести существующий сайт?", a: "Конечно, перенос с другого хостинга — бесплатно." },
    ],
  },
  ssl: {
    slug: "ssl",
    label: "SSL",
    icon: "ShieldCheck",
    gradient: "from-[#a78bfa] to-[#818cf8]",
    accent: "#7c3aed",
    tagline: "Защитим сайт SSL-сертификатом",
    description:
      "Подключим HTTPS, чтобы данные посетителей передавались в зашифрованном виде. Браузеры не покажут предупреждение «Незащищённое соединение», а поисковики оценят это в ранжировании.",
    price: "бесплатно с хостингом",
    features: [
      { icon: "Lock", title: "HTTPS-шифрование", desc: "Безопасный канал для данных" },
      { icon: "Search", title: "Плюс к SEO", desc: "Яндекс и Google любят HTTPS" },
      { icon: "BadgeCheck", title: "Зелёный замок", desc: "Доверие посетителей с первого визита" },
      { icon: "RefreshCw", title: "Автопродление", desc: "Сертификат не закончится внезапно" },
    ],
    faq: [
      { q: "Нужен ли SSL обычному сайту?", a: "Да. Без него браузер показывает предупреждение, а поисковики понижают позиции." },
      { q: "Сколько стоит?", a: "Базовый SSL — бесплатно при заказе хостинга. Расширенные сертификаты — по запросу." },
    ],
  },
  mail: {
    slug: "mail",
    label: "Почта на домене",
    icon: "Mail",
    gradient: "from-[#34d399] to-[#22d3ee]",
    accent: "#0891b2",
    tagline: "Корпоративная почта вида info@вашсайт.ru",
    description:
      "Создадим адреса на вашем домене — солидно для клиентов и удобно для команды. Подключение к Яндекс 360 или Mail.ru для бизнеса, до 1000 ящиков, защита от спама.",
    price: "от 0 ₽ / месяц",
    features: [
      { icon: "AtSign", title: "Свой адрес", desc: "info@, sales@, hello@ — любые ящики" },
      { icon: "Users", title: "Для команды", desc: "Отдельные ящики каждому сотруднику" },
      { icon: "ShieldCheck", title: "Антиспам", desc: "Фильтрация мусора и фишинга" },
      { icon: "Smartphone", title: "На всех устройствах", desc: "Веб, мобильные и десктоп-клиенты" },
    ],
    faq: [
      { q: "Сколько ящиков можно создать?", a: "От 5 до 1000 — зависит от выбранного тарифа Яндекс 360 или VK WorkSpace." },
      { q: "Можно использовать без сайта?", a: "Да, главное чтобы у вас был зарегистрирован домен." },
    ],
  },
};

export default function InfraPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? INFRA[slug] : undefined;

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden px-6 py-16 md:py-24 bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2]">
          <div
            className={`pointer-events-none absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br ${service.gradient} opacity-25 blur-3xl animate-float`}
          />
          <div
            className={`pointer-events-none absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-br ${service.gradient} opacity-20 blur-3xl animate-float`}
            style={{ animationDelay: "1s" }}
          />

          <div className="relative max-w-3xl mx-auto text-center">
            <Link
              to="/#hero"
              className="inline-flex items-center gap-1.5 mb-6 px-4 py-2 bg-white rounded-full shadow-md hover:scale-105 transition-transform"
            >
              <Icon name="ArrowLeft" size={14} />
              <span className="text-xs font-bold uppercase tracking-widest">На главную</span>
            </Link>

            <div
              className={`mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center mb-6 shadow-xl animate-float`}
            >
              <Icon name={service.icon} fallback="Circle" size={36} />
            </div>

            <h1 className="font-extrabold tracking-tight text-foreground text-[48px] md:text-[56px]">
              {service.label}
            </h1>
            <p className="text-base md:text-lg text-foreground/70 max-w-xl mx-auto mt-4">
              {service.tagline}
            </p>

            <div className="inline-flex items-baseline gap-2 mt-8 px-6 py-3 bg-white rounded-full shadow-md">
              <span className="text-[11px] uppercase tracking-widest font-bold text-foreground/50">
                Стоимость
              </span>
              <span className="text-xl font-semibold" style={{ color: service.accent }}>
                {service.price}
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <a
                href="/#contacts"
                className="btn-shine animate-pulse-soft inline-flex items-center gap-2 px-7 py-4 bg-foreground text-background text-sm font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-foreground/20"
              >
                <span className="relative z-10">Заказать</span>
                <Icon name="ArrowRight" size={16} className="relative z-10" />
              </a>
              <a
                href="https://max.ru/@id752905383918_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 px-7 py-4 bg-white text-foreground text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg"
              >
                <Icon name="MessageCircle" size={16} className="relative z-10" />
                <span className="relative z-10">Задать вопрос</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-12">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
            О услуге
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
            Что входит и зачем нужно
          </h2>
          <p className="text-base md:text-lg text-foreground/75 leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
            Что получите
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Преимущества
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-white rounded-3xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500`}
              />
              <div
                className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
              >
                <Icon name={f.icon} fallback="Circle" size={22} />
              </div>
              <h3 className="relative font-bold text-base mb-1 text-foreground">{f.title}</h3>
              <p className="relative text-sm text-foreground/65 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
            Вопросы
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            Частые вопросы
          </h2>
        </div>
        <div className="space-y-3">
          {service.faq.map((item) => (
            <div key={item.q} className="bg-white rounded-3xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-foreground mb-2 flex items-start gap-3">
                <span
                  className={`w-8 h-8 shrink-0 rounded-xl bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center text-sm font-semibold`}
                >
                  ?
                </span>
                <span className="leading-snug">{item.q}</span>
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed pl-11">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2] px-6 py-12 md:py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Готовы подключить {service.label.toLowerCase()}?
          </h2>
          <p className="text-base text-foreground/70 max-w-xl mx-auto mb-8">
            Оставьте заявку — настроим всё под ключ и расскажем как это работает.
          </p>
          <a
            href="/#contacts"
            className="btn-shine animate-pulse-soft inline-flex items-center gap-2 px-7 py-4 bg-foreground text-background text-sm font-bold rounded-full hover:scale-105 transition-all shadow-xl"
          >
            <span className="relative z-10">Оставить заявку</span>
            <Icon name="ArrowRight" size={16} className="relative z-10" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}