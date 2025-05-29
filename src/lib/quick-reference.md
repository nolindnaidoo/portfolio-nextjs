# Quick Reference

## 🎯 Decision Tree

```
Did something fail?
├─ NO  → Logger (debug, info, warn)
└─ YES → Error (logError, throwError)
```

## 📋 Common Scenarios

| Situation           | Tool   | Function       | Example                 |
| ------------------- | ------ | -------------- | ----------------------- |
| ✅ Success          | Logger | `info()`       | User action completed   |
| 🔍 Debug            | Logger | `debug()`      | Component lifecycle     |
| ⚠️ Warning          | Logger | `warn()`       | Performance issue       |
| ❌ Recoverable fail | Error  | `logError()`   | API failed, using cache |
| 💥 Critical fail    | Error  | `throwError()` | Cannot continue         |

## ⚡ Quick Examples

### Logger

```tsx
debug('Component mounted', { component: 'Header' })
info('Navigation complete', { component: 'Router', action: 'navigate' })
warn('Slow response', { component: 'API', duration: '3s' })
```

### Error

```tsx
// Recoverable
logError('Cache miss', {
  component: 'DataStore',
  action: ERROR_ACTIONS.FETCH,
})

// Critical
throwError('Auth required', {
  component: 'ProtectedRoute',
  action: ERROR_ACTIONS.NAVIGATE,
})
```

## 🔧 Patterns

### Basic Try-Catch

```tsx
try {
  await doWork()
  info('Work completed')
} catch (err) {
  logError('Work failed', { action: ERROR_ACTIONS.EXECUTE })
}
```

### Error Boundary

```tsx
componentDidCatch(error) {
  handleError(error, 'MyComponent', ERROR_ACTIONS.RENDER)
}
```

## 📦 Imports

```tsx
// Recommended
import { debug, info, throwError, ERROR_ACTIONS } from '@/lib'

// Direct
import { debug, info } from '@/util/logger'
import { throwError, ERROR_ACTIONS } from '@/util/error'
```

## 🚨 Don't Do

```tsx
// ❌ Wrong
info('Payment failed') // Should be logError
throwError('User clicked button') // Should be debug

// ✅ Right
logError('Payment failed') // Actual failure
debug('User clicked button') // Just tracking
```
