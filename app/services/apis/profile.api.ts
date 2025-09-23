import type { ApiResponse } from '@/types/common/api.response'
import type { Profile } from '@/types/profile'
import { axiosClient } from '../axiosClient'

export const profileApi = {
    getProfileByUserId: async (userId: string): Promise<ApiResponse<Profile>> => {
        return await axiosClient.get(`/profile/${userId}`)
    },

    updateProfileByUserId: async (userId: string, data: Profile): Promise<ApiResponse<Profile>> => {
        return await axiosClient.put(`/profile/${userId}`, data)
    },
}
