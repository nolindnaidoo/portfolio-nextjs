# Terminal Components

Interactive terminal interface with realistic command execution, device detection, and smooth animations.

## 🎯 Quick Decision

**Need terminal functionality?**

```
├─ Complete terminal interface? → Terminal (main component)
├─ Custom command output? → TerminalOutput
├─ Custom input handling? → TerminalInput
├─ Terminal header/footer? → TerminalHeader/TerminalFooter
└─ Add custom commands? → commands.ts
```

## 🚀 Quick Start

```tsx
import Terminal from '@/components/terminal'

// Basic terminal interface
function Portfolio() {
  return (
    <div className="h-screen">
      <Terminal />
    </div>
  )
}
```

## 📊 Component Overview

| Component          | Purpose                 | Key Features                          |
| ------------------ | ----------------------- | ------------------------------------- |
| **Terminal**       | Main terminal interface | Boot sequence, command processing     |
| **TerminalOutput** | Display terminal output | Syntax highlighting, device detection |
| **TerminalInput**  | Handle user input       | History, autocomplete, keyboard nav   |
| **TerminalHeader** | Terminal header section | Title, theme toggle                   |
| **TerminalFooter** | Help text section       | Usage instructions                    |

---

## 📋 Common Patterns

### Basic Terminal

```tsx
import Terminal from '@/components/terminal'

// Full terminal with all features
;<Terminal />
```

### Available Commands

```tsx
// System commands
help        // Show available commands
clear       // Clear terminal screen
whoami      // Display user information
status      // Show system status
ls          // List available sections
pwd         // Print current directory

// Navigation commands
home        // Navigate to home section
about       // Navigate to about section
projects    // Navigate to projects section
skills      // Navigate to skills section
contact     // Navigate to contact section
back        // Return to home section

// Hidden commands (try these!)
sudo        // Permission denied
exit        // Permission denied
cd ..       // Navigate back
```

### Keyboard Navigation

```tsx
// Terminal supports these keyboard shortcuts:
↑ / ↓       // Navigate command history
Tab         // Autocomplete command names
Enter       // Execute command
Ctrl+C      // Interrupt (visual feedback)
Ctrl+L      // Clear screen (same as 'clear')
```

---

## 🔧 Real-World Examples

### Portfolio Integration

```tsx
import Terminal from '@/components/terminal'
import { NavigationProvider } from '@/contexts/NavigationContext'

function PortfolioApp() {
  return (
    <NavigationProvider initialContent="home">
      <div className="grid md:grid-cols-2 h-screen">
        <div className="portfolio-content">
          <MainContent />
        </div>
        <div className="terminal-panel">
          <Terminal />
        </div>
      </div>
    </NavigationProvider>
  )
}
```

### Custom Terminal Output

```tsx
import { TerminalOutput } from '@/components/terminal'
import { useSystemInfo, useTerminalCore } from '@/hooks'

function CustomTerminal() {
  const { lines, addLine } = useTerminalCore()
  const { userIP, deviceInfo } = useSystemInfo()

  // Add custom output
  const addCustomOutput = () => {
    addLine('output', 'Custom terminal output')
    addLine('success', '✅ Operation completed')
    addLine('error', '❌ Something went wrong')
  }

  return (
    <div className="terminal-container">
      <TerminalOutput
        lines={lines}
        userIP={userIP}
        deviceInfo={deviceInfo}
        onClick={() => console.log('Terminal clicked')}
      />
      <button onClick={addCustomOutput}>Add Output</button>
    </div>
  )
}
```

### Command Line Interface Pattern

