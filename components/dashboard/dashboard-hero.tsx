"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Sun, Moon, Sunrise, Sunset } from "lucide-react"
import { motion } from "framer-motion"

export function DashboardHero() {
  const [greeting, setGreeting] = useState("")
  const [icon, setIcon] = useState<React.ReactNode>(null)

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours()

      if (hour >= 5 && hour < 12) {
        setGreeting("Good Morning")
        setIcon(<Sunrise className="h-6 w-6 text-amber-500" />)
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good Afternoon")
        setIcon(<Sun className="h-6 w-6 text-amber-500" />)
      } else if (hour >= 18 && hour < 22) {
        setGreeting("Good Evening")
        setIcon(<Sunset className="h-6 w-6 text-indigo-400" />)
      } else {
        setGreeting("Good Night")
        setIcon(<Moon className="h-6 w-6 text-indigo-400" />)
      }
    }

    getGreeting()

    // Update greeting every hour
    const interval = setInterval(getGreeting, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-none">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {icon}
            </motion.div>
            <motion.h1
              className="text-2xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {greeting}, Alex!
            </motion.h1>
          </div>
          <motion.p
            className="mt-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Your mental health is stable today. You have 1 upcoming appointment.
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
