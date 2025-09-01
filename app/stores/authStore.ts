// app/stores/authStore.ts
import type { User } from '@/types/auth/auth.types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    token: string | null
    signIn: (user: User, token: string) => void
    signOut: () => void
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set): AuthState => ({
                user: null,
                isAuthenticated: false,
                token: null,
                signIn: (user, token) => set({ user, token, isAuthenticated: true }),
                signOut: () => set({ user: null, token: null, isAuthenticated: false }),
            }),
            { name: 'auth-store' },
        ),
    ),
)
