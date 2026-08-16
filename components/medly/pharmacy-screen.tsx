"use client"

import { useState } from "react"
import { Pill, Truck, Store, Clock, MapPin, Stethoscope, ShieldCheck, ChevronRight } from "lucide-react"
import { prescription, pharmacies } from "@/lib/medly-data"
import { cn } from "@/lib/utils"

export function PharmacyScreen() {
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery")
  const [selectedPharmacy, setSelectedPharmacy] = useState(pharmacies[0].id)

  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold text-foreground">E-Prescription</h1>
        <p className="text-sm text-muted-foreground">Digital prescription · send to a pharmacy</p>
      </header>

      {/* prescription card */}
      <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card">
        <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            <div>
              <p className="text-sm font-bold">{prescription.doctorName}</p>
              <p className="text-[11px] text-primary-foreground/80">{prescription.specialty}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-primary-foreground/70">Rx No.</p>
            <p className="text-xs font-semibold">#{prescription.id.split("-")[1]}</p>
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center gap-1.5 rounded-xl bg-accent px-3 py-2 text-[11px] font-medium text-accent-foreground">
            <ShieldCheck className="h-3.5 w-3.5" />
            {prescription.diagnosis}
          </div>

          <ul className="mt-3 divide-y divide-border">
            {prescription.medicines.map((med) => (
              <li key={med.name} className="flex items-center gap-3 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Pill className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {med.name} <span className="text-xs font-normal text-muted-foreground">· {med.dosage}</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {med.frequency} · {med.duration}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <p className="pb-1 text-[10px] text-muted-foreground">Issued {prescription.issuedDate}</p>
        </div>
      </div>

      {/* fulfilment toggle */}
      <section className="mt-6">
        <h2 className="text-sm font-bold text-foreground">Get your medicines</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <MethodToggle
            active={method === "delivery"}
            onClick={() => setMethod("delivery")}
            icon={Truck}
            title="Home Delivery"
            subtitle="To your door"
          />
          <MethodToggle
            active={method === "pickup"}
            onClick={() => setMethod("pickup")}
            icon={Store}
            title="Self Pick-up"
            subtitle="Collect nearby"
          />
        </div>
      </section>

      {/* pharmacy list */}
      <section className="mt-6">
        <h2 className="text-sm font-bold text-foreground">
          {method === "delivery" ? "Delivering from" : "Pick up at"}
        </h2>
        <ul className="mt-3 space-y-2.5">
          {pharmacies.map((ph) => {
            const selected = selectedPharmacy === ph.id
            return (
              <li key={ph.id}>
                <button
                  type="button"
                  disabled={!ph.open}
                  onClick={() => setSelectedPharmacy(ph.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors",
                    selected ? "border-primary bg-primary/5" : "border-border bg-card",
                    !ph.open && "opacity-55",
                  )}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Pill className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{ph.name}</p>
                    <div className="mt-0.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3" />
                        {ph.distanceKm} km
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="h-3 w-3" />
                        {method === "delivery" ? ph.eta : "Ready 20 min"}
                      </span>
                      <span className={ph.open ? "font-semibold text-success" : "font-semibold text-destructive"}>
                        {ph.open ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded-full border-2",
                      selected ? "border-primary bg-primary" : "border-border",
                    )}
                  >
                    {selected && <span className="h-2 w-2 rounded-full bg-primary-foreground" />}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground"
      >
        {method === "delivery" ? "Send & Order Delivery" : "Reserve for Pick-up"}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

function MethodToggle({
  active,
  onClick,
  icon: Icon,
  title,
  subtitle,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Truck
  title: string
  subtitle: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-colors",
        active ? "border-primary bg-primary/5" : "border-border bg-card",
      )}
    >
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-bold text-foreground">{title}</span>
        <span className="block text-[11px] text-muted-foreground">{subtitle}</span>
      </span>
    </button>
  )
}
