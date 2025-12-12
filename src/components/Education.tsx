import { BookOpenText } from 'lucide-react'
import { cn, getLocalized } from '../lib/utils'
import { education, certifications } from '../data/content'
import { labels } from '../data/labels'
import type { Lang } from '../data/labels'

interface EducationProps {
  lang: Lang
  isDark: boolean
}

export function Education({ lang, isDark }: EducationProps) {
  const visibleEducation = education.filter((item) => item.enabled !== false)
  const visibleCertifications = certifications?.filter((item) => item.enabled !== false) ?? []
  const primaryBadge = isDark
    ? 'bg-[rgba(235,143,62,0.12)] text-[var(--primary-strong)] font-semibold'
    : 'bg-[rgba(235,143,62,0.18)] text-[var(--primary-strong)] font-semibold'
  
  const panelClass = isDark
    ? 'border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-950/40'
    : 'border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-200/40'

  return (
    <>
      <section id="education" className="space-y-4">
        <div className="flex items-center gap-3">
          <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', primaryBadge)}>{labels[lang].education}</span>
          <div className={cn('h-px flex-1', isDark ? 'bg-slate-800' : 'bg-slate-200')} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {visibleEducation.map((item) => (
            <div
              key={item.institution}
              className={cn('rounded-2xl p-4 shadow-md', panelClass)}
            >
              <div className={cn('flex items-center gap-2 text-sm', isDark ? 'text-slate-200' : 'text-slate-700')}>
                <BookOpenText className={cn('h-4 w-4', isDark ? 'text-[#f7c48e]' : 'text-[#b45b12]')} />
                <span>{item.institution}</span>
              </div>
              <p className={cn('mt-2 text-sm font-semibold', isDark ? 'text-slate-100' : 'text-slate-900')}>
                {getLocalized(item.degree as string | Record<Lang, string>, lang)}
              </p>
              <p className={cn('text-xs', isDark ? 'text-slate-400' : 'text-slate-600')}>{item.period}</p>
            </div>
          ))}
        </div>
      </section>

      {visibleCertifications.length > 0 && (
        <section id="certifications" className="space-y-4">
          <div className="flex items-center gap-3">
            <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', primaryBadge)}>{labels[lang].certifications}</span>
            <div className={cn('h-px flex-1', isDark ? 'bg-slate-800' : 'bg-slate-200')} />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleCertifications.map((cert) => (
              <div
                key={getLocalized(cert.name as string | Record<Lang, string>, lang) || cert.issuer}
                className={cn('rounded-2xl p-4 shadow-md', panelClass)}
              >
                <p className={cn('text-sm font-semibold', isDark ? 'text-slate-100' : 'text-slate-900')}>
                  {getLocalized(cert.name as string | Record<Lang, string>, lang)}
                </p>
                <p className={cn('text-xs', isDark ? 'text-slate-400' : 'text-slate-600')}>{cert.issuer}</p>
                <p className={cn('mt-2 text-sm', isDark ? 'text-slate-300' : 'text-slate-700')}>
                  {getLocalized(cert.focus as string | Record<Lang, string>, lang)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
