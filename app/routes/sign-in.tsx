import type { Route } from './+types/sign-in'
import SignInPage from '@/pages/sign-in'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Sign In' }, { name: 'description', content: 'Sign In to your account' }]
}

export default function SignIn() {
    return <SignInPage />
}
