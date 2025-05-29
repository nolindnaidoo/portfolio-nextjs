# Lib Utilities

Core utilities for logging, error handling, and common helpers.

## 🎯 Quick Decision

**"Did something fail?"**

```
├─ NO  → Logger (debug, info, warn)
└─ YES → Error (logError, throwError)
```

## 🚀 Quick Start

```tsx
import { debug, info, warn, throwError, ERROR_ACTIONS, cn } from '@/lib'

// Most common patterns
info('User action completed', { component: 'MyComponent', action: 'save' })
logError('Operation failed', { component: 'MyComponent', action: ERROR_ACTIONS.FETCH })
const classes = cn('base-class', condition && 'conditional-class')
```

## 📊 Utility Overview

| Utility    | Purpose                  | Key Functions                           |
| ---------- | ------------------------ | --------------------------------------- |
| **Logger** | Information & monitoring | `debug`, `info`, `warn`, `error`        |
| **Error**  | Exception handling       | `throwError`, `logError`, `handleError` |
| **Utils**  | Common helpers           | `cn` (className utility)                |

---

## 📋 Common Patterns

### Success Tracking (Logger)

```tsx
// Track what happened successfully
info('User logged in', { component: 'Auth', action: 'login' })
debug('Component mounted', { component: 'Dashboard' })
warn('API slow response', { component: 'DataFetcher', duration: '3s' })
```

### Failure Handling (Error)

```tsx
// Handle recoverable failures
logError('Save failed, using cache', {
  component: 'DataManager',
  action: ERROR_ACTIONS.SAVE,
})

// Handle critical failures
throwError('Cannot render without data', {
  component: 'Dashboard',
  action: ERROR_ACTIONS.RENDER,
})
```

### Class Name Utilities

```tsx
// Conditional styling
const buttonClass = cn(
  'base-button',
  variant === 'primary' && 'primary-styles',
  disabled && 'disabled-styles',
)
```

### Try-Catch Pattern

```tsx
try {
  info('Starting operation', { component: 'MyComponent', action: 'start' })
  await doSomething()
  info('Operation successful', { component: 'MyComponent', action: 'complete' })
} catch (err) {
  logError('Operation failed', {
    component: 'MyComponent',
    action: ERROR_ACTIONS.EXECUTE,
  })
}
```

---

## 🔧 Real-World Examples

### API Call with Logging

```tsx
const fetchUser = async (id: string) => {
  info('Fetching user data', {
    component: 'UserService',
    action: 'fetch',
    metadata: { userId: id },
  })

  try {
    const user = await api.getUser(id)
    info('User fetched successfully', {
      component: 'UserService',
      action: 'fetch',
      metadata: { userId: id, userFound: true },
    })
    return user
  } catch (err) {
    logError('User fetch failed, using cache', {
      component: 'UserService',
      action: ERROR_ACTIONS.FETCH,
      metadata: { userId: id, error: err.message },
    })
    return getCachedUser(id)
  }
}
```

### Form Validation

```tsx
const validateForm = (data: FormData) => {
  debug('Form validation started', {
    component: 'ContactForm',
    action: 'validate',
    metadata: { fields: Object.keys(data) },
  })

  if (!data.email) {
    logError('Email validation failed', {
      component: 'ContactForm',
      action: ERROR_ACTIONS.VALIDATE,
      metadata: { field: 'email', reason: 'required' },
    })
    return { error: 'Email required' }
  }

  info('Form validation passed', {
    component: 'ContactForm',
    action: 'validate',
  })
  return { success: true }
}
```

### Component with Conditional Styling

```tsx
const Button = ({ variant, disabled, children }) => {
  debug('Button rendered', {
    component: 'Button',
    action: 'render',
    metadata: { variant, disabled },
  })

  const buttonClass = cn('px-4 py-2 rounded transition-colors', {
    'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
    'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
    'opacity-50 cursor-not-allowed': disabled,
  })

  return (
    <button className={buttonClass} disabled={disabled}>
      {children}
    </button>
  )
}
```

### Error Boundary Integration

```tsx
class ErrorBoundary extends Component {
  componentDidCatch(error: Error) {
    handleError(error, 'ErrorBoundary', ERROR_ACTIONS.RENDER)

    warn('Error boundary activated, showing fallback UI', {
      component: 'ErrorBoundary',
      action: 'recover',
      metadata: { errorMessage: error.message },
    })
  }

  render() {
    if (this.state.hasError) {
      info('Rendering error fallback UI', {
        component: 'ErrorBoundary',
        action: 'render_fallback',
      })
      return <ErrorFallback />
    }

    return this.props.children
  }
}
```

### Navigation with Error Handling

```tsx
const navigateTo = (path: string) => {
  info('Navigation initiated', {
    component: 'Router',
    action: 'navigate',
    metadata: { targetPath: path },
  })

  try {
    router.push(path)
    info('Navigation successful', {
      component: 'Router',
      action: 'navigate',
      metadata: { path },
    })
  } catch (err) {
    throwError('Navigation failed', {
      component: 'Router',
      action: ERROR_ACTIONS.NAVIGATE,
      metadata: { targetPath: path, error: err.message },
    })
  }
}
```

---

## 🎯 Advanced Patterns

### Context-Aware Logging

```tsx
// Create component-scoped logger
const useComponentLogger = (componentName: string) => {
  return {
    debug: (message: string, metadata?: any) =>
      debug(message, { component: componentName, ...metadata }),
    info: (message: string, metadata?: any) =>
      info(message, { component: componentName, ...metadata }),
    warn: (message: string, metadata?: any) =>
      warn(message, { component: componentName, ...metadata }),
  }
}

// Usage
const MyComponent = () => {
  const log = useComponentLogger('MyComponent')

  useEffect(() => {
    log.debug('Component mounted')
  }, [])

  const handleClick = () => {
    log.info('Button clicked', { action: 'click' })
  }
}
```

