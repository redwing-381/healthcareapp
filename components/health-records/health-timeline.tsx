"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Syringe, Activity, Pill, User, ChevronDown, ChevronUp, Lock } from "lucide-react"

export function HealthTimeline() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const timelineItems = [
    {
      id: "1",
      date: "May 1, 2025",
      title: "Annual Physical Examination",
      provider: "Dr. Sarah Johnson",
      type: "Checkup",
      icon: User,
      details: "Routine physical examination. Blood pressure: 120/80 mmHg. Heart rate: 72 bpm. Weight: 160 lbs.",
    },
    {
      id: "2",
      date: "April 15, 2025",
      title: "Blood Work Analysis",
      provider: "Quest Diagnostics",
      type: "Lab Results",
      icon: Activity,
      details: "Complete blood count, lipid panel, and metabolic panel. All results within normal ranges.",
    },
    {
      id: "3",
      date: "March 22, 2025",
      title: "MRI Scan",
      provider: "City Hospital",
      type: "Imaging",
      icon: FileText,
      details: "Brain MRI scan to investigate recurring headaches. No abnormalities detected.",
    },
    {
      id: "4",
      date: "February 10, 2025",
      title: "Prescription Renewal",
      provider: "Dr. Sarah Johnson",
      type: "Prescription",
      icon: Pill,
      details: "Renewed prescription for allergy medication. 30-day supply with 2 refills.",
    },
    {
      id: "5",
      date: "January 10, 2025",
      title: "COVID-19 Vaccination",
      provider: "Community Health Center",
      type: "Immunization",
      icon: Syringe,
      details: "Received COVID-19 booster shot. No adverse reactions reported.",
    },
  ]

  const toggleItem = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null)
    } else {
      setExpandedItem(id)
    }
  }

  return (
    <div className="space-y-4">
      {timelineItems.map((item, index) => (
        <div key={item.id} className="relative">
          {index < timelineItems.length - 1 && <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-muted" />}

          <div className="flex items-start space-x-4">
            <div className="relative z-10">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                <item.icon className="h-4 w-4" />
              </div>
            </div>

            <div className="flex-1 bg-card border rounded-lg overflow-hidden">
              <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => toggleItem(item.id)}>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">{item.title}</h3>
                    <Badge variant="outline">{item.type}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.provider}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-xs text-green-600">
                    <Lock className="h-3 w-3 mr-1" />
                    <span>Verified</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    {expandedItem === item.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {expandedItem === item.id && (
                <div className="p-4 border-t bg-muted/30 fade-in">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Details</h4>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                      <Button size="sm">Share</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
