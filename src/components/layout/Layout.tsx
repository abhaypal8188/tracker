import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { AppThemeProvider } from '../../state/theme'

export function Layout() {
  return (
    <AppThemeProvider>
      <div className="min-h-screen">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_20%_-10%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(900px_circle_at_110%_20%,rgba(99,102,241,0.18),transparent_60%)] dark:from-slate-950" />
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </AppThemeProvider>
  )
}

