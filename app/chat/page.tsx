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

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatPage() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!chatContainerRef.current) return;

    // Remove existing iframe if already exists
    const existingIframe = document.getElementById("botpress-webchat");
    if (existingIframe) existingIframe.remove();

    // Create a new iframe
    const iframe = document.createElement("iframe");
    iframe.id = "botpress-webchat";
    iframe.src =
      "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/03/07/08/20250307081302-GJG1SPAF.json";
    iframe.style.width = "100%";
    iframe.style.height = "500px"; 
    iframe.style.border = "none";

    chatContainerRef.current.appendChild(iframe);
  }, []);

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
                <div className="space-y-4"
                ref={chatContainerRef}>
                  
                </div>
            </CardContent>
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
                >
                  Budget Information
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                >
                  Project Tracking
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                >
                  Report an Issue
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                >
                  Find Documents
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                >
                  Citizen Services
                </Button>
                <Button
                  variant="outline"
                  className="justify-start h-auto py-2"
                >
                  Public Participation
                </Button>
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  )
}

