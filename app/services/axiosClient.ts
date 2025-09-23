// app/services/axiosClient.ts
import type { ZustandStore } from '@/types/common/zustand.store'
import type { AuthState } from '@/types/auth/auth.store.type'
import axios from 'axios'

// Utility to get cookie
const getCookie = (name: string): string | null => {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true,
})

// REQUEST INTERCEPTOR - Add access token to header
axiosClient.interceptors.request.use(
    config => {
        // Get access token from localStorage
        const authStore: ZustandStore<AuthState> = JSON.parse(localStorage.getItem('auth-store') || '{}')

        if (authStore.state.token) {
            config.headers.Authorization = `Bearer ${authStore.state.token}`
        }

        return config
    },
    error => Promise.reject(error),
)

// RESPONSE INTERCEPTOR - Handle refresh token when 401
axiosClient.interceptors.response.use(
    response => response.data,
    async error => {
        const originalRequest = error.config

        // When token expired (401) and not retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Skip refresh logic for auth endpoints (login/register)
            const isAuthEndpoint = originalRequest.url?.includes('/auth/sign-in')

            if (isAuthEndpoint) {
                // For auth endpoints, just return the error (don't redirect)
                return Promise.reject(error)
            }

            originalRequest._retry = true

            // Check refresh token from cookie
            const refreshToken = getCookie('refresh-token')

            if (refreshToken) {
                try {
                    // Send request refresh token
                    const refreshResponse = await axios.post(
                        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/refresh-token`,
                        { refreshToken },
                        { withCredentials: true },
                    )

                    // Save new access token to localStorage
                    const newAccessToken = refreshResponse.data.accessToken
                    localStorage.setItem(
                        'auth-store',
                        JSON.stringify({
                            ...JSON.parse(localStorage.getItem('auth-store') || '{}'),
                            token: newAccessToken,
                        }),
                    )

                    // Retry request with new token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return axiosClient(originalRequest)
                } catch (refreshError) {
                    // If refresh fail, clear token and redirect
                    localStorage.removeItem('auth-store')
                    window.location.href = '/sign-in'
                    return Promise.reject(refreshError)
                }
            } else {
                // No refresh token, redirect to login
                localStorage.removeItem('auth-store')
                window.location.href = '/sign-in'
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    },
)

// Token management utilities
export const tokenManager = {
    setAccessToken: (token: string) => {
        localStorage.setItem(
            'auth-store',
            JSON.stringify({ ...JSON.parse(localStorage.getItem('auth-store') || '{}'), token }),
        )
    },

    getAccessToken: () => {
        return JSON.parse(localStorage.getItem('auth-store') || '{}').token
    },

    clearTokens: () => {
        localStorage.removeItem('auth-store')
        // Remove refresh token cookie
        document.cookie = 'refresh-token=; Max-Age=0; path=/; SameSite=Strict'
    },

    hasRefreshToken: () => {
        return getCookie('refresh-token') !== null
    },
}

export default axiosClient
