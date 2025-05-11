"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, MapPin, User, Video, Phone, Plus } from "lucide-react"

export default function AppointmentsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [bookingDate, setBookingDate] = useState<Date | undefined>(new Date())

  const upcomingAppointments = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      specialty: "Primary Care Physician",
      date: "May 15, 2025",
      time: "10:00 AM",
      type: "In-person",
      location: "City Medical Center",
    },
    {
      id: "2",
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "June 5, 2025",
      time: "2:30 PM",
      type: "Video",
      location: null,
    },
  ]

  const pastAppointments = [
    {
      id: "3",
      doctor: "Dr. Sarah Johnson",
      specialty: "Primary Care Physician",
      date: "May 1, 2025",
      time: "9:30 AM",
      type: "In-person",
      location: "City Medical Center",
      notes: "Annual physical examination. Blood pressure: 120/80 mmHg. Heart rate: 72 bpm. Weight: 160 lbs.",
    },
    {
      id: "4",
      doctor: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      date: "March 22, 2025",
      time: "11:00 AM",
      type: "Video",
      location: null,
      notes: "Follow-up for recurring headaches. Recommended MRI scan.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <p className="text-muted-foreground">Manage your healthcare appointments</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="upcoming" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Book Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Book New Appointment</DialogTitle>
                    <DialogDescription>Schedule an appointment with a healthcare provider</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointment-type">Appointment Type</Label>
                      <Select defaultValue="in-person">
                        <SelectTrigger id="appointment-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">In-person Visit</SelectItem>
                          <SelectItem value="video">Video Consultation</SelectItem>
                          <SelectItem value="phone">Phone Consultation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Select>
                        <SelectTrigger id="specialty">
                          <SelectValue placeholder="Select specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary-care">Primary Care</SelectItem>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="psychiatry">Psychiatry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date</Label>
                      <div className="border rounded-md p-2">
                        <Calendar
                          mode="single"
                          selected={bookingDate}
                          onSelect={setBookingDate}
                          className="mx-auto"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Select>
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00">9:00 AM</SelectItem>
                          <SelectItem value="10:00">10:00 AM</SelectItem>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="15:00">3:00 PM</SelectItem>
                          <SelectItem value="16:00">4:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Textarea id="reason" placeholder="Briefly describe your symptoms or reason for visit" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Book Appointment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-0">
                      <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{appointment.doctor}</h3>
                            <Badge variant="outline">{appointment.specialty}</Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>{appointment.date}</span>
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {appointment.type === "In-person" ? (
                              <>
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{appointment.location}</span>
                              </>
                            ) : appointment.type === "Video" ? (
                              <>
                                <Video className="h-4 w-4 mr-1" />
                                <span>Video Consultation</span>
                              </>
                            ) : (
                              <>
                                <Phone className="h-4 w-4 mr-1" />
                                <span>Phone Consultation</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4 md:mt-0">
                          <Button variant="outline">Reschedule</Button>
                          <Button variant="destructive">Cancel</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">You have no upcoming appointments.</p>
                    <Button className="mt-4">Book an Appointment</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{appointment.doctor}</h3>
                            <Badge variant="outline">{appointment.specialty}</Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>{appointment.date}</span>
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {appointment.type === "In-person" ? (
                              <>
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{appointment.location}</span>
                              </>
                            ) : appointment.type === "Video" ? (
                              <>
                                <Video className="h-4 w-4 mr-1" />
                                <span>Video Consultation</span>
                              </>
                            ) : (
                              <>
                                <Phone className="h-4 w-4 mr-1" />
                                <span>Phone Consultation</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4 md:mt-0">
                          <Button variant="outline">View Summary</Button>
                        </div>
                      </div>
                      {appointment.notes && (
                        <div className="mt-4 p-4 bg-muted/50 rounded-md">
                          <h4 className="text-sm font-medium mb-1">Notes</h4>
                          <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View your appointment schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="mx-auto" />
            </CardContent>
            <CardFooter className="bg-muted/50 p-4">
              <div className="w-full space-y-2">
                <h3 className="text-sm font-medium">Upcoming</h3>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-2">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-primary" />
                          <span>{appointment.doctor}</span>
                        </div>
                        <span className="text-muted-foreground">{appointment.date}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming appointments</p>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
