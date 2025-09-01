// app/services/axiosClient.ts
import axios, { type AxiosRequestConfig } from 'axios'

// Token management
let accessToken: string | null = localStorage.getItem('access-token')
let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: unknown) => void
}> = []

// Process queued requests after refresh
const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error)
        } else {
            resolve(token!)
        }
    })

    failedQueue = []
}

// Cookie utilities
const getCookieValue = (name: string): string | null => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

export const axiosClient = axios.create({
    baseURL: process.env.VITE_API_URL || 'http://localhost:3000',
    timeout: 10000,
    withCredentials: true, // 🔥 Important: Send cookies với requests
})

// 🔥 REQUEST INTERCEPTOR - Add access token
axiosClient.interceptors.request.use(
    config => {
        // Get fresh token from memory/localStorage
        const token = accessToken || localStorage.getItem('access-token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => Promise.reject(error),
)

// 🔥 RESPONSE INTERCEPTOR - Handle token refresh
axiosClient.interceptors.response.use(
    response => response.data,
    async error => {
        const originalRequest = error.config

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            // If already refreshing, queue this request
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`
                        return axiosClient(originalRequest)
                    })
                    .catch(err => {
                        return Promise.reject(err)
                    })
            }

            isRefreshing = true

            try {
                // 🔥 Attempt to refresh token
                const refreshResponse = await axios.post(
                    `${process.env.VITE_API_URL || 'http://localhost:3001/api'}/auth/refresh`,
                    {},
                    {
                        withCredentials: true, // Send refresh token cookie
                        timeout: 5000,
                    },
                )

                const newAccessToken = refreshResponse.data.accessToken

                // Update tokens
                accessToken = newAccessToken
                localStorage.setItem('access-token', newAccessToken)

                // Process queued requests with new token
                processQueue(null, newAccessToken)

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return axiosClient(originalRequest)
            } catch (refreshError) {
                // Refresh failed - logout user
                processQueue(refreshError, null)

                // Clear tokens
                accessToken = null
                localStorage.removeItem('access-token')

                // Clear refresh token cookie (if possible from client)
                document.cookie = 'refreshToken=; Max-Age=0; path=/; SameSite=Strict'

                // Redirect to login
                window.location.href = '/sign-in'

                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        // Handle other errors
        return Promise.reject(error)
    },
)

// 🔥 Token management utilities
export const tokenManager = {
    setAccessToken: (token: string) => {
        accessToken = token
        localStorage.setItem('access-token', token)
    },

    getAccessToken: () => {
        return accessToken || localStorage.getItem('access-token')
    },

    clearTokens: () => {
        accessToken = null
        localStorage.removeItem('access-token')
        // Clear refresh token cookie
        document.cookie = 'refreshToken=; Max-Age=0; path=/; SameSite=Strict'
    },

    // Check if refresh token exists in cookies
    hasRefreshToken: () => {
        return getCookieValue('refreshToken') !== null
    },
}

export default axiosClient
