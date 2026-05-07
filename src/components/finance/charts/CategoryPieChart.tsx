import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import type { Category } from '../../../lib/finance/types'

const COLORS: Record<Category, string> = {
  Food: '#22c55e',
  Travel: '#38bdf8',
  Shopping: '#f472b6',
  Bills: '#fb7185',
  Salary: '#60a5fa',
  Freelance: '#a78bfa',
  Health: '#34d399',
  Education: '#fbbf24',
  Entertainment: '#f97316',
  Rent: '#6366f1',
  Utilities: '#06b6d4',
  Savings: '#10b981',
  Other: '#94a3b8',
}

export type CategorySpendPoint = { category: Category; amount: number }

export function CategoryPieChart({ data }: { data: CategorySpendPoint[] }) {
  const total = data.reduce((acc, d) => acc + d.amount, 0)
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={92}
            paddingAngle={2}
            isAnimationActive
          >
            {data.map((d) => (
              <Cell key={d.category} fill={COLORS[d.category] ?? '#94a3b8'} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            labelFormatter={(label) => String(label)}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="-mt-14 flex items-center justify-center">
        <div className="text-center">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Total</div>
          <div className="text-lg font-black text-slate-900 dark:text-slate-50">${total.toFixed(0)}</div>
        </div>
      </div>
    </div>
  )
}

