import { NavLink } from 'react-router'
import { Home, Bell, MessageCircle, Bookmark, User, Search, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

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
        href: '/profile',
        icon: User,
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings,
    },
]

export const Navigation = () => {
    return (
        <nav className="px-3 space-y-2">
            {navigationItems.map(item => {
                const Icon = item.icon
                return (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group',
                                'hover:bg-gray-800/60 hover:backdrop-blur-sm',
                                isActive
                                    ? 'bg-primary/20 text-primary border border-primary/30'
                                    : 'text-gray-300 hover:text-white',
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon
                                    className={cn(
                                        'w-6 h-6 transition-colors',
                                        isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white',
                                    )}
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
