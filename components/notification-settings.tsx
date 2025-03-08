"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Notification channels
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  // Notification types
  const [projectUpdates, setProjectUpdates] = useState(true)
  const [reportStatus, setReportStatus] = useState(true)
  const [budgetAlerts, setBudgetAlerts] = useState(false)
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [newsletterUpdates, setNewsletterUpdates] = useState(false)

  // Notification frequency
  const [frequency, setFrequency] = useState("daily")

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Channels</h3>
        <p className="text-sm text-muted-foreground">Choose how you want to receive notifications from OpenGovTools.</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
            </div>
            <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive important notifications via text message</p>
            </div>
            <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Types</h3>
        <p className="text-sm text-muted-foreground">Choose which types of notifications you want to receive.</p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="project-updates">Project Updates</Label>
              <p className="text-sm text-muted-foreground">Updates on public projects you're following</p>
            </div>
            <Switch id="project-updates" checked={projectUpdates} onCheckedChange={setProjectUpdates} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="report-status">Report Status Changes</Label>
              <p className="text-sm text-muted-foreground">Updates when your submitted reports change status</p>
            </div>
            <Switch id="report-status" checked={reportStatus} onCheckedChange={setReportStatus} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="budget-alerts">Budget Alerts</Label>
              <p className="text-sm text-muted-foreground">Notifications about significant budget changes</p>
            </div>
            <Switch id="budget-alerts" checked={budgetAlerts} onCheckedChange={setBudgetAlerts} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">Important security notifications about your account</p>
            </div>
            <Switch id="security-alerts" checked={securityAlerts} onCheckedChange={setSecurityAlerts} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="newsletter-updates">Newsletter & Updates</Label>
              <p className="text-sm text-muted-foreground">General news and platform updates</p>
            </div>
            <Switch id="newsletter-updates" checked={newsletterUpdates} onCheckedChange={setNewsletterUpdates} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Frequency</h3>
        <p className="text-sm text-muted-foreground">
          Choose how often you want to receive non-critical notifications.
        </p>

        <RadioGroup value={frequency} onValueChange={setFrequency}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="realtime" id="realtime" />
            <Label htmlFor="realtime">Real-time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Daily digest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly digest</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}

