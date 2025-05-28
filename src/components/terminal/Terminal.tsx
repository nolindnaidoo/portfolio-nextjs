'use client'

import { debug, error, info, warn } from '@/lib'
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
      info('Navigation initiated', {
        component: 'Terminal',
        action: 'navigate',
        metadata: { from: currentContent, to: content },
      })
      setCurrentContent(content)
      onContentChangeAction(content)
    },
    [onContentChangeAction, currentContent],
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

    try {
      debug('Terminal boot sequence started', {
        component: 'Terminal',
        action: 'boot_start',
      })

      const deviceData = getDeviceInfo()
      setDeviceInfo(deviceData)
      const ip = await getUserIP()
      setUserIP(ip)

      info('Terminal boot sequence completed', {
        component: 'Terminal',
        action: 'boot_complete',
        metadata: {
          userIP: ip,
          browser: deviceData.browser,
          device: deviceData.device,
        },
      })

      await addBootLine('boot', 'Initializing boot sequence...', 300)

      setIsBooting(false)
      setShowInput(true)
    } catch (err) {
      error('Terminal boot sequence failed', {
        component: 'Terminal',
        action: 'boot_error',
        metadata: { error: err instanceof Error ? err.message : 'Unknown error' },
      })
      // Continue with fallback values
      setIsBooting(false)
      setShowInput(true)
    }
  }, [addLine])

  const executeCommand = useCallback(
    async (command: string) => {
      const trimmedCommand = command.trim()
      if (!trimmedCommand) return

      debug('Command execution started', {
        component: 'Terminal',
        action: 'command_execute',
        metadata: { command: trimmedCommand },
      })

      addToCommandHistory(trimmedCommand)
      addLine('command', `$ ${trimmedCommand}`)

      const commandKey = trimmedCommand.toLowerCase()

      // Brief delay for realistic terminal feel
      await new Promise((resolve) => setTimeout(resolve, 100))

      if (commandKey === 'clear') {
        info('Terminal cleared', {
          component: 'Terminal',
          action: 'clear',
        })
        clearLines()
      } else {
        const availableCommands = getAvailableCommands(handleContentChange, currentContent)

        if (availableCommands[commandKey as keyof typeof availableCommands]) {
          info('Command executed successfully', {
            component: 'Terminal',
            action: 'command_success',
            metadata: {
              command: trimmedCommand,
              category: availableCommands[commandKey as keyof typeof availableCommands].category,
            },
          })
          const result = availableCommands[commandKey as keyof typeof availableCommands].execute()
          result.forEach((line: string) => addLine('output', line))
        } else {
          warn('Unknown command attempted', {
            component: 'Terminal',
            action: 'command_not_found',
            metadata: { command: trimmedCommand },
          })
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
    warn('Terminal initialization failed - missing required prop', {
      component: 'Terminal',
      action: 'initialization',
      metadata: { missingProp: 'onContentChangeAction' },
    })
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
