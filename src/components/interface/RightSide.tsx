import TerminalSection from '@/components/terminal/Terminal'

interface RightSideProps {
  onContentChangeAction: () => void
}

export default function RightSide({ onContentChangeAction }: RightSideProps) {
  return (
    <div className="relative h-full bg-gradient-to-bl from-background/95 via-muted/10 to-background/90 border-l border-border/20">
      {/* Subtle depth indicator with cooler tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-muted/5 to-border/8"></div>
      {/* Left border enhancement */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-border/30 to-transparent"></div>

      {/* Terminal Content with premium spacing */}
      <div className="relative h-full">
        <TerminalSection onContentChangeAction={onContentChangeAction} />
      </div>
    </div>
  )
}
