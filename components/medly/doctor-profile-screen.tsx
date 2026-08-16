"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  Star,
  MapPin,
  Heart,
  Users,
  Award,
  MessageCircle,
  Check,
} from "lucide-react"
import { doctors, type Doctor } from "@/lib/medly-data"
import { cn } from "@/lib/utils"

const days = [
  { label: "Mon", date: "16" },
  { label: "Tue", date: "17" },
  { label: "Wed", date: "18" },
  { label: "Thu", date: "19" },
  { label: "Fri", date: "20" },
  { label: "Sat", date: "21" },
]

const slots = ["09:00", "09:30", "10:30", "11:00", "13:30", "14:00", "15:30", "16:00"]

export function DoctorProfileScreen({
  doctorId,
  onBack,
  onConfirm,
}: {
  doctorId: string
  onBack: () => void
  onConfirm: (doctor: Doctor, day: string, slot: string) => void
}) {
  const doctor = doctors.find((d) => d.id === doctorId) ?? doctors[0]
  const [activeDay, setActiveDay] = useState(0)
  const [activeSlot, setActiveSlot] = useState<string | null>("10:30")

  return (
    <div className="flex h-full flex-col">
      {/* top image header */}
      <div className="relative bg-primary px-5 pb-10 pt-2 text-primary-foreground">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold">Doctor Details</span>
          <button
            type="button"
            aria-label="Save doctor"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/15"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* scroll body */}
      <div className="-mt-6 flex-1 overflow-y-auto rounded-t-[2rem] bg-background px-5 pb-40 pt-6">
        {/* profile card */}
        <div className="flex items-center gap-4">
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-3xl border-4 border-card object-cover shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">{doctor.name}</h1>
            <p className="text-sm text-primary">{doctor.specialty}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {doctor.location} · {doctor.distanceKm} km
            </p>
          </div>
        </div>

        {/* stats */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Stat icon={Users} value={doctor.patients} label="Patients" />
          <Stat icon={Award} value={`${doctor.experienceYears} yrs`} label="Experience" />
          <Stat icon={Star} value={`${doctor.rating}`} label={`${doctor.reviews} reviews`} />
        </div>

        {/* about */}
        <section className="mt-6">
          <h2 className="text-sm font-bold text-foreground">About</h2>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{doctor.about}</p>
        </section>

        {/* calendar */}
        <section className="mt-6">
          <h2 className="text-sm font-bold text-foreground">Select Date</h2>
          <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {days.map((d, i) => (
              <button
                key={d.date}
                type="button"
                onClick={() => setActiveDay(i)}
                className={cn(
                  "flex w-14 shrink-0 flex-col items-center gap-1 rounded-2xl border py-3 text-xs font-semibold transition-colors",
                  activeDay === i
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground",
                )}
              >
                <span className={activeDay === i ? "text-primary-foreground/80" : "text-muted-foreground"}>
                  {d.label}
                </span>
                <span className="text-base">{d.date}</span>
              </button>
            ))}
          </div>
        </section>

        {/* time slots */}
        <section className="mt-6">
          <h2 className="text-sm font-bold text-foreground">Available Time</h2>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {slots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setActiveSlot(slot)}
                className={cn(
                  "rounded-xl border py-2.5 text-xs font-semibold transition-colors",
                  activeSlot === slot
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground",
                )}
              >
                {slot}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* sticky CTA */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border bg-card/95 px-5 pb-8 pt-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-[10px] text-muted-foreground">Consultation fee</p>
            <p className="text-lg font-bold text-foreground">
              ${doctor.fee}
              <span className="text-xs font-medium text-muted-foreground"> /visit</span>
            </p>
          </div>
          <button
            type="button"
            aria-label="Message doctor"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border text-primary"
          >
            <MessageCircle className="h-5 w-5" />
          </button>
          <button
            type="button"
            disabled={!activeSlot}
            onClick={() => activeSlot && onConfirm(doctor, `${days[activeDay].label} ${days[activeDay].date}`, activeSlot)}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground disabled:opacity-50"
          >
            <Check className="h-4 w-4" />
            Confirm Appointment
          </button>
        </div>
      </div>
    </div>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Users
  value: string
  label: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card py-3">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-sm font-bold text-foreground">{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}
