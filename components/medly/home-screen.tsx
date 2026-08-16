"use client"

import Image from "next/image"
import {
  Bell,
  QrCode,
  Search,
  SlidersHorizontal,
  CalendarPlus,
  FlaskConical,
  FileText,
  MapPin,
  Star,
  ChevronRight,
  Video,
} from "lucide-react"
import { doctors, upcomingAppointment, specialties } from "@/lib/medly-data"
import type { TabId } from "./bottom-nav"
import { NearbyMap } from "./nearby-map"

const quickActions = [
  { label: "Book Appointment", icon: CalendarPlus, tab: "appointments" as TabId, color: "bg-primary/10 text-primary" },
  { label: "Lab Results", icon: FlaskConical, tab: "labs" as TabId, color: "bg-chart-2/15 text-chart-2" },
  { label: "E-Prescriptions", icon: FileText, tab: "pharmacy" as TabId, color: "bg-chart-4/15 text-chart-4" },
  { label: "Find Pharmacy", icon: MapPin, tab: "pharmacy" as TabId, color: "bg-chart-3/15 text-chart-3" },
]

export function HomeScreen({
  onNavigate,
  onOpenDoctor,
  onOpenQr,
}: {
  onNavigate: (tab: TabId) => void
  onOpenDoctor: (id: string) => void
  onOpenQr: () => void
}) {
  const apptDoctor = doctors.find((d) => d.id === upcomingAppointment.doctorId)!

  return (
    <div className="h-full overflow-y-auto pb-28">
      {/* header */}
      <header className="rounded-b-[2rem] bg-primary px-5 pb-6 pt-2 text-primary-foreground">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 text-lg font-bold">
              AK
            </span>
            <div>
              <p className="text-xs text-primary-foreground/70">Good morning</p>
              <p className="text-base font-bold">Amara Kelly</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenQr}
              aria-label="Show my QR code"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15"
            >
              <QrCode className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-chart-3 ring-2 ring-primary" />
            </button>
          </div>
        </div>

        {/* search */}
        <div className="mt-5 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-2xl bg-primary-foreground px-3.5 py-3 text-foreground">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Search doctors, specialty, city"
              aria-label="Search doctors"
            />
          </div>
          <button
            type="button"
            aria-label="Filters"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-2xl bg-primary-foreground/20"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="space-y-6 px-5 pt-6">
        {/* quick actions */}
        <section aria-labelledby="quick-actions">
          <h2 id="quick-actions" className="sr-only">
            Quick actions
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => onNavigate(action.tab)}
                  className="flex flex-col items-center gap-2"
                >
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}>
                    <Icon className="h-6 w-6" strokeWidth={2.1} />
                  </span>
                  <span className="text-center text-[10px] font-medium leading-tight text-foreground">
                    {action.label}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {/* upcoming appointment */}
        <section aria-labelledby="upcoming">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="upcoming" className="text-sm font-bold text-foreground">
              Upcoming Appointment
            </h2>
            <button type="button" className="text-xs font-semibold text-primary" onClick={() => onNavigate("appointments")}>
              See all
            </button>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary to-chart-4 p-4 text-primary-foreground shadow-lg shadow-primary/25">
            <div className="flex items-center gap-3">
              <Image
                src={apptDoctor.image}
                alt={apptDoctor.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-bold">{apptDoctor.name}</p>
                <p className="text-xs text-primary-foreground/80">{apptDoctor.specialty}</p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2.5 py-1 text-[10px] font-semibold">
                <Video className="h-3 w-3" />
                {upcomingAppointment.mode}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-primary-foreground/15 px-4 py-2.5 text-xs font-medium">
              <span>{upcomingAppointment.date}</span>
              <span className="h-3 w-px bg-primary-foreground/40" />
              <span>{upcomingAppointment.time}</span>
              <button
                type="button"
                onClick={() => onOpenDoctor(apptDoctor.id)}
                className="flex items-center gap-0.5 rounded-full bg-primary-foreground px-3 py-1.5 font-semibold text-primary"
              >
                View Details
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* specialties */}
        <section aria-labelledby="specialties">
          <h2 id="specialties" className="mb-3 text-sm font-bold text-foreground">
            Specialties
          </h2>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {specialties.map((s, i) => (
              <button
                key={s}
                type="button"
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium ${
                  i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </section>

        {/* top doctors */}
        <section aria-labelledby="top-doctors">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="top-doctors" className="text-sm font-bold text-foreground">
              Top Doctors
            </h2>
            <button type="button" className="text-xs font-semibold text-primary" onClick={() => onNavigate("appointments")}>
              See all
            </button>
          </div>
          <ul className="space-y-3">
            {doctors.slice(0, 3).map((doc) => (
              <li key={doc.id}>
                <button
                  type="button"
                  onClick={() => onOpenDoctor(doc.id)}
                  className="flex w-full items-center gap-3 rounded-3xl border border-border bg-card p-3 text-left"
                >
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-2xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-0.5 font-semibold text-warning">
                        <Star className="h-3 w-3 fill-current" />
                        {doc.rating}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3" />
                        {doc.distanceKm} km
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* nearby map */}
        <section aria-labelledby="nearby">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="nearby" className="text-sm font-bold text-foreground">
              Nearby Clinics &amp; Pharmacies
            </h2>
            <button type="button" className="text-xs font-semibold text-primary" onClick={() => onNavigate("pharmacy")}>
              Map view
            </button>
          </div>
          <NearbyMap />
        </section>
      </div>
    </div>
  )
}
