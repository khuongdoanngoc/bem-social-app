import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/services/apis/auth.api'
import { type ApiResponse } from '@/types/common/api.response'
import type { SignInResponse } from '@/types/auth'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/authStore'

export const useSignUpMutation = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: authApi.signUp,
        onSuccess: (response: ApiResponse<null | undefined>) => {
            if (response.statusCode === 201) {
                toast.success(response.message)
                navigate('/sign-in')
            } else {
                toast.error(response.message)
            }
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
                    signIn(response.data.user, response.data.token)
                }
                navigate('/')
            } else {
                toast.error(response.message)
            }
        },
    })
}
