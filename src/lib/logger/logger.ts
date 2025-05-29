// Environment check
const isDev = process.env.NODE_ENV === 'development'

// Types
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogContext {
  component?: string
  action?: string
  metadata?: Record<string, unknown>
}

// Helper to format log messages
function formatMessage(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString()
  const contextStr = context ? ` | ${JSON.stringify(context)}` : ''
  return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`
}

// Core logging functions
export function debug(message: string, context?: LogContext): void {
  if (isDev) {
    console.debug(formatMessage('debug', message, context))
  }
}

export function info(message: string, context?: LogContext): void {
  console.info(formatMessage('info', message, context))
}

export function warn(message: string, context?: LogContext): void {
  console.warn(formatMessage('warn', message, context))
}

export function error(message: string, context?: LogContext): void {
  console.error(formatMessage('error', message, context))
}

// Legacy support - simple console.log wrapper
export function log(...args: unknown[]): void {
  const message = args.map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' ')
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${message}`)
}

// Convenience object export
export const logger = {
  debug,
  info,
  warn,
  error,
  log,
}
