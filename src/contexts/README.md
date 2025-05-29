# Contexts

React Context providers for global state management.

## 🎯 Quick Decision

**Need global state?**

```
├─ Navigation between sections? → NavigationContext
└─ More contexts coming soon...
```

## 🚀 Quick Start

```tsx
import { NavigationProvider, useNavigation } from '@/contexts/NavigationContext'

// Wrap your app
function App() {
  return (
    <NavigationProvider initialContent="home">
      <YourComponents />
    </NavigationProvider>
  )
}

// Use in components
function MyComponent() {
  const { currentContent, navigateTo } = useNavigation()

  return (
    <button onClick={() => navigateTo('about')}>Go to About (current: {currentContent})</button>
  )
}
```

## 📊 Context Overview

| Context               | Purpose                  | Key Features                   |
| --------------------- | ------------------------ | ------------------------------ |
| **NavigationContext** | Section navigation state | `currentContent`, `navigateTo` |

---

## 📋 Common Patterns

### Basic Navigation

```tsx
const { currentContent, navigateTo } = useNavigation()

// Navigate to different sections
navigateTo('home') // → Portfolio home
navigateTo('about') // → About section
navigateTo('projects') // → Projects showcase
navigateTo('skills') // → Skills overview
navigateTo('contact') // → Contact information
```

### Conditional Rendering

```tsx
const { currentContent } = useNavigation()

return (
  <div>
    {currentContent === 'home' && <HomeSection />}
    {currentContent === 'about' && <AboutSection />}
    {currentContent === 'projects' && <ProjectsSection />}
  </div>
)
```

### Navigation Menu

```tsx
const NavigationMenu = () => {
  const { currentContent, navigateTo } = useNavigation()

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <nav>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => navigateTo(item.id)}
          className={currentContent === item.id ? 'active' : ''}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
```

---

## 🔧 Real-World Examples

### App Setup with Provider

```tsx
import { NavigationProvider } from '@/contexts/NavigationContext'

function App() {
  return (
    <NavigationProvider initialContent="home">
      <div className="app">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </NavigationProvider>
  )
}
```

### Dynamic Content Rendering

```tsx
import { useNavigation } from '@/contexts/NavigationContext'

const CONTENT_MAP = {
  home: {
    component: HomeSection,
    title: 'Welcome',
    description: 'Portfolio home page',
  },
  about: {
    component: AboutSection,
    title: 'About Me',
    description: 'Personal background',
  },
  projects: {
    component: ProjectsSection,
    title: 'Projects',
    description: 'Featured work',
  },
  skills: {
    component: SkillsSection,
    title: 'Skills',
    description: 'Technical expertise',
  },
  contact: {
    component: ContactSection,
    title: 'Contact',
    description: 'Get in touch',
  },
}

function MainContent() {
  const { currentContent } = useNavigation()

  const content = CONTENT_MAP[currentContent]
  const Component = content.component

  return (
    <main>
      <header>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
      </header>
      <Component />
    </main>
  )
}
```

### Terminal Integration

```tsx
function Terminal() {
  const { navigateTo } = useNavigation()

  const executeCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case 'home':
        navigateTo('home')
        addLine('output', 'Navigated to home section')
        break
      case 'about':
        navigateTo('about')
        addLine('output', 'Navigated to about section')
        break
      case 'projects':
        navigateTo('projects')
        addLine('output', 'Navigated to projects section')
        break
      default:
        addLine('error', `Unknown command: ${command}`)
    }
  }

  return <TerminalInterface onCommand={executeCommand} />
}
```

### Breadcrumb Navigation

```tsx
function Breadcrumbs() {
  const { currentContent, navigateTo } = useNavigation()

  const breadcrumbMap = {
    home: [{ label: 'Home', path: 'home' }],
    about: [
      { label: 'Home', path: 'home' },
      { label: 'About', path: 'about' },
    ],
    projects: [
      { label: 'Home', path: 'home' },
      { label: 'Projects', path: 'projects' },
    ],
    skills: [
      { label: 'Home', path: 'home' },
      { label: 'Skills', path: 'skills' },
    ],
    contact: [
      { label: 'Home', path: 'home' },
      { label: 'Contact', path: 'contact' },
    ],
  }

  const breadcrumbs = breadcrumbMap[currentContent]

  return (
    <nav className="breadcrumbs">
      {breadcrumbs.map((item, index) => (
        <span key={item.path}>
          {index > 0 && <span className="separator">/</span>}
          <button
            onClick={() => navigateTo(item.path)}
            className={index === breadcrumbs.length - 1 ? 'current' : ''}
          >
            {item.label}
          </button>
        </span>
      ))}
    </nav>
  )
}
```

### Navigation History

