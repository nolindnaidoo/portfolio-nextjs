import { forwardRef } from 'react'
import { getAvailableCommands } from './commands'
import { TERMINAL_STYLES } from './constants'
import type { DeviceInfo } from './TerminalOutput'

interface TerminalInputProps {
  currentInput: string
  setCurrentInput: (value: string) => void
  commandHistory: string[]
  historyIndex: number
  setHistoryIndex: (value: number) => void
  executeCommand: (command: string) => void
  userIP: string
  deviceInfo: DeviceInfo
  disabled?: boolean
}

export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  (
    {
      currentInput,
      setCurrentInput,
      commandHistory,
      historyIndex,
      setHistoryIndex,
      executeCommand,
      userIP,
      deviceInfo,
      disabled = false,
    },
    ref,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return

      if (e.key === 'Enter') {
        executeCommand(currentInput)
        setCurrentInput('')
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
          setHistoryIndex(newIndex)
          setCurrentInput(commandHistory[newIndex])
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1)
            setCurrentInput('')
          } else {
            setHistoryIndex(newIndex)
            setCurrentInput(commandHistory[newIndex])
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault()
        const availableCommands = Object.keys(getAvailableCommands(() => {}, 'home'))
        const matches = availableCommands.filter((cmd) =>
          cmd.startsWith(currentInput.toLowerCase()),
        )
        if (matches.length === 1) {
          setCurrentInput(matches[0])
        }
      }
    }

    return (
      <div className={TERMINAL_STYLES.INPUT.CONTAINER}>
        <div className={TERMINAL_STYLES.INPUT.WRAPPER}>
          <span className={TERMINAL_STYLES.PROMPT.CONTAINER}>
            <span className={TERMINAL_STYLES.PROMPT.USER}>
              {userIP}@{deviceInfo.browser}-{deviceInfo.device}
            </span>
            <span className={TERMINAL_STYLES.PROMPT.SEPARATOR}>:</span>
            <span className={TERMINAL_STYLES.PROMPT.PATH}>~</span>
            <span className={TERMINAL_STYLES.PROMPT.SEPARATOR}>$</span>
          </span>
          <div className={TERMINAL_STYLES.INPUT.INPUT_WRAPPER}>
            <input
              ref={ref}
              type="text"
              value={currentInput}
              onChange={(e) => !disabled && setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`${TERMINAL_STYLES.INPUT.INPUT} ${
                disabled ? 'text-muted-foreground/50' : 'text-foreground'
              }`}
              placeholder={disabled ? 'Initializing...' : ''}
              autoComplete="off"
              spellCheck="false"
              disabled={disabled}
            />
            <span
              className={`${TERMINAL_STYLES.INPUT.CURSOR} ${
                disabled ? 'bg-muted-foreground/30' : 'bg-foreground/80'
              }`}
            ></span>
          </div>
        </div>
      </div>
    )
  },
)

TerminalInput.displayName = 'TerminalInput'
