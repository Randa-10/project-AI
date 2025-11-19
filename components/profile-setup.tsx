"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  type: "text" | "radio"
  options?: string[]
  apiField: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "What subjects do you like the most? And why?",
    type: "text",
    apiField: "favoriteSubjects",
  },
  {
    id: 2,
    question: "Do you prefer solving logical and mathematical problems or writing stories and essays?",
    type: "radio",
    options: ["Solving logical and mathematical problems", "Writing stories and essays", "Both equally"],
    apiField: "problemPreference",
  },
  {
    id: 3,
    question: "Do you understand information faster when you see it in pictures or videos or when you hear it?",
    type: "radio",
    options: ["Pictures or videos", "Hearing", "Both"],
    apiField: "learningPreference",
  },
  {
    id: 4,
    question:
      "When learning something new, do you like to try it yourself or are you satisfied with theoretical explanation?",
    type: "radio",
    options: ["I like to try it myself", "I'm satisfied with theoretical explanation", "I prefer combining both"],
    apiField: "learningApproach",
  },
  {
    id: 5,
    question: "Do you have a strong memory for names and details or for general ideas?",
    type: "radio",
    options: ["Names and details", "General ideas", "Both"],
    apiField: "memoryType",
  },
  {
    id: 6,
    question: "When you have free time, what do you usually do?",
    type: "text",
    apiField: "freeTimeActivity",
  },
  {
    id: 7,
    question: "Are you interested in technology and devices? Art and drawing? Sports? Teaching? Or something else?",
    type: "text",
    apiField: "mainInterests",
  },
  {
    id: 8,
    question: "Do you like to know how things work (like devices or programs)?",
    type: "radio",
    options: ["Yes, always", "Sometimes", "No, not really"],
    apiField: "curiosityLevel",
  },
  {
    id: 9,
    question: "Do you like helping people solve their problems?",
    type: "radio",
    options: ["Yes, very much", "Sometimes", "Rarely"],
    apiField: "helpingPreference",
  },
  {
    id: 10,
    question: "If you could choose a new subject to add to your school or university, what would it be about?",
    type: "text",
    apiField: "dreamSubject",
  },
]

export default function ProfileSetup() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
    setError("")
  }

  const handleNext = () => {
    if (answers[currentQuestion.id]) {
      setCompletedSteps((prev) => new Set(prev).add(currentStep))
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    // Validate all questions are answered
    const unansweredQuestions = questions.filter(q => !answers[q.id] || answers[q.id].trim() === "")
    if (unansweredQuestions.length > 0) {
      setError("Please answer all questions before submitting.")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      // Build the survey data object matching API schema
      const surveyData: Record<string, string> = {}
      questions.forEach((question) => {
        surveyData[question.apiField] = answers[question.id] || ""
      })

      console.log("Submitting survey data:", surveyData)

      // Get auth token if available
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null

      // Make the API request
      const response = await fetch("https://personalai.runasp.net/api/UserSurvey/save", {
        method: "POST",
        headers: {
          "accept": "*/*",
          "Content-Type": "application/json",
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
        body: JSON.stringify(surveyData),
      })

      // Handle specific HTTP status codes
      if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.")
      }

      if (response.status === 400) {
        let errorMessage = "Invalid data submitted. Please check your answers."
        try {
          const errorData = await response.json()
          if (errorData?.message) {
            errorMessage = errorData.message
          } else if (errorData?.errors) {
            errorMessage = Object.values(errorData.errors).flat().join(", ")
          }
        } catch (e) {
          // Use default error message
        }
        throw new Error(errorMessage)
      }

      if (response.status === 403) {
        throw new Error("You don't have permission to perform this action.")
      }

      if (response.status === 500) {
        throw new Error("Server error. Please try again later.")
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}. Please try again.`)
      }

      // Parse successful response
      const data = await response.json()
      console.log("Profile saved successfully:", data)

      // Show success message
      setSuccess(true)

      // Redirect after a short delay - you can handle this in your app
      setTimeout(() => {
        // Option 1: Use window.location for redirect
        window.location.href = "/analysis"
        
        // Option 2: If using React Router, replace with: navigate('/')
        // Option 3: If using Next.js in your actual app, use: router.push('/')
      }, 1500)

    } catch (err) {
      // Handle different error types
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError("Network error. Please check your internet connection and try again.")
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
      console.error("Error saving profile:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    setError("")
    handleSubmit()
  }

  const isLastQuestion = currentStep === questions.length - 1
  const isAnswered = !!answers[currentQuestion.id]
  const isFormComplete = questions.every(q => answers[q.id] && answers[q.id].trim() !== "")

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold text-foreground">Profile Setup</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Help us get to know you better by answering these questions
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Steps Indicator */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {questions.map((_, index) => {
            const isCompleted = completedSteps.has(index)
            const isCurrent = index === currentStep
            const isActive = isCompleted || isCurrent

            return (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all hover:scale-110 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-transparent text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 flex items-center gap-3 p-4 text-sm bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-semibold text-green-900 dark:text-green-100">Profile saved successfully!</p>
              <p className="text-green-700 dark:text-green-300">Redirecting you to the home page...</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">Error</p>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
              {!isLoading && (
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                  className="border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900"
                >
                  Retry
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Question Card */}
        <Card className="mb-8 border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl leading-relaxed">{currentQuestion.question}</CardTitle>
            <CardDescription className="text-base">
              {currentQuestion.type === "text" ? "Write your answer in detail" : "Choose the appropriate answer"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "text" ? (
              <Textarea
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                placeholder="Write your answer here..."
                className="min-h-32 text-base leading-relaxed"
                disabled={isLoading || success}
              />
            ) : (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
                className="space-y-3"
                disabled={isLoading || success}
              >
                {currentQuestion.options?.map((option, index) => {
                  const isSelected = answers[currentQuestion.id] === option

                  return (
                    <div
                      key={index}
                      className={`flex items-center space-x-2 rounded-lg border-2 p-4 transition-all hover:bg-secondary ${
                        isSelected ? "border-primary bg-secondary" : "border-border bg-transparent"
                      } ${isLoading || success ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} disabled={isLoading || success} />
                      <Label
                        htmlFor={`option-${index}`}
                        className={`flex-1 text-base leading-relaxed ${
                          isLoading || success ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        {option}
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0 || isLoading || success}
            variant="outline"
            size="lg"
            className="min-w-32 bg-transparent"
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {!isLastQuestion ? (
              <Button onClick={handleNext} disabled={!isAnswered || isLoading || success} size="lg" className="min-w-32">
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isFormComplete || isLoading || success}
                size="lg"
                className="min-w-32"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Saving...
                  </span>
                ) : success ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Saved!
                  </span>
                ) : (
                  "Finish"
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {!isFormComplete && isLastQuestion
            ? "Please answer all questions to complete your profile"
            : "You can return to any previous question by clicking on its number above"}
        </p>
      </div>
    </div>
  )
}