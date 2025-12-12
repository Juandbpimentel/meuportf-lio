import clsx, { type ClassValue } from 'clsx'
import type { Lang } from '../data/labels'

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs)
}

export const getLocalized = (value: string | Record<Lang, string> | undefined, lang: Lang) => {
  if (!value) return ''
  if (typeof value === 'string') return value
  return value[lang] ?? value.pt ?? value.en ?? ''
}
