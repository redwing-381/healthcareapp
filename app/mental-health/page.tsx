"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Send, Brain, Smile, Frown, Meh, Clock, Calendar } from "lucide-react"
import { EmotionWheel } from "@/components/mental-health/emotion-wheel"
import { RecommendationCard } from "@/components/mental-health/recommendation-card"

export default function MentalHealthPage() {
  const [activeTab, setActiveTab] = useState("voice")
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [inputText, setInputText] = useState("")

  const handleStartRecording = () => {
    setIsRecording(true)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    handleSubmit()
  }

  const handleSubmit = () => {
    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 3000)
  }

  const handleReset = () => {
    setShowResults(false)
    setInputText("")
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold">Mental Health Assistant</h1>
        <p className="text-muted-foreground">Share how you're feeling and get personalized insights</p>
      </div>

      {!isAnalyzing && !showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>How are you feeling today?</CardTitle>
            <CardDescription>Talk or type about your day, thoughts, or feelings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="voice">Voice</TabsTrigger>
                <TabsTrigger value="text">Text</TabsTrigger>
              </TabsList>
              <TabsContent value="voice" className="space-y-4 py-4">
                <div className="flex justify-center">
                  <div className={`waveform ${isRecording ? "active" : ""}`}>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-center pt-4">
                  <Button
                    size="lg"
                    className={`rounded-full h-16 w-16 ${isRecording ? "bg-destructive hover:bg-destructive/90" : ""}`}
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                  >
                    <Mic className="h-6 w-6" />
                  </Button>
                </div>
                <p className="text-center text-sm text-muted-foreground pt-2">
                  {isRecording ? "Tap to stop recording" : "Tap to start recording"}
                </p>
              </TabsContent>
              <TabsContent value="text" className="space-y-4 py-4">
                <Textarea
                  placeholder="Describe how you're feeling today..."
                  className="min-h-[150px] gradient-border"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <Button className="w-full" onClick={handleSubmit} disabled={!inputText.trim()}>
                  <Send className="mr-2 h-4 w-4" /> Submit
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="breathe-animation">
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/40 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-medium">Analyzing your response</h2>
            <p className="text-muted-foreground">Our AI is processing your input...</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8 fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Your Emotional Analysis</CardTitle>
              <CardDescription>Based on your input, here's how you're feeling</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <EmotionWheel />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-4">
                <Card className="bg-primary/10">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Smile className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Primary Emotion</p>
                      <p className="text-lg font-bold">Calm</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/10">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-secondary" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-lg font-bold">2 days</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted">
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Calendar className="h-8 w-8" />
                    <div>
                      <p className="text-sm font-medium">Trend</p>
                      <p className="text-lg font-bold">Improving</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recommendations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RecommendationCard
                title="5-Minute Meditation"
                description="A quick breathing exercise to center yourself"
                icon={<Brain className="h-6 w-6" />}
                actionText="Start Now"
              />

              <RecommendationCard
                title="Journal Your Thoughts"
                description="Write down what's on your mind to gain clarity"
                icon={<Meh className="h-6 w-6" />}
                actionText="Open Journal"
              />

              <RecommendationCard
                title="Connect with a Therapist"
                description="Schedule a session with a mental health professional"
                icon={<Smile className="h-6 w-6" />}
                actionText="Find Therapist"
              />

              <RecommendationCard
                title="Mood Tracking Reminder"
                description="Set a daily reminder to check in with your emotions"
                icon={<Frown className="h-6 w-6" />}
                actionText="Set Reminder"
              />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={handleReset}>
              Start New Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
