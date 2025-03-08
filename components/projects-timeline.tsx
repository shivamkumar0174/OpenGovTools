"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

type TimelineProject = {
  id: string
  name: string
  department: string
  startDate: string
  endDate: string
  milestones: {
    date: string
    title: string
    description: string
    completed: boolean
  }[]
  status: "On Track" | "Delayed" | "Completed" | "On Hold"
}

const timelineProjects: TimelineProject[] = [
  {
    id: "PRJ-001",
    name: "Mumbai Metro Expansion",
    department: "Urban Development",
    startDate: "2023-04-01",
    endDate: "2025-12-31",
    status: "On Track",
    milestones: [
      { date: "2023-04-01", title: "Project Approval", description: "Government approval and funding allocation", completed: true },
      { date: "2023-07-15", title: "Land Acquisition", description: "Land cleared for metro stations", completed: true },
      { date: "2024-01-10", title: "Phase 1 Construction", description: "Initial track laying and station framework", completed: false },
      { date: "2024-09-30", title: "Rolling Stock Arrival", description: "Metro trains imported and tested", completed: false },
      { date: "2025-06-15", title: "Final Testing", description: "Safety tests and trial runs", completed: false },
      { date: "2025-12-31", title: "Project Completion", description: "Metro line inauguration", completed: false },
    ],
  },
  {
    id: "PRJ-002",
    name: "Smart Traffic Management - Delhi",
    department: "Transport & Traffic Control",
    startDate: "2023-06-10",
    endDate: "2026-03-31",
    status: "On Track",
    milestones: [
      { date: "2023-06-10", title: "Project Kickoff", description: "Collaboration with AI-based traffic monitoring firms", completed: true },
      { date: "2023-12-05", title: "Pilot Phase", description: "Testing AI-controlled traffic signals in Connaught Place", completed: true },
      { date: "2024-08-15", title: "Phase 1 Implementation", description: "Expansion to major intersections", completed: false },
      { date: "2025-01-30", title: "Public Awareness Campaign", description: "Educating commuters about the new system", completed: false },
      { date: "2025-10-20", title: "Citywide Integration", description: "Integration with emergency and public transport systems", completed: false },
      { date: "2026-03-31", title: "Final Rollout", description: "Full implementation across Delhi", completed: false },
    ],
  },
  {
    id: "PRJ-003",
    name: "Ganga River Cleaning Project",
    department: "Environmental Affairs",
    startDate: "2022-05-01",
    endDate: "2024-12-31",
    status: "Completed",
    milestones: [
      { date: "2022-05-01", title: "Project Initiation", description: "Formation of Namami Gange task force", completed: true },
      { date: "2022-10-15", title: "Sewage Treatment Plants", description: "Construction of 15 new STPs", completed: true },
      { date: "2023-03-10", title: "Industrial Waste Regulations", description: "Stricter pollution control policies", completed: true },
      { date: "2023-08-25", title: "Community Awareness", description: "Workshops in cities along the Ganga", completed: true },
      { date: "2024-06-10", title: "Final Water Quality Check", description: "Improved water quality reports", completed: true },
      { date: "2024-12-31", title: "Project Closure", description: "Evaluation and final report submission", completed: true },
    ],
  },
]

export function ProjectsTimeline() {
  const [expandedProject, setExpandedProject] = useState<string | null>("PRJ-001")

  const toggleExpand = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id)
  }

  const getStatusColor = (status: TimelineProject["status"]) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Delayed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "On Hold":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {timelineProjects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 flex justify-between items-center border-b">
              <div>
                <h3 className="font-medium">{project.name}</h3>
                <p className="text-sm text-muted-foreground">{project.department}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <Button variant="ghost" size="sm" onClick={() => toggleExpand(project.id)}>
                  {expandedProject === project.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {expandedProject === project.id && (
              <div className="p-4">
                <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-0 before:h-full before:w-0.5 before:bg-border">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div
                        className={`absolute left-[-24px] top-0 h-6 w-6 rounded-full border-4 ${
                          milestone.completed ? "border-primary bg-primary-foreground" : "border-muted-foreground bg-background"
                        }`}
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(milestone.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
