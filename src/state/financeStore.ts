import { create } from 'zustand'
import type { Budget, Category, RecurringExpense, SpendingAlert, Transaction, Wallet } from '../lib/finance/types'
import type { FinanceStateShape } from '../lib/finance/storage'
import { loadFinanceState, saveFinanceState } from '../lib/finance/storage'
import { seedFinanceState } from '../lib/finance/seed'

const VERSION = 1

export type FinanceState = {
  wallets: Wallet[]
  transactions: Transaction[]
  budgets: Budget[]
  recurringExpenses: RecurringExpense[]
  spendingAlerts: SpendingAlert[]

  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void
  updateTransaction: (id: string, patch: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void
  deleteTransaction: (id: string) => void

  addBudget: (b: Omit<Budget, 'id'>) => void
  deleteBudget: (id: string) => void

  // wallets helpers
  getWalletBalance: (walletId: string) => number

  // analytics helpers
  getMonthlySummary: (month: string) => {
    income: number
    expense: number
    net: number
  }

  getCategorySpending: (month: string) => Array<{ category: Category; amount: number }>
}

function ensureState(): FinanceStateShape {
  const loaded = loadFinanceState()
  if (loaded && loaded.version === VERSION) return loaded
  const seeded = seedFinanceState()
  const next: FinanceStateShape = {
    version: VERSION,
    ...seeded,
  }
  saveFinanceState(next)
  return next
}

export const useFinanceStore = create<FinanceState>((set, get) => {
  const initial = typeof window === 'undefined' ? null : ensureState()
  const base: FinanceStateShape =
    initial ?? ({ version: VERSION, wallets: [], transactions: [], budgets: [], recurringExpenses: [], spendingAlerts: [] } as FinanceStateShape)

  const persist = (next: FinanceStateShape) => {
    saveFinanceState(next)
  }

  return {
    wallets: base.wallets,
    transactions: base.transactions,
    budgets: base.budgets,
    recurringExpenses: base.recurringExpenses,
    spendingAlerts: base.spendingAlerts,

    addTransaction: (tx) => {
      const id = `tx_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
      const nextTx: Transaction = { ...tx, id, createdAt: new Date().toISOString() } as Transaction
      const nextTransactions = [nextTx, ...get().transactions]

      set({ transactions: nextTransactions })
      persist({
        version: VERSION,
        wallets: get().wallets,
        transactions: nextTransactions,
        budgets: get().budgets,
        recurringExpenses: get().recurringExpenses,
        spendingAlerts: get().spendingAlerts,
      })
    },

    updateTransaction: (id, patch) => {
      const nextTransactions = get().transactions.map((t) => (t.id === id ? { ...t, ...patch } : t))
      set({ transactions: nextTransactions })
      persist({
        version: VERSION,
        wallets: get().wallets,
        transactions: nextTransactions,
        budgets: get().budgets,
        recurringExpenses: get().recurringExpenses,
        spendingAlerts: get().spendingAlerts,
      })
    },

    deleteTransaction: (id) => {
      const nextTransactions = get().transactions.filter((t) => t.id !== id)
      set({ transactions: nextTransactions })
      persist({
        version: VERSION,
        wallets: get().wallets,
        transactions: nextTransactions,
        budgets: get().budgets,
        recurringExpenses: get().recurringExpenses,
        spendingAlerts: get().spendingAlerts,
      })
    },

    addBudget: (b) => {
      const id = `b_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
      const nextBudget = { ...b, id }
      const nextBudgets = [nextBudget, ...get().budgets]
      set({ budgets: nextBudgets })
      persist({
        version: VERSION,
        wallets: get().wallets,
        transactions: get().transactions,
        budgets: nextBudgets,
        recurringExpenses: get().recurringExpenses,
        spendingAlerts: get().spendingAlerts,
      })
    },

    deleteBudget: (id) => {
      const nextBudgets = get().budgets.filter((b) => b.id !== id)
      set({ budgets: nextBudgets })
      persist({
        version: VERSION,
        wallets: get().wallets,
        transactions: get().transactions,
        budgets: nextBudgets,
        recurringExpenses: get().recurringExpenses,
        spendingAlerts: get().spendingAlerts,
      })
    },

    getWalletBalance: (walletId) => {
      const txs = get().transactions
      let balance = 0
      for (const t of txs) {
        if (t.type === 'income') {
          if (t.walletId === walletId) balance += t.amount
        } else if (t.type === 'expense') {
          if (t.walletId === walletId) balance -= t.amount
        } else if (t.type === 'transfer') {
          if (t.walletIdFrom === walletId) balance -= t.amount
          if (t.walletIdTo === walletId) balance += t.amount
        }
      }
      return Math.round(balance * 100) / 100
    },

    getMonthlySummary: (month) => {
      const txs = get().transactions
      let income = 0
      let expense = 0
      for (const t of txs) {
        if (t.type === 'income' && t.date.startsWith(month)) income += t.amount
        if (t.type === 'expense' && t.date.startsWith(month)) expense += t.amount
      }
      income = Math.round(income * 100) / 100
      expense = Math.round(expense * 100) / 100
      return { income, expense, net: Math.round((income - expense) * 100) / 100 }
    },

    getCategorySpending: (month) => {
      const txs = get().transactions
      const map = new Map<Category, number>()
      for (const t of txs) {
        if (t.type !== 'expense') continue
        if (!t.date.startsWith(month)) continue
        if (!t.category) continue
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
      }
      return Array.from(map.entries())
        .map(([category, amount]) => ({ category, amount: Math.round(amount * 100) / 100 }))
        .sort((a, b) => b.amount - a.amount)
    },
  }
})

