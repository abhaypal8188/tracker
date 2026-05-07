import { addDays, format, subDays } from 'date-fns'
import type { Budget, Category, RecurringExpense, SpendingAlert, Transaction, Wallet } from './types'

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
}

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

function todayISO() {
  const d = new Date()
  return format(d, 'yyyy-MM-dd')
}

export function seedFinanceState(now = new Date()): {
  wallets: Wallet[]
  transactions: Transaction[]
  budgets: Budget[]
  recurringExpenses: RecurringExpense[]
  spendingAlerts: SpendingAlert[]
} {
  const currency = 'USD' as const

  const wallets: Wallet[] = [
    { id: 'w_cash', name: 'Cash', type: 'Cash', currency },
    { id: 'w_bank', name: 'Bank Account', type: 'Bank', currency },
    { id: 'w_upi', name: 'UPI Wallet', type: 'UPI', currency },
  ]

  const month = format(now, 'yyyy-MM')

  const recurringExpenses: RecurringExpense[] = [
    {
      id: 're_rent',
      category: 'Rent',
      amount: 980,
      walletId: 'w_bank',
      dayOfMonth: Math.min(5, 28),
      description: 'Monthly rent',
    },
    {
      id: 're_util',
      category: 'Utilities',
      amount: 120,
      walletId: 'w_bank',
      dayOfMonth: Math.min(12, 28),
      description: 'Electricity + internet',
    },
    {
      id: 're_bills',
      category: 'Bills',
      amount: 165,
      walletId: 'w_upi',
      dayOfMonth: Math.min(18, 28),
      description: 'Phone + subscriptions',
    },
  ]

  const spendingAlerts: SpendingAlert[] = [
    { id: 'al_food', category: 'Food', month, limit: 420 },
    { id: 'al_travel', category: 'Travel', month, limit: 260 },
  ]

  const budgets: Budget[] = [
    { id: 'b_food', month, category: 'Food', goal: 420 },
    { id: 'b_travel', month, category: 'Travel', goal: 260 },
    { id: 'b_shopping', month, category: 'Shopping', goal: 180 },
    { id: 'b_bills', month, category: 'Bills', goal: 190 },
    { id: 'b_entertain', month, category: 'Entertainment', goal: 140 },
    { id: 'b_other', month, category: 'Other', goal: 120 },
  ]

  const transactions: Transaction[] = []

  const baseDates = Array.from({ length: 26 }).map((_, i) => addDays(subDays(now, 35), i))

  // income entries
  transactions.push(
    {
      id: uid('tx'),
      createdAt: new Date().toISOString(),
      date: format(subDays(now, 18), 'yyyy-MM-dd'),
      type: 'income',
      amount: 2600,
      category: 'Salary',
      description: 'Monthly salary',
      walletId: 'w_bank',
    },
    {
      id: uid('tx'),
      createdAt: new Date().toISOString(),
      date: format(subDays(now, 11), 'yyyy-MM-dd'),
      type: 'income',
      amount: 820,
      category: 'Freelance',
      description: 'Design sprint payment',
      walletId: 'w_upi',
    }
  )

  // generate expenses
  const expenseProfiles: Array<{ category: Category; min: number; max: number; wallet: string }> = [
    { category: 'Food', min: 9, max: 42, wallet: 'w_upi' },
    { category: 'Travel', min: 6, max: 55, wallet: 'w_cash' },
    { category: 'Shopping', min: 12, max: 75, wallet: 'w_bank' },
    { category: 'Bills', min: 10, max: 38, wallet: 'w_upi' },
    { category: 'Entertainment', min: 8, max: 46, wallet: 'w_cash' },
    { category: 'Health', min: 6, max: 60, wallet: 'w_upi' },
    { category: 'Other', min: 7, max: 45, wallet: 'w_bank' },
  ]

  for (let i = 0; i < baseDates.length; i++) {
    const d = baseDates[i]
    const picks = expenseProfiles[i % expenseProfiles.length]
    const amount = Math.round((picks.min + Math.random() * (picks.max - picks.min)) * 100) / 100

    const tx: Transaction = {
      id: uid('tx'),
      createdAt: new Date().toISOString(),
      date: format(d, 'yyyy-MM-dd'),
      type: 'expense',
      amount,
      category: picks.category,
      description: `${picks.category} spend`,
      walletId: picks.wallet,
    }

    transactions.push(tx)
  }

  // recurring applied for current month (simplified)
  for (const rec of recurringExpenses) {
    const dateStr = `${month}-${String(rec.dayOfMonth).padStart(2, '0')}`
    transactions.push({
      id: uid('tx'),
      createdAt: new Date().toISOString(),
      date: dateStr,
      type: 'expense',
      amount: rec.amount,
      category: rec.category,
      description: rec.description ?? 'Recurring expense',
      walletId: rec.walletId,
    })
  }

  // one transfer between wallets
  transactions.push({
    id: uid('tx'),
    createdAt: new Date().toISOString(),
    date: todayISO(),
    type: 'transfer',
    amount: 200,
    description: 'Move funds',
    walletIdFrom: 'w_bank',
    walletIdTo: 'w_cash',
  })

  return { wallets, transactions, budgets, recurringExpenses, spendingAlerts }
}

