import { SignInForm } from '@/components/forms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignInPage() {


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
                            <CardTitle className="text-white text-xl">Sign in to Social</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <SignInForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
