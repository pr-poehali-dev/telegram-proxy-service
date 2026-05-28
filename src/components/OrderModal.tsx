import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { useLang } from "@/i18n/LangContext";

type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  serviceName?: string;
  servicePrice?: string;
  gradient?: string;
};

export default function OrderModal({
  open,
  onClose,
  serviceName,
  servicePrice,
  gradient = "from-[#a78bfa] via-[#818cf8] to-[#60a5fa]",
}: OrderModalProps) {
  const { t } = useLang();
  const finalServiceName = serviceName ?? t.hero.site;
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSent(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setSent(true);
    setTimeout(() => {
      setForm({ name: "", phone: "", message: "" });
      onClose();
    }, 2200);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-fade-up"
      >
        {/* Header с градиентом */}
        <div className={`relative px-7 pt-7 pb-6 bg-gradient-to-br ${gradient} text-white overflow-hidden`}>
          <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/20 blur-3xl" />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-colors"
            aria-label="Закрыть"
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
          <p className="text-[11px] uppercase tracking-widest font-bold opacity-80 mb-2 relative">
            {t.modal.title}
          </p>
          <h3 className="relative text-2xl md:text-3xl font-semibold leading-tight pr-10">
            {t.modal.orderFor} «{finalServiceName}»
          </h3>
          {servicePrice && (
            <p className="relative text-white/85 text-sm font-medium mt-2">
              {t.modal.priceHint}: {servicePrice} · {t.modal.replyHint}
            </p>
          )}
        </div>

        {/* Body */}
        {sent ? (
          <div className="px-7 py-12 text-center animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <Icon name="Check" size={32} className="text-green-600" />
            </div>
            <h4 className="text-2xl font-semibold text-foreground mb-2">{t.modal.sentTitle}</h4>
            <p className="text-foreground/65 text-[15px]">{t.modal.sentDesc}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-3">
            <div>
              <label className="block text-xs text-foreground/60 mb-1.5 font-bold uppercase tracking-wider">
                {t.modal.nameLabel}
              </label>
              <input
                type="text"
                placeholder={t.modal.nameLabel}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-secondary rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 transition text-foreground placeholder:text-foreground/40"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground/60 mb-1.5 font-bold uppercase tracking-wider">
                {t.modal.phoneLabel}
              </label>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full bg-secondary rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 transition text-foreground placeholder:text-foreground/40"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground/60 mb-1.5 font-bold uppercase tracking-wider">
                {t.modal.messageLabel}
              </label>
              <textarea
                placeholder={t.modal.messagePlaceholder}
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-secondary rounded-2xl px-5 py-3.5 text-sm outline-none focus:ring-2 focus:ring-accent/40 transition text-foreground placeholder:text-foreground/40 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={!form.name.trim() || !form.phone.trim()}
              className="w-full py-4 bg-foreground text-background text-sm font-bold rounded-full hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity mt-2"
            >
              {t.modal.submitBtn}
            </button>
            <p className="text-[11px] text-foreground/50 text-center pt-1">
              {t.modal.consent}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}