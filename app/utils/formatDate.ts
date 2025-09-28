export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export const formatDateForInput = (isoDate: string): string => {
    if (!isoDate) return ''
    try {
        const date = new Date(isoDate)
        return date.toISOString().split('T')[0]
    } catch {
        return ''
    }
}