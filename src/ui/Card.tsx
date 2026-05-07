import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'

export function Card({
  title,
  value,
  subtitle,
  tone,
  variant,
  children,
}: {
  title?: string
  value?: string
  subtitle?: string
  tone?: 'danger' | 'success'
  variant?: 'chart'
  children?: React.ReactNode
}) {
  const toneClasses =
    tone === 'danger'
      ? 'text-rose-600 dark:text-rose-400'
      : tone === 'success'
        ? 'text-emerald-600 dark:text-emerald-400'
        : 'text-slate-900 dark:text-slate-50'

  return (
    <section className={clsx('glass-strong rounded-3xl p-5 shadow-glow/0 transition', variant === 'chart' && 'p-4')}>
      {title && <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
        {variant === 'chart' && <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">Live</span>}
      </div>}

      {value && <div className="mt-3 text-2xl font-black tracking-tight" style={{ color: undefined }}>
        <span className={toneClasses}>{value}</span>
      </div>}
      {subtitle && <div className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">{subtitle}</div>}

      {children && <div className={clsx(title || value || subtitle ? 'mt-4' : '', variant === 'chart' ? '' : '')}>{children}</div>}
    </section>
  )
}

