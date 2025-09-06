import { type RouteConfig, index, layout, route } from '@react-router/dev/routes'

export default [
    route('sign-in', 'routes/sign-in.tsx'),
    route('sign-up', 'routes/sign-up.tsx'),
    layout('components/shared/protected-route.tsx', [
        layout('components/layout/main-layout.tsx', [
            index('routes/home.tsx'),
            route('explore', 'routes/explore.tsx'),
            route('notifications', 'routes/notifications.tsx'),
            route('messages', 'routes/messages.tsx'),
            route('bookmarks', 'routes/bookmarks.tsx'),
            route('profile', 'routes/profile.tsx'),
            route('settings', 'routes/settings.tsx'),
        ]),
    ]),
] satisfies RouteConfig
