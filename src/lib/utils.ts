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
