import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Lock, User, Shield, Moon, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="account">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Moon className="h-4 w-4 mr-2" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Alex Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="alex@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1990-05-15" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123 Main St, Anytown, CA 12345" />
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>Add or update your emergency contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ec-name">Contact Name</Label>
                  <Input id="ec-name" defaultValue="Sarah Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ec-relationship">Relationship</Label>
                  <Input id="ec-relationship" defaultValue="Spouse" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ec-phone">Phone Number</Label>
                  <Input id="ec-phone" defaultValue="(555) 987-6543" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ec-email">Email</Label>
                  <Input id="ec-email" type="email" defaultValue="sarah@example.com" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  {[
                    "Appointment reminders",
                    "Prescription refill reminders",
                    "Lab results available",
                    "Doctor messages",
                    "Health tips and recommendations",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Label htmlFor={`email-${index}`} className="flex-1">
                        {item}
                      </Label>
                      <Switch id={`email-${index}`} defaultChecked={index < 3} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Push Notifications</h3>
                <div className="space-y-2">
                  {[
                    "Appointment reminders",
                    "Medication reminders",
                    "Health goal achievements",
                    "New messages",
                    "Health record updates",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Label htmlFor={`push-${index}`} className="flex-1">
                        {item}
                      </Label>
                      <Switch id={`push-${index}`} defaultChecked={index < 4} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your data and privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Sharing</h3>
                <div className="space-y-2">
                  {[
                    "Share data with healthcare providers",
                    "Share anonymized data for research",
                    "Allow third-party app access",
                    "Share health insights with family members",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Label htmlFor={`privacy-${index}`} className="flex-1">
                        {item}
                      </Label>
                      <Switch id={`privacy-${index}`} defaultChecked={index === 0} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Security</h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      <Switch id="two-factor" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="biometric">Biometric Authentication</Label>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">Use Face ID or fingerprint to access the app</p>
                      <Switch id="biometric" defaultChecked />
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Lock className="mr-2 h-4 w-4" /> Change Password
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Privacy Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the app looks and feels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-background border-b mb-2"></div>
                    <p className="text-center font-medium">Light</p>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-black border-b mb-2"></div>
                    <p className="text-center font-medium">Dark</p>
                  </div>
                  <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                    <div className="h-20 bg-gradient-to-b from-background to-black border-b mb-2"></div>
                    <p className="text-center font-medium">System</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Accessibility</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="motion-reduce" className="flex-1">
                      Reduce motion
                    </Label>
                    <Switch id="motion-reduce" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast" className="flex-1">
                      High contrast mode
                    </Label>
                    <Switch id="high-contrast" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Language</h3>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Appearance Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
