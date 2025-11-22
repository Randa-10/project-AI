// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { 
//   Trophy, Star, TrendingUp, Clock, Zap, Target, 
//   CheckCircle, AlertCircle, Sparkles, Calendar,
//   Award, BookOpen, Rocket, ThumbsUp, ChevronRight,
//   RefreshCw, Send, BarChart3, Brain
// } from "lucide-react"

// export default function LearningDashboard() {
//   const [currentView, setCurrentView] = useState<"submit" | "review">("submit")
//   const [isLoading, setIsLoading] = useState(false)
//   const [reviewData, setReviewData] = useState<any>(null)
//   const [error, setError] = useState("")
  
//   // Form state for submission
//   const [weekName, setWeekName] = useState("1")
//   const [satisfactionRating, setSatisfactionRating] = useState(3)
//   const [completedHours, setCompletedHours] = useState({
//     Monday: 0,
//     Tuesday: 0,
//     Wednesday: 0,
//     Thursday: 0,
//     Friday: 0,
//     Saturday: 0,
//     Sunday: 0
//   })
//   const [achievements, setAchievements] = useState("")
//   const [strengths, setStrengths] = useState("")
//   const [areasToImprove, setAreasToImprove] = useState("")

//   useEffect(() => {
//     fetchWeeklyReview()
//   }, [])

//   const getAuthToken = () => {
//     return typeof window !== 'undefined' ? localStorage.getItem("authToken") : null
//   }

//   const getUserId = () => {
//     return typeof window !== 'undefined' ? localStorage.getItem("userId") : null
//   }

//   const fetchWeeklyReview = async () => {
//     const authToken = getAuthToken()
//     const userId = getUserId()

//     if (!authToken || !userId) {
//       setError("Please log in to view your weekly review")
//       return
//     }

//     try {
//       const response = await fetch("https://personalai.runasp.net/api/Career/weekly-review", {
//         method: "GET",
//         headers: {
//           "accept": "application/json",
//           "Authorization": `Bearer ${authToken}`
//         }
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setReviewData(data)
//         setCurrentView("review")
//       } else if (response.status === 404) {
//         setCurrentView("submit")
//       }
//     } catch (err) {
//       console.error("Error fetching review:", err)
//     }
//   }

//   const submitWeeklyReview = async () => {
//     const authToken = getAuthToken()
//     const userId = getUserId()

//     if (!authToken || !userId) {
//       setError("Please log in to submit your review")
//       return
//     }

//     setIsLoading(true)
//     setError("")

//     const requestBody = {
//       userId: userId,
//       weekName: weekName,
//       completedHoursPerDay: completedHours,
//       achievementsUnlocked: achievements.split('\n').filter(a => a.trim()),
//       satisfactionRating: satisfactionRating,
//       strengths: strengths.split('\n').filter(s => s.trim()),
//       areasToImprove: areasToImprove.split('\n').filter(a => a.trim())
//     }

//     try {
//       const response = await fetch("https://personalai.runasp.net/api/Career/weekly-review", {
//         method: "POST",
//         headers: {
//           "accept": "application/json",
//           "Authorization": `Bearer ${authToken}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(requestBody)
//       })

//       if (response.ok) {
//         const data = await response.json()
//         setReviewData(data)
//         setCurrentView("review")
//       } else {
//         const errorText = await response.text()
//         setError(`Failed to submit review: ${errorText}`)
//       }
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to submit review")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const getTotalHours = () => {
//     return Object.values(completedHours).reduce((sum, hours) => sum + hours, 0)
//   }

//   const getLevelProgress = (level: number) => {
//     return ((level % 10) / 10) * 100
//   }

//   const getCompletionColor = (rate: number) => {
//     if (rate >= 80) return "text-emerald-600"
//     if (rate >= 60) return "text-blue-600"
//     if (rate >= 40) return "text-amber-600"
//     return "text-red-600"
//   }

