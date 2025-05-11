"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Fingerprint, Mail, User, ArrowRight, ArrowLeft, Shield, Activity, Brain } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const OnboardingPage = () => {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [userType, setUserType] = useState<"patient" | "doctor">("patient")

  const slides = [
    {
      title: "Welcome to HealthCare",
      description: "Your complete health companion for mental and physical wellbeing",
      icon: <Activity className="h-16 w-16 text-primary" />,
    },
    {
      title: "Mental Health Tracking",
      description: "Track your mood and get personalized recommendations",
      icon: <Brain className="h-16 w-16 text-secondary" />,
    },
    {
      title: "Secure Health Records",
      description: "Your data is secure with blockchain technology",
      icon: <Shield className="h-16 w-16 text-primary" />,
    },
  ]

  const handleNext = () => {
    if (step < slides.length) {
      setStep(step + 1)
    } else {
      router.push("/")
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleFinish = () => {
    router.push("/")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardContent className="p-6">
          {step < slides.length ? (
            <motion.div
              key={`slide-${step}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 text-center"
            >
              <div className="flex justify-center py-6">{slides[step].icon}</div>

              <h2 className="text-2xl font-bold">{slides[step].title}</h2>
              <p className="text-muted-foreground">{slides[step].description}</p>

              <div className="flex justify-center space-x-2 pt-4">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${i === step ? "bg-primary" : "bg-muted-foreground/30"}`}
                  />
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleBack} disabled={step === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={handleNext}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-center">Create Your Account</h2>

              <Tabs
                defaultValue="patient"
                className="w-full"
                onValueChange={(v) => setUserType(v as "patient" | "doctor")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                  <TabsTrigger value="doctor">Doctor</TabsTrigger>
                </TabsList>
                <TabsContent value="patient" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <Input id="name" placeholder="John Doe" className="pl-10" />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="doctor" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="doctor-name">Full Name</Label>
                    <div className="relative">
                      <Input id="doctor-name" placeholder="Dr. Jane Smith" className="pl-10" />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctor-email">Email</Label>
                    <div className="relative">
                      <Input id="doctor-email" type="email" placeholder="dr.jane@example.com" className="pl-10" />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input id="license" placeholder="MD12345678" />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="pt-4 space-y-4">
                <Button className="w-full" onClick={handleFinish}>
                  Continue with Email
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={handleFinish}>
                  <Fingerprint className="mr-2 h-4 w-4" />
                  Biometric Authentication
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default OnboardingPage
