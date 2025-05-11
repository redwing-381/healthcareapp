"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Activity, Weight, Ruler, Thermometer, Droplet } from "lucide-react"

export function PatientDetails() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="rounded-full p-2 bg-red-100 text-red-500">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Heart Rate</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">72</p>
                <p className="text-sm text-muted-foreground ml-1">bpm</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="rounded-full p-2 bg-blue-100 text-blue-500">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Blood Pressure</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">120/80</p>
                <p className="text-sm text-muted-foreground ml-1">mmHg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="rounded-full p-2 bg-green-100 text-green-500">
              <Weight className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold">160</p>
                <p className="text-sm text-muted-foreground ml-1">lbs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <Tabs defaultValue="vitals">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="vitals" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Temperature</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="font-medium">98.6</span>
                      <span className="text-xs text-muted-foreground ml-1">°F</span>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "50%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Droplet className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Oxygen Saturation</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="font-medium">98</span>
                      <span className="text-xs text-muted-foreground ml-1">%</span>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "98%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Ruler className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Height</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="font-medium">5'10"</span>
                      <span className="text-xs text-muted-foreground ml-1">(178 cm)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">BMI</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="font-medium">23.5</span>
                      <span className="text-xs text-muted-foreground ml-1">(Normal)</span>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Allergies</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Penicillin</Badge>
                    <Badge variant="outline">Peanuts</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Chronic Conditions</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Asthma</Badge>
                    <Badge variant="outline">Hypertension</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Medications</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex justify-between">
                      <span>Lisinopril 10mg</span>
                      <span className="text-muted-foreground">Once daily</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Albuterol Inhaler</span>
                      <span className="text-muted-foreground">As needed</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Surgical History</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex justify-between">
                      <span>Appendectomy</span>
                      <span className="text-muted-foreground">2018</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">Annual Physical Notes</h3>
                    <span className="text-xs text-muted-foreground">May 1, 2025</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Patient reports feeling well overall. Complains of occasional headaches, possibly related to stress
                    at work. Recommended stress management techniques and adequate hydration. Follow-up in 6 months.
                  </p>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">Headache Consultation</h3>
                    <span className="text-xs text-muted-foreground">March 15, 2025</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Patient experiencing recurring headaches, primarily in the afternoon. No visual disturbances or
                    nausea. Ordered MRI to rule out any underlying issues. Recommended tracking headache patterns and
                    triggers.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
