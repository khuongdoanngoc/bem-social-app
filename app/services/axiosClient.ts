// app/services/axiosClient.ts
import type { ZustandStore } from '@/types/common/zustand.store'
import type { AuthState } from '@/types/auth/auth.store.type'
import axios from 'axios'
import { authApi } from './apis/auth.api'

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true,
})

// REQUEST INTERCEPTOR - Add access token to header
axiosClient.interceptors.request.use(
    config => {
        // Get access token from localStorage via zustand store
        const authStore: ZustandStore<AuthState> = JSON.parse(localStorage.getItem('auth-store') || '{}')

        if (authStore.state?.token) {
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

        // When token expired (401) and not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Skip refresh logic for auth endpoints
            const isAuthEndpoint =
                originalRequest.url?.includes('/auth/sign-in') ||
                originalRequest.url?.includes('/auth/sign-up') ||
                originalRequest.url?.includes('/auth/refresh-token')

            if (isAuthEndpoint) {
                return Promise.reject(error)
            }

            originalRequest._retry = true

            try {
                const refreshResponse = await authApi.refreshToken()

                const { accessToken } = refreshResponse.data

                // Update zustand store in localStorage
                const currentStore = JSON.parse(localStorage.getItem('auth-store') || '{}')
                localStorage.setItem(
                    'auth-store',
                    JSON.stringify({
                        ...currentStore,
                        state: {
                            ...currentStore.state,
                            token: accessToken,
                            isAuthenticated: true,
                        },
                    }),
                )

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`
                return axiosClient(originalRequest)
            } catch (refreshError) {
                // If refresh fails, clear all tokens and redirect to login
                clearTokens()
                return;
                window.location.href = '/sign-in'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    },
)

// Helper function to clear all tokens
const clearTokens = () => {
    localStorage.removeItem('auth-store')
    document.cookie = 'refresh-token=; Max-Age=0; path=/; SameSite=Strict'
}

// Token management utilities
export const tokenManager = {
    getAccessToken: () => {
        const authStore: ZustandStore<AuthState> = JSON.parse(localStorage.getItem('auth-store') || '{}')
        return authStore.state?.token || null
    },

    clearTokens,
}

export default axiosClient
