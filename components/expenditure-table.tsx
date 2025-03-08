"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, Search } from "lucide-react"

type Expenditure = {
  id: string
  department: string
  project: string
  amount: number
  date: string
  status: "Completed" | "In Progress" | "Planned"
}

const expenditures: Expenditure[] = [
  {
    id: "EXP-001",
    department: "Education",
    project: "School Renovation Program",
    amount: 4500000,
    date: "2023-08-15",
    status: "In Progress",
  },
  {
    id: "EXP-002",
    department: "Healthcare",
    project: "Medical Equipment Purchase",
    amount: 2800000,
    date: "2023-07-22",
    status: "Completed",
  },
  {
    id: "EXP-003",
    department: "Infrastructure",
    project: "Highway Expansion",
    amount: 12000000,
    date: "2023-09-05",
    status: "In Progress",
  },
  {
    id: "EXP-004",
    department: "Defense",
    project: "Security System Upgrade",
    amount: 3500000,
    date: "2023-06-30",
    status: "Completed",
  },
  {
    id: "EXP-005",
    department: "Social Services",
    project: "Community Support Program",
    amount: 1800000,
    date: "2023-10-12",
    status: "Planned",
  },
  {
    id: "EXP-006",
    department: "Technology",
    project: "Digital Transformation Initiative",
    amount: 5200000,
    date: "2023-11-01",
    status: "Planned",
  },
  {
    id: "EXP-007",
    department: "Environment",
    project: "Renewable Energy Project",
    amount: 7500000,
    date: "2023-08-28",
    status: "In Progress",
  },
]

export function ExpenditureTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredExpenditures = expenditures.filter(
    (exp) =>
      exp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenditures..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSearchTerm("")}>All Departments</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("Education")}>Education</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("Healthcare")}>Healthcare</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSearchTerm("Infrastructure")}>Infrastructure</DropdownMenuItem>
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
              <TableHead>ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Project</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenditures.map((exp) => (
              <TableRow key={exp.id}>
                <TableCell className="font-medium">{exp.id}</TableCell>
                <TableCell>{exp.department}</TableCell>
                <TableCell>{exp.project}</TableCell>
                <TableCell className="text-right">${exp.amount.toLocaleString()}</TableCell>
                <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <StatusBadge status={exp.status} />
                </TableCell>
              </TableRow>
            ))}
            {filteredExpenditures.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No expenditures found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: Expenditure["status"] }) {
  const getStatusStyles = () => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Planned":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyles()}`}>{status}</span>
}

