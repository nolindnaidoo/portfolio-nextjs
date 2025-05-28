'use client'

import HomeSection from '@/components/home/Home'
import type { LeftPanelContent } from '@/components/terminal/commands'
import { Card } from '@/components/ui'
import { NavigationProvider, useNavigation } from '@/contexts/NavigationContext'
import { debug } from '@/lib'
import { useEffect, useState } from 'react'
import { LeftSideErrorBoundary, RightSideErrorBoundary } from '../error'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const CONTAINER_CONFIG = {
  HEIGHT: 'h-[800px]',
  MAX_WIDTH: 'max-w-7xl',
  CARD_CLASSES:
    'relative w-full bg-card border border-border/30 shadow-2xl overflow-hidden ring-1 ring-border/10',
  INNER_BORDER_CLASSES: 'absolute inset-[1px] rounded-3xl border border-card/50',
} as const

// Test error components for demonstration
function TestLeftError({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('Test error: Left side error boundary demonstration')
  }
  return null
}

function TestRightError({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('Test error: Right side error boundary demonstration')
  }
  return null
}

// Placeholder components for future sections
const AboutSection = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">About Me</h1>
    <p className="text-muted-foreground">Personal background and story coming soon...</p>
  </div>
)

const ProjectsSection = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Projects</h1>
    <p className="text-muted-foreground">Featured work and case studies coming soon...</p>
  </div>
)

const SkillsSection = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Skills</h1>
    <p className="text-muted-foreground">Technical expertise and tools coming soon...</p>
  </div>
)

const ContactSection = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-foreground">Contact</h1>
    <p className="text-muted-foreground">Get in touch and connect coming soon...</p>
  </div>
)

// Test section with error triggers
const TestSection = () => {
  const [leftError, setLeftError] = useState(false)
  const [rightError, setRightError] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Error Boundary Testing</h1>
      <p className="text-muted-foreground">Test the error boundaries to see how they work.</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Left Side Error</h3>
          <button
            onClick={() => setLeftError(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm font-medium"
          >
            Trigger Left Error
          </button>
          <p className="text-xs text-muted-foreground">
            This will break the left panel while keeping the terminal functional.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">Right Side Error</h3>
          <button
            onClick={() => setRightError(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Trigger Right Error
          </button>
          <p className="text-xs text-muted-foreground">
            This will break the terminal while keeping navigation functional.
          </p>
        </div>
      </div>

      <TestLeftError shouldError={leftError} />
      <TestRightError shouldError={rightError} />
    </div>
  )
}

const CONTENT_MAP: Record<LeftPanelContent, { component: React.ComponentType; title: string }> = {
  home: { component: HomeSection, title: 'Home' },
  about: { component: AboutSection, title: 'About' },
  projects: { component: ProjectsSection, title: 'Projects' },
  skills: { component: SkillsSection, title: 'Skills' },
  contact: { component: ContactSection, title: 'Contact' },
  test: { component: TestSection, title: 'Test Errors' },
}

interface InterfaceProps {
  className?: string
  initialContent?: LeftPanelContent
}

export default function Interface({ className = '', initialContent = 'home' }: InterfaceProps) {
  return (
    <NavigationProvider initialContent={initialContent}>
      <InterfaceContent className={className} />
    </NavigationProvider>
  )
}

function InterfaceContent({ className = '' }: { className?: string }) {
  const { currentContent } = useNavigation()

  // Log interface initialization only once
  useEffect(() => {
    debug('Interface initialized', {
      component: 'Interface',
      action: 'initialize',
    })
  }, [])

  const CurrentComponent = CONTENT_MAP[currentContent].component
  const currentTitle = CONTENT_MAP[currentContent].title

  return (
    <main
      id="main-content"
      className="min-h-screen flex items-start justify-center pt-8 pb-32 px-4 bg-background"
    >
      <div className={`w-full ${CONTAINER_CONFIG.MAX_WIDTH}`}>
        <Card
          className={`${CONTAINER_CONFIG.CARD_CLASSES} ${CONTAINER_CONFIG.HEIGHT} ${className}`}
        >
          <div className={CONTAINER_CONFIG.INNER_BORDER_CLASSES}></div>

          <div className="relative h-full">
            <section className="grid md:grid-cols-2 h-full">
              <LeftSideErrorBoundary pageTitle={currentTitle}>
                <LeftSide pageTitle={currentTitle} transitionKey={currentContent}>
                  <CurrentComponent />
                </LeftSide>
              </LeftSideErrorBoundary>

              <RightSideErrorBoundary>
                <RightSide />
              </RightSideErrorBoundary>
            </section>
          </div>
        </Card>
      </div>
    </main>
  )
}
