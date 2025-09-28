import { useAuthStore } from '@/stores/authStore'
import { LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getAvatarDisplay } from '@/utils/avatarUtils'

export const UserProfile = () => {
    const { user, signOut } = useAuthStore()

    const handleLogout = () => {
        signOut()
    }

    if (!user) {
        return null
    }

    return (
        <div className="space-y-3">
            {/* User info */}
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 overflow-hidden">
                    {(() => {
                        const avatar = getAvatarDisplay(user.avatar, user.firstName, user.email)
                        return avatar.type === 'image' ? (
                            <img 
                                src={avatar.value} 
                                alt="Avatar" 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-primary font-bold text-sm">
                                {avatar.value}
                            </span>
                        )
                    })()}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">
                        {user.firstName ? `${user.firstName} ${user.lastName}` : 'User'}
                    </p>
                    <p className="text-gray-400 text-xs truncate">@{user.email.split('@')[0]}</p>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-gray-400 hover:text-white hover:bg-gray-800/60"
                >
                    <Settings className="w-4 h-4" />
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                >
                    <LogOut className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
