"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Search, Star, MapPin, Clock, ChevronRight, CalendarCheck, Plus, X } from "lucide-react"
import { supabase } from "@/lib/supabase"

type Doctor = {
  id: string
  name: string
  specialty: string
  city: string
  photo_url: string | null
  distance_km: number | null
  experience_years: number | null
  rating: number | null
  fee: number | null
}

type Appointment = {
  id: string
  appointment_date: string
  appointment_time: string
  status: string
  doctors: { name: string; specialty: string } | null
}

export function BookingListScreen({ onOpenDoctor }: { onOpenDoctor: (id: string) => void }) {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [specialties, setSpecialties] = useState<string[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    city: "",
    photo_url: "",
    fee: "",
  })

  async function fetchDoctors() {
    const { data, error } = await supabase.from("doctors").select("*")
    if (error) {
      console.error("Error fetching doctors:", error)
    } else if (data) {
      setDoctors(data)
      const uniqueSpecialties = Array.from(new Set(data.map((d) => d.specialty)))
      setSpecialties(uniqueSpecialties)
    }
    setLoading(false)
  }

  async function fetchAppointments() {
    const { data, error } = await supabase
      .from("appointments")
      .select("id, appointment_date, appointment_time, status, doctors(name, specialty)")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching appointments:", error)
    } else if (data) {
      setAppointments(data as unknown as Appointment[])
    }
  }

  useEffect(() => {
    fetchDoctors()
    fetchAppointments()
  }, [])

  async function handleAddDoctor() {
    if (!form.name || !form.specialty || !form.city) {
      alert("Please fill in at least name, specialty, and city.")
      return
    }

    setSaving(true)
    const { error } = await supabase.from("doctors").insert({
      name: form.name,
      specialty: form.specialty,
      city: form.city,
      photo_url: form.photo_url || null,
      fee: form.fee ? Number(form.fee) : null,
    })
    setSaving(false)

    if (error) {
      alert("Error adding doctor: " + error.message)
    } else {
      setForm({ name: "", specialty: "", city: "", photo_url: "", fee: "" })
      setShowAddForm(false)
      fetchDoctors()
    }
  }

  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-4">
      <header className="flex items-start justify-between pt-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-sm text-muted-foreground">Find the right specialist for you</p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm((v) => !v)}
          className="flex items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"
        >
          {showAddForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {showAddForm ? "Cancel" : "Add Doctor"}
        </button>
      </header>

      {showAddForm && (
        <div className="mt-4 space-y-2.5 rounded-2xl border border-border bg-card p-4">
          <input
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none"
            placeholder="Doctor name (e.g. Dr. John Smith)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none"
            placeholder="Specialty (e.g. Neurologist)"
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none"
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none"
            placeholder="Photo URL (optional)"
            value={form.photo_url}
            onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none"
            placeholder="Fee (e.g. 40)"
            type="number"
            value={form.fee}
            onChange={(e) => setForm({ ...form, fee: e.target.value })}
          />
          <button
            type="button"
            onClick={handleAddDoctor}
            disabled={saving}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Doctor"}
          </button>
        </div>
      )}

      {/* Your appointments */}
      {appointments.length > 0 && (
        <section className="mt-4">
          <h2 className="text-sm font-bold text-foreground">Your Appointments</h2>
          <ul className="mt-2 space-y-2">
            {appointments.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">
                    {a.doctors?.name ?? "Unknown doctor"}
                  </p>
                  <p className="text-xs text-primary">{a.doctors?.specialty}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {a.appointment_date} · {a.appointment_time} ·{" "}
                    <span className="capitalize">{a.status}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

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

      <p className="mt-5 text-xs font-semibold text-muted-foreground">
        {loading ? "Loading..." : `${doctors.length} doctors available`}
      </p>

      <ul className="mt-3 space-y-3">
        {doctors.map((doc) => (
          <li key={doc.id}>
            <button
              type="button"
              onClick={() => onOpenDoctor(doc.id)}
              className="flex w-full items-center gap-3 rounded-3xl border border-border bg-card p-3 text-left"
            >
              <Image
                src={doc.photo_url || "/placeholder-user.jpg"}
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
                    {doc.rating ?? "—"}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" />
                    {doc.distance_km ?? "—"} km
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="h-3 w-3" />
                    {doc.experience_years ?? "—"} yrs
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