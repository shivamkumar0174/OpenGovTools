import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BarChart3, Database, MessageSquare, Shield } from "lucide-react"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="container py-12 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Our Core Features</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            OpenGovTools provides a comprehensive suite of tools designed to enhance transparency, accountability, and
            citizen engagement in governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          <FeatureCard
            icon={<Database className="h-10 w-10 text-primary" />}
            title="Government Data Access"
            description="Real-time access to government data including budgets, expenditures, and decision-making processes."
            href="/data"
          />

          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-primary" />}
            title="Project Tracking"
            description="Interactive dashboards to monitor public policies and projects with detailed analytics."
            href="/projects"
          />

          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-primary" />}
            title="AI-Powered Chatbot"
            description="Get instant assistance, report issues anonymously, and receive guidance on government services."
            href="/chat"
          />

          <FeatureCard
            icon={<Shield className="h-10 w-10 text-primary" />}
            title="Secure Authentication"
            description="OAuth 2.0 authentication ensures secure access while protecting user privacy and data."
            href="/auth/signin"
          />
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Why OpenGovTools?</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Our platform bridges the gap between citizens and government, fostering a more transparent, accountable,
              and participatory democracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <BenefitCard
              title="Transparency"
              description="Access real-time government data and track how public resources are being allocated and used."
            />

            <BenefitCard
              title="Accountability"
              description="Monitor project progress, report issues, and hold public officials accountable for their actions."
            />

            <BenefitCard
              title="Engagement"
              description="Participate in governance through secure channels while maintaining anonymity when needed."
            />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-bold">Ready to explore OpenGovTools?</h2>
            <p className="text-muted-foreground max-w-2xl">
              Join thousands of citizens who are already using our platform to stay informed and engaged with their
              government.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto pt-4">
        <Button asChild variant="outline" className="w-full">
          <Link href={href}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

