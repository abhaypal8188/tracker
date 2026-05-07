export function formatMoney(amount: number, currency: 'USD' | 'INR' = 'USD') {
  const safe = Number.isFinite(amount) ? amount : 0
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(safe)
}

