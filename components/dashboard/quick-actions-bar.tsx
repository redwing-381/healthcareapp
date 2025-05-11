"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Calendar, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function QuickActionsBar() {
  const actions = [
    {
      title: "Record Symptoms",
      icon: PlusCircle,
      href: "/symptom-checker",
      color: "text-primary",
      delay: 0.2,
    },
    {
      title: "View History",
      icon: FileText,
      href: "/health-records",
      color: "text-secondary",
      delay: 0.3,
    },
    {
      title: "Book Appointment",
      icon: Calendar,
      href: "/appointments",
      color: "text-green-500",
      delay: 0.4,
    },
    {
      title: "Chat with Doctor",
      icon: MessageSquare,
      href: "/chat",
      color: "text-blue-500",
      delay: 0.5,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: action.delay }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Button variant="outline" className="h-auto flex-col py-4 px-2 w-full transition-transform" asChild>
                  <Link href={action.href}>
                    <action.icon className={`h-6 w-6 mb-2 ${action.color}`} />
                    <span>{action.title}</span>
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