```tsx
function useNavigationHistory() {
  const { currentContent, navigateTo } = useNavigation()
  const [history, setHistory] = useState<LeftPanelContent[]>(['home'])
  const [currentIndex, setCurrentIndex] = useState(0)

  const navigateWithHistory = useCallback(
    (content: LeftPanelContent) => {
      setHistory((prev) => [...prev.slice(0, currentIndex + 1), content])
      setCurrentIndex((prev) => prev + 1)
      navigateTo(content)
    },
    [navigateTo, currentIndex],
  )

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      navigateTo(history[newIndex])
    }
  }, [currentIndex, history, navigateTo])

  const goForward = useCallback(() => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      navigateTo(history[newIndex])
    }
  }, [currentIndex, history, navigateTo])

  return {
    history,
    currentIndex,
    canGoBack: currentIndex > 0,
    canGoForward: currentIndex < history.length - 1,
    navigateWithHistory,
    goBack,
    goForward,
  }
}
```

---

## 🎯 Advanced Patterns

### Context Composition

```tsx
// Multiple context providers
function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider initialContent="home">
      <ThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </NavigationProvider>
  )
}
```

### Custom Hook with Side Effects

```tsx
function useNavigationWithEffects() {
  const { currentContent, navigateTo } = useNavigation()

  // Log navigation for analytics
  const navigate = useCallback(
    (content: LeftPanelContent) => {
      info('User navigation', {
        component: 'NavigationHook',
        action: 'navigate',
        metadata: { from: currentContent, to: content },
      })

      // Analytics tracking
      analytics.track('page_view', { page: content })

      navigateTo(content)
    },
    [currentContent, navigateTo],
  )

  // Update document title
  useEffect(() => {
    const titles = {
      home: 'Portfolio - Home',
      about: 'Portfolio - About Me',
      projects: 'Portfolio - Projects',
      skills: 'Portfolio - Skills',
      contact: 'Portfolio - Contact',
    }
    document.title = titles[currentContent]
  }, [currentContent])

  return { currentContent, navigateTo: navigate }
}
```

### URL Synchronization

```tsx
function useNavigationWithURL() {
  const { currentContent, navigateTo } = useNavigation()
  const router = useRouter()

  // Sync navigation with URL
  useEffect(() => {
    const path = currentContent === 'home' ? '/' : `/${currentContent}`
    router.push(path, undefined, { shallow: true })
  }, [currentContent, router])

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.slice(1) || 'home'
      if (path !== currentContent) {
        navigateTo(path as LeftPanelContent)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [currentContent, navigateTo])

  return { currentContent, navigateTo }
}
```

### Performance Optimization

```tsx
// Memoized navigation context
const NavigationContext = createContext<NavigationContextType | null>(null)

export const NavigationProvider = memo(function NavigationProvider({
  children,
  initialContent = 'home',
}: NavigationProviderProps) {
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

  const value = useMemo(
    () => ({
      currentContent,
      navigateTo,
    }),
    [currentContent, navigateTo],
  )

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>
})
```

---

## 📦 Complete API Reference

### NavigationProvider Props

```tsx
interface NavigationProviderProps {
  children: React.ReactNode
  initialContent?: LeftPanelContent // Default: 'home'
}
```

### useNavigation Hook

```tsx
const {
  currentContent: LeftPanelContent,
  navigateTo: (content: LeftPanelContent) => void,
} = useNavigation()
```

### LeftPanelContent Type

```tsx
type LeftPanelContent = 'home' | 'about' | 'projects' | 'skills' | 'contact'
```

### Context Interface

```tsx
interface NavigationContextType {
  currentContent: LeftPanelContent
  navigateTo: (content: LeftPanelContent) => void
}
```

---

## 🚨 Common Mistakes

```tsx
// ❌ Wrong - Using hook outside provider
function Component() {
  const { navigateTo } = useNavigation() // Error: provider not found
}

// ❌ Wrong - Invalid content type
navigateTo('invalid-section') // TypeScript error

// ❌ Wrong - Missing provider
<App>
  <ComponentThatUsesNavigation /> {/* Error */}
</App>

// ✅ Right - Proper setup
<NavigationProvider>
  <App>
    <ComponentThatUsesNavigation />
  </App>
</NavigationProvider>

// ✅ Right - Valid navigation
navigateTo('about') // Valid LeftPanelContent
```

## 💡 Best Practices

**Provider placement:**

```tsx
// Place provider at app root or layout level
<NavigationProvider initialContent="home">
  <YourApp />
</NavigationProvider>
```

**Type safety:**

```tsx
// Always use the LeftPanelContent type
const sections: LeftPanelContent[] = ['home', 'about', 'projects']
```

**Error handling:**

```tsx
// The hook already includes error handling
function MyComponent() {
  try {
    const { navigateTo } = useNavigation()
    // Use safely
  } catch (error) {
    // Will throw if not in provider
  }
}
```

**Performance considerations:**

- Navigation state changes trigger re-renders in consuming components
- Use React.memo() for expensive components that use navigation
- Consider selective subscriptions for components that only need currentContent

**Integration with logging:**

- Navigation automatically logs state changes
- Include relevant metadata for debugging
- Use consistent component names in logging

```

```
