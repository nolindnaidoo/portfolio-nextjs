import { Terminal } from 'lucide-react'
import { ThemeToggle } from '../theme'

interface TerminalHeaderProps {
  isBooting: boolean
}

export const TerminalHeader = ({ isBooting }: TerminalHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 flex items-center justify-center shadow-lg">
          <Terminal className="w-4 h-4 text-foreground/80" aria-hidden="true" />
        </div>
        <h2 className="text-foreground/90 font-medium text-sm">
          {isBooting ? 'Security Terminal' : 'Portfolio Terminal'}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </header>
  )
}
