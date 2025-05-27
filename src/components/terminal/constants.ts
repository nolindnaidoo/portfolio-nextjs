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

export const TERMINAL_STYLES = {
  HEADER: {
    CONTAINER: 'flex items-center justify-between p-4 pb-3 border-b border-border/50 flex-shrink-0',
    CONTENT_GROUP: 'flex items-center gap-3',
    ICON_CONTAINER:
      'w-8 h-8 bg-background/10 backdrop-blur-xl rounded-lg border border-border/20 flex items-center justify-center shadow-lg',
    TITLE: 'text-foreground/90 font-medium text-sm',
    ACTIONS: 'flex items-center gap-3',
  },
  FOOTER: {
    CONTAINER: 'p-4 pt-2 border-t border-border/50 flex-shrink-0',
    CONTENT:
      'bg-glass-bg backdrop-blur-xl rounded-lg border border-glass-border px-3 py-2 shadow-lg',
    TEXT: 'text-muted-foreground text-xs text-center font-medium',
  },
  INPUT: {
    CONTAINER: 'p-4 pt-2 flex-shrink-0',
    WRAPPER: 'flex items-center gap-2 font-mono',
    INPUT_WRAPPER: 'flex-1 flex items-center ml-2',
    INPUT:
      'bg-transparent border-none outline-none flex-1 font-mono placeholder-muted-foreground/50',
    CURSOR: 'w-1.5 h-4 ml-1 rounded-sm',
  },
  OUTPUT: {
    CONTAINER: 'overflow-y-auto cursor-text p-4 h-[585px]',
    CONTENT: 'space-y-1 font-mono',
    LINE_CONTAINER: 'flex flex-col',
    COMMAND_LINE: 'flex items-center gap-2',
    COMMAND_TEXT: 'ml-2 text-foreground',
    OUTPUT_TEXT: 'text-muted-foreground whitespace-pre-wrap ml-2',
    ERROR_TEXT: 'text-red-500 whitespace-pre-wrap ml-2',
    BOOT_TEXT: 'text-cyan-500 whitespace-pre-wrap ml-2',
    WARNING_TEXT: 'text-yellow-500 whitespace-pre-wrap ml-2',
    SUCCESS_TEXT: 'text-emerald-500 whitespace-pre-wrap ml-2',
  },
  PROMPT: {
    CONTAINER: 'flex items-center gap-2',
    USER: 'text-emerald-500 font-medium text-sm',
    SEPARATOR: 'text-muted-foreground/50',
    PATH: 'text-blue-500 font-medium text-sm',
  },
} as const
