"use client"

// import React, { useState } from 'react';
// import { Upload, CheckCircle, AlertCircle, BookOpen, TrendingUp, Award, Loader } from 'lucide-react';

// export default function CVAnalysisDashboard() {
//   const [file, setFile] = useState(null);
//   const [goals, setGoals] = useState('');
//   const [targetRole, setTargetRole] = useState('');
//   const [trackId, setTrackId] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [isClient, setIsClient] = useState(false);

//   const API_BASE_URL = 'https://personalai.runasp.net';
  
//   // Get token from localStorage (stored after login)
//   const getAuthToken = () => {
//     if (typeof window !== 'undefined') {
//       return localStorage.getItem('authToken');
//     }
//     return null;
//   };

//   React.useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       // Validate file
//       if (!file) {
//         throw new Error('Please select a CV file first');
//       }

//       const token = getAuthToken();
      
//       if (!token) {
//         throw new Error('No authentication token found. Please login first.');
//       }

//       console.log('Token found:', token.substring(0, 20) + '...');
//       console.log('File:', file.name, file.size);

//       const formData = new FormData();
//       formData.append('file', file);
      
//       if (goals) {
//         formData.append('goals', goals);
//       }
//       if (targetRole) {
//         formData.append('targetRole', targetRole);
//       }
//       if (trackId) {
//         formData.append('trackId', parseInt(trackId));
//       }

//       console.log('Sending request to:', `${API_BASE_URL}/api/Career/analyze-cv`);

