import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BookmarksPage() {
    const bookmarkedPosts = [
        {
            id: 1,
            user: {
                name: 'Design Inspiration',
                username: 'designinspiration',
                avatar: '🎨'
            },
            content: 'Essential design principles every designer should know:\n\n1. Contrast\n2. Repetition\n3. Alignment\n4. Proximity\n\n#design #principles #tips',
            timestamp: '2d',
            likes: 342,
            comments: 56,
            shares: 89
        },
        {
            id: 2,
            user: {
                name: 'React Tips',
                username: 'reacttips',
                avatar: '⚛️'
            },
            content: 'Pro tip: Use React.memo() for performance optimization when props rarely change. Here\'s a quick example:\n\nconst MyComponent = React.memo(({ data }) => {\n  return <div>{data.title}</div>\n})',
            timestamp: '1w',
            likes: 567,
            comments: 123,
            shares: 234
        }
    ]

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-typo">Bookmarks</h1>
            </div>

            {/* Empty state or bookmarked posts */}
            {bookmarkedPosts.length === 0 ? (
                <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                    <CardContent className="text-center py-12">
                        <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No bookmarks yet</h3>
                        <p className="text-gray-400">Save posts to read them later</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {bookmarkedPosts.map((post) => (
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
                                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                        <Bookmark className="w-4 h-4 fill-current" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <p className="text-white whitespace-pre-line">{post.content}</p>
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
            )}
        </div>
    )
}
