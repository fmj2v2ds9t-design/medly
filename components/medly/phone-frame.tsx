import type { ReactNode } from "react"

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      {/* device body */}
      <div className="relative rounded-[3rem] border border-border bg-foreground/90 p-2.5 shadow-2xl shadow-primary/20">
        {/* side buttons */}
        <div className="absolute -left-1 top-28 h-14 w-1 rounded-l bg-foreground/70" aria-hidden="true" />
        <div className="absolute -left-1 top-44 h-10 w-1 rounded-l bg-foreground/70" aria-hidden="true" />
        <div className="absolute -right-1 top-36 h-20 w-1 rounded-r bg-foreground/70" aria-hidden="true" />

        {/* screen */}
        <div className="relative h-[820px] max-h-[85vh] overflow-hidden rounded-[2.4rem] bg-background">
          {children}
        </div>
      </div>
    </div>
  )
}

export function StatusBar() {
  return (
    <div className="relative z-20 flex items-center justify-between px-7 pt-3 pb-1 text-xs font-semibold text-primary-foreground">
      <span>9:41</span>
      {/* notch */}
      <div className="absolute left-1/2 top-2 h-6 w-28 -translate-x-1/2 rounded-full bg-foreground/90" aria-hidden="true" />
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}

function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" />
      <rect x="4.5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor" />
      <rect x="9" y="3" width="3" height="9" rx="1" fill="currentColor" />
      <rect x="13.5" y="0.5" width="3" height="11.5" rx="1" fill="currentColor" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
      <path d="M8 10.5a1.3 1.3 0 100-2.6 1.3 1.3 0 000 2.6z" fill="currentColor" />
      <path d="M3.4 5.6a6.6 6.6 0 019.2 0M1 3.2a10 10 0 0114 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="17" height="8" rx="1.6" fill="currentColor" />
      <rect x="24" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.7" />
    </svg>
  )
}
