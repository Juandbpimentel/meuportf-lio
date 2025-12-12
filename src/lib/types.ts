import { projects } from '../data/content'
import type { Lang } from '../data/labels'

export type { Lang }

export type ProjectEndpoint = {
  method: string
  path: string
  description: string | Record<Lang, string>
  docsUrl?: string
  sampleBody?: unknown
  pathParams?: Array<{ name: string; placeholder?: string; label?: string }>
}

export type Project = Omit<(typeof projects)[number], 'endpoints'> & { endpoints?: ProjectEndpoint[] }
