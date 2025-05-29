import { useCallback, useEffect, useRef, useState } from 'react'

export function useTerminalUI() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentInput, setCurrentInput] = useState('')
  const [showInput, setShowInput] = useState(false)

  const handleTerminalClick = useCallback(() => {
    if (inputRef.current && showInput) {
      inputRef.current.focus()
    }
  }, [showInput])

  const focusInput = useCallback(() => {
    if (inputRef.current && showInput) {
      inputRef.current.focus()
    }
  }, [showInput])

  // Auto-focus input when it becomes available
  useEffect(() => {
    focusInput()
  }, [focusInput])

  // Auto-scroll to show latest output
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  return {
    terminalRef,
    inputRef,
    currentInput,
    setCurrentInput,
    showInput,
    setShowInput,
    handleTerminalClick,
    focusInput,
    scrollToBottom,
  }
}
