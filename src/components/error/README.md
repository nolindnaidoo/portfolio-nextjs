# Error Boundary Component

Production-ready error boundary with variant-specific UI and automatic error handling integration.

## 🎯 Quick Decision

**Need error handling?**

```
├─ Wrap left content panel? → ErrorBoundary variant="left"
├─ Wrap right terminal panel? → ErrorBoundary variant="right"
├─ Custom page title in header? → Add pageTitle prop
└─ Global error handling? → Already integrated with handleError
```

## 🚀 Quick Start

```tsx
import { ErrorBoundary } from '@/components/error'

// Wrap left content panel
<ErrorBoundary variant="left" pageTitle="Projects">
  <ProjectsContent />
</ErrorBoundary>

// Wrap right terminal panel
<ErrorBoundary variant="right">
  <TerminalComponent />
</ErrorBoundary>
```

## 📊 Component Overview

| Variant   | Purpose               | Key Features                                  |
| --------- | --------------------- | --------------------------------------------- |
| **left**  | Content panel errors  | Amber theme, navigation tips, content-focused |
| **right** | Terminal panel errors | Red theme, terminal-style UI, system-focused  |

---

## 📋 Common Patterns

### Basic Error Boundaries

```tsx
import { ErrorBoundary } from '@/components/error'

// Left side content protection
<ErrorBoundary variant="left">
  <HomeContent />
</ErrorBoundary>

// Right side terminal protection
<ErrorBoundary variant="right">
  <Terminal />
</ErrorBoundary>

// With custom page title
<ErrorBoundary variant="left" pageTitle="About">
  <AboutSection />
</ErrorBoundary>
```

### Interface Integration

```tsx
import { ErrorBoundary } from '@/components/error'
import { LeftSide, RightSide } from '@/components/interface'

// Complete interface with error boundaries
;<div className="grid md:grid-cols-2 h-screen">
  <ErrorBoundary variant="left" pageTitle="Portfolio">
    <LeftSide pageTitle="Portfolio">
      <PortfolioContent />
    </LeftSide>
  </ErrorBoundary>

  <ErrorBoundary variant="right">
    <RightSide />
  </ErrorBoundary>
</div>
```

### Nested Component Protection

```tsx
import { ErrorBoundary } from '@/components/error'

// Protect individual sections
function PortfolioPage() {
  return (
    <div className="space-y-8">
      <ErrorBoundary variant="left" pageTitle="Hero">
        <HeroSection />
      </ErrorBoundary>

      <ErrorBoundary variant="left" pageTitle="Projects">
        <ProjectsSection />
      </ErrorBoundary>

      <ErrorBoundary variant="left" pageTitle="Skills">
        <SkillsSection />
      </ErrorBoundary>
    </div>
  )
}
```

---

## 🔧 Real-World Examples

### Portfolio Application

```tsx
import { ErrorBoundary } from '@/components/error'
import { Interface } from '@/components/interface'

function PortfolioApp() {
  return (
    <div className="min-h-screen">
      <ErrorBoundary variant="left" pageTitle="Portfolio">
        <ErrorBoundary variant="right">
          <Interface initialContent="home" />
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  )
}
```

### Multi-Panel Dashboard

```tsx
import { ErrorBoundary } from '@/components/error'

function Dashboard() {
  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Main content area */}
      <div className="col-span-8">
        <ErrorBoundary variant="left" pageTitle="Dashboard">
          <DashboardContent />
        </ErrorBoundary>
      </div>

      {/* Sidebar with tools */}
      <div className="col-span-4">
        <ErrorBoundary variant="right">
          <ToolsSidebar />
        </ErrorBoundary>
      </div>
    </div>
  )
}
```

### Dynamic Content Loading

```tsx
import { ErrorBoundary } from '@/components/error'
import { Suspense } from 'react'

function DynamicPortfolio() {
  return (
    <div className="grid md:grid-cols-2 h-screen">
      <ErrorBoundary variant="left" pageTitle="Projects">
        <Suspense fallback={<LoadingSpinner />}>
          <DynamicProjectsContent />
        </Suspense>
      </ErrorBoundary>

      <ErrorBoundary variant="right">
        <Suspense fallback={<TerminalLoader />}>
          <DynamicTerminal />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
```

### Form Validation and Error Handling

```tsx
import { ErrorBoundary } from '@/components/error'

function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <ErrorBoundary variant="left" pageTitle="Contact">
        <div className="space-y-8">
          <ContactHeader />

          <ErrorBoundary variant="left" pageTitle="Contact Form">
            <ContactForm />
          </ErrorBoundary>

          <ErrorBoundary variant="left" pageTitle="Contact Info">
            <ContactInformation />
          </ErrorBoundary>
        </div>
      </ErrorBoundary>
    </div>
  )
}
```

### API Integration Protection

