'use client'

import TerminalSection from '@/components/terminal/Terminal'

const CONTAINER_STYLES = {
  MAIN: 'relative h-full bg-gradient-to-bl from-background/95 via-muted/10 to-background/90 border-l border-border/20',
  DEPTH_OVERLAY: 'absolute inset-0 bg-gradient-to-br from-transparent via-muted/5 to-border/8',
  BORDER_ENHANCEMENT:
    'absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent',
} as const

export interface RightSideProps {
  className?: string
}

export default function RightSide({ className = '' }: RightSideProps) {
  return (
    <div className={`${CONTAINER_STYLES.MAIN} ${className}`}>
      <div className={CONTAINER_STYLES.DEPTH_OVERLAY}></div>
      <div className={CONTAINER_STYLES.BORDER_ENHANCEMENT}></div>
      <div className="relative h-full">
        <TerminalSection />
      </div>
    </div>
  )
}
