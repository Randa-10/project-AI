"use client"

// import { useState, useRef } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import {
//   FileText,
//   Upload,
//   Sparkles,
//   CheckCircle2,
//   AlertCircle,
//   TrendingUp,
//   Target,
//   BookOpen,
//   Star,
//   ArrowLeft,
//   ExternalLink,
//   Lightbulb,
//   Award,
//   RefreshCw
// } from "lucide-react"

// interface CVAnalysisResult {
//   cvSummary: string
//   strengths: string[]
//   areasToImprove: string[]
//   enhancementSuggestions: string[]
//   recommendedSkills: string[]
//   recommendedCourses: Record<string, string>
//   assessment: string
// }

// export default function CVAnalyzer() {
//   const [file, setFile] = useState<File | null>(null)
//   const [goals, setGoals] = useState("")
//   const [targetRole, setTargetRole] = useState("")
//   const [isAnalyzing, setIsAnalyzing] = useState(false)
//   const [analysisProgress, setAnalysisProgress] = useState(0)
//   const [result, setResult] = useState<CVAnalysisResult | null>(null)
//   const [error, setError] = useState("")
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files?.[0]
//     if (selectedFile) {
//       if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf")) {
//         setFile(selectedFile)
//         setError("")
//       } else {
//         setError("Please upload a PDF file")
//         setFile(null)
//       }
//     }
//   }

//   const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//     const droppedFile = e.dataTransfer.files[0]
//     if (droppedFile) {
//       if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf")) {
//         setFile(droppedFile)
//         setError("")
//       } else {
//         setError("Please upload a PDF file")
//       }
//     }
//   }

//   const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault()
//   }

//   const analyzeCV = async () => {
//     if (!file) {
//       setError("Please upload a CV file")
//       return
//     }

//     setIsAnalyzing(true)
//     setError("")
//     setAnalysisProgress(0)

//     const progressInterval = setInterval(() => {
//       setAnalysisProgress((prev) => Math.min(prev + 10, 90))
//     }, 500)

//     try {
//       const authToken = typeof window !== 'undefined' ? localStorage.getItem("authToken") : null

//       if (!authToken) {
//         throw new Error("Authentication required. Please log in.")
//       }

//       const formData = new FormData()
//       formData.append("file", file)
//       formData.append("goals", goals)
//       formData.append("targetRole", targetRole)

//       const response = await fetch("https://personalai.runasp.net/api/Career/analyze-cv", {
//         method: "POST",
//         headers: {
//           "accept": "application/json",
//           "Authorization": `Bearer ${authToken}`
//         },
//         body: formData
//       })

//       if (response.status === 401) {
//         throw new Error("Unauthorized. Please log in again.")
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const data = await response.json()
//       clearInterval(progressInterval)
//       setResult(data)
//       setAnalysisProgress(100)
//     } catch (err) {
//       clearInterval(progressInterval)
//       console.error("Error analyzing CV:", err)
//       setError(err instanceof Error ? err.message : "Failed to analyze CV. Please try again.")
//       setAnalysisProgress(100)
//     } finally {
//       setIsAnalyzing(false)
//     }
//   }

//   const resetForm = () => {
//     setFile(null)
//     setGoals("")
//     setTargetRole("")
//     setResult(null)
//     setError("")
//     setAnalysisProgress(0)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   // Upload Form
//   if (!result) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center gap-3 mb-4">
//               <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl">
//                 <FileText className="w-8 h-8 text-white" />
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 CV Analyzer
//               </h1>
//             </div>
//             <p className="text-slate-600 dark:text-slate-400 text-xl">
//               Get AI-powered insights to improve your CV
//             </p>
//           </div>

//           {/* Back Button */}
//           <div className="mb-6">
//             <Button
//               onClick={() => window.location.href = "/analysis"}
//               variant="ghost"
//               className="gap-2"
//             >
//               <ArrowLeft className="w-4 h-4" />
//               Back to Analysis
//             </Button>
//           </div>

