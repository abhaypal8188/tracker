import React from 'react'
import { useFinanceStore } from '../state/financeStore'
import { TransactionFormModal } from '../components/finance/TransactionFormModal'
import type { Category, TxType, Transaction, Wallet } from '../lib/finance/types'
import { LoadingSkeleton } from '../components/finance/LoadingSkeleton'
import { RecentTransactionsTable } from '../components/finance/RecentTransactionsTable'
import { EmptyState } from '../components/finance/EmptyState'
import { useLocation, useNavigate } from 'react-router-dom'

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

export default function TransactionsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { wallets, transactions, addTransaction, updateTransaction, deleteTransaction } = useFinanceStore()

  const [hydrated, setHydrated] = React.useState(false)
  React.useEffect(() => setHydrated(true), [])

  const query = React.useMemo(() => new URLSearchParams(location.search), [location.search])
  const editId = query.get('edit')

  const [modalOpen, setModalOpen] = React.useState(false)
  const [mode, setMode] = React.useState<'create' | 'edit'>('create')
  const [initial, setInitial] = React.useState<Partial<Transaction> | undefined>(undefined)

  const [typeFilter, setTypeFilter] = React.useState<'all' | TxType>('all')
  const [categoryFilter, setCategoryFilter] = React.useState<'all' | Category>('all')
  const [monthFilter, setMonthFilter] = React.useState(() => new Date().toISOString().slice(0, 7))

  React.useEffect(() => {
    if (!editId) return
    const tx = transactions.find((t) => t.id === editId)
    if (!tx) return
    setMode('edit')
    setInitial(tx)
    setModalOpen(true)
  }, [editId, transactions])

  const filtered = React.useMemo(() => {
    return [...transactions]
      .filter((t) => (typeFilter === 'all' ? true : t.type === typeFilter))
      .filter((t) => (categoryFilter === 'all' ? true : t.category === categoryFilter))
      .filter((t) => t.date.startsWith(monthFilter))
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [transactions, typeFilter, categoryFilter, monthFilter])

  const openCreate = () => {
    setMode('create')
    setInitial(undefined)
    setModalOpen(true)
    navigate('/transactions', { replace: true })
  }

  const handleClose = () => {
    setModalOpen(false)
    navigate('/transactions', { replace: true })
  }

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton className="h-14 w-full" />
        <LoadingSkeleton className="h-12 w-full" />
        <LoadingSkeleton className="h-96 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">Transactions</div>
          <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-50">Manage income & expenses</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Search and filter by category, date, and type. Data persists locally.</p>
        </div>
        <button
          onClick={openCreate}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:translate-y-[-1px] dark:bg-white dark:text-slate-900"
        >
          Add Transaction
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Month</div>
          <input
            type="month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
          />
        </label>
        <label className="block">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Type</div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
          </select>
        </label>
        <label className="block">
          <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Category</div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white/60 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
          >
            <option value="all">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No results" subtitle="Try adjusting filters or add a transaction." />
      ) : (
        <RecentTransactionsTable
          items={filtered.slice(0, 20)}
          onEdit={(id) => {
            navigate(`/transactions?edit=${id}`)
          }}
          onDelete={(id) => {
            if (!confirm('Delete this transaction?')) return
            deleteTransaction(id)
          }}
        />
      )}

      <TransactionFormModal
        open={modalOpen}
        mode={mode}
        wallets={wallets}
        initial={initial}
        onClose={handleClose}
        onSubmit={(payload) => {
          if (mode === 'create') {
            addTransaction(payload as any)
          } else if (editId) {
            updateTransaction(editId, payload as any)
          }
          handleClose()
        }}
      />
    </div>
  )
}


