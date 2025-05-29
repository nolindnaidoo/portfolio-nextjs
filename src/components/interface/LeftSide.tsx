'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Home } from 'lucide-react'

const CONTAINER_STYLES = {
  MAIN: 'relative h-full bg-gradient-to-br from-muted/15 via-muted/25 to-muted/35 border-r border-border/40 flex flex-col',
  CONTENT_WRAPPER: 'relative flex-1 overflow-y-auto px-8 py-8',
  CONTENT_INNER: 'max-w-md mx-auto',
  HEADER: 'flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0',
  HEADER_GROUP: 'flex items-center gap-3',
  ICON_CONTAINER:
    'w-8 h-8 bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 flex items-center justify-center shadow-lg',
  TITLE: 'text-foreground/90 font-medium text-sm',
} as const

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
}

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20, delay: 0.2 },
  },
}

const titleVariants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
}

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.5 } },
}

export interface LeftSideProps {
  children: React.ReactNode
  pageTitle?: string
  transitionKey?: string
  className?: string
}

export default function LeftSide({
  children,
  pageTitle = 'Home',
  transitionKey,
  className = '',
}: LeftSideProps) {
  const animationKey = transitionKey || pageTitle || 'default'

  return (
    <motion.div
      className={`${CONTAINER_STYLES.MAIN} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-border/30 via-border/60 to-border/30"></div>

      <motion.header
        className={CONTAINER_STYLES.HEADER}
        variants={headerVariants}
        initial="initial"
        animate="animate"
      >
        <div className={CONTAINER_STYLES.HEADER_GROUP}>
          <motion.div
            className={CONTAINER_STYLES.ICON_CONTAINER}
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            <Home className="w-4 h-4 text-foreground/80" />
          </motion.div>
          <motion.h2
            className={CONTAINER_STYLES.TITLE}
            variants={titleVariants}
            initial="initial"
            animate="animate"
          >
            {pageTitle}
          </motion.h2>
        </div>
      </motion.header>

      <div className={CONTAINER_STYLES.CONTENT_WRAPPER}>
        <div className={CONTAINER_STYLES.CONTENT_INNER}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={animationKey}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
