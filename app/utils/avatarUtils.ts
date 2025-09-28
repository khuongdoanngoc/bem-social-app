/**
 * Utility functions for handling user avatar display
 */

/**
 * Gets the display avatar - prioritizes AWS S3 image URL over fallback character
 * @param avatarUrl - The avatar URL (from AWS S3 or other source)
 * @param firstName - User's first name
 * @param email - User's email (fallback for initial)
 * @returns Object with avatar type and display value
 */
export const getAvatarDisplay = (
    avatarUrl?: string | null,
    firstName?: string | null,
    email?: string
) => {
    // Check if we have a valid image URL (AWS S3, HTTP/HTTPS, or data URL from file upload)
    if (avatarUrl && avatarUrl.trim()) {
        return {
            type: 'image' as const,
            value: avatarUrl,
        }
    }

    // Fallback to first character of first name or email
    const initial = firstName?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase() || '?'
    
    return {
        type: 'initial' as const,
        value: initial,
    }
}

/**
 * Gets the display cover image - returns image URL if available, null if not
 * @param coverUrl - The cover image URL (from AWS S3 or other source)
 * @returns Object with cover display info
 */
export const getCoverDisplay = (coverUrl?: string | null) => {
    // Check if we have a valid image URL (AWS S3, HTTP/HTTPS, or data URL from file upload)
    if (coverUrl && coverUrl.trim()) {
        return {
            type: 'image' as const,
            value: coverUrl,
        }
    }

    // No cover image - use default gradient background
    return {
        type: 'default' as const,
        value: null,
    }
}

/**
 * Gets avatar display classes based on size
 */
export const getAvatarClasses = (size: 'sm' | 'md' | 'lg' | 'xl' = 'md') => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-10 h-10 text-sm',
        lg: 'w-16 h-16 text-lg sm:w-20 sm:h-20 sm:text-xl',
        xl: 'w-24 h-24 text-2xl',
    }

    return {
        container: `${sizeClasses[size]} bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 overflow-hidden`,
        image: 'w-full h-full object-cover',
        initial: 'text-primary font-bold',
    }
}
