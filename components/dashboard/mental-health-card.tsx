"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function MentalHealthCard() {
  const [mood, setMood] = useState("calm") // calm, stressed, happy, sad

  const getMoodColor = () => {
    switch (mood) {
      case "calm":
        return "bg-green-500"
      case "stressed":
        return "bg-red-500"
      case "happy":
        return "bg-amber-500"
      case "sad":
        return "bg-blue-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden h-full">
        <CardHeader className="bg-primary/10">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Mental Health Status</span>
          </CardTitle>
          <CardDescription>Track your mood and emotional wellbeing</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <motion.div className="relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                className="h-24 w-24 rounded-full bg-muted flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
              >
                <motion.div
                  className={`h-16 w-16 rounded-full ${getMoodColor()}`}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                ></motion.div>
              </motion.div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-card px-3 py-1 rounded-full border text-sm font-medium">
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </div>
            </motion.div>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Today's Insights:</h3>
            <p className="text-sm text-muted-foreground">
              Your stress levels are lower than yesterday. Continue with your meditation practice for optimal results.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-4">
          <Button asChild className="w-full">
            <Link href="/mental-health">
              Start Mental Health Session <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
