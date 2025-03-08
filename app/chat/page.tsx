"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatFeedback } from "@/components/chat-feedback"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your OpenGovTools assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        hello: "Hello! How can I assist you with government services today?",
        help: "I can help you with information about government services, project status updates, reporting issues, or finding relevant documents. What would you like to know?",
        project:
          "You can track the status of public projects on our Projects page. Would you like me to help you find a specific project?",
        budget:
          "Budget information is available in the Government Data section. You can view detailed breakdowns by department and track expenditures in real-time.",
        report:
          "You can report issues anonymously through this chat. Your identity will be protected while ensuring your concerns reach the appropriate department.",
        document:
          "I can help you find government documents. Please specify what type of document you're looking for (e.g., permits, regulations, forms).",
      }

      let botResponse =
        "I'm not sure how to respond to that. Could you try rephrasing or ask about government services, projects, or data?"

      // Simple keyword matching
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          botResponse = response
          break
        }
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">AI-Powered Assistant</h1>
            <p className="text-muted-foreground">
              Get instant assistance, report issues anonymously, and receive guidance on government services.
            </p>
          </div>

          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle>OpenGovTools Assistant</CardTitle>
              <CardDescription>
                Ask questions about government services, report issues, or get help navigating the platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className="h-8 w-8">
                          {message.sender === "bot" ? (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </>
                          ) : (
                            <>
                              <AvatarImage src="/placeholder.svg?height=32&width=32" />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button size="icon" onClick={handleSendMessage} disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="faq">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>
            <TabsContent value="faq" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">How do I report an issue anonymously?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  Simply type "I want to report an issue" in the chat, and the assistant will guide you through the
                  anonymous reporting process.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Can I track the status of my request?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  Yes, you'll receive a unique tracking ID for each request that you can use to check its status without
                  revealing your identity.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">What kind of issues can I report?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  You can report infrastructure problems, service issues, concerns about public projects, or provide
                  feedback on government services.
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">How is my anonymity protected?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  The system uses end-to-end encryption and doesn't store personally identifiable information. Your IP
                  address and device information are not linked to your reports.
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topics" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                  onClick={() => setInput("Tell me about budget allocation")}
                >
                  Budget Information
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                  onClick={() => setInput("How do I track project status?")}
                >
                  Project Tracking
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                  onClick={() => setInput("I want to report an issue")}
                >
                  Report an Issue
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                  onClick={() => setInput("How can I find government documents?")}
                >
                  Find Documents
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                  onClick={() => setInput("What services are available for citizens?")}
                >
                  Citizen Services
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                  onClick={() => setInput("How can I participate in decision making?")}
                >
                  Public Participation
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription>Your recent chat history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground text-center py-4">No recent conversations found</div>
            </CardContent>
          </Card>

          <ChatFeedback />
        </div>
      </div>
    </div>
  )
}

