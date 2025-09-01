import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Chromium, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function SignUpPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url(/app/assets/imgs/background.jpg)',
            }}
        >
            {/* Blur overlay */}
            <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>

            <div className="w-full max-w-md relative z-10">
                <Card className="bg-gray-900/90 border-gray-700/50 backdrop-blur-md shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] drop-shadow-2xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-center mb-4">
                                <img src="/app/assets/imgs/logo.svg" alt="BEM Social Logo" className="w-32 h-32" />
                            </div>
                            <h1 className="text-2xl font-bold font-typo">
                                <span className="text-primary">BEM</span>
                                <span className="text-primary/80">Social</span>
                            </h1>
                            <CardTitle className="text-white text-xl">Create your account</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname" className="text-gray-300">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstname"
                                        type="text"
                                        className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname" className="text-gray-300">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastname"
                                        type="text"
                                        className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-300">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-300">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
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
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmpassword" className="text-gray-300">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmpassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm pr-10"
                                        placeholder="••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
                                size="lg"
                            >
                                Sign Up
                            </Button>

                            <Button
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
                            <a href="/sign-in" className="text-primary hover:text-primary/80 text-sm font-medium">
                                Sign in here!
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
