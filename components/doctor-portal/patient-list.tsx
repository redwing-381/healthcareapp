"use client"
import { Badge } from "@/components/ui/badge"

interface PatientListProps {
  onSelectPatient: (patientId: string) => void
  selectedPatient: string | null
  searchQuery: string
}

export function PatientList({ onSelectPatient, selectedPatient, searchQuery }: PatientListProps) {
  const patients = [
    {
      id: "1",
      name: "Alex Johnson",
      age: 35,
      gender: "Male",
      lastVisit: "May 1, 2025",
      nextAppointment: "May 15, 2025",
      status: "Active",
    },
    {
      id: "2",
      name: "Emma Davis",
      age: 28,
      gender: "Female",
      lastVisit: "April 22, 2025",
      nextAppointment: "June 5, 2025",
      status: "Active",
    },
    {
      id: "3",
      name: "Michael Smith",
      age: 42,
      gender: "Male",
      lastVisit: "March 15, 2025",
      nextAppointment: null,
      status: "Inactive",
    },
    {
      id: "4",
      name: "Sophia Rodriguez",
      age: 31,
      gender: "Female",
      lastVisit: "April 30, 2025",
      nextAppointment: "May 20, 2025",
      status: "Active",
    },
    {
      id: "5",
      name: "William Chen",
      age: 55,
      gender: "Male",
      lastVisit: "April 10, 2025",
      nextAppointment: "May 25, 2025",
      status: "Active",
    },
  ]

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="divide-y">
      {filteredPatients.length > 0 ? (
        filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
              selectedPatient === patient.id ? "bg-primary/10" : ""
            }`}
            onClick={() => onSelectPatient(patient.id)}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="font-medium">{patient.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {patient.age} years • {patient.gender}
                </p>
                <p className="text-xs text-muted-foreground">Last visit: {patient.lastVisit}</p>
              </div>
              <Badge variant={patient.status === "Active" ? "default" : "outline"}>{patient.status}</Badge>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-muted-foreground">No patients found matching "{searchQuery}"</div>
      )}
    </div>
  )
}
