import { forwardRef } from 'react'
import { getAvailableCommands } from './commands'
import type { DeviceInfo } from './types'

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

const getPrompt = (userIP: string, deviceInfo: DeviceInfo) => {
  return (
    <span className="flex items-center gap-2">
      <span className="text-emerald-500 font-medium">
        {userIP}@{deviceInfo.browser}-{deviceInfo.device}
      </span>
      <span className="text-muted-foreground/50">:</span>
      <span className="text-blue-500 font-medium text-sm">~</span>
      <span className="text-muted-foreground/50">$</span>
    </span>
  )
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
            historyIndex === -1
              ? commandHistory.length - 1
              : Math.max(0, historyIndex - 1)
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
        // Simple autocomplete for commands
        const availableCommands = Object.keys(
          getAvailableCommands(() => {}, 'home'),
        )
        const matches = availableCommands.filter((cmd) =>
          cmd.startsWith(currentInput.toLowerCase()),
        )
        if (matches.length === 1) {
          setCurrentInput(matches[0])
        }
      }
    }

    return (
      <div className="p-4 pt-2 flex-shrink-0">
        <div className="flex items-center gap-2 font-mono">
          {getPrompt(userIP, deviceInfo)}
          <div className="flex-1 flex items-center ml-2">
            <input
              ref={ref}
              type="text"
              value={currentInput}
              onChange={(e) => !disabled && setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`bg-transparent border-none outline-none flex-1 font-mono placeholder-muted-foreground/50 ${
                disabled ? 'text-muted-foreground/50' : 'text-foreground'
              }`}
              placeholder={disabled ? 'Initializing...' : ''}
              autoComplete="off"
              spellCheck="false"
              disabled={disabled}
            />
            <span
              className={`w-1.5 h-4 ml-1 rounded-sm ${
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
