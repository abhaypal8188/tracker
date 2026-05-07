import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'

const DashboardPage = React.lazy(() => import('./pages/DashboardPage'))
const TransactionsPage = React.lazy(() => import('./pages/TransactionsPage'))
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'))
const BudgetsPage = React.lazy(() => import('./pages/BudgetsPage'))
const WalletsPage = React.lazy(() => import('./pages/WalletsPage'))
const ReportsPage = React.lazy(() => import('./pages/ReportsPage'))
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'))
const LoginPage = React.lazy(() => import('./pages/LoginPage'))
const SignupPage = React.lazy(() => import('./pages/SignupPage'))

function RouteFallback() {
  return (
    <div className="space-y-3">
      <div className="h-12 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
      <div className="h-40 animate-pulse rounded-3xl bg-slate-200/50 dark:bg-slate-800/50" />
      <div className="h-64 animate-pulse rounded-3xl bg-slate-200/40 dark:bg-slate-800/40" />
    </div>
  )
}

export default function App() {
  return (
    <React.Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="budgets" element={<BudgetsPage />} />
          <Route path="wallets" element={<WalletsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  )
}

