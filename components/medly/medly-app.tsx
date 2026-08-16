"use client"

import { useState } from "react"
import { PhoneFrame, StatusBar } from "./phone-frame"
import { BottomNav, type TabId } from "./bottom-nav"
import { HomeScreen } from "./home-screen"
import { BookingListScreen } from "./booking-list-screen"
import { DoctorProfileScreen } from "./doctor-profile-screen"
import { LabResultsScreen } from "./lab-results-screen"
import { PharmacyScreen } from "./pharmacy-screen"
import { ProfileScreen } from "./profile-screen"
import { QrSheet, ConfirmationModal } from "./overlays"
import type { Doctor } from "@/lib/medly-data"

// A "dark" status bar shows on non-header screens over the primary header on home/profile
const darkStatusScreens: TabId[] = ["home"]

export function MedlyApp() {
  const [tab, setTab] = useState<TabId>("home")
  const [openDoctorId, setOpenDoctorId] = useState<string | null>(null)
  const [qrOpen, setQrOpen] = useState(false)
  const [confirmation, setConfirmation] = useState<{ doctor: Doctor; day: string; slot: string } | null>(null)

  const showDoctorProfile = openDoctorId !== null
  const statusOnPrimary = showDoctorProfile || darkStatusScreens.includes(tab)

  const handleNavigate = (next: TabId) => {
    setOpenDoctorId(null)
    setTab(next)
  }

  return (
    <PhoneFrame>
      {/* status bar adapts color to what's behind it */}
      <div className={statusOnPrimary ? "bg-primary" : "bg-background"}>
        <div className={statusOnPrimary ? "text-primary-foreground" : "text-foreground"}>
          <StatusBar />
        </div>
      </div>

      <div className="relative h-[calc(100%-2.25rem)]">
        {showDoctorProfile ? (
          <DoctorProfileScreen
            doctorId={openDoctorId}
            onBack={() => setOpenDoctorId(null)}
            onConfirm={(doctor, day, slot) => {
              setOpenDoctorId(null)
              setConfirmation({ doctor, day, slot })
            }}
          />
        ) : (
          <>
            {tab === "home" && (
              <HomeScreen
                onNavigate={handleNavigate}
                onOpenDoctor={(id) => setOpenDoctorId(id)}
                onOpenQr={() => setQrOpen(true)}
              />
            )}
            {tab === "appointments" && <BookingListScreen onOpenDoctor={(id) => setOpenDoctorId(id)} />}
            {tab === "labs" && <LabResultsScreen />}
            {tab === "pharmacy" && <PharmacyScreen />}
            {tab === "profile" && <ProfileScreen onOpenQr={() => setQrOpen(true)} />}

            <BottomNav active={tab} onChange={handleNavigate} />
          </>
        )}

        <QrSheet open={qrOpen} onClose={() => setQrOpen(false)} />
        <ConfirmationModal data={confirmation} onClose={() => setConfirmation(null)} />
      </div>
    </PhoneFrame>
  )
}
