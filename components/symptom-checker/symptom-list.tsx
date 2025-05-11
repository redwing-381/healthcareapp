import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface SymptomListProps {
  bodyPart: string
  selectedSymptoms: string[]
  onToggleSymptom: (symptom: string) => void
}

export function SymptomList({ bodyPart, selectedSymptoms, onToggleSymptom }: SymptomListProps) {
  // Symptom data organized by body part
  const symptomsByBodyPart: Record<string, string[]> = {
    head: [
      "Headache",
      "Dizziness",
      "Blurred vision",
      "Ear pain",
      "Sore throat",
      "Facial pain",
      "Difficulty swallowing",
      "Jaw pain",
    ],
    chest: [
      "Chest pain",
      "Shortness of breath",
      "Rapid heartbeat",
      "Cough",
      "Wheezing",
      "Difficulty breathing",
      "Chest tightness",
    ],
    abdomen: [
      "Abdominal pain",
      "Nausea",
      "Vomiting",
      "Diarrhea",
      "Constipation",
      "Bloating",
      "Loss of appetite",
      "Heartburn",
    ],
    leftArm: ["Pain in left arm", "Numbness", "Tingling", "Weakness", "Swelling", "Limited range of motion"],
    rightArm: ["Pain in right arm", "Numbness", "Tingling", "Weakness", "Swelling", "Limited range of motion"],
    leftLeg: ["Pain in left leg", "Numbness", "Tingling", "Weakness", "Swelling", "Limited range of motion"],
    rightLeg: ["Pain in right leg", "Numbness", "Tingling", "Weakness", "Swelling", "Limited range of motion"],
    back: ["Back pain", "Stiffness", "Muscle spasms", "Numbness", "Tingling", "Difficulty bending"],
  }

  const symptoms = symptomsByBodyPart[bodyPart] || []

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Symptoms for {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {symptoms.map((symptom) => (
          <div key={symptom} className="flex items-center space-x-2">
            <Checkbox
              id={symptom}
              checked={selectedSymptoms.includes(symptom)}
              onCheckedChange={() => onToggleSymptom(symptom)}
            />
            <Label htmlFor={symptom} className="cursor-pointer">
              {symptom}
            </Label>
          </div>
        ))}
      </div>

      {symptoms.length === 0 && <p className="text-muted-foreground">No symptoms available for this body part.</p>}
    </div>
  )
}
