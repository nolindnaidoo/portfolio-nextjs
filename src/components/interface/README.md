# Interface Components

Premium two-panel portfolio layout with smooth animations and responsive design.

## 🎯 Quick Decision

**Need interface components?**

```
├─ Complete portfolio layout? → Interface (main orchestrator)
├─ Left content panel? → LeftSide
├─ Right terminal panel? → RightSide
└─ Custom two-panel layout? → Combine LeftSide + RightSide
```

## 🚀 Quick Start

```tsx
import Interface from '@/components/interface'

// Complete portfolio interface
function Portfolio() {
  return <Interface />
}

// With custom initial section
function CustomPortfolio() {
  return <Interface initialContent="projects" />
}
```

## 📊 Component Overview

| Component     | Purpose                  | Key Features                             |
| ------------- | ------------------------ | ---------------------------------------- |
| **Interface** | Main layout orchestrator | Navigation provider, error boundaries    |
| **LeftSide**  | Content display panel    | Animations, header, responsive scrolling |
| **RightSide** | Terminal interface panel | Terminal integration, premium styling    |

---

## 📋 Common Patterns

### Basic Interface

```tsx
import Interface from '@/components/interface'

// Full portfolio with all sections
<Interface />

// Start on specific section
<Interface initialContent="about" />

// Custom styling
<Interface className="border-2 border-primary" />
```

### Individual Panels

```tsx
import { LeftSide, RightSide } from '@/components/interface'

// Left panel with content
<LeftSide pageTitle="Projects">
  <ProjectsContent />
</LeftSide>

// Right panel with terminal
<RightSide />

// Custom layout composition
<div className="grid md:grid-cols-2 h-screen">
  <LeftSide pageTitle="Custom">
    <CustomContent />
  </LeftSide>
  <RightSide />
</div>
```

### Content Sections

```tsx
// Available sections (automatically handled by Interface)
'home' // Main portfolio landing
'about' // Personal background
'projects' // Featured work
'skills' // Technical expertise
'contact' // Contact information
```

---

## 🔧 Real-World Examples

### Portfolio Application

```tsx
import Interface from '@/components/interface'
import { NavigationProvider } from '@/contexts/NavigationContext'

function PortfolioApp() {
  return (
    <div className="min-h-screen bg-background">
      <Interface initialContent="home" />
    </div>
  )
}

// Interface automatically provides NavigationProvider
// No need to wrap manually
```

### Custom Section Content

```tsx
import { LeftSide } from '@/components/interface'
import { motion } from 'framer-motion'

function CustomSection() {
  return (
    <LeftSide pageTitle="Custom" transitionKey="custom-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold">Custom Section</h1>
        <p className="text-muted-foreground">Custom content with smooth animations</p>
        <div className="grid gap-4">
          <CustomCard title="Feature 1" />
          <CustomCard title="Feature 2" />
        </div>
      </motion.div>
    </LeftSide>
  )
}
```

### Mobile-Responsive Layout

```tsx
import { LeftSide, RightSide } from '@/components/interface'
import { useState } from 'react'

function ResponsiveInterface() {
  const [showTerminal, setShowTerminal] = useState(false)

  return (
    <div className="h-screen">
      {/* Mobile: Stack panels */}
      <div className="md:hidden">
        {showTerminal ? (
          <div className="h-full">
            <button onClick={() => setShowTerminal(false)}>Back to Content</button>
            <RightSide />
          </div>
        ) : (
          <div className="h-full">
            <LeftSide pageTitle="Portfolio">
              <MobileContent />
            </LeftSide>
            <button onClick={() => setShowTerminal(true)}>Open Terminal</button>
          </div>
        )}
      </div>

      {/* Desktop: Side by side */}
      <div className="hidden md:grid md:grid-cols-2 h-full">
        <LeftSide pageTitle="Portfolio">
          <DesktopContent />
        </LeftSide>
        <RightSide />
      </div>
    </div>
  )
}
```

### Content with Navigation Integration

