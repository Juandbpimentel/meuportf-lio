import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'theme-preference'

function getSystemPrefersDark() {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches
}

export function useTheme(initial: Theme = 'auto') {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
        if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored
        return initial
    })
    const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => getSystemPrefersDark())

    useEffect(() => {
        const root = document.documentElement
        const effectiveDark = theme === 'auto' ? systemPrefersDark : theme === 'dark'
        root.classList.toggle('dark', effectiveDark)
        if (theme) {
            localStorage.setItem(STORAGE_KEY, theme)
        }
    }, [theme, systemPrefersDark])

    useEffect(() => {
        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (event: MediaQueryListEvent) => {
            setSystemPrefersDark(event.matches)
        }
        mql.addEventListener('change', handler)
        return () => mql.removeEventListener('change', handler)
    }, [])

    const isDark = theme === 'dark' || (theme === 'auto' && systemPrefersDark)

    return { theme, setTheme, isDark }
}
