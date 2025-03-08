import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectsMap } from "@/components/projects-map";
import { ProjectsTable } from "@/components/projects-table";
import { ProjectsTimeline } from "@/components/projects-timeline";

export default function ProjectsPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Government Schemes & Project Tracker</h1>
        <p className="text-muted-foreground">
          Track and analyze major government initiatives and infrastructure projects across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Ongoing Projects" value="128" description="Across 20+ ministries" />
        <StatCard title="Total Budget Allocated" value="₹2,500 Cr" description="For current fiscal year" />
        <StatCard title="Completion Rate" value="68%" description="Projects completed as per schedule" />
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">State-wise Implementation</TabsTrigger>
          <TabsTrigger value="list">Government Initiatives</TabsTrigger>
          <TabsTrigger value="timeline">Project Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Locations</CardTitle>
              <CardDescription>State and district-wise distribution of government schemes.</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] p-0">
              <ProjectsMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Government Initiatives</CardTitle>
              <CardDescription>List of schemes like Smart Cities Mission, PMAY, Jal Jeevan Mission.</CardDescription>
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
              <CardDescription>Milestones and progress updates for government projects.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectsTimeline />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
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
  );
}
