import { Search, TrendingUp, Users, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function ExplorePage() {
    const trends = [
        { hashtag: '#design', posts: '125K posts' },
        { hashtag: '#ux', posts: '89K posts' },
        { hashtag: '#react', posts: '156K posts' },
        { hashtag: '#typescript', posts: '67K posts' },
    ]

    const suggestedUsers = [
        { name: 'Design System', username: 'designsystem', followers: '12.3K' },
        { name: 'UX Planet', username: 'uxplanet', followers: '45.7K' },
        { name: 'Frontend Masters', username: 'frontendmasters', followers: '234K' },
    ]

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-typo">Explore</h1>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Camera className="w-5 h-5" />
                </Button>
            </div>

            {/* Search */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                            placeholder="Search BEM Social"
                            className="pl-10 bg-gray-700/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-primary"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Trending */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <span>Trending</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {trends.map((trend, index) => (
                        <div key={index} className="flex items-center justify-between py-2 hover:bg-gray-700/30 rounded-lg px-3 transition-colors cursor-pointer">
                            <div>
                                <p className="text-primary font-medium">{trend.hashtag}</p>
                                <p className="text-gray-400 text-sm">{trend.posts}</p>
                            </div>
                            <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Suggested Users */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span>Who to follow</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {suggestedUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                                    <span className="text-primary font-bold text-sm">
                                        {user.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">{user.name}</p>
                                    <p className="text-gray-400 text-sm">@{user.username} · {user.followers}</p>
                                </div>
                            </div>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                Follow
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
