"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, X, Plus, Brain } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SkillWithLevel = {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced"
}

export default function ProfileSetup() {
  const [skills, setSkills] = useState<SkillWithLevel[]>([])
  const [hobbies, setHobbies] = useState<string[]>([])
  const [currentSkill, setCurrentSkill] = useState("")
  const [currentSkillLevel, setCurrentSkillLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner")
  const [currentHobby, setCurrentHobby] = useState("")
  const [backgroundType, setBackgroundType] = useState<string>("")
  const [backgroundDetails, setBackgroundDetails] = useState("")

  const addSkill = () => {
    if (currentSkill.trim() && !skills.some((s) => s.name === currentSkill.trim())) {
      setSkills([...skills, { name: currentSkill.trim(), level: currentSkillLevel }])
      setCurrentSkill("")
      setCurrentSkillLevel("Beginner")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill.name !== skillToRemove))
  }

  const addHobby = () => {
    if (currentHobby.trim() && !hobbies.includes(currentHobby.trim())) {
      setHobbies([...hobbies, currentHobby.trim()])
      setCurrentHobby("")
    }
  }

  const removeHobby = (hobbyToRemove: string) => {
    setHobbies(hobbies.filter((hobby) => hobby !== hobbyToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ skills, hobbies, backgroundType, backgroundDetails })
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20"
      case "Intermediate":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20"
      case "Advanced":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LIFE ORCHESTRATOR AI
            </h1>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl text-pretty font-medium">
            Hey there! Ready to learn through what you love?
          </p>
          <p className="text-muted-foreground text-sm mt-2">Let's build your personalized learning DNA</p>
        </div>

        <Card className="border-2 shadow-xl backdrop-blur-sm bg-card/95">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Profile Setup
            </CardTitle>
            <CardDescription className="text-base">
              Share your skills, hobbies, and background to create your personalized learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <Label htmlFor="skills" className="text-base font-semibold">
                  Skills
                </Label>
                <p className="text-sm text-muted-foreground">Add your skills and select your proficiency level</p>
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    placeholder="e.g., C#, JavaScript, SQL, Python"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSkill()
                      }
                    }}
                    className="flex-1"
                  />
                  <Select value={currentSkillLevel} onValueChange={(value: any) => setCurrentSkillLevel(value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addSkill} size="icon" variant="secondary" className="shrink-0">
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Add skill</span>
                  </Button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="outline"
                        className={`pl-3 pr-2 py-1.5 text-sm gap-2 border ${getLevelColor(skill.level)}`}
                      >
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs opacity-75">{skill.level}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill.name)}
                          className="ml-1 hover:bg-foreground/10 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                          <span className="sr-only">Remove {skill.name}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Hobbies Section */}
              <div className="space-y-3">
                <Label htmlFor="hobbies" className="text-base font-semibold">
                  Hobbies & Interests
                </Label>
                <p className="text-sm text-muted-foreground">What do you enjoy doing in your free time?</p>
                <div className="flex gap-2">
                  <Input
                    id="hobbies"
                    placeholder="e.g., Photography, Hiking, Reading"
                    value={currentHobby}
                    onChange={(e) => setCurrentHobby(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addHobby()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addHobby} size="icon" variant="secondary" className="shrink-0">
                    <Plus className="w-4 h-4" />
                    <span className="sr-only">Add hobby</span>
                  </Button>
                </div>
                {hobbies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {hobbies.map((hobby) => (
                      <Badge
                        key={hobby}
                        variant="secondary"
                        className="pl-3 pr-2 py-1.5 text-sm gap-1.5 bg-accent/20 text-accent-foreground border border-accent/30 hover:bg-accent/30 transition-colors"
                      >
                        {hobby}
                        <button
                          type="button"
                          onClick={() => removeHobby(hobby)}
                          className="ml-1 hover:bg-accent-foreground/20 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                          <span className="sr-only">Remove {hobby}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="background-type" className="text-base font-semibold">
                  Background
                </Label>
                <p className="text-sm text-muted-foreground">Tell us about your current situation</p>
                <Select value={backgroundType} onValueChange={setBackgroundType}>
                  <SelectTrigger id="background-type">
                    <SelectValue placeholder="Select your background type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="freelancer">Freelancer</SelectItem>
                    <SelectItem value="career-changer">Career Changer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  id="background"
                  placeholder="Share more about your journey, goals, and what you're working towards..."
                  value={backgroundDetails}
                  onChange={(e) => setBackgroundDetails(e.target.value)}
                  className="min-h-[140px] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent">
                  Skip for now
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                  disabled={skills.length === 0 && hobbies.length === 0 && !backgroundType}
                >
                  Create My Learning DNA
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">Your personalized learning journey starts here</p>
      </div>
    </div>
  )
}
