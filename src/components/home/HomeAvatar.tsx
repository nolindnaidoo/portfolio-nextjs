import { fadeInUpVariants } from '@/components/home/animations'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

interface HomeAvatarProps {
  className?: string
}

export default function HomeAvatar({ className = 'relative inline-block' }: HomeAvatarProps = {}) {
  const [imageError, setImageError] = useState(false)

  const AvatarImage = ({ onError }: { onError: () => void }) => (
    <div className="relative size-full overflow-hidden rounded-full">
      <Image
        src="/avatar.webp"
        alt="Nolin Naidoo - Profile Picture"
        fill
        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
        priority
        onError={onError}
        sizes="(max-width: 768px) 128px, 160px"
      />
    </div>
  )

  const AvatarFallbackContent = () => (
    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-card to-muted text-foreground">
      NN
    </AvatarFallback>
  )

  const AvatarContent = ({
    imageError,
    onImageError,
  }: {
    imageError: boolean
    onImageError: () => void
  }) => {
    if (imageError) {
      return <AvatarFallbackContent />
    }

    return <AvatarImage onError={onImageError} />
  }

  return (
    <motion.div className={className} variants={fadeInUpVariants}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl scale-125 opacity-60" />
      <Avatar className="relative size-32 md:size-40 border-4 border-background shadow-2xl ring-4 ring-border/20">
        <AvatarContent imageError={imageError} onImageError={() => setImageError(true)} />
      </Avatar>
    </motion.div>
  )
}