```tsx
import { LeftSide } from '@/components/interface'
import { useNavigation } from '@/contexts/NavigationContext'

function NavigationAwareContent() {
  const { currentContent, navigateTo } = useNavigation()

  return (
    <LeftSide pageTitle={currentContent} transitionKey={currentContent}>
      <div className="space-y-6">
        <nav className="flex gap-2">
          {['home', 'about', 'projects', 'skills', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => navigateTo(section)}
              className={`px-3 py-1 rounded ${
                currentContent === section ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {section}
            </button>
          ))}
        </nav>

        <div className="content-area">
          {currentContent === 'home' && <HomeContent />}
          {currentContent === 'about' && <AboutContent />}
          {currentContent === 'projects' && <ProjectsContent />}
          {currentContent === 'skills' && <SkillsContent />}
          {currentContent === 'contact' && <ContactContent />}
        </div>
      </div>
    </LeftSide>
  )
}
```

### Error Boundary Integration

```tsx
import { LeftSide } from '@/components/interface'
import { ErrorBoundary } from '@/components/error'

function SafeInterface() {
  return (
    <div className="grid md:grid-cols-2 h-screen">
      <ErrorBoundary variant="left" pageTitle="Safe Content">
        <LeftSide pageTitle="Safe Content">
          <PotentiallyFaultyContent />
        </LeftSide>
      </ErrorBoundary>

      <ErrorBoundary variant="right">
        <RightSide />
      </ErrorBoundary>
    </div>
  )
}
```

---

## 🎯 Advanced Patterns

### Custom Animation Sequences

```tsx
import { LeftSide } from '@/components/interface'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

function AnimatedInterface() {
  const controls = useAnimation()

  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0 })
      await controls.start({ scale: 1.02 })
      await controls.start({ scale: 1 })
    }
    sequence()
  }, [controls])

  return (
    <LeftSide pageTitle="Animated">
      <motion.div animate={controls} initial={{ opacity: 0, y: 20 }} className="space-y-6">
        <div className="grid gap-4">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-card rounded-lg"
            >
              Item {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </LeftSide>
  )
}
```

### Dynamic Content Loading

```tsx
import { LeftSide } from '@/components/interface'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function DynamicInterface() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const data = await fetchContentData()
        setContent(data)
      } catch (error) {
        console.error('Failed to load content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return (
    <LeftSide pageTitle="Dynamic Content" transitionKey={loading ? 'loading' : 'loaded'}>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center h-32"
          >
            <div className="animate-pulse">Loading content...</div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {content?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.content}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </LeftSide>
  )
}
```

### Custom Layout Compositions

```tsx
import { LeftSide, RightSide } from '@/components/interface'
import { Card } from '@/components/ui'

function CustomLayoutInterface() {
  return (
    <div className="min-h-screen p-4">
      <Card className="h-[800px] max-w-7xl mx-auto overflow-hidden">
        {/* Three-panel layout */}
        <div className="grid grid-cols-3 h-full">
          {/* Main content */}
          <div className="col-span-2">
            <LeftSide pageTitle="Extended Content">
              <div className="grid grid-cols-2 gap-6 h-full">
                <div className="space-y-4">
                  <h2>Left Column</h2>
                  <LeftContent />
                </div>
                <div className="space-y-4">
                  <h2>Right Column</h2>
                  <RightContent />
                </div>
              </div>
            </LeftSide>
          </div>

          {/* Terminal sidebar */}
          <div className="border-l border-border">
            <RightSide />
          </div>
        </div>
      </Card>
    </div>
  )
}
```

### Performance Optimized Interface

```tsx
import { LeftSide, RightSide } from '@/components/interface'
import { memo, useMemo, lazy, Suspense } from 'react'

// Lazy load heavy components
const HeavyContent = lazy(() => import('./HeavyContent'))

const OptimizedLeftSide = memo(function OptimizedLeftSide({ pageTitle, children }) {
  return (
    <LeftSide pageTitle={pageTitle} transitionKey={pageTitle}>
      {children}
    </LeftSide>
  )
})

const OptimizedRightSide = memo(function OptimizedRightSide() {
  return <RightSide />
})

