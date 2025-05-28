import { getDeviceInfo, getUserIP, type DeviceInfo } from '@/components/terminal/TerminalOutput'
import { debug, error, info } from '@/lib'
import { useCallback, useEffect, useState } from 'react'

export function useSystemInfo() {
  const [userIP, setUserIP] = useState<string>('visitor')
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    browser: 'unknown',
    device: 'unknown',
    userAgent: 'unknown',
  })
  const [isBooting, setIsBooting] = useState(true)

  const runBootSequence = useCallback(async () => {
    try {
      debug('System info boot sequence started', {
        component: 'useSystemInfo',
        action: 'boot_start',
      })

      const deviceData = getDeviceInfo()
      setDeviceInfo(deviceData)

      const ip = await getUserIP()
      setUserIP(ip)

      info('System info boot sequence completed', {
        component: 'useSystemInfo',
        action: 'boot_complete',
        metadata: {
          userIP: ip,
          browser: deviceData.browser,
          device: deviceData.device,
        },
      })

      setIsBooting(false)
    } catch (err) {
      error('System info boot sequence failed', {
        component: 'useSystemInfo',
        action: 'boot_error',
        metadata: { error: err instanceof Error ? err.message : 'Unknown error' },
      })
      // Continue with fallback values
      setIsBooting(false)
    }
  }, [])

  useEffect(() => {
    runBootSequence()
  }, [runBootSequence])

  return {
    userIP,
    deviceInfo,
    isBooting,
  }
}
