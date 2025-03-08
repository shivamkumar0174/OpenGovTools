"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function PrivacySettings() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [activityTracking, setActivityTracking] = useState(true)
  const [dataSharing, setDataSharing] = useState(false)
  const [anonymousReporting, setAnonymousReporting] = useState(true)
  const [cookieConsent, setCookieConsent] = useState(true)

  const handleSaveSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Privacy is our priority</AlertTitle>
        <AlertDescription>
          OpenGovTools is committed to protecting your privacy and giving you control over your data.
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Profile Privacy</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profile-visibility">Public Profile</Label>
              <p className="text-sm text-muted-foreground">Allow other users to see your profile information</p>
            </div>
            <Switch id="profile-visibility" checked={profileVisibility} onCheckedChange={setProfileVisibility} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="activity-tracking">Activity Tracking</Label>
              <p className="text-sm text-muted-foreground">
                Track your activity on the platform for personalized experiences
              </p>
            </div>
            <Switch id="activity-tracking" checked={activityTracking} onCheckedChange={setActivityTracking} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Data Sharing & Usage</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="data-sharing">Data Sharing</Label>
              <p className="text-sm text-muted-foreground">
                Allow anonymized data to be shared for research and improvement
              </p>
            </div>
            <Switch id="data-sharing" checked={dataSharing} onCheckedChange={setDataSharing} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="anonymous-reporting">Anonymous Reporting</Label>
              <p className="text-sm text-muted-foreground">
                Enable anonymous reporting of issues without linking to your account
              </p>
            </div>
            <Switch id="anonymous-reporting" checked={anonymousReporting} onCheckedChange={setAnonymousReporting} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cookie-consent">Cookie Consent</Label>
              <p className="text-sm text-muted-foreground">
                Allow cookies for improved site functionality and analytics
              </p>
            </div>
            <Switch id="cookie-consent" checked={cookieConsent} onCheckedChange={setCookieConsent} />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Data</h3>
        <p className="text-sm text-muted-foreground">
          You have the right to access, export, or delete your personal data at any time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Your Data
          </Button>
          <Button variant="destructive">Delete Your Account</Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Privacy Settings"}
        </Button>
      </div>
    </div>
  )
}

