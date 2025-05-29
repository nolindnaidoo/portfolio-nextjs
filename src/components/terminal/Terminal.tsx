'use client'

import {
  TerminalFooter,
  TerminalHeader,
  TerminalInput,
  TerminalOutput,
} from '@/components/terminal'
import { useCommandProcessor, useSystemInfo, useTerminalCore, useTerminalUI } from '@/hooks'
import { info } from '@/lib'
import { useEffect, useRef } from 'react'

export default function TerminalSection() {
  // Separated concerns via custom hooks
  const { lines, addLine, clearLines } = useTerminalCore()
  const systemInfo = useSystemInfo()
  const terminalUI = useTerminalUI()

  // Track if boot sequence has run to prevent duplicates
  const bootSequenceRun = useRef(false)

  const commandProcessor = useCommandProcessor({
    onAddLine: addLine,
    onClearLines: clearLines,
  })

  // Stable boot sequence - runs only once when system is ready
  useEffect(() => {
    if (
      systemInfo.deviceInfo.browser &&
      systemInfo.deviceInfo.device &&
      systemInfo.userIP &&
      !systemInfo.isBooting &&
      !bootSequenceRun.current
    ) {
      bootSequenceRun.current = true

      const bootLines = [
        'Initializing Nolin Naidoo Portfolio Terminal...',
        '',
        `Browser: ${systemInfo.deviceInfo.browser}`,
        `Device: ${systemInfo.deviceInfo.device}`,
        `IP: ${systemInfo.userIP}`,
        '',
        'Boot sequence complete. Type "help" for available commands.',
        '',
      ]

      bootLines.forEach((line, index) => {
        setTimeout(() => {
          addLine('boot', line)
          if (index === bootLines.length - 1) {
            terminalUI.setShowInput(true)
            info('Terminal boot sequence completed', {
              component: 'TerminalSection',
              action: 'boot_complete',
            })
          }
        }, index * 100)
      })
    }
  }, [
    systemInfo.deviceInfo.browser,
    systemInfo.deviceInfo.device,
    systemInfo.userIP,
    systemInfo.isBooting,
    addLine,
    terminalUI,
  ])

  return (
    <section className="flex flex-col h-full" aria-label="Interactive terminal interface">
      <TerminalHeader isBooting={systemInfo.isBooting} />

      <TerminalOutput
        ref={terminalUI.terminalRef}
        lines={lines}
        userIP={systemInfo.userIP}
        deviceInfo={systemInfo.deviceInfo}
        onClick={terminalUI.handleTerminalClick}
      />

      <TerminalInput
        ref={terminalUI.inputRef}
        currentInput={terminalUI.currentInput}
        setCurrentInput={terminalUI.setCurrentInput}
        commandHistory={commandProcessor.commandHistory}
        historyIndex={commandProcessor.historyIndex}
        setHistoryIndex={commandProcessor.setHistoryIndex}
        executeCommand={commandProcessor.executeCommand}
        userIP={systemInfo.userIP}
        deviceInfo={systemInfo.deviceInfo}
        disabled={!terminalUI.showInput}
      />

      <TerminalFooter />
    </section>
  )
}
