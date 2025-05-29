import { TERMINAL_STYLES } from './constants'

export const TerminalFooter = () => {
  return (
    <div className={TERMINAL_STYLES.FOOTER.CONTAINER}>
      <div className={TERMINAL_STYLES.FOOTER.CONTENT}>
        <p className={TERMINAL_STYLES.FOOTER.TEXT}>
          Press Tab for autocomplete • Use ↑/↓ for command history • Type &quot;help&quot; for
          commands
        </p>
      </div>
    </div>
  )
}
