import { z } from 'zod'

export const updateProfileSchema = z.object({
    firstName: z.string().min(1, 'First name is required').max(50, 'First name must be less than 50 characters'),
    lastName: z.string().max(50, 'Last name must be less than 50 characters').optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    avatar: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
    cover: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
    phone: z.string().optional(),
    birthDate: z.string().optional(),
})

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>
