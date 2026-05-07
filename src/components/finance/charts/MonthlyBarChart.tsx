import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export type MonthlyPoint = { label: string; income: number; expense: number }

export function MonthlyBarChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v: number) => `$${v.toFixed(0)}`} />
          <Bar dataKey="income" fill="#38bdf8" radius={[8, 8, 0, 0]} />
          <Bar dataKey="expense" fill="#fb7185" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