```tsx
import { ErrorBoundary } from '@/components/error'
import { useQuery } from '@tanstack/react-query'

function ProjectsWithAPI() {
  return (
    <ErrorBoundary variant="left" pageTitle="Projects">
      <ProjectsContainer />
    </ErrorBoundary>
  )
}

function ProjectsContainer() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    throwOnError: true, // This will trigger the error boundary
  })

  if (isLoading) return <ProjectsLoader />

  return (
    <div className="space-y-6">
      {data?.map((project) => (
        <ErrorBoundary key={project.id} variant="left" pageTitle={project.title}>
          <ProjectCard project={project} />
        </ErrorBoundary>
      ))}
    </div>
  )
}
```

---

## 🎯 Advanced Patterns

### Error Boundary with Analytics

```tsx
import { ErrorBoundary } from '@/components/error'
import { useEffect } from 'react'

function AnalyticsErrorBoundary({ children, componentName, variant = 'left' }) {
  const CustomErrorBoundary = class extends ErrorBoundary {
    componentDidCatch(error, errorInfo) {
      super.componentDidCatch(error, errorInfo)

      // Track error in analytics
      analytics.track('error_boundary_triggered', {
        component: componentName,
        variant,
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      })
    }
  }

  return <CustomErrorBoundary variant={variant}>{children}</CustomErrorBoundary>
}

// Usage
;<AnalyticsErrorBoundary componentName="ProjectsSection" variant="left">
  <ProjectsSection />
</AnalyticsErrorBoundary>
```

### Conditional Error Boundaries

```tsx
import { ErrorBoundary } from '@/components/error'

function ConditionalErrorBoundary({ children, variant = 'left', enabled = true, fallback }) {
  if (!enabled) {
    return fallback || children
  }

  return <ErrorBoundary variant={variant}>{children}</ErrorBoundary>
}

// Usage - disable in development for debugging
;<ConditionalErrorBoundary
  variant="left"
  enabled={process.env.NODE_ENV === 'production'}
  fallback={<DevErrorDisplay />}
>
  <ExperimentalFeature />
</ConditionalErrorBoundary>
```

### Error Recovery Strategies

```tsx
import { ErrorBoundary } from '@/components/error'
import { useState, useCallback } from 'react'

function ResilientComponent() {
  const [retryCount, setRetryCount] = useState(0)
  const [fallbackMode, setFallbackMode] = useState(false)

  const handleRetry = useCallback(() => {
    if (retryCount >= 3) {
      setFallbackMode(true)
      return
    }
    setRetryCount((prev) => prev + 1)
  }, [retryCount])

  if (fallbackMode) {
    return <SimpleFallbackComponent />
  }

  return (
    <ErrorBoundary variant="left" pageTitle="Resilient Content">
      <ComplexComponent key={retryCount} onError={handleRetry} />
    </ErrorBoundary>
  )
}
```

### Custom Error UI with Context

```tsx
import { ErrorBoundary } from '@/components/error'
import { createContext, useContext } from 'react'

const ErrorContext = createContext({
  onError: (error) => {},
  retryAttempts: 0,
})

function ErrorAwareApp() {
  const handleError = (error) => {
    // Custom error handling logic
    console.error('App-level error:', error)
  }

  return (
    <ErrorContext.Provider value={{ onError: handleError, retryAttempts: 0 }}>
      <ErrorBoundary variant="left" pageTitle="App">
        <MainApplication />
      </ErrorBoundary>
    </ErrorContext.Provider>
  )
}

function ComponentWithErrorHandling() {
  const { onError } = useContext(ErrorContext)

  const handleLocalError = (error) => {
    onError(error)
    throw error // Re-throw to trigger error boundary
  }

  return (
    <ErrorBoundary variant="left" pageTitle="Feature">
      <FeatureComponent onError={handleLocalError} />
    </ErrorBoundary>
  )
}
```

### Performance-Optimized Error Boundaries

```tsx
import { ErrorBoundary } from '@/components/error'
import { memo, lazy, Suspense } from 'react'

// Lazy load error boundary for non-critical sections
const LazyErrorBoundary = lazy(() =>
  import('@/components/error').then(module => ({
    default: module.ErrorBoundary
  }))
)

const OptimizedSection = memo(function OptimizedSection({ children, variant = 'left' }) {
  return (
    <Suspense fallback={<div>Loading error protection...</div>}>
      <LazyErrorBoundary variant={variant}>
        {children}
      </LazyErrorBoundary>
    </Suspense>
  )
})

// Usage for non-critical content
<OptimizedSection variant="left">
  <NonCriticalWidget />
</OptimizedSection>
```

---

## 📦 Complete API Reference

### ErrorBoundary Props

```tsx
interface ErrorBoundaryProps {
  children: ReactNode // Content to protect from errors
  variant: 'left' | 'right' // UI variant for error display
  pageTitle?: string // Custom title for error header (optional)
}
```

### Error Boundary State

```tsx
interface ErrorBoundaryState {
  hasError: boolean // Whether an error has occurred
  error: Error | null // The caught error object
}
```

### Variant Configurations

