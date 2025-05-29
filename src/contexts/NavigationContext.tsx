'use client'

import type { LeftPanelContent } from '@/components/terminal/commands'
import { info } from '@/lib'
import { createContext, useCallback, useContext, useState } from 'react'

interface NavigationContextType {
  currentContent: LeftPanelContent
  navigateTo: (content: LeftPanelContent) => void
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({
  children,
  initialContent = 'home',
}: {
  children: React.ReactNode
  initialContent?: LeftPanelContent
}) {
  const [currentContent, setCurrentContent] = useState<LeftPanelContent>(initialContent)

  const navigateTo = useCallback(
    (content: LeftPanelContent) => {
      info('Navigation initiated', {
        component: 'NavigationProvider',
        action: 'navigate',
        metadata: { from: currentContent, to: content },
      })
      setCurrentContent(content)
    },
    [currentContent],
  )

  return (
    <NavigationContext.Provider value={{ currentContent, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}
