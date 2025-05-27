import { useCallback } from 'react'
import { getAvailableCommands } from '../commands'
import type { CommandExecutionCallbacks } from '../types'

export const useCommandExecution = (
  callbacks: CommandExecutionCallbacks & {
    addToCommandHistory: (command: string) => void
  },
) => {
  const {
    addLine,
    clearLines,
    handleContentChange,
    currentContent,
    setIsTyping,
    addToCommandHistory,
  } = callbacks

  const executeCommand = useCallback(
    async (command: string) => {
      const trimmedCommand = command.trim()
      if (!trimmedCommand) return

      // Add command to history
      addToCommandHistory(trimmedCommand)

      // Add command line to terminal
      addLine('command', `$ ${trimmedCommand}`)

      // Parse command - check for exact match first, then single word
      const commandKey = trimmedCommand.toLowerCase()

      setIsTyping(true)

      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, 100))

      if (commandKey === 'clear') {
        clearLines()
      } else {
        const availableCommands = getAvailableCommands(
          handleContentChange,
          currentContent,
        )

        if (availableCommands[commandKey as keyof typeof availableCommands]) {
          const result =
            availableCommands[
              commandKey as keyof typeof availableCommands
            ].execute()
          result.forEach((line: string) => addLine('output', line))
        } else {
          addLine(
            'error',
            `Command not found: ${trimmedCommand}. Type "help" for available commands.`,
          )
        }
      }

      setIsTyping(false)
    },
    [
      addLine,
      clearLines,
      handleContentChange,
      currentContent,
      setIsTyping,
      addToCommandHistory,
    ],
  )

  return { executeCommand }
}
