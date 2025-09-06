import { Settings, User, Bell, Shield, Palette, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SettingsPage() {
    const settingsCategories = [
        {
            title: 'Account',
            icon: User,
            items: [
                { label: 'Edit Profile', description: 'Update your profile information' },
                { label: 'Change Password', description: 'Update your account password' },
                { label: 'Privacy Settings', description: 'Control who can see your content' },
            ]
        },
        {
            title: 'Notifications',
            icon: Bell,
            items: [
                { label: 'Push Notifications', description: 'Manage push notification preferences' },
                { label: 'Email Notifications', description: 'Control email notification settings' },
                { label: 'In-App Notifications', description: 'Customize in-app alerts' },
            ]
        },
        {
            title: 'Security',
            icon: Shield,
            items: [
                { label: 'Two-Factor Authentication', description: 'Add an extra layer of security' },
                { label: 'Login Activity', description: 'See where you\'re logged in' },
                { label: 'App Permissions', description: 'Manage third-party app access' },
            ]
        },
        {
            title: 'Appearance',
            icon: Palette,
            items: [
                { label: 'Theme', description: 'Choose between light and dark mode' },
                { label: 'Display Size', description: 'Adjust text and UI scaling' },
                { label: 'Language', description: 'Change app language' },
            ]
        },
        {
            title: 'General',
            icon: Globe,
            items: [
                { label: 'About', description: 'App version and information' },
                { label: 'Help & Support', description: 'Get help and contact support' },
                { label: 'Terms of Service', description: 'Read our terms and conditions' },
            ]
        }
    ]

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white font-typo">Settings</h1>
            </div>

            {/* Settings Categories */}
            <div className="space-y-4">
                {settingsCategories.map((category, index) => {
                    const Icon = category.icon
                    return (
                        <Card key={index} className="bg-gray-800/80 border-gray-700/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center space-x-2">
                                    <Icon className="w-5 h-5 text-primary" />
                                    <span>{category.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {category.items.map((item, itemIndex) => (
                                    <Button
                                        key={itemIndex}
                                        variant="ghost"
                                        className="w-full justify-start h-auto p-4 hover:bg-gray-700/30"
                                    >
                                        <div className="text-left">
                                            <p className="text-white font-medium">{item.label}</p>
                                            <p className="text-gray-400 text-sm">{item.description}</p>
                                        </div>
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
