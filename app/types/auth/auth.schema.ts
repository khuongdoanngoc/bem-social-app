import { z } from 'zod'

export const signUpSchema = z
    .object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.string().email('Invalid email').min(1, 'Email is required'),
        password: z
            .string()
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            ),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export const signInSchema = z.object({
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
})

export type SignUpFormData = z.infer<typeof signUpSchema>
export type SignInFormData = z.infer<typeof signInSchema>
