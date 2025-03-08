import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-background pt-16 pb-24">
      <div className="container flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">OpenGovTools</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            A Digital Suite for Transparency, Accountability, and Citizen Engagement
          </p>
        </div>

        <p className="max-w-2xl text-muted-foreground">
          Promoting open governance by providing real-time access to government data, interactive dashboards for
          tracking public projects, and secure ways to engage in governance while maintaining anonymity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/data">Explore Data</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">Track Projects</Link>
          </Button>
        </div>

        <div className="w-full max-w-4xl mt-12 relative">
          <div className="aspect-video rounded-lg overflow-hidden border shadow-xl">
            <img
              src="/placeholder.svg?height=720&width=1280"
              alt="OpenGovTools Dashboard Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg">
            Real-time data visualization
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

