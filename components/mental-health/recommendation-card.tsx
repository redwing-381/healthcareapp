import type React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface RecommendationCardProps {
  title: string
  description: string
  icon: React.ReactNode
  actionText: string
}

export function RecommendationCard({ title, description, icon, actionText }: RecommendationCardProps) {
  return (
    <Card className="overflow-hidden fade-in">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="rounded-full p-2 bg-primary/10 text-primary">{icon}</div>
          <div className="space-y-1">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 px-6 py-4">
        <Button className="w-full">
          {actionText} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
