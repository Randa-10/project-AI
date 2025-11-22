"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  BookOpen,
  Star,
  ArrowLeft,
  ExternalLink,
  Lightbulb,
  Award,
  RefreshCw
} from "lucide-react"

interface CVAnalysisResult {
  cvSummary: string
  strengths: string[]
  areasToImprove: string[]
  enhancementSuggestions: string[]
  recommendedSkills: string[]
  recommendedCourses: Record<string, string>
  assessment: string
}

export default function CVAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [goals, setGoals] = useState("")
  const [targetRole, setTargetRole] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [result, setResult] = useState<CVAnalysisResult | null>(null)
  const [error, setError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf")) {
        setFile(selectedFile)
        setError("")
      } else {
        setError("Please upload a PDF file")
        setFile(null)
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf")) {
        setFile(droppedFile)
        setError("")
      } else {
        setError("Please upload a PDF file")
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const analyzeCV = async () => {
    if (!file) {
      setError("Please upload a CV file")
      return
    }

    setIsAnalyzing(true)
    setError("")
    setAnalysisProgress(0)

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + 10, 90))
    }, 500)

    try {
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null

      if (!authToken) {
        throw new Error("Authentication required. Please log in.")
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("goals", goals)
      formData.append("targetRole", targetRole)

      const response = await fetch("https://personalai.runasp.net/api/Career/analyze-cv", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${authToken}`
        },
        body: formData
      })

      if (response.status === 401) {
        throw new Error("Unauthorized. Please log in again.")
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      clearInterval(progressInterval)
      setResult(data)
      setAnalysisProgress(100)
    } catch (err) {
      clearInterval(progressInterval)
      console.error("Error analyzing CV:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze CV. Please try again.")
      setAnalysisProgress(100)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setGoals("")
    setTargetRole("")
    setResult(null)
    setError("")
    setAnalysisProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Upload Form
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CV Analyzer
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xl">
              Get AI-powered insights to improve your CV
            </p>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={() => window.location.href = "/analysis"}
              variant="ghost"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Analysis
            </Button>
          </div>

          {/* Upload Card */}
          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
            <CardHeader>
              <CardTitle className="text-2xl">Upload Your CV</CardTitle>
              <CardDescription className="text-base">
                Upload your CV in PDF format and provide some context for better analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Upload */}
              <div>
                <Label htmlFor="cv-upload" className="text-base mb-3 block">
                  CV File (PDF) *
                </Label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    file
                      ? "border-green-500 bg-green-500/10"
                      : "border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    id="cv-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {file ? (
                    <div className="space-y-3">
                      <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                      <p className="font-semibold text-lg">{file.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        size="sm"
                      >
                        Change File
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                      <div>
                        <p className="font-semibold text-lg mb-1">
                          Drop your CV here or click to browse
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          PDF files only, max 10MB
                        </p>
                      </div>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                      >
                        Select File
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Goals Input */}
              <div>
                <Label htmlFor="goals" className="text-base">
                  Your Career Goals (Optional)
                </Label>
                <Input
                  id="goals"
                  placeholder="e.g., Become a senior software engineer, transition to management..."
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Target Role Input */}
              <div>
                <Label htmlFor="targetRole" className="text-base">
                  Target Role (Optional)
                </Label>
                <Input
                  id="targetRole"
                  placeholder="e.g., Full Stack Developer, Data Scientist, Product Manager..."
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="mt-2"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-900 dark:text-red-200">{error}</p>
                </div>
              )}

              {/* Analyze Button */}
              {!isAnalyzing ? (
                <Button
                  onClick={analyzeCV}
                  disabled={!file}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg py-6"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Analyze CV
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center animate-pulse">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg font-semibold mb-2">Analyzing Your CV...</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      AI is reviewing your qualifications and experience
                    </p>
                  </div>
                  <Progress value={analysisProgress} className="h-3" />
                  <p className="text-center text-sm font-medium text-blue-600">
                    {analysisProgress}% Complete
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Results View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              CV Analysis Results
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xl">
            Here's what we found in your CV
          </p>
        </div>

        <div className="space-y-6">
          {/* CV Summary */}
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileText className="w-6 h-6 text-blue-600" />
                CV Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {result.cvSummary}
              </p>
            </CardContent>
          </Card>

          {/* Strengths and Areas to Improve */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-emerald-500" />
                  Your Strengths
                </CardTitle>
                <CardDescription>What stands out in your CV</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.strengths.map((strength, index) => (
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

            <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  Areas to Improve
                </CardTitle>
                <CardDescription>Opportunities for enhancement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.areasToImprove.map((area, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
                  >
                    <Target className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{area}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Enhancement Suggestions */}
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                Enhancement Suggestions
              </CardTitle>
              <CardDescription>Actionable steps to improve your CV</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.enhancementSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm leading-relaxed pt-1">{suggestion}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recommended Skills */}
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Recommended Skills to Add
              </CardTitle>
              <CardDescription>Skills that would strengthen your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {result.recommendedSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30 px-4 py-2 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Recommended Courses
              </CardTitle>
              <CardDescription>Learning resources to boost your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(result.recommendedCourses).map(([title, link], index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500/50"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-2xl">🎓</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base leading-tight mb-3">
                            {title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-between group-hover:bg-blue-500/10"
                            onClick={() => window.open(link, "_blank")}
                          >
                            <span>View Course</span>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Overall Assessment */}
          <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Award className="w-6 h-6 text-indigo-600" />
                Overall Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {result.assessment}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={resetForm}
              size="lg"
              variant="outline"
              className="flex-1"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Analyze Another CV
            </Button>
            <Button
              onClick={() => window.location.href = "/analysis"}
              size="lg"
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Analysis
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}