//       const res = await fetch(`${API_BASE_URL}/api/Career/analyze-cv`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       console.log('Response status:', res.status);
//       const responseText = await res.text();
//       console.log('Response:', responseText);

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.status} - ${responseText}`);
//       }

//       const data = JSON.parse(responseText);
//       setResponse(data);
//       setFile(null);
//       setGoals('');
//       setTargetRole('');
//       setTrackId('');
//     } catch (err) {
//       const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
//       setError(`Failed to analyze CV: ${errorMsg}`);
//       console.error('Full error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     setResponse(null);
//     setError(null);
//     setFile(null);
//     setGoals('');
//     setTargetRole('');
//     setTrackId('');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">CV Analysis Dashboard</h1>
//           <p className="text-gray-600">Upload your CV and we'll provide comprehensive feedback</p>
//         </div>

//         {!response ? (
//           /* Upload Form */
//           <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
//             <div className="space-y-6">
//               {/* File Upload */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-3">
//                   Upload CV File *
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="file"
//                     onChange={handleFileChange}
//                     accept=".pdf,.doc,.docx,.txt"
//                     required
//                     className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-gray-300 rounded-lg p-3"
//                   />
//                 </div>
//                 {file && <p className="text-sm text-green-600 mt-2">✓ {file.name} selected</p>}
//               </div>

//               {/* Goals */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Career Goals</label>
//                 <textarea
//                   value={goals}
//                   onChange={(e) => setGoals(e.target.value)}
//                   placeholder="e.g., Become a Senior Full Stack Developer..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   rows="3"
//                 />
//               </div>

//               {/* Target Role */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Target Role</label>
//                 <input
//                   type="text"
//                   value={targetRole}
//                   onChange={(e) => setTargetRole(e.target.value)}
//                   placeholder="e.g., Full Stack Developer, Lead Developer..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               {/* Track ID */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-2">Track (Optional)</label>
//                 <select
//                   value={trackId}
//                   onChange={(e) => setTrackId(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
//                 >
//                   <option value="">Select a track...</option>
//                   <option value="5">MEARN Stack</option>
//                   <option value="4">Front-end Development</option>
//                 </select>
//               </div>

//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
//                   {error}
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading || !file}
//                 className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
//               >
//                 {loading ? (
//                   <>
//                     <Loader size={20} className="animate-spin" />
//                     Analyzing CV...
//                   </>
//                 ) : (
//                   <>
//                     <Upload size={20} />
//                     Analyze CV
//                   </>
//                 )}
//               </button>

//               {/* Survey Button - Show if no file selected */}
//               {!file && (
//                 <a
//                   href="/ProfileSetup"
//                   className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer text-center block"
//                 >
//                   <BookOpen size={20} />
//                   Take Survey Instead
//                 </a>
//               )}
//             </div>
//           </div>
//         ) : (
//           /* Analysis Results */
//           <div className="space-y-6">
//             {/* Reset Button */}
//             <div className="flex justify-end">
//               <button
//                 onClick={handleReset}
//                 className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
//               >
//                 ← Analyze Another CV
//               </button>
//             </div>

//             {/* Summary */}
//             <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-600">
//               <h2 className="text-2xl font-bold text-gray-900 mb-3">CV Summary</h2>
//               <p className="text-gray-700">{response.cvSummary}</p>
//             </div>

//             {/* Overall Assessment */}
//             {response.assessment && (
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-l-4 border-green-600">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-3">Assessment</h2>
//                 <p className="text-gray-700">{response.assessment}</p>
//               </div>
//             )}

//             {/* Strengths */}
//             {response.strengths && response.strengths.length > 0 && (
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <CheckCircle className="text-green-600" size={28} />
//                   Strengths
//                 </h2>
//                 <ul className="space-y-3">
//                   {response.strengths.map((strength, i) => (
//                     <li key={i} className="flex gap-3 text-gray-700">
//                       <span className="text-green-600 font-bold text-lg">✓</span>
//                       <span>{strength}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Areas to Improve */}
//             {response.areasToImprove && response.areasToImprove.length > 0 && (
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <AlertCircle className="text-orange-600" size={28} />
//                   Areas to Improve
//                 </h2>
//                 <ul className="space-y-3">
//                   {response.areasToImprove.map((area, i) => (
//                     <li key={i} className="flex gap-3 text-gray-700">
//                       <span className="text-orange-600 font-bold text-lg">⚠</span>
//                       <span>{area}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Enhancement Suggestions */}
//             {response.enhancementSuggestions && response.enhancementSuggestions.length > 0 && (
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <TrendingUp className="text-blue-600" size={28} />
//                   Enhancement Suggestions
//                 </h2>
//                 <ul className="space-y-3">
//                   {response.enhancementSuggestions.map((suggestion, i) => (
//                     <li key={i} className="flex gap-3 text-gray-700">
//                       <span className="text-blue-600 font-bold">→</span>
//                       <span>{suggestion}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* Recommended Skills */}
//             {response.recommendedSkills && response.recommendedSkills.length > 0 && (
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <Award className="text-purple-600" size={28} />
//                   Recommended Skills to Learn
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {response.recommendedSkills.map((skill, i) => (
//                     <div key={i} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
//                       <p className="text-gray-700 font-semibold">{skill}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Skill Gap Report */}
//             {response.skillGapReport && (
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <BookOpen className="text-indigo-600" size={28} />
//                   Skill Gap Analysis
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                   <div className="bg-indigo-50 rounded-lg p-4 text-center">
//                     <p className="text-gray-600 text-sm mb-2">Skills Covered</p>
//                     <p className="text-3xl font-bold text-indigo-600">{response.skillGapReport.coveragePercentage}%</p>
//                   </div>
//                   <div className="bg-blue-50 rounded-lg p-4 text-center">
//                     <p className="text-gray-600 text-sm mb-2">Your Skills</p>
//                     <p className="text-3xl font-bold text-blue-600">{response.skillGapReport.studentHasSkills}/{response.skillGapReport.totalRequiredSkills}</p>
//                   </div>
//                   <div className="bg-orange-50 rounded-lg p-4 text-center">
//                     <p className="text-gray-600 text-sm mb-2">Missing Skills</p>
//                     <p className="text-3xl font-bold text-orange-600">{response.skillGapReport.totalRequiredSkills - response.skillGapReport.studentHasSkills}</p>
//                   </div>
//                 </div>

//                 {response.skillGapReport.missingSkills && response.skillGapReport.missingSkills.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-3">Missing Skills</h3>
//                     <div className="space-y-3">
//                       {response.skillGapReport.missingSkills.map((skill, i) => (
//                         <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                           <div className="flex justify-between items-start">
//                             <div>
//                               <p className="font-semibold text-gray-900">{skill.skillName}</p>
//                               <p className="text-sm text-gray-600">
//                                 Level: <span className="font-semibold capitalize">{skill.skillLevel}</span>
//                               </p>
//                             </div>
//                             {skill.isRequired && (
//                               <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Required</span>
//                             )}
//                           </div>
//                           {skill.recommendedResources && skill.recommendedResources.length > 0 && (
//                             <div className="mt-3 pt-3 border-t">
//                               {skill.recommendedResources.map((resource, j) => (
//                                 <a
//                                   key={j}
//                                   href={resource.videoUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-indigo-600 hover:text-indigo-800 text-sm block"
//                                 >
//                                   📚 {resource.title} ({resource.durationMinutes} mins)
//                                 </a>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Recommended Courses */}
//             {response.recommendedCourses && Object.keys(response.recommendedCourses).length > 0 && (
//               <div className="bg-white rounded-lg shadow-lg p-6">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Courses</h2>
//                 <div className="space-y-3">
//                   {Object.entries(response.recommendedCourses).map(([courseName, courseUrl], i) => (
//                     <a
//                       key={i}
//                       href={courseUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block bg-indigo-50 border border-indigo-200 rounded-lg p-4 hover:bg-indigo-100 transition"
//                     >
//                       <p className="font-semibold text-indigo-900">{courseName}</p>
//                       <p className="text-sm text-indigo-700 mt-1">{courseUrl}</p>
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, BookOpen, TrendingUp, Award, Loader, ArrowRight } from 'lucide-react';

export default function CVAnalysisDashboard() {
  const [mode, setMode] = useState(null); // 'cv' or 'survey'
  const [file, setFile] = useState(null);
  const [goals, setGoals] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [trackId, setTrackId] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'https://personalai.runasp.net';
  
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
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
    setMode(null);
  };

  const handleSurveyClick = () => {
    window.location.href = '/ProfileSetup';
  };

  // LAYER 1: Choose between CV or Survey
  if (!mode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Career Analysis Dashboard</h1>
            <p className="text-xl text-gray-600">Choose how you want to proceed with your career analysis</p>
          </div>

          {/* Choice Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* CV Analysis Card */}
            <div
              onClick={() => setMode('cv')}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-indigo-600"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
                  <Upload className="text-white" size={32} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Upload Your CV</h2>
              <p className="text-gray-600 text-center mb-6">
                Already have a CV? Upload it and we'll provide detailed analysis and recommendations for your career growth.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>Instant feedback on your CV</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>Skill gap analysis</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>Recommended resources</span>
                </div>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                Continue with CV
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Survey Card */}
            <div
              onClick={handleSurveyClick}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-purple-600"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <BookOpen className="text-white" size={32} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Take a Survey</h2>
              <p className="text-gray-600 text-center mb-6">
                Don't have a CV yet? Answer some quick questions about yourself and we'll suggest the perfect career path for you.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>Personalized career recommendations</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>Learning path tailored to you</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={20} className="text-green-600" />
                  <span>10 quick questions</span>
                </div>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2">
                Start Survey
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LAYER 2: CV Upload Form
  if (mode === 'cv') {
    if (response) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-6">
              {/* Reset Button */}
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">CV Analysis Results</h1>
                <button
                  onClick={handleReset}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
                >
                  ← Back to Choose
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
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleReset}
              className="mb-4 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
            >
              ← Back
            </button>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Upload Your CV</h1>
            <p className="text-gray-600">Submit your CV for comprehensive career analysis and feedback</p>
          </div>

          {/* Upload Form */}
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
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-gray-300 rounded-lg p-3"
                  />
                </div>
                {file && <p className="text-sm text-green-600 mt-2">✓ {file.name} selected</p>}
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Career Goals (Optional)</label>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Target Role (Optional)</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Full Stack Developer, Lead Developer..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Track */}
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}