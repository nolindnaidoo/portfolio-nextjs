# Error Examples

## 🔧 Real-World Usage

### API Calls

```tsx
const fetchUser = async (id: string) => {
  try {
    const user = await api.getUser(id)
    info('User fetched', { component: 'UserService', action: 'fetch' })
    return user
  } catch (err) {
    logError('User fetch failed, using cache', {
      component: 'UserService',
      action: ERROR_ACTIONS.FETCH,
      metadata: { userId: id },
    })
    return getCachedUser(id)
  }
}
```

### Form Validation

```tsx
const validateForm = (data: FormData) => {
  if (!data.email) {
    logError('Email validation failed', {
      component: 'ContactForm',
      action: ERROR_ACTIONS.VALIDATE,
      metadata: { field: 'email' },
    })
    return { error: 'Email required' }
  }

  info('Form validation passed', { component: 'ContactForm' })
  return { success: true }
}
```

### Component Rendering

```tsx
const Dashboard = () => {
  if (!user) {
    throwError('Cannot render dashboard without user', {
      component: 'Dashboard',
      action: ERROR_ACTIONS.RENDER,
      metadata: { userState: 'null' },
    })
  }

  return <div>Dashboard content</div>
}
```

### Error Boundaries

```tsx
class ErrorBoundary extends Component {
  componentDidCatch(error: Error) {
    handleError(error, 'ErrorBoundary', ERROR_ACTIONS.RENDER)

    warn('Showing fallback UI', {
      component: 'ErrorBoundary',
      action: 'recover',
    })
  }
}
```

### Navigation

```tsx
const navigateTo = (path: string) => {
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
      metadata: { targetPath: path },
    })
  }
}
```

## 🎯 ERROR_ACTIONS Reference

```tsx
// Component lifecycle
ERROR_ACTIONS.RENDER
ERROR_ACTIONS.MOUNT
ERROR_ACTIONS.UPDATE

// Data operations
ERROR_ACTIONS.FETCH
ERROR_ACTIONS.SAVE
ERROR_ACTIONS.VALIDATE

// User interactions
ERROR_ACTIONS.SUBMIT
ERROR_ACTIONS.NAVIGATE
ERROR_ACTIONS.CLICK

// System operations
ERROR_ACTIONS.INIT
ERROR_ACTIONS.CONNECT
ERROR_ACTIONS.COMMAND
```
