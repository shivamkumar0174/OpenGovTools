"use client"

import { useEffect, useState } from "react"

export function BudgetChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  // This is a placeholder for a real chart component
  // In a real application, you would use a charting library like Recharts, Chart.js, or D3.js
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-2">
        <BudgetBar label="Education" percentage={28} color="bg-blue-500" />
        <BudgetBar label="Healthcare" percentage={22} color="bg-green-500" />
        <BudgetBar label="Infrastructure" percentage={18} color="bg-yellow-500" />
        <BudgetBar label="Defense" percentage={15} color="bg-red-500" />
        <BudgetBar label="Other" percentage={17} color="bg-purple-500" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mt-2 text-xs text-center">
        <div>
          Education
          <br />
          28%
        </div>
        <div>
          Healthcare
          <br />
          22%
        </div>
        <div>
          Infrastructure
          <br />
          18%
        </div>
        <div>
          Defense
          <br />
          15%
        </div>
        <div>
          Other
          <br />
          17%
        </div>
      </div>
    </div>
  )
}

function BudgetBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex items-end">
        <div
          className={`w-full rounded-t-md ${color}`}
          style={{ height: `${percentage * 3}px` }}
          aria-label={`${label}: ${percentage}%`}
        />
      </div>
    </div>
  )
}

