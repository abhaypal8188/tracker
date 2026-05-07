import React from 'react'
import { useThemeStore } from '../../state/theme'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export function ThemeToggle() {
  const { mode, setMode } = useThemeStore()
  const next = mode === 'dark' ? 'light' : 'dark'

  return (
    <button
      onClick={() => setMode(next)}
      className="rounded-xl px-3 py-2 glass-strong hover:bg-white/60 dark:hover:bg-white/10 transition"
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? <MdDarkMode className="h-4 w-4 text-slate-200" /> : <MdLightMode className="h-4 w-4 text-slate-700" />}
    </button>
  )
}

