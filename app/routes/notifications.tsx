import { Heart, MessageCircle, UserPlus, Share } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: 'like',
            user: 'Design Studio',
            content: 'liked your post',
            time: '2m',
            icon: Heart,
            color: 'text-red-400'
        },
        {
            id: 2,
            type: 'comment',
            user: 'UX Planet',
            content: 'commented on your post: "Great design insights!"',
            time: '1h',
            icon: MessageCircle,
            color: 'text-blue-400'
        },
        {
            id: 3,
            type: 'follow',
            user: 'Frontend Masters',
            content: 'started following you',
            time: '3h',
            icon: UserPlus,
            color: 'text-green-400'
        },
        {
            id: 4,
            type: 'share',
            user: 'React Community',
            content: 'shared your post',
            time: '5h',
            icon: Share,
            color: 'text-purple-400'
        },
    ]

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-typo">Notifications</h1>
            </div>

            {/* Notifications */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {notifications.map((notification) => {
                        const Icon = notification.icon
                        return (
                            <div key={notification.id} className="flex items-start space-x-3 p-3 hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer">
                                <div className={`p-2 rounded-full bg-gray-700/50 ${notification.color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-white">{notification.user}</span>
                                        <span className="text-gray-400">{notification.content}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-1">{notification.time}</p>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    )
}
