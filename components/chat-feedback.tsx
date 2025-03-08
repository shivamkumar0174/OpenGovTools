"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ChatFeedback() {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleFeedback = (type: "positive" | "negative") => {
    setFeedback(type)
  }

  const handleSubmit = () => {
    // In a real app, this would send the feedback to your backend
    toast({
      title: "Feedback submitted",
      description: "Thank you for helping us improve our AI assistant.",
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thank You!</CardTitle>
          <CardDescription>Your feedback helps us improve our AI assistant.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We appreciate your input and will use it to enhance the quality of our responses.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>How was your experience?</CardTitle>
        <CardDescription>Help us improve our AI assistant with your feedback.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center gap-4">
          <Button
            variant={feedback === "positive" ? "default" : "outline"}
            size="lg"
            className="flex-1"
            onClick={() => handleFeedback("positive")}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Helpful
          </Button>
          <Button
            variant={feedback === "negative" ? "default" : "outline"}
            size="lg"
            className="flex-1"
            onClick={() => handleFeedback("negative")}
          >
            <ThumbsDown className="mr-2 h-4 w-4" />
            Not Helpful
          </Button>
        </div>

        {feedback && (
          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium">
              Additional comments (optional)
            </label>
            <Textarea
              id="comment"
              placeholder="Tell us more about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!feedback} onClick={handleSubmit}>
          Submit Feedback
        </Button>
      </CardFooter>
    </Card>
  )
}

