import React from 'react'
import { createPortal } from 'react-dom'
import type { Category, Transaction, TxType, Wallet } from '../../lib/finance/types'

const categories: Category[] = [
  'Food',
  'Travel',
  'Shopping',
  'Bills',
  'Salary',
  'Freelance',
  'Health',
  'Education',
  'Entertainment',
  'Rent',
  'Utilities',
  'Savings',
  'Other',
]

const types: TxType[] = ['income', 'expense', 'transfer']

export function TransactionFormModal({
  open,
  mode,
  wallets,
  initial,
  onClose,
  onSubmit,
}: {
  open: boolean
  mode: 'create' | 'edit'
  wallets: Wallet[]
  initial?: Partial<Transaction>
  onClose: () => void
  onSubmit: (payload: { type: TxType; date: string; amount: number; category?: Category; description?: string; walletId?: string; walletIdFrom?: string; walletIdTo?: string }) => void
}) {
  const [form, setForm] = React.useState({
    type: (initial?.type ?? 'expense') as TxType,
    date: initial?.date ?? new Date().toISOString().slice(0, 10),
    amount: typeof initial?.amount === 'number' ? initial.amount : 0,
    category: (initial?.category as Category | undefined) ?? undefined,
    description: initial?.description ?? '',
    walletId: initial?.walletId ?? wallets[0]?.id,
    walletIdFrom: initial?.walletIdFrom ?? wallets[0]?.id,
    walletIdTo: initial?.walletIdTo ?? wallets[1]?.id,
  })

  React.useEffect(() => {
    if (!open) return
    setForm({
      type: (initial?.type ?? 'expense') as TxType,
      date: initial?.date ?? new Date().toISOString().slice(0, 10),
      amount: typeof initial?.amount === 'number' ? initial.amount : 0,
      category: (initial?.category as Category | undefined) ?? undefined,
      description: initial?.description ?? '',
      walletId: initial?.walletId ?? wallets[0]?.id,
      walletIdFrom: initial?.walletIdFrom ?? wallets[0]?.id,
      walletIdTo: initial?.walletIdTo ?? wallets[1]?.id,
    })
  }, [open])

  if (!open) return null

  const title = mode === 'create' ? 'Add Transaction' : 'Edit Transaction'

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-6" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200/70 bg-white/70 p-5 shadow-glow/0 backdrop-blur-12 dark:border-white/10 dark:bg-black/30">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Transaction</div>
            <div className="mt-1 text-lg font-black text-slate-900 dark:text-slate-50">{title}</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl bg-white/50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/80 dark:bg-black/20 dark:text-slate-200 dark:hover:bg-black/40"
          >
            Close
          </button>
        </div>

        <form
          className="mt-5 grid grid-cols-1 gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit({
              type: form.type,
              date: form.date,
              amount: Number(form.amount),
              category: form.type === 'expense' || form.type === 'income' ? form.category : undefined,
              description: form.description || undefined,
              walletId: form.type === 'expense' || form.type === 'income' ? form.walletId : undefined,
              walletIdFrom: form.type === 'transfer' ? form.walletIdFrom : undefined,
              walletIdTo: form.type === 'transfer' ? form.walletIdTo : undefined,
            })
          }}
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Type</div>
              <select
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as TxType }))}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Date</div>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
              />
            </label>
          </div>

          <label className="block">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Amount</div>
            <input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm((p) => ({ ...p, amount: e.target.valueAsNumber }))}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
            />
          </label>

          {(form.type === 'income' || form.type === 'expense') && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Category</div>
                <select
                  value={form.category ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as Category }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Wallet</div>
                <select
                  value={form.walletId ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, walletId: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name} ({w.type})
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          {form.type === 'transfer' && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">From</div>
                <select
                  value={form.walletIdFrom ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, walletIdFrom: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">To</div>
                <select
                  value={form.walletIdTo ?? ''}
                  onChange={(e) => setForm((p) => ({ ...p, walletIdTo: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <label className="block">
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Description</div>
            <input
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="e.g. Lunch at cafe"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
            />
          </label>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white/60 dark:text-slate-200 dark:hover:bg-white/10">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:translate-y-[-1px] dark:bg-white dark:text-slate-900"
            >
              {mode === 'create' ? 'Add' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}

