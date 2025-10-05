"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Trophy,
  Flame,
  Target,
  TrendingUp,
  Star,
  CheckCircle2,
  Clock,
  Zap,
  Award,
  ArrowRight,
  Calendar,
  BookOpen,
  Code,
} from "lucide-react"

export default function WeeklyReview() {
  const weekData = {
    weekNumber: 1,
    dateRange: "Jan 1 - Jan 7, 2025",
    completionRate: 85,
    totalTasks: 20,
    completedTasks: 17,
    totalHours: 8.5,
    streak: 7,
    xpEarned: 850,
    levelUp: true,
    newLevel: 3,
  }

  const achievements = [
    {
      title: "Week Warrior",
      description: "Completed 7 consecutive days",
      icon: Flame,
      color: "from-orange-500 to-red-500",
      earned: true,
    },
    {
      title: "Quick Learner",
      description: "Finished 15+ tasks in one week",
      icon: Zap,
      color: "from-yellow-500 to-amber-500",
      earned: true,
    },
    {
      title: "Code Master",
      description: "Completed 3 coding exercises",
      icon: Code,
      color: "from-purple-500 to-pink-500",
      earned: true,
    },
    {
      title: "Level Up!",
      description: "Reached Level 3",
      icon: Award,
      color: "from-blue-500 to-cyan-500",
      earned: true,
    },
  ]

  const topicProgress = [
    { topic: "C# Fundamentals", progress: 90, hours: 3.5 },
    { topic: "Object-Oriented Programming", progress: 75, hours: 2.5 },
    { topic: "Control Flow & Loops", progress: 85, hours: 2.5 },
  ]

  const strengths = [
    "Excellent consistency with daily learning",
    "Strong grasp of C# syntax and fundamentals",
    "Great problem-solving in coding exercises",
  ]

  const improvements = [
    "Try to complete projects earlier in the week",
    "Spend more time on advanced OOP concepts",
    "Practice debugging techniques",
  ]

  const nextWeekPreview = {
    focus: "Advanced C# Features & LINQ",
    estimatedHours: 9,
    projects: ["Football Stats Tracker", "Recipe Manager"],
    newTopics: ["LINQ Queries", "Collections", "Exception Handling"],
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-balance">Weekly Review</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Week {weekData.weekNumber} • {weekData.dateRange}
          </p>
        </div>

        {weekData.levelUp && (
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 mb-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 animate-pulse" />
            <CardContent className="pt-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <Trophy className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-balance">Congratulations, Randa!</p>
                    <p className="text-muted-foreground">You've reached Level {weekData.newLevel}!</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-primary to-accent text-lg px-4 py-2">
                  Level {weekData.newLevel}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {weekData.completionRate}%
                  </p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{weekData.totalHours}h</p>
                  <p className="text-sm text-muted-foreground">Learning Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{weekData.streak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{weekData.xpEarned}</p>
                  <p className="text-sm text-muted-foreground">XP Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Achievements Unlocked
              </CardTitle>
              <CardDescription>New badges earned this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r ${achievement.color} bg-opacity-10 border border-opacity-20`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Topic Progress
              </CardTitle>
              <CardDescription>Your learning breakdown this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topicProgress.map((topic, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{topic.topic}</p>
                    <Badge variant="secondary" className="text-xs">
                      {topic.hours}h
                    </Badge>
                  </div>
                  <Progress value={topic.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">{topic.progress}% complete</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-emerald-500" />
                Your Strengths
              </CardTitle>
              <CardDescription>What you excelled at this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{strength}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Areas to Improve
              </CardTitle>
              <CardDescription>Focus points for next week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {improvements.map((improvement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
                >
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{improvement}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Next Week Preview
            </CardTitle>
            <CardDescription>Week 2 • {nextWeekPreview.focus}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">Estimated Time</p>
                </div>
                <p className="text-2xl font-bold">{nextWeekPreview.estimatedHours}h</p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">Projects</p>
                </div>
                <p className="text-2xl font-bold">{nextWeekPreview.projects.length}</p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <p className="text-sm font-semibold">New Topics</p>
                </div>
                <p className="text-2xl font-bold">{nextWeekPreview.newTopics.length}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-2">Upcoming Projects</p>
                <div className="flex flex-wrap gap-2">
                  {nextWeekPreview.projects.map((project, index) => (
                    <Badge key={index} variant="secondary">
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2">New Topics to Learn</p>
                <div className="flex flex-wrap gap-2">
                  {nextWeekPreview.newTopics.map((topic, index) => (
                    <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Start Week 2
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
