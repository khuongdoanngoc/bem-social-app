import { Calendar, MapPin, Link2, Camera, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LoadingOverlay } from '@/components/layout'
import type { Route } from './+types/profile'
import { useParams } from 'react-router'
import { useProfileQuery } from '@/hooks/profile'
import { formatDate } from '@/utils/formatDate'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Profile' }, { name: 'description', content: 'Profile page' }]
}

export default function ProfilePage() {
    const { id } = useParams<{ id: string | undefined }>()
    const { data: profile, isLoading, error } = useProfileQuery(id || '')
    const userPosts = [
        {
            id: 1,
            content:
                '🦊 Just finished designing a new user interface for our social platform! Excited to share it with the community. #design #ui #ux',
            timestamp: '2h',
            likes: 45,
            comments: 12,
            shares: 8,
        },
        {
            id: 2,
            content:
                'Beautiful sunset from the office today! Sometimes the best inspiration comes from nature 🌅\n\nWhat inspires your creativity?',
            timestamp: '1d',
            likes: 123,
            comments: 34,
            shares: 21,
        },
    ]

    if (isLoading) {
        return <LoadingOverlay />
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-typo">Profile</h1>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Settings className="w-5 h-5" />
                </Button>
            </div>

            {/* Profile Info */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                    {/* Cover & Avatar */}
                    <div className="relative mb-16">
                        <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg"></div>
                        <div className="absolute -bottom-12 left-6">
                            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center border-4 border-gray-800 shadow-lg">
                                <span className="text-primary font-bold text-2xl">
                                    {profile?.firstName?.charAt(0).toUpperCase() ||
                                        profile?.email.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="absolute -bottom-12 right-6 bg-gray-800/80 border-gray-600/50 text-white hover:bg-gray-700/80"
                        >
                            <Camera className="w-4 h-4 mr-2" />
                            Edit Profile
                        </Button>
                    </div>

                    {/* User Info */}
                    <div className="space-y-3">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : 'User'}
                            </h2>
                            <p className="text-gray-400">@{profile?.email.split('@')[0]}</p>
                        </div>

                        <p className="text-white">
                            {profile?.description}
                        </p>

                        <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                            <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>🌍 Earth</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Link2 className="w-4 h-4" />
                                <span className="text-primary">https://linktr.ee/tranmauritam</span>
                            </div>
                            <br />
                            <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {profile?.createdAt ? formatDate(profile.createdAt) : ''}</span>
                            </div>
                        </div>

                        <div className="flex space-x-6 pt-2">
                            <div className="text-center">
                                <span className="text-white font-bold">{profile?.following}</span>
                                <span className="text-gray-400 text-sm ml-1">Following</span>
                            </div>
                            <div className="text-center">
                                <span className="text-white font-bold">{profile?.followers}</span>
                                <span className="text-gray-400 text-sm ml-1">Followers</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Posts */}
            <Card className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                <CardHeader>
                    <h3 className="text-white font-semibold">Posts</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                    {userPosts.map(post => (
                        <div key={post.id} className="border-b border-gray-700/50 pb-4 last:border-b-0 last:pb-0">
                            <div className="flex items-start space-x-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                                    <span className="text-primary font-bold text-sm">
                                        {profile?.firstName?.charAt(0).toUpperCase() ||
                                            profile?.email.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-semibold text-white">
                                            {profile?.firstName ? `${profile.firstName} ${profile.lastName}` : 'User'}
                                        </span>
                                        <span className="text-gray-400 text-sm">@{profile?.email.split('@')[0]}</span>
                                        <span className="text-gray-400 text-sm">·</span>
                                        <span className="text-gray-400 text-sm">{post.timestamp}</span>
                                    </div>
                                    <p className="text-white whitespace-pre-line">{post.content}</p>
                                    <div className="flex items-center space-x-6 text-gray-400 text-sm">
                                        <span>{post.likes} likes</span>
                                        <span>{post.comments} comments</span>
                                        <span>{post.shares} shares</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
