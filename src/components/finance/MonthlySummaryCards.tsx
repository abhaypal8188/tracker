import React from 'react'
import type { Transaction } from '../../lib/finance/types'
import { useFinanceStore } from '../../state/financeStore'
import { Card } from '../../ui/Card'
import { formatMoney } from '../../lib/finance/format'
import { format } from 'date-fns'

function monthLabel(month: string) {
  const [y, m] = month.split('-').map((s) => Number(s))
  const d = new Date(y, (m || 1) - 1, 1)
  return format(d, 'MMM yyyy')
}

export function MonthlySummaryCards({ month }: { month: string }) {
  const { getMonthlySummary } = useFinanceStore()
  const { income, expense, net } = getMonthlySummary(month)

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card title="Total Balance" value={formatMoney(net)} subtitle={monthLabel(month)} />
      <Card title="Income" value={formatMoney(income)} subtitle="Recurring + one-time" />
      <Card title="Expenses" value={formatMoney(expense)} subtitle="Food, bills, travel" tone="danger" />
      <Card title="Net" value={formatMoney(net)} subtitle="After expenses" tone={net >= 0 ? 'success' : 'danger'} />
    </div>
  )
}

