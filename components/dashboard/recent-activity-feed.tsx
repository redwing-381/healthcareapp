"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, FileText, MessageSquare, Activity } from "lucide-react"
import { motion } from "framer-motion"

export function RecentActivityFeed() {
  const activities = [
    {
      type: "appointment",
      title: "Appointment with Dr. Sarah Johnson",
      date: "May 1, 2025",
      description: "Annual physical checkup",
      icon: Calendar,
      color: "text-blue-500",
      delay: 0.2,
    },
    {
      type: "symptom",
      title: "Recorded Symptom: Headache",
      date: "May 2, 2025",
      description: "Mild pain, duration: 2 hours",
      icon: Activity,
      color: "text-red-500",
      delay: 0.3,
    },
    {
      type: "message",
      title: "Message from Dr. Michael Chen",
      date: "May 3, 2025",
      description: "Replied to your question about medication",
      icon: MessageSquare,
      color: "text-green-500",
      delay: 0.4,
    },
    {
      type: "record",
      title: "Lab Results Uploaded",
      date: "May 5, 2025",
      description: "Blood work results from Quest Diagnostics",
      icon: FileText,
      color: "text-purple-500",
      delay: 0.5,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest health-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg border bg-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: activity.delay }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  transition: { duration: 0.2 },
                }}
              >
                <div className={`rounded-full p-2 bg-muted ${activity.color}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{activity.title}</h4>
                    <Badge variant="outline">{activity.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{activity.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
