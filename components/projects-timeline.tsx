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
    name: "Central Park Renovation",
    department: "Parks & Recreation",
    startDate: "2023-03-15",
    endDate: "2024-06-30",
    status: "On Track",
    milestones: [
      {
        date: "2023-03-15",
        title: "Project Kickoff",
        description: "Initial planning and resource allocation",
        completed: true,
      },
      {
        date: "2023-05-20",
        title: "Design Approval",
        description: "Final designs approved by city council",
        completed: true,
      },
      {
        date: "2023-08-10",
        title: "Phase 1 Construction",
        description: "Playground and walking paths renovation",
        completed: true,
      },
      {
        date: "2023-12-05",
        title: "Phase 2 Construction",
        description: "Lake area and botanical gardens renovation",
        completed: false,
      },
      {
        date: "2024-03-15",
        title: "Phase 3 Construction",
        description: "Amphitheater and event spaces renovation",
        completed: false,
      },
      {
        date: "2024-06-30",
        title: "Project Completion",
        description: "Final inspections and grand reopening",
        completed: false,
      },
    ],
  },
  {
    id: "PRJ-004",
    name: "Smart Traffic System Implementation",
    department: "Transportation",
    startDate: "2023-06-20",
    endDate: "2025-01-31",
    status: "On Track",
    milestones: [
      {
        date: "2023-06-20",
        title: "Project Initiation",
        description: "Contract signing and initial planning",
        completed: true,
      },
      {
        date: "2023-08-15",
        title: "Infrastructure Assessment",
        description: "Evaluation of existing traffic infrastructure",
        completed: true,
      },
      {
        date: "2023-11-10",
        title: "Phase 1 Installation",
        description: "Smart traffic lights in downtown area",
        completed: false,
      },
      {
        date: "2024-04-25",
        title: "Phase 2 Installation",
        description: "Expansion to major arterial roads",
        completed: false,
      },
      {
        date: "2024-09-15",
        title: "System Integration",
        description: "Integration with emergency services and public transit",
        completed: false,
      },
      {
        date: "2025-01-31",
        title: "Project Completion",
        description: "Final testing and handover",
        completed: false,
      },
    ],
  },
  {
    id: "PRJ-003",
    name: "Public Library Expansion",
    department: "Education",
    startDate: "2022-09-05",
    endDate: "2023-08-15",
    status: "Completed",
    milestones: [
      {
        date: "2022-09-05",
        title: "Project Launch",
        description: "Groundbreaking ceremony and initial construction",
        completed: true,
      },
      {
        date: "2022-11-20",
        title: "Foundation Completion",
        description: "Structural foundation work completed",
        completed: true,
      },
      {
        date: "2023-02-10",
        title: "Building Exterior",
        description: "Exterior walls and roofing completed",
        completed: true,
      },
      {
        date: "2023-04-30",
        title: "Interior Construction",
        description: "Interior walls, electrical, and plumbing completed",
        completed: true,
      },
      {
        date: "2023-06-25",
        title: "Furnishing and Equipment",
        description: "Installation of shelving, furniture, and technology",
        completed: true,
      },
      {
        date: "2023-08-15",
        title: "Grand Opening",
        description: "Ribbon cutting ceremony and public opening",
        completed: true,
      },
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
                  {expandedProject === project.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
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
                          milestone.completed
                            ? "border-primary bg-primary-foreground"
                            : "border-muted-foreground bg-background"
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

