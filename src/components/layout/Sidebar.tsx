import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdDashboard, MdOutlineReceiptLong, MdBarChart, MdOutlineSavings, MdAccountBalanceWallet, MdAssessment, MdPerson } from 'react-icons/md'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: MdDashboard },
  { to: '/transactions', label: 'Transactions', icon: MdOutlineReceiptLong },
  { to: '/analytics', label: 'Analytics', icon: MdBarChart },
  { to: '/budgets', label: 'Budgets', icon: MdOutlineSavings },
  { to: '/wallets', label: 'Wallets', icon: MdAccountBalanceWallet },
  { to: '/reports', label: 'Reports', icon: MdAssessment },
  { to: '/profile', label: 'Profile', icon: MdPerson },
]

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200/70 bg-white/35 backdrop-blur-12 dark:border-white/10 dark:bg-black/20 lg:block">
      <div className="sticky top-0 h-screen p-4">
        <div className="mb-6 flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-glow">
            <span className="text-lg font-black">$</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">Expense</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Tracker</div>
          </div>
        </div>

        <nav className="space-y-2">
          {items.map((it) => {
            const Icon = it.icon
            return (
              <NavLink
                key={it.to}
                to={it.to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition',
                    'glass-strong',
                    isActive
                      ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border-sky-500/30 dark:border-sky-400/20'
                      : 'hover:bg-white/55 dark:hover:bg-white/10',
                  ].join(' ')
                }
              >
                <Icon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                <span className="font-medium">{it.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="mt-6 rounded-2xl glass-strong p-4">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tip</div>
          <div className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-50">
            Try toggling dark mode & exporting reports.
          </div>
        </div>
      </div>
    </aside>
  )
}

