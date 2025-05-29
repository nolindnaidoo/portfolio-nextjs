# Hooks

Custom React hooks for terminal functionality and system interaction.

## 🎯 Quick Decision

**Building a terminal?**

```
├─ Need basic state? → useTerminalCore
├─ Need commands? → useCommandProcessor
├─ Need UI focus? → useTerminalUI
└─ Need system info? → useSystemInfo
```

## 🚀 Quick Start

```tsx
import { useCommandProcessor, useSystemInfo, useTerminalCore, useTerminalUI } from '@/hooks'

// Most common pattern
function Terminal() {
  const { lines, addLine, clearLines } = useTerminalCore()
  const { executeCommand } = useCommandProcessor({ onAddLine: addLine, onClearLines: clearLines })
  const { inputRef, currentInput, setCurrentInput } = useTerminalUI()

  return <div>{/* Your terminal UI */}</div>
}
```

## 📊 Hook Overview

| Hook                    | Purpose                            | Key Returns                                |
| ----------------------- | ---------------------------------- | ------------------------------------------ |
| **useTerminalCore**     | Manage terminal lines & state      | `lines`, `addLine`, `clearLines`           |
| **useCommandProcessor** | Handle command execution & history | `executeCommand`, `commandHistory`         |
| **useTerminalUI**       | Handle UI interactions & focus     | `inputRef`, `focusInput`, `scrollToBottom` |
| **useSystemInfo**       | Detect device info & user IP       | `userIP`, `deviceInfo`, `isBooting`        |

---

## 📋 Common Patterns

### Minimal Terminal (Read-only)

```tsx
function BasicTerminal() {
  const { lines, addLine } = useTerminalCore()

  useEffect(() => {
    addLine('output', 'Welcome to the terminal!')
  }, [])

  return (
    <div>
      {lines.map((line) => (
        <div key={line.id}>{line.content}</div>
      ))}
    </div>
  )
}
```

### Interactive Terminal

```tsx
function InteractiveTerminal() {
  const { lines, addLine, clearLines } = useTerminalCore()
  const { executeCommand } = useCommandProcessor({
    onAddLine: addLine,
    onClearLines: clearLines,
  })
  const { inputRef, currentInput, setCurrentInput, focusInput } = useTerminalUI()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await executeCommand(currentInput)
    setCurrentInput('')
  }

  return (
    <div onClick={focusInput}>
      {lines.map((line) => (
        <div key={line.id}>{line.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
        />
      </form>
    </div>
  )
}
```

### System-Aware Terminal

```tsx
function SystemTerminal() {
  const { userIP, deviceInfo, isBooting } = useSystemInfo()
  const { addLine } = useTerminalCore()

  useEffect(() => {
    if (!isBooting) {
      addLine('output', `Welcome ${userIP}`)
      addLine('output', `Device: ${deviceInfo.device}`)
    }
  }, [isBooting, userIP, deviceInfo])

  if (isBooting) return <div>Loading system info...</div>

  return <div>{/* Terminal content */}</div>
}
```

---

## 🔧 Complete Examples

### Full Terminal Implementation

```tsx
import { useCommandProcessor, useSystemInfo, useTerminalCore, useTerminalUI } from '@/hooks'

function Terminal() {
  // Core state management
  const { lines, addLine, clearLines } = useTerminalCore()

  // System information
  const { userIP, deviceInfo, isBooting } = useSystemInfo()

  // Command processing
  const { executeCommand, commandHistory } = useCommandProcessor({
    onAddLine: addLine,
    onClearLines: clearLines,
  })

  // UI management
  const {
    terminalRef,
    inputRef,
    currentInput,
    setCurrentInput,
    showInput,
    setShowInput,
    handleTerminalClick,
    scrollToBottom,
  } = useTerminalUI()

  // Boot sequence
  useEffect(() => {
    if (!isBooting) {
      addLine('output', `Welcome ${userIP}`)
      addLine('output', `Device: ${deviceInfo.device}`)
      addLine('output', `Browser: ${deviceInfo.browser}`)
      setShowInput(true)
    }
  }, [isBooting, userIP, deviceInfo])

  // Auto-scroll on new lines
  useEffect(() => {
    scrollToBottom()
  }, [lines, scrollToBottom])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!currentInput.trim()) return

    await executeCommand(currentInput)
    setCurrentInput('')
  }

  return (
    <div ref={terminalRef} onClick={handleTerminalClick}>
      {lines.map((line) => (
        <div key={line.id} className={`terminal-line ${line.type}`}>
          {line.content}
        </div>
      ))}

      {showInput && (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder="Type a command..."
          />
        </form>
      )}
    </div>
  )
}
```

### Command History Navigation

