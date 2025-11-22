// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Brain, BookOpen, Target, Sparkles, ArrowRight, CheckCircle, Lightbulb, AlertCircle, ExternalLink, Calendar, RefreshCw, GraduationCap } from "lucide-react"

// export default function AnalysisDashboard() {
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [isComplete, setIsComplete] = useState(false)
//   const [analysisData, setAnalysisData] = useState<any>(null)
//   const [error, setError] = useState("")
//   const [curlCommand, setCurlCommand] = useState("")
//   const [isLoading, setIsLoading] = useState(true)
//   const [selectedWeek, setSelectedWeek] = useState("Week 1")
//   const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({})

//   useEffect(() => {
//     fetchAnalysis()
//   }, [])

//   const fetchAnalysis = async () => {
//     setIsLoading(true)
//     setError("")
//     setAnalysisProgress(0)

//     const progressInterval = setInterval(() => {
//       setAnalysisProgress((prev) => Math.min(prev + 10, 90))
//     }, 300)

//     try {
//       const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null

//       const requestBody = {
//         userId: typeof window !== 'undefined' ? (localStorage.getItem("userId") || "user-123") : "user-123",
//         profileText:
//           "Interested in healthcare technology, data science, and improving patient outcomes through innovative solutions.",
//         availabilityHoursPerWeek: 20,
//         preferences: "Looking for personalized learning paths in health tech",
//         questions: "What career path would suit me best?",
//       }

//       const headers: Record<string, string> = {
//         "accept": "application/json, text/plain",
//         "Content-Type": "application/json",
//       }
//       if (authToken) headers["Authorization"] = `Bearer ${authToken}`

//       const response = await fetch("https://personalai.runasp.net/api/Career/analyze", {
//         method: "POST",
//         headers,
//         body: JSON.stringify(requestBody),
//       })

//       if (response.status === 401) {
//         clearInterval(progressInterval)
//         const curl = `curl -X 'POST' \\\n  'https://personalai.runasp.net/api/Career/analyze' \\\n  -H 'accept: text/plain' \\\n  -H 'Authorization: Bearer ${authToken || "<YOUR_TOKEN_HERE>"}' \\\n  -H 'Content-Type: application/json' \\\n  -d '${JSON.stringify(requestBody).replace(/'/g, "\\'")}'`

//         console.error("Career/analyze returned 401 Unauthorized")
//         setCurlCommand(curl)
//         setError("Unauthorized (401). Please log in or verify your token.")
//         setAnalysisProgress(100)
//         setIsLoading(false)
//         return
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       let data
//       try {
//         data = await response.json()
//       } catch (e) {
//         const t = await response.text()
//         try {
//           data = JSON.parse(t)
//         } catch (e2) {
//           data = { raw: t }
//         }
//       }

//       clearInterval(progressInterval)
//       setAnalysisData(data)
//       setAnalysisProgress(100)
//       setIsComplete(true)
//     } catch (err) {
//       clearInterval(progressInterval)
//       console.error("Error fetching analysis:", err)
//       setError(err instanceof Error ? err.message : "Failed to connect to the server. Please try again.")
//       setAnalysisProgress(100)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getResources = () => {
//     if (!analysisData?.recommendedResources) return []
//     const resources = analysisData.recommendedResources as Record<string, string>

//     return Object.entries(resources).map(([title, link]) => {
//       const parts = title.split(' - ')
//       return {
//         title: parts[0],
//         platform: parts[1] || 'Online',
//         link: String(link),
//         type: title.includes('Course') ? 'Course' : title.includes('Bootcamp') ? 'Bootcamp' : 'Resource',
//       }
//     })
//   }

//   const getWeeklyPlan = () => {
//     if (!analysisData?.weeklyPlan) return []
//     const weekData = analysisData.weeklyPlan?.[selectedWeek]
//     if (!weekData) return []

