import { create } from 'zustand'

type AuthState = {
  isAuthed: boolean
  user: { name: string } | null
  login: (name: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialAuthState(),
  login: (name) => {
    set({ isAuthed: true, user: { name } })
    window.localStorage.setItem('demo-user', JSON.stringify({ name }))
  },
  logout: () => {
    set({ isAuthed: false, user: null })
    window.localStorage.removeItem('demo-user')
  },
}))

function getInitialAuthState() {
  if (typeof window === 'undefined') {
    return { isAuthed: false, user: null as { name: string } | null }
  }

  try {
    const raw = window.localStorage.getItem('demo-user')
    if (!raw) return { isAuthed: false, user: null as { name: string } | null }

    const parsed = JSON.parse(raw) as { name?: string } | null
    if (!parsed?.name) return { isAuthed: false, user: null as { name: string } | null }

    return { isAuthed: true, user: { name: parsed.name } }
  } catch {
    return { isAuthed: false, user: null as { name: string } | null }
  }
}