//   if (currentView === "submit") {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="inline-flex items-center gap-3 mb-4">
//               <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-2xl">
//                 <Calendar className="w-8 h-8 text-white" />
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
//                 Weekly Review
//               </h1>
//             </div>
//             <p className="text-slate-600 dark:text-slate-400 text-xl">
//               Reflect on your learning journey this week
//             </p>
//           </div>

//           {error && (
//             <Card className="border-2 border-red-500/50 mb-6 bg-red-500/10">
//               <CardContent className="pt-6">
//                 <div className="flex items-center gap-3">
//                   <AlertCircle className="w-5 h-5 text-red-600" />
//                   <p className="text-red-900 dark:text-red-200">{error}</p>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Submit Form */}
//           <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//             <CardHeader>
//               <CardTitle className="text-2xl flex items-center gap-3">
//                 <Send className="w-6 h-6 text-purple-600" />
//                 Submit Your Weekly Progress
//               </CardTitle>
//               <CardDescription>
//                 Share your accomplishments and learning hours for the week
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Week Selection */}
//               <div>
//                 <Label htmlFor="week" className="text-base font-semibold mb-2 block">
//                   Week Number
//                 </Label>
//                 <Input
//                   id="week"
//                   type="number"
//                   min="1"
//                   value={weekName}
//                   onChange={(e) => setWeekName(e.target.value)}
//                   className="text-lg"
//                 />
//               </div>

//               {/* Satisfaction Rating */}
//               <div>
//                 <Label className="text-base font-semibold mb-3 block">
//                   Satisfaction Rating (1-5)
//                 </Label>
//                 <div className="flex gap-3">
//                   {[1, 2, 3, 4, 5].map((rating) => (
//                     <button
//                       key={rating}
//                       onClick={() => setSatisfactionRating(rating)}
//                       className={`w-16 h-16 rounded-xl border-2 transition-all ${
//                         satisfactionRating >= rating
//                           ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-500 text-white scale-110'
//                           : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
//                       }`}
//                     >
//                       <Star className={`w-8 h-8 mx-auto ${satisfactionRating >= rating ? 'fill-current' : ''}`} />
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Daily Hours */}
//               <div>
//                 <Label className="text-base font-semibold mb-3 block">
//                   Learning Hours Per Day
//                 </Label>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   {Object.keys(completedHours).map((day) => (
//                     <div key={day} className="space-y-2">
//                       <Label htmlFor={day} className="text-sm font-medium">
//                         {day}
//                       </Label>
//                       <Input
//                         id={day}
//                         type="number"
//                         min="0"
//                         step="0.5"
//                         value={completedHours[day as keyof typeof completedHours]}
//                         onChange={(e) => setCompletedHours({
//                           ...completedHours,
//                           [day]: parseFloat(e.target.value) || 0
//                         })}
//                         className="text-center"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
//                   <p className="text-sm font-medium">
//                     Total Hours: <span className="text-blue-600 text-lg">{getTotalHours()}</span>
//                   </p>
//                 </div>
//               </div>

//               {/* Achievements */}
//               <div>
//                 <Label htmlFor="achievements" className="text-base font-semibold mb-2 block">
//                   Achievements Unlocked
//                 </Label>
//                 <Textarea
//                   id="achievements"
//                   placeholder="List your achievements (one per line)&#10;e.g. Completed Python basics course&#10;Built first web application"
//                   value={achievements}
//                   onChange={(e) => setAchievements(e.target.value)}
//                   rows={4}
//                   className="resize-none"
//                 />
//               </div>

//               {/* Strengths */}
//               <div>
//                 <Label htmlFor="strengths" className="text-base font-semibold mb-2 block">
//                   Your Strengths This Week
//                 </Label>
//                 <Textarea
//                   id="strengths"
//                   placeholder="What went well? (one per line)&#10;e.g. Consistent daily practice&#10;Quick problem-solving"
//                   value={strengths}
//                   onChange={(e) => setStrengths(e.target.value)}
//                   rows={3}
//                   className="resize-none"
//                 />
//               </div>

