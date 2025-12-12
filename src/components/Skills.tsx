import { cn, getLocalized } from '../lib/utils'
import { skills } from '../data/content'
import { labels } from '../data/labels'
import type { Lang } from '../data/labels'

interface SkillsProps {
  lang: Lang
  isDark: boolean
}

export function Skills({ lang, isDark }: SkillsProps) {
  const visibleSkills = skills.filter((item) => item.enabled !== false)
  const primaryBadge = isDark
    ? 'bg-[rgba(235,143,62,0.12)] text-[var(--primary-strong)] font-semibold'
    : 'bg-[rgba(235,143,62,0.18)] text-[var(--primary-strong)] font-semibold'
  
  const panelClass = isDark
    ? 'border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-950/40'
    : 'border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-200/40'

  return (
    <section id="skills" className="space-y-4">
      <div className="flex items-center gap-3">
        <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', primaryBadge)}>{labels[lang].skills}</span>
        <div className={cn('h-px flex-1', isDark ? 'bg-slate-800' : 'bg-slate-200')} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {visibleSkills.map((group) => {
          const categoryLabel = getLocalized(group.category as string | Record<Lang, string>, lang)
          return (
            <div
              key={categoryLabel || group.techs.join('-')}
              className={cn('rounded-2xl p-4 shadow-md', panelClass)}
            >
              <p className={cn('text-sm font-semibold', isDark ? 'text-slate-100' : 'text-slate-900')}>
                {categoryLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.techs.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      'rounded-full px-3 py-1 text-xs',
                      isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-800'
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
