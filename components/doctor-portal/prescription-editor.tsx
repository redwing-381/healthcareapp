"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Pill, Calendar, Clock, Plus, Trash2, Save, FileText } from "lucide-react"

export function PrescriptionEditor() {
  const [activeTab, setActiveTab] = useState("current")
  const [medications, setMedications] = useState([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      instructions: "Take in the morning with food",
      startDate: "May 1, 2025",
      endDate: "August 1, 2025",
      refills: 3,
    },
    {
      id: "2",
      name: "Albuterol",
      dosage: "90mcg",
      frequency: "As needed",
      instructions: "Use inhaler for shortness of breath",
      startDate: "April 15, 2025",
      endDate: "October 15, 2025",
      refills: 5,
    },
  ])

  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "once-daily",
    instructions: "",
    startDate: "",
    endDate: "",
    refills: 0,
  })

  const [isAddingNew, setIsAddingNew] = useState(false)

  const handleAddMedication = () => {
    setIsAddingNew(true)
  }

  const handleSaveMedication = () => {
    // In a real app, you would validate and save the medication
    setIsAddingNew(false)
    // Reset form
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "once-daily",
      instructions: "",
      startDate: "",
      endDate: "",
      refills: 0,
    })
  }

  const handleCancelAdd = () => {
    setIsAddingNew(false)
  }

  const handleDeleteMedication = (id: string) => {
    setMedications(medications.filter((med) => med.id !== id))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Active Medications</h3>
            <Button onClick={handleAddMedication} disabled={isAddingNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Medication
            </Button>
          </div>

          {isAddingNew && (
            <Card className="border-primary">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="med-name">Medication Name</Label>
                    <Input
                      id="med-name"
                      placeholder="Enter medication name"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="med-dosage">Dosage</Label>
                    <Input
                      id="med-dosage"
                      placeholder="e.g., 10mg"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="med-frequency">Frequency</Label>
                    <Select
                      value={newMedication.frequency}
                      onValueChange={(value) => setNewMedication({ ...newMedication, frequency: value })}
                    >
                      <SelectTrigger id="med-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once-daily">Once Daily</SelectItem>
                        <SelectItem value="twice-daily">Twice Daily</SelectItem>
                        <SelectItem value="three-times-daily">Three Times Daily</SelectItem>
                        <SelectItem value="four-times-daily">Four Times Daily</SelectItem>
                        <SelectItem value="as-needed">As Needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="med-refills">Refills</Label>
                    <Input
                      id="med-refills"
                      type="number"
                      min="0"
                      placeholder="Number of refills"
                      value={newMedication.refills.toString()}
                      onChange={(e) =>
                        setNewMedication({ ...newMedication, refills: Number.parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="med-start">Start Date</Label>
                    <Input
                      id="med-start"
                      type="date"
                      value={newMedication.startDate}
                      onChange={(e) => setNewMedication({ ...newMedication, startDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="med-end">End Date</Label>
                    <Input
                      id="med-end"
                      type="date"
                      value={newMedication.endDate}
                      onChange={(e) => setNewMedication({ ...newMedication, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="med-instructions">Instructions</Label>
                  <Textarea
                    id="med-instructions"
                    placeholder="Special instructions for patient"
                    value={newMedication.instructions}
                    onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelAdd}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveMedication}>
                    <Save className="mr-2 h-4 w-4" /> Save Medication
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {medications.map((medication) => (
              <Card key={medication.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full p-2 bg-primary/10 text-primary">
                        <Pill className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{medication.name}</h4>
                          <Badge variant="outline">{medication.dosage}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{medication.instructions}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMedication(medication.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{medication.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {medication.startDate} to {medication.endDate}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Refills: {medication.refills}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="pt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Medication History</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full p-2 bg-muted text-muted-foreground">
                      <Pill className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">Amoxicillin</h4>
                        <Badge variant="outline">500mg</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Take three times daily with food</p>
                    </div>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Three times daily</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">March 10, 2025 to March 20, 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Refills: 0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Prescription Templates</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <h4 className="font-medium">Common Antibiotics</h4>
                  <p className="text-sm text-muted-foreground">Standard antibiotic prescriptions</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">Amoxicillin</Badge>
                    <Badge variant="outline">Azithromycin</Badge>
                    <Badge variant="outline">Ciprofloxacin</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <h4 className="font-medium">Hypertension Medications</h4>
                  <p className="text-sm text-muted-foreground">Common blood pressure medications</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">Lisinopril</Badge>
                    <Badge variant="outline">Amlodipine</Badge>
                    <Badge variant="outline">Hydrochlorothiazide</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