//               {/* Areas to Improve */}
//               <div>
//                 <Label htmlFor="improve" className="text-base font-semibold mb-2 block">
//                   Areas to Improve
//                 </Label>
//                 <Textarea
//                   id="improve"
//                   placeholder="What can be better? (one per line)&#10;e.g. Time management&#10;Focus on advanced topics"
//                   value={areasToImprove}
//                   onChange={(e) => setAreasToImprove(e.target.value)}
//                   rows={3}
//                   className="resize-none"
//                 />
//               </div>

//               {/* Submit Button */}
//               <Button
//                 onClick={submitWeeklyReview}
//                 disabled={isLoading}
//                 size="lg"
//                 className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg py-6"
//               >
//                 {isLoading ? (
//                   <>
//                     <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <Send className="w-5 h-5 mr-2" />
//                     Submit Weekly Review
//                   </>
//                 )}
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   // Review View
//   if (!reviewData) return null

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-2xl animate-pulse">
//               <Trophy className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
//               Weekly Review
//             </h1>
//           </div>
//           <p className="text-slate-600 dark:text-slate-400 text-xl">
//             {reviewData.weekRange}
//           </p>
//         </div>

//         <div className="space-y-8">
//           {/* Stats Overview */}
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* Level Card */}
//             <Card className="border-2 shadow-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
//                     <Award className="w-6 h-6 text-white" />
//                   </div>
//                   <Badge className="text-lg px-3 py-1 bg-purple-500/20 text-purple-700 border-purple-500/30">
//                     Level {reviewData.level}
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Current Level</p>
//                 <Progress value={getLevelProgress(reviewData.level)} className="h-2" />
//               </CardContent>
//             </Card>

//             {/* Completion Rate */}
//             <Card className="border-2 shadow-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
//                     <Target className="w-6 h-6 text-white" />
//                   </div>
//                 </div>
//                 <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Completion Rate</p>
//                 <p className={`text-4xl font-bold ${getCompletionColor(reviewData.completionRate)}`}>
//                   {reviewData.completionRate}%
//                 </p>
//               </CardContent>
//             </Card>

//             {/* Learning Time */}
//             <Card className="border-2 shadow-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
//                     <Clock className="w-6 h-6 text-white" />
//                   </div>
//                 </div>
//                 <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Learning Time</p>
//                 <p className="text-4xl font-bold text-emerald-600">
//                   {reviewData.learningTimeHours}h
//                 </p>
//               </CardContent>
//             </Card>

