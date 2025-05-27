'use client'

import {
  AnimatedRoleProps,
  createAnimationVariants,
  fadeInUpVariants,
  RoleType,
} from '@/components/home'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const DEFAULT_ROLES: RoleType[] = [
  { first: 'Software', second: 'Engineer' },
  { first: 'Frontend', second: 'Developer' },
  { first: 'Backend', second: 'Engineer' },
  { first: 'Full Stack', second: 'Developer' },
  { first: 'Mobile', second: 'Developer' },
  { first: 'DevOps', second: 'Engineer' },
  { first: 'UI/UX', second: 'Designer' },
  { first: 'Product', second: 'Engineer' },
]

const DEFAULT_INTERVAL = 2800

export default function HomeHeading() {
  return (
    <motion.div className="space-y-3" variants={fadeInUpVariants}>
      <h1 id="home-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-foreground via-foreground/95 to-foreground/85 bg-clip-text text-transparent">
          Nolin Naidoo
        </span>
      </h1>
      <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground">
        <AnimatedRole />
      </p>
    </motion.div>
  )
}

export function AnimatedRole({
  roles = DEFAULT_ROLES,
  interval = DEFAULT_INTERVAL,
  className = 'relative inline-block min-h-[1.2em]',
}: AnimatedRoleProps = {}) {
  const { currentRole, currentIndex } = useRoleRotation(roles, interval)
  const prefersReducedMotion = useReducedMotion()

  const RoleSpan = ({ role, index }: { role: RoleType; index: number }) => {
    const animationVariants = createAnimationVariants(prefersReducedMotion ?? false)

    return (
      <motion.span
        key={index}
        {...animationVariants}
        className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
      >
        <span className="bg-gradient-to-r from-primary/90 via-foreground to-primary/70 bg-clip-text text-transparent font-medium">
          {role.first}
        </span>
        <span className="mx-2 text-muted-foreground/60">•</span>
        <span className="bg-gradient-to-r from-foreground via-primary/80 to-foreground/90 bg-clip-text text-transparent font-medium">
          {role.second}
        </span>
      </motion.span>
    )
  }

  return (
    <span className={className} aria-live="polite" aria-label="Current role">
      <AnimatePresence mode="wait">
        <RoleSpan role={currentRole} index={currentIndex} />
      </AnimatePresence>
    </span>
  )
}

export function useRoleRotation(roles: RoleType[], intervalMs: number) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [roles.length, intervalMs])

  return { currentRole: roles[currentIndex], currentIndex }
}
