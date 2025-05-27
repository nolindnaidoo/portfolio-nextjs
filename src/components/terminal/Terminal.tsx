'use client'

import { useEffect, useRef } from 'react'
import { TerminalFooter } from './TerminalFooter'
import { TerminalHeader } from './TerminalHeader'

import { useBootSequence } from './hooks/useBootSequence'
import { useCommandExecution } from './hooks/useCommandExecution'
import { useTerminalState } from './hooks/useTerminalState'
import { TerminalInput } from './TerminalInput'
import { TerminalOutput } from './TerminalOutput'
import type { LeftPanelContent } from './types'

interface TerminalSectionProps {
  onContentChangeAction: (content: LeftPanelContent) => void
}

export default function TerminalSection({
  onContentChangeAction,
}: TerminalSectionProps) {
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const {
    lines,
    currentInput,
    setCurrentInput,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    setIsTyping,
    currentContent,
    userIP,
    setUserIP,
    deviceInfo,
    setDeviceInfo,
    isBooting,
    setIsBooting,
    showInput,
    setShowInput,
    addLine,
    clearLines,
    handleContentChange,
    addToCommandHistory,
  } = useTerminalState(onContentChangeAction)

  const { runBootSequence } = useBootSequence({
    addLine,
    setIsBooting,
    setShowInput,
    setUserIP,
    setDeviceInfo,
  })

  const { executeCommand } = useCommandExecution({
    addLine,
    clearLines,
    handleContentChange,
    currentContent,
    setIsTyping,
    addToCommandHistory,
  })

  // Auto-focus input when component mounts and boot is complete
  useEffect(() => {
    if (inputRef.current && showInput) {
      inputRef.current.focus()
    }
  }, [showInput])

  // Start boot sequence on component mount
  useEffect(() => {
    runBootSequence()
  }, [runBootSequence])

  // Scroll to bottom when new lines are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  // Handle clicking anywhere in terminal to focus input
  const handleTerminalClick = () => {
    if (inputRef.current && showInput) {
      inputRef.current.focus()
    }
  }

  return (
    <section
      className="flex flex-col h-full"
      aria-label="Interactive terminal interface"
    >
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
