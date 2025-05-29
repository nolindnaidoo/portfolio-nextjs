# Theme Components

Light/dark mode theme management with smooth animations and accessibility.

## 🎯 Quick Decision

**Need theme functionality?**

```
├─ Simple toggle button? → ThemeToggle
├─ Custom theme control? → useThemeToggle hook
├─ App-wide theme provider? → ThemeProvider
└─ Animated transitions? → Built-in with ThemeToggle
```

## 🚀 Quick Start

```tsx
import { ThemeProvider, ThemeToggle } from '@/components/theme'

// Wrap your app
function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <YourComponents />
    </ThemeProvider>
  )
}

// Add theme toggle anywhere
function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  )
}
```

## 📊 Component Overview

| Component          | Purpose                   | Key Features                            |
| ------------------ | ------------------------- | --------------------------------------- |
| **ThemeProvider**  | App-wide theme management | SSR safe, system detection, persistence |
| **ThemeToggle**    | Interactive theme toggle  | Animated, accessible, customizable      |
| **useThemeToggle** | Theme control hook        | Current theme, toggle function          |

---

## 📋 Common Patterns

### Basic Theme Toggle

```tsx
import { ThemeToggle } from '@/components/theme'

// Default ghost button with icon animation
<ThemeToggle />

// Custom styling and variant
<ThemeToggle className="ml-4" variant="outline" />
```

### Custom Theme Control

```tsx
import { useThemeToggle } from '@/components/theme'

function CustomThemeButton() {
  const { resolvedTheme, toggleTheme, mounted } = useThemeToggle()

  if (!mounted) return <div>Loading...</div>

  return <button onClick={toggleTheme}>Current theme: {resolvedTheme}</button>
}
```

### Theme-Aware Conditional Rendering

```tsx
import { useThemeToggle } from '@/components/theme'

function ConditionalContent() {
  const { resolvedTheme, mounted } = useThemeToggle()

  if (!mounted) return null

  return <div>{resolvedTheme === 'dark' ? <DarkModeContent /> : <LightModeContent />}</div>
}
```

### Provider Setup

```tsx
import { ThemeProvider } from '@/components/theme'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 🔧 Real-World Examples

### Terminal Header with Theme Toggle

```tsx
import { ThemeToggle } from '@/components/theme'

function TerminalHeader() {
  return (
    <header className="flex items-center justify-between p-4">
      <div>
        <h1>Portfolio Terminal</h1>
        <p>Interactive portfolio experience</p>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle variant="ghost" />
      </div>
    </header>
  )
}
```

### Settings Panel with Theme Options

```tsx
import { useThemeToggle } from '@/components/theme'

