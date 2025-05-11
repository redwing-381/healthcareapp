"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, User, Shield } from "lucide-react"
import { format } from "date-fns"

interface RecordSharingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RecordSharingModal({ open, onOpenChange }: RecordSharingModalProps) {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [selectedRecords, setSelectedRecords] = useState<string[]>([])

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleShare = () => {
    // Handle sharing logic
    onOpenChange(false)
    setStep(1)
  }

  const toggleRecord = (id: string) => {
    if (selectedRecords.includes(id)) {
      setSelectedRecords(selectedRecords.filter((r) => r !== id))
    } else {
      setSelectedRecords([...selectedRecords, id])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 1 && "Select Healthcare Provider"}
            {step === 2 && "Select Records to Share"}
            {step === 3 && "Set Permissions"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Search for a healthcare provider to share your records with"}
            {step === 2 && "Choose which records you want to share"}
            {step === 3 && "Set access permissions and duration"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or specialty..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {[
                "Dr. Sarah Johnson",
                "Dr. Michael Chen",
                "Dr. Emily Rodriguez",
                "Dr. David Wilson",
                "Dr. Lisa Thompson",
              ].map((doctor) => (
                <div
                  key={doctor}
                  className={`flex items-center p-3 rounded-md cursor-pointer ${
                    selectedDoctor === doctor ? "bg-primary/10 border-primary" : "border"
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{doctor}</div>
                    <div className="text-sm text-muted-foreground">
                      {doctor === "Dr. Sarah Johnson" && "Primary Care Physician"}
                      {doctor === "Dr. Michael Chen" && "Cardiologist"}
                      {doctor === "Dr. Emily Rodriguez" && "Neurologist"}
                      {doctor === "Dr. David Wilson" && "Dermatologist"}
                      {doctor === "Dr. Lisa Thompson" && "Psychiatrist"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              {[
                "Annual Physical Results",
                "Blood Work Analysis",
                "MRI Scan Report",
                "Prescription History",
                "Vaccination Records",
              ].map((record, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`record-${index}`}
                    checked={selectedRecords.includes(`record-${index}`)}
                    onCheckedChange={() => toggleRecord(`record-${index}`)}
                  />
                  <Label htmlFor={`record-${index}`} className="cursor-pointer">
                    {record}
                  </Label>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectedRecords.length === 5}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedRecords(["record-0", "record-1", "record-2", "record-3", "record-4"])
                  } else {
                    setSelectedRecords([])
                  }
                }}
              />
              <Label htmlFor="select-all" className="cursor-pointer">
                Select All Records
              </Label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="access-level">Access Level</Label>
              <Select defaultValue="view">
                <SelectTrigger id="access-level">
                  <SelectValue placeholder="Select access level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">View Only</SelectItem>
                  <SelectItem value="download">View & Download</SelectItem>
                  <SelectItem value="edit">View, Download & Edit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Access Duration</Label>
              <Select defaultValue="30days">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">7 Days</SelectItem>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Expiration Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center space-x-2 p-3 bg-muted rounded-md">
              <Shield className="h-5 w-5 text-primary" />
              <p className="text-sm">
                Your records are encrypted and secured with blockchain technology. The recipient will need to verify
                their identity to access them.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={(step === 1 && !selectedDoctor) || (step === 2 && selectedRecords.length === 0)}
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleShare}>Share Records</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
