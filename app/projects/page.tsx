import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectsMap } from "@/components/projects-map"
import { ProjectsTable } from "@/components/projects-table"
import { ProjectsTimeline } from "@/components/projects-timeline"

export default function ProjectsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Public Project Tracking</h1>
        <p className="text-muted-foreground">
          Interactive dashboards to monitor public policies and projects with detailed analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Projects" value="42" description="Across 8 departments" />
        <StatCard title="Total Budget Allocated" value="$328.5M" description="For current fiscal year" />
        <StatCard title="Completion Rate" value="76%" description="Projects completed on time" />
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Geographic View</TabsTrigger>
          <TabsTrigger value="list">Project List</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Locations</CardTitle>
              <CardDescription>Geographic distribution of public projects across the region.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] p-0">
              <ProjectsMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Directory</CardTitle>
              <CardDescription>Comprehensive list of all public projects with status and details.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Chronological view of project milestones and progress.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectsTimeline />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  )
}

