import { forwardRef } from 'react'
import type { DeviceInfo, TerminalLine } from './types'

interface TerminalOutputProps {
  lines: TerminalLine[]
  userIP: string
  deviceInfo: DeviceInfo
  onClick: () => void
}

const getPrompt = (userIP: string, deviceInfo: DeviceInfo) => {
  return (
    <span className="flex items-center gap-2">
      <span className="text-emerald-500 font-medium text-sm">
        {userIP}@{deviceInfo.browser}-{deviceInfo.device}
      </span>
      <span className="text-muted-foreground/50">:</span>
      <span className="text-blue-500 font-medium text-sm">~</span>
      <span className="text-muted-foreground/50">$</span>
    </span>
  )
}

export const TerminalOutput = forwardRef<HTMLDivElement, TerminalOutputProps>(
  ({ lines, userIP, deviceInfo, onClick }, ref) => {
    return (
      <div
        ref={ref}
        className="overflow-y-auto cursor-text p-4 h-[585px]"
        onClick={onClick}
        role="log"
        aria-label="Terminal output"
      >
        <div className="space-y-1  font-mono">
          {lines.map((line) => (
            <div key={line.id} className="flex flex-col">
              {line.type === 'command' && (
                <div className="flex items-center gap-2">
                  {getPrompt(userIP, deviceInfo)}
                  <span className="ml-2 text-foreground">
                    {line.content.replace('$ ', '')}
                  </span>
                </div>
              )}
              {line.type === 'output' && (
                <div className="text-muted-foreground whitespace-pre-wrap ml-2">
                  {line.content}
                </div>
              )}
              {line.type === 'error' && (
                <div className="text-red-500 whitespace-pre-wrap ml-2">
                  {line.content}
                </div>
              )}
              {line.type === 'boot' && (
                <div className="text-cyan-500 whitespace-pre-wrap ml-2">
                  {line.content}
                </div>
              )}
              {line.type === 'warning' && (
                <div className="text-yellow-500 whitespace-pre-wrap ml-2">
                  {line.content}
                </div>
              )}
              {line.type === 'success' && (
                <div className="text-emerald-500 whitespace-pre-wrap ml-2">
                  {line.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  },
)

TerminalOutput.displayName = 'TerminalOutput'
