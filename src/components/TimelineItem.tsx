import { cn } from '../lib/utils'

interface TimelineItemProps {
  title: string
  subtitle: string
  period: string
  description: string
  isDark: boolean
}

export function TimelineItem({ title, subtitle, period, description, isDark }: TimelineItemProps) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-[#EB8F3E]" />
      <p className={cn('text-xs uppercase tracking-wide', isDark ? 'text-slate-400' : 'text-slate-500')}>{period}</p>
      <h3 className={cn('text-base font-semibold', isDark ? 'text-slate-100' : 'text-slate-900')}>{title}</h3>
      <p className={cn('text-sm', isDark ? 'text-slate-300' : 'text-slate-700')}>{subtitle}</p>
      <p className={cn('mt-2 text-sm', isDark ? 'text-slate-300' : 'text-slate-700')}>{description}</p>
    </div>
  )
}
