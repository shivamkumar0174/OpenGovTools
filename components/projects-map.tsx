"use client"

import { useEffect, useState } from "react"

export function ProjectsMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    )
  }

  // This is a placeholder for a real map component
  // In a real application, you would use a mapping library like Mapbox, Leaflet, or Google Maps
  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 relative">
      <img
        src="/placeholder.svg?height=500&width=1000"
        alt="Map of project locations"
        className="w-full h-full object-cover"
      />

      {/* Simulated map markers */}
      <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
        8
      </div>

      <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
        12
      </div>

      <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
        6
      </div>

      <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
        4
      </div>

      <div className="absolute bottom-1/4 left-1/4 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
        10
      </div>

      {/* Map legend */}
      <div className="absolute bottom-4 right-4 bg-background/90 p-3 rounded-md shadow-md">
        <h4 className="text-sm font-medium mb-2">Project Count</h4>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-xs">1-5 Projects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-full"></div>
          <span className="text-xs">6-10 Projects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-primary rounded-full"></div>
          <span className="text-xs">10+ Projects</span>
        </div>
      </div>
    </div>
  )
}

