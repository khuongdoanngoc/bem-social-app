import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema, type SignUpFormData } from '@/types/auth'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Eye, EyeOff, Chromium } from 'lucide-react'
import { NavLink } from 'react-router'
import { useState } from 'react'
import { useSignUpMutation } from '@/hooks/queries/auth'

export const SignUpForm = () => {
    const signUpMutation = useSignUpMutation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: SignUpFormData) => {
        signUpMutation.mutate(data)
    }

    const error = signUpMutation.error

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Show error if there is */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-3 py-2 rounded-md">
                    {(error.response?.data as { message: string })?.message || 'An error occurred'}
                </div>
            )}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstname" className="text-gray-300">
                            First Name
                        </Label>
                        <Input
                            id="firstname"
                            type="text"
                            {...form.register('firstName')}
                            className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                            placeholder="First name"
                        />
                        {form.formState.errors.firstName && (
                            <p className="text-red-400 text-sm">{form.formState.errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastname" className="text-gray-300">
                            Last Name
                        </Label>
                        <Input
                            id="lastname"
                            type="text"
                            {...form.register('lastName')}
                            className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                            placeholder="Last name"
                        />
                        {form.formState.errors.lastName && (
                            <p className="text-red-400 text-sm">{form.formState.errors.lastName.message}</p>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        {...form.register('email')}
                        className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                        placeholder="Enter your email"
                    />
                    {form.formState.errors.email && (
                        <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...form.register('password')}
                            className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm pr-10"
                            placeholder="••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {form.formState.errors.password && (
                        <p className="text-red-400 text-sm">{form.formState.errors.password.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmpassword" className="text-gray-300">
                        Confirm Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="confirmpassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...form.register('confirmPassword')}
                            className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm pr-10"
                            placeholder="••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {form.formState.errors.confirmPassword && (
                        <p className="text-red-400 text-sm">{form.formState.errors.confirmPassword.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                <Button
                    type="submit"
                    disabled={signUpMutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
                    size="lg"
                >
                    {signUpMutation.isPending ? 'Creating account...' : 'Sign Up'}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-600/50 bg-gray-800/60 text-white hover:bg-gray-700/70 font-medium py-2.5 backdrop-blur-sm"
                    size="lg"
                >
                    <Chromium className="w-5 h-5 mr-2" />
                    Sign up with Google
                </Button>
            </div>

            <div className="text-center">
                <span className="text-gray-400 text-sm">Already have an account? </span>
                <NavLink to="/sign-in" className="text-primary hover:text-primary/80 text-sm font-medium">
                    Sign in here!
                </NavLink>
            </div>
        </form>
    )
}
