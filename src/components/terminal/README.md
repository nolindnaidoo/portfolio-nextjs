# Terminal Module

A fully interactive terminal interface for portfolio navigation with realistic command execution, device detection, and smooth animations.

## Architecture

The terminal module follows a **simple, direct state management pattern** consistent with the rest of the application:

```tsx
// Simple useState pattern (no custom hooks)
const [lines, setLines] = useState<TerminalLine[]>([])
const [currentInput, setCurrentInput] = useState('')
const [commandHistory, setCommandHistory] = useState<string[]>([])
// ... more direct state

// Inline functions with useCallback
const executeCommand = useCallback(
  async (command: string) => {
    // Command execution logic
  },
  [dependencies],
)
```

## Components

### `Terminal.tsx`

The main terminal component that orchestrates all terminal functionality.

**Architecture:**

```tsx
// Constants first
const TERMINAL_CONFIG = { ... }

// Main export with direct state management
export default function TerminalSection({ onContentChangeAction }) {
  // Direct useState calls (no custom hooks)
  const [lines, setLines] = useState<TerminalLine[]>([])

  // Inline functions
  const executeCommand = useCallback(async (command) => { ... }, [])
  const runBootSequence = useCallback(async () => { ... }, [])

  return <section>...</section>
}
```

**Props:**

- `onContentChangeAction: (content: LeftPanelContent) => void` - Handler for navigation commands

**Features:**

- **Direct State Management**: All state managed with simple `useState` calls
- **Boot Sequence**: Realistic terminal initialization with device detection
- **Command Execution**: Full command parsing and execution system
- **Auto-scroll**: Automatically scrolls to show latest output
- **Focus Management**: Auto-focuses input when ready

### `TerminalOutput.tsx`

Displays terminal output with syntax highlighting and contains core terminal utilities.

**Architecture:**

```tsx
// Types and utilities first
export interface DeviceInfo { ... }
export interface TerminalLine { ... }
export const getUserIP = async (): Promise<string> => { ... }
export const getDeviceInfo = (): DeviceInfo => { ... }

// Main component
export const TerminalOutput = forwardRef<HTMLDivElement, Props>(({ ... }) => {
  // Nested component for line rendering
  const TerminalLine = ({ line }) => { ... }

  return <div>...</div>
})
```

**Props:**

- `lines: TerminalLine[]` - Array of terminal output lines
- `userIP: string` - User's IP address for prompt display
- `deviceInfo: DeviceInfo` - Device information for prompt display
- `onClick: () => void` - Handler for terminal clicks (focus management)

**Features:**

- **Syntax Highlighting**: Different colors for commands, output, errors, etc.
- **Device Detection**: Smart browser and OS detection
- **IP Detection**: Real IP fetching with fallback
- **Prompt Generation**: Realistic terminal prompt display

### `TerminalInput.tsx`

Handles user input with command history, autocomplete, and keyboard navigation.

**Props:**

- `currentInput: string` - Current input value
- `setCurrentInput: (value: string) => void` - Input setter
- `commandHistory: string[]` - Array of previous commands
- `historyIndex: number` - Current position in history
- `setHistoryIndex: (value: number) => void` - History position setter
- `executeCommand: (command: string) => void` - Command execution handler
- `userIP: string` - User's IP for prompt
- `deviceInfo: DeviceInfo` - Device info for prompt
- `disabled?: boolean` - Whether input is disabled during boot

**Features:**

- **Command History**: ↑/↓ arrow key navigation through previous commands
- **Tab Autocomplete**: Auto-completes partial command names
- **Realistic Prompt**: Shows `user@browser-device:~$` format
- **Disabled State**: Shows "Initializing..." during boot sequence

### `TerminalHeader.tsx`

Terminal header with title and theme toggle.

**Props:**

- `isBooting: boolean` - Whether terminal is in boot state

**Features:**

- **Dynamic Title**: "Security Terminal" during boot, "Portfolio Terminal" when ready
- **Theme Toggle**: Integrated theme switcher
- **Terminal Icon**: Visual terminal indicator

### `TerminalFooter.tsx`

Help text for terminal usage.

**Features:**

- **Usage Instructions**: Tab autocomplete, arrow key history, help command
- **Consistent Styling**: Matches terminal aesthetic

## Commands System

### `commands.ts`

Defines all available terminal commands with categories and execution logic.

**Architecture:**

