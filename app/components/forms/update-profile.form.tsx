import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileSchema, type UpdateProfileFormData, type Profile } from '@/types/profile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import { Camera, Upload, X } from 'lucide-react'
import { formatDateForInput } from '@/utils/formatDate'
import { getAvatarDisplay, getCoverDisplay } from '@/utils/avatarUtils'

interface UpdateProfileFormProps {
    profile: Profile
    onUpdate?: (data: UpdateProfileFormData | FormData) => Promise<void>
    trigger: React.ReactNode
}

export const UpdateProfileForm = ({ profile, onUpdate, trigger }: UpdateProfileFormProps) => {
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar || null)
    const [coverPreview, setCoverPreview] = useState<string | null>(profile.cover || null)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [coverFile, setCoverFile] = useState<File | null>(null)

    const form = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            description: profile.description || '',
            avatar: profile.avatar || '',
            cover: profile.cover || '',
            phone: profile.phone || '',
            birthDate: formatDateForInput(profile.birthDate),
        },
    })

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
        const file = event.target.files?.[0]
        if (file) {
            // Create preview URL for display
            const reader = new FileReader()
            reader.onload = e => {
                const result = e.target?.result as string
                if (type === 'avatar') {
                    setAvatarPreview(result)
                } else {
                    setCoverPreview(result)
                }
            }
            reader.readAsDataURL(file)

            // Store the actual File object for FormData
            if (type === 'avatar') {
                setAvatarFile(file)
                form.setValue('avatar', file)
            } else {
                setCoverFile(file)
                form.setValue('cover', file)
            }
        }
    }

    const removeImage = (type: 'avatar' | 'cover') => {
        if (type === 'avatar') {
            setAvatarPreview(null)
            setAvatarFile(null)
            form.setValue('avatar', null)
        } else {
            setCoverPreview(null)
            setCoverFile(null)
            form.setValue('cover', null)
        }
    }

    const onSubmit = async (data: UpdateProfileFormData) => {
        try {
            setIsSubmitting(true)

            // Create FormData for multipart/form-data
            const formData = new FormData()

            // Add text fields
            formData.append('firstName', data.firstName)
            if (data.lastName) formData.append('lastName', data.lastName)
            if (data.description) formData.append('description', data.description)
            if (data.phone) formData.append('phone', data.phone)
            if (data.birthDate) formData.append('birthDate', data.birthDate)

            // Handle avatar: File | string | null
            if (data.avatar instanceof File) {
                formData.append('avatar', data.avatar)
            } else if (data.avatar === null) {
                formData.append('avatarAction', 'remove')
            } else if (typeof data.avatar === 'string' && data.avatar) {
                formData.append('avatarAction', 'keep')
                formData.append('avatarUrl', data.avatar)
            }

            // Handle cover: File | string | null
            if (data.cover instanceof File) {
                formData.append('cover', data.cover)
            } else if (data.cover === null) {
                formData.append('coverAction', 'remove')
            } else if (typeof data.cover === 'string' && data.cover) {
                formData.append('coverAction', 'keep')
                formData.append('coverUrl', data.cover)
            }

            await onUpdate?.(formData as any) // Type assertion for now
            setOpen(false)
            // Reset form to new values after successful update
            form.reset(data)
        } catch (error) {
            console.error('Failed to update profile:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (!newOpen) {
            // Reset form when closing
            form.reset({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                description: profile.description || '',
                avatar: profile.avatar || '',
                cover: profile.cover || '',
                phone: profile.phone || '',
                birthDate: formatDateForInput(profile.birthDate),
            })
            setAvatarPreview(profile.avatar || null)
            setCoverPreview(profile.cover || null)
            setAvatarFile(null)
            setCoverFile(null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-gray-800/95 border-gray-700/50 backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle className="text-white font-typo text-xl">Edit Profile</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Update your profile information. Changes will be saved immediately.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    {/* Cover Image */}
                    <div className="space-y-3">
                        <Label className="text-gray-300 text-sm font-medium">Cover Photo</Label>
                        <div className="relative">
                            <div className="h-24 sm:h-32 bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg overflow-hidden">
                                {(() => {
                                    const cover = getCoverDisplay(coverPreview)
                                    console.log(cover)
                                    return cover.type === 'image' ? (
                                        <img
                                            src={cover.value}
                                            alt="Cover preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : null // Show default gradient background when no cover
                                })()}
                            </div>
                            <div className="absolute top-2 right-2 flex gap-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleImageUpload(e, 'cover')}
                                    className="hidden"
                                    id="cover-upload"
                                />
                                <label
                                    htmlFor="cover-upload"
                                    className="bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 text-white p-2 rounded-md cursor-pointer transition-colors"
                                >
                                    <Upload className="w-4 h-4" />
                                </label>
                                {(() => {
                                    const cover = getCoverDisplay(coverPreview)
                                    return (
                                        cover.type === 'image' && (
                                            <button
                                                type="button"
                                                onClick={() => removeImage('cover')}
                                                className="bg-red-500/80 hover:bg-red-600/80 text-white p-2 rounded-md transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )
                                    )
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="space-y-3">
                        <Label className="text-gray-300 text-sm font-medium">Profile Picture</Label>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 rounded-full flex items-center justify-center border-4 border-gray-700 overflow-hidden">
                                    {(() => {
                                        const avatar = getAvatarDisplay(avatarPreview, profile.firstName, profile.email)
                                        return avatar.type === 'image' ? (
                                            <img
                                                src={avatar.value}
                                                alt="Avatar preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-primary font-bold text-lg sm:text-xl">
                                                {avatar.value}
                                            </span>
                                        )
                                    })()}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => handleImageUpload(e, 'avatar')}
                                    className="hidden"
                                    id="avatar-upload"
                                />
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute -bottom-1 -right-1 bg-primary hover:bg-primary/90 text-primary-foreground p-1.5 rounded-full cursor-pointer transition-colors"
                                >
                                    <Camera className="w-3 h-3" />
                                </label>
                            </div>
                            {(() => {
                                const avatar = getAvatarDisplay(avatarPreview, profile.firstName, profile.email)
                                return (
                                    avatar.type === 'image' && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => removeImage('avatar')}
                                            className="bg-gray-800/80 border-gray-600/50 text-white hover:bg-gray-700/80"
                                        >
                                            Remove
                                        </Button>
                                    )
                                )
                            })()}
                        </div>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-300">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                {...form.register('firstName')}
                                className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                                placeholder="Enter first name"
                            />
                            {form.formState.errors.firstName && (
                                <p className="text-red-400 text-sm">{form.formState.errors.firstName.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-300">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                {...form.register('lastName')}
                                className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                                placeholder="Enter last name"
                            />
                            {form.formState.errors.lastName && (
                                <p className="text-red-400 text-sm">{form.formState.errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-gray-300">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                {...form.register('phone')}
                                className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm"
                                placeholder="Enter phone number"
                            />
                            {form.formState.errors.phone && (
                                <p className="text-red-400 text-sm">{form.formState.errors.phone.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="birthDate" className="text-gray-300">
                                Birth Date
                            </Label>
                            <Input
                                id="birthDate"
                                type="date"
                                {...form.register('birthDate')}
                                className="bg-gray-800/80 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm [&::-webkit-calendar-picker-indicator]:invert"
                                placeholder="Select birth date"
                            />
                            {form.formState.errors.birthDate && (
                                <p className="text-red-400 text-sm">{form.formState.errors.birthDate.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-300">
                            Bio
                        </Label>
                        <textarea
                            id="description"
                            {...form.register('description')}
                            rows={3}
                            className="w-full bg-gray-800/80 border border-gray-600/50 text-white placeholder:text-gray-400 focus:border-primary focus:ring-primary backdrop-blur-sm rounded-md px-3 py-2 resize-none text-sm sm:text-base"
                            placeholder="Tell us about yourself..."
                        />
                        {form.formState.errors.description && (
                            <p className="text-red-400 text-sm">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <DialogFooter className="gap-2 flex-col sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            className="w-full sm:w-auto bg-gray-800/80 border-gray-600/50 text-white hover:bg-gray-700/80"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            {isSubmitting ? 'Updating...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
