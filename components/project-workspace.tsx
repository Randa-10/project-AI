"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Trophy,
  Lightbulb,
  Target,
  RefreshCw,
  AlertCircle,
  Sparkles
} from "lucide-react"

interface Question {
  questionId: number
  questionText: string
  type: "multipleChoice" | "shortAnswer"
  choices?: string[]
  correctAnswer: string
  explanation: string
}

interface QuizData {
  quiz: {
    quizTitle: string
    topic: string
    difficulty: string
    totalQuestions: number
    questions: Question[]
  }
}

export default function ProjectWorkspace() {
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({})
  const [topic, setTopic] = useState("")
  const [isSelectingTopic, setIsSelectingTopic] = useState(true)

  useEffect(() => {
    // Check if topic was passed from analysis page
    const urlParams = new URLSearchParams(window.location.search)
    const topicFromUrl = urlParams.get('topic')
    
    if (topicFromUrl) {
      setTopic(topicFromUrl)
      fetchQuiz(topicFromUrl)
      setIsSelectingTopic(false)
    }
  }, [])

  const fetchQuiz = async (selectedTopic: string) => {
    setIsLoading(true)
    setError("")

    try {
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null
      const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null

      if (!userId) {
        throw new Error("User ID not found. Please log in again.")
      }

      const headers: Record<string, string> = {
        "accept": "application/json, text/plain",
      }
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`

      const response = await fetch(
        `https://personalai.runasp.net/api/Career/followup?userId=${userId}&topic=${encodeURIComponent(selectedTopic)}`,
        {
          method: "POST",
          headers,
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setQuizData(data)
      setIsSelectingTopic(false)
    } catch (err) {
      console.error("Error fetching quiz:", err)
      setError(err instanceof Error ? err.message : "Failed to load quiz. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTopicSubmit = () => {
    if (topic.trim()) {
      fetchQuiz(topic.trim())
    }
  }

  const currentQuestion = quizData?.quiz.questions[currentQuestionIndex]

  const handleAnswerChange = (answer: string) => {
    if (!currentQuestion) return
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.questionId]: answer
    })
  }

  const handleSubmitAnswer = () => {
    if (!currentQuestion) return
    setSubmittedAnswers({
      ...submittedAnswers,
      [currentQuestion.questionId]: true
    })
  }

  const isAnswerCorrect = (questionId: number) => {
    if (!quizData) return false
    const question = quizData.quiz.questions.find(q => q.questionId === questionId)
    if (!question) return false
    const userAnswer = userAnswers[questionId]?.toLowerCase().trim()
    const correctAnswer = question.correctAnswer.toLowerCase().trim()
    return userAnswer === correctAnswer
  }

  const calculateScore = () => {
    if (!quizData) return { correct: 0, total: 0, percentage: 0 }
    const total = quizData.quiz.questions.length
    const correct = quizData.quiz.questions.filter(q => isAnswerCorrect(q.questionId)).length
    const percentage = Math.round((correct / total) * 100)
    return { correct, total, percentage }
  }

  const handleNext = () => {
    if (quizData && currentQuestionIndex < quizData.quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleFinishQuiz = () => {
    setShowResults(true)
  }

  const handleRetry = () => {
    setUserAnswers({})
    setSubmittedAnswers({})
    setCurrentQuestionIndex(0)
    setShowResults(false)
  }

  const handleNewTopic = () => {
    setQuizData(null)
    setUserAnswers({})
    setSubmittedAnswers({})
    setCurrentQuestionIndex(0)
    setShowResults(false)
    setTopic("")
    setIsSelectingTopic(true)
    // Clear URL parameters
    window.history.pushState({}, '', window.location.pathname)
  }

  const getProgressPercentage = () => {
    if (!quizData) return 0
    return ((currentQuestionIndex + 1) / quizData.quiz.questions.length) * 100
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-500/20 text-green-700 border-green-500/30'
      case 'intermediate': return 'bg-amber-500/20 text-amber-700 border-amber-500/30'
      case 'advanced': return 'bg-red-500/20 text-red-700 border-red-500/30'
      default: return 'bg-blue-500/20 text-blue-700 border-blue-500/30'
    }
  }

  // Topic Selection Screen
  if (isSelectingTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Follow-up Quiz
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xl">
              Test your knowledge and track your progress
            </p>
          </div>

          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
            <CardHeader>
              <CardTitle className="text-2xl">Choose Your Topic</CardTitle>
              <CardDescription className="text-base">
                Enter a topic you'd like to be quizzed on based on your career path
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-base">Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., JavaScript, Python, Data Science, Healthcare..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleTopicSubmit()}
                  className="text-base"
                />
              </div>

              <Button 
                onClick={handleTopicSubmit} 
                disabled={!topic.trim() || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg py-6"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Generating Quiz...
                  </>
                ) : (
                  <>
                    Start Quiz
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-900 dark:text-red-200">{error}</p>
                </div>
              )}

              <div className="text-center pt-4">
                <Button 
                  onClick={() => window.location.href = "/analysis"} 
                  variant="ghost"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 max-w-md w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <p className="text-xl font-semibold">Generating Your Quiz...</p>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Topic: {topic}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Results Screen
  if (showResults && quizData) {
    const score = calculateScore()
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 mb-8">
            <CardHeader className="text-center pb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-4xl mb-2">Quiz Complete!</CardTitle>
              <CardDescription className="text-lg">
                Here's how you performed on {topic}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {score.percentage}%
                </div>
                <p className="text-xl text-slate-600 dark:text-slate-400">
                  {score.correct} out of {score.total} correct
                </p>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <Button onClick={handleRetry} size="lg" variant="outline" className="text-lg px-8">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Retry Quiz
                </Button>
                <Button onClick={handleNewTopic} size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-lg px-8">
                  <Target className="w-5 h-5 mr-2" />
                  New Topic
                </Button>
                <Button onClick={() => window.location.href = "/analysis"} size="lg" variant="secondary" className="text-lg px-8">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Analysis
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Review Answers */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Review Your Answers</h2>
            {quizData.quiz.questions.map((question, index) => {
              const isCorrect = isAnswerCorrect(question.questionId)
              const userAnswer = userAnswers[question.questionId]

              return (
                <Card key={question.questionId} className={`border-2 ${isCorrect ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4 mb-4">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">
                          Question {index + 1}: {question.questionText}
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          <p className="text-sm">
                            <span className="font-medium">Your Answer: </span>
                            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {userAnswer || "No answer"}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm">
                              <span className="font-medium">Correct Answer: </span>
                              <span className="text-green-600">{question.correctAnswer}</span>
                            </p>
                          )}
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-sm text-blue-900 dark:text-blue-200 mb-1">Explanation:</p>
                              <p className="text-sm text-slate-700 dark:text-slate-300">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Quiz Screen
  if (!quizData || !currentQuestion) return null

  const isCurrentAnswerSubmitted = submittedAnswers[currentQuestion.questionId]
  const isCurrentAnswerCorrect = isAnswerCorrect(currentQuestion.questionId)
  const hasAllAnswers = quizData.quiz.questions.every(q => userAnswers[q.questionId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{quizData.quiz.quizTitle}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="text-sm">
                  📚 {quizData.quiz.topic}
                </Badge>
                <Badge className={getDifficultyColor(quizData.quiz.difficulty)}>
                  {quizData.quiz.difficulty}
                </Badge>
                <Badge variant="secondary">
                  Question {currentQuestionIndex + 1} of {quizData.quiz.totalQuestions}
                </Badge>
              </div>
            </div>
            <Button onClick={handleNewTopic} variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Change Topic
            </Button>
          </div>
          <Progress value={getProgressPercentage()} className="h-3" />
        </div>

        {/* Question Card */}
        <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 mb-6">
          <CardHeader>
            <CardTitle className="text-2xl leading-relaxed">
              {currentQuestion.questionText}
            </CardTitle>
            <Badge variant="outline" className="w-fit">
              {currentQuestion.type === "multipleChoice" ? "Multiple Choice" : "Short Answer"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Answer Input */}
            {currentQuestion.type === "multipleChoice" ? (
              <RadioGroup
                value={userAnswers[currentQuestion.questionId] || ""}
                onValueChange={handleAnswerChange}
                disabled={isCurrentAnswerSubmitted}
              >
                <div className="space-y-3">
                  {currentQuestion.choices?.map((choice, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                        userAnswers[currentQuestion.questionId] === choice
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <RadioGroupItem value={choice} id={`choice-${index}`} />
                      <Label htmlFor={`choice-${index}`} className="flex-1 cursor-pointer text-base">
                        {choice}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <Textarea
                placeholder="Type your answer here..."
                value={userAnswers[currentQuestion.questionId] || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                disabled={isCurrentAnswerSubmitted}
                className="min-h-32 text-base"
              />
            )}

            {/* Submit Button */}
            {!isCurrentAnswerSubmitted && (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!userAnswers[currentQuestion.questionId]}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg py-6"
              >
                Check Answer
                <CheckCircle className="w-5 h-5 ml-2" />
              </Button>
            )}

            {/* Feedback */}
            {isCurrentAnswerSubmitted && (
              <Card className={`border-2 ${isCurrentAnswerCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {isCurrentAnswerCorrect ? (
                      <CheckCircle className="w-8 h-8 text-green-600 shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600 shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="font-bold text-lg mb-2">
                        {isCurrentAnswerCorrect ? "Correct! 🎉" : "Not quite right"}
                      </p>
                      {!isCurrentAnswerCorrect && (
                        <p className="text-sm mb-3">
                          <span className="font-medium">Correct answer: </span>
                          {currentQuestion.correctAnswer}
                        </p>
                      )}
                      <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4 mt-3">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm mb-1">Explanation:</p>
                            <p className="text-sm">{currentQuestion.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            size="lg"
            className="text-lg px-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {currentQuestionIndex === quizData.quiz.questions.length - 1 ? (
            <Button
              onClick={handleFinishQuiz}
              disabled={!hasAllAnswers}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-lg px-8"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Finish Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}