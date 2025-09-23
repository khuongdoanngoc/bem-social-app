import type { User } from "./auth.types"

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    token: string | null
    signIn: (user: User, token: string) => void
    signOut: () => void
    _hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}
