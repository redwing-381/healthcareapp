"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ConditionCardProps {
  name: string
  probability: number
  description: string
  urgency: "low" | "moderate" | "high"
}

export function ConditionCard({ name, probability, description, urgency }: ConditionCardProps) {
  const [expanded, setExpanded] = useState(false)

  const getUrgencyColor = () => {
    switch (urgency) {
      case "low":
        return "bg-green-500"
      case "moderate":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <Card className={`overflow-hidden shimmer ${expanded ? "border-primary" : ""}`}>
      <CardContent className="p-0">
        <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-center space-x-3">
            <div className={`h-3 w-3 rounded-full ${getUrgencyColor()}`} />
            <div>
              <h3 className="font-medium">{name}</h3>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-muted-foreground">Match:</div>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${probability}%` }} />
                </div>
                <div className="text-sm font-medium">{probability}%</div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {expanded && (
          <div className="p-4 border-t bg-muted/30 space-y-4 fade-in">
            <div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Common Symptoms</h4>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                {name === "Migraine" && (
                  <>
                    <li>Throbbing headache, often on one side</li>
                    <li>Sensitivity to light and sound</li>
                    <li>Nausea and vomiting</li>
                    <li>Visual disturbances (aura)</li>
                  </>
                )}
                {name === "Tension Headache" && (
                  <>
                    <li>Dull, aching head pain</li>
                    <li>Tightness or pressure across the forehead</li>
                    <li>Tenderness in scalp, neck, and shoulder muscles</li>
                  </>
                )}
                {name === "Sinus Infection" && (
                  <>
                    <li>Facial pain or pressure</li>
                    <li>Nasal congestion</li>
                    <li>Thick, discolored nasal discharge</li>
                    <li>Reduced sense of smell and taste</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Recommended Actions</h4>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                {urgency === "low" && (
                  <>
                    <li>Rest in a quiet, dark room</li>
                    <li>Over-the-counter pain relievers</li>
                    <li>Apply cold or warm compress</li>
                    <li>Stay hydrated</li>
                  </>
                )}
                {urgency === "moderate" && (
                  <>
                    <li>Schedule an appointment with your doctor</li>
                    <li>Over-the-counter pain relievers</li>
                    <li>Rest and avoid triggers</li>
                    <li>Keep a symptom journal</li>
                  </>
                )}
                {urgency === "high" && (
                  <>
                    <li>Seek immediate medical attention</li>
                    <li>Call emergency services if symptoms worsen</li>
                    <li>Do not drive yourself to the hospital</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
