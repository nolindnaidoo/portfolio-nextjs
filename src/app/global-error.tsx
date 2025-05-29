'use client'

import { AlertCircle, Home, RefreshCw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Critical Error - Nolin Naidoo Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <main className="min-h-screen flex items-start justify-center pt-8 pb-32 px-4 bg-background">
          <div className="w-full max-w-7xl">
            <article className="relative w-full h-[800px] bg-card border border-border/30 shadow-2xl overflow-hidden ring-1 ring-border/10 rounded-xl">
              {/* Inner border effect */}
              <div className="absolute inset-[1px] rounded-3xl border border-card/50"></div>

              <div className="relative h-full">
                <section className="grid md:grid-cols-2 h-full">
                  {/* Left Side - Error Content */}
                  <div className="relative h-full bg-gradient-to-br from-muted/15 via-muted/25 to-muted/35 border-r border-border/40 flex flex-col">
                    <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-border/30 via-border/60 to-border/30"></div>

                    {/* Header */}
                    <header className="flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 backdrop-blur-xl rounded-lg border border-red-200 dark:border-red-800/30 flex items-center justify-center shadow-lg">
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </div>
                        <h2 className="text-foreground/90 font-medium text-sm">Critical Error</h2>
                      </div>
                    </header>

                    {/* Content */}
                    <div className="relative flex-1 overflow-y-auto px-8 py-8">
                      <div className="max-w-md mx-auto space-y-6">
                        {/* Portfolio branding */}
                        <div className="space-y-2">
                          <h1 className="text-2xl font-bold text-foreground">Nolin Naidoo</h1>
                          <p className="text-muted-foreground">Full Stack Developer</p>
                        </div>

                        {/* Error message */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold text-foreground">
                            Something went wrong
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            A critical error occurred that prevented the application from loading
                            properly. This is likely a temporary issue and doesn&apos;t reflect my
                            coding skills!
                          </p>
                        </div>

                        {/* Recovery actions */}
                        <div className="space-y-4">
                          <div className="flex gap-3 flex-wrap">
                            <button
                              onClick={reset}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              <RefreshCw className="w-4 h-4" />
                              Try Again
                            </button>
                            <button
                              onClick={() => window.location.reload()}
                              className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted/50 transition-colors text-sm font-medium"
                            >
                              <Home className="w-4 h-4" />
                              Refresh Page
                            </button>
                          </div>
                        </div>

                        {/* Contact fallback */}
                        <div className="pt-4 border-t border-border/50">
                          <p className="text-sm text-muted-foreground mb-3">
                            Still having issues? Let&apos;s connect directly:
                          </p>
                          <button
                            onClick={() =>
                              window.open(
                                `mailto:${
                                  process.env.NEXT_PUBLIC_EMAIL || 'nolin@nolindnaidoo.com'
                                }`,
                                '_blank',
                              )
                            }
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Contact Me
                          </button>
                        </div>

                        {/* Development error details */}
                        {process.env.NODE_ENV === 'development' && (
                          <details className="text-left">
                            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                              Error Details (Development)
                            </summary>
                            <pre className="mt-3 p-4 bg-muted rounded text-xs overflow-auto max-h-40 border border-border">
                              {error.message}
                              {error.stack && `\n\n${error.stack}`}
                            </pre>
                          </details>
                        )}

                        {/* Footer */}
                        <p className="text-xs text-muted-foreground">
                          This error has been logged for investigation
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Terminal-like Error Display */}
                  <div className="relative h-full bg-gradient-to-bl from-background/95 via-muted/10 to-background/90">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-muted/5 to-border/8"></div>
                    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>

                    <div className="relative h-full flex flex-col">
                      {/* Terminal Header */}
                      <header className="flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 flex items-center justify-center shadow-lg">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          </div>
                          <h2 className="text-foreground/90 font-medium text-sm">Error Log</h2>
                        </div>
                      </header>

                      {/* Terminal Content */}
                      <div className="flex-1 p-4 font-mono text-sm">
                        <div className="space-y-2">
                          <div className="text-red-500">
                            [CRITICAL] Application failed to initialize
                          </div>
                          <div className="text-muted-foreground">Error: {error.message}</div>
                          <div className="text-yellow-500">[INFO] Error boundary activated</div>
                          <div className="text-cyan-500">[SYSTEM] Recovery options available</div>
                          <div className="text-muted-foreground">
                            Type &quot;help&quot; for recovery commands...
                          </div>
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
                </section>
              </div>
            </article>
          </div>
        </main>
      </body>
    </html>
  )
}
