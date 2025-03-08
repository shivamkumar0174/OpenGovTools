"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type Project = {
  id: string
  name: string
  department: string
  location: string
  budget: number
  startDate: string
  endDate: string
  progress: number
  status: "On Track" | "Delayed" | "Completed" | "On Hold"
}

const projects: Project[] = [
  {
    id: "PRJ-001",
    name: "Central Park Renovation",
    department: "Parks & Recreation",
    location: "Downtown",
    budget: 12500000,
    startDate: "2023-03-15",
    endDate: "2024-06-30",
    progress: 45,
    status: "On Track",
  },
  {
    id: "PRJ-002",
    name: "Main Street Bridge Repair",
    department: "Infrastructure",
    location: "Riverside",
    budget: 8700000,
    startDate: "2023-01-10",
    endDate: "2023-11-30",
    progress: 85,
    status: "Delayed",
  },
  {
    id: "PRJ-003",
    name: "Public Library Expansion",
    department: "Education",
    location: "Midtown",
    budget: 5200000,
    startDate: "2022-09-05",
    endDate: "2023-08-15",
    progress: 100,
    status: "Completed",
  },
  {
    id: "PRJ-004",
    name: "Smart Traffic System Implementation",
    department: "Transportation",
    location: "Citywide",
    budget: 15800000,
    startDate: "2023-06-20",
    endDate: "2025-01-31",
    progress: 25,
    status: "On Track",
  },
  {
    id: "PRJ-005",
    name: "Community Health Center",
    department: "Health",
    location: "Northside",
    budget: 9300000,
    startDate: "2023-04-12",
    endDate: "2024-05-20",
    progress: 35,
    status: "On Track",
  },
  {
    id: "PRJ-006",
    name: "Affordable Housing Development",
    department: "Housing",
    location: "Eastside",
    budget: 22000000,
    startDate: "2023-02-28",
    endDate: "2025-03-15",
    progress: 30,
    status: "On Hold",
  },
  {
    id: "PRJ-007",
    name: "Solar Power Installation",
    department: "Energy",
    location: "Industrial District",
    budget: 7500000,
    startDate: "2022-11-10",
    endDate: "2023-10-05",
    progress: 90,
    status: "On Track",
  },
]

export function ProjectsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === null || project.status === statusFilter),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {statusFilter || "All Statuses"}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("On Track")}>On Track</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Delayed")}>Delayed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Completed")}>Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("On Hold")}>On Hold</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download data</span>
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div>{project.name}</div>
                  <div className="text-xs text-muted-foreground">{project.id}</div>
                </TableCell>
                <TableCell>{project.department}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell className="text-right">${project.budget.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="text-xs">
                    {new Date(project.startDate).toLocaleDateString()} -{new Date(project.endDate).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-2" />
                    <span className="text-xs">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>
              </TableRow>
            ))}
            {filteredProjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  No projects found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const getStatusStyles = () => {
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

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>{status}</span>
}

