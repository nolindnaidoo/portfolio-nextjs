'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { Home } from 'lucide-react'
import { useMemo } from 'react'

interface LeftSideProps {
  children: React.ReactNode
  pageTitle?: string
  transitionKey?: string // Add key for transitions
}

// Header component for the left side with back button functionality
const LeftSideHeader = ({
  onBack,
  pageTitle = 'Back',
  showBackButton = false,
  icon = null,
}: {
  onBack?: () => void
  pageTitle?: string
  showBackButton?: boolean
  icon?: React.ReactNode
}) => {
  return (
    <motion.header
      className="flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      }}
    >
      <div className="flex items-center gap-3">
        {showBackButton && onBack ? (
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Go back"
            asChild
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <span className="text-foreground/80">←</span>
            </motion.button>
          </Button>
        ) : (
          <motion.div
            className="w-8 h-8 bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.2,
            }}
          >
            {icon || <span className="text-foreground/80 text-xs">⌘</span>}
          </motion.div>
        )}
        <motion.h2
          className="text-foreground/90 font-medium text-sm"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: 0.3,
          }}
        >
          {pageTitle}
        </motion.h2>
      </div>
    </motion.header>
  )
}

export default function LeftSide({
  children,
  pageTitle,
  transitionKey,
}: LeftSideProps) {
  // Determine header props based on current content
  const getHeaderProps = () => {
    return {
      pageTitle: pageTitle || 'Home',
      showBackButton: false,
      icon: <Home className="w-4 h-4 text-foreground/80" />,
    }
  }

  const headerProps = getHeaderProps()

  // Premium animation variants for content transitions
  const contentVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: 40,
        scale: 0.96,
        filter: 'blur(12px)',
        rotateX: 8,
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        rotateX: 0,
        transition: {
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
      exit: {
        opacity: 0,
        y: -30,
        scale: 0.98,
        filter: 'blur(8px)',
        rotateX: -5,
        transition: {
          duration: 0.5,
          ease: [0.55, 0.06, 0.68, 0.19],
          staggerChildren: 0.05,
          staggerDirection: -1,
        },
      },
    }),
    [],
  )

  // Container animation variants
  const containerVariants = useMemo(
    () => ({
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition: {
          duration: 0.6,
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.4,
          staggerChildren: 0.1,
          staggerDirection: -1,
        },
      },
    }),
    [],
  )

  // Generate a unique key for transitions
  const animationKey = transitionKey || pageTitle || 'default'

  return (
    <motion.div
      className="relative h-full bg-gradient-to-br from-muted/15 via-muted/25 to-muted/35 border-r border-border/40 flex flex-col"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Premium separator with enhanced shadow */}
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-border/30 via-border/60 to-border/30"></div>
      <div className="absolute right-[-1px] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/20 to-transparent"></div>
      <div className="absolute right-[-2px] top-0 h-full w-px bg-gradient-to-b from-transparent via-background/10 to-transparent"></div>

      {/* Header */}
      <LeftSideHeader {...headerProps} />

      {/* Content with premium padding and typography hierarchy */}
      <div className="relative flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={animationKey}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
              }}
            >
              {/* Content wrapper with additional micro-animations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
              >
                {children}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
