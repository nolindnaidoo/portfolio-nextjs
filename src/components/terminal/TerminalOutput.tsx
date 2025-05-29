import { forwardRef } from 'react'
import { TERMINAL_STYLES } from './constants'

export interface DeviceInfo {
  browser: string
  device: string
  userAgent: string
}

export interface TerminalLine {
  id: string
  type: 'command' | 'output' | 'error' | 'boot' | 'warning' | 'success'
  content: string
  timestamp: Date
}

// Get user's IP address
export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip || 'unknown'
  } catch (err) {
    // Import logger functions at the top of the file
    const { warn } = await import('@/lib')
    warn('Failed to fetch user IP, using fallback', {
      component: 'TerminalOutput',
      action: 'ip_fetch_error',
      metadata: { error: err instanceof Error ? err.message : 'Unknown error' },
    })
    // Fallback to a simulated local IP for demo purposes
    return '192.168.1.' + Math.floor(Math.random() * 254 + 1)
  }
}

// Smart device detection from user agent - shows browser + OS combo
export const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined')
    return { browser: 'ssr', device: 'node', userAgent: 'server-side' }

  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform?.toLowerCase() || ''

  // Detect browser
  let browser = 'unknown'
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    browser = 'chrome'
  } else if (userAgent.includes('Firefox')) {
    browser = 'firefox'
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'safari'
  } else if (userAgent.includes('Edg')) {
    browser = 'edge'
  } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
    browser = 'opera'
  }

  // Detect OS/Device
  let device = 'unknown'
  if (userAgent.includes('iPhone')) {
    device = 'iphone'
  } else if (userAgent.includes('iPad')) {
    device = 'ipad'
  } else if (userAgent.includes('Android')) {
    if (userAgent.includes('Mobile')) {
      device = 'android'
    } else {
      device = 'android-tablet'
    }
  } else if (platform.includes('mac') || userAgent.includes('Macintosh')) {
    device = 'macos'
  } else if (platform.includes('win') || userAgent.includes('Windows')) {
    device = 'windows'
  } else if (platform.includes('linux') || userAgent.includes('Linux')) {
    device = 'linux'
  }

  return { browser, device, userAgent }
}

interface TerminalOutputProps {
  lines: TerminalLine[]
  userIP: string
  deviceInfo: DeviceInfo
  onClick: () => void
}

export const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  ({ lines, userIP, deviceInfo, onClick }, ref) => {
    const TerminalLine = ({ line }: { line: TerminalLine }) => {
      switch (line.type) {
        case 'command':
          return (
            <div className={TERMINAL_STYLES.OUTPUT.COMMAND_LINE}>
              <span className={TERMINAL_STYLES.PROMPT.CONTAINER}>
                <span className={TERMINAL_STYLES.PROMPT.USER}>
                  {userIP}@{deviceInfo.browser}-{deviceInfo.device}
                </span>
                <span className={TERMINAL_STYLES.PROMPT.SEPARATOR}>:</span>
                <span className={TERMINAL_STYLES.PROMPT.PATH}>~</span>
                <span className={TERMINAL_STYLES.PROMPT.SEPARATOR}>$</span>
              </span>
              <span className={TERMINAL_STYLES.OUTPUT.COMMAND_TEXT}>
                {line.content.replace('$ ', '')}
              </span>
            </div>
          )
        case 'output':
          return <div className={TERMINAL_STYLES.OUTPUT.OUTPUT_TEXT}>{line.content}</div>
        case 'error':
          return <div className={TERMINAL_STYLES.OUTPUT.ERROR_TEXT}>{line.content}</div>
        case 'boot':
          return <div className={TERMINAL_STYLES.OUTPUT.BOOT_TEXT}>{line.content}</div>
        case 'warning':
          return <div className={TERMINAL_STYLES.OUTPUT.WARNING_TEXT}>{line.content}</div>
        case 'success':
          return <div className={TERMINAL_STYLES.OUTPUT.SUCCESS_TEXT}>{line.content}</div>
        default:
          return null
      }
    }

    return (
      <div
        ref={ref}
        className={TERMINAL_STYLES.OUTPUT.CONTAINER}
        onClick={onClick}
        role="log"
        aria-label="Terminal output"
      >
        <div className={TERMINAL_STYLES.OUTPUT.CONTENT}>
          {lines.map((line) => (
            <div key={line.id} className={TERMINAL_STYLES.OUTPUT.LINE_CONTAINER}>
              <TerminalLine line={line} />
            </div>
          ))}
        </div>
      </div>
    )
  },
)

TerminalOutput.displayName = 'TerminalOutput'
