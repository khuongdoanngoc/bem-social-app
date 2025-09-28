import type { ApiResponse } from '@/types/common/api.response'
import type { Profile, UpdateProfileFormData } from '@/types/profile'
import { axiosClient } from '../axiosClient'

export const profileApi = {
    getProfileByUserId: async (userId: string): Promise<ApiResponse<Profile>> => {
        return await axiosClient.get(`/profile/${userId}`)
    },

    updateProfileByUserId: async (userId: string, data: UpdateProfileFormData | FormData): Promise<ApiResponse<Profile>> => {
        const config = data instanceof FormData ? {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        } : {}
        
        return await axiosClient.put(`/profile/${userId}`, data, config)
    },
}
