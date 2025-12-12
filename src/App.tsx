import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./hooks/useTheme";
import { cn } from "./lib/utils";
import type { Project, Lang } from "./lib/types";
import { ApiTester } from "./components/ApiTester";
import "./components/Button.css";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import ContactModal from "./components/ContactModal";

function App() {
  const [lang, setLang] = useState<Lang>("pt");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setContactOpen] = useState(false);
  const { setTheme, isDark } = useTheme("auto");

  const pageBg = isDark
    ? "bg-gradient-to-b from-[#0d1424] via-[#0b1222] to-[#0b1222] text-[var(--text-base)]"
    : "bg-gradient-to-b from-[#eceff4] via-[var(--bg-base)] to-[#e6ebf3] text-[var(--text-base)]";

  return (
    <div className={cn("min-h-screen transition-colors", pageBg)}>
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <header
          className={cn(
            "flex flex-wrap items-center justify-end gap-3 rounded-2xl px-5 py-4"
          )}
        >
          <div
            className={cn(
              "flex items-center gap-2 rounded-full p-1 text-xs font-semibold",
              isDark
                ? "border border-slate-700 bg-slate-800/40"
                : "border border-slate-300 bg-white"
            )}
          >
            <button
              className={cn(
                "btn btn--sm flex items-center gap-1 transition-colors",
                !isDark ? "bg-[#EB8F3E] text-white shadow-sm" : "text-slate-200"
              )}
              onClick={() => setTheme("light")}
              aria-label="Tema claro"
            >
              <Sun className="h-4 w-4" />
            </button>
            <button
              className={cn(
                "btn btn--sm flex items-center gap-1 transition-colors",
                isDark
                  ? "bg-[#EB8F3E] text-[#1f1307] shadow-sm"
                  : "text-slate-800"
              )}
              onClick={() => setTheme("dark")}
              aria-label="Tema escuro"
            >
              <Moon className="h-4 w-4" />
            </button>
          </div>

          <div
            className={cn(
              "ml-2 flex rounded-full p-1 text-xs font-semibold",
              isDark
                ? "border border-slate-700 bg-slate-800/40"
                : "border border-slate-300 bg-white"
            )}
          >
            <button
              className={cn(
                "btn btn--sm rounded-full transition-colors",
                lang === "pt"
                  ? isDark
                    ? "bg-[#EB8F3E] text-[#1f1307]"
                    : "bg-[#EB8F3E] text-white"
                  : isDark
                    ? "text-slate-200"
                    : "text-slate-800"
              )}
              onClick={() => setLang("pt")}
            >
              PT
            </button>
            <button
              className={cn(
                "btn btn--sm rounded-full transition-colors",
                lang === "en"
                  ? isDark
                    ? "bg-[#EB8F3E] text-[#1f1307]"
                    : "bg-[#EB8F3E] text-white"
                  : isDark
                    ? "text-slate-200"
                    : "text-slate-800"
              )}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </div>
        </header>

        <Hero
          lang={lang}
          isDark={isDark}
          onOpenContact={() => setContactOpen(true)}
        />
        <Skills lang={lang} isDark={isDark} />
        <Experience lang={lang} isDark={isDark} />
        <Projects
          lang={lang}
          isDark={isDark}
          onOpenEndpoints={setSelectedProject}
        />
        <Education lang={lang} isDark={isDark} />
        {/* Contact is now a modal opened from Hero */}
      </div>

      <ApiTester
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        lang={lang}
        isDark={isDark}
      />
      <ContactModal
        open={isContactOpen}
        onClose={() => setContactOpen(false)}
        lang={lang}
        isDark={isDark}
      />
    </div>
  );
}

export default App;
