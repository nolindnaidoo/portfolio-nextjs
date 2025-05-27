import type { Command, LeftPanelContent } from './types'

export const getAvailableCommands = (
  onContentChangeAction: (content: LeftPanelContent) => void,
  currentContent: LeftPanelContent,
): Record<string, Command> => ({
  // System Commands
  'help': {
    description: 'Show available commands',
    category: 'system',
    execute: () => {
      const commands = getAvailableCommands(
        onContentChangeAction,
        currentContent,
      )
      const systemCommands = Object.entries(commands).filter(
        ([, cmd]) => cmd.category === 'system',
      )
      const navigationCommands = Object.entries(commands).filter(
        ([, cmd]) => cmd.category === 'navigation',
      )

      return [
        '',
        'System Commands:',
        ...systemCommands.map(
          ([name, cmd]) => `  ${name.padEnd(12)} - ${cmd.description}`,
        ),
        '',
        'Navigation Commands:',
        ...navigationCommands.map(
          ([name, cmd]) => `  ${name.padEnd(12)} - ${cmd.description}`,
        ),
        '',
        'Use Tab for autocomplete, ↑/↓ for command history',
      ]
    },
  },
  'clear': {
    description: 'Clear the terminal screen',
    category: 'system',
    execute: () => [],
  },
  'whoami': {
    description: 'Display current user information',
    category: 'system',
    execute: () => [
      'Current user: visitor',
      'Access level: guest',
      'Session: portfolio-terminal',
      'Location: /nolindnaidoo',
    ],
  },
  'status': {
    description: 'Show system status',
    category: 'system',
    execute: () => [
      'System Status Report:',
      '├─ Portfolio System: ✅ ONLINE',
      '├─ Security Protocols: ✅ ACTIVE',
      '├─ Charm Modules: ✅ LOADED',
      '├─ Skills Database: ✅ READY',
      '└─ Contact Systems: ✅ OPERATIONAL',
      '',
      'All systems nominal. Ready for collaboration.',
    ],
  },
  'ls': {
    description: 'List available sections',
    category: 'system',
    execute: () => {
      const currentPath = '/nolindnaidoo/home'
      return [
        `Current location: ${currentPath}`,
        '',
        'Available sections:',
        'home/        - Main portfolio interface',
        '',
        'Use section names as commands to navigate.',
      ]
    },
  },
  'pwd': {
    description: 'Print current working directory',
    category: 'system',
    execute: () => {
      const currentPath = '/nolindnaidoo/home'
      return [currentPath]
    },
  },

  // Navigation Commands
  'home': {
    description: 'Navigate to home section',
    category: 'navigation',
    execute: () => {
      onContentChangeAction('home')
      return ['Navigating to home section...', 'Loading main interface...']
    },
  },
  'back': {
    description: 'Go back to home section',
    category: 'navigation',
    execute: () => {
      onContentChangeAction('home')
      return ['Navigating back to home section...']
    },
  },

  // Hidden Commands (not shown in help)
  'cd ..': {
    description: 'Navigate back (hidden)',
    category: 'hidden',
    execute: () => {
      onContentChangeAction('home')
      return ['Navigating back to home...']
    },
  },
  'cd': {
    description: 'Change directory (hidden)',
    category: 'hidden',
    execute: () => {
      return ['Usage: cd [directory]']
    },
  },
  'exit': {
    description: 'Attempt to exit (hidden)',
    category: 'hidden',
    execute: () => ['exit: permission denied'],
  },
  'sudo': {
    description: 'Sudo access (hidden)',
    category: 'hidden',
    execute: () => ['sudo: permission denied'],
  },
})
