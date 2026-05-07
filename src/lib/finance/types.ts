export type TxType = 'income' | 'expense' | 'transfer'

export type Category =
  | 'Food'
  | 'Travel'
  | 'Shopping'
  | 'Bills'
  | 'Salary'
  | 'Freelance'
  | 'Health'
  | 'Education'
  | 'Entertainment'
  | 'Rent'
  | 'Utilities'
  | 'Savings'
  | 'Other'

export type WalletType = 'Cash' | 'Bank' | 'UPI'

export type Transaction = {
  id: string
  createdAt: string // ISO
  date: string // YYYY-MM-DD
  type: TxType
  amount: number // positive number
  category?: Category // for income/expense
  description?: string
  walletIdFrom?: string // for transfer
  walletIdTo?: string // for transfer
  walletId?: string // for income/expense
}

export type Wallet = {
  id: string
  name: string
  type: WalletType
  currency: 'USD' | 'INR'
}

export type Budget = {
  id: string
  month: string // YYYY-MM
  category: Category
  goal: number // positive
}

export type RecurringExpense = {
  id: string
  category: Category
  amount: number
  walletId: string
  dayOfMonth: number // 1-28 (safe)
  description?: string
}

export type SpendingAlert = {
  id: string
  category: Category
  month: string // YYYY-MM
  limit: number
  triggeredAt?: string
}

