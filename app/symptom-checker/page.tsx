"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, Activity, AlertTriangle, Share2 } from "lucide-react"
import { BodyMap } from "@/components/symptom-checker/body-map"
import { SymptomList } from "@/components/symptom-checker/symptom-list"
import { ConditionCard } from "@/components/symptom-checker/condition-card"

export default function SymptomCheckerPage() {
  const [step, setStep] = useState(1)
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBodyPartSelect = (part: string) => {
    setSelectedBodyPart(part)
  }

  const handleSymptomToggle = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== symptom))
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom])
    }
  }

  const handleNext = () => {
    if (step === 2) {
      setIsProcessing(true)
      // Simulate API call
      setTimeout(() => {
        setIsProcessing(false)
        setStep(3)
      }, 3000)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleReset = () => {
    setStep(1)
    setSelectedBodyPart(null)
    setSelectedSymptoms([])
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Symptom Checker</h1>
        <p className="text-muted-foreground">Identify possible conditions based on your symptoms</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>
                {step === 1 && "Select Body Area"}
                {step === 2 && "Select Symptoms"}
                {step === 3 && "Results"}
                {isProcessing && "Analyzing Symptoms"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tap on the body area where you're experiencing symptoms"}
                {step === 2 && "Select all symptoms you're experiencing"}
                {step === 3 && "Possible conditions based on your symptoms"}
                {isProcessing && "Our AI is analyzing your symptoms"}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`h-2 w-8 rounded-full ${i + 1 === step ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/20 animate-ping" />
                </div>
                <Activity className="h-12 w-12 text-primary animate-pulse" />
              </div>
              <p className="text-center text-muted-foreground">Analyzing your symptoms and generating insights...</p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="flex justify-center py-4">
                  <BodyMap onSelectBodyPart={handleBodyPartSelect} selectedPart={selectedBodyPart} />
                </div>
              )}

              {step === 2 && (
                <div className="py-4">
                  <SymptomList
                    bodyPart={selectedBodyPart || "head"}
                    selectedSymptoms={selectedSymptoms}
                    onToggleSymptom={handleSymptomToggle}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 py-4">
                  <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                    <p className="text-sm text-yellow-700">
                      This is not a medical diagnosis. Consult a healthcare professional for proper evaluation.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <ConditionCard
                      name="Migraine"
                      probability={85}
                      description="A neurological condition that causes severe headaches, often with nausea and sensitivity to light and sound."
                      urgency="moderate"
                    />

                    <ConditionCard
                      name="Tension Headache"
                      probability={65}
                      description="A common type of headache that feels like a constant ache or pressure around the head, particularly at the temples or back of the head and neck."
                      urgency="low"
                    />

                    <ConditionCard
                      name="Sinus Infection"
                      probability={40}
                      description="An inflammation or swelling of the tissue lining the sinuses, often causing headaches, facial pain, and nasal congestion."
                      urgency="low"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && !isProcessing ? (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < 3 && !isProcessing ? (
            <Button
              onClick={handleNext}
              disabled={(step === 1 && !selectedBodyPart) || (step === 2 && selectedSymptoms.length === 0)}
            >
              {step === 2 ? "Analyze Symptoms" : "Next"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : step === 3 ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleReset}>
                Start New Check
              </Button>
              <Button>
                <Share2 className="mr-2 h-4 w-4" /> Share with Doctor
              </Button>
            </div>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  )
}