//           {/* Upload Card */}
//           <Card className="border-2 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//             <CardHeader>
//               <CardTitle className="text-2xl">Upload Your CV</CardTitle>
//               <CardDescription className="text-base">
//                 Upload your CV in PDF format and provide some context for better analysis
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* File Upload */}
//               <div>
//                 <Label htmlFor="cv-upload" className="text-base mb-3 block">
//                   CV File (PDF) *
//                 </Label>
//                 <div
//                   onDrop={handleDrop}
//                   onDragOver={handleDragOver}
//                   className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                     file
//                       ? "border-green-500 bg-green-500/10"
//                       : "border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50 dark:bg-slate-800/50"
//                   }`}
//                 >
//                   <input
//                     ref={fileInputRef}
//                     id="cv-upload"
//                     type="file"
//                     accept=".pdf"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                   {file ? (
//                     <div className="space-y-3">
//                       <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
//                       <p className="font-semibold text-lg">{file.name}</p>
//                       <p className="text-sm text-slate-600 dark:text-slate-400">
//                         {(file.size / 1024 / 1024).toFixed(2)} MB
//                       </p>
//                       <Button
//                         onClick={() => fileInputRef.current?.click()}
//                         variant="outline"
//                         size="sm"
//                       >
//                         Change File
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       <Upload className="w-12 h-12 text-slate-400 mx-auto" />
//                       <div>
//                         <p className="font-semibold text-lg mb-1">
//                           Drop your CV here or click to browse
//                         </p>
//                         <p className="text-sm text-slate-600 dark:text-slate-400">
//                           PDF files only, max 10MB
//                         </p>
//                       </div>
//                       <Button
//                         onClick={() => fileInputRef.current?.click()}
//                         variant="outline"
//                       >
//                         Select File
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Goals Input */}
//               <div>
//                 <Label htmlFor="goals" className="text-base">
//                   Your Career Goals (Optional)
//                 </Label>
//                 <Input
//                   id="goals"
//                   placeholder="e.g., Become a senior software engineer, transition to management..."
//                   value={goals}
//                   onChange={(e) => setGoals(e.target.value)}
//                   className="mt-2"
//                 />
//               </div>

//               {/* Target Role Input */}
//               <div>
//                 <Label htmlFor="targetRole" className="text-base">
//                   Target Role (Optional)
//                 </Label>
//                 <Input
//                   id="targetRole"
//                   placeholder="e.g., Full Stack Developer, Data Scientist, Product Manager..."
//                   value={targetRole}
//                   onChange={(e) => setTargetRole(e.target.value)}
//                   className="mt-2"
//                 />
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
//                   <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
//                   <p className="text-sm text-red-900 dark:text-red-200">{error}</p>
//                 </div>
//               )}

//               {/* Analyze Button */}
//               {!isAnalyzing ? (
//                 <Button
//                   onClick={analyzeCV}
//                   disabled={!file}
//                   className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg py-6"
//                 >
//                   <Sparkles className="w-5 h-5 mr-2" />
//                   Analyze CV
//                 </Button>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="text-center">
//                     <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center animate-pulse">
//                       <Sparkles className="w-8 h-8 text-white" />
//                     </div>
//                     <p className="text-lg font-semibold mb-2">Analyzing Your CV...</p>
//                     <p className="text-sm text-slate-600 dark:text-slate-400">
//                       AI is reviewing your qualifications and experience
//                     </p>
//                   </div>
//                   <Progress value={analysisProgress} className="h-3" />
//                   <p className="text-center text-sm font-medium text-blue-600">
//                     {analysisProgress}% Complete
//                   </p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   // Results View
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center gap-3 mb-4">
//             <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl">
//               <Award className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               CV Analysis Results
//             </h1>
//           </div>
//           <p className="text-slate-600 dark:text-slate-400 text-xl">
//             Here's what we found in your CV
//           </p>
//         </div>

//         <div className="space-y-6">
//           {/* CV Summary */}
//           <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-2xl">
//                 <FileText className="w-6 h-6 text-blue-600" />
//                 CV Summary
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
//                 {result.cvSummary}
//               </p>
//             </CardContent>
//           </Card>

//           {/* Strengths and Areas to Improve */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Star className="w-5 h-5 text-emerald-500" />
//                   Your Strengths
//                 </CardTitle>
//                 <CardDescription>What stands out in your CV</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 {result.strengths.map((strength, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
//                   >
//                     <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
//                     <p className="text-sm leading-relaxed">{strength}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

