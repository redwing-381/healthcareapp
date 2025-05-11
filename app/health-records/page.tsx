"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Lock, FileText, Share2, Download, Calendar, User, CheckCircle } from "lucide-react"
import { HealthTimeline } from "@/components/health-records/health-timeline"
import { RecordSharingModal } from "@/components/health-records/record-sharing-modal"

export default function HealthRecordsPage() {
  const [activeTab, setActiveTab] = useState("timeline")
  const [sharingModalOpen, setSharingModalOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">Health Records</h1>
          <Badge variant="outline" className="flex items-center space-x-1">
            <Lock className="h-3 w-3" />
            <span>Blockchain Secured</span>
          </Badge>
        </div>
        <p className="text-muted-foreground">Your complete medical history, securely stored and easily accessible</p>
      </div>

      <Card>
        <Tabs defaultValue="timeline" value={activeTab} onValueChange={setActiveTab}>
          <CardHeader>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="sharing">Sharing</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="timeline" className="space-y-4">
              <HealthTimeline />
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Annual Physical Results",
                    date: "May 15, 2025",
                    doctor: "Dr. Sarah Johnson",
                    type: "Lab Results",
                  },
                  {
                    title: "COVID-19 Vaccination",
                    date: "January 10, 2025",
                    doctor: "Dr. Michael Chen",
                    type: "Immunization",
                  },
                  {
                    title: "MRI Scan Report",
                    date: "March 22, 2025",
                    doctor: "Dr. Emily Rodriguez",
                    type: "Imaging",
                  },
                  {
                    title: "Prescription Renewal",
                    date: "April 5, 2025",
                    doctor: "Dr. Sarah Johnson",
                    type: "Prescription",
                  },
                ].map((doc, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 bg-muted/50 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-primary" />
                          <span className="font-medium">{doc.title}</span>
                        </div>
                        <Badge variant="outline">{doc.type}</Badge>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{doc.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <User className="h-4 w-4 mr-2" />
                          <span>{doc.doctor}</span>
                        </div>
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span>Blockchain Verified</span>
                        </div>
                      </div>
                      <div className="p-4 bg-muted/30 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                        <Button size="sm" onClick={() => setSharingModalOpen(true)}>
                          <Share2 className="h-4 w-4 mr-2" /> Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sharing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Shared With</CardTitle>
                  <CardDescription>Healthcare providers who have access to your records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Dr. Sarah Johnson",
                        specialty: "Primary Care Physician",
                        date: "Shared on May 1, 2025",
                        active: true,
                      },
                      {
                        name: "Dr. Michael Chen",
                        specialty: "Cardiologist",
                        date: "Shared on April 15, 2025",
                        active: true,
                      },
                      {
                        name: "Dr. Emily Rodriguez",
                        specialty: "Neurologist",
                        date: "Shared on March 10, 2025",
                        active: false,
                      },
                    ].map((provider, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                        <div className="space-y-1">
                          <div className="font-medium">{provider.name}</div>
                          <div className="text-sm text-muted-foreground">{provider.specialty}</div>
                          <div className="text-xs text-muted-foreground">{provider.date}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={provider.active ? "default" : "outline"}>
                            {provider.active ? "Active" : "Expired"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            {provider.active ? "Revoke Access" : "Renew Access"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setSharingModalOpen(true)}>
                    <Share2 className="mr-2 h-4 w-4" /> Share with New Provider
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>

      <RecordSharingModal open={sharingModalOpen} onOpenChange={setSharingModalOpen} />
    </div>
  )
}
