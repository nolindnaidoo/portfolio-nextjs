# Theme Components

This directory contains theme-related components for managing light/dark mode functionality, following modern React patterns with guard clauses, nested arrow functions, and clean composition.

## Architecture Philosophy

### **Guard Clause Pattern**

Components use the "guard clause" or "early return" pattern to handle edge cases first, keeping the main logic path clean and readable.

### **Nested Arrow Functions**

Tightly coupled functionality is encapsulated within the main component using nested arrow functions, ensuring better encapsulation and reducing unnecessary abstractions.

### **Component Ordering**

- Constants and configuration first
- Main exported function
- Supporting functions in execution order

## Components

### `ThemeToggle.tsx`

A production-ready theme toggle component with smooth animations and comprehensive accessibility support.

**Architecture:**

```tsx
// Constants first
const ANIMATION_DURATION = 0.3
const reducedMotionVariants = { ... }
const fullMotionVariants = { ... }

// Main export
export function ThemeToggle({ className, variant }: ThemeToggleProps = {}) {
  // Nested component for icon animation
  const ThemeIcon = () => { ... }

  // Guard clause for hydration
  if (!mounted) return <LoadingState />

  return <Button>...</Button>
}

// Supporting function
export function useThemeToggle() { ... }
```

**Props:**

- `className?: string` - Custom CSS classes for styling
- `variant?: 'default' | 'ghost' | 'outline'` - Button variant (default: 'ghost')

**Features:**

- **Hydration Safety**: Prevents Next.js hydration mismatches with mounted state
- **Smooth Animations**: Icon transitions with Framer Motion and AnimatePresence
- **Accessibility**: Full ARIA support with switch semantics and reduced motion detection
- **Performance**: Optimized with useMemo for animation variants
- **System Theme Support**: Handles system preference detection automatically
- **Error Resilience**: Graceful handling of edge cases without over-engineering
- **TypeScript**: Full type safety with comprehensive interfaces

### `ThemeProvider.tsx`

A simple wrapper around next-themes provider for consistent theme management.

**Architecture:**

```tsx
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

**Features:**

- **Next.js Integration**: Seamless SSR/hydration support
- **System Detection**: Automatic system theme preference detection
- **Persistence**: Theme preference saved to localStorage
- **Type Safety**: Full TypeScript support with next-themes types

## Shared Dependencies

### Animation System

Components use consistent animation patterns:

- `reducedMotionVariants` - Simple opacity transitions for accessibility
- `fullMotionVariants` - Rich animations with rotation and scale
- `ANIMATION_DURATION` - Consistent timing across components
- Automatic reduced motion detection via `useReducedMotion` hook

### Types and Interfaces

- `ThemeToggleProps` - Props interface for ThemeToggle component
- Full TypeScript support with proper type inference

## Best Practices Implemented

### **1. Guard Clause Pattern**

```tsx
// ❌ Avoid nested conditionals
return mounted ? <ThemeButton /> : <LoadingButton />

// ✅ Use guard clauses
if (!mounted) return <LoadingButton />
return <ThemeButton />
```

### **2. Nested Arrow Functions**

```tsx
export function ThemeToggle() {
  // Tightly coupled logic stays nested
  const ThemeIcon = () => {
    if (!resolvedTheme) return null // Guard clause
    return <AnimatedIcon />
  }

  return (
    <Button>
      <ThemeIcon />
    </Button>
  )
}
```

### **3. Proper Code Ordering**

```tsx
// 1. Constants and configuration
const ANIMATION_DURATION = 0.3

// 2. Main exported function
export function ThemeToggle() {}

// 3. Supporting functions in execution order
export function useThemeToggle() {}
```

### **4. Performance Considerations**

- **useMemo**: Animation variants memoized based on motion preferences
- **Guard clauses**: Prevent unnecessary rendering during hydration
- **Efficient animations**: Optimized Framer Motion usage
- **Minimal re-renders**: Proper dependency arrays and state management

### **5. Accessibility Excellence**

- **ARIA Attributes**: Comprehensive labeling and state indication
- **Reduced Motion**: Respects user motion preferences
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper semantic roles and descriptions
- **Loading States**: Accessible loading indicators

## File Structure

```
theme/
├── ThemeToggle.tsx      # Main toggle component
├── ThemeProvider.tsx    # Theme context provider
├── index.ts            # Barrel exports
└── README.md           # This documentation
```

## Component Hierarchy

```
ThemeToggle (Main Component)
└── ThemeIcon (nested)
    └── AnimatePresence
        └── motion.div
            └── Sun | Moon
```

## Usage Examples

### Basic Usage

```tsx
import { ThemeToggle } from '@/components/theme'

export default function Header() {
  return (
    <header>
      <ThemeToggle />
    </header>
  )
}
```

### Custom Styling

```tsx
import { ThemeToggle } from '@/components/theme'

export default function CustomHeader() {
  return <ThemeToggle className="ml-4" variant="outline" />
}
```

### Using the Hook

```tsx
import { useThemeToggle } from '@/components/theme'

export default function CustomThemeControl() {
  const { resolvedTheme, toggleTheme, mounted } = useThemeToggle()

  if (!mounted) return <div>Loading...</div>

  return <button onClick={toggleTheme}>Current theme: {resolvedTheme}</button>
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

## Dependencies

- `next-themes` - Theme management with SSR support
- `framer-motion` - Smooth animations and transitions
- `lucide-react` - Icon components (Sun, Moon)
- `react` - useState, useEffect, useMemo hooks
- Custom UI components from `@/components/ui` (Button)
- Custom hooks from `@/hooks` (useReducedMotion)

## Performance & Accessibility

- **Motion Preferences**: All animations respect `prefers-reduced-motion`
- **Type Safety**: Full TypeScript support with proper interfaces
- **WCAG Compliance**: Proper ARIA attributes and semantic HTML
- **Mobile-First**: Touch-friendly interactions
- **Hydration Safe**: Prevents Next.js hydration mismatches
- **Error Handling**: Graceful fallbacks without over-engineering
- **Optimized Rendering**: Guard clauses and memoization prevent unnecessary renders

## Integration with Design System

The ThemeToggle component integrates seamlessly with the existing design system:

- **Button Component**: Uses the shared Button component with consistent variants
- **Color Tokens**: Respects CSS custom properties for theming
- **Animation Patterns**: Follows established motion design principles
- **Spacing**: Consistent with design system spacing tokens
- **Typography**: Inherits proper font families and sizing

## Testing Considerations

The component structure supports comprehensive testing:

- **Unit Tests**: Clean separation of concerns enables isolated testing
- **Integration Tests**: Hook can be tested independently
- **Accessibility Tests**: ARIA attributes and keyboard navigation
- **Animation Tests**: Motion preferences and reduced motion support
- **Hydration Tests**: SSR/client-side rendering consistency

## Browser Support

- **Modern Browsers**: Full support for ES2020+ features
- **Progressive Enhancement**: Graceful degradation for older browsers
- **CSS Custom Properties**: Theme switching via CSS variables
- **Local Storage**: Theme persistence across sessions
