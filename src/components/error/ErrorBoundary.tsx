'use client'

import { ERROR_ACTIONS, handleError } from '@/lib'
import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react'
import { Component, type ReactNode } from 'react'

// Constants first
const CONTAINER_STYLES = {
  LEFT: {
    MAIN: 'relative h-full bg-gradient-to-br from-muted/15 via-muted/25 to-muted/35 border-r border-border/40 flex flex-col',
    SEPARATOR:
      'absolute right-0 top-0 h-full w-px bg-gradient-to-b from-border/30 via-border/60 to-border/30',
  },
  RIGHT: {
    MAIN: 'relative h-full bg-gradient-to-bl from-background/95 via-muted/10 to-background/90',
    SEPARATOR:
      'absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent',
    DEPTH_OVERLAY: 'absolute inset-0 bg-gradient-to-br from-transparent via-muted/5 to-border/8',
  },
  SHARED: {
    HEADER: 'flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0',
    CONTENT: 'relative flex-1 overflow-y-auto px-8 py-8',
    FOOTER: 'p-4 pt-2 border-t border-border/50 flex-shrink-0',
  },
} as const

const ERROR_CONFIG = {
  LEFT: {
    ICON_CONTAINER:
      'w-8 h-8 bg-amber-100 dark:bg-amber-900/20 backdrop-blur-xl rounded-lg border border-amber-200 dark:border-amber-800/30 flex items-center justify-center shadow-lg',
    ICON_COLOR: 'text-amber-600 dark:text-amber-400',
    MAIN_ICON: AlertTriangle,
    TITLE: 'Content',
    HEADING: 'Content Unavailable',
    MESSAGE:
      'This section encountered an issue, but you can still navigate using the terminal or try refreshing this content.',
    TIP: '💡 Tip: Use the terminal on the right to navigate to other sections',
    BUTTON_TEXT: 'Try Again',
  },
  RIGHT: {
    ICON_CONTAINER:
      'w-8 h-8 bg-red-100 dark:bg-red-900/20 backdrop-blur-xl rounded-lg border border-red-200 dark:border-red-800/30 flex items-center justify-center shadow-lg',
    TERMINAL_ICON_CONTAINER:
      'w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center',
    ICON_COLOR: 'text-red-600 dark:text-red-400',
    MAIN_ICON: AlertTriangle,
    TERMINAL_ICON: Terminal,
    TITLE: 'Terminal',
    HEADING: 'Terminal Unavailable',
    MESSAGE:
      'The interactive terminal encountered an issue, but you can still explore the portfolio using the navigation on the left.',
    TIP: '💡 Tip: Most browser issues are resolved with a page refresh',
    BUTTON_TEXT: 'Restart Terminal',
    TERMINAL_OUTPUT:
      'bg-background/20 backdrop-blur-xl rounded-lg border border-border/20 p-4 font-mono text-sm',
    FOOTER_CONTAINER:
      'bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 px-3 py-2 shadow-lg',
  },
  SHARED: {
    RETRY_BUTTON:
      'inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium',
    REFRESH_BUTTON:
      'inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted/50 transition-colors text-sm font-medium',
  },
} as const

type ErrorBoundaryVariant = 'left' | 'right'