function SettingsPanel() {
  const { theme, resolvedTheme, mounted } = useThemeToggle()

  if (!mounted) return <SettingsSkeleton />

  const themes = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'system', label: 'System', icon: '💻' },
  ]

  return (
    <div className="settings-panel">
      <h3>Theme Preference</h3>
      <div className="theme-options">
        {themes.map((themeOption) => (
          <button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={theme === themeOption.value ? 'active' : ''}
            aria-pressed={theme === themeOption.value}
          >
            <span>{themeOption.icon}</span>
            <span>{themeOption.label}</span>
            {theme === themeOption.value && (
              <span className="current-indicator">
                {themeOption.value === 'system' ? `(${resolvedTheme})` : ''}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
```

### Theme-Aware Logo

```tsx
import { useThemeToggle } from '@/components/theme'

function Logo() {
  const { resolvedTheme, mounted } = useThemeToggle()

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="logo-skeleton w-32 h-8 bg-gray-200 animate-pulse rounded" />
  }

  return (
    <img
      src={resolvedTheme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
      alt="Portfolio Logo"
      className="w-32 h-8"
    />
  )
}
```

### Keyboard Shortcut Theme Toggle

```tsx
import { useThemeToggle } from '@/components/theme'
import { useEffect } from 'react'

function useThemeKeyboard() {
  const { toggleTheme } = useThemeToggle()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + T for theme toggle
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
        event.preventDefault()
        toggleTheme()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [toggleTheme])
}

function App() {
  useThemeKeyboard()

  return (
    <div>
      <p>Press Ctrl+Shift+T (or Cmd+Shift+T) to toggle theme</p>
      <ThemeToggle />
    </div>
  )
}
```

### Animated Theme Transition

```tsx
import { useThemeToggle } from '@/components/theme'
import { motion } from 'framer-motion'

function AnimatedBackground() {
  const { resolvedTheme, mounted } = useThemeToggle()

  if (!mounted) return null

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate={{
        backgroundColor: resolvedTheme === 'dark' ? '#0f0f23' : '#ffffff',
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundImage:
            resolvedTheme === 'dark'
              ? 'radial-gradient(circle at 50% 50%, #1e293b, transparent)'
              : 'radial-gradient(circle at 50% 50%, #e2e8f0, transparent)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}
```

---

## 🎯 Advanced Patterns

### Theme Persistence with Analytics

```tsx
import { useThemeToggle } from '@/components/theme'
import { useEffect } from 'react'

function useThemeAnalytics() {
  const { theme, resolvedTheme, mounted } = useThemeToggle()

  useEffect(() => {
    if (!mounted) return

    // Track theme preference changes
    analytics.track('theme_changed', {
      theme,
      resolvedTheme,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    })

    // Log for debugging
    info('Theme changed', {
      component: 'ThemeAnalytics',
      action: 'theme_change',
      metadata: { theme, resolvedTheme },
    })
  }, [theme, resolvedTheme, mounted])
}
```

### Multiple Theme Providers

```tsx
import { ThemeProvider } from '@/components/theme'
import { createContext, useContext } from 'react'

// App-wide theme context
const AppThemeContext = createContext(null)

// Component-specific theme override
const ComponentThemeContext = createContext(null)

function MultiThemeApp() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AppThemeContext.Provider value={{ scope: 'app' }}>
        <div className="app">
          <Header />

          {/* Override theme for specific section */}
          <ThemeProvider attribute="data-theme" defaultTheme="light">
            <ComponentThemeContext.Provider value={{ scope: 'component' }}>
              <SpecialSection />
            </ComponentThemeContext.Provider>
          </ThemeProvider>

          <Footer />
        </div>
      </AppThemeContext.Provider>
    </ThemeProvider>
  )
}
```

### Custom Theme Hook with Local Storage

```tsx
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function useAdvancedTheme() {
  const { theme, setTheme, systemTheme, themes } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [themeHistory, setThemeHistory] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)

    // Load theme history from localStorage
    const saved = localStorage.getItem('theme-history')
    if (saved) {
      try {
        setThemeHistory(JSON.parse(saved))
      } catch (error) {
        warn('Failed to parse theme history', { error })
      }
    }
  }, [])

  const setThemeWithHistory = useCallback(
    (newTheme: string) => {
      if (!themes.includes(newTheme)) return

      setTheme(newTheme)

      const updatedHistory = [newTheme, ...themeHistory.filter((t) => t !== newTheme)].slice(0, 5)
      setThemeHistory(updatedHistory)
      localStorage.setItem('theme-history', JSON.stringify(updatedHistory))

      info('Theme changed with history', {
        component: 'AdvancedTheme',
        action: 'theme_change',
        metadata: { newTheme, history: updatedHistory },
      })
    },
    [theme, themeHistory, themes, setTheme],
  )

  const getRandomTheme = useCallback(() => {
    const availableThemes = themes.filter((t) => t !== theme)
    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)]
    setThemeWithHistory(randomTheme)
  }, [themes, theme, setThemeWithHistory])

  return {
    theme: mounted ? theme : undefined,
    resolvedTheme: mounted ? (theme === 'system' ? systemTheme : theme) : undefined,
    themes,
    themeHistory: mounted ? themeHistory : [],
    setTheme: setThemeWithHistory,
    getRandomTheme,
    mounted,
  }
}
```

### Theme Synchronization Across Tabs

```tsx
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

function useThemeSync() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'theme' && event.newValue && event.newValue !== theme) {
        setTheme(event.newValue)

        info('Theme synced from other tab', {
          component: 'ThemeSync',
          action: 'sync_theme',
          metadata: { oldTheme: theme, newTheme: event.newValue },
        })
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [theme, setTheme])
}
```

---

## 📦 Complete API Reference

### ThemeProvider Props

```tsx
interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string // Default: 'data-theme'
  defaultTheme?: string // Default: 'system'
  enableSystem?: boolean // Default: true
  disableTransitionOnChange?: boolean // Default: false
  themes?: string[] // Default: ['light', 'dark']
  forcedTheme?: string // Force specific theme
  storageKey?: string // localStorage key
  nonce?: string // CSP nonce
}
```

### ThemeToggle Props

```tsx
interface ThemeToggleProps {
  className?: string // Custom CSS classes
  variant?: 'default' | 'ghost' | 'outline' // Button variant (default: 'ghost')
}
```

### useThemeToggle Hook

```tsx
const {
  theme: string | undefined,           // Current theme setting
  resolvedTheme: string | undefined,   // Actual resolved theme (handles 'system')
  toggleTheme: () => void,            // Toggle between light/dark
  mounted: boolean,                   // Hydration state
} = useThemeToggle()
```

### useTheme Hook (from next-themes)

```tsx
const {
  theme: string | undefined,
  themes: string[],
  setTheme: (theme: string) => void,
  systemTheme: string | undefined,
  resolvedTheme: string | undefined,
} = useTheme()
```

---

## 🚨 Common Mistakes

```tsx
// ❌ Wrong - Using theme before hydration
function BadComponent() {
  const { theme } = useTheme()
  return <div>Current theme: {theme}</div> // Can cause hydration mismatch
}

