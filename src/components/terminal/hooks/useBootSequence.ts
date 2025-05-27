import { getDeviceInfo, getUserIP } from '@/lib/utils'
import { useCallback } from 'react'
import type { BootSequenceCallbacks, TerminalLine } from '../types'

export const useBootSequence = (callbacks: BootSequenceCallbacks) => {
  const { addLine, setIsBooting, setShowInput, setUserIP, setDeviceInfo } =
    callbacks

  const runBootSequence = useCallback(async () => {
    const addBootLine = (
      type: TerminalLine['type'],
      content: string,
      delay: number = 0,
    ) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          addLine(type, content)
          resolve()
        }, delay)
      })
    }

    // Get device info and IP
    const deviceData = getDeviceInfo()
    setDeviceInfo(deviceData)
    const ip = await getUserIP()
    setUserIP(ip)

    // Boot sequence
    await addBootLine('boot', 'Initializing boot sequence...', 300)

    setIsBooting(false)
    setShowInput(true)
  }, [addLine, setIsBooting, setShowInput, setUserIP, setDeviceInfo])

  return { runBootSequence }
}
