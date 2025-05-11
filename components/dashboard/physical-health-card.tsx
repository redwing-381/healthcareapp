"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export function PhysicalHealthCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="overflow-hidden h-full">
        <CardHeader className="bg-secondary/10">
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Physical Health</span>
          </CardTitle>
          <CardDescription>Check symptoms and track your physical health</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Check</p>
                <p className="text-lg">7 days ago</p>
              </div>
              <motion.div
                className="space-y-1"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-sm font-medium">Status</p>
                <p className="text-lg text-green-500">Healthy</p>
              </motion.div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Recent Symptoms:</h3>
              <div className="flex flex-wrap gap-2">
                <motion.div
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
                >
                  Headache (May 2)
                </motion.div>
                <motion.div
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
                >
                  Fatigue (Apr 28)
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-4">
          <Button asChild variant="secondary" className="w-full">
            <Link href="/symptom-checker">
              Check Symptoms <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
