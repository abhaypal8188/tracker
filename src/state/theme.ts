import { create } from 'zustand'
import React from 'react'

type ThemeMode = 'light' | 'dark'

type ThemeState = {
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
}

function getInitial(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const saved = window.localStorage.getItem('theme-mode')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

export const useThemeStore = create<ThemeState>((set) => {
  const mode = getInitial()
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }
  return {
    mode,
    setMode: (m) => {
      document.documentElement.classList.toggle('dark', m === 'dark')
      window.localStorage.setItem('theme-mode', m)
      set({ mode: m })
    },
  }
})

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const { setMode } = useThemeStore()
  React.useEffect(() => {
    // Ensure class is set on mount.
    const saved = window.localStorage.getItem('theme-mode')
    if (saved === 'dark' || saved === 'light') setMode(saved)
  }, [setMode])
  return React.createElement(React.Fragment, null, children)
}

