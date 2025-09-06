import { Navigation } from '@/components/layout/navigation'
import { UserProfile } from '@/components/layout/user-profile'

export const Sidebar = () => {
    return (
        <div className="h-screen p-6">
            <div className="h-full bg-gray-900/90 border border-gray-700/50 backdrop-blur-md rounded-lg shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
                {/* Header with logo */}
                <div className="p-6 border-b border-gray-700/50">
                    <div className="flex items-center space-x-3">
                        <img src="/app/assets/imgs/logo.svg" alt="BEM Social Logo" className="w-10 h-10" />
                        <div>
                            <h1 className="text-lg font-bold font-typo">
                                <span className="text-primary">BEM</span>
                                <span className="text-primary/80">Social</span>
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 py-6 overflow-auto">
                    <Navigation />
                </div>

                {/* User Profile */}
                <div className="p-6 border-t border-gray-700/50">
                    <UserProfile />
                </div>
            </div>
        </div>
    )
}
