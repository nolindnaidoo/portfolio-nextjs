# Utilities

Clean, organized utilities for logging and error handling.

## 🗂️ Structure

```
src/util/
├── logger/     # Information & monitoring
└── error/      # Exception handling
```

## 🚀 Quick Start

```tsx
// Import from main lib (recommended)
import { debug, info, warn, throwError, ERROR_ACTIONS } from '@/lib'

// Or import directly
import { debug, info, warn } from '@/util/logger'
import { throwError, logError, ERROR_ACTIONS } from '@/util/error'
```

## 🤔 Which to Use?

**Simple question: "Did something fail?"**

- **NO** → Use Logger (`debug`, `info`, `warn`)
- **YES** → Use Error (`logError`, `throwError`)

## 📊 Examples

### Logger (Success & Info)

```tsx
// Track what happened
info('User logged in', { component: 'Auth', action: 'login' })
debug('Component mounted', { component: 'Dashboard' })
warn('API slow', { component: 'DataFetcher', response_time: '2s' })
```

### Error (Failures)

```tsx
// Handle failures
logError('Save failed, using cache', {
  component: 'DataManager',
  action: ERROR_ACTIONS.SAVE,
})

// Critical failures
throwError('Cannot render without data', {
  component: 'Dashboard',
  action: ERROR_ACTIONS.RENDER,
})
```

## 🔧 Key Patterns

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

### Error Boundary Pattern

```tsx
componentDidCatch(error: Error) {
  handleError(error, 'MyComponent', ERROR_ACTIONS.RENDER)
}
```

## 💡 Rules

- **Logger**: Never throws, purely observational
- **Error**: Sometimes throws, handles failures
- **Context**: Always include `component` and `action`
- **Consistency**: Use `ERROR_ACTIONS` constants for errors
