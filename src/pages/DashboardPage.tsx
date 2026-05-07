import React from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useFinanceStore } from '../state/financeStore'
import { MonthlySummaryCards } from '../components/finance/MonthlySummaryCards'
import { RecentTransactionsTable } from '../components/finance/RecentTransactionsTable'
import { LoadingSkeleton } from '../components/finance/LoadingSkeleton'
import { Card } from '../ui/Card'

const CategoryPieChart = React.lazy(() =>
  import('../components/finance/charts/CategoryPieChart').then((module) => ({
    default: module.CategoryPieChart,
  })),
)

export default function DashboardPage() {
  const navigate = useNavigate()
  const { transactions, getCategorySpending } = useFinanceStore()
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setHydrated(true)
  }, [])

  const month = React.useMemo(() => format(new Date(), 'yyyy-MM'), [])
  const categoryData = getCategorySpending(month)

  const recent = React.useMemo(() => {
    return [...transactions]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 7)
  }, [transactions])

  if (!hydrated) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <LoadingSkeleton className="h-10 w-56" />
          <div className="flex gap-2">
            <LoadingSkeleton className="h-10 w-40" />
            <LoadingSkeleton className="h-10 w-32" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-44" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-5">
          <LoadingSkeleton className="h-96 lg:col-span-3" />
          <LoadingSkeleton className="h-96 lg:col-span-2" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">SaaS Dashboard</div>
          <h2 className="mt-1 text-2xl font-black text-slate-900 dark:text-slate-50">Your finances, at a glance.</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300">Real-time balances, category spending, and export-ready data, persisted in localStorage.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/transactions')}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:translate-y-[-1px] dark:bg-white dark:text-slate-900"
          >
            Add Transaction
          </button>
          <button
            onClick={() => navigate('/reports')}
            className="rounded-xl glass-strong px-4 py-2 text-sm font-semibold transition hover:bg-white/60 dark:hover:bg-white/10"
          >
            Export
          </button>
        </div>
      </div>

      <MonthlySummaryCards month={month} />

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Card variant="chart" title="Category Spending" subtitle="This month">
            <React.Suspense fallback={<LoadingSkeleton className="h-64 w-full" />}>
              <CategoryPieChart data={categoryData} />
            </React.Suspense>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title="Recent Activity" subtitle="Last added">
            <div className="mt-4">
              <RecentTransactionsTable
                items={recent}
                onEdit={(id) => navigate(`/transactions?edit=${id}`)}
                onDelete={() => {}}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
