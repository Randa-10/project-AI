"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Lightbulb,
  Code,
  Play,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

type Hint = {
  type: "tip" | "warning" | "success"
  message: string
}

export default function ProjectWorkspace() {
  const [code, setCode] = useState(`using System;

class Program
{
    static void Main()
    {
        // TODO: Create your Football Stats Tracker
        Console.WriteLine("Welcome to Football Stats Tracker!");
    }
}`)

  const [hints, setHints] = useState<Hint[]>([
    {
      type: "tip",
      message: "Start by creating a Player class with properties like Name, Goals, and Assists",
    },
    {
      type: "tip",
      message: "Use a List<Player> to store multiple players",
    },
  ])

  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState("")

  const projectInfo = {
    title: "Football Stats Tracker",
    description: "Build a console app to track player statistics",
    difficulty: "Beginner",
    skillLevel: "C# Fundamentals",
    progress: 35,
    steps: [
      { title: "Create Player class", completed: true },
      { title: "Add data storage", completed: true },
      { title: "Implement add player function", completed: false },
      { title: "Display statistics", completed: false },
      { title: "Add sorting features", completed: false },
    ],
  }

  const handleRunCode = () => {
    setIsRunning(true)
    setTimeout(() => {
      setOutput("Welcome to Football Stats Tracker!\n\nProgram executed successfully!")
      setIsRunning(false)
      setHints([
        ...hints,
        {
          type: "success",
          message: "Great start! Now try adding a Player class with properties.",
        },
      ])
    }, 1500)
  }

  const handleGetHint = () => {
    const newHints: Hint[] = [
      {
        type: "tip",
        message: "Try creating a method called AddPlayer() that takes player details as parameters",
      },
      {
        type: "tip",
        message: "Remember to use proper naming conventions: PascalCase for class names",
      },
      {
        type: "warning",
        message: "Don't forget to handle edge cases like empty player names",
      },
    ]
    const randomHint = newHints[Math.floor(Math.random() * newHints.length)]
    setHints([...hints, randomHint])
  }

  const getHintIcon = (type: string) => {
    switch (type) {
      case "tip":
        return Lightbulb
      case "warning":
        return AlertCircle
      case "success":
        return CheckCircle2
      default:
        return Lightbulb
    }
  }

  const getHintColor = (type: string) => {
    switch (type) {
      case "tip":
        return "from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300"
      case "warning":
        return "from-amber-500/10 to-yellow-500/10 border-amber-500/20 text-amber-700 dark:text-amber-300"
      case "success":
        return "from-emerald-500/10 to-green-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300"
      default:
        return "from-gray-500/10 to-gray-500/10 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Project Workspace</h1>
              <p className="text-sm text-muted-foreground">AI-guided coding environment</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
            Back to Dashboard
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      {projectInfo.title}
                    </CardTitle>
                    <CardDescription className="mt-1">{projectInfo.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {projectInfo.difficulty}
                    </Badge>
                    <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                      {projectInfo.skillLevel}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Project Progress</span>
                    <span className="font-medium">{projectInfo.progress}%</span>
                  </div>
                  <Progress value={projectInfo.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Code Editor</Label>
                  <div className="relative">
                    <Textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="font-mono text-sm min-h-[400px] resize-none bg-muted/50"
                      placeholder="Write your code here..."
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        C#
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:opacity-90"
                  >
                    {isRunning ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Run Code
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleGetHint}>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get AI Hint
                  </Button>
                </div>

                {output && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Output</Label>
                    <div className="p-4 rounded-lg bg-muted/50 border border-border font-mono text-sm whitespace-pre-wrap">
                      {output}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Project Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {projectInfo.steps.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      step.completed ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-muted/50"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        step.completed ? "bg-emerald-500/20" : "bg-muted"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <span className="text-xs font-medium text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <p className={`text-sm ${step.completed ? "line-through opacity-60" : "font-medium"}`}>
                      {step.title}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  AI Hints & Tips
                </CardTitle>
                <CardDescription className="text-xs">Real-time guidance as you code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
                {hints.map((hint, index) => {
                  const Icon = getHintIcon(hint.type)
                  return (
                    <div key={index} className={`p-3 rounded-lg bg-gradient-to-r border ${getHintColor(hint.type)}`}>
                      <div className="flex items-start gap-2">
                        <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                        <p className="text-xs leading-relaxed">{hint.message}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Skill Indicators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Code Quality</span>
                    <Badge variant="secondary" className="text-xs">
                      Good
                    </Badge>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Best Practices</span>
                    <Badge variant="secondary" className="text-xs">
                      Improving
                    </Badge>
                  </div>
                  <Progress value={55} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Problem Solving</span>
                    <Badge variant="secondary" className="text-xs">
                      Excellent
                    </Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
