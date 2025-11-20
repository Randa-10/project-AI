// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Brain, Clock, BookOpen, Target, Sparkles, ArrowRight, CheckCircle2, TrendingUp, Lightbulb, AlertCircle, ExternalLink, Calendar, Palette } from "lucide-react"
// import { log } from "console"

// interface Resource {
//   title: string
//   link: string
//   type: string
//   description: string
// }

// interface WeeklyPlan {
//   [key: string]: {
//     Activity: string
//     Time: string
//   }
// }

// interface AnalysisResponse {
//   SuggestedCareer?: string
//   suggestedCareer?: string
//   Rationale?: string
//   rationale?: string
//   RecommendedResources?: Resource[]
//   recommendedResources?: string | Resource[]
//   WeeklyPlan?: WeeklyPlan
//   weeklyPlan?: string | WeeklyPlan
//   FollowUpNotes?: string
//   followUpNotes?: string
// }

// export default function AnalysisDashboard() {
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [isComplete, setIsComplete] = useState(false)
//   const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(null)
//   const [error, setError] = useState<string>("")
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const runAnalysis = async () => {
//       const progressInterval = setInterval(() => {
//         setAnalysisProgress((prev) => {
//           if (prev >= 90) {
//             return prev
//           }
//           return prev + 10
//         })
//       }, 300)

//       try {
//         const authToken = localStorage.getItem("authToken")
//         const userId = localStorage.getItem("userId") || "429b07f0-99c0-4be4-90bb-25ac33ddec48"
        
//         const surveyData = localStorage.getItem("surveyData")
//         let profileText = "University student interested in learning and personal development."
        
//         if (surveyData) {
//           const parsed = JSON.parse(surveyData)
//           profileText = `Interests: ${parsed.mainInterests || 'General'}. ` +
//                        `Favorite subjects: ${parsed.favoriteSubjects || 'Various'}. ` +
//                        `Learning style: ${parsed.learningPreference || 'Mixed'}. ` +
//                        `Free time: ${parsed.freeTimeActivity || 'Various activities'}.`
//         }

//         const requestBody = {
//           userId: userId,
//           profileText: profileText,
//           availabilityHoursPerWeek: 20,
//           preferences: "Looking for personalized learning paths that match my interests and learning style",
//           questions: "What learning path and career direction would suit me best based on my profile?"
//         }

//         const response = await fetch("https://personalai.runasp.net/api/Career/analyze", {
//           method: "POST",
//           headers: {
//             "accept": "application/json",
//             "Content-Type": "application/json",
//             ...(authToken && { Authorization: `Bearer ${authToken}` }),
//           },
//           body: JSON.stringify(requestBody),
//         })

//         if (!response.ok) {
//           throw new Error(`Analysis failed: ${response.status}`)
//         }

//         const data: AnalysisResponse = await response.json()
//         setAnalysisData(data)
//         setAnalysisProgress(100)
//         setIsComplete(true)
//         clearInterval(progressInterval)
//       } catch (err) {
//         console.error("Analysis error:", err)
//         const errorMessage = err instanceof Error ? err.message : "Failed to analyze profile"
        
//         if (errorMessage.includes("Failed to fetch") || errorMessage.includes("CORS")) {
//           setError("Unable to connect to the server. Using local analysis mode.")
//         } else {
//           setError(errorMessage)
//         }
        
//         clearInterval(progressInterval)
        
//         const surveyData = localStorage.getItem("surveyData")
//         let mockData: AnalysisResponse = {
//           SuggestedCareer: "Technology & Software Development",
//           Rationale: "Based on your interests and learning preferences, a career in technology would be well-suited.",
//           RecommendedResources: [
//             {
//               title: "Complete Web Development Course",
//               link: "https://www.udemy.com/course/web-development",
//               type: "Online Course",
//               description: "Learn full-stack web development from basics to advanced"
//             }
//           ],
//           WeeklyPlan: {
//             Monday: { Activity: "Learn fundamentals and setup development environment", Time: "2 hours" },
//             Tuesday: { Activity: "Practice coding exercises and build small projects", Time: "2 hours" },
//             Wednesday: { Activity: "Study advanced concepts and frameworks", Time: "2 hours" },
//             Thursday: { Activity: "Work on personal project", Time: "3 hours" },
//             Friday: { Activity: "Code review and debugging", Time: "2 hours" }
//           },
//           FollowUpNotes: "Focus on hands-on learning and building projects to reinforce your knowledge"
//         }
        
//         if (surveyData) {
//           try {
//             const parsed = JSON.parse(surveyData)
//             if (parsed.mainInterests) {
//               const interests = parsed.mainInterests.toLowerCase()
//               if (interests.includes("art") || interests.includes("design")) {
//                 mockData.SuggestedCareer = "Creative Technology & Digital Design"
//                 mockData.Rationale = "Your artistic interests combined with technology suggest a career in creative fields."
//               }
//             }
//           } catch (e) {
//             console.error("Error parsing survey data:", e)
//           }
//         }
        
//         setAnalysisProgress(100)
//         setIsComplete(true)
//         setAnalysisData(mockData)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     runAnalysis()
//   }, [])
// console.log(analysisData);

//   const handleGeneratePlan = () => {
//     if (analysisData) {
//       localStorage.setItem("careerAnalysis", JSON.stringify(analysisData))
//     }
//     window.location.href = "/dashboard"
//   }

//   const getCareerName = () => {
//     // Try multiple possible shapes: top-level SuggestedCareer, suggestedCareer,
//     // or nested inside a Rationale object/string that may itself be JSON.
//     const tryParse = (value: any) => {
//       if (!value) return null
//       if (typeof value === "string") {
//         try {
//           const parsed = JSON.parse(value)
//           return parsed
//         } catch (e) {
//           return value
//         }
//       }
//       return value
//     }

//     const raw = analysisData?.SuggestedCareer || analysisData?.suggestedCareer
//       || analysisData?.Rationale || analysisData?.rationale

//     const parsed = tryParse(raw)
//     if (parsed && typeof parsed === "object") {
//       return parsed.SuggestedCareer || parsed.suggestedCareer || ""
//     }
//     if (typeof parsed === "string") return parsed
//     return ""
//   }

//   const getRationale = () => {
//     const tryParse = (value: any) => {
//       if (!value) return null
//       if (typeof value === "string") {
//         try {
//           const parsed = JSON.parse(value)
//           return parsed
//         } catch (e) {
//           return value
//         }
//       }
//       return value
//     }

//     const raw = analysisData?.Rationale || analysisData?.rationale || analysisData?.SuggestedCareer || analysisData?.suggestedCareer
//     const parsed = tryParse(raw)
//     if (parsed && typeof parsed === "object") {
//       // If object contains a Rationale field, prefer it, else try other descriptive fields
//       return parsed.Rationale || parsed.rationale || parsed.description || JSON.stringify(parsed)
//     }
//     if (typeof parsed === "string") return parsed
//     return ""
//   }

//   const getResources = (): Resource[] => {
//     const resources = analysisData?.RecommendedResources || analysisData?.recommendedResources
//     if (Array.isArray(resources)) {
//       return resources
//     }
//     if (typeof resources === 'string') {
//       // try parse JSON string
//       try {
//         const parsed = JSON.parse(resources)
//         if (Array.isArray(parsed)) return parsed
//         if (typeof parsed === 'object') return Object.values(parsed) as unknown as Resource[]
//       } catch (e) {
//         return resources.split(/[,;]|\n/).filter(r => r.trim().length > 0).map((r, i) => ({
//           title: r.trim(),
//           link: "#",
//           type: "Resource",
//           description: r.trim()
//         }))
//       }
//     }
//     return []
//   }

//   const getWeeklyPlan = (): { day: string; activity: string; time: string }[] => {
//     let plan: any = analysisData?.WeeklyPlan || analysisData?.weeklyPlan
//     if (!plan) return []
//     if (typeof plan === 'string') {
//       try {
//         plan = JSON.parse(plan)
//       } catch (e) {
//         // attempt to parse simple newline format
//         return plan.split(/\n+/).map((line: string, i: number) => ({
//           day: `Day ${i + 1}`,
//           activity: line,
//           time: ""
//         }))
//       }
//     }

//     if (plan && typeof plan === 'object' && !Array.isArray(plan)) {
//       return Object.entries(plan).map(([day, details]: [string, any]) => ({
//         day,
//         activity: details?.Activity || details?.activity || details || "",
//         time: details?.Time || details?.time || ""
//       }))
//     }
//     return []
//   }

//   const getFollowUpNotes = () => {
//     const raw = analysisData?.FollowUpNotes || analysisData?.followUpNotes || analysisData?.Rationale || analysisData?.rationale
//     if (!raw) return ""
//     if (typeof raw === 'string') {
//       // If it's a JSON string that contains FollowUpNotes, parse it
//       try {
//         const parsed = JSON.parse(raw)
//         return parsed.FollowUpNotes || parsed.followUpNotes || raw
//       } catch (e) {
//         return raw
//       }
//     }
//     if (typeof raw === 'object') {
//       const r: any = raw
//       return r.FollowUpNotes || r.followUpNotes || JSON.stringify(r)
//     }
//     return ""
//   }

//   const getDayIcon = (day: string) => {
//     const icons: { [key: string]: string } = {
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
//     if (type.toLowerCase().includes("course")) return "🎓"
//     if (type.toLowerCase().includes("video")) return "🎬"
//     if (type.toLowerCase().includes("tutorial")) return "📖"
//     if (type.toLowerCase().includes("platform")) return "🌐"
//     return "📚"
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl animate-pulse">
//               <Brain className="w-8 h-8 text-primary-foreground" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
//               LIFE ORCHESTRATOR AI
//             </h1>
//           </div>
//           <p className="text-muted-foreground text-xl md:text-2xl text-pretty font-medium">
//             Your Personalized Career Journey
//           </p>
//         </div>

//         {error && (
//           <Card className="border-2 border-amber-500/50 mb-8 bg-gradient-to-br from-amber-500/10 to-amber-500/5 shadow-lg">
//             <CardContent className="pt-6">
//               <div className="flex items-start gap-4">
//                 <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5 shrink-0" />
//                 <div>
//                   <p className="font-semibold text-amber-900 dark:text-amber-200 text-lg">Connection Note</p>
//                   <p className="text-sm text-muted-foreground mt-2">{error}</p>
//                   <p className="text-xs text-muted-foreground mt-2 italic">Don't worry - we've generated intelligent recommendations based on your profile!</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {!isComplete ? (
//           <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/95 max-w-2xl mx-auto">
//             <CardHeader className="text-center pb-8">
//               <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center animate-pulse shadow-2xl">
//                 <Sparkles className="w-12 h-12 text-primary-foreground" />
//               </div>
//               <CardTitle className="text-3xl">Analyzing Your Profile</CardTitle>
//               <CardDescription className="text-base mt-2">
//                 AI is analyzing your responses and creating personalized career recommendations...
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <Progress value={analysisProgress} className="h-4 bg-muted" />
//                 <p className="text-center text-lg font-semibold text-primary">{analysisProgress}% Complete</p>
//               </div>
//             </CardContent>
//           </Card>
//         ) : analysisData ? (
//           <div className="space-y-8">
//             {/* Career Suggestion - Hero Section */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 overflow-hidden">
//               <CardHeader className="relative pb-0">
//                 <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl -z-10" />
//                 <div className="flex items-start gap-4 mb-4">
//                   <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 shadow-xl">
//                     <Target className="w-8 h-8 text-primary-foreground" />
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-2">
//                       <CheckCircle2 className="w-6 h-6 text-emerald-500" />
//                       <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Your Perfect Career Match</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
//                       {getCareerName()}
//                     </h2>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="pt-6">
//                 <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/10">
//                   <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                     <Lightbulb className="w-5 h-5 text-amber-500" />
//                     Why This Career Fits You
//                   </h3>
//                   <p className="text-muted-foreground leading-relaxed text-base">
//                     {getRationale()}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Learning Resources */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/95">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
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
//                     <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 bg-gradient-to-br from-card to-card/50">
//                       <CardContent className="pt-6">
//                         <div className="flex items-start gap-3 mb-3">
//                           <div className="text-3xl">{getResourceIcon(resource.type)}</div>
//                           <div className="flex-1">
//                             <div className="flex items-start justify-between gap-2 mb-1">
//                               <h4 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
//                                 {/* {resource.title} */}
//                                   {resource.description}

//                               </h4>
//                             </div>
//                             <Badge variant="outline" className="text-xs mb-2">
//                               {resource.type}
//                             </Badge>
//                           </div>
//                         </div>
//                         <p className="text-sm text-muted-foreground leading-relaxed mb-3">
//                           {resource.description}
//                         </p>
//                         {resource.link && resource.link !== "#" && (
//                           <Button 
//                             variant="ghost" 
//                             size="sm" 
//                             className="w-full justify-between group-hover:bg-primary/10"
//                             onClick={() => window.open(resource.link, '_blank')}
//                           >
//                             <span>View Resource</span>
//                             <ExternalLink className="w-4 h-4" />
//                           </Button>
//                         )}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Weekly Plan */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-card/95">
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <CardTitle className="flex items-center gap-3 text-2xl">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
//                         <Calendar className="w-5 h-5 text-white" />
//                       </div>
//                       Your Weekly Learning Schedule
//                     </CardTitle>
//                     <CardDescription className="text-base mt-2">
//                       A structured plan to help you stay on track
//                     </CardDescription>
//                   </div>
//                   <Badge variant="secondary" className="text-base px-4 py-2">
//                     {getWeeklyPlan().length} Days
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid gap-4">
//                   {getWeeklyPlan().map((day, index) => (
//                     <Card key={index} className={`border-2 bg-gradient-to-br ${getDayColor(index)} hover:shadow-lg transition-all duration-300`}>
//                       <CardContent className="pt-6">
//                         <div className="flex items-start gap-4">
//                           <div className="text-4xl">{getDayIcon(day.day)}</div>
//                           <div className="flex-1">
//                             <div className="flex items-center justify-between mb-2">
//                               <h4 className="text-lg font-bold">{day.day}</h4>
//                               <Badge className="bg-primary/20 text-primary border-primary/30">
//                                 {day.time}
//                               </Badge>
//                             </div>
//                             <p className="text-sm text-muted-foreground leading-relaxed">
//                               {day.activity}
//                             </p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
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
//                 <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-amber-500/20">
//                   <p className="text-base leading-relaxed text-muted-foreground">
//                     {getFollowUpNotes()}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* CTA */}
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-primary via-accent to-primary overflow-hidden">
//               <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
//               <CardContent className="pt-8 pb-8 relative">
//                 <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//                   <div className="flex items-start gap-4 text-primary-foreground">
//                     <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
//                       <Brain className="w-6 h-6" />
//                     </div>
//                     <div>
//                       <p className="font-bold text-2xl mb-2">Ready to Begin Your Journey?</p>
//                       <p className="text-primary-foreground/80 text-base">
//                         Let's create your personalized daily schedule and integrate everything into your life
//                       </p>
//                     </div>
//                   </div>
//                   <Button
//                     onClick={handleGeneratePlan}
//                     size="lg"
//                     className="bg-white text-primary hover:bg-white/90 transition-all shadow-xl text-lg px-8 py-6 shrink-0"
//                   >
//                     Start My Plan
//                     <ArrowRight className="w-5 h-5 ml-2" />
//                   </Button>
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
import { Brain, BookOpen, Target, Sparkles, ArrowRight, CheckCircle, Lightbulb, AlertCircle, ExternalLink, Calendar, RefreshCw } from "lucide-react"

export default function AnalysisDashboard() {
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState("")
  const [curlCommand, setCurlCommand] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedWeek, setSelectedWeek] = useState("Week 1")

  useEffect(() => {
    fetchAnalysis()
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

      const requestBody = {
        userId: typeof window !== 'undefined' ? (localStorage.getItem("userId") || "user-123") : "user-123",
        profileText:
          "Interested in healthcare technology, data science, and improving patient outcomes through innovative solutions.",
        availabilityHoursPerWeek: 20,
        preferences: "Looking for personalized learning paths in health tech",
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

      // Explicit 401 handling so we can show a curl command for debugging
      if (response.status === 401) {
        clearInterval(progressInterval)
        const curl = `curl -X 'POST' \\\n+  'https://personalai.runasp.net/api/Career/analyze' \\\n+  -H 'accept: text/plain' \\\n+  -H 'Authorization: Bearer ${authToken || "<YOUR_TOKEN_HERE>"}' \\\n+  -H 'Content-Type: application/json' \\\n+  -d '${JSON.stringify(requestBody).replace(/'/g, "\\'")}'`

        console.error("Career/analyze returned 401 Unauthorized")
        setCurlCommand(curl)
        setError("Unauthorized (401). Please log in or verify your token. See the curl command below to reproduce the request.")
        setAnalysisProgress(100)
        setIsLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Try to parse JSON, fall back to text
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

  const tryAsGuest = async () => {
    setCurlCommand("")
    setError("")
    setAnalysisProgress(0)
    setIsComplete(false)
    setIsLoading(true)

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => Math.min(prev + 10, 90))
    }, 300)

    try {
      const surveyData = typeof window !== 'undefined' ? localStorage.getItem("surveyAnswers") : null
      const parsed = surveyData ? JSON.parse(surveyData) : {}

      const requestBody = {
        userId: typeof window !== 'undefined' ? (localStorage.getItem("userId") || "guest-user") : "guest-user",
        profileText: JSON.stringify(parsed),
        availabilityHoursPerWeek: 10,
        preferences: parsed.mainInterests || parsed.favoriteSubjects || "",
        questions: JSON.stringify(parsed),
      }

      const response = await fetch("https://personalai.runasp.net/api/Career/analyze", {
        method: "POST",
        headers: {
          "accept": "application/json, text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error(`Guest analysis failed with status ${response.status}`)
      }

      let data
      try {
        data = await response.json()
      } catch {
        const t = await response.text()
        try { data = JSON.parse(t) } catch { data = { raw: t } }
      }

      clearInterval(progressInterval)
      setAnalysisData(data)
      setAnalysisProgress(100)
      setIsComplete(true)
    } catch (e) {
      clearInterval(progressInterval)
      console.error("Guest attempt failed:", e)
      setError(e instanceof Error ? e.message : String(e))
      setAnalysisProgress(100)
    } finally {
      setIsLoading(false)
    }
  }

  const getResources = () => {
    if (!analysisData?.recommendedResources) return []
    const resources = analysisData.recommendedResources as Record<string, string>

    return Object.entries(resources).map(([title, link]) => {
      const parts = title.split(' - ')
      return {
        title: parts[0],
        platform: parts[1] || 'Online',
        link: String(link),
        type: title.includes('Course') ? 'Course' : title.includes('Bootcamp') ? 'Bootcamp' : 'Resource',
      }
    })
  }

  const getWeeklyPlan = () => {
    if (!analysisData?.weeklyPlan) return []
    const weekData = analysisData.weeklyPlan?.[selectedWeek]
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
    return Object.keys(analysisData.weeklyPlan)
  }

  const getDayIcon = (day: string) => {
    const icons: Record<string, string> = {
      Monday: "🎯",
      Tuesday: "💡",
      Wednesday: "🚀",
      Thursday: "⚡",
      Friday: "🎨",
      Saturday: "🌟",
      Sunday: "📚"
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
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-between group-hover:bg-blue-500/10"
                          onClick={() => window.open(resource.link, '_blank')}
                        >
                          <span>View Resource</span>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Plan */}
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
                      A structured plan to help you stay on track
                    </CardDescription>
                  </div>
                </div>
                
                {/* Week Selector */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {getWeeks().map((week) => (
                    <Button
                      key={week}
                      onClick={() => setSelectedWeek(week)}
                      variant={selectedWeek === week ? "default" : "outline"}
                      size="sm"
                      className="shrink-0"
                    >
                      {week}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {getWeeklyPlan().map((day, index) => (
                    <Card key={index} className={`border-2 bg-gradient-to-br ${getDayColor(index)} hover:shadow-lg transition-all duration-300`}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{getDayIcon(day.day)}</div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                              <h4 className="text-lg font-bold">{day.day}</h4>
                              <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
                                {day.time}
                              </Badge>
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
              </CardContent>
            </Card>

            {/* Follow-up Notes */}
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

            {/* CTA */}
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
              <CardContent className="pt-8 pb-8 relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-start gap-4 text-white">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl mb-2">Ready to Review Your Journey?</p>
 
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-white/90 transition-all shadow-xl text-lg px-8 py-6 shrink-0"
                  >
                    GO To Dashboard 
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}