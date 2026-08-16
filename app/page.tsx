import { MedlyApp } from "@/components/medly/medly-app"
import { HeartPulse } from "lucide-react"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-secondary/40 px-4 py-10">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <HeartPulse className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-lg font-bold tracking-tight text-foreground">Medly</p>
          <p className="text-xs text-muted-foreground">Your health, all in one place</p>
        </div>
      </div>

      <MedlyApp />

      <p className="max-w-xs text-center text-xs text-muted-foreground">
        Tap around — book a doctor, view lab results, manage e-prescriptions, and open your health QR.
      </p>
    </main>
  )
}
