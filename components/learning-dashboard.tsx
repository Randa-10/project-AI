"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Brain,
  Trophy,
  Flame,
  Target,
  PlayCircle,
  Code,
  CheckCircle2,
  Calendar,
  Clock,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react"

type Task = {
  id: string
  title: string
  type: "video" | "exercise" | "project"
  duration: string
  completed: boolean
  hobbyIntegrated?: string
}

export default function LearningDashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Watch: C# Variables and Data Types",
      type: "video",
      duration: "15 min",
      completed: false,
    },
    {
      id: "2",
      title: "Exercise: Build a Football Stats Calculator",
      type: "exercise",
      duration: "30 min",
      completed: false,
      hobbyIntegrated: "Football",
    },
    {
      id: "3",
      title: "Watch: Control Flow and Loops",
      type: "video",
      duration: "20 min",
      completed: false,
    },
    {
      id: "4",
      title: "Code Challenge: Recipe Ingredient Manager",
      type: "exercise",
      duration: "25 min",
      completed: false,
      hobbyIntegrated: "Cooking",
    },
    {
      id: "5",
      title: "Project: Build Your First Console App",
      type: "project",
      duration: "45 min",
      completed: false,
    },
  ])

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  const stats = {
    streak: 7,
    xp: 1250,
    level: 3,
    weekProgress: 65,
  }

  const getTaskIcon = (type: string) => {
    switch (type) {
      case "video":
        return PlayCircle
      case "exercise":
        return Code
      case "project":
        return Target
      default:
        return CheckCircle2
    }
  }

  const getTaskColor = (type: string) => {
    switch (type) {
      case "video":
        return "from-blue-500 to-cyan-500"
      case "exercise":
        return "from-purple-500 to-pink-500"
      case "project":
        return "from-amber-500 to-orange-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Welcome Back, Randa!</h1>
            </div>
            <p className="text-muted-foreground text-lg">Ready to continue your learning journey?</p>
          </div>

          <div className="flex items-center gap-3">
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Flame className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.streak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Zap className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.xp}</p>
                  <p className="text-xs text-muted-foreground">XP Points</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Today's Plan
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      {completedTasks} of {totalTasks} tasks completed
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    Week 1, Day 3
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Daily Progress</span>
                    <span className="font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>

                <div className="space-y-3 pt-2">
                  {tasks.map((task) => {
                    const Icon = getTaskIcon(task.type)
                    return (
                      <div
                        key={task.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all ${
                          task.completed
                            ? "bg-muted/50 border-muted opacity-60"
                            : "bg-card border-border hover:border-primary/50 hover:shadow-md"
                        }`}
                      >
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="mt-1"
                        />
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getTaskColor(task.type)} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${task.completed ? "line-through" : ""}`}>{task.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {task.duration}
                            </Badge>
                            {task.hobbyIntegrated && (
                              <Badge className="text-xs bg-accent/20 text-accent-foreground border-accent/30">
                                <Star className="w-3 h-3 mr-1" />
                                {task.hobbyIntegrated}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {completedTasks === totalTasks && (
                  <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 border-2 border-emerald-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-700 dark:text-emerald-300">
                          Amazing work today, Randa!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You've completed all your tasks. Keep up the momentum!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Personalized Projects
                </CardTitle>
                <CardDescription>Projects tailored to your interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shrink-0">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Football Stats Tracker</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Build a console app to track player statistics and team performance
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Unlocks in 2 days
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shrink-0">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Recipe Manager App</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Create a digital cookbook with ingredient lists and cooking instructions
                      </p>
                      <Badge variant="outline" className="mt-2 text-xs">
                        Unlocks in 5 days
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Week 1 Progress</span>
                    <span className="text-sm font-medium">{stats.weekProgress}%</span>
                  </div>
                  <Progress value={stats.weekProgress} className="h-2" />
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card">
                    <span className="text-sm">Current Level</span>
                    <Badge className="bg-gradient-to-r from-primary to-accent">Level {stats.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-card">
                    <span className="text-sm">XP to Next Level</span>
                    <span className="text-sm font-medium">250 XP</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Week Warrior</p>
                    <p className="text-xs text-muted-foreground">7-day streak</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Quick Learner</p>
                    <p className="text-xs text-muted-foreground">Completed 10 tasks</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border opacity-50">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Project Master</p>
                    <p className="text-xs text-muted-foreground">Complete 3 projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              onClick={() => (window.location.href = "/review")}
            >
              View Weekly Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
