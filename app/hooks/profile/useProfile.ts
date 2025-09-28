import { profileApi } from '@/services/apis/profile.api'
import type { Profile, UpdateProfileFormData } from '@/types/profile'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { AxiosError } from 'axios'
import type { ApiResponse } from '@/types/common/api.response'
import { useAuthStore } from '@/stores/authStore'
export const useProfileQuery = (userId: string) => {
    const query = useQuery({
        queryKey: ['profile', userId],
        queryFn: () => profileApi.getProfileByUserId(userId).then(res => res.data) as Promise<Profile>,
        enabled: !!userId,
    })

    return query
}

export const useUpdateProfileMutation = (userId: string) => {
    const queryClient = useQueryClient()
    const { updateUser, user } = useAuthStore()
    
    return useMutation({
        mutationFn: (data: UpdateProfileFormData) => profileApi.updateProfileByUserId(userId, data),
        onSuccess: (response: ApiResponse<Profile>) => {
            toast.success(response.message)
            
            console.log(response.data)
            // Update the query cache immediately with the new profile data
            queryClient.setQueryData(['profile', userId], response.data)
            
            // Nếu đây là profile của current user, cập nhật authStore
            if (user && user._id === userId) {
                updateUser({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    avatar: response.data.avatar,
                })
            }
        },
        onError: (error: AxiosError) => {
            toast.error((error.response?.data as { message: string }).message)
        },
    })
}
