import { getAvailableCommands } from '@/components/terminal/commands'
import { useNavigation } from '@/contexts/NavigationContext'
import { debug, info, warn } from '@/lib'
import { useCallback, useState } from 'react'

interface UseCommandProcessorProps {
  onAddLine: (type: 'command' | 'output' | 'error', content: string) => void
  onClearLines: () => void
}

export function useCommandProcessor({ onAddLine, onClearLines }: UseCommandProcessorProps) {
  const { navigateTo, currentContent } = useNavigation()
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const addToHistory = useCallback((command: string) => {
    setCommandHistory((prev) => [...prev, command])
    setHistoryIndex(-1)
  }, [])

  const executeCommand = useCallback(
    async (command: string) => {
      const trimmedCommand = command.trim()
      if (!trimmedCommand) return

      debug('Command execution started', {
        component: 'useCommandProcessor',
        action: 'command_execute',
        metadata: { command: trimmedCommand },
      })

      addToHistory(trimmedCommand)
      onAddLine('command', `$ ${trimmedCommand}`)

      const commandKey = trimmedCommand.toLowerCase()

      // Brief delay for realistic terminal feel
      await new Promise((resolve) => setTimeout(resolve, 100))

      if (commandKey === 'clear') {
        info('Terminal cleared', {
          component: 'useCommandProcessor',
          action: 'clear',
        })
        onClearLines()
      } else {
        const availableCommands = getAvailableCommands(navigateTo, currentContent)

        if (availableCommands[commandKey as keyof typeof availableCommands]) {
          info('Command executed successfully', {
            component: 'useCommandProcessor',
            action: 'command_success',
            metadata: {
              command: trimmedCommand,
              category: availableCommands[commandKey as keyof typeof availableCommands].category,
            },
          })
          const result = availableCommands[commandKey as keyof typeof availableCommands].execute()
          result.forEach((line: string) => onAddLine('output', line))
        } else {
          warn('Unknown command attempted', {
            component: 'useCommandProcessor',
            action: 'command_not_found',
            metadata: { command: trimmedCommand },
          })
          onAddLine(
            'error',
            `Command not found: ${trimmedCommand}. Type "help" for available commands.`,
          )
        }
      }
    },
    [onAddLine, onClearLines, navigateTo, currentContent, addToHistory],
  )

  return {
    commandHistory,
    historyIndex,
    setHistoryIndex,
    executeCommand,
    addToHistory,
  }
}
