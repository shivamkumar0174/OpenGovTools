"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { format } from "date-fns"

type ActivityItem = {
  id: string
  type: "login" | "report" | "comment" | "view" | "download"
  description: string
  date: Date
  status?: "pending" | "resolved" | "rejected"
}

// Sample activity data
const activityData: ActivityItem[] = [
  {
    id: "ACT-001",
    type: "login",
    description: "Logged in from Chrome on Windows",
    date: new Date(2023, 10, 28, 9, 30),
  },
  {
    id: "ACT-002",
    type: "report",
    description: "Submitted report about pothole on Main Street",
    date: new Date(2023, 10, 25, 14, 15),
    status: "pending",
  },
  {
    id: "ACT-003",
    type: "comment",
    description: "Commented on Central Park Renovation project",
    date: new Date(2023, 10, 22, 11, 45),
  },
  {
    id: "ACT-004",
    type: "view",
    description: "Viewed budget allocation data for Education department",
    date: new Date(2023, 10, 20, 16, 30),
  },
  {
    id: "ACT-005",
    type: "download",
    description: "Downloaded expenditure report for Q3 2023",
    date: new Date(2023, 10, 18, 10, 0),
  },
  {
    id: "ACT-006",
    type: "report",
    description: "Submitted report about street light outage on Oak Avenue",
    date: new Date(2023, 10, 15, 19, 20),
    status: "resolved",
  },
  {
    id: "ACT-007",
    type: "login",
    description: "Logged in from Safari on macOS",
    date: new Date(2023, 10, 12, 8, 45),
  },
  {
    id: "ACT-008",
    type: "report",
    description: "Submitted report about graffiti in Community Park",
    date: new Date(2023, 10, 10, 13, 10),
    status: "rejected",
  },
]

export function ActivityHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activityType, setActivityType] = useState<string | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter activities based on search, type, and date
  const filteredActivities = activityData.filter((activity) => {
    const matchesSearch = activity.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = activityType ? activity.type === activityType : true
    const matchesDate = date
      ? activity.date.getDate() === date.getDate() &&
        activity.date.getMonth() === date.getMonth() &&
        activity.date.getFullYear() === date.getFullYear()
      : true

    return matchesSearch && matchesType && matchesDate
  })

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const paginatedActivities = filteredActivities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Reset pagination when filters change
  const handleFilterChange = () => {
    setCurrentPage(1)
  }

  // Get badge color based on activity type
  const getActivityBadge = (type: ActivityItem["type"]) => {
    switch (type) {
      case "login":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            Login
          </Badge>
        )
      case "report":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
            Report
          </Badge>
        )
      case "comment":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Comment
          </Badge>
        )
      case "view":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
            View
          </Badge>
        )
      case "download":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
            Download
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Get status badge color
  const getStatusBadge = (status?: ActivityItem["status"]) => {
    if (!status) return null

    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            Pending
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            Resolved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              handleFilterChange()
            }}
          />
        </div>

        <Select
          value={activityType || ""}
          onValueChange={(value) => {
            setActivityType(value || null)
            handleFilterChange()
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All activities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All activities</SelectItem>
            <SelectItem value="login">Logins</SelectItem>
            <SelectItem value="report">Reports</SelectItem>
            <SelectItem value="comment">Comments</SelectItem>
            <SelectItem value="view">Views</SelectItem>
            <SelectItem value="download">Downloads</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                setDate(date)
                handleFilterChange()
              }}
              initialFocus
            />
            {date && (
              <div className="p-3 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setDate(null)
                    handleFilterChange()
                  }}
                >
                  Clear date
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedActivities.length > 0 ? (
              paginatedActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{getActivityBadge(activity.type)}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{format(activity.date, "PPP p")}</TableCell>
                  <TableCell>{getStatusBadge(activity.status)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  No activities found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredActivities.length)} of {filteredActivities.length} activities
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

