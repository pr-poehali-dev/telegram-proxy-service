import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OrderModal from "@/components/OrderModal";
import { getLocalizedServices, getServiceBySlug } from "@/data/services";
import { useLang } from "@/i18n/LangContext";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLang();
  const service = slug ? getServiceBySlug(slug, lang) : undefined;
  const [modalOpen, setModalOpen] = useState(false);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const otherServices = getLocalizedServices(lang).filter((s) => s.slug !== service.slug);
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
          {t.service.backToAll}
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
              <h1 className="font-extrabold text-[44px] md:text-[56px] leading-[1.05] mb-5 animate-fade-up">
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
                  {t.service.orderFor} {service.price}
                </button>
                <button
                  onClick={openModal}
                  className="px-7 py-4 bg-white/15 backdrop-blur-sm text-white text-sm font-bold rounded-full hover:bg-white/25 transition-colors border border-white/20"
                >
                  {t.service.freeConsult}
                </button>
              </div>

              <div className="flex flex-wrap gap-6 text-white/90 animate-fade-up delay-300">
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold opacity-70 mb-0.5">{t.service.term}</p>
                  <p className="text-xl font-bold">{service.duration}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest font-bold opacity-70 mb-0.5">{t.service.price}</p>
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
          {t.service.includesLabel}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-foreground">
          {t.service.includesTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {service.includes.map((item, i) => (
            <div
              key={item.title}
              style={{ animationDelay: `${i * 100}ms` }}
              className="group relative bg-white rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 animate-fade-up overflow-hidden"
            >
              <div
                className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 blur-3xl group-hover:opacity-30 group-hover:scale-125 transition-all duration-500`}
              />
              <div
                className={`relative w-14 h-14 flex items-center justify-center mb-5 rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
              >
                <Icon name={item.icon} fallback="Circle" size={24} />
              </div>
              <h3 className="relative font-bold text-lg mb-2 text-foreground">{item.title}</h3>
              <p className="relative text-[15px] text-foreground/65 leading-relaxed">{item.desc}</p>
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
                {t.service.fullListLabel}
              </p>
              <h2 className="text-[44px] font-semibold mb-4 text-foreground leading-[1.1]">
                {t.service.fullListTitle}
              </h2>
              <p className="text-[15px] text-foreground/65 mb-8 leading-relaxed">
                {t.service.fullListDesc}
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 transition-opacity"
              >
                {t.service.discussProject}
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>

            <div className="space-y-2">
              {service.features.map((feat, i) => (
                <div
                  key={feat}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary/60 transition-colors animate-fade-up"
                >
                  <div
                    className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon name="Check" size={16} className="text-white" />
                  </div>
                  <span className="text-foreground text-[15px] leading-relaxed font-medium">
                    {feat}
                  </span>
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
            {t.service.processLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-foreground">
            {t.service.processTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.stages.map((step, i) => (
              <div
                key={step.num}
                style={{ animationDelay: `${i * 100}ms` }}
                className="group relative bg-white rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 animate-fade-up overflow-hidden"
              >
                <span
                  className="absolute -top-6 -right-2 text-[140px] font-semibold leading-none select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"
                  style={{ color: service.accent }}
                >
                  {step.num}
                </span>
                <div
                  className={`absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-gradient-to-br ${service.gradient} opacity-[0.08] blur-3xl group-hover:opacity-20 transition-opacity duration-500`}
                />

                <div
                  className={`relative w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white shadow-lg mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
                >
                  <span className="font-semibold text-lg">{step.num}</span>
                </div>
                <h3 className="relative font-bold text-lg mb-2 text-foreground">{step.title}</h3>
                <p className="relative text-[15px] text-foreground/65 leading-relaxed mb-5">
                  {step.desc}
                </p>

                {/* Прогресс-полоска */}
                <div className="relative h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${service.gradient} rounded-full`}
                    style={{ width: `${((i + 1) / service.stages.length) * 100}%` }}
                  />
                </div>
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
            <h2 className="text-[44px] md:text-[56px] font-semibold mb-4 leading-[1.1]">
              {t.service.ctaTitle}
            </h2>
            <p className="text-white/90 text-base md:text-lg mb-10 leading-relaxed">
              {t.service.ctaDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={openModal}
                className="px-7 py-4 bg-white text-foreground text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-xl"
              >
                {t.service.ctaOrder} {service.title}
              </button>
              <Link
                to="/#pricing"
                className="px-7 py-4 bg-white/15 backdrop-blur-sm text-white text-sm font-bold rounded-full hover:bg-white/25 transition-colors border border-white/20"
              >
                {t.service.ctaPricing}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-3 text-center">
          {t.service.otherLabel}
        </p>
        <h2 className="text-[44px] md:text-[56px] font-semibold text-center mb-12 text-foreground">
          {t.service.otherTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherServices.map((f) => (
            <Link
              key={f.slug}
              to={`/services/${f.slug}`}
              className="group relative bg-white rounded-3xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div
                className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-20 blur-2xl group-hover:opacity-40 group-hover:scale-125 transition-all duration-500`}
              />

              <div className="relative flex items-start justify-between mb-6">
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} text-white shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}
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
              <div className="relative flex items-center justify-between pt-5 border-t border-secondary">
                <div>
                  <p className="text-[10px] text-foreground/50 uppercase tracking-wider font-bold mb-0.5">
                    {t.service.price}
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