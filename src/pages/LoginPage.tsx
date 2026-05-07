import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../state/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = React.useState('alex@example.com')

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center">
      <div className="glass-strong rounded-3xl p-6">
        <div className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">Login</div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50">Welcome back.</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Demo authentication UI (frontend only).</p>

        <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-200 bg-white/50 px-3 py-2 text-sm outline-none transition focus:border-sky-500/60 dark:border-white/10 dark:bg-black/20"
        />

        <button
          onClick={() => {
            login(email.split('@')[0] || 'Alex')
            navigate('/')
          }}
          className="mt-5 w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:translate-y-[-1px]"
        >
          Sign in
        </button>

        <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          New here? <Link className="font-semibold text-sky-600 dark:text-sky-400" to="/signup">Create account</Link>
        </div>
      </div>
    </div>
  )
}