//             {/* XP Earned */}
//             <Card className="border-2 shadow-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
//                     <Zap className="w-6 h-6 text-white" />
//                   </div>
//                   <Badge className="text-sm px-2 py-1 bg-amber-500/20 text-amber-700 border-amber-500/30">
//                     🔥 {reviewData.dayStreak} day streak
//                   </Badge>
//                 </div>
//                 <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">XP Earned</p>
//                 <p className="text-4xl font-bold text-amber-600">
//                   {reviewData.xpEarned}
//                 </p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Achievements */}
//           {reviewData.achievementsUnlocked && reviewData.achievementsUnlocked.length > 0 && (
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
//                     <Trophy className="w-5 h-5 text-white" />
//                   </div>
//                   Achievements Unlocked
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {reviewData.achievementsUnlocked.map((achievement: any, index: number) => (
//                     <Card key={index} className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/20">
//                       <CardContent className="pt-6">
//                         <div className="flex items-start gap-4">
//                           <div className="text-4xl">🏆</div>
//                           <div>
//                             <h4 className="font-bold text-lg mb-1">{achievement.title}</h4>
//                             <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Topic Progress */}
//           {reviewData.topicProgress && reviewData.topicProgress.length > 0 && (
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
//                     <BarChart3 className="w-5 h-5 text-white" />
//                   </div>
//                   Topic Progress
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-6">
//                   {reviewData.topicProgress.map((topic: any, index: number) => (
//                     <div key={index}>
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center gap-3">
//                           <BookOpen className="w-5 h-5 text-blue-600" />
//                           <span className="font-semibold">{topic.topic}</span>
//                         </div>
//                         <div className="flex items-center gap-3">
//                           <Badge variant="outline" className="text-xs">
//                             {topic.hours}h
//                           </Badge>
//                           <span className="text-sm font-bold text-blue-600">
//                             {topic.percentComplete}%
//                           </span>
//                         </div>
//                       </div>
//                       <Progress value={topic.percentComplete} className="h-3" />
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Strengths & Areas to Improve */}
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Strengths */}
//             {reviewData.strengths && reviewData.strengths.length > 0 && (
//               <Card className="border-2 shadow-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-3">
//                     <ThumbsUp className="w-6 h-6 text-emerald-600" />
//                     Strengths
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-3">
//                     {reviewData.strengths.map((strength: string, index: number) => (
//                       <li key={index} className="flex items-start gap-3">
//                         <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
//                         <span className="text-slate-700 dark:text-slate-300">{strength}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Areas to Improve */}
//             {reviewData.areasToImprove && reviewData.areasToImprove.length > 0 && (
//               <Card className="border-2 shadow-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-3">
//                     <TrendingUp className="w-6 h-6 text-amber-600" />
//                     Areas to Improve
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <ul className="space-y-3">
//                     {reviewData.areasToImprove.map((area: string, index: number) => (
//                       <li key={index} className="flex items-start gap-3">
//                         <Target className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
//                         <span className="text-slate-700 dark:text-slate-300">{area}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           {/* Next Week Preview */}
//           {reviewData.nextWeekPreview && (
//             <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
//                     <Rocket className="w-5 h-5 text-white" />
//                   </div>
//                   Next Week Preview
//                 </CardTitle>
//                 <CardDescription className="text-base">
//                   Get ready for an exciting week ahead!
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid md:grid-cols-3 gap-6 mb-6">
//                   <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl">
//                     <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
//                     <p className="text-3xl font-bold text-blue-600">
//                       {reviewData.nextWeekPreview.estimatedTimeHours}h
//                     </p>
//                     <p className="text-sm text-slate-600 dark:text-slate-400">Estimated Time</p>
//                   </div>
//                   <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl">
//                     <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
//                     <p className="text-3xl font-bold text-purple-600">
//                       {reviewData.nextWeekPreview.projectsCount}
//                     </p>
//                     <p className="text-sm text-slate-600 dark:text-slate-400">Projects</p>
//                   </div>
//                   <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl">
//                     <Sparkles className="w-8 h-8 mx-auto mb-2 text-amber-600" />
//                     <p className="text-3xl font-bold text-amber-600">
//                       {reviewData.nextWeekPreview.newTopicsCount}
//                     </p>
//                     <p className="text-sm text-slate-600 dark:text-slate-400">New Topics</p>
//                   </div>
//                 </div>

//                 {reviewData.nextWeekPreview.upcomingProjects && reviewData.nextWeekPreview.upcomingProjects.length > 0 && (
//                   <div className="mb-4">
//                     <h4 className="font-semibold mb-3 flex items-center gap-2">
//                       <ChevronRight className="w-5 h-5 text-indigo-600" />
//                       Upcoming Projects
//                     </h4>
//                     <div className="space-y-2">
//                       {reviewData.nextWeekPreview.upcomingProjects.map((project: string, index: number) => (
//                         <div key={index} className="flex items-center gap-2 p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg">
//                           <Target className="w-4 h-4 text-indigo-600" />
//                           <span>{project}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {reviewData.nextWeekPreview.newTopics && reviewData.nextWeekPreview.newTopics.length > 0 && (
//                   <div>
//                     <h4 className="font-semibold mb-3 flex items-center gap-2">
//                       <ChevronRight className="w-5 h-5 text-purple-600" />
//                       New Topics to Explore
//                     </h4>
//                     <div className="flex flex-wrap gap-2">
//                       {reviewData.nextWeekPreview.newTopics.map((topic: string, index: number) => (
//                         <Badge key={index} className="bg-purple-500/20 text-purple-700 border-purple-500/30 text-sm px-3 py-1">
//                           {topic}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           )}

//           {/* Satisfaction */}
//           <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/20">
//             <CardContent className="pt-8 pb-8">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <Brain className="w-12 h-12 text-pink-600" />
//                   <div>
//                     <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Overall Satisfaction</p>
//                     <div className="flex gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           className={`w-8 h-8 ${
//                             star <= reviewData.satisfactionRating
//                               ? 'text-amber-400 fill-amber-400'
//                               : 'text-slate-300 dark:text-slate-600'
//                           }`}
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={() => setCurrentView("submit")}
//                   variant="outline"
//                   size="lg"
//                 >
//                   <RefreshCw className="w-5 h-5 mr-2" />
//                   Submit New Review
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Trophy, Star, TrendingUp, Clock, Zap, Target, 
  CheckCircle, AlertCircle, Sparkles, Calendar,
  Award, BookOpen, Rocket, ThumbsUp, ChevronRight,
  RefreshCw, Send, BarChart3, Brain, ArrowRight
} from "lucide-react"

