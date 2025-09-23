import { profileApi } from '@/services/apis/profile.api'
import type { Profile } from '@/types/profile'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { ApiResponse } from '@/types/common/api.response'

export const useProfileQuery = (userId: string) => {
    const query = useQuery({
        queryKey: ['profile', userId],
        queryFn: () => profileApi.getProfileByUserId(userId).then(res => res.data) as Promise<Profile>,
        enabled: !!userId,
    })

    return query
}

export const useUpdateProfileMutation = (userId: string) => {
    return useMutation({
        mutationFn: (data: Profile) => profileApi.updateProfileByUserId(userId, data),
        onSuccess: (response: ApiResponse<Profile>) => {
            toast.success(response.message)
        },
        onError: (error: AxiosError) => {
            toast.error((error.response?.data as { message: string }).message)
        },
    })
}
