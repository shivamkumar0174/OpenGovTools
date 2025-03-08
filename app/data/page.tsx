import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetChart } from "@/components/budget-chart"
import { ExpenditureTable } from "@/components/expenditure-table"
import { DecisionTimeline } from "@/components/decision-timeline"

export default function DataPage() {
  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Government Data Access</h1>
        <p className="text-muted-foreground">
          Real-time access to government data including budgets, expenditures, and decision-making processes.
        </p>
      </div>

      <Tabs defaultValue="budget" className="space-y-4">
        <TabsList>
          <TabsTrigger value="budget">Budget Allocation</TabsTrigger>
          <TabsTrigger value="expenditure">Expenditure Tracking</TabsTrigger>
          <TabsTrigger value="decisions">Decision Making</TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Annual Budget Allocation</CardTitle>
              <CardDescription>
                Breakdown of government budget allocation by department for the current fiscal year.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <BudgetChart />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Budget" value="$1.2B" description="Fiscal Year 2023-2024" />
            <StatCard title="Largest Allocation" value="Education" description="28% of total budget" />
            <StatCard title="Budget Growth" value="+3.2%" description="Compared to previous year" />
          </div>
        </TabsContent>

        <TabsContent value="expenditure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Government Expenditures</CardTitle>
              <CardDescription>Detailed breakdown of government spending with real-time updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenditureTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="decisions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Decision-Making Timeline</CardTitle>
              <CardDescription>Track the progress of policy decisions and legislative processes.</CardDescription>
            </CardHeader>
            <CardContent>
              <DecisionTimeline />
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

