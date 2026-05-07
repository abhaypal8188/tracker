import type { Budget, RecurringExpense, SpendingAlert, Transaction, Wallet } from './types'

export type FinanceStateShape = {
  version: number
  wallets: Wallet[]
  transactions: Transaction[]
  budgets: Budget[]
  recurringExpenses: RecurringExpense[]
  spendingAlerts: SpendingAlert[]
}

const KEY = 'expense-tracker-finance-v1'

export function loadFinanceState(): FinanceStateShape | null {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as FinanceStateShape
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

export function saveFinanceState(state: FinanceStateShape) {
  window.localStorage.setItem(KEY, JSON.stringify(state))
}

