import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme.js'
import { MoonIcon, SunIcon } from './icons.jsx'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 bg-white/80 text-neutral-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-neutral-200 dark:hover:bg-white/10"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.94 }}
      transition={{ duration: 0.2 }}
    >
      {dark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </motion.button>
  )
}
