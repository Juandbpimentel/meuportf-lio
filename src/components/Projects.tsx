import { cn } from '../lib/utils'
import { projects } from '../data/content'
import { labels } from '../data/labels'
import type { Lang } from '../data/labels'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../lib/types'

interface ProjectsProps {
  lang: Lang
  isDark: boolean
  onOpenEndpoints: (project: Project) => void
}

export function Projects({ lang, isDark, onOpenEndpoints }: ProjectsProps) {
  const typedProjects = projects as Project[]
  const visibleProjects = typedProjects.filter((item) => item.enabled !== false)
  const primaryBadge = isDark
    ? 'bg-[rgba(235,143,62,0.12)] text-[var(--primary-strong)] font-semibold'
    : 'bg-[rgba(235,143,62,0.18)] text-[var(--primary-strong)] font-semibold'

  return (
    <section id="projects" className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', primaryBadge)}>{labels[lang].projects}</span>
        <div className={cn('h-px flex-1', isDark ? 'bg-slate-800' : 'bg-slate-200')} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            lang={lang}
            isDark={isDark}
            onOpenEndpoints={onOpenEndpoints}
          />
        ))}
      </div>
    </section>
  )
}
