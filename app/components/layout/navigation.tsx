import { NavLink } from 'react-router'
import { Home, Bell, MessageCircle, Bookmark, User, Search, Settings } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export const Navigation = () => {

    const { user } = useAuthStore()


    const navigationItems = [
        {
            name: 'Home',
            href: '/',
            icon: Home,
        },
        {
            name: 'Explore',
            href: '/explore',
            icon: Search,
        },
        {
            name: 'Notifications',
            href: '/notifications',
            icon: Bell,
        },
        {
            name: 'Messages',
            href: '/messages',
            icon: MessageCircle,
        },
        {
            name: 'Bookmarks',
            href: '/bookmarks',
            icon: Bookmark,
        },
        {
            name: 'Profile',
            href: `/${user?._id}`,
            icon: User,
        },
        {
            name: 'Settings',
            href: '/settings',
            icon: Settings,
        },
    ]
    return (
        <nav className="px-3 space-y-2">
            {navigationItems.map(item => {
                const Icon = item.icon
                return (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => {
                            const baseClasses =
                                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out group relative'
                            const activeClasses = 'bg-primary/15 text-primary'
                            const inactiveClasses = 'text-gray-300 hover:text-white hover:bg-gray-800/40'

                            return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
                        }}
                    >
                        {({ isActive }) => (
                            <>
                                <Icon
                                    className={`w-6 h-6 transition-colors duration-300 ease-in-out ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'}`}
                                />
                                <span className="font-medium">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                )
            })}
        </nav>
    )
}
