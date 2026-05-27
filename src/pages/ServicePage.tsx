import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OrderModal from "@/components/OrderModal";
import { SERVICES, getServiceBySlug } from "@/data/services";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const [modalOpen, setModalOpen] = useState(false);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);
  const openModal = () => setModalOpen(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="pt-28 pb-12 px-4 max-w-7xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground mb-4 font-medium transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Все услуги
        </Link>

        <div
          className={`relative rounded-[2rem] overflow-hidden px-6 md:px-16 py-16 md:py-20 bg-gradient-to-br ${service.gradient}`}
        >
          <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/20 blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-widest mb-5">
                {service.badge}
              </span>
              <h1 className="font-black text-[44px] md:text-[56px] leading-[1.05] mb-5 animate-fade-up">
                {service.title}
              </h1>
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-md animate-fade-up delay-100">
                {service.short}
              </p>

              <div className="flex flex-wrap gap-3 mb-8 animate-fade-up delay-200">
                <button
                  onClick={openModal}
                  className="px-7 py-4 bg-white text-foreground text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
                >
                  Заказать {service.price}
                </button>
                <button
                  onClick={openModal}
                  className="px-7 py-4 bg-white/15 backdrop-blur-sm text-white text-sm font-bold rounded-full hover:bg-white/25 transition-colors border border-white/20"
                >
                  Бесплатная консультация
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-white/90 animate-fade-up delay-300">
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold opacity-70 mb-0.5">Срок</p>
                  <p className="text-xl font-bold">{service.duration}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold opacity-70 mb-0.5">Цена</p>
                  <p className="text-xl font-bold">{service.price}</p>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center animate-float">
              <div className="w-64 h-64 rounded-[3rem] bg-white/15 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20">
                <Icon name={service.icon} size={120} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUDES */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
          Что входит
        </p>
        <h2 className="text-[44px] md:text-[56px] font-black text-center mb-12 text-foreground">
          В стоимость включено
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.includes.map((item, i) => (
            <div
              key={item.title}
              style={{ animationDelay: `${i * 100}ms` }}
              className="bg-white rounded-3xl p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-up"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center mb-5 rounded-2xl bg-gradient-to-br ${service.gradient} text-white`}
              >
                <Icon name={item.icon} fallback="Circle" size={22} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="text-[15px] text-foreground/65 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES LIST */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-[2rem] p-8 md:p-14">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3">
                Полный список
              </p>
              <h2 className="text-[44px] font-black mb-4 text-foreground leading-[1.1]">
                Все возможности услуги
              </h2>
              <p className="text-[15px] text-foreground/65 mb-8 leading-relaxed">
                Никаких скрытых платежей. Всё, что нужно для запуска, уже в цене.
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
              >
                Обсудить проект
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {service.features.map((feat, i) => (
                <div
                  key={feat}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="flex items-start gap-3 animate-fade-up"
                >
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                  <span className="text-foreground text-[15px] leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-[#d6d8f7] via-[#e3e5fa] to-[#ecdcf2] rounded-[2rem] px-6 md:px-16 py-16">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
            Процесс
          </p>
          <h2 className="text-[44px] md:text-[56px] font-black mb-12 text-center text-foreground">
            Этапы работы
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.stages.map((step, i) => (
              <div
                key={step.num}
                style={{ animationDelay: `${i * 100}ms` }}
                className="relative bg-white rounded-3xl p-7 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-up overflow-hidden"
              >
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 blur-2xl`}
                />
                <p
                  className="relative text-4xl font-black mb-3"
                  style={{ color: service.accent }}
                >
                  {step.num}
                </p>
                <p className="relative font-bold text-lg mb-1 text-foreground">{step.title}</p>
                <p className="relative text-[15px] text-foreground/65 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div
          className={`relative rounded-[2rem] overflow-hidden px-6 md:px-16 py-16 md:py-20 text-center bg-gradient-to-br ${service.gradient}`}
        >
          <div className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/30 blur-3xl" />
          <div className="relative max-w-2xl mx-auto text-white">
            <h2 className="text-[44px] md:text-[56px] font-black mb-4 leading-[1.1]">
              Готовы начать?
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-10 leading-relaxed">
              Расскажите о своём проекте — пришлём смету и план работ в течение часа.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={openModal}
                className="px-7 py-4 bg-white text-foreground text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
              >
                Заказать {service.title.toLowerCase()}
              </button>
              <Link
                to="/#pricing"
                className="px-7 py-4 bg-white/15 backdrop-blur-sm text-white text-sm font-bold rounded-full hover:bg-white/25 transition-colors border border-white/20"
              >
                Смотреть тарифы
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
          Другие услуги
        </p>
        <h2 className="text-[44px] md:text-[56px] font-black text-center mb-12 text-foreground">
          Может быть интересно
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherServices.map((f) => (
            <Link
              key={f.slug}
              to={`/services/${f.slug}`}
              className="group relative bg-white rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-20 blur-2xl group-hover:opacity-40 transition-all duration-500`}
              />
              <div
                className={`relative w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} text-white shadow-lg mb-5 group-hover:scale-110 transition-transform`}
              >
                <Icon name={f.icon} fallback="Circle" size={24} />
              </div>
              <h3 className="relative font-bold text-xl mb-2 text-foreground">{f.title}</h3>
              <p className="relative text-[15px] text-foreground/65 leading-relaxed mb-6">
                {f.desc}
              </p>
              <div className="relative flex items-center justify-between pt-5 border-t border-secondary">
                <p className="text-sm font-bold text-foreground">{f.price}</p>
                <Icon name="ArrowRight" size={18} className="text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceName={service.title}
        servicePrice={service.price}
        gradient={service.gradient}
      />

      <SiteFooter />
    </div>
  );
}