function PerformantInterface() {
  const memoizedContent = useMemo(
    () => (
      <div className="space-y-6">
        <h1>Optimized Content</h1>
        <Suspense fallback={<div>Loading heavy content...</div>}>
          <HeavyContent />
        </Suspense>
      </div>
    ),
    [],
  )

  return (
    <div className="grid md:grid-cols-2 h-screen">
      <OptimizedLeftSide pageTitle="Performance">{memoizedContent}</OptimizedLeftSide>
      <OptimizedRightSide />
    </div>
  )
}
```

---

## 📦 Complete API Reference

### Interface Props

```tsx
interface InterfaceProps {
  className?: string // Custom CSS classes
  initialContent?: LeftPanelContent // Starting section (default: 'home')
}
```

### LeftSide Props

```tsx
interface LeftSideProps {
  children: React.ReactNode // Content to display
  pageTitle?: string // Header title (default: 'Home')
  transitionKey?: string // Key for AnimatePresence transitions
  className?: string // Custom CSS classes
}
```

### RightSide Props

```tsx
interface RightSideProps {
  className?: string // Custom CSS classes
  // No other props - integrates with NavigationContext automatically
}
```

### Content Types

```tsx
type LeftPanelContent = 'home' | 'about' | 'projects' | 'skills' | 'contact'

// Content mapping (internal to Interface component)
interface ContentMap {
  [K in LeftPanelContent]: {
    component: React.ComponentType
    title: string
  }
}
```

### Animation Variants

```tsx
// Internal animation configurations
interface AnimationConfig {
  headerVariants: Variants
  iconVariants: Variants
  titleVariants: Variants
  contentVariants: Variants
}

// Styling constants
interface ContainerStyles {
  MAIN: string
  CONTENT_WRAPPER: string
  HEADER: string
  // ... more style constants
}
```

---

## 🚨 Common Mistakes

```tsx
// ❌ Wrong - Using LeftSide without children
function BadUsage() {
  return <LeftSide pageTitle="Empty" /> // Missing children
}

// ❌ Wrong - Not providing transitionKey for content changes
function BadTransitions() {
  const [content, setContent] = useState('home')
  return <LeftSide pageTitle={content}>{content === 'home' ? <Home /> : <About />}</LeftSide>
}

// ❌ Wrong - Manual NavigationProvider wrapping
function BadProviderUsage() {
  return (
    <NavigationProvider>
      {' '}
      {/* Interface already provides this */}
      <Interface />
    </NavigationProvider>
  )
}

// ✅ Right - Proper children usage
function GoodUsage() {
  return (
    <LeftSide pageTitle="Content">
      <div>Meaningful content here</div>
    </LeftSide>
  )
}

// ✅ Right - Proper transition keys
function GoodTransitions() {
  const [content, setContent] = useState('home')
  return (
    <LeftSide pageTitle={content} transitionKey={content}>
      {content === 'home' ? <Home /> : <About />}
    </LeftSide>
  )
}

// ✅ Right - Use Interface directly
function GoodProviderUsage() {
  return <Interface initialContent="home" />
}
```

## 💡 Best Practices

**Component composition:**

```tsx
// Use Interface for complete functionality
<Interface initialContent="projects" />

// Or compose individual components for custom layouts
<div className="custom-layout">
  <LeftSide pageTitle="Custom">
    <CustomContent />
  </LeftSide>
  <RightSide />
</div>
```

**Content transitions:**

```tsx
// Always provide transitionKey for smooth animations
<LeftSide pageTitle={currentSection} transitionKey={currentSection}>
  <DynamicContent />
</LeftSide>

// Use meaningful transition keys for different content states
<LeftSide pageTitle="Loading" transitionKey={isLoading ? 'loading' : 'loaded'}>
  {isLoading ? <LoadingState /> : <ContentState />}
</LeftSide>
```

**Performance considerations:**

- Interface automatically manages navigation state
- LeftSide animations respect reduced motion preferences
- Content is rendered only when needed through conditional rendering
- Error boundaries protect against content failures
- Responsive grid layout adapts to screen sizes

**Accessibility:**

- Interface uses semantic HTML (main, section, header elements)
- LeftSide includes proper ARIA attributes and heading structure
- Keyboard navigation works throughout the interface
- Focus management handles content transitions
- Screen reader friendly with descriptive page titles

**Styling customization:**

- Use consistent design tokens from the theme system
- Leverage CSS custom properties for dynamic theming
- Maintain responsive grid layout patterns
- Use the Card component for consistent container styling
- Follow gradient and border enhancement patterns

**Integration patterns:**

- Interface works seamlessly with NavigationContext
- Error boundaries provide resilient component trees
- Terminal integration happens automatically in RightSide
- Content sections can be easily extended or customized
- Animation system is consistent across all panels
