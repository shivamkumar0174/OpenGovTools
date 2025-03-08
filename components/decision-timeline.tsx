"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useState } from "react"

type Decision = {
  id: string
  title: string
  description: string
  date: string
  status: "Proposed" | "Under Review" | "Approved" | "Implemented" | "Rejected"
  department: string
  documents?: { name: string; url: string }[]
}

const decisions: Decision[] = [
  {
    id: "DEC-001",
    title: "Urban Development Plan 2025",
    description:
      "Comprehensive plan for sustainable urban development focusing on green spaces, public transportation, and affordable housing.",
    date: "2023-11-15",
    status: "Under Review",
    department: "Urban Planning",
    documents: [
      { name: "Draft Plan", url: "#" },
      { name: "Environmental Impact Assessment", url: "#" },
    ],
  },
  {
    id: "DEC-002",
    title: "Public Education Reform",
    description:
      "Reform initiative to modernize curriculum, improve teacher training, and enhance digital learning resources.",
    date: "2023-10-05",
    status: "Approved",
    department: "Education",
    documents: [
      { name: "Reform Proposal", url: "#" },
      { name: "Budget Allocation", url: "#" },
    ],
  },
  {
    id: "DEC-003",
    title: "Healthcare Access Expansion",
    description:
      "Program to increase healthcare access in rural areas through mobile clinics and telemedicine services.",
    date: "2023-09-22",
    status: "Implemented",
    department: "Health",
    documents: [{ name: "Implementation Report", url: "#" }],
  },
  {
    id: "DEC-004",
    title: "Renewable Energy Incentives",
    description: "Tax incentives and subsidies for businesses and households adopting renewable energy solutions.",
    date: "2023-11-30",
    status: "Proposed",
    department: "Energy",
    documents: [
      { name: "Proposal Document", url: "#" },
      { name: "Economic Impact Study", url: "#" },
    ],
  },
  {
    id: "DEC-005",
    title: "Public Transportation Fare Restructuring",
    description:
      "Proposal to adjust public transportation fares to make them more affordable for low-income residents.",
    date: "2023-08-10",
    status: "Rejected",
    department: "Transportation",
    documents: [
      { name: "Original Proposal", url: "#" },
      { name: "Rejection Rationale", url: "#" },
    ],
  },
]

export function DecisionTimeline() {
  const [expandedDecision, setExpandedDecision] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedDecision(expandedDecision === id ? null : id)
  }

  const getStatusColor = (status: Decision["status"]) => {
    switch (status) {
      case "Proposed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "Under Review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      case "Implemented":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    }
  }

  return (
    <div className="space-y-4">
      {decisions.map((decision) => (
        <Card key={decision.id} className="relative">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{decision.title}</CardTitle>
                <CardDescription>
                  {decision.department} • {new Date(decision.date).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(decision.status)}>{decision.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{decision.description}</p>

            {expandedDecision === decision.id && decision.documents && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium">Related Documents</h4>
                <ul className="space-y-1">
                  {decision.documents.map((doc) => (
                    <li key={doc.name} className="text-sm">
                      <a
                        href={doc.url}
                        className="text-primary hover:underline flex items-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.name}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {decision.documents && decision.documents.length > 0 && (
              <Button variant="ghost" size="sm" className="mt-2 h-8 text-xs" onClick={() => toggleExpand(decision.id)}>
                {expandedDecision === decision.id ? (
                  <>
                    <ChevronUp className="mr-1 h-3 w-3" />
                    Hide Documents
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-3 w-3" />
                    View Documents ({decision.documents.length})
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

