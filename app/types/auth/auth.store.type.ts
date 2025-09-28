import type { User } from "./auth.types"

export interface AuthState {
    user: User | null
    isAuthenticated: boolean
    token: string | null
    signIn: (user: User, token: string) => void
    signOut: () => void
    updateUser: (updatedUser: Partial<User>) => void // Thêm method này
    _hasHydrated: boolean
    setHasHydrated: (state: boolean) => void
}
