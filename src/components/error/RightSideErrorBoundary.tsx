'use client'

import { AlertTriangle, RefreshCw, Terminal } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface RightSideErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface RightSideErrorBoundaryProps {
  children: ReactNode
}

export class RightSideErrorBoundary extends Component<
  RightSideErrorBoundaryProps,
  RightSideErrorBoundaryState
> {
  constructor(props: RightSideErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): Partial<RightSideErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RightSide error caught:', error, errorInfo)
  }

  retry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative h-full bg-gradient-to-bl from-background/95 via-muted/10 to-background/90">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-muted/5 to-border/8"></div>
          <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>

          <div className="relative h-full flex flex-col">
            {/* Terminal Header */}
            <header className="flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 backdrop-blur-xl rounded-lg border border-red-200 dark:border-red-800/30 flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-foreground/90 font-medium text-sm">Terminal - Error</h2>
              </div>
            </header>

            {/* Error Content */}
            <div className="flex-1 p-4 space-y-6">
              <div className="max-w-md mx-auto space-y-6">
                {/* Terminal-style error display */}
                <div className="bg-background/20 backdrop-blur-xl rounded-lg border border-border/20 p-4 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="text-red-500">
                      [ERROR] Terminal component failed to initialize
                    </div>
                    <div className="text-muted-foreground">
                      Error: {this.state.error?.message || 'Unknown error'}
                    </div>
                    <div className="text-yellow-500">
                      [INFO] Navigation still available via left panel
                    </div>
                    <div className="text-cyan-500">[SYSTEM] Recovery options available</div>
                  </div>
                </div>

                {/* Error message */}
                <div className="space-y-3 text-center">
                  <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                    <Terminal className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Terminal Unavailable</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The interactive terminal encountered an issue, but you can still explore the
                    portfolio using the navigation on the left.
                  </p>
                </div>

                {/* Recovery actions */}
                <div className="space-y-4">
                  <div className="flex gap-3 justify-center flex-wrap">
                    <button
                      onClick={this.retry}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Restart Terminal
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted/50 transition-colors text-sm font-medium"
                    >
                      Refresh Page
                    </button>
                  </div>
                </div>

                {/* Helpful tip */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground text-center">
                    💡 Tip: Most browser issues are resolved with a page refresh
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

            {/* Terminal Footer */}
            <footer className="p-4 pt-2 border-t border-border/50 flex-shrink-0">
              <div className="bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 px-3 py-2 shadow-lg">
                <p className="text-muted-foreground text-xs text-center font-medium">
                  Portfolio Terminal v3.0.0 - Error Recovery Mode
                </p>
              </div>
            </footer>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
