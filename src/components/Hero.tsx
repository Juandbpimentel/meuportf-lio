import { useMemo } from "react";
import { ArrowRight, Mail, MapPin, Github, Linkedin } from "lucide-react";
import { cn, getLocalized } from "../lib/utils";
import { profile, avatarPath } from "../data/content";
import { labels } from "../data/labels";
import type { Lang } from "../data/labels";
import "./Hero.css";

interface HeroProps {
  lang: Lang;
  isDark: boolean;
  onOpenContact?: () => void;
}

export function Hero({ lang, isDark, onOpenContact }: HeroProps) {
  const heroText = useMemo(
    () => ({
      greeting: lang === "pt" ? "Olá, eu sou" : "Hi, I am",
      subtitle:
        lang === "pt"
          ? "Backend focado em APIs escaláveis, dados e arquiteturas robustas."
          : "Backend engineer focused on scalable APIs, data, and robust architectures.",
    }),
    [lang]
  );

  const localizedRole = getLocalized(profile.role, lang);
  const localizedSummary = getLocalized(profile.summary, lang);

  const primaryButton = isDark
    ? "bg-(--primary) text-(--primary-contrast) hover:bg-[#d87a28] font-semibold"
    : "bg-[var(--primary)] text-white hover:bg-[#c45f17] font-semibold";

  const panelClass = isDark
    ? "border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-950/40"
    : "border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-200/40";

  return (
    <section
      className={cn(
        "grid gap-8 rounded-3xl p-8 shadow-xl lg:grid-cols-[1.2fr_0.8fr]",
        panelClass
      )}
    >
      <div className="space-y-6">
        <p
          className={cn("text-sm uppercase tracking-[0.25rem] font-semibold")}
          data-primary
        >
          {heroText.greeting}
        </p>
        <h1
          className={cn(
            "text-4xl font-semibold sm:text-5xl",
            isDark ? "text-slate-50" : "text-var-text-base"
          )}
        >
          {profile.name}
        </h1>
        <p className="text-lg font-semibold" data-primary>
          {localizedRole}
        </p>
        <p
          className={cn(
            "max-w-2xl",
            isDark ? "text-slate-200" : "text-var-muted"
          )}
        >
          {localizedSummary}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition-colors",
              primaryButton,
              isDark ? "shadow-[#EB8F3E]/30" : "shadow-[#eb8f3e]/35"
            )}
            href="#projects"
          >
            {labels[lang].heroCta} <ArrowRight className="h-4 w-4" />
          </a>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onOpenContact}
              className={cn(
                "btn inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold",
                isDark
                  ? "bg-(--primary) text-(--primary-contrast) hover:bg-[#d87a28]"
                  : "bg-(--primary) text-white hover:bg-[#c45f17]"
              )}
            >
              <Mail className="icon h-4 w-4" /> {labels[lang].heroSecondary}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-2",
              isDark
                ? "bg-slate-800/80 text-slate-100"
                : "bg-slate-100 text-slate-800"
            )}
          >
            <MapPin className="h-4 w-4" /> {profile.location}
          </span>
          <a
            className={cn(
              "btn btn--sm inline-flex items-center gap-2 rounded-full px-3 py-2 transition-colors",
              isDark
                ? "bg-slate-800/80 text-slate-100 hover:bg-slate-700"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            )}
            href={`mailto:${profile.email}`}
          >
            <Mail className="icon h-4 w-4" /> Email
          </a>
          <a
            className={cn(
              "btn btn--sm inline-flex items-center gap-2 rounded-full px-3 py-2 transition-colors",
              isDark
                ? "bg-slate-800/80 text-slate-100 hover:bg-slate-700"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            )}
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            className={cn(
              "btn btn--sm inline-flex items-center gap-2 rounded-full px-3 py-2 transition-colors",
              isDark
                ? "bg-slate-800/80 text-slate-100 hover:bg-slate-700"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            )}
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </div>

      <div className={cn("flex flex-col gap-4 rounded-2xl p-6", panelClass)}>
        <div className="h-86 w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-800/60">
          <img
            src={avatarPath}
            alt={profile.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className={cn(
            "space-y-2 text-sm",
            isDark ? "text-slate-200" : "text-slate-700"
          )}
        >
          <p></p>
          <p className="font-semibold" data-primary>
            {lang === "pt"
              ? "Disponível para consultoria, freelas ou posições backend/data."
              : "Available for consulting, freelance, or backend/data roles."}
          </p>
        </div>
      </div>
    </section>
  );
}
