import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInFormData } from '@/types/auth'
import { useSignInMutation } from '@/hooks/auth'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Eye, EyeOff, Chromium } from 'lucide-react'
import { NavLink } from 'react-router'
import { useState } from 'react'

export const SignInForm = () => {
    const signInMutation = useSignInMutation()
    const error = signInMutation.error
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (data: SignInFormData) => {
        signInMutation.mutate(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Show error if there is */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-3 py-2 rounded-md">
                    {(error as { message: string })?.message || 'An error occurred'}
                </div>
            )}
            <div className="space-y-4">
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
            </div>

            <div className="space-y-4">
                <Button
                    type="submit"
                    disabled={signInMutation.isPending}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
                    size="lg"
                >
                    {signInMutation.isPending ? 'Signing in...' : 'Sign In'}
                </Button>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-gray-600/50 bg-gray-800/60 text-white hover:bg-gray-700/70 font-medium py-2.5 backdrop-blur-sm"
                    size="lg"
                >
                    <Chromium className="w-5 h-5 mr-2" />
                    Sign in with Google
                </Button>
            </div>

            <div className="text-center">
                <span className="text-gray-400 text-sm">Don't have an account? </span>
                <NavLink to="/sign-up" className="text-primary hover:text-primary/80 text-sm font-medium">
                    Sign up, it's free!
                </NavLink>
            </div>
        </form>
    )
}
