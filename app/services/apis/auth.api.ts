import { type SignUpFormData, type SignInFormData } from '@/types/auth/auth.schema'
import { axiosClient } from '../axiosClient'

export const authApi = {
    signUp: async (data: SignUpFormData) => {
        return (await axiosClient.post('/auth/sign-up', data)).data
    },
    signIn: async (data: SignInFormData) => {
        return (await axiosClient.post('/auth/sign-in', data)).data
    },
    logout: async () => {
        return (await axiosClient.post('/auth/logout')).data
    },
}
