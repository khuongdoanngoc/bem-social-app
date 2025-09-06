import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const loadingVariants = cva('flex items-center justify-center', {
    variants: {
        variant: {
            default: 'text-primary',
            secondary: 'text-muted-foreground',
            destructive: 'text-destructive',
        },
        size: {
            sm: 'gap-2',
            default: 'gap-3',
            lg: 'gap-4',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
})

const spinnerVariants = cva('animate-spin', {
    variants: {
        size: {
            sm: 'h-4 w-4',
            default: 'h-6 w-6',
            lg: 'h-8 w-8',
        },
    },
    defaultVariants: {
        size: 'default',
    },
})

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loadingVariants> {
    text?: string
    showSpinner?: boolean
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
    ({ className, variant, size, text = 'Loading...', showSpinner = true, ...props }, ref) => {
        return (
            <div ref={ref} className={cn(loadingVariants({ variant, size, className }))} {...props}>
                {showSpinner && <Loader2 className={cn(spinnerVariants({ size }))} />}
                {text && (
                    <span
                        className={cn('font-medium animate-pulse', {
                            'text-sm': size === 'sm',
                            'text-base': size === 'default',
                            'text-lg': size === 'lg',
                        })}
                    >
                        {text}
                    </span>
                )}
            </div>
        )
    },
)

Loading.displayName = 'Loading'

// Full page loading overlay component
interface LoadingOverlayProps extends LoadingProps {
    isLoading?: boolean
    backdrop?: 'transparent' | 'blur' | 'dark'
}

export const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
    ({ className, isLoading = true, backdrop = 'blur', ...loadingProps }, ref) => {
        if (!isLoading) return null

        return (
            <div
                ref={ref}
                className={cn(
                    'fixed inset-0 z-50 flex items-center justify-center',
                    {
                        'bg-transparent': backdrop === 'transparent',
                        'bg-background/80 backdrop-blur-sm': backdrop === 'blur',
                        'bg-background/90': backdrop === 'dark',
                    },
                    className,
                )}
            >
                <div className="rounded-lg border bg-card p-6 shadow-lg">
                    <Loading {...loadingProps} />
                </div>
            </div>
        )
    },
)

LoadingOverlay.displayName = 'LoadingOverlay'

// Loading skeleton component for content placeholders
interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    lines?: number
    className?: string
}

export const LoadingSkeleton = React.forwardRef<HTMLDivElement, LoadingSkeletonProps>(
    ({ lines = 3, className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('space-y-3', className)} {...props}>
                {Array.from({ length: lines }).map((_, index) => (
                    <div
                        key={index}
                        className={cn('h-4 bg-muted animate-pulse rounded', index === lines - 1 ? 'w-3/4' : 'w-full')}
                    />
                ))}
            </div>
        )
    },
)

LoadingSkeleton.displayName = 'LoadingSkeleton'

// Loading dots component for minimal loading states
export const LoadingDots = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('flex items-center justify-center space-x-1', className)} {...props}>
                {[0, 1, 2].map(index => (
                    <div
                        key={index}
                        className="w-2 h-2 bg-primary rounded-full animate-bounce"
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            animationDuration: '0.6s',
                        }}
                    />
                ))}
            </div>
        )
    },
)

LoadingDots.displayName = 'LoadingDots'

export { loadingVariants }
