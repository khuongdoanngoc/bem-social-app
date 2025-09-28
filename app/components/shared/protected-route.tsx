import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/stores/authStore'
import { LoadingOverlay } from '@/components/layout'

export default function ProtectedRoute() {
    const { isAuthenticated, _hasHydrated } = useAuthStore()

    // Show loading while store is hydrating or initializing auth
    if (!_hasHydrated) {
        return <LoadingOverlay />
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />
    }

    return <Outlet />
}
