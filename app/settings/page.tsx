"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { useTheme } from "next-themes"
import { Loader2, Moon, Sun, Monitor } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("appearance")

  // Settings states
  const [fontSize, setFontSize] = useState(16)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [language, setLanguage] = useState("english")
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [autoSave, setAutoSave] = useState(true)
  const [dataCompression, setDataCompression] = useState(true)
  const [saveChangesLoading, setSaveChangesLoading] = useState(false)

  // Redirect to login if not authenticated
  if (!isLoading && !user) {
    router.push("/auth/signin")
    return null
  }

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  const handleSaveSettings = () => {
    setSaveChangesLoading(true)

    // Simulate API call
    setTimeout(() => {
      setSaveChangesLoading(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how OpenGovTools looks on your device</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="w-full h-24 flex flex-col gap-2"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="h-6 w-6" />
                      <span>Light</span>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="w-full h-24 flex flex-col gap-2"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="h-6 w-6" />
                      <span>Dark</span>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className="w-full h-24 flex flex-col gap-2"
                      onClick={() => setTheme("system")}
                    >
                      <Monitor className="h-6 w-6" />
                      <span>System</span>
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Font Size</h3>
                    <p className="text-sm text-muted-foreground">Adjust the size of text throughout the application</p>
                  </div>
                  <span className="font-medium">{fontSize}px</span>
                </div>
                <Slider
                  value={[fontSize]}
                  min={12}
                  max={24}
                  step={1}
                  onValueChange={(value) => setFontSize(value[0])}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Small</span>
                  <span>Default</span>
                  <span>Large</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Color Accent</h3>
                <p className="text-sm text-muted-foreground">
                  Choose the primary color for buttons and interactive elements
                </p>
                <div className="grid grid-cols-6 gap-2">
                  <Button className="h-8 w-8 rounded-full p-0 bg-blue-500 hover:bg-blue-600" />
                  <Button className="h-8 w-8 rounded-full p-0 bg-green-500 hover:bg-green-600" />
                  <Button className="h-8 w-8 rounded-full p-0 bg-purple-500 hover:bg-purple-600" />
                  <Button className="h-8 w-8 rounded-full p-0 bg-red-500 hover:bg-red-600" />
                  <Button className="h-8 w-8 rounded-full p-0 bg-orange-500 hover:bg-orange-600" />
                  <Button className="h-8 w-8 rounded-full p-0 bg-teal-500 hover:bg-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>Customize accessibility settings to improve your experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduced-motion">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimize animations throughout the application</p>
                  </div>
                  <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High Contrast</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
                  </div>
                  <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Screen Reader</h3>
                <p className="text-sm text-muted-foreground">Optimize content for screen readers</p>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard descriptions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="detailed" id="detailed" />
                    <Label htmlFor="detailed">Detailed descriptions</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Keyboard Navigation</h3>
                <p className="text-sm text-muted-foreground">Customize keyboard navigation settings</p>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="focus-indicators">Enhanced Focus Indicators</Label>
                    <p className="text-sm text-muted-foreground">Make focus indicators more visible</p>
                  </div>
                  <Switch id="focus-indicators" defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Set your preferred language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Language</h3>
                <p className="text-sm text-muted-foreground">Choose the language used throughout the application</p>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Español</SelectItem>
                    <SelectItem value="french">Français</SelectItem>
                    <SelectItem value="german">Deutsch</SelectItem>
                    <SelectItem value="chinese">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Date & Time Format</h3>
                <p className="text-sm text-muted-foreground">Choose how dates and times are displayed</p>
                <RadioGroup defaultValue="system">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system-format" />
                    <Label htmlFor="system-format">Use system settings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="us" id="us-format" />
                    <Label htmlFor="us-format">MM/DD/YYYY, 12-hour clock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="international" id="international-format" />
                    <Label htmlFor="international-format">DD/MM/YYYY, 24-hour clock</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Region</h3>
                <p className="text-sm text-muted-foreground">Set your region for localized content</p>
                <Select defaultValue="us">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure advanced application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Session Management</h3>
                <p className="text-sm text-muted-foreground">Control how your session is managed</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                      <SelectTrigger id="session-timeout" className="w-full">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="never">Never timeout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="remember-sessions">Remember Sessions</Label>
                      <p className="text-sm text-muted-foreground">Stay signed in on this device</p>
                    </div>
                    <Switch id="remember-sessions" defaultChecked={true} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data & Performance</h3>
                <p className="text-sm text-muted-foreground">Configure data usage and performance settings</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-save">Auto-Save Data</Label>
                      <p className="text-sm text-muted-foreground">Automatically save your work as you go</p>
                    </div>
                    <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-compression">Data Compression</Label>
                      <p className="text-sm text-muted-foreground">Reduce data usage when on mobile networks</p>
                    </div>
                    <Switch id="data-compression" checked={dataCompression} onCheckedChange={setDataCompression} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Developer Options</h3>
                <p className="text-sm text-muted-foreground">Advanced settings for developers</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debug-mode">Debug Mode</Label>
                      <p className="text-sm text-muted-foreground">Enable detailed logging for troubleshooting</p>
                    </div>
                    <Switch id="debug-mode" defaultChecked={false} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="api-access">API Access</Label>
                      <p className="text-sm text-muted-foreground">Enable access to the OpenGovTools API</p>
                    </div>
                    <Switch id="api-access" defaultChecked={false} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} disabled={saveChangesLoading}>
          {saveChangesLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}

