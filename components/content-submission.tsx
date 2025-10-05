"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Link2, FileText, Video, Sparkles, ArrowRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type ContentType = "youtube" | "url" | "text" | null

export default function ContentSubmission() {
  const [contentType, setContentType] = useState<ContentType>(null)
  const [contentUrl, setContentUrl] = useState("")
  const [contentText, setContentText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAnalyzing(true)

    // Simulate API call
    setTimeout(() => {
      console.log("[v0] Content submitted:", { contentType, contentUrl, contentText })
      // Navigate to analysis dashboard
      window.location.href = "/analysis"
    }, 2000)
  }

  const contentOptions = [
    {
      type: "youtube" as ContentType,
      icon: Video,
      title: "YouTube Playlist",
      description: "Paste a YouTube playlist or video URL",
      color: "from-red-500 to-pink-500",
    },
    {
      type: "url" as ContentType,
      icon: Link2,
      title: "Web Content",
      description: "Share a course, article, or documentation link",
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "text" as ContentType,
      icon: FileText,
      title: "Custom Content",
      description: "Paste or describe your learning material",
      color: "from-purple-500 to-indigo-500",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LIFE ORCHESTRATOR AI
            </h1>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl text-pretty font-medium">Add Your Learning Source</p>
          <p className="text-muted-foreground text-sm mt-2">
            Share what you want to learn, and I'll create your personalized path
          </p>
        </div>

        {!contentType ? (
          <div className="grid md:grid-cols-3 gap-4">
            {contentOptions.map((option) => {
              const Icon = option.icon
              return (
                <Card
                  key={option.type}
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => setContentType(option.type)}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                    <CardDescription className="text-sm">{option.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-1 pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {contentType === "youtube" && "YouTube Content"}
                  {contentType === "url" && "Web Content"}
                  {contentType === "text" && "Custom Content"}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setContentType(null)}>
                  Change
                </Button>
              </div>
              <CardDescription className="text-base">
                {contentType === "youtube" && "Paste your YouTube playlist or video URL below"}
                {contentType === "url" && "Share the URL of your learning resource"}
                {contentType === "text" && "Describe or paste your learning material"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {(contentType === "youtube" || contentType === "url") && (
                  <div className="space-y-3">
                    <Label htmlFor="content-url" className="text-base font-semibold">
                      {contentType === "youtube" ? "YouTube URL" : "Content URL"}
                    </Label>
                    <Input
                      id="content-url"
                      type="url"
                      placeholder={
                        contentType === "youtube"
                          ? "https://youtube.com/playlist?list=..."
                          : "https://example.com/course"
                      }
                      value={contentUrl}
                      onChange={(e) => setContentUrl(e.target.value)}
                      className="text-base"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      {contentType === "youtube"
                        ? "I'll analyze the videos, duration, and topics for you"
                        : "I'll extract the key learning points and structure"}
                    </p>
                  </div>
                )}

                {contentType === "text" && (
                  <div className="space-y-3">
                    <Label htmlFor="content-text" className="text-base font-semibold">
                      Learning Material
                    </Label>
                    <Textarea
                      id="content-text"
                      placeholder="Paste your course outline, syllabus, or describe what you want to learn..."
                      value={contentText}
                      onChange={(e) => setContentText(e.target.value)}
                      className="min-h-[200px] resize-none text-base"
                      required
                    />
                    <p className="text-sm text-muted-foreground">
                      The more details you provide, the better I can personalize your learning plan
                    </p>
                  </div>
                )}

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">AI-Powered Analysis</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        I'll analyze your content structure, estimate learning time, identify key topics, and create a
                        personalized plan that integrates with your skills and hobbies.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setContentType(null)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                    disabled={isAnalyzing || (!contentUrl && !contentText)}
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Content
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Your content will be analyzed using AI to create the perfect learning journey
          </p>
        </div>
      </div>
    </div>
  )
}