export default function LearningDashboard() {
  const [currentView, setCurrentView] = useState<"select" | "submit" | "review">("select")
  const [isLoading, setIsLoading] = useState(false)
  const [reviewData, setReviewData] = useState<any>(null)
  const [error, setError] = useState("")
  const [analysisData, setAnalysisData] = useState<any>(null)
  
  // Selection state
  const [selectedWeek, setSelectedWeek] = useState("Week 1")
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({})
  
  // Form state for submission
  const [weekName, setWeekName] = useState("1")
  const [satisfactionRating, setSatisfactionRating] = useState(3)
  const [completedHours, setCompletedHours] = useState<Record<string, number>>({})

  useEffect(() => {
    // Load analysis data from localStorage
    const storedAnalysis = typeof window !== 'undefined' ? localStorage.getItem("careerAnalysis") : null
    if (storedAnalysis) {
      try {
        const parsed = JSON.parse(storedAnalysis)
        setAnalysisData(parsed)
      } catch (e) {
        console.error("Failed to parse stored analysis:", e)
      }
    }
  }, [])

  const getAuthToken = () => {
    return typeof window !== 'undefined' ? localStorage.getItem("authToken") : null
  }

  const getUserId = () => {
    return typeof window !== 'undefined' ? localStorage.getItem("userId") : null
  }

  const getWeeklyPlan = () => {
    if (!analysisData?.weeklyPlan) return []
    
    const weeklyPlanText = analysisData.weeklyPlan
    
    if (typeof weeklyPlanText === 'string') {
      const weeks = weeklyPlanText.split(/Week \d+:/i).filter(w => w.trim())
      const currentWeekIndex = parseInt(selectedWeek.replace('Week ', '')) - 1
      const weekText = weeks[currentWeekIndex] || weeks[0] || ''
      
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      const result: any[] = []
      
      const segments = weekText.split(/,(?=\s*(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Learn|Explore|Complete|Take|Practice|Work|Review|Present))/i)
      
      segments.forEach((segment, index) => {
        const trimmed = segment.trim()
        if (!trimmed) return
        
        const timeMatch = trimmed.match(/\((\d+)\s+hours?\)/)
        const time = timeMatch ? parseFloat(timeMatch[1]) : 0
        
        let activity = trimmed.replace(/\(\d+\s+hours?\)/g, '').trim()
        
        const dayIndex = index % 7
        result.push({
          day: days[dayIndex],
          time: time,
          activity: activity,
        })
      })
      
      return result.length > 0 ? result : [{
        day: 'This Week',
        time: 0,
        activity: weekText.trim(),
      }]
    }

    const weekData = weeklyPlanText?.[selectedWeek]
    if (!weekData) return []

    return Object.entries(weekData).map(([day, activity]) => {
      const activityStr = String(activity || "")
      const timeMatch = activityStr.match(/^(\d+)\s+hours?/)
      const time = timeMatch ? parseFloat(timeMatch[1]) : 0

      return {
        day,
        time: time,
        activity: activityStr.replace(/^\d+\s+hours?:\s*/, '').trim(),
      }
    })
  }

  const getWeeks = () => {
    if (!analysisData?.weeklyPlan) return []
    
    const weeklyPlanText = analysisData.weeklyPlan
    
    if (typeof weeklyPlanText === 'string') {
      const weekMatches = weeklyPlanText.match(/Week \d+/gi) || []
      return [...new Set(weekMatches)]
    }
    
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

  const handleDayCheckbox = (day: string, checked: boolean) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: checked
    }))
  }

  const getSelectedDaysCount = () => {
    return Object.values(selectedDays).filter(Boolean).length
  }

  const proceedToSubmit = () => {
    if (getSelectedDaysCount() === 0) {
      alert("Please select at least one day to review!")
      return
    }

    // Pre-fill hours based on selected days
    const weeklyPlan = getWeeklyPlan()
    const hours: Record<string, number> = {}
    
    weeklyPlan.forEach(dayData => {
      if (selectedDays[dayData.day]) {
        hours[dayData.day] = dayData.time || 0
      }
    })
    
    setCompletedHours(hours)
    setCurrentView("submit")
  }

  const submitWeeklyReview = async () => {
    const authToken = getAuthToken()
    const userId = getUserId()

    if (!authToken || !userId) {
      setError("Please log in to submit your review")
      return
    }

    setIsLoading(true)
    setError("")

    // Get selected activities for achievements
    const weeklyPlan = getWeeklyPlan()
    const selectedActivities = weeklyPlan
      .filter(day => selectedDays[day.day])
      .map(day => day.activity)

    const requestBody = {
      userId: userId,
      weekName: weekName,
      completedHoursPerDay: completedHours,
      achievementsUnlocked: selectedActivities,
      satisfactionRating: satisfactionRating,
      strengths: [],
      areasToImprove: []
    }

    try {
      const response = await fetch("https://personalai.runasp.net/api/Career/weekly-review", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const data = await response.json()
        setReviewData(data)
        setCurrentView("review")
      } else {
        const errorText = await response.text()
        setError(`Failed to submit review: ${errorText}`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review")
    } finally {
      setIsLoading(false)
    }
  }

  const getTotalHours = () => {
    return Object.values(completedHours).reduce((sum, hours) => sum + hours, 0)
  }

  const getLevelProgress = (level: number) => {
    return ((level % 10) / 10) * 100
  }

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return "text-emerald-600"
    if (rate >= 60) return "text-blue-600"
    if (rate >= 40) return "text-amber-600"
    return "text-red-600"
  }

  // Selection View
  if (currentView === "select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-2xl">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Weekly Review
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xl">
              Select the activities you completed this week
            </p>
          </div>

          {!analysisData ? (
            <Card className="border-2 shadow-xl bg-white/95 dark:bg-slate-900/95">
              <CardContent className="pt-8 pb-8 text-center">
                <AlertCircle className="w-16 h-16 mx-auto mb-4 text-amber-500" />
                <h3 className="text-xl font-bold mb-2">No Career Plan Found</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Please complete your career analysis first to generate a review.
                </p>
                <Button onClick={() => window.location.href = "/analysis"}>
                  Go to Analysis
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      Select Completed Activities
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Check the activities you completed to generate your weekly review
                    </CardDescription>
                  </div>
                  {getSelectedDaysCount() > 0 && (
                    <Button 
                      onClick={proceedToSubmit}
                      className="bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                      size="lg"
                    >
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Continue ({getSelectedDaysCount()} selected)
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
                    <Card key={index} className={`border-2 bg-gradient-to-br ${getDayColor(index)} hover:shadow-lg transition-all duration-300 ${selectedDays[day.day] ? 'ring-2 ring-emerald-500' : ''}`}>
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
                              {day.time > 0 && (
                                <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30">
                                  {day.time} hours
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {day.activity}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {getSelectedDaysCount() === 0 && (
                  <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Trophy className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm text-purple-900 dark:text-purple-200 mb-1">
                          Ready to review your week?
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Select the activities you completed, and we'll generate a personalized weekly review with stats, achievements, and insights!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // Submit View
  if (currentView === "submit") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-2xl">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Review Details
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xl">
              Finalize your weekly review submission
            </p>
          </div>

          {error && (
            <Card className="border-2 border-red-500/50 mb-6 bg-red-500/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-900 dark:text-red-200">{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Trophy className="w-6 h-6 text-purple-600" />
                Complete Your Review
              </CardTitle>
              <CardDescription>
                Review your selected activities and provide feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Activities Summary */}
              <div className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/20 rounded-xl">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  Selected Activities ({Object.keys(completedHours).length})
                </h3>
                <div className="space-y-2">
                  {Object.entries(completedHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between bg-white/50 dark:bg-slate-900/50 p-3 rounded-lg">
                      <span className="font-medium">{getDayIcon(day)} {day}</span>
                      <Badge className="bg-blue-500/20 text-blue-700 border-blue-500/30">
                        {hours} hours
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-emerald-500/20">
                  <p className="text-sm font-semibold">
                    Total Learning Time: <span className="text-emerald-600 text-lg">{getTotalHours()} hours</span>
                  </p>
                </div>
              </div>

              {/* Week Number */}
              <div>
                <Label htmlFor="week" className="text-base font-semibold mb-2 block">
                  Week Number
                </Label>
                <Input
                  id="week"
                  type="number"
                  min="1"
                  value={weekName}
                  onChange={(e) => setWeekName(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* Satisfaction Rating */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  How satisfied are you with this week's progress?
                </Label>
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSatisfactionRating(rating)}
                      className={`w-16 h-16 rounded-xl border-2 transition-all ${
                        satisfactionRating >= rating
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-500 text-white scale-110'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                      }`}
                    >
                      <Star className={`w-8 h-8 mx-auto ${satisfactionRating >= rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setCurrentView("select")}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Change Selection
                </Button>
                <Button
                  onClick={submitWeeklyReview}
                  disabled={isLoading}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Review
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Review View
  if (!reviewData) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center shadow-2xl animate-pulse">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Weekly Review
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xl">
            {reviewData.weekRange || `Week ${weekName}`}
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Level Card */}
            <Card className="border-2 shadow-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="text-lg px-3 py-1 bg-purple-500/20 text-purple-700 border-purple-500/30">
                    Level {reviewData.level || 1}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Current Level</p>
                <Progress value={getLevelProgress(reviewData.level || 1)} className="h-2" />
              </CardContent>
            </Card>

            {/* Completion Rate */}
            <Card className="border-2 shadow-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Completion Rate</p>
                <p className={`text-4xl font-bold ${getCompletionColor(reviewData.completionRate || 85)}`}>
                  {reviewData.completionRate || 85}%
                </p>
              </CardContent>
            </Card>

            {/* Learning Time */}
            <Card className="border-2 shadow-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Learning Time</p>
                <p className="text-4xl font-bold text-emerald-600">
                  {reviewData.learningTimeHours || getTotalHours()}h
                </p>
              </CardContent>
            </Card>

            {/* XP Earned */}
            <Card className="border-2 shadow-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="text-sm px-2 py-1 bg-amber-500/20 text-amber-700 border-amber-500/30">
                    🔥 {reviewData.dayStreak || getSelectedDaysCount()} day streak
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">XP Earned</p>
                <p className="text-4xl font-bold text-amber-600">
                  {reviewData.xpEarned || getTotalHours() * 50}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          {reviewData.achievementsUnlocked && reviewData.achievementsUnlocked.length > 0 && (
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                  </div>
                  Achievements Unlocked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {reviewData.achievementsUnlocked.map((achievement: any, index: number) => {
                    const isString = typeof achievement === 'string'
                    return (
                      <Card key={index} className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-500/20">
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">🏆</div>
                            <div>
                              <h4 className="font-bold text-lg mb-1">
                                {isString ? achievement : achievement.title}
                              </h4>
                              {!isString && achievement.description && (
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {achievement.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Topic Progress */}
          {reviewData.topicProgress && reviewData.topicProgress.length > 0 && (
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  Topic Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviewData.topicProgress.map((topic: any, index: number) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">{topic.topic}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {topic.hours}h
                          </Badge>
                          <span className="text-sm font-bold text-blue-600">
                            {topic.percentComplete}%
                          </span>
                        </div>
                      </div>
                      <Progress value={topic.percentComplete} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Strengths & Areas to Improve */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Strengths */}
            {reviewData.strengths && reviewData.strengths.length > 0 && (
              <Card className="border-2 shadow-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <ThumbsUp className="w-6 h-6 text-emerald-600" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {reviewData.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Areas to Improve */}
            {reviewData.areasToImprove && reviewData.areasToImprove.length > 0 && (
              <Card className="border-2 shadow-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                    Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {reviewData.areasToImprove.map((area: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">{area}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Next Week Preview */}
          {reviewData.nextWeekPreview && (
            <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  Next Week Preview
                </CardTitle>
                <CardDescription className="text-base">
                  Get ready for an exciting week ahead!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-3xl font-bold text-blue-600">
                      {reviewData.nextWeekPreview.estimatedTimeHours}h
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Estimated Time</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl">
                    <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-3xl font-bold text-purple-600">
                      {reviewData.nextWeekPreview.projectsCount}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Projects</p>
                  </div>
                  <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-xl">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                    <p className="text-3xl font-bold text-amber-600">
                      {reviewData.nextWeekPreview.newTopicsCount}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">New Topics</p>
                  </div>
                </div>

                {reviewData.nextWeekPreview.upcomingProjects && reviewData.nextWeekPreview.upcomingProjects.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <ChevronRight className="w-5 h-5 text-indigo-600" />
                      Upcoming Projects
                    </h4>
                    <div className="space-y-2">
                      {reviewData.nextWeekPreview.upcomingProjects.map((project: string, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg">
                          <Target className="w-4 h-4 text-indigo-600" />
                          <span>{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {reviewData.nextWeekPreview.newTopics && reviewData.nextWeekPreview.newTopics.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <ChevronRight className="w-5 h-5 text-purple-600" />
                      New Topics to Explore
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {reviewData.nextWeekPreview.newTopics.map((topic: string, index: number) => (
                        <Badge key={index} className="bg-purple-500/20 text-purple-700 border-purple-500/30 text-sm px-3 py-1">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Satisfaction */}
          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/20">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Brain className="w-12 h-12 text-pink-600" />
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Overall Satisfaction</p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-8 h-8 ${
                            star <= (reviewData.satisfactionRating || satisfactionRating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setCurrentView("select")
                    setSelectedDays({})
                    setCompletedHours({})
                  }}
                  variant="outline"
                  size="lg"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Create New Review
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Back to Dashboard CTA */}
          <Card className="border-2 shadow-2xl backdrop-blur-sm bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
            <CardContent className="pt-8 pb-8 relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-2xl mb-2">Great Work This Week!</p>
                    <p className="text-white/90">Continue your learning journey on the dashboard</p>
                  </div>
                </div>
                
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 transition-all shadow-xl text-lg px-8 py-6 shrink-0"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Go To Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}