//             <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <TrendingUp className="w-5 h-5 text-amber-500" />
//                   Areas to Improve
//                 </CardTitle>
//                 <CardDescription>Opportunities for enhancement</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 {result.areasToImprove.map((area, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
//                   >
//                     <Target className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
//                     <p className="text-sm leading-relaxed">{area}</p>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Enhancement Suggestions */}
//           <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Lightbulb className="w-5 h-5 text-blue-600" />
//                 Enhancement Suggestions
//               </CardTitle>
//               <CardDescription>Actionable steps to improve your CV</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {result.enhancementSuggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
//                     {index + 1}
//                   </div>
//                   <p className="text-sm leading-relaxed pt-1">{suggestion}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>

//           {/* Recommended Skills */}
//           <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Target className="w-5 h-5 text-purple-600" />
//                 Recommended Skills to Add
//               </CardTitle>
//               <CardDescription>Skills that would strengthen your profile</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex flex-wrap gap-2">
//                 {result.recommendedSkills.map((skill, index) => (
//                   <Badge
//                     key={index}
//                     className="bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30 px-4 py-2 text-sm"
//                   >
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recommended Courses */}
//           <Card className="border-2 shadow-xl backdrop-blur-sm bg-white/95 dark:bg-slate-900/95">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <BookOpen className="w-5 h-5 text-blue-600" />
//                 Recommended Courses
//               </CardTitle>
//               <CardDescription>Learning resources to boost your skills</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {Object.entries(result.recommendedCourses).map(([title, link], index) => (
//                   <Card
//                     key={index}
//                     className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500/50"
//                   >
//                     <CardContent className="pt-6">
//                       <div className="flex items-start gap-3 mb-3">
//                         <div className="text-2xl">🎓</div>
//                         <div className="flex-1">
//                           <h4 className="font-semibold text-base leading-tight mb-3">
//                             {title}
//                           </h4>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="w-full justify-between group-hover:bg-blue-500/10"
//                             onClick={() => window.open(link, "_blank")}
//                           >
//                             <span>View Course</span>
//                             <ExternalLink className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Overall Assessment */}
//           <Card className="border-2 shadow-xl backdrop-blur-sm bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-2xl">
//                 <Award className="w-6 h-6 text-indigo-600" />
//                 Overall Assessment
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
//                 {result.assessment}
//               </p>
//             </CardContent>
//           </Card>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Button
//               onClick={resetForm}
//               size="lg"
//               variant="outline"
//               className="flex-1"
//             >
//               <RefreshCw className="w-5 h-5 mr-2" />
//               Analyze Another CV
//             </Button>
//             <Button
//               onClick={() => window.location.href = "/analysis"}
//               size="lg"
//               className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
//             >
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               Back to Analysis
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, BookOpen, TrendingUp, Award, Loader } from 'lucide-react';

