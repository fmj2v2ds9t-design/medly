"use client"

import { X, CheckCircle2, CalendarDays, Clock } from "lucide-react"
import type { Doctor } from "@/lib/medly-data"

// deterministic QR-style pattern (visual only, not a scannable code)
function QrPattern() {
  const size = 21
  const cells: boolean[] = []
  for (let i = 0; i < size * size; i++) {
    // pseudo-random but stable
    cells.push(((i * 137 + (i % 7) * 23 + Math.floor(i / size) * 17) % 5) < 2)
  }
  const isFinder = (r: number, c: number) => {
    const inBox = (br: number, bc: number) => r >= br && r < br + 7 && c >= bc && c < bc + 7
    return inBox(0, 0) || inBox(0, size - 7) || inBox(size - 7, 0)
  }
  return (
    <div
      className="grid gap-px rounded-2xl bg-card p-3"
      style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {cells.map((on, i) => {
        const r = Math.floor(i / size)
        const c = i % size
        const finder = isFinder(r, c)
        const filled = finder ? true : on
        return (
          <span
            key={i}
            className={`aspect-square rounded-[1px] ${filled ? "bg-foreground" : "bg-transparent"}`}
          />
        )
      })}
    </div>
  )
}

export function QrSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
      <div className="relative w-full rounded-t-[2rem] bg-background p-6 pb-10">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-center text-lg font-bold text-foreground">My Health QR</h2>
        <p className="mb-4 text-center text-xs text-muted-foreground">
          Show this at reception or pharmacy for instant check-in
        </p>
        <div className="mx-auto max-w-[240px] rounded-3xl border border-border bg-secondary/60 p-3">
          <QrPattern />
        </div>
        <div className="mt-4 rounded-2xl bg-secondary/60 px-4 py-3 text-center">
          <p className="text-sm font-bold text-foreground">Amara Kelly</p>
          <p className="text-xs text-muted-foreground">Patient ID · MDY-20481</p>
        </div>
      </div>
    </div>
  )
}

export function ConfirmationModal({
  data,
  onClose,
}: {
  data: { doctor: Doctor; day: string; slot: string } | null
  onClose: () => void
}) {
  if (!data) return null
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-6">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
      <div className="relative w-full rounded-3xl bg-background p-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="mt-4 text-lg font-bold text-foreground">Appointment Confirmed!</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          You&apos;re booked with {data.doctor.name} ({data.doctor.specialty}).
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 rounded-2xl bg-secondary/60 px-4 py-3 text-sm font-semibold text-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-primary" />
            {data.day}
          </span>
          <span className="h-4 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            {data.slot}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground"
        >
          Done
        </button>
      </div>
    </div>
  )
}
