import { cn, getLocalized } from '../lib/utils'
import { experience } from '../data/content'
import { labels } from '../data/labels'
import type { Lang } from '../data/labels'
import { TimelineItem } from './TimelineItem'

interface ExperienceProps {
  lang: Lang
  isDark: boolean
}

export function Experience({ lang, isDark }: ExperienceProps) {
  const visibleExperience = experience.filter((item) => item.enabled !== false)
  const primaryBadge = isDark
    ? 'bg-[rgba(235,143,62,0.12)] text-[var(--primary-strong)] font-semibold'
    : 'bg-[rgba(235,143,62,0.18)] text-[var(--primary-strong)] font-semibold'
  
  const panelClass = isDark
    ? 'border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-950/40'
    : 'border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-200/40'

  return (
    <section id="experience" className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', primaryBadge)}>{labels[lang].experience}</span>
        <div className={cn('h-px flex-1', isDark ? 'bg-slate-800' : 'bg-slate-200')} />
      </div>
      <div className={cn('space-y-6 rounded-2xl p-6 shadow-md', panelClass)}>
        {visibleExperience.map((job) => (
          <TimelineItem
            key={job.company}
            title={job.company}
            subtitle={getLocalized(job.role as string | Record<Lang, string>, lang)}
            period={job.period}
            description={getLocalized(job.description as string | Record<Lang, string>, lang)}
            isDark={isDark}
          />
        ))}
      </div>
    </section>
  )
}
