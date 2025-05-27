export interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'boot' | 'warning' | 'success'
  content: string
  timestamp: Date
}

export type LeftPanelContent = 'home'

export interface DeviceInfo {
  browser: string
  device: string
  userAgent: string
}

export interface Command {
  description: string
  execute: () => string[]
  category: 'system' | 'navigation' | 'hidden'
}

export interface TerminalState {
  lines: TerminalLine[]
  currentInput: string
  commandHistory: string[]
  historyIndex: number
  isTyping: boolean
  currentContent: LeftPanelContent
  userIP: string
  deviceInfo: DeviceInfo
  isBooting: boolean
  showInput: boolean
}

export interface BootSequenceCallbacks {
  addLine: (type: TerminalLine['type'], content: string) => void
  setIsBooting: (value: boolean) => void
  setShowInput: (value: boolean) => void
  setUserIP: (value: string) => void
  setDeviceInfo: (value: DeviceInfo) => void
}

export interface CommandExecutionCallbacks {
  addLine: (type: TerminalLine['type'], content: string) => void
  clearLines: () => void
  handleContentChange: (content: LeftPanelContent) => void
  currentContent: LeftPanelContent
  setIsTyping: (value: boolean) => void
}
