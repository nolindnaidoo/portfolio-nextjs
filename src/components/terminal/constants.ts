export const TERMINAL_CONFIG = {
  TYPING_DELAY: 100,
  TERMINAL_HEIGHT: '500px',
  SYSTEM_VERSION: 'v3.7.2',
  PORTFOLIO_VERSION: 'v3.0.0',
  DEFAULT_USER: 'visitor',
  DEFAULT_SESSION: 'portfolio-terminal',
  DEFAULT_LOCATION: '/nolindnaidoo',
} as const

export const BOOT_SEQUENCE_DELAYS = {
  INITIAL: 100,
  SHORT: 200,
  MEDIUM: 300,
  LONG: 400,
  EXTRA_LONG: 500,
  DRAMATIC: 600,
} as const

export const TERMINAL_COLORS = {
  COMMAND: 'text-foreground',
  OUTPUT: 'text-muted-foreground',
  ERROR: 'text-red-500',
  BOOT: 'text-cyan-500',
  WARNING: 'text-yellow-500',
  SUCCESS: 'text-emerald-500',
  PROMPT_USER: 'text-emerald-500',
  PROMPT_SEPARATOR: 'text-muted-foreground/50',
  PROMPT_PATH: 'text-blue-500',
} as const

export const COMMAND_CATEGORIES = {
  SYSTEM: 'system',
  NAVIGATION: 'navigation',
  HIDDEN: 'hidden',
} as const
