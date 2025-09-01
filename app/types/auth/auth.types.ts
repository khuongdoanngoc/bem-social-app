export type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    createdAt: Date
    updatedAt: Date
}

export interface SignInResponse {
    user: User
    token: string
}
