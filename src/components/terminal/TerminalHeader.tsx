import { Terminal } from 'lucide-react'
import { ThemeToggle } from '../theme'
import { TERMINAL_STYLES } from './constants'

interface TerminalHeaderProps {
  isBooting: boolean
}

export const TerminalHeader = ({ isBooting }: TerminalHeaderProps) => {
  return (
    <header className={TERMINAL_STYLES.HEADER.CONTAINER}>
      <div className={TERMINAL_STYLES.HEADER.CONTENT_GROUP}>
        <div className={TERMINAL_STYLES.HEADER.ICON_CONTAINER}>
          <Terminal className="w-4 h-4 text-foreground/80" aria-hidden="true" />
        </div>
        <h2 className={TERMINAL_STYLES.HEADER.TITLE}>
          {isBooting ? 'Security Terminal' : 'Portfolio Terminal'}
        </h2>
      </div>
      <div className={TERMINAL_STYLES.HEADER.ACTIONS}>
        <ThemeToggle />
      </div>
    </header>
  )
}