//     return Object.entries(weekData).map(([day, activity]) => {
//       const activityStr = String(activity || "")
//       const timeMatch = activityStr.match(/^(\d+\s+hours?):\s*(.+)/)
//       const activityText = timeMatch ? timeMatch[2] : activityStr
//       const urlMatch = activityText.match(/(https?:\/\/[^\s]+)/)

//       return {
//         day,
//         time: timeMatch ? timeMatch[1] : '',
//         activity: activityText.replace(/(https?:\/\/[^\s]+)/g, '').trim(),
//         link: urlMatch ? urlMatch[1] : null,
//       }
//     })
//   }

//   const getWeeks = () => {
//     if (!analysisData?.weeklyPlan) return []
//     return Object.keys(analysisData.weeklyPlan)
//   }

//   const getDayIcon = (day: string) => {
//     const icons: Record<string, string> = {
//       Monday: "🎯",
//       Tuesday: "💡",
//       Wednesday: "🚀",
//       Thursday: "⚡",
//       Friday: "🎨",
//       Saturday: "🌟",
//       Sunday: "📚"
//     }
//     return icons[day] || "📅"
//   }

//   const getDayColor = (index: number) => {
//     const colors = [
//       "from-blue-500/10 to-blue-500/5 border-blue-500/20",
//       "from-purple-500/10 to-purple-500/5 border-purple-500/20",
//       "from-pink-500/10 to-pink-500/5 border-pink-500/20",
//       "from-amber-500/10 to-amber-500/5 border-amber-500/20",
//       "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
//       "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
//       "from-rose-500/10 to-rose-500/5 border-rose-500/20"
//     ]
//     return colors[index % colors.length]
//   }

//   const getResourceIcon = (type: string) => {
//     if (type === 'Course') return "🎓"
//     if (type === 'Bootcamp') return "🚀"
//     return "📚"
//   }

//   const handleDayCheckbox = (day: string, checked: boolean) => {
//     setSelectedDays(prev => ({
//       ...prev,
//       [day]: checked
//     }))
//   }

//   const extractTopicsFromSelectedDays = () => {
//     const weeklyPlan = getWeeklyPlan()
//     const topics: string[] = []

//     weeklyPlan.forEach(dayData => {
//       if (selectedDays[dayData.day]) {
//         // Extract topic from activity text
//         const activity = dayData.activity
//         // Try to extract meaningful topics from the activity
//         // This could be more sophisticated based on your data structure
//         topics.push(activity)
//       }
//     })

//     return topics.join(', ')
//   }

//   const handleGenerateQuiz = () => {
//     const topics = extractTopicsFromSelectedDays()
//     if (!topics) {
//       alert("Please select at least one day to generate a quiz!")
//       return
//     }

//     // Navigate to quiz page with topics as URL parameter
//     window.location.href = `/project?topic=${encodeURIComponent(topics)}`
//   }

