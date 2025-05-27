'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { getAvailableCommands, type LeftPanelContent } from './commands'
import { TerminalFooter } from './TerminalFooter'
import { TerminalHeader } from './TerminalHeader'
import { TerminalInput } from './TerminalInput'
import {
  getDeviceInfo,
  getUserIP,
  TerminalOutput,
  type DeviceInfo,
  type TerminalLine,
} from './TerminalOutput'

const TERMINAL_CONFIG = {
  ARIA_LABEL: 'Interactive terminal interface',
  CONTAINER_CLASSES: 'flex flex-col h-full',
} as const

interface TerminalSectionProps {
  onContentChangeAction: (content: LeftPanelContent) => void
}

export default function TerminalSection({ onContentChangeAction }: TerminalSectionProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentContent, setCurrentContent] = useState<LeftPanelContent>('home')
  const [userIP, setUserIP] = useState<string>('visitor')
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    browser: 'unknown',
    device: 'unknown',
    userAgent: 'unknown',
  })
  const [isBooting, setIsBooting] = useState(true)
  const [showInput, setShowInput] = useState(false)

  const addLine = useCallback((type: TerminalLine['type'], content: string) => {
    const newLine: TerminalLine = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content,
      timestamp: new Date(),
    }
    setLines((prev) => [...prev, newLine])
  }, [])

  const clearLines = useCallback(() => {
    setLines([])
  }, [])

  const handleContentChange = useCallback(
    (content: LeftPanelContent) => {
      setCurrentContent(content)
      onContentChangeAction(content)
    },
    [onContentChangeAction],
  )

  const addToCommandHistory = useCallback((command: string) => {
    setCommandHistory((prev) => [...prev, command])
    setHistoryIndex(-1)
  }, [])

  const runBootSequence = useCallback(async () => {
    const addBootLine = (type: TerminalLine['type'], content: string, delay: number = 0) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          addLine(type, content)
          resolve()
        }, delay)
      })
    }

    const deviceData = getDeviceInfo()
    setDeviceInfo(deviceData)
    const ip = await getUserIP()
    setUserIP(ip)

    await addBootLine('boot', 'Initializing boot sequence...', 300)

    setIsBooting(false)
    setShowInput(true)
  }, [addLine])

  const executeCommand = useCallback(
    async (command: string) => {
      const trimmedCommand = command.trim()
      if (!trimmedCommand) return

      addToCommandHistory(trimmedCommand)
      addLine('command', `$ ${trimmedCommand}`)

      const commandKey = trimmedCommand.toLowerCase()

      // Brief delay for realistic terminal feel
      await new Promise((resolve) => setTimeout(resolve, 100))

      if (commandKey === 'clear') {
        clearLines()
      } else {
        const availableCommands = getAvailableCommands(handleContentChange, currentContent)

        if (availableCommands[commandKey as keyof typeof availableCommands]) {
          const result = availableCommands[commandKey as keyof typeof availableCommands].execute()
          result.forEach((line: string) => addLine('output', line))
        } else {
          addLine(
            'error',
            `Command not found: ${trimmedCommand}. Type "help" for available commands.`,
          )
        }
      }
    },
    [addLine, clearLines, handleContentChange, currentContent, addToCommandHistory],
  )

  const handleTerminalClick = () => {
    if (inputRef.current && showInput) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    if (inputRef.current && showInput) {
      inputRef.current.focus()
    }
  }, [showInput])

  useEffect(() => {
    runBootSequence()
  }, [runBootSequence])

  // Auto-scroll to show latest output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  if (!onContentChangeAction) {
    console.warn('TerminalSection: onContentChangeAction is required')
    return (
      <section
        className={TERMINAL_CONFIG.CONTAINER_CLASSES}
        aria-label={TERMINAL_CONFIG.ARIA_LABEL}
      >
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Terminal unavailable - missing content handler
        </div>
      </section>
    )
  }

  return (
    <section className={TERMINAL_CONFIG.CONTAINER_CLASSES} aria-label={TERMINAL_CONFIG.ARIA_LABEL}>
      <TerminalHeader isBooting={isBooting} />

      <TerminalOutput
        ref={terminalRef}
        lines={lines}
        userIP={userIP}
        deviceInfo={deviceInfo}
        onClick={handleTerminalClick}
      />

      <TerminalInput
        ref={inputRef}
        currentInput={currentInput}
        setCurrentInput={setCurrentInput}
        commandHistory={commandHistory}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
        executeCommand={executeCommand}
        userIP={userIP}
        deviceInfo={deviceInfo}
        disabled={!showInput}
      />

      <TerminalFooter />
    </section>
  )
}
