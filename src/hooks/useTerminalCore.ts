import type { TerminalLine } from '@/components/terminal/TerminalOutput'
import { useCallback, useState } from 'react'

export function useTerminalCore() {
  const [lines, setLines] = useState<TerminalLine[]>([])

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

  return {
    lines,
    addLine,
    clearLines,
  }
}
