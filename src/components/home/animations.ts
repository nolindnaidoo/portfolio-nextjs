export interface RoleType {
  first: string
  second: string
}

export interface AnimatedRoleProps {
  roles?: RoleType[]
  interval?: number
  className?: string
}

export const fadeInUpVariants = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const staggerContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

export const roleAnimationVariants = {
  initial: { opacity: 0, y: 30, scale: 0.9, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -30, scale: 0.9, filter: 'blur(8px)' },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
    scale: { duration: 0.5, ease: 'easeOut' },
    filter: { duration: 0.4 },
  },
}

// Animation configuration factory for reduced motion
export const createAnimationVariants = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.2 } },
    }
  }
  return roleAnimationVariants
}
