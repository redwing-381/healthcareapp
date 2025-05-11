"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, User, Calendar, FileText, PlusCircle } from "lucide-react"
import { PatientList } from "@/components/doctor-portal/patient-list"
import { PatientDetails } from "@/components/doctor-portal/patient-details"
import { PatientChat } from "@/components/doctor-portal/patient-chat"
import { PrescriptionEditor } from "@/components/doctor-portal/prescription-editor"

export default function DoctorPortalPage() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatient(patientId)
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Doctor Portal</h1>
        <p className="text-muted-foreground">Manage your patients and their care</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Search and select a patient</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <PatientList
              onSelectPatient={handlePatientSelect}
              selectedPatient={selectedPatient}
              searchQuery={searchQuery}
            />
          </CardContent>
          <CardFooter className="p-4">
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Patient
            </Button>
          </CardFooter>
        </Card>

        {selectedPatient ? (
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Alex Johnson</CardTitle>
                  <CardDescription>Patient #P12345 • 35 years old • Male</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline">Last Visit: May 1, 2025</Badge>
                  <Badge>Next Appointment: May 15, 2025</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="records">Records</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <PatientDetails />
                </TabsContent>

                <TabsContent value="records" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Medical Records</h3>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" /> Request Records
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {[
                        {
                          title: "Annual Physical Results",
                          date: "May 1, 2025",
                          provider: "Dr. Sarah Johnson",
                          type: "Lab Results",
                        },
                        {
                          title: "Blood Work Analysis",
                          date: "April 15, 2025",
                          provider: "Quest Diagnostics",
                          type: "Lab Results",
                        },
                        {
                          title: "MRI Scan Report",
                          date: "March 22, 2025",
                          provider: "City Hospital",
                          type: "Imaging",
                        },
                      ].map((record, index) => (
                        <Card key={index}>
                          <CardContent className="p-4 flex justify-between items-center">
                            <div className="space-y-1">
                              <div className="font-medium">{record.title}</div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{record.date}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <User className="h-4 w-4 mr-1" />
                                <span>{record.provider}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{record.type}</Badge>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="chat" className="mt-4">
                  <PatientChat />
                </TabsContent>

                <TabsContent value="prescriptions" className="mt-4">
                  <PrescriptionEditor />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card className="lg:col-span-2 flex items-center justify-center p-12">
            <div className="text-center space-y-4">
              <User className="h-16 w-16 mx-auto text-muted-foreground/50" />
              <h3 className="text-xl font-medium">No Patient Selected</h3>
              <p className="text-muted-foreground">Select a patient from the list to view their details</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
