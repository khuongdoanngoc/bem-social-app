import type { Route } from './+types/home'
import { Camera, Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Home' }, { name: 'description', content: 'Home page' }]
}

export default function Home() {
    // Mock data for posts
    const posts = [
        {
            id: 1,
            user: {
                name: 'Kohaku Tora',
                username: 'kohakutora',
                avatar: '🦊'
            },
            content: '🦊 UI/UX Designer | 🔥 Crafting seamless digital experiences\n⚡ Designing user-centric interfaces\n🗽 NYC | Post on #Design #UX #UI',
            image: null,
            timestamp: '2h',
            likes: 24,
            comments: 8,
            shares: 3
        },
        {
            id: 2,
            user: {
                name: 'Design Studio',
                username: 'designstudio',
                avatar: '🎨'
            },
            content: 'Beautiful sunset from our office today! Sometimes the best inspiration comes from nature 🌅',
            image: '/app/assets/imgs/background.jpg',
            timestamp: '4h',
            likes: 156,
            comments: 23,
            shares: 12
        }
    ]

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-typo">Home</h1>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Camera className="w-5 h-5" />
                </Button>
            </div>

            {/* Create Post */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-4">
                    <div className="flex space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                            <span className="text-primary font-bold text-sm">K</span>
                        </div>
                        <div className="flex-1">
                            <textarea
                                placeholder="What's happening?"
                                className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none resize-none text-lg"
                                rows={3}
                            />
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex space-x-3">
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                                        <Camera className="w-5 h-5" />
                                    </Button>
                                </div>
                                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.id} className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex space-x-3">
                                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                                        <span className="text-lg">{post.user.avatar}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-white">{post.user.name}</span>
                                            <span className="text-gray-400 text-sm">@{post.user.username}</span>
                                            <span className="text-gray-400 text-sm">·</span>
                                            <span className="text-gray-400 text-sm">{post.timestamp}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-3">
                                <p className="text-white whitespace-pre-line">{post.content}</p>
                                {post.image && (
                                    <div className="rounded-lg overflow-hidden">
                                        <img 
                                            src={post.image} 
                                            alt="Post image" 
                                            className="w-full h-64 object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400 space-x-2">
                                        <Heart className="w-4 h-4" />
                                        <span>{post.likes}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-blue-400 space-x-2">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{post.comments}</span>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400 space-x-2">
                                        <Share className="w-4 h-4" />
                                        <span>{post.shares}</span>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
