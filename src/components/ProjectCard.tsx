import { motion } from "framer-motion";
import "./ProjectCard.css";
import { Github, ExternalLink, ServerCog } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectStatus } from "../services/projects";
import { cn, getLocalized } from "../lib/utils";
import type { Project, Lang } from "../lib/types";
import { labels } from "../data/labels";

interface ProjectCardProps {
  project: Project;
  lang: Lang;
  isDark: boolean;
  onOpenEndpoints: (project: Project) => void;
}

export function ProjectCard({
  project,
  lang,
  isDark,
  onOpenEndpoints,
}: ProjectCardProps) {
  const statusQuery = useQuery({
    queryKey: ["project-status", project.id],
    enabled: project.isInteractive && !!project.apiConfig?.baseUrl,
    queryFn: () => fetchProjectStatus(project.apiConfig!),
    retry: 6,
    retryDelay: 30000,
  });

  const projectType = getLocalized(
    project.type as string | Record<Lang, string>,
    lang
  );
  const projectDescription = getLocalized(
    project.description as string | Record<Lang, string>,
    lang
  );

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "rounded-xl p-4 shadow-lg transition-colors",
        isDark
          ? "border border-slate-800/60 bg-slate-900/60 shadow-slate-950/40"
          : "border border-slate-200 bg-white shadow-slate-200/70"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p
            className={cn(
              "text-xs uppercase tracking-wide",
              isDark ? "text-slate-400" : "text-[#a04700] font-semibold"
            )}
          >
            {projectType}
          </p>
          <h3
            className={cn(
              "text-lg font-semibold",
              isDark ? "text-slate-50" : "text-slate-900"
            )}
          >
            {project.title}
          </h3>
        </div>
        {project.isInteractive && (
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
              isDark
                ? "bg-[rgba(235,143,62,0.12)]"
                : "bg-[rgba(235,143,62,0.18)]"
            )}
            data-primary
          >
            <ServerCog className="h-4 w-4" /> API Live
          </span>
        )}
      </div>

      <p
        className={cn(
          "mt-2 text-sm",
          isDark ? "text-slate-300" : "text-slate-700"
        )}
      >
        {projectDescription}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.techs.map((tech) => (
          <span
            key={tech}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              isDark
                ? "bg-slate-800 text-slate-200"
                : "bg-slate-100 text-slate-800"
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        className={cn(
          "mt-4 flex flex-wrap items-center gap-3 text-sm",
          isDark ? "text-slate-300" : "text-slate-700"
        )}
      >
        <a
          className={cn(
            "btn",
            "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold",
            isDark
              ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
              : "bg-slate-900 text-slate-50 hover:bg-slate-800"
          )}
          href={project.repoUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Github className="icon h-4 w-4" /> {labels[lang].repo}
        </a>
        {project.isInteractive && project.apiConfig?.baseUrl && (
          <a
            className={cn(
              "btn",
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold",
              isDark
                ? "bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20"
                : "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
            )}
            href={`${project.apiConfig.baseUrl}${project.apiConfig.placeholder}`}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="icon h-4 w-4" /> {labels[lang].live}
          </a>
        )}
        {project.isInteractive && project.endpoints?.length ? (
          <button
            className={cn(
              "btn",
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors transform cursor-pointer group",
              "hover:scale-105 active:scale-95 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400",
              isDark
                ? "bg-slate-800 text-slate-100 hover:bg-slate-700"
                : "bg-white text-slate-900 hover:bg-slate-100"
            )}
            onClick={() => onOpenEndpoints(project)}
          >
            <ServerCog className="icon h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-(--primary-strong)" />{" "}
            {labels[lang].endpoints}
          </button>
        ) : null}
        {project.isInteractive && (
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold",
              isDark
                ? "bg-slate-800 text-slate-200"
                : "bg-slate-100 text-slate-800"
            )}
          >
            {labels[lang].status}:
            {(statusQuery.isPending || statusQuery.isFetching) && (
              <span className="text-amber-400">Verificando...</span>
            )}
            {statusQuery.isSuccess && (
              <span
                className={cn(
                  statusQuery.data.status === "online"
                    ? isDark
                      ? "status-online-dark font-semibold"
                      : "font-semibold text-[#a04700]"
                    : "text-rose-400"
                )}
              >
                {statusQuery.data.status}
              </span>
            )}
            {statusQuery.isError && (
              <span className="text-rose-400">offline</span>
            )}
          </span>
        )}
      </div>
    </motion.div>
  );
}