export default function CVAnalysisDashboard() {
  const [file, setFile] = useState(null);
  const [goals, setGoals] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [trackId, setTrackId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const API_BASE_URL = 'https://personalai.runasp.net';
  
  // Get token from localStorage (stored after login)
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate file
      if (!file) {
        throw new Error('Please select a CV file first');
      }

      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found. Please login first.');
      }

      console.log('Token found:', token.substring(0, 20) + '...');
      console.log('File:', file.name, file.size);

      const formData = new FormData();
      formData.append('file', file);
      
      if (goals) {
        formData.append('goals', goals);
      }
      if (targetRole) {
        formData.append('targetRole', targetRole);
      }
      if (trackId) {
        formData.append('trackId', parseInt(trackId));
      }

      console.log('Sending request to:', `${API_BASE_URL}/api/Career/analyze-cv`);

      const res = await fetch(`${API_BASE_URL}/api/Career/analyze-cv`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Response status:', res.status);
      const responseText = await res.text();
      console.log('Response:', responseText);

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      setResponse(data);
      setFile(null);
      setGoals('');
      setTargetRole('');
      setTrackId('');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(`Failed to analyze CV: ${errorMsg}`);
      console.error('Full error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setError(null);
    setFile(null);
    setGoals('');
    setTargetRole('');
    setTrackId('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">CV Analysis Dashboard</h1>
          <p className="text-gray-600">Upload your CV and we'll provide comprehensive feedback</p>
        </div>

        {!response ? (
          /* Upload Form */
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Upload CV File *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt"
                    required
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-gray-300 rounded-lg p-3"
                  />
                </div>
                {file && <p className="text-sm text-green-600 mt-2">✓ {file.name} selected</p>}
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Career Goals</label>
                <textarea
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="e.g., Become a Senior Full Stack Developer..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="3"
                />
              </div>

              {/* Target Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Full Stack Developer, Lead Developer..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Track ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Track (Optional)</label>
                <select
                  value={trackId}
                  onChange={(e) => setTrackId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
                >
                  <option value="">Select a track...</option>
                  <option value="5">MEARN Stack</option>
                  <option value="4">Front-end Development</option>
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !file}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Analyzing CV...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Analyze CV
                  </>
                )}
              </button>

              {/* Survey Button - Show if no file selected */}
              {!file && (
                <a
                  href="/ProfileSetup"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer text-center block"
                >
                  <BookOpen size={20} />
                  Take Survey Instead
                </a>
              )}
            </div>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            {/* Reset Button */}
            <div className="flex justify-end">
              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
              >
                ← Analyze Another CV
              </button>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">CV Summary</h2>
              <p className="text-gray-700">{response.cvSummary}</p>
            </div>

            {/* Overall Assessment */}
            {response.assessment && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-l-4 border-green-600">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Assessment</h2>
                <p className="text-gray-700">{response.assessment}</p>
              </div>
            )}

            {/* Strengths */}
            {response.strengths && response.strengths.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-600" size={28} />
                  Strengths
                </h2>
                <ul className="space-y-3">
                  {response.strengths.map((strength, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="text-green-600 font-bold text-lg">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Areas to Improve */}
            {response.areasToImprove && response.areasToImprove.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="text-orange-600" size={28} />
                  Areas to Improve
                </h2>
                <ul className="space-y-3">
                  {response.areasToImprove.map((area, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="text-orange-600 font-bold text-lg">⚠</span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Enhancement Suggestions */}
            {response.enhancementSuggestions && response.enhancementSuggestions.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="text-blue-600" size={28} />
                  Enhancement Suggestions
                </h2>
                <ul className="space-y-3">
                  {response.enhancementSuggestions.map((suggestion, i) => (
                    <li key={i} className="flex gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">→</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommended Skills */}
            {response.recommendedSkills && response.recommendedSkills.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="text-purple-600" size={28} />
                  Recommended Skills to Learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {response.recommendedSkills.map((skill, i) => (
                    <div key={i} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <p className="text-gray-700 font-semibold">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skill Gap Report */}
            {response.skillGapReport && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="text-indigo-600" size={28} />
                  Skill Gap Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-indigo-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600 text-sm mb-2">Skills Covered</p>
                    <p className="text-3xl font-bold text-indigo-600">{response.skillGapReport.coveragePercentage}%</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600 text-sm mb-2">Your Skills</p>
                    <p className="text-3xl font-bold text-blue-600">{response.skillGapReport.studentHasSkills}/{response.skillGapReport.totalRequiredSkills}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center">
                    <p className="text-gray-600 text-sm mb-2">Missing Skills</p>
                    <p className="text-3xl font-bold text-orange-600">{response.skillGapReport.totalRequiredSkills - response.skillGapReport.studentHasSkills}</p>
                  </div>
                </div>

                {response.skillGapReport.missingSkills && response.skillGapReport.missingSkills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Missing Skills</h3>
                    <div className="space-y-3">
                      {response.skillGapReport.missingSkills.map((skill, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-gray-900">{skill.skillName}</p>
                              <p className="text-sm text-gray-600">
                                Level: <span className="font-semibold capitalize">{skill.skillLevel}</span>
                              </p>
                            </div>
                            {skill.isRequired && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Required</span>
                            )}
                          </div>
                          {skill.recommendedResources && skill.recommendedResources.length > 0 && (
                            <div className="mt-3 pt-3 border-t">
                              {skill.recommendedResources.map((resource, j) => (
                                <a
                                  key={j}
                                  href={resource.videoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-600 hover:text-indigo-800 text-sm block"
                                >
                                  📚 {resource.title} ({resource.durationMinutes} mins)
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Recommended Courses */}
            {response.recommendedCourses && Object.keys(response.recommendedCourses).length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Courses</h2>
                <div className="space-y-3">
                  {Object.entries(response.recommendedCourses).map(([courseName, courseUrl], i) => (
                    <a
                      key={i}
                      href={courseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-indigo-50 border border-indigo-200 rounded-lg p-4 hover:bg-indigo-100 transition"
                    >
                      <p className="font-semibold text-indigo-900">{courseName}</p>
                      <p className="text-sm text-indigo-700 mt-1">{courseUrl}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}