```tsx
function TerminalWithHistory() {
  const { commandHistory, historyIndex, setHistoryIndex } = useCommandProcessor({
    onAddLine: addLine,
    onClearLines: clearLines,
  })
  const { currentInput, setCurrentInput } = useTerminalUI()

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1)
      setHistoryIndex(newIndex)
      setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(newIndex)
      setCurrentInput(newIndex === -1 ? '' : commandHistory[commandHistory.length - 1 - newIndex])
    }
  }

  return (
    <input
      onKeyDown={handleKeyDown}
      value={currentInput}
      onChange={(e) => setCurrentInput(e.target.value)}
    />
  )
}
```

### Custom Commands

```tsx
function ExtendedTerminal() {
  const { executeCommand } = useCommandProcessor({
    onAddLine: addLine,
    onClearLines: clearLines,
  })

  const handleCustomCommand = async (command: string) => {
    if (command.startsWith('custom:')) {
      const action = command.substring(7)
      addLine('output', `Executing custom action: ${action}`)

      switch (action) {
        case 'status':
          addLine('output', 'All systems operational')
          break
        case 'theme':
          addLine('output', 'Theme toggle not implemented')
          break
        default:
          addLine('error', `Unknown custom action: ${action}`)
      }
    } else {
      await executeCommand(command)
    }
  }

  return <div>{/* Terminal with custom commands */}</div>
}
```

---

## 🎯 Advanced Patterns

### Hook Composition Strategy

```tsx
// Layer 1: Core data
const terminalCore = useTerminalCore()

// Layer 2: System information
const systemInfo = useSystemInfo()

// Layer 3: Command processing
const commandProcessor = useCommandProcessor({
  onAddLine: terminalCore.addLine,
  onClearLines: terminalCore.clearLines,
})

// Layer 4: UI interactions
const terminalUI = useTerminalUI()
```

### Performance Optimization

```tsx
// Memoize callbacks to prevent unnecessary re-renders
const memoizedAddLine = useCallback((type, content) => addLine(type, content), [addLine])

const { executeCommand } = useCommandProcessor({
  onAddLine: memoizedAddLine,
  onClearLines: clearLines,
})
```

### Responsive Behavior

```tsx
function ResponsiveTerminal() {
  const { focusInput } = useTerminalUI()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-focus on desktop only
  useEffect(() => {
    if (!isMobile) focusInput()
  }, [isMobile, focusInput])

  return (
    <div className={isMobile ? 'terminal-mobile' : 'terminal-desktop'}>
      {isMobile && <button onClick={focusInput}>Tap to focus input</button>}
    </div>
  )
}
```

---

## 📦 Complete API Reference

### useTerminalCore

```tsx
const {
  lines: TerminalLine[],
  addLine: (type: 'command' | 'output' | 'error', content: string) => void,
  clearLines: () => void,
} = useTerminalCore()
```

### useCommandProcessor

```tsx
const {
  commandHistory: string[],
  historyIndex: number,
  setHistoryIndex: (index: number) => void,
  executeCommand: (command: string) => Promise<void>,
  addToHistory: (command: string) => void,
} = useCommandProcessor({
  onAddLine: (type, content) => void,
  onClearLines: () => void,
})
```

### useTerminalUI

```tsx
const {
  terminalRef: RefObject<HTMLDivElement>,
  inputRef: RefObject<HTMLInputElement>,
  currentInput: string,
  setCurrentInput: (value: string) => void,
  showInput: boolean,
  setShowInput: (show: boolean) => void,
  handleTerminalClick: () => void,
  focusInput: () => void,
  scrollToBottom: () => void,
} = useTerminalUI()
```

### useSystemInfo

```tsx
const {
  userIP: string,
  deviceInfo: { browser: string, device: string, userAgent: string },
  isBooting: boolean,
} = useSystemInfo()
```

## 🚨 Common Mistakes

```tsx
// ❌ Wrong - Missing required callbacks
const { executeCommand } = useCommandProcessor()

// ❌ Wrong - Not handling async loading
const { userIP } = useSystemInfo()
console.log(userIP) // Might be initial value while loading

// ✅ Right - Proper setup
const { executeCommand } = useCommandProcessor({
  onAddLine: addLine,
  onClearLines: clearLines,
})

// ✅ Right - Check loading state
const { userIP, isBooting } = useSystemInfo()
if (!isBooting) {
  console.log(userIP) // Safe to use
}
```

## 💡 Usage Guidelines

**Hook Dependencies:**

- `useTerminalCore` → Standalone (no dependencies)
- `useCommandProcessor` → Requires callbacks
- `useTerminalUI` → Standalone (manages refs/state)
- `useSystemInfo` → Standalone (async data loading)

**Typical Flow:**

1. User types → `useTerminalUI` handles input
2. User submits → `useCommandProcessor` executes
3. Results display → `useTerminalCore` manages lines
4. Auto-scroll → `useTerminalUI` handles focus

All hooks integrate with the logging system for debugging and error tracking.
