import { useState, useEffect, useMemo } from 'react'
import './ApiTester.css'
import { cn, getLocalized } from '../lib/utils'
import type { Project, Lang } from '../lib/types'
import { labels } from '../data/labels'

interface ApiTesterProps {
  project: Project | null
  onClose: () => void
  lang: Lang
  isDark: boolean
}

export function ApiTester({ project, onClose, lang, isDark }: ApiTesterProps) {
  const [activeEndpointIndex, setActiveEndpointIndex] = useState(0)
  const [baseUrlInput, setBaseUrlInput] = useState('')
  const [requestBody, setRequestBody] = useState('')
  const [responsePreview, setResponsePreview] = useState('')
  const [requestError, setRequestError] = useState<string | null>(null)
  const [pathParamValues, setPathParamValues] = useState<Record<string, string>>({})
  const [isSendingRequest, setIsSendingRequest] = useState(false)

  const activeEndpoint = project?.endpoints?.[activeEndpointIndex] ?? null

  useEffect(() => {
    if (!project) return

    setBaseUrlInput(project.apiConfig?.baseUrl ?? '')
    setActiveEndpointIndex(0)
    setResponsePreview('')
    setRequestError(null)
  }, [project])

  useEffect(() => {
    if (!activeEndpoint) return

    const initialParams: Record<string, string> = {}
    activeEndpoint.pathParams?.forEach((param) => {
      initialParams[param.name] = ''
    })
    setPathParamValues(initialParams)
    if (activeEndpoint.sampleBody) {
      setRequestBody(JSON.stringify(activeEndpoint.sampleBody, null, 2))
    } else {
      setRequestBody('')
    }
    setResponsePreview('')
    setRequestError(null)
  }, [activeEndpoint])

  const resolvedPath = useMemo(() => {
    if (!activeEndpoint) return ''
    return activeEndpoint.pathParams?.reduce((acc, param) => {
      return acc.replace(`:${param.name}`, pathParamValues[param.name] || `:${param.name}`)
    }, activeEndpoint.path) ?? activeEndpoint.path
  }, [activeEndpoint, pathParamValues])

  const finalUrl = baseUrlInput && resolvedPath ? `${baseUrlInput}${resolvedPath}` : ''

  const endpointDocsUrl = useMemo(() => {
    if (!activeEndpoint) return ''
    if (activeEndpoint.docsUrl) return activeEndpoint.docsUrl
    if (project?.apiConfig?.placeholder && baseUrlInput) {
      return `${baseUrlInput}${project.apiConfig.placeholder}`
    }
    return ''
  }, [activeEndpoint, baseUrlInput, project])

  const resetBodyToExample = () => {
    if (activeEndpoint?.sampleBody) {
      setRequestBody(JSON.stringify(activeEndpoint.sampleBody, null, 2))
    }
  }

  const handleSendRequest = async () => {
    if (!activeEndpoint || !finalUrl) return

    const missingParam = activeEndpoint.pathParams?.find((param) => !pathParamValues[param.name])
    if (missingParam) {
      setRequestError(`${labels[lang].pathParams}: ${missingParam.name}`)
      return
    }

    let parsedBody: string | undefined
    if (activeEndpoint.method !== 'GET') {
      const raw = requestBody.trim()
      if (raw) {
        try {
          parsedBody = JSON.stringify(JSON.parse(raw))
        } catch {
          setRequestError('JSON inválido no body')
          return
        }
      }
    }

    setIsSendingRequest(true)
    setRequestError(null)
    setResponsePreview('')

    try {
      const response = await fetch(finalUrl, {
        method: activeEndpoint.method,
        headers: parsedBody ? { 'Content-Type': 'application/json' } : undefined,
        body: parsedBody,
      })

      const contentType = response.headers.get('content-type') ?? ''
      if (contentType.includes('application/pdf')) {
        setResponsePreview(`PDF recebido (status ${response.status}). Download não é exibido aqui.`)
      } else if (contentType.includes('application/json')) {
        const data = await response.json()
        setResponsePreview(JSON.stringify(data, null, 2))
      } else {
        const text = await response.text()
        setResponsePreview(text)
      }

      if (!response.ok) {
        setRequestError(`Status ${response.status}`)
      }
    } catch (error) {
      setRequestError((error as Error).message)
    } finally {
      setIsSendingRequest(false)
    }
  }

  if (!project) return null

  const panelClass = isDark
    ? 'border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-950/40'
    : 'border border-[var(--panel-border)] bg-[var(--bg-panel)] text-[var(--text-base)] shadow-lg shadow-slate-200/40'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-10">
      <div className={cn('w-full max-w-4xl rounded-2xl p-6 shadow-2xl', panelClass)}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" data-primary>
              {getLocalized(project.type as string | Record<Lang, string>, lang)}
            </p>
            <h3 className={cn('text-xl font-semibold', isDark ? 'text-slate-50' : 'text-slate-900')}>
              {project.title}
            </h3>
            {project.apiConfig?.baseUrl && (
              <p className={cn('text-xs', isDark ? 'text-slate-400' : 'text-slate-600')}>
                {project.apiConfig.baseUrl}
              </p>
            )}
          </div>
          <button
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
              isDark ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
            )}
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        {project.endpoints?.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className={cn('text-xs font-semibold', isDark ? 'text-slate-200' : 'text-slate-700')}>
                  {labels[lang].baseUrl}
                </label>
                <input
                  value={baseUrlInput}
                  onChange={(e) => setBaseUrlInput(e.target.value)}
                  className={cn(
                    'w-full rounded-lg border px-3 py-2 text-sm',
                    isDark
                      ? 'border-slate-800 bg-slate-900 text-slate-100 focus:border-[#EB8F3E]'
                      : 'border-slate-200 bg-white text-slate-900 focus:border-[#EB8F3E]'
                  )}
                  placeholder="https://sua-api.com"
                />
              </div>

              <div className="space-y-2">
                <label className={cn('text-xs font-semibold', isDark ? 'text-slate-200' : 'text-slate-700')}>
                  {labels[lang].endpointSelect}
                </label>
                <select
                  value={activeEndpointIndex}
                  onChange={(e) => setActiveEndpointIndex(Number(e.target.value))}
                  className={cn(
                    'w-full rounded-lg border px-3 py-2 text-sm',
                    isDark
                      ? 'border-slate-800 bg-slate-900 text-slate-100 focus:border-[#EB8F3E]'
                      : 'border-slate-200 bg-white text-slate-900 focus:border-[#EB8F3E]'
                  )}
                >
                  {project.endpoints.map((ep, idx) => (
                    <option key={`${ep.method}-${ep.path}-${idx}`} value={idx}>
                      {ep.method} {ep.path}
                    </option>
                  ))}
                </select>
              </div>

              {activeEndpoint?.pathParams?.length ? (
                <div className="space-y-2">
                  <p className={cn('text-xs font-semibold', isDark ? 'text-slate-200' : 'text-slate-700')}>
                    {labels[lang].pathParams}
                  </p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {activeEndpoint.pathParams.map((param) => (
                      <input
                        key={param.name}
                        value={pathParamValues[param.name] ?? ''}
                        onChange={(e) =>
                          setPathParamValues((prev) => ({
                            ...prev,
                            [param.name]: e.target.value,
                          }))
                        }
                        className={cn(
                          'w-full rounded-lg border px-3 py-2 text-sm',
                          isDark
                            ? 'border-slate-800 bg-slate-900 text-slate-100 focus:border-[#EB8F3E]'
                            : 'border-slate-200 bg-white text-slate-900 focus:border-[#EB8F3E]'
                        )}
                        placeholder={param.placeholder ?? param.name}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {activeEndpoint && (
                <div
                  className={cn(
                    'space-y-2 rounded-xl border px-4 py-3',
                    isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
                  )}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-[11px] uppercase tracking-wide',
                        activeEndpoint.method === 'POST'
                          ? isDark
                            ? 'bg-emerald-500/15 text-emerald-200'
                            : 'bg-emerald-100 text-emerald-900'
                          : isDark
                            ? 'bg-slate-800 text-slate-200'
                            : 'bg-slate-100 text-slate-800'
                      )}
                    >
                      {activeEndpoint.method}
                    </span>
                    <span className={cn('font-mono text-xs', isDark ? 'text-slate-200' : 'text-slate-800')}>
                      {resolvedPath}
                    </span>
                  </div>
                  <p className={cn('text-sm', isDark ? 'text-slate-300' : 'text-slate-700')}>
                    {getLocalized(activeEndpoint.description as string | Record<Lang, string>, lang)}
                  </p>
                  <div className={cn('rounded-lg px-3 py-2 text-xs', isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-800')}>
                    <p className="font-semibold">{labels[lang].finalUrl}</p>
                    <p className="font-mono break-all">{finalUrl || `${baseUrlInput}${activeEndpoint.path}`}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {endpointDocsUrl && (
                      <a
                        className={cn('btn',
                          'inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors',
                          isDark ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-slate-100'
                        )}
                        href={endpointDocsUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {labels[lang].viewDocs}
                      </a>
                    )}
                    {Boolean(activeEndpoint.sampleBody) && (
                      <button
                        className={cn('btn',
                          'inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition-colors',
                          isDark ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' : 'bg-white text-slate-900 hover:bg-slate-100'
                        )}
                        onClick={resetBodyToExample}
                        type="button"
                      >
                        {labels[lang].resetExample}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className={cn('text-xs font-semibold', isDark ? 'text-slate-200' : 'text-slate-700')}>
                  {labels[lang].requestBody}
                </p>
                {isSendingRequest && <span className="text-[11px] text-amber-400">Enviando...</span>}
              </div>

              {activeEndpoint?.method === 'GET' && !activeEndpoint.sampleBody ? (
                <p className={cn('text-sm', isDark ? 'text-slate-300' : 'text-slate-700')}>
                  {labels[lang].noBodyRequired}
                </p>
              ) : (
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className={cn(
                    'h-48 w-full rounded-lg border px-3 py-2 font-mono text-xs',
                    isDark
                      ? 'border-slate-800 bg-slate-900 text-slate-100 focus:border-[#EB8F3E]'
                      : 'border-slate-200 bg-white text-slate-900 focus:border-[#EB8F3E]'
                  )}
                  placeholder='{ "message": "Hello" }'
                />
              )}

              <button
                type="button"
                disabled={isSendingRequest || !finalUrl}
                onClick={handleSendRequest}
                className={cn(
                  'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors disabled:opacity-60',
                  isDark ? 'bg-[#EB8F3E] text-[#1f1307] hover:bg-[#d87a28]' : 'bg-[#EB8F3E] text-white hover:bg-[#c45f17]'
                )}
              >
                {labels[lang].sendRequest}
              </button>

              {requestError && <p className="text-xs text-rose-300">{requestError}</p>}

              {responsePreview && (
                <div className={cn('space-y-1 rounded-xl border px-3 py-2', isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white')}>
                  <p className={cn('text-xs font-semibold', isDark ? 'text-slate-200' : 'text-slate-700')}>
                    {labels[lang].response}
                  </p>
                  <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all text-xs">{responsePreview}</pre>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className={cn('mt-4 text-sm', isDark ? 'text-slate-300' : 'text-slate-700')}>
            Nenhum endpoint cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  )
}
