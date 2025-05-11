"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, ImageIcon, Mic, Phone, Video, MoreHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [activeChat, setActiveChat] = useState("1")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const chats = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Primary Care Physician",
      avatar: null,
      status: "online",
      lastMessage: "I'll review your lab results and get back to you.",
      time: "10:30 AM",
      unread: 0,
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      avatar: null,
      status: "offline",
      lastMessage: "Your heart rate looks normal. Keep up the good work!",
      time: "Yesterday",
      unread: 2,
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      role: "Neurologist",
      avatar: null,
      status: "online",
      lastMessage: "Let me know if the headaches persist.",
      time: "May 2",
      unread: 0,
    },
  ]

  const [messages, setMessages] = useState({
    "1": [
      {
        id: "1",
        sender: "doctor",
        content: "Hello Alex, how are you feeling today?",
        timestamp: "10:00 AM",
      },
      {
        id: "2",
        sender: "patient",
        content: "Hi Dr. Johnson, I'm feeling better than yesterday. The medication seems to be helping.",
        timestamp: "10:05 AM",
      },
      {
        id: "3",
        sender: "doctor",
        content: "That's great to hear! Any side effects from the medication?",
        timestamp: "10:10 AM",
      },
      {
        id: "4",
        sender: "patient",
        content: "Just a bit of drowsiness in the morning, but it goes away after an hour or so.",
        timestamp: "10:15 AM",
      },
      {
        id: "5",
        sender: "doctor",
        content:
          "That's a common side effect and should diminish over time. I'll review your lab results and get back to you.",
        timestamp: "10:30 AM",
      },
    ],
    "2": [
      {
        id: "1",
        sender: "doctor",
        content: "Hello Alex, I've reviewed your recent ECG results.",
        timestamp: "Yesterday, 2:00 PM",
      },
      {
        id: "2",
        sender: "doctor",
        content: "Your heart rate looks normal. Keep up the good work!",
        timestamp: "Yesterday, 2:05 PM",
      },
    ],
    "3": [
      {
        id: "1",
        sender: "patient",
        content: "Dr. Rodriguez, I've been experiencing headaches more frequently this week.",
        timestamp: "May 2, 11:00 AM",
      },
      {
        id: "2",
        sender: "doctor",
        content: "I'm sorry to hear that. Can you describe the pain and when it typically occurs?",
        timestamp: "May 2, 11:10 AM",
      },
      {
        id: "3",
        sender: "patient",
        content: "It's usually a dull pain that starts in the afternoon and gets worse by evening.",
        timestamp: "May 2, 11:15 AM",
      },
      {
        id: "4",
        sender: "doctor",
        content: "Let me know if the headaches persist. We might need to adjust your treatment plan.",
        timestamp: "May 2, 11:20 AM",
      },
    ],
  })

  const doctorResponses = {
    "1": [
      "I'm glad to hear that. How has your sleep been lately?",
      "Have you been able to maintain your exercise routine we discussed?",
      "That's good progress. Remember to stay hydrated, especially with this medication.",
      "I'll make a note of that in your chart. Is there anything else you'd like to discuss today?",
      "Your latest test results look promising. We're on the right track with your treatment plan.",
    ],
    "2": [
      "Remember to continue monitoring your blood pressure daily as we discussed.",
      "Have you noticed any chest discomfort or shortness of breath recently?",
      "The new medication seems to be working well based on your latest readings.",
      "Try to limit sodium intake as we discussed during your last visit.",
      "Your heart rhythm is showing improvement compared to your previous ECG.",
    ],
    "3": [
      "Are you keeping track of potential triggers for your headaches?",
      "Have you tried the relaxation techniques I recommended?",
      "It might be helpful to keep a headache journal to identify patterns.",
      "Let's schedule a follow-up appointment to discuss your symptoms in more detail.",
      "I'm considering adjusting your medication dosage based on your symptoms.",
    ],
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message
      const newUserMessage = {
        id: `${Date.now()}`,
        sender: "patient",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setMessages((prev) => ({
        ...prev,
        [activeChat]: [...prev[activeChat as keyof typeof prev], newUserMessage],
      }))

      setMessage("")

      // Simulate doctor typing
      setIsTyping(true)

      // Simulate doctor response after a delay
      setTimeout(
        () => {
          setIsTyping(false)

          // Get random response for the active doctor
          const responses = doctorResponses[activeChat as keyof typeof doctorResponses]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]

          const newDoctorMessage = {
            id: `${Date.now() + 1}`,
            sender: "doctor",
            content: randomResponse,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }

          setMessages((prev) => ({
            ...prev,
            [activeChat]: [...prev[activeChat as keyof typeof prev], newDoctorMessage],
          }))
        },
        2000 + Math.random() * 1000,
      ) // Random delay between 2-3 seconds
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChat, isTyping])

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-2 mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">Chat with your healthcare providers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="px-4 py-3">
            <CardTitle>Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto flex-1">
            <div className="divide-y">
              {chats.map((chat) => (
                <motion.div
                  key={chat.id}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    activeChat === chat.id ? "bg-primary/10" : ""
                  }`}
                  onClick={() => setActiveChat(chat.id)}
                  whileHover={{
                    backgroundColor: activeChat === chat.id ? "rgba(var(--primary), 0.1)" : "rgba(0, 0, 0, 0.05)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {chat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <h3 className="font-medium truncate">{chat.name}</h3>
                          <p className="text-xs text-muted-foreground">{chat.role}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                          {chat.unread > 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <Badge className="mt-1">{chat.unread}</Badge>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">{chat.lastMessage}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          {activeChat ? (
            <>
              <CardHeader className="px-6 py-4 border-b flex flex-row items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {chats
                        .find((c) => c.id === activeChat)
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{chats.find((c) => c.id === activeChat)?.name}</CardTitle>
                    <CardDescription className="flex items-center">
                      <motion.span
                        className={`h-2 w-2 rounded-full mr-2 ${
                          chats.find((c) => c.id === activeChat)?.status === "online"
                            ? "bg-green-500"
                            : "bg-muted-foreground"
                        }`}
                        animate={
                          chats.find((c) => c.id === activeChat)?.status === "online"
                            ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
                            : {}
                        }
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      />
                      {chats.find((c) => c.id === activeChat)?.status === "online" ? "Online" : "Offline"}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 overflow-auto flex-1">
                <div className="space-y-4">
                  <AnimatePresence>
                    {messages[activeChat as keyof typeof messages].map((msg) => (
                      <motion.div
                        key={msg.id}
                        className={`flex ${msg.sender === "doctor" ? "justify-start" : "justify-end"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`flex ${
                            msg.sender === "doctor" ? "flex-row" : "flex-row-reverse"
                          } items-start gap-2 max-w-[80%]`}
                        >
                          {msg.sender === "doctor" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {chats
                                  .find((c) => c.id === activeChat)
                                  ?.name.split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          {msg.sender === "patient" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>AJ</AvatarFallback>
                            </Avatar>
                          )}
                          <div>
                            <motion.div
                              className={`rounded-lg p-3 ${
                                msg.sender === "doctor" ? "bg-muted" : "bg-primary text-primary-foreground"
                              }`}
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-sm">{msg.content}</p>
                            </motion.div>
                            <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-row items-start gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {chats
                              .find((c) => c.id === activeChat)
                              ?.name.split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-3 bg-muted">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 rounded-full bg-muted-foreground"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 rounded-full bg-muted-foreground"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 rounded-full bg-muted-foreground"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <div className="flex items-center space-x-2 w-full">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
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
                    className="flex-1"
                  />
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="icon" onClick={handleSendMessage} disabled={!message.trim() || isTyping}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