```tsx
// Left variant (content panels)
interface LeftVariantConfig {
  theme: 'amber' // Amber warning theme
  icon: AlertTriangle // Warning triangle icon
  title: 'Content' // Default title
  heading: 'Content Unavailable'
  message: 'Section encountered an issue...'
  tip: 'Use terminal to navigate'
  buttonText: 'Try Again'
}

// Right variant (terminal panels)
interface RightVariantConfig {
  theme: 'red' // Red error theme
  icon: AlertTriangle // Error triangle icon
  terminalIcon: Terminal // Terminal icon for display
  title: 'Terminal' // Default title
  heading: 'Terminal Unavailable'
  message: 'Terminal encountered an issue...'
  tip: 'Refresh page to resolve'
  buttonText: 'Restart Terminal'
  features: {
    terminalOutput: true // Terminal-style error display
    refreshButton: true // Additional refresh page button
    footer: true // Terminal version footer
  }
}
```

### Error Fallback Component

```tsx
interface ErrorFallbackProps {
  error: Error | null // The error object
  retry: () => void // Function to retry/reset
  variant: 'left' | 'right' // UI variant
  pageTitle?: string // Optional custom title
}
```

### Class Methods

```tsx
class ErrorBoundary {
  // Required error boundary methods
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>
  componentDidCatch(error: Error): void

  // Instance methods
  retry(): void // Reset error state
  render(): ReactNode // Render children or error UI
}
```

---

## 🚨 Common Mistakes

```tsx
// ❌ Wrong - Missing variant prop
function BadUsage() {
  return (
    <ErrorBoundary>
      {' '}
      {/* Missing required variant */}
      <Content />
    </ErrorBoundary>
  )
}

// ❌ Wrong - Using wrong variant for context
function BadVariantChoice() {
  return (
    <ErrorBoundary variant="right">
      {' '}
      {/* Should be 'left' for content */}
      <ArticleContent />
    </ErrorBoundary>
  )
}

// ❌ Wrong - Wrapping the entire app
function BadAppWrapper() {
  return (
    <ErrorBoundary variant="left">
      {' '}
      {/* Too broad - use specific boundaries */}
      <EntireApplication />
    </ErrorBoundary>
  )
}

// ❌ Wrong - Not providing pageTitle for context
function BadPageTitle() {
  return (
    <ErrorBoundary variant="left">
      {' '}
      {/* Missing pageTitle for clarity */}
      <ComplexDashboardSection />
    </ErrorBoundary>
  )
}

// ✅ Right - Proper variant usage
function GoodUsage() {
  return (
    <div className="grid md:grid-cols-2 h-screen">
      <ErrorBoundary variant="left" pageTitle="Projects">
        <ProjectsContent />
      </ErrorBoundary>

      <ErrorBoundary variant="right">
        <Terminal />
      </ErrorBoundary>
    </div>
  )
}

// ✅ Right - Granular error boundaries
function GoodGranularity() {
  return (
    <div className="space-y-8">
      <ErrorBoundary variant="left" pageTitle="Header">
        <Header />
      </ErrorBoundary>

      <ErrorBoundary variant="left" pageTitle="Main Content">
        <MainContent />
      </ErrorBoundary>

      <ErrorBoundary variant="left" pageTitle="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  )
}
```

## 💡 Best Practices

**Variant selection:**

```tsx
// Use 'left' for content panels
<ErrorBoundary variant="left" pageTitle="About">
  <AboutSection />
</ErrorBoundary>

// Use 'right' for terminal/interactive panels
<ErrorBoundary variant="right">
  <TerminalInterface />
</ErrorBoundary>
```

**Error boundary placement:**

```tsx
// Good: Protect at component boundaries
<ErrorBoundary variant="left" pageTitle="Projects">
  <ProjectsList />
</ErrorBoundary>

// Better: Protect individual items for better UX
<div className="projects-grid">
  {projects.map(project => (
    <ErrorBoundary key={project.id} variant="left" pageTitle={project.title}>
      <ProjectCard project={project} />
    </ErrorBoundary>
  ))}
</div>
```

**Integration with error handling:**

- ErrorBoundary automatically integrates with `handleError` from `@/lib`
- Errors are logged with context (variant, pageTitle)
- Development mode shows detailed error information
- Production mode shows user-friendly error messages

**Performance considerations:**

- Error boundaries have minimal overhead when no errors occur
- Error fallback UI is lightweight and renders quickly
- Automatic integration with existing error logging system
- Memory efficient with proper cleanup on retry

**Accessibility:**

- Error messages are semantically structured with proper headings
- Retry buttons have clear labels and keyboard accessibility
- Error details are collapsible to reduce visual clutter
- Screen reader friendly with descriptive text

**User experience:**

- Left variant uses amber theme (warning) for content issues
- Right variant uses red theme (error) for system issues
- Terminal variant includes terminal-style error output
- Clear recovery instructions and alternative navigation paths
- Development details hidden in production builds

**Error recovery:**

- Retry functionality resets component state
- Page refresh option for terminal errors
- Clear guidance on alternative actions
- Maintains application navigation context

**Testing strategies:**

```tsx
// Create error throwing components for testing
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) throw new Error('Test error')
  return <div>Normal content</div>
}

// Test error boundary behavior
;<ErrorBoundary variant="left" pageTitle="Test">
  <ThrowError shouldThrow={testCondition} />
</ErrorBoundary>
```
