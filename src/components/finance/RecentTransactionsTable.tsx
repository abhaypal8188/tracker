import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import type { Transaction } from '../../lib/finance/types'
import { formatMoney } from '../../lib/finance/format'

export function RecentTransactionsTable({
  items,
  onEdit,
  onDelete,
}: {
  items: Transaction[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/30 backdrop-blur-12 dark:border-white/10">
      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full text-left text-sm">
          <thead className="bg-white/30 dark:bg-black/20">
            <tr className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Description</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-xs text-slate-500 dark:text-slate-400">
                  No transactions.
                </td>
              </tr>
            ) : (
              items.map((t) => (
                <tr key={t.id} className="border-t border-slate-200/60 dark:border-white/10">
                  <td className="px-5 py-4 text-slate-700 dark:text-slate-200">{t.date}</td>
                  <td className="px-5 py-4 text-slate-700 dark:text-slate-200">{t.description ?? '-'}</td>
                  <td className="px-5 py-4 text-slate-700 dark:text-slate-200">{t.category ?? '-'}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        t.type === 'income'
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : t.type === 'expense'
                            ? 'text-rose-700 dark:text-rose-300'
                            : 'text-sky-700 dark:text-sky-300'
                      }
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-50">
                    {t.type === 'expense' ? '-' : ''}
                    {formatMoney(t.amount)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        className="rounded-xl bg-white/40 p-2 text-slate-700 transition hover:bg-white/70 dark:bg-black/20 dark:text-slate-200 dark:hover:bg-black/40"
                        onClick={() => onEdit(t.id)}
                        aria-label="Edit"
                      >
                        <MdEdit className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded-xl bg-white/40 p-2 text-rose-700 transition hover:bg-white/70 dark:bg-black/20 dark:text-rose-300 dark:hover:bg-black/40"
                        onClick={() => onDelete(t.id)}
                        aria-label="Delete"
                      >
                        <MdDelete className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