```tsx
import { TerminalInput } from '@/components/terminal'
import { useCommandProcessor, useSystemInfo } from '@/hooks'

function CLIInterface() {
  const { userIP, deviceInfo } = useSystemInfo()
  const commandProcessor = useCommandProcessor({
    onAddLine: (type, content) => console.log(`${type}: ${content}`),
    onClearLines: () => console.log('Clearing terminal'),
  })

  return (
    <div className="cli-interface">
      <div className="terminal-prompt">
        visitor@{deviceInfo.browser}-{deviceInfo.device}:~$
      </div>
      <TerminalInput
        currentInput={commandProcessor.currentInput}
        setCurrentInput={commandProcessor.setCurrentInput}
        commandHistory={commandProcessor.commandHistory}
        historyIndex={commandProcessor.historyIndex}
        setHistoryIndex={commandProcessor.setHistoryIndex}
        executeCommand={commandProcessor.executeCommand}
        userIP={userIP}
        deviceInfo={deviceInfo}
        disabled={false}
      />
    </div>
  )
}
```

### Terminal with Custom Commands

```tsx
import { getAvailableCommands, type Command } from '@/components/terminal/commands'

function TerminalWithCustomCommands() {
  const handleNavigation = (content: LeftPanelContent) => {
    console.log(`Navigating to: ${content}`)
  }

  // Get available commands
  const commands = getAvailableCommands(handleNavigation, 'home')

  // Add custom command
  const customCommands: Record<string, Command> = {
    ...commands,
    custom: {
      description: 'Execute custom function',
      category: 'system',
      execute: () => ['Custom command executed!', 'This is a custom response.'],
    },
  }

  return <Terminal /* with custom commands */ />
}
```

### Boot Sequence Customization

```tsx
import { useTerminalCore, useSystemInfo } from '@/hooks'
import { useEffect } from 'react'

function CustomBootTerminal() {
  const { addLine, clearLines } = useTerminalCore()
  const { deviceInfo, userIP, isBooting } = useSystemInfo()

  useEffect(() => {
    if (!isBooting && deviceInfo.browser && userIP) {
      // Custom boot sequence
      const bootMessages = [
        '🚀 Custom Portfolio Terminal v2.0',
        '🔐 Establishing secure connection...',
        `🌐 Connected from ${userIP}`,
        `💻 Running on ${deviceInfo.browser}/${deviceInfo.device}`,
        '✅ All systems operational',
        '',
        'Welcome to the enhanced terminal experience!',
        'Type "help" to see available commands.',
      ]

      bootMessages.forEach((message, index) => {
        setTimeout(() => addLine('boot', message), index * 150)
      })
    }
  }, [isBooting, deviceInfo, userIP, addLine])

  return <Terminal />
}
```

---

## 🎯 Advanced Patterns

### Command Output Formatting

```tsx
import { TerminalOutput } from '@/components/terminal'

// Advanced output formatting
const formatAdvancedOutput = (data: any[]): TerminalLine[] => {
  return [
    { id: '1', type: 'output', content: '📊 System Report', timestamp: new Date() },
    { id: '2', type: 'success', content: '├─ Status: ✅ ONLINE', timestamp: new Date() },
    { id: '3', type: 'warning', content: '├─ Memory: ⚠️  85% used', timestamp: new Date() },
    { id: '4', type: 'error', content: '└─ Errors: ❌ 2 found', timestamp: new Date() },
  ]
}

function AdvancedTerminalOutput() {
  const [lines, setLines] = useState<TerminalLine[]>([])

  const generateReport = () => {
    const reportLines = formatAdvancedOutput([])
    setLines((prev) => [...prev, ...reportLines])
  }

  return (
    <div>
      <TerminalOutput lines={lines} />
      <button onClick={generateReport}>Generate Report</button>
    </div>
  )
}
```

### Real-time Command Execution

```tsx
import { useTerminalCore } from '@/hooks'

function RealTimeTerminal() {
  const { lines, addLine } = useTerminalCore()

  const executeAsyncCommand = async (command: string) => {
    addLine('command', `$ ${command}`)
    addLine('output', 'Executing command...')

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await fetch(`/api/terminal/${command}`)
      const result = await response.json()

      result.output.forEach((line: string) => {
        addLine('output', line)
      })
    } catch (error) {
      addLine('error', `Error: ${error.message}`)
    }
  }

  return <Terminal /* with async command handler */ />
}
```

