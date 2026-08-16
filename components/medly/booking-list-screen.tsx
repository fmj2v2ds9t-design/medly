"use client"

import Image from "next/image"
import { Search, Star, MapPin, Clock, ChevronRight } from "lucide-react"
import { doctors, specialties } from "@/lib/medly-data"

export function BookingListScreen({ onOpenDoctor }: { onOpenDoctor: (id: string) => void }) {
  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold text-foreground">Book Appointment</h1>
        <p className="text-sm text-muted-foreground">Find the right specialist for you</p>
      </header>

      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-3.5 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          placeholder="Search by name or specialty"
          aria-label="Search doctors"
        />
      </div>

      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {["All", ...specialties].map((s, i) => (
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

      <p className="mt-5 text-xs font-semibold text-muted-foreground">{doctors.length} doctors available</p>

      <ul className="mt-3 space-y-3">
        {doctors.map((doc) => (
          <li key={doc.id}>
            <button
              type="button"
              onClick={() => onOpenDoctor(doc.id)}
              className="flex w-full items-center gap-3 rounded-3xl border border-border bg-card p-3 text-left"
            >
              <Image
                src={doc.image}
                alt={doc.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{doc.name}</p>
                <p className="text-xs text-primary">{doc.specialty}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-0.5 font-semibold text-warning">
                    <Star className="h-3 w-3 fill-current" />
                    {doc.rating}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" />
                    {doc.distanceKm} km
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="h-3 w-3" />
                    {doc.experienceYears} yrs
                  </span>
                </div>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ChevronRight className="h-4 w-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
