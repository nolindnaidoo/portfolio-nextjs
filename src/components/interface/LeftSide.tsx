import { Home } from 'lucide-react'

interface LeftSideProps {
  children: React.ReactNode
  pageTitle?: string
}

// Header component for the left side with back button functionality
const LeftSideHeader = ({
  onBack,
  pageTitle = 'Back',
  showBackButton = false,
  icon = null,
}: {
  onBack?: () => void
  pageTitle?: string
  showBackButton?: boolean
  icon?: React.ReactNode
}) => {
  return (
    <header className="flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0">
      <div className="flex items-center gap-3">
        {showBackButton && onBack ? (
          <button
            onClick={onBack}
            className="w-8 h-8 bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 flex items-center justify-center shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Go back"
          >
            <span className="text-foreground/80">←</span>
          </button>
        ) : (
          <div className="w-8 h-8 bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 flex items-center justify-center shadow-lg">
            {icon || <span className="text-foreground/80 text-xs">⌘</span>}
          </div>
        )}
        <h2 className="text-foreground/90 font-medium text-sm">{pageTitle}</h2>
      </div>
    </header>
  )
}

export default function LeftSide({ children, pageTitle }: LeftSideProps) {
  // Determine header props based on current content
  const getHeaderProps = () => {
    return {
      pageTitle: pageTitle || 'Home',
      showBackButton: false,
      icon: <Home className="w-4 h-4 text-foreground/80" />,
    }
  }

  const headerProps = getHeaderProps()

  return (
    <div className="relative h-full bg-gradient-to-br from-muted/15 via-muted/25 to-muted/35 border-r border-border/40 flex flex-col">
      {/* Premium separator with enhanced shadow */}
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-border/30 via-border/60 to-border/30"></div>
      <div className="absolute right-[-1px] top-0 h-full w-px bg-gradient-to-b from-transparent via-border/20 to-transparent"></div>
      <div className="absolute right-[-2px] top-0 h-full w-px bg-gradient-to-b from-transparent via-background/10 to-transparent"></div>

      {/* Header */}
      <LeftSideHeader {...headerProps} />

      {/* Content with premium padding and typography hierarchy */}
      <div className="relative flex-1 overflow-y-auto px-8 py-8">
        <div className="max-w-md mx-auto">{children}</div>
      </div>
    </div>
  )
}
