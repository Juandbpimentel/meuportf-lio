import { Mail } from "lucide-react";
import { cn } from "../lib/utils";
import { labels } from "../data/labels";
import type { Lang } from "../data/labels";
import { useContactForm } from "../hooks/useContactForm";
import { useEffect } from "react";

interface ContactModalProps {
  lang: Lang;
  isDark: boolean;
  open: boolean;
  onClose: () => void;
}

export function ContactModal({
  lang,
  isDark,
  open,
  onClose,
}: ContactModalProps) {
  const { form, onSubmit, mutation } = useContactForm();

  useEffect(() => {
    if (mutation.isSuccess) {
      const t = setTimeout(() => onClose(), 1500);
      return () => clearTimeout(t);
    }
  }, [mutation.isSuccess, onClose]);

  const primaryBadge = isDark
    ? "bg-[rgba(235,143,62,0.12)] text-[var(--primary-strong)] font-semibold"
    : "bg-[rgba(235,143,62,0.18)] text-[var(--primary-strong)] font-semibold";

  const primaryButton = isDark
    ? "bg-(--primary) text-(--primary-contrast) hover:bg-[#d87a28] font-semibold"
    : "bg-[var(--primary)] text-white hover:bg-[#c45f17] font-semibold";

  const panelClass = isDark
    ? "border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-950/40"
    : "border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-200/40";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-10">
      <div
        className={cn(
          "w-full max-w-4xl rounded-2xl p-6 shadow-2xl",
          panelClass
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold",
                primaryBadge
              )}
            >
              {labels[lang].contact}
            </span>
            <div
              className={cn(
                "h-px flex-1",
                isDark ? "bg-slate-800" : "bg-slate-200"
              )}
            />
          </div>
          <button
            className={cn(
              'btn btn--sm rounded-full text-xs font-semibold transition-colors',
              isDark ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            )}
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div
            className={cn(
              "space-y-3 rounded-2xl p-4 shadow-md w-full md:col-span-2",
              panelClass
            )}
          >
            <p
              className={cn(
                "text-sm",
                isDark ? "text-slate-200" : "text-slate-700"
              )}
            >
              {labels[lang].contactDesc}
            </p>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label
                  className={cn(
                    "text-xs font-semibold",
                    isDark ? "text-slate-200" : "text-slate-700"
                  )}
                >
                  Nome
                </label>
                <input
                  {...form.register("name")}
                  className={cn(
                    "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-0",
                    isDark
                      ? "border-slate-700 bg-slate-950 text-slate-100 focus:border-[#EB8F3E]"
                      : "border-slate-300 bg-white text-slate-900 focus:border-[#EB8F3E]"
                  )}
                  placeholder="Seu nome"
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-rose-300">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className={cn(
                    "text-xs font-semibold",
                    isDark ? "text-slate-200" : "text-slate-700"
                  )}
                >
                  E-mail
                </label>
                <input
                  {...form.register("email")}
                  className={cn(
                    "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-0",
                    isDark
                      ? "border-slate-700 bg-slate-950 text-slate-100 focus:border-[#EB8F3E]"
                      : "border-slate-300 bg-white text-slate-900 focus:border-[#EB8F3E]"
                  )}
                  placeholder="voce@email.com"
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-rose-300">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  className={cn(
                    "text-xs font-semibold",
                    isDark ? "text-slate-200" : "text-slate-700"
                  )}
                >
                  Mensagem
                </label>
                <textarea
                  {...form.register("message")}
                  className={cn(
                    "h-28 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-0",
                    isDark
                      ? "border-slate-700 bg-slate-950 text-slate-100 focus:border-[#EB8F3E]"
                      : "border-slate-300 bg-white text-slate-900 focus:border-[#EB8F3E]"
                  )}
                  placeholder="Como posso ajudar?"
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-rose-300">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className={cn(
                    "btn inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-colors disabled:opacity-70",
                    primaryButton,
                    isDark ? "shadow-[#EB8F3E]/30" : "shadow-[#eb8f3e]/35"
                  )}
                >
                  <Mail className="icon h-4 w-4" />{" "}
                  {mutation.isPending ? "Enviando..." : labels[lang].send}
                </button>
                {mutation.isError && (
                  <p className="text-xs text-rose-300">
                    {(mutation.error as Error).message}
                  </p>
                )}
                {mutation.isSuccess && (
                  <p className="text-xs text-emerald-200">Mensagem enviada!</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
