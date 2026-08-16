"use client"

import {
  QrCode,
  Heart,
  CalendarDays,
  FileText,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Droplet,
  Ruler,
  Weight,
} from "lucide-react"

const vitals = [
  { icon: Droplet, label: "Blood", value: "O+" },
  { icon: Weight, label: "Weight", value: "64 kg" },
  { icon: Ruler, label: "Height", value: "168 cm" },
]

const menu = [
  { icon: CalendarDays, label: "My Appointments" },
  { icon: FileText, label: "Medical Records" },
  { icon: Heart, label: "Saved Doctors" },
  { icon: CreditCard, label: "Payment Methods" },
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Privacy & Security" },
  { icon: HelpCircle, label: "Help & Support" },
]

export function ProfileScreen({ onOpenQr }: { onOpenQr: () => void }) {
  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
      </header>

      <div className="mt-4 flex items-center gap-4 rounded-3xl border border-border bg-card p-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
          AK
        </span>
        <div className="flex-1">
          <p className="text-base font-bold text-foreground">Amara Kelly</p>
          <p className="text-xs text-muted-foreground">amara.kelly@email.com</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Patient ID · MDY-20481</p>
        </div>
        <button
          type="button"
          onClick={onOpenQr}
          aria-label="Show QR code"
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <QrCode className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {vitals.map((v) => {
          const Icon = v.icon
          return (
            <div key={v.label} className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card py-3">
              <Icon className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{v.value}</span>
              <span className="text-[10px] text-muted-foreground">{v.label}</span>
            </div>
          )
        })}
      </div>

      <ul className="mt-5 overflow-hidden rounded-3xl border border-border bg-card">
        {menu.map((item, i) => {
          const Icon = item.icon
          return (
            <li key={item.label}>
              <button
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${
                  i !== 0 ? "border-t border-border" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-primary">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 py-3.5 text-sm font-semibold text-destructive"
      >
        <LogOut className="h-4 w-4" />
        Log out
      </button>
    </div>
  )
}
