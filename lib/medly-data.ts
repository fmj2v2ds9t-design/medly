export type Doctor = {
  id: string
  name: string
  specialty: string
  image: string
  rating: number
  reviews: number
  location: string
  distanceKm: number
  experienceYears: number
  patients: string
  fee: number
  about: string
}

export const doctors: Doctor[] = [
  {
    id: "sarah-chen",
    name: "Dr. Sarah Chen",
    specialty: "Cardiologist",
    image: "/doctors/dr-sarah-chen.png",
    rating: 4.9,
    reviews: 428,
    location: "Riverside Heart Center",
    distanceKm: 1.2,
    experienceYears: 12,
    patients: "3.2k",
    fee: 65,
    about:
      "Board-certified cardiologist specializing in preventive heart care, arrhythmia management, and echocardiography. Known for a calm, thorough bedside manner.",
  },
  {
    id: "james-okoro",
    name: "Dr. James Okoro",
    specialty: "Dermatologist",
    image: "/doctors/dr-james-okoro.png",
    rating: 4.8,
    reviews: 312,
    location: "Clearskin Clinic",
    distanceKm: 2.4,
    experienceYears: 9,
    patients: "2.7k",
    fee: 55,
    about:
      "Dermatologist focused on medical and cosmetic skin health, acne treatment, and early skin-cancer screening with a patient-first approach.",
  },
  {
    id: "priya-nair",
    name: "Dr. Priya Nair",
    specialty: "Pediatrician",
    image: "/doctors/dr-priya-nair.png",
    rating: 5.0,
    reviews: 511,
    location: "Little Steps Children's Clinic",
    distanceKm: 0.8,
    experienceYears: 14,
    patients: "4.1k",
    fee: 50,
    about:
      "Compassionate pediatrician caring for newborns to teens, with special interest in childhood nutrition, vaccinations, and developmental checkups.",
  },
  {
    id: "marcus-lee",
    name: "Dr. Marcus Lee",
    specialty: "Neurologist",
    image: "/doctors/dr-marcus-lee.png",
    rating: 4.7,
    reviews: 276,
    location: "NeuroCare Institute",
    distanceKm: 3.1,
    experienceYears: 21,
    patients: "5.6k",
    fee: 80,
    about:
      "Senior neurologist treating migraines, epilepsy, and movement disorders. Combines advanced diagnostics with clear, reassuring guidance.",
  },
]

export type Appointment = {
  id: string
  doctorId: string
  date: string
  time: string
  mode: "In-person" | "Video call"
}

export const upcomingAppointment: Appointment = {
  id: "apt-1",
  doctorId: "sarah-chen",
  date: "Mon, 16 Feb",
  time: "10:30 AM",
  mode: "In-person",
}

export type Prescription = {
  id: string
  doctorName: string
  specialty: string
  issuedDate: string
  diagnosis: string
  medicines: {
    name: string
    dosage: string
    frequency: string
    duration: string
  }[]
}

export const prescription: Prescription = {
  id: "rx-4821",
  doctorName: "Dr. Sarah Chen",
  specialty: "Cardiologist",
  issuedDate: "12 Feb 2025",
  diagnosis: "Mild hypertension — follow-up in 4 weeks",
  medicines: [
    {
      name: "Amlodipine",
      dosage: "5 mg",
      frequency: "Once daily",
      duration: "30 days",
    },
    {
      name: "Atorvastatin",
      dosage: "10 mg",
      frequency: "Once at night",
      duration: "30 days",
    },
    {
      name: "Aspirin",
      dosage: "75 mg",
      frequency: "Once daily",
      duration: "30 days",
    },
  ],
}

export type LabResult = {
  id: string
  title: string
  lab: string
  date: string
  status: "Ready" | "Processing"
  flag: "Normal" | "Review" | "Pending"
}

export const labResults: LabResult[] = [
  {
    id: "lab-1",
    title: "Complete Blood Count (CBC)",
    lab: "Riverside Diagnostics",
    date: "Today, 9:14 AM",
    status: "Ready",
    flag: "Normal",
  },
  {
    id: "lab-2",
    title: "Lipid Profile",
    lab: "Riverside Diagnostics",
    date: "Yesterday",
    status: "Ready",
    flag: "Review",
  },
  {
    id: "lab-3",
    title: "Thyroid Function (TSH, T3, T4)",
    lab: "MetroLab",
    date: "10 Feb 2025",
    status: "Ready",
    flag: "Normal",
  },
  {
    id: "lab-4",
    title: "Vitamin D & B12 Panel",
    lab: "MetroLab",
    date: "Processing",
    status: "Processing",
    flag: "Pending",
  },
]

export type Pharmacy = {
  id: string
  name: string
  distanceKm: number
  eta: string
  open: boolean
}

export const pharmacies: Pharmacy[] = [
  { id: "ph-1", name: "Wellness Pharmacy", distanceKm: 0.4, eta: "25 min", open: true },
  { id: "ph-2", name: "CityCare Drugstore", distanceKm: 1.1, eta: "40 min", open: true },
  { id: "ph-3", name: "GreenCross Pharmacy", distanceKm: 2.0, eta: "55 min", open: false },
]

export type MapPlace = {
  id: string
  name: string
  type: "clinic" | "pharmacy" | "hospital"
  x: number
  y: number
}

export const mapPlaces: MapPlace[] = [
  { id: "m1", name: "Riverside Heart Center", type: "clinic", x: 28, y: 34 },
  { id: "m2", name: "Wellness Pharmacy", type: "pharmacy", x: 62, y: 46 },
  { id: "m3", name: "City General Hospital", type: "hospital", x: 46, y: 68 },
  { id: "m4", name: "Little Steps Clinic", type: "clinic", x: 74, y: 26 },
]

export const specialties = [
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Neurology",
  "Dentist",
  "General",
]
