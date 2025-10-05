"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, BookOpen, Target, Sparkles, ArrowRight, CheckCircle2, TrendingUp, Layers } from "lucide-react"

export default function AnalysisDashboard() {
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true)
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const analysisData = {
    totalHours: 24,
    totalVideos: 45,
    difficulty: "Intermediate",
    topics: [
      { name: "C# Fundamentals", hours: 8, videos: 15 },
      { name: "Object-Oriented Programming", hours: 6, videos: 12 },
      { name: "LINQ & Collections", hours: 5, videos: 10 },
      { name: "Async Programming", hours: 5, videos: 8 },
    ],
    structure: [
      { week: 1, focus: "Basics & Syntax", completion: 0 },
      { week: 2, focus: "OOP Concepts", completion: 0 },
      { week: 3, focus: "Advanced Features", completion: 0 },
      { week: 4, focus: "Real Projects", completion: 0 },
    ],
  }

  const handleGeneratePlan = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LIFE ORCHESTRATOR AI
            </h1>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl text-pretty font-medium">Content Analysis</p>
        </div>

        {!isComplete ? (
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95 max-w-2xl mx-auto">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Analyzing Your Content</CardTitle>
              <CardDescription className="text-base">
                AI is breaking down the structure, topics, and creating your personalized path...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={analysisProgress} className="h-3" />
                <p className="text-center text-sm text-muted-foreground">{analysisProgress}% Complete</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <CardTitle className="text-2xl">Analysis Complete</CardTitle>
                </div>
                <CardDescription className="text-base">Here's what I found in your learning content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {analysisData.totalHours}h
                          </p>
                          <p className="text-sm text-muted-foreground">Total Duration</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                            {analysisData.totalVideos}
                          </p>
                          <p className="text-sm text-muted-foreground">Learning Units</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            {analysisData.difficulty}
                          </p>
                          <p className="text-sm text-muted-foreground">Difficulty Level</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Key Topics
                  </CardTitle>
                  <CardDescription>Main areas covered in your learning content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisData.topics.map((topic, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{topic.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          {topic.hours}h • {topic.videos} units
                        </Badge>
                      </div>
                      <Progress value={(topic.hours / analysisData.totalHours) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary" />
                    Learning Structure
                  </CardTitle>
                  <CardDescription>Recommended weekly breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisData.structure.map((week, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <p className="text-lg font-bold text-primary">W{week.week}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Week {week.week}</p>
                        <p className="text-sm text-muted-foreground">{week.focus}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Ready to Build Your Personalized Plan?</p>
                      <p className="text-sm text-muted-foreground">
                        I'll create a custom learning journey that fits your schedule and integrates your hobbies
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleGeneratePlan}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shrink-0"
                  >
                    Generate My Plan
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