### Error Recovery Patterns

```tsx
const withErrorRecovery = (operation: () => Promise<any>, fallback: any) => {
  return async () => {
    try {
      const result = await operation()
      info('Operation succeeded', {
        component: 'ErrorRecovery',
        action: 'execute',
      })
      return result
    } catch (err) {
      warn('Operation failed, using fallback', {
        component: 'ErrorRecovery',
        action: 'fallback',
        metadata: { error: err.message },
      })
      return fallback
    }
  }
}
```

### Performance Monitoring

```tsx
const withPerformanceLogging = (fn: Function, name: string) => {
  return async (...args: any[]) => {
    const startTime = performance.now()

    debug(`${name} started`, {
      component: 'Performance',
      action: 'start',
      metadata: { operation: name },
    })

    try {
      const result = await fn(...args)
      const duration = performance.now() - startTime

      if (duration > 1000) {
        warn(`${name} slow execution`, {
          component: 'Performance',
          action: 'slow',
          metadata: { operation: name, duration: `${duration.toFixed(2)}ms` },
        })
      } else {
        info(`${name} completed`, {
          component: 'Performance',
          action: 'complete',
          metadata: { operation: name, duration: `${duration.toFixed(2)}ms` },
        })
      }

      return result
    } catch (err) {
      const duration = performance.now() - startTime
      logError(`${name} failed`, {
        component: 'Performance',
        action: ERROR_ACTIONS.EXECUTE,
        metadata: { operation: name, duration: `${duration.toFixed(2)}ms`, error: err.message },
      })
      throw err
    }
  }
}
```

---

## 📦 Complete API Reference

### Logger Functions

```tsx
// Development debugging (only shows in dev mode)
debug(message: string, context?: LogContext): void

// General information
info(message: string, context?: LogContext): void

// Warnings and potential issues
warn(message: string, context?: LogContext): void

// Error logging (doesn't throw)
error(message: string, context?: LogContext): void

// Legacy console.log wrapper
log(...args: unknown[]): void

// Convenience object
logger: { debug, info, warn, error, log }
```

### Error Functions

```tsx
// Log error and throw (critical failures)
throwError(message: string, context?: ErrorContext): never

// Log error without throwing (recoverable failures)
logError(message: string, context?: ErrorContext): void

// Error boundary helper
handleError(error: Error, component: string, action?: ErrorAction): void

// Convenience object
errorUtils: { throwError, logError, handleError, ERROR_ACTIONS }
```

### Utility Functions

```tsx
// className utility (from clsx + tailwind-merge)
cn(...inputs: ClassValue[]): string
```

### Context Interfaces

```tsx
// Logger context
interface LogContext {
  component?: string
  action?: string
  metadata?: Record<string, unknown>
}

// Error context (stricter)
interface ErrorContext {
  component?: string
  action?: ErrorAction // Predefined constants only
  metadata?: Record<string, unknown>
}
```

### ERROR_ACTIONS Constants

```tsx
const ERROR_ACTIONS = {
  // Component lifecycle
  RENDER: 'render',
  MOUNT: 'mount',
  UNMOUNT: 'unmount',
  UPDATE: 'update',

  // Data operations
  FETCH: 'fetch',
  SAVE: 'save',
  DELETE: 'delete',
  VALIDATE: 'validate',

  // User interactions
  CLICK: 'click',
  SUBMIT: 'submit',
  NAVIGATE: 'navigate',
  INPUT: 'input',

  // System operations
  INIT: 'init',
  BOOT: 'boot',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',

  // Terminal specific
  COMMAND: 'command',
  PARSE: 'parse',
  EXECUTE: 'execute',

  // Animation/UI
  ANIMATE: 'animate',
  TRANSITION: 'transition',
  RESIZE: 'resize',
  SCROLL: 'scroll',
} as const
```

---

## 🚨 Common Mistakes

```tsx
// ❌ Wrong - Using logger for actual failures
info('Payment processing failed')

// ❌ Wrong - Using error for success tracking
throwError('User logged in successfully')

// ❌ Wrong - Missing context
debug('Something happened')

// ❌ Wrong - Free-form error actions
logError('Failed', { action: 'my-custom-action' })

// ✅ Right - Proper usage
info('Payment processing started', { component: 'PaymentForm', action: 'submit' })
logError('Payment processing failed', {
  component: 'PaymentForm',
  action: ERROR_ACTIONS.SUBMIT,
  metadata: { amount: 99.99 },
})
```

## 💡 Best Practices

**Always include context:**

```tsx
// Minimal context
info('User action', { component: 'MyComponent' })

// Better context
info('User action', {
  component: 'MyComponent',
  action: 'submit',
  metadata: { userId: '123' },
})
```

**Use appropriate log levels:**

- `debug()` → Development information
- `info()` → Success tracking, user actions
- `warn()` → Performance issues, fallbacks
- `logError()` → Recoverable failures
- `throwError()` → Critical failures

**Consistent naming:**

- Component names: PascalCase (`UserProfile`)
- Actions: lowercase with underscores (`user_login`) or camelCase (`userLogin`)
- Use ERROR_ACTIONS constants for errors

**Performance considerations:**

- Logger calls are cheap, but avoid in tight loops
- Use `debug()` for verbose logging (automatically filtered in production)
- Include performance-relevant metadata when helpful