//   const getSelectedDaysCount = () => {
//     return Object.values(selectedDays).filter(Boolean).length
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
//               <Brain className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               LIFE ORCHESTRATOR AI
//             </h1>
//           </div>
//           <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl font-medium">
//             Your Personalized Career Journey
//           </p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <Card className="border-2 border-red-500/50 mb-8 bg-gradient-to-br from-red-500/10 to-red-500/5 shadow-lg">
//             <CardContent className="pt-6">
//               <div className="flex items-start gap-4">
//                 <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
//                 <div className="flex-1">
//                   <p className="font-semibold text-red-900 dark:text-red-200 text-lg">Connection Error</p>
//                   <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{error}</p>
//                 </div>
//                 <Button onClick={fetchAnalysis} variant="outline" size="sm">
//                   <RefreshCw className="w-4 h-4 mr-2" />
//                   Retry
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Loading State */}
//         {!isComplete ? (
//           <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 max-w-2xl mx-auto">
//             <CardHeader className="text-center pb-8">
//               <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center animate-pulse shadow-2xl">
//                 <Sparkles className="w-12 h-12 text-white" />
//               </div>
//               <CardTitle className="text-3xl">Analyzing Your Profile</CardTitle>
//               <CardDescription className="text-base mt-2">
//                 AI is analyzing your responses and creating personalized career recommendations...
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <Progress value={analysisProgress} className="h-4" />
//                 <p className="text-center text-lg font-semibold text-blue-600">{analysisProgress}% Complete</p>
//               </div>
//             </CardContent>
//           </Card>
//         ) : analysisData ? (
//           <div className="space-y-8">
//             {/* Career Suggestion Hero */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 overflow-hidden">
//               <CardHeader className="relative pb-0">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
//                 <div className="flex items-start gap-4 mb-4">
//                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 shadow-xl">
//                     <Target className="w-8 h-8 text-white" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <CheckCircle className="w-6 h-6 text-emerald-500" />
//                       <span className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">Your Perfect Career Match</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
//                       {analysisData.suggestedCareer}
//                     </h2>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/10">
//                   <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                     <Lightbulb className="w-5 h-5 text-amber-500" />
//                     Why This Career Fits You
//                   </h3>
//                   <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
//                     {analysisData.rationale}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Learning Resources */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//               <CardHeader>
//                 <div className="flex items-center justify-between flex-wrap gap-4">
//                   <div>
//                     <CardTitle className="flex items-center gap-3 text-2xl">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
//                         <BookOpen className="w-5 h-5 text-white" />
//                       </div>
//                       Recommended Learning Resources
//                     </CardTitle>
//                     <CardDescription className="text-base mt-2">
//                       Curated materials to accelerate your learning journey
//                     </CardDescription>
//                   </div>
//                   <Badge variant="secondary" className="text-base px-4 py-2">
//                     {getResources().length} Resources
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {getResources().map((resource, index) => (
//                     <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500/50 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
//                       <CardContent className="pt-6">
//                         <div className="flex items-start gap-3 mb-3">
//                           <div className="text-3xl">{getResourceIcon(resource.type)}</div>
//                           <div className="flex-1">
//                             <h4 className="font-semibold text-base leading-tight group-hover:text-blue-600 transition-colors mb-2">
//                               {resource.title}
//                             </h4>
//                             <Badge variant="outline" className="text-xs mb-3">
//                               {resource.platform}
//                             </Badge>
//                           </div>
//                         </div>
//                         <Button 
//                           variant="ghost" 
//                           size="sm" 
//                           className="w-full justify-between group-hover:bg-blue-500/10"
//                           onClick={() => window.open(resource.link, '_blank')}
//                         >
//                           <span>View Resource</span>
//                           <ExternalLink className="w-4 h-4" />
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Weekly Plan with Checkboxes */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//               <CardHeader>
//                 <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
//                   <div>
//                     <CardTitle className="flex items-center gap-3 text-2xl">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                         <Calendar className="w-5 h-5 text-white" />
//                       </div>
//                       Your Weekly Learning Schedule
//                     </CardTitle>
//                     <CardDescription className="text-base mt-2">
//                       Select days to generate a focused quiz
//                     </CardDescription>
//                   </div>
//                   {getSelectedDaysCount() > 0 && (
//                     <Button 
//                       onClick={handleGenerateQuiz}
//                       className="bg-gradient-to-r from-emerald-500 to-green-500 text-white"
//                       size="lg"
//                     >
//                       <GraduationCap className="w-5 h-5 mr-2" />
//                       Generate Quiz ({getSelectedDaysCount()} days)
//                     </Button>
//                   )}
//                 </div>
                
//                 {/* Week Selector */}
//                 <div className="flex gap-2 overflow-x-auto pb-2">
//                   {getWeeks().map((week) => (
//                     <Button
//                       key={week}
//                       onClick={() => {
//                         setSelectedWeek(week)
//                         setSelectedDays({}) // Clear selections when changing weeks
//                       }}
//                       variant={selectedWeek === week ? "default" : "outline"}
//                       size="sm"
//                       className="shrink-0"
//                     >
//                       {week}
//                     </Button>
//                   ))}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-4">
//                   {getWeeklyPlan().map((day, index) => (
//                     <Card key={index} className={`border-2 bg-gradient-to-br ${getDayColor(index)} hover:shadow-lg transition-all duration-300 ${selectedDays[day.day] ? 'ring-2 ring-blue-500' : ''}`}>
//                       <CardContent className="pt-6">
//                         <div className="flex items-start gap-4">
//                           <Checkbox
//                             id={`day-${index}`}
//                             checked={selectedDays[day.day] || false}
//                             onCheckedChange={(checked) => handleDayCheckbox(day.day, checked as boolean)}
//                             className="mt-1"
//                           />
//                           <div className="text-4xl">{getDayIcon(day.day)}</div>
//                           <div className="flex-1">
//                             <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
//                               <h4 className="text-lg font-bold">{day.day}</h4>
//                               <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
//                                 {day.time}
//                               </Badge>
//                             </div>
//                             <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
//                               {day.activity}
//                             </p>
//                             {day.link && (
//                               <Button 
//                                 variant="ghost" 
//                                 size="sm"
//                                 className="mt-2"
//                                 onClick={() => day.link && window.open(day.link, '_blank')}
//                               >
//                                 <ExternalLink className="w-3 h-3 mr-2" />
//                                 View Resource
//                               </Button>
//                             )}
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>

//                 {/* Quiz Generation Info */}
//                 {getSelectedDaysCount() === 0 && (
//                   <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
//                     <div className="flex items-start gap-3">
//                       <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
//                       <div>
//                         <p className="font-medium text-sm text-blue-900 dark:text-blue-200 mb-1">
//                           Ready to test your knowledge?
//                         </p>
//                         <p className="text-sm text-slate-700 dark:text-slate-300">
//                           Select one or more days from your learning schedule, and we'll generate a personalized quiz based on those topics!
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Follow-up Notes */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
//                     <Lightbulb className="w-5 h-5 text-white" />
//                   </div>
//                   Important Notes & Tips
//                 </CardTitle>
//                 <CardDescription className="text-base mt-2">
//                   Additional guidance to maximize your success
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
//                   <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
//                     {analysisData.followUpNotes}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* CTA */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
//               <CardContent className="pt-8 pb-8 relative">
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                   <div className="flex items-start gap-4 text-white">
//                     <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
//                       <Brain className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-2xl mb-2">Ready to Continue Your Journey?</p>
//                       <p className="text-white/90">Access your dashboard or take a quiz to test your knowledge</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <Button
//                       size="lg"
//                       className="bg-white text-blue-600 hover:bg-white/90 transition-all shadow-xl text-lg px-8 py-6 shrink-0"
//                       onClick={() => (window.location.href = "/dashboard")}
//                     >
//                       Go To Dashboard
//                       <ArrowRight className="w-5 h-5 ml-2" />
//                     </Button>

//                     <Button
//                       size="lg"
//                       className="bg-emerald-500 text-white hover:opacity-90 px-6 py-6"
//                       onClick={() => (window.location.href = "/project")}
//                     >
//                       <GraduationCap className="w-5 h-5 mr-2" />
//                       Take a Quiz
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, BookOpen, Target, Sparkles, ArrowRight, CheckCircle, Lightbulb, AlertCircle, ExternalLink, Calendar, RefreshCw, GraduationCap } from "lucide-react"

export default function AnalysisDashboard() {
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState("Week 1")
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({})

  // Function to decode JWT and extract userId
  const getUserIdFromToken = () => {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null
    
    if (!authToken) return null
    
    try {
      const base64Url = authToken.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      
      const payload = JSON.parse(jsonPayload)
      return payload.sub || payload.userId || payload.id
    } catch (error) {
      console.error("Failed to decode token:", error)
      return null
    }
  }

  useEffect(() => {
    // Try to load from localStorage first
    const storedAnalysis = typeof window !== 'undefined' ? localStorage.getItem("careerAnalysis") : null
    
    if (storedAnalysis) {
      try {
        const parsed = JSON.parse(storedAnalysis)
        setAnalysisData(parsed)
        setIsComplete(true)
        setIsLoading(false)
        setAnalysisProgress(100)
      } catch (e) {
        console.error("Failed to parse stored analysis:", e)
        fetchAnalysis()
      }
    } else {
      fetchAnalysis()
    }
  }, [])

  const fetchAnalysis = async () => {
    setIsLoading(true)
    setError("")
    setAnalysisProgress(0)

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + 10, 90))
    }, 300)

    try {
      const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null
      const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null

      if (!userId) {
        throw new Error("User ID not found. Please log in again.")
      }

      const requestBody = {
        userId: userId,
        profileText: "Interested in technology and problem-solving",
        availabilityHoursPerWeek: 20,
        preferences: "Looking for personalized learning paths",
        questions: "What career path would suit me best?",
      }

      const headers: Record<string, string> = {
        "accept": "application/json, text/plain",
        "Content-Type": "application/json",
      }
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`

      const response = await fetch("https://personalai.runasp.net/api/Career/analyze", {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      })

      if (response.status === 401) {
        clearInterval(progressInterval)
        setError("Unauthorized. Please log in again.")
        setAnalysisProgress(100)
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      let data
      try {
        data = await response.json()
      } catch (e) {
        const t = await response.text()
        try {
          data = JSON.parse(t)
        } catch (e2) {
          data = { raw: t }
        }
      }

      clearInterval(progressInterval)
      
      // Store in localStorage for future use
      if (typeof window !== 'undefined') {
        localStorage.setItem("careerAnalysis", JSON.stringify(data))
      }
      
      setAnalysisData(data)
      setAnalysisProgress(100)
      setIsComplete(true)
    } catch (err) {
      clearInterval(progressInterval)
      console.error("Error fetching analysis:", err)
      setError(err instanceof Error ? err.message : "Failed to connect to the server. Please try again.")
      setAnalysisProgress(100)
    } finally {
      setIsLoading(false)
    }
  }

  const getResources = () => {
    if (!analysisData?.recommendedResources) return []
    
    // Handle string format: "Platform - Course\nPlatform - Course"
    const resourcesText = analysisData.recommendedResources
    if (typeof resourcesText === 'string') {
      return resourcesText.split('\n').filter(r => r.trim()).map((line, index) => {
        const parts = line.split(' - ')
        return {
          title: parts[1] || parts[0] || line,
          platform: parts[0] || 'Online',
          link: '#',
          type: line.toLowerCase().includes('course') ? 'Course' : 'Resource',
        }
      })
    }

    // Handle object format
    if (typeof resourcesText === 'object') {
      return Object.entries(resourcesText).map(([title, link]) => {
        const parts = title.split(' - ')
        return {
          title: parts[0],
          platform: parts[1] || 'Online',
          link: String(link),
          type: title.includes('Course') ? 'Course' : title.includes('Bootcamp') ? 'Bootcamp' : 'Resource',
        }
      })
    }

    return []
  }

  const getWeeklyPlan = () => {
    if (!analysisData?.weeklyPlan) return []
    
    const weeklyPlanText = analysisData.weeklyPlan
    
    // Handle string format: "Week 1: Monday task, Tuesday task..."
    if (typeof weeklyPlanText === 'string') {
      const weeks = weeklyPlanText.split(/Week \d+:/i).filter(w => w.trim())
      const currentWeekIndex = parseInt(selectedWeek.replace('Week ', '')) - 1
      const weekText = weeks[currentWeekIndex] || weeks[0] || ''
      
      // Parse days from the week text
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      const result: any[] = []
      
      // Split by commas and process each segment
      const segments = weekText.split(/,(?=\s*(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Learn|Explore|Complete|Take|Practice|Work|Review|Present))/i)
      
      segments.forEach((segment, index) => {
        const trimmed = segment.trim()
        if (!trimmed) return
        
        // Try to extract time (e.g., "2 hours", "3 hours")
        const timeMatch = trimmed.match(/\((\d+)\s+hours?\)/)
        const time = timeMatch ? `${timeMatch[1]} hours` : ''
        
        // Clean the activity text
        let activity = trimmed.replace(/\(\d+\s+hours?\)/g, '').trim()
        
        // Assign to appropriate day
        const dayIndex = index % 7
        result.push({
          day: days[dayIndex],
          time: time,
          activity: activity,
          link: null,
        })
      })
      
      return result.length > 0 ? result : [{
        day: 'This Week',
        time: '',
        activity: weekText.trim(),
        link: null
      }]
    }

    // Handle object format
    const weekData = weeklyPlanText?.[selectedWeek]
    if (!weekData) return []

    return Object.entries(weekData).map(([day, activity]) => {
      const activityStr = String(activity || "")
      const timeMatch = activityStr.match(/^(\d+\s+hours?):\s*(.+)/)
      const activityText = timeMatch ? timeMatch[2] : activityStr
      const urlMatch = activityText.match(/(https?:\/\/[^\s]+)/)

      return {
        day,
        time: timeMatch ? timeMatch[1] : '',
        activity: activityText.replace(/(https?:\/\/[^\s]+)/g, '').trim(),
        link: urlMatch ? urlMatch[1] : null,
      }
    })
  }

  const getWeeks = () => {
    if (!analysisData?.weeklyPlan) return []
    
    const weeklyPlanText = analysisData.weeklyPlan
    
    // Handle string format - extract week numbers
    if (typeof weeklyPlanText === 'string') {
      const weekMatches = weeklyPlanText.match(/Week \d+/gi) || []
      return [...new Set(weekMatches)] // Remove duplicates
    }
    
    // Handle object format
    return Object.keys(weeklyPlanText)
  }

  const getDayIcon = (day: string) => {
    const icons: Record<string, string> = {
      Monday: "🎯",
      Tuesday: "💡",
      Wednesday: "🚀",
      Thursday: "⚡",
      Friday: "🎨",
      Saturday: "🌟",
      Sunday: "📚",
      'This Week': "📅"
    }
    return icons[day] || "📅"
  }

  const getDayColor = (index: number) => {
    const colors = [
      "from-blue-500/10 to-blue-500/5 border-blue-500/20",
      "from-purple-500/10 to-purple-500/5 border-purple-500/20",
      "from-pink-500/10 to-pink-500/5 border-pink-500/20",
      "from-amber-500/10 to-amber-500/5 border-amber-500/20",
      "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
      "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
      "from-rose-500/10 to-rose-500/5 border-rose-500/20"
    ]
    return colors[index % colors.length]
  }

  const getResourceIcon = (type: string) => {
    if (type === 'Course') return "🎓"
    if (type === 'Bootcamp') return "🚀"
    return "📚"
  }

  const handleDayCheckbox = (day: string, checked: boolean) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: checked
    }))
  }

  const extractTopicsFromSelectedDays = () => {
    const weeklyPlan = getWeeklyPlan()
    const topics: string[] = []

    weeklyPlan.forEach(dayData => {
      if (selectedDays[dayData.day]) {
        topics.push(dayData.activity)
      }
    })

    return topics.join(', ')
  }

  const handleGenerateQuiz = () => {
    const topics = extractTopicsFromSelectedDays()
    if (!topics) {
      alert("Please select at least one day to generate a quiz!")
      return
    }

    window.location.href = `/project?topic=${encodeURIComponent(topics)}`
  }

  const getSelectedDaysCount = () => {
    return Object.values(selectedDays).filter(Boolean).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LIFE ORCHESTRATOR AI
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xl md:text-2xl font-medium">
            Your Personalized Career Journey
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="border-2 border-red-500/50 mb-8 bg-gradient-to-br from-red-500/10 to-red-500/5 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-red-900 dark:text-red-200 text-lg">Connection Error</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{error}</p>
                </div>
                <Button onClick={fetchAnalysis} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {!isComplete ? (
          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95 max-w-2xl mx-auto">
            <CardHeader className="text-center pb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center animate-pulse shadow-2xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-3xl">Analyzing Your Profile</CardTitle>
              <CardDescription className="text-base mt-2">
                AI is analyzing your responses and creating personalized career recommendations...
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={analysisProgress} className="h-4" />
                <p className="text-center text-lg font-semibold text-blue-600">{analysisProgress}% Complete</p>
              </div>
            </CardContent>
          </Card>
        ) : analysisData ? (
          <div className="space-y-8">
            {/* Career Suggestion Hero */}
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 overflow-hidden">
              <CardHeader className="relative pb-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 shadow-xl">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">Your Perfect Career Match</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      {analysisData.suggestedCareer}
                    </h2>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/10">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    Why This Career Fits You
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
                    {analysisData.rationale}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      Recommended Learning Resources
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Curated materials to accelerate your learning journey
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    {getResources().length} Resources
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {getResources().map((resource, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500/50 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="text-3xl">{getResourceIcon(resource.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-base leading-tight group-hover:text-blue-600 transition-colors mb-2">
                              {resource.title}
                            </h4>
                            <Badge variant="outline" className="text-xs mb-3">
                              {resource.platform}
                            </Badge>
                          </div>
                        </div>
                        {resource.link !== '#' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full justify-between group-hover:bg-blue-500/10"
                            onClick={() => window.open(resource.link, '_blank')}
                          >
                            <span>View Resource</span>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Plan with Checkboxes */}
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      Your Weekly Learning Schedule
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Select activities to generate a focused quiz
                    </CardDescription>
                  </div>
                  {getSelectedDaysCount() > 0 && (
                    <Button 
                      onClick={handleGenerateQuiz}
                      className="bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                      size="lg"
                    >
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Generate Quiz ({getSelectedDaysCount()} selected)
                    </Button>
                  )}
                </div>
                
                {/* Week Selector */}
                {getWeeks().length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {getWeeks().map((week) => (
                      <Button
                        key={week}
                        onClick={() => {
                          setSelectedWeek(week)
                          setSelectedDays({})
                        }}
                        variant={selectedWeek === week ? "default" : "outline"}
                        size="sm"
                        className="shrink-0"
                      >
                        {week}
                      </Button>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {getWeeklyPlan().map((day, index) => (
                    <Card key={index} className={`border-2 bg-gradient-to-br ${getDayColor(index)} hover:shadow-lg transition-all duration-300 ${selectedDays[day.day] ? 'ring-2 ring-blue-500' : ''}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            id={`day-${index}`}
                            checked={selectedDays[day.day] || false}
                            onCheckedChange={(checked) => handleDayCheckbox(day.day, checked as boolean)}
                            className="mt-1"
                          />
                          <div className="text-4xl">{getDayIcon(day.day)}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                              <h4 className="text-lg font-bold">{day.day}</h4>
                              {day.time && (
                                <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
                                  {day.time}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                              {day.activity}
                            </p>
                            {day.link && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="mt-2"
                                onClick={() => day.link && window.open(day.link, '_blank')}
                              >
                                <ExternalLink className="w-3 h-3 mr-2" />
                                View Resource
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quiz Generation Info */}
                {getSelectedDaysCount() === 0 && (
                  <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-blue-900 dark:text-blue-200 mb-1">
                          Ready to test your knowledge?
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Select one or more activities from your learning schedule, and we'll generate a personalized quiz based on those topics!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Follow-up Notes */}
            {analysisData.followUpNotes && (
              <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    Important Notes & Tips
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    Additional guidance to maximize your success
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
                    <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                      {analysisData.followUpNotes}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
              <CardContent className="pt-8 pb-8 relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4 text-white">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl mb-2">Ready to Continue Your Journey?</p>
                      <p className="text-white/90">Access your dashboard or take a quiz to test your knowledge</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-white/90 transition-all shadow-xl text-lg px-8 py-6 shrink-0"
                      onClick={() => (window.location.href = "/dashboard")}
                    >
                      Go To Dashboard
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <Button
                      size="lg"
                      className="bg-emerald-500 text-white hover:opacity-90 px-6 py-6"
                      onClick={() => (window.location.href = "/project")}
                    >
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Take a Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}