### Terminal State Persistence

```tsx
import { useTerminalCore } from '@/hooks'
import { useEffect } from 'react'

function PersistentTerminal() {
  const { lines, addLine, clearLines } = useTerminalCore()

  // Save terminal state
  useEffect(() => {
    const terminalState = {
      lines: lines.slice(-100), // Keep last 100 lines
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem('terminal-state', JSON.stringify(terminalState))
  }, [lines])

  // Restore terminal state
  useEffect(() => {
    const saved = localStorage.getItem('terminal-state')
    if (saved) {
      try {
        const { lines: savedLines } = JSON.parse(saved)
        savedLines.forEach((line) => {
          addLine(line.type, line.content)
        })
        addLine('boot', '📂 Terminal session restored')
      } catch (error) {
        addLine('warning', 'Could not restore previous session')
      }
    }
  }, [addLine])

  return <Terminal />
}
```

### Custom Command Categories

```tsx
import { type Command } from '@/components/terminal/commands'

function TerminalWithCustomCategories() {
  const createCustomCommands = (): Record<string, Command> => ({
    // Developer commands
    debug: {
      description: 'Toggle debug mode',
      category: 'developer',
      execute: () => ['Debug mode toggled', 'Use with caution in production'],
    },
    logs: {
      description: 'Show application logs',
      category: 'developer',
      execute: () => [
        '📝 Recent Logs:',
        '[INFO] User navigation to projects',
        '[WARN] Theme change detected',
        '[ERROR] Network timeout on API call',
      ],
    },

    // Analytics commands
    analytics: {
      description: 'Show usage analytics',
      category: 'analytics',
      execute: () => [
        '📈 Usage Analytics:',
        '├─ Page views: 1,234',
        '├─ Terminal sessions: 567',
        '├─ Commands executed: 2,890',
        '└─ Average session: 3.5 minutes',
      ],
    },

    // Fun commands
    joke: {
      description: 'Tell a programming joke',
      category: 'fun',
      execute: () => [
        'Why do programmers prefer dark mode?',
        '',
        'Because light attracts bugs! 🐛',
      ],
    },
  })

  return <Terminal /* with custom command categories */ />
}
```

---

## 📦 Complete API Reference

### Terminal Props

```tsx
// Terminal is the main component with no required props
// Uses hooks internally for state management
interface TerminalProps {
  // Currently no external props - all state managed internally
}
```

### TerminalOutput Props

```tsx
interface TerminalOutputProps {
  lines: TerminalLine[]
  userIP: string
  deviceInfo: DeviceInfo
  onClick: () => void
}
```

### TerminalInput Props

```tsx
interface TerminalInputProps {
  currentInput: string
  setCurrentInput: (value: string) => void
  commandHistory: string[]
  historyIndex: number
  setHistoryIndex: (value: number) => void
  executeCommand: (command: string) => void
  userIP: string
  deviceInfo: DeviceInfo
  disabled?: boolean
}
```

### TerminalHeader Props

```tsx
interface TerminalHeaderProps {
  isBooting: boolean
}
```

### TerminalFooter Props

```tsx
interface TerminalFooterProps {
  // No props - displays static help text
}
```

### Core Types

```tsx
type LeftPanelContent = 'home' | 'about' | 'projects' | 'skills' | 'contact'

interface DeviceInfo {
  browser: string // 'chrome', 'firefox', 'safari', etc.
  device: string // 'macos', 'windows', 'iphone', etc.
  userAgent: string // Full user agent string
}

interface TerminalLine {
  id: string // Unique identifier
  type: 'command' | 'output' | 'error' | 'boot' | 'warning' | 'success' // Line type for styling
  content: string // Line content
  timestamp: Date // When line was created
}

interface Command {
  description: string // Help text description
  execute: () => string[] // Function that returns output lines
  category: 'system' | 'navigation' | 'hidden' // Command category
}
```

