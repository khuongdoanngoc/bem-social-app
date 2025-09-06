export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    createdAt: Date
    updatedAt: Date
}

export interface SignInResponse {
    accessToken: string
    refreshToken: string
    user: User
}
