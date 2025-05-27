import { useCallback, useState } from 'react'
import type { DeviceInfo, LeftPanelContent, TerminalLine } from '../types'

export const useTerminalState = (
  onContentChangeAction: (content: LeftPanelContent) => void,
) => {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
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

  return {
    // State
    lines,
    currentInput,
    commandHistory,
    historyIndex,
    isTyping,
    currentContent,
    userIP,
    deviceInfo,
    isBooting,
    showInput,

    // Setters
    setCurrentInput,
    setHistoryIndex,
    setIsTyping,
    setUserIP,
    setDeviceInfo,
    setIsBooting,
    setShowInput,

    // Actions
    addLine,
    clearLines,
    handleContentChange,
    addToCommandHistory,
  }
}
