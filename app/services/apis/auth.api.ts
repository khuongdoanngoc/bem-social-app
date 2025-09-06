import { type SignUpFormData, type SignInFormData } from '@/types/auth/auth.schema'
import { type ApiResponse } from '@/types/common/api.response'
import { type User, type SignInResponse } from '@/types/auth'
import { axiosClient } from '../axiosClient'

export const authApi = {
    signUp: async (data: SignUpFormData): Promise<ApiResponse<User>> => {
        return await axiosClient.post('/auth/sign-up', data)
    },
    signIn: async (data: SignInFormData): Promise<ApiResponse<SignInResponse>> => {
        return await axiosClient.post('/auth/sign-in', data)
    },
    logout: async (): Promise<ApiResponse<void>> => {
        return await axiosClient.post('/auth/logout')
    },
}