```tsx
// Types first
export type LeftPanelContent = 'home' | 'about' | 'projects' | 'skills' | 'contact'

// Command factory function
export const getAvailableCommands = (
  onContentChangeAction: (content: LeftPanelContent) => void,
  currentContent: LeftPanelContent,
): Record<string, Command> => ({
  // System commands
  'help': { description: '...', category: 'system', execute: () => [...] },

  // Navigation commands
  'home': { description: '...', category: 'navigation', execute: () => [...] },

  // Hidden commands (not shown in help)
  'sudo': { description: '...', category: 'hidden', execute: () => [...] },
})
```

**Command Categories:**

- **`system`**: Help, status, file operations (shown in help)
- **`navigation`**: Section navigation commands (shown in help)
- **`hidden`**: Easter eggs and advanced commands (not shown in help)

**Available Commands:**

- `help` - Show available commands with categories
- `clear` - Clear terminal screen
- `whoami` - Display user information
- `status` - Show system status report
- `ls` - List available sections
- `pwd` - Print current directory
- `home`, `about`, `projects`, `skills`, `contact` - Navigate to sections
- `back` - Return to home section
- `cd ..`, `cd`, `exit`, `sudo` - Hidden commands with realistic responses

## Types

### Core Types

```tsx
// Navigation content type
export type LeftPanelContent = 'home' | 'about' | 'projects' | 'skills' | 'contact'

// Device information
export interface DeviceInfo {
  browser: string // 'chrome', 'firefox', 'safari', etc.
  device: string // 'macos', 'windows', 'iphone', etc.
  userAgent: string // Full user agent string
}

// Terminal output line
export interface TerminalLine {
  id: string // Unique identifier
  type: 'command' | 'output' | 'error' | 'boot' | 'warning' | 'success' // Line type for styling
  content: string // Line content
  timestamp: Date // When line was created
}

// Command definition
export interface Command {
  description: string // Help text description
  execute: () => string[] // Function that returns output lines
  category: 'system' | 'navigation' | 'hidden' // Command category
}
```

## Styling

### `constants.ts`

Comprehensive styling constants organized by component:

```tsx
export const TERMINAL_STYLES = {
  HEADER: {
    /* Header styles */
  },
  FOOTER: {
    /* Footer styles */
  },
  INPUT: {
    /* Input styles */
  },
  OUTPUT: {
    /* Output styles */
  },
  PROMPT: {
    /* Prompt styles */
  },
}

export const TERMINAL_COLORS = {
  COMMAND: 'text-foreground',
  OUTPUT: 'text-muted-foreground',
  ERROR: 'text-red-500',
  // ... more colors
}
```

## Usage

### Basic Implementation

```tsx
import { TerminalSection } from '@/components/terminal'

function MyComponent() {
  const handleContentChange = (content: LeftPanelContent) => {
    // Handle navigation to different sections
    console.log('Navigate to:', content)
  }

  return <TerminalSection onContentChangeAction={handleContentChange} />
}
```

### Integration with Interface

```tsx
// In Interface.tsx
const [currentContent, setCurrentContent] = useState<LeftPanelContent>('home')

const handleContentChange = (content: LeftPanelContent) => {
  setCurrentContent(content)
}

return (
  <div className="grid md:grid-cols-2 h-full">
    <LeftSide pageTitle={currentTitle}>
      <CurrentComponent />
    </LeftSide>
    <RightSide onContentChangeAction={handleContentChange} />
  </div>
)
```

## Key Features

### 🚀 **Realistic Terminal Experience**

- Authentic command prompt with user@device format
- Command history with arrow key navigation
- Tab autocomplete for commands
- Realistic boot sequence with device detection

### 🎯 **Portfolio Navigation**

- Commands map to portfolio sections
- Smooth integration with main interface
- Context-aware help system

### 🎨 **Beautiful Design**

- Syntax highlighting for different output types
- Smooth animations and transitions
- Consistent with overall design system

### ⚡ **Performance Optimized**

- Direct state management (no unnecessary hooks)
- Efficient re-renders with proper memoization
- Minimal bundle impact

### ♿ **Accessibility**

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

## Quality Standards

### ✅ **Architecture Pattern**

- Constants → main export → supporting functions
- Direct `useState` calls (no custom hooks)
- Inline functions with `useCallback`

### ✅ **TypeScript**

- Comprehensive interfaces for all data structures
- Proper type exports and imports
- No `any` types

### ✅ **Performance**

- Memoized callbacks where appropriate
- Efficient state updates
- Minimal re-renders

### ✅ **Code Quality**

- Clean, readable code structure
- Meaningful variable names
- Consistent formatting

This terminal module provides a production-ready, interactive terminal experience that seamlessly integrates with the portfolio interface while maintaining high code quality and performance standards.
