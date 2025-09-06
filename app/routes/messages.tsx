import { MessageCircle, Search, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function MessagesPage() {
    const conversations = [
        {
            id: 1,
            user: 'Design Studio',
            avatar: '🎨',
            lastMessage: 'Thanks for the feedback on the design!',
            time: '2m',
            unread: true
        },
        {
            id: 2,
            user: 'UX Planet',
            avatar: '🌍',
            lastMessage: 'When can we schedule the review?',
            time: '1h',
            unread: false
        },
        {
            id: 3,
            user: 'Frontend Masters',
            avatar: '💻',
            lastMessage: 'Great tutorial, thanks for sharing!',
            time: '3h',
            unread: false
        },
    ]

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-typo">Messages</h1>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <MoreHorizontal className="w-5 h-5" />
                </Button>
            </div>

            {/* Search */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search messages"
                            className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Conversations */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span>Recent Conversations</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    {conversations.map((conversation) => (
                        <div 
                            key={conversation.id} 
                            className="flex items-center space-x-3 p-3 hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                                    <span className="text-lg">{conversation.avatar}</span>
                                </div>
                                {conversation.unread && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-white">{conversation.user}</span>
                                    <span className="text-gray-400 text-sm">{conversation.time}</span>
                                </div>
                                <p className={`text-sm truncate ${conversation.unread ? 'text-white font-medium' : 'text-gray-400'}`}>
                                    {conversation.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