// ❌ Wrong - Not handling loading state
function BadThemeButton() {
  const { resolvedTheme, toggleTheme } = useThemeToggle()
  return <button onClick={toggleTheme}>{resolvedTheme}</button> // undefined during SSR
}

// ❌ Wrong - Missing provider
;<App>
  <ThemeToggle /> {/* Error: useTheme must be used within ThemeProvider */}
</App>

// ✅ Right - Proper hydration handling
function GoodComponent() {
  const { theme, mounted } = useThemeToggle()

  if (!mounted) return <div>Loading...</div>
  return <div>Current theme: {theme}</div>
}

// ✅ Right - Provider setup
;<ThemeProvider attribute="class" defaultTheme="dark">
  <App>
    <ThemeToggle />
  </App>
</ThemeProvider>
```

## 💡 Best Practices

**Provider placement:**

```tsx
// Place at root layout level for app-wide access
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  <YourApp />
</ThemeProvider>
```

**Hydration safety:**

```tsx
// Always check mounted state for SSR compatibility
const { mounted, resolvedTheme } = useThemeToggle()
if (!mounted) return <LoadingSkeleton />
```

**Performance considerations:**

- Theme changes trigger re-renders in consuming components
- Use React.memo() for expensive components that use theme
- Leverage CSS custom properties for performant theme switching
- Consider selective theme subscriptions for components that only need current theme

**Accessibility excellence:**

- ThemeToggle includes full ARIA support automatically
- Respects `prefers-reduced-motion` for animations
- Provides proper loading states and labels
- Supports keyboard navigation and screen readers

**Animation optimization:**

- Animations automatically respect motion preferences
- Use CSS custom properties for instant theme switching
- Leverage framer-motion for smooth icon transitions
- Consider disableTransitionOnChange for instant switching
