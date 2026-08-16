"use client"

import { Home, CalendarDays, FlaskConical, Pill, User } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabId = "home" | "appointments" | "labs" | "pharmacy" | "profile"

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "appointments", label: "Booking", icon: CalendarDays },
  { id: "labs", label: "Labs", icon: FlaskConical },
  { id: "pharmacy", label: "Pharmacy", icon: Pill },
  { id: "profile", label: "Profile", icon: User },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (tab: TabId) => void
}) {
  return (
    <nav
      aria-label="Primary"
      className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 px-3 pb-6 pt-2 backdrop-blur"
    >
      <ul className="flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <li key={tab.id}>
              <button
                type="button"
                onClick={() => onChange(tab.id)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex w-[62px] flex-col items-center gap-1 rounded-2xl py-1.5 text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-colors",
                    isActive ? "bg-primary text-primary-foreground" : "bg-transparent",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} />
                </span>
                {tab.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
