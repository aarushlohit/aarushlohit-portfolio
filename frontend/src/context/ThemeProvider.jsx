import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './theme-context.js'

const STORAGE_KEY = 'portfolio-theme'

function getSystemDark() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
    return getSystemDark() ? 'dark' : 'light'
  })

  const resolved = theme === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute(
        'content',
        resolved === 'dark' ? '#0a0a0a' : '#fafafa',
      )
    }
  }, [resolved])

  const setTheme = useCallback((next) => {
    setThemeState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((t) => {
      const n = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem(STORAGE_KEY, n)
      return n
    })
  }, [])

  const value = useMemo(
    () => ({ theme: resolved, setTheme, toggleTheme }),
    [resolved, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
