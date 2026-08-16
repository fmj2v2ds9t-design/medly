import Image from "next/image"
import { MapPin, Cross, Pill, Building2, Navigation } from "lucide-react"
import { mapPlaces, type MapPlace } from "@/lib/medly-data"

const iconFor = (type: MapPlace["type"]) => {
  if (type === "pharmacy") return Pill
  if (type === "hospital") return Building2
  return Cross
}

export function NearbyMap() {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-3xl border border-border">
      <Image
        src="/city-map.png"
        alt="Map of nearby clinics and pharmacies"
        fill
        className="object-cover"
        sizes="400px"
      />
      <div className="absolute inset-0 bg-primary/5" aria-hidden="true" />

      {mapPlaces.map((place) => {
        const Icon = iconFor(place.type)
        return (
          <div
            key={place.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-lg">
              <Icon className="h-4 w-4" strokeWidth={2.4} />
            </span>
            <span className="mt-1 rounded-full bg-card/95 px-1.5 py-0.5 text-[8px] font-semibold text-foreground shadow-sm">
              {place.name}
            </span>
          </div>
        )
      })}

      {/* current location dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="relative flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-4/60" />
          <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-card bg-chart-4" />
        </span>
      </div>

      <button
        type="button"
        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-card px-3 py-2 text-xs font-semibold text-foreground shadow-lg"
      >
        <Navigation className="h-3.5 w-3.5 text-primary" />
        Recenter
      </button>

      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-[10px] font-medium text-foreground shadow-sm">
        <MapPin className="h-3 w-3 text-primary" />4 places nearby
      </div>
    </div>
  )
}
