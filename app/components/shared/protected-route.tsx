import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/stores/authStore'
import { LoadingOverlay } from '@/components/layout'

export default function ProtectedRoute() {
    const { isAuthenticated, _hasHydrated } = useAuthStore()

    if (!_hasHydrated) {
        return <LoadingOverlay />
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />
    }

    return <Outlet />
}
