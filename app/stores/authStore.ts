// app/stores/authStore.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { AuthState } from '@/types/auth/auth.store.type'
import type { User } from '@/types/auth/auth.types'

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set): AuthState => ({
                user: null,
                isAuthenticated: false,
                token: null,
                _hasHydrated: false, // flag
                setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

                signIn: (user, token) => set({ user, token, isAuthenticated: true }),
                signOut: () => set({ user: null, token: null, isAuthenticated: false }),
                // Thêm method updateUser để cập nhật thông tin user
                updateUser: (updatedUser) => set(state => ({ 
                    user: state.user ? { ...state.user, ...updatedUser } : null 
                })),
            }),
            {
                name: 'auth-store',
                onRehydrateStorage: () => state => {
                    state?.setHasHydrated(true)
                },
            },
        ),
    ),
)
