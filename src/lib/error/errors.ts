// Environment check
const isDev = process.env.NODE_ENV === 'development'

/**
 * ERROR UTILITY - Exception Handling & Error Boundaries
 *
 * This utility handles FAILURES and EXCEPTIONS that require app intervention.
 * For informational logging, warnings, and success tracking, use @/lib/logger
 *
 * Key Differences from Logger:
 * - Logger: Observational (never throws)
 * - Error: Intervention (sometimes throws)
 *
 * Usage Decision: "Did something actually fail?" → Yes = Error, No = Logger
 */

// Predefined actions to maintain integrity (stricter than logger's free-form actions)
export const ERROR_ACTIONS = {
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

export type ErrorAction = (typeof ERROR_ACTIONS)[keyof typeof ERROR_ACTIONS]

// Context interface (consistent with logger's LogContext)
export interface ErrorContext {
  component?: string
  action?: ErrorAction // Stricter than logger (predefined actions only)
  metadata?: Record<string, unknown>
}

// Helper to format error messages (consistent with logger's formatMessage)
function formatError(message: string, context?: ErrorContext): string {
  const timestamp = new Date().toISOString()
  const contextStr = context ? ` | ${JSON.stringify(context)}` : ''
  return `[${timestamp}] ERROR: ${message}${contextStr}`
}

/**
 * Main error function - throws with context
 * Use when: Critical failure that should crash component/flow
 * Logger equivalent: N/A (logger never throws)
 */
export function throwError(message: string, context?: ErrorContext): never {
  const formattedMessage = formatError(message, context)

  // Log the error first (consistent with logger pattern)
  console.error(formattedMessage)

  // In development, also log stack trace
  if (isDev) {
    console.error('Stack trace will be available when thrown')
  }

  // Throw with original message (not formatted) for clean error boundaries
  const error = new Error(message) as Error & { portfolioContext?: ErrorContext }

  // Attach context for error boundaries to access
  error.portfolioContext = context

  throw error
}

/**
 * Non-throwing version for logging only
 * Use when: Operation failed but app can continue
 * Logger equivalent: logger.error() (for comparison - but this has richer context)
 */
export function logError(message: string, context?: ErrorContext): void {
  const formattedMessage = formatError(message, context)
  console.error(formattedMessage)
}

/**
 * Convenience wrapper for error boundaries
 * Use when: In componentDidCatch or error boundary contexts
 * Logger equivalent: Combined with logger.warn() for recovery actions
 */
export function handleError(error: Error, component: string, action?: ErrorAction): void {
  const errorWithContext = error as Error & { portfolioContext?: ErrorContext }

  const context: ErrorContext = {
    component,
    action: action || ERROR_ACTIONS.RENDER,
    metadata: {
      originalError: error.name,
      // Extract any existing context
      ...errorWithContext.portfolioContext,
    },
  }

  logError(error.message, context)
}

// Convenience object export (consistent with logger pattern)
export const errorUtils = {
  throwError,
  logError,
  handleError,
  ERROR_ACTIONS,
}
