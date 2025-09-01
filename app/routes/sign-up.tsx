import type { Route } from './+types/sign-up'
import SignUpPage from '@/pages/sign-up'

export function meta({}: Route.MetaArgs) {
    return [{ title: 'Sign Up' }, { name: 'description', content: 'Sign Up to your account' }]
}

export default function SignUp() {
    return <SignUpPage />
}
