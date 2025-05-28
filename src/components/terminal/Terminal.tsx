'use client'

import { useCommandProcessor, useSystemInfo, useTerminalCore, useTerminalUI } from '@/hooks'
import { debug } from '@/lib'
import { useEffect } from 'react'
import { TerminalFooter } from './TerminalFooter'
import { TerminalHeader } from './TerminalHeader'
import { TerminalInput } from './TerminalInput'
import { TerminalOutput } from './TerminalOutput'

const TERMINAL_CONFIG = {
  ARIA_LABEL: 'Interactive terminal interface',
  CONTAINER_CLASSES: 'flex flex-col h-full',
} as const

export default function TerminalSection() {
  // Separated concerns via custom hooks
  const terminalCore = useTerminalCore()
  const systemInfo = useSystemInfo()
  const terminalUI = useTerminalUI()

  const commandProcessor = useCommandProcessor({
    onAddLine: terminalCore.addLine,
    onClearLines: terminalCore.clearLines,
  })

  // Log terminal initialization only once
  useEffect(() => {
    debug('Terminal initialized with separated concerns', {
      component: 'Terminal',
      action: 'initialize',
    })
  }, [])

  // Show input when system finishes booting
  useEffect(() => {
    if (!systemInfo.isBooting) {
      terminalUI.setShowInput(true)
    }
  }, [systemInfo.isBooting, terminalUI.setShowInput])

  // Auto-scroll when new lines are added
  useEffect(() => {
    terminalUI.scrollToBottom()
  }, [terminalCore.lines, terminalUI.scrollToBottom])

  // Add boot line when system info is ready
  useEffect(() => {
    if (!systemInfo.isBooting && terminalCore.lines.length === 0) {
      terminalCore.addLine('boot', 'System initialized successfully.')
    }
  }, [systemInfo.isBooting, terminalCore.lines.length, terminalCore.addLine])

  return (
    <section className={TERMINAL_CONFIG.CONTAINER_CLASSES} aria-label={TERMINAL_CONFIG.ARIA_LABEL}>
      <TerminalHeader isBooting={systemInfo.isBooting} />

      <TerminalOutput
        ref={terminalUI.terminalRef}
        lines={terminalCore.lines}
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
