import { DeviceInfo } from '@/components/terminal/types'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isEnv } from './constants'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs)) // Merge class names with Tailwind Merge
}

export function log(...args: unknown[]): void {
  if (isEnv === 'dev') {
    console.log(...args)
  }
}

// Get user's IP address
export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip || 'unknown'
  } catch {
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
