'use client'

import { Button } from '@/components/ui/button'
import { useReducedMotion } from '@/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

const ANIMATION_DURATION = 0.3

const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const fullMotionVariants = {
  initial: { opacity: 0, rotate: -90, scale: 0.8 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 90, scale: 0.8 },
}

export interface ThemeToggleProps {
  className?: string
  variant?: 'default' | 'ghost' | 'outline'
}

export function ThemeToggle({ className = '', variant = 'ghost' }: ThemeToggleProps = {}) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const iconVariants = useMemo(
    () => (prefersReducedMotion ? reducedMotionVariants : fullMotionVariants),
    [prefersReducedMotion],
  )

  const ThemeIcon = () => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme

    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
        >
          {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.div>
      </AnimatePresence>
    )
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <Button
        variant={variant}
        size="icon"
        className={`bg-background/50 backdrop-blur-sm border border-border/50 ${className}`}
        disabled
        aria-label="Loading theme toggle"
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  const resolvedTheme = theme === 'system' ? systemTheme : theme
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={() => setTheme(nextTheme)}
      className={`bg-background/50 backdrop-blur-sm border border-border/50 ${className}`}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={resolvedTheme === 'dark'}
      role="checked"
      aria-checked={resolvedTheme === 'dark'}
    >
      <ThemeIcon />
    </Button>
  )
}

export function useThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const resolvedTheme = theme === 'system' ? systemTheme : theme
    const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
  }

  return {
    theme: mounted ? theme : undefined,
    resolvedTheme: mounted ? (theme === 'system' ? systemTheme : theme) : undefined,
    toggleTheme,
    mounted,
  }
}
