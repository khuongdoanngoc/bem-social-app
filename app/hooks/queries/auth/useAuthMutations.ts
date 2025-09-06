import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/services/apis/auth.api'
import { type ApiResponse } from '@/types/common/api.response'
import type { SignInResponse, User } from '@/types/auth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/authStore'
import type { AxiosError } from 'axios'

export const useSignUpMutation = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: authApi.signUp,
        onSuccess: (response: ApiResponse<User>) => {
            if (response.statusCode === 201) {
                toast.success(response.message)
                navigate('/sign-in')
            }
        },
        onError: (error: AxiosError) => {
            toast.error((error.response?.data as { message: string }).message)
        },
    })
}

export const useSignInMutation = () => {
    const navigate = useNavigate()
    const signIn = useAuthStore(state => state.signIn)

    return useMutation({
        mutationFn: authApi.signIn,
        onSuccess: (response: ApiResponse<SignInResponse>) => {
            if (response.statusCode === 200) {
                toast.success(response.message)
                if (response.data) {
                    signIn(response.data.user, response.data.accessToken)
                }
                navigate('/')
            }
        },
        onError: (error: AxiosError) => {
            toast.error((error.response?.data as { message: string }).message)
        },
    })
}
