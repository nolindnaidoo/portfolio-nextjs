export const TerminalFooter = () => {
  return (
    <div className="p-4 pt-2 border-t border-border/50 flex-shrink-0">
      <div className="bg-glass-bg backdrop-blur-xl rounded-lg border border-glass-border px-3 py-2 shadow-lg">
        <p className="text-muted-foreground text-xs text-center font-medium">
          Press Tab for autocomplete • Use ↑/↓ for command history • Type
          &quot;help&quot; for commands
        </p>
      </div>
    </div>
  )
}
