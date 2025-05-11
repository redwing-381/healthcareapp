"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, ImageIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function PatientChat() {
  const [message, setMessage] = useState("")

  const messages = [
    {
      id: "1",
      sender: "patient",
      content: "Hello Dr. Johnson, I've been experiencing headaches more frequently this week.",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      sender: "doctor",
      content: "I'm sorry to hear that, Alex. Can you describe the pain and when it typically occurs?",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      sender: "patient",
      content:
        "It's usually a dull pain that starts in the afternoon and gets worse by evening. It's mostly on the right side of my head.",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      sender: "doctor",
      content: "Have you noticed any triggers? Changes in diet, sleep, or stress levels?",
      timestamp: "10:37 AM",
    },
    {
      id: "5",
      sender: "patient",
      content: "I've been working longer hours and not sleeping well. Could that be related?",
      timestamp: "10:40 AM",
    },
    {
      id: "6",
      sender: "doctor",
      content:
        "Yes, sleep deprivation and stress are common triggers for tension headaches. I'd recommend trying to maintain a regular sleep schedule and practicing some relaxation techniques.",
      timestamp: "10:42 AM",
    },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, you would add the message to the messages array
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "doctor" ? "justify-start" : "justify-end"}`}>
            <div
              className={`flex ${msg.sender === "doctor" ? "flex-row" : "flex-row-reverse"} items-start gap-2 max-w-[80%]`}
            >
              {msg.sender === "doctor" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              )}
              {msg.sender === "patient" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div
                  className={`rounded-lg p-3 ${
                    msg.sender === "doctor" ? "bg-muted" : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
          />
          <Button size="icon" onClick={handleSendMessage} disabled={!message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