interface ErrorBoundaryProps {
  children: ReactNode
  variant: ErrorBoundaryVariant
  pageTitle?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

// Functional error fallback component following architecture patterns
function ErrorFallback({
  error,
  retry,
  variant,
  pageTitle,
}: {
  error: Error | null
  retry: () => void
  variant: ErrorBoundaryVariant
  pageTitle?: string
}) {
  // Guard clause for missing error
  if (!error) return null

  const isLeft = variant === 'left'
  const config = isLeft ? ERROR_CONFIG.LEFT : ERROR_CONFIG.RIGHT
  const styles = isLeft ? CONTAINER_STYLES.LEFT : CONTAINER_STYLES.RIGHT
  const MainIcon = config.MAIN_ICON

  // Nested header component
  const ErrorHeader = () => (
    <header className={CONTAINER_STYLES.SHARED.HEADER}>
      <div className="flex items-center gap-3">
        <div className={config.ICON_CONTAINER}>
          <MainIcon className={`w-4 h-4 ${config.ICON_COLOR}`} />
        </div>
        <h2 className="text-foreground/90 font-medium text-sm">
          {pageTitle || config.TITLE} - Error
        </h2>
      </div>
    </header>
  )

  // Nested content for left side
  const LeftContent = () => (
    <div className={CONTAINER_STYLES.SHARED.CONTENT}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{config.HEADING}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{config.MESSAGE}</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 flex-wrap">
            <button onClick={retry} className={ERROR_CONFIG.SHARED.RETRY_BUTTON}>
              <RefreshCw className="w-4 h-4" />
              {config.BUTTON_TEXT}
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">{config.TIP}</p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-h-32 border border-border">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  )

  // Nested content for right side
  const RightContent = () => {
    const rightConfig = ERROR_CONFIG.RIGHT
    const TerminalIcon = rightConfig.TERMINAL_ICON!

    return (
      <div className={CONTAINER_STYLES.SHARED.CONTENT}>
        <div className="max-w-md mx-auto space-y-6">
          {/* Terminal-style error display */}
          <div className={rightConfig.TERMINAL_OUTPUT}>
            <div className="space-y-2">
              <div className="text-red-500">[ERROR] Terminal component failed to initialize</div>
              <div className="text-muted-foreground">
                Error: {error?.message || 'Unknown error'}
              </div>
              <div className="text-yellow-500">
                [INFO] Navigation still available via left panel
              </div>
              <div className="text-cyan-500">[SYSTEM] Recovery options available</div>
            </div>
          </div>

          <div className="space-y-3 text-center">
            <div className={rightConfig.TERMINAL_ICON_CONTAINER}>
              <TerminalIcon className={`w-8 h-8 ${config.ICON_COLOR}`} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{config.HEADING}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{config.MESSAGE}</p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={retry} className={ERROR_CONFIG.SHARED.RETRY_BUTTON}>
                <RefreshCw className="w-4 h-4" />
                {config.BUTTON_TEXT}
              </button>
              <button
                onClick={() => window.location.reload()}
                className={ERROR_CONFIG.SHARED.REFRESH_BUTTON}
              >
                Refresh Page
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">{config.TIP}</p>
          </div>

          {process.env.NODE_ENV === 'development' && error && (
            <details className="text-left">
              <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                Error Details (Development)
              </summary>
              <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-h-32 border border-border">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
      </div>
    )
  }

  // Nested footer component (right side only)
  const ErrorFooter = () => {
    if (isLeft) return null
    const rightConfig = ERROR_CONFIG.RIGHT

    return (
      <footer className={CONTAINER_STYLES.SHARED.FOOTER}>
        <div className={rightConfig.FOOTER_CONTAINER}>
          <p className="text-muted-foreground text-xs text-center font-medium">
            Portfolio Terminal v3.0.0 - Error Recovery Mode
          </p>
        </div>
      </footer>
    )
  }

  return (
    <div className={styles.MAIN}>
      {!isLeft && 'DEPTH_OVERLAY' in styles && <div className={styles.DEPTH_OVERLAY}></div>}
      <div className={styles.SEPARATOR}></div>

      {isLeft ? (
        <>
          <ErrorHeader />
          <LeftContent />
        </>
      ) : (
        <div className="relative h-full flex flex-col">
          <ErrorHeader />
          <RightContent />
          <ErrorFooter />
        </div>
      )}
    </div>
  )
}

// Minimal class component wrapper (required for error boundaries)
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error) {
    handleError(error, `${this.props.variant}Side`, ERROR_ACTIONS.RENDER)
  }

  retry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    // Guard clause for error state
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          retry={this.retry}
          variant={this.props.variant}
          pageTitle={this.props.pageTitle}
        />
      )
    }

    return this.props.children
  }
}
