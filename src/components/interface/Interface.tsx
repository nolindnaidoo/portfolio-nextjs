'use client'

import HomeSection from '@/components/home/Home'
import type { LeftPanelContent } from '@/components/terminal/commands'
import { Card } from '@/components/ui'
import { useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const CONTAINER_CONFIG = {
  HEIGHT: 'h-[800px]',
  MAX_WIDTH: 'max-w-7xl',
  CARD_CLASSES:
    'relative w-full bg-card border border-border/30 shadow-2xl overflow-hidden ring-1 ring-border/10',
  INNER_BORDER_CLASSES: 'absolute inset-[1px] rounded-3xl border border-card/50',
} as const

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

const CONTENT_MAP: Record<LeftPanelContent, { component: React.ComponentType; title: string }> = {
  home: { component: HomeSection, title: 'Home' },
  about: { component: AboutSection, title: 'About' },
  projects: { component: ProjectsSection, title: 'Projects' },
  skills: { component: SkillsSection, title: 'Skills' },
  contact: { component: ContactSection, title: 'Contact' },
}

interface InterfaceProps {
  className?: string
  initialContent?: LeftPanelContent
}

export default function Interface({ className = '', initialContent = 'home' }: InterfaceProps) {
  const [currentContent, setCurrentContent] = useState<LeftPanelContent>(initialContent)

  const handleContentChange = (content: LeftPanelContent) => {
    setCurrentContent(content)
  }

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
              <LeftSide pageTitle={currentTitle} transitionKey={currentContent}>
                <CurrentComponent />
              </LeftSide>
              <RightSide onContentChangeAction={handleContentChange} />
            </section>
          </div>
        </Card>
      </div>
    </main>
  )
}
