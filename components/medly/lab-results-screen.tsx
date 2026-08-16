"use client"

import {
  FlaskConical,
  Download,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  FileText,
  TrendingUp,
} from "lucide-react"
import { labResults, type LabResult } from "@/lib/medly-data"
import { cn } from "@/lib/utils"

const flagStyles: Record<LabResult["flag"], { badge: string; label: string }> = {
  Normal: { badge: "bg-success/15 text-success", label: "Normal" },
  Review: { badge: "bg-warning/20 text-warning", label: "Needs review" },
  Pending: { badge: "bg-muted text-muted-foreground", label: "Processing" },
}

export function LabResultsScreen() {
  return (
    <div className="h-full overflow-y-auto px-5 pb-28 pt-4">
      <header className="pt-2">
        <h1 className="text-xl font-bold text-foreground">Lab Results</h1>
        <p className="text-sm text-muted-foreground">Your recent tests and reports</p>
      </header>

      {/* summary banner */}
      <div className="mt-4 flex items-center gap-3 rounded-3xl bg-gradient-to-br from-primary to-chart-4 p-4 text-primary-foreground">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/20">
          <TrendingUp className="h-6 w-6" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold">Overall health looks good</p>
          <p className="text-xs text-primary-foreground/80">1 result needs your attention</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Recent Reports</h2>
        <span className="text-xs text-muted-foreground">{labResults.length} total</span>
      </div>

      <ul className="mt-3 space-y-3">
        {labResults.map((result) => {
          const isReady = result.status === "Ready"
          const flag = flagStyles[result.flag]
          const StatusIcon =
            result.flag === "Normal" ? CheckCircle2 : result.flag === "Review" ? AlertTriangle : Loader2
          return (
            <li
              key={result.id}
              className="rounded-3xl border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                    isReady ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                  )}
                >
                  <FlaskConical className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-tight text-foreground">{result.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {result.lab} · {result.date}
                  </p>
                  <span
                    className={cn(
                      "mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                      flag.badge,
                    )}
                  >
                    <StatusIcon className={cn("h-3 w-3", result.flag === "Pending" && "animate-spin")} />
                    {flag.label}
                  </span>
                </div>
              </div>

              {isReady && (
                <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                  <button
                    type="button"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-2.5 text-xs font-semibold text-foreground"
                  >
                    <Download className="h-4 w-4" />
                    PDF
                  </button>
                </div>
              )}
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border py-3 text-xs font-semibold text-muted-foreground"
      >
        <FileText className="h-4 w-4" />
        Upload a report
      </button>
    </div>
  )
}
