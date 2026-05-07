import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdNotifications } from 'react-icons/md'
import { useThemeStore } from '../../state/theme'
import { useAuthStore } from '../../state/auth'
import { ThemeToggle } from '../theme/ThemeToggle'

export function Topbar() {
  const navigate = useNavigate()
  const { mode } = useThemeStore()
  const { isAuthed, user } = useAuthStore()
  const userName = user?.name?.trim() || 'Alex'

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/35 backdrop-blur-12 dark:border-white/10 dark:bg-black/15">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="lg:hidden grid h-9 w-9 place-items-center rounded-xl glass-strong">
            <span className="text-lg">$</span>
          </div>
          <h1 className="hidden sm:block text-base font-semibold text-slate-900 dark:text-slate-50">Expense Tracker</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative rounded-xl px-3 py-2 glass-strong hover:bg-white/60 dark:hover:bg-white/10 transition">
            <MdNotifications className="h-4 w-4 text-slate-700 dark:text-slate-200" />
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-sky-500 text-[10px] font-bold text-white">
              3
            </span>
          </button>
          <ThemeToggle />
          <Link
            to="/profile"
            className="ml-1 hidden sm:flex items-center gap-3 rounded-xl px-3 py-2 glass-strong hover:bg-white/60 dark:hover:bg-white/10 transition"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600" />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-50">{userName}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{mode === 'dark' ? 'Pro' : 'Studio'}</div>
            </div>
          </Link>
          <button
            onClick={() => {
              if (!isAuthed) navigate('/login')
              else navigate('/profile')
            }}
            className="sm:hidden rounded-xl px-3 py-2 glass-strong"
            aria-label="Profile"
          >
            <span className="font-bold">{userName.charAt(0).toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

