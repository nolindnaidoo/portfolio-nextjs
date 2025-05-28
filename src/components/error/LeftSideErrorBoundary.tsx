'use client'

import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface LeftSideErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface LeftSideErrorBoundaryProps {
  children: ReactNode
  pageTitle?: string
}

export class LeftSideErrorBoundary extends Component<
  LeftSideErrorBoundaryProps,
  LeftSideErrorBoundaryState
> {
  constructor(props: LeftSideErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): Partial<LeftSideErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('LeftSide error caught:', error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative h-full bg-gradient-to-br from-muted/15 via-muted/25 to-muted/35 border-r border-border/40 flex flex-col">
          <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-border/30 via-border/60 to-border/30"></div>

          {/* Header */}
          <header className="flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/20 backdrop-blur-xl rounded-lg border border-amber-200 dark:border-amber-800/30 flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-foreground/90 font-medium text-sm">
                {this.props.pageTitle || 'Content'} - Error
              </h2>
            </div>
          </header>

          {/* Error Content */}
          <div className="relative flex-1 overflow-y-auto px-8 py-8">
            <div className="max-w-md mx-auto space-y-6">
              {/* Error message */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground">Content Unavailable</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  This section encountered an issue, but you can still navigate using the terminal
                  or try refreshing this content.
                </p>
              </div>

              {/* Recovery actions */}
              <div className="space-y-4">
                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={this.retry}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              </div>

              {/* Helpful tip */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  💡 Tip: Use the terminal on the right to navigate to other sections
                </p>
              </div>

              {/* Development error details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-3 bg-muted rounded text-xs overflow-auto max-h-32 border border-border">
                    {this.state.error.message}
                    {this.state.error.stack && `\n\n${this.state.error.stack}`}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