### Available Commands

```tsx
// System Commands (shown in help)
'help' // Show available commands with categories
'clear' // Clear terminal screen
'whoami' // Display current user information
'status' // Show system status report
'ls' // List available sections
'pwd' // Print current working directory

// Navigation Commands (shown in help)
'home' // Navigate to home section
'about' // Navigate to about section
'projects' // Navigate to projects section
'skills' // Navigate to skills section
'contact' // Navigate to contact section
'back' // Return to home section

// Hidden Commands (not shown in help)
'sudo' // Permission denied response
'exit' // Permission denied response
'cd ..' // Navigate back to home
'cd' // Show usage message
```

---

## 🚨 Common Mistakes

```tsx
// ❌ Wrong - Not handling device detection state
function BadTerminal() {
  const { deviceInfo } = useSystemInfo()
  return <div>Device: {deviceInfo.browser}</div> // May be empty during detection
}

// ❌ Wrong - Not waiting for boot sequence
function BadTerminalUsage() {
  const { isBooting } = useSystemInfo()
  return (
    <div>
      <TerminalInput disabled={false} /> {/* Should be disabled during boot */}
    </div>
  )
}

// ❌ Wrong - Not handling command execution properly
function BadCommandExecution() {
  const executeCommand = (cmd: string) => {
    // Missing error handling and line addition
    console.log(cmd)
  }
  return <TerminalInput executeCommand={executeCommand} />
}

// ✅ Right - Proper state handling
function GoodTerminal() {
  const { deviceInfo, isBooting } = useSystemInfo()

  if (isBooting || !deviceInfo.browser) {
    return <div>Loading terminal...</div>
  }

  return <Terminal />
}

// ✅ Right - Proper command execution
function GoodTerminalUsage() {
  const { addLine } = useTerminalCore()

  const executeCommand = (cmd: string) => {
    try {
      addLine('command', `$ ${cmd}`)
      // Process command and add output
      addLine('output', 'Command executed successfully')
    } catch (error) {
      addLine('error', `Error: ${error.message}`)
    }
  }

  return <TerminalInput executeCommand={executeCommand} />
}
```

## 💡 Best Practices

**Component composition:**

```tsx
// Use the main Terminal component for complete functionality
<Terminal />

// Or compose individual components for custom implementations
<div className="custom-terminal">
  <TerminalHeader isBooting={false} />
  <TerminalOutput lines={lines} userIP={userIP} deviceInfo={deviceInfo} />
  <TerminalInput {...inputProps} />
  <TerminalFooter />
</div>
```

**Command handling:**

```tsx
// Always handle command execution errors
const executeCommand = useCallback(
  (command: string) => {
    try {
      addLine('command', `$ ${command}`)

      const commands = getAvailableCommands(handleNavigation, currentContent)
      const cmd = commands[command.toLowerCase()]

      if (cmd) {
        const output = cmd.execute()
        output.forEach((line) => addLine('output', line))
      } else {
        addLine('error', `Command not found: ${command}`)
      }
    } catch (error) {
      addLine('error', `Error executing command: ${error.message}`)
    }
  },
  [addLine, handleNavigation, currentContent],
)
```

**Performance considerations:**

- Terminal lines are automatically managed by hooks
- Command history is limited to prevent memory leaks
- Device detection runs once and caches results
- Boot sequence is protected against duplicate execution

**Accessibility:**

- Terminal has proper ARIA labels and roles
- Keyboard navigation is fully supported
- Screen reader friendly with semantic HTML
- Focus management handles input/output areas correctly

**Styling customization:**

- Use terminal constants for consistent styling
- Leverage CSS custom properties for theming
- Maintain terminal aesthetic with monospace fonts
- Use semantic color coding for different output types

**Integration patterns:**

- Terminal works seamlessly with NavigationContext
- Hooks provide clean separation of concerns
- Command system is extensible for custom functionality
- Boot sequence integrates with system information detection
