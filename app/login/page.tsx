// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import { useRouter } from "next/navigation"

// export default function LoginPage() {
//   const router = useRouter()
//   const [userName, setUserName] = useState("")
//   const [password, setPassword] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleLogin = async (e: React.MouseEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     try {
//       const response = await fetch("https://personalai.runasp.net/api/Authentication/login", {
//         method: "POST",
//         headers: {
//           accept: "/",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName,
//           password,
//         }),
//       })

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}))
//         throw new Error(errorData.message || "Invalid username or password")
//       }

//       const data = await response.json()

//       // Store authentication data from API response
//       if (data.token) {
//         localStorage.setItem("authToken", data.token)
//       }
//       if (data.userName) {
//         localStorage.setItem("userName", data.userName)
//       }
//       if (data.email) {
//         localStorage.setItem("userEmail", data.email)
//       }
//       localStorage.setItem("isAuthenticated", "true")

//       // Redirect to home page
//       router.push("/ProfileSetup")
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Login failed. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleGoogleLogin = () => {
//     setIsLoading(true)
//     // Simulate Google login
//     setTimeout(() => {
//       localStorage.setItem("isAuthenticated", "true")
//       localStorage.setItem("userEmail", "user@gmail.com")
//       router.push("/")
//     }, 1000)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1 text-center">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//               </svg>
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
//           <CardDescription>Sign in to continue your learning journey</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* <Button
//             type="button"
//             variant="outline"
//             className="w-full bg-transparent"
//             onClick={handleGoogleLogin}
//             disabled={isLoading}
//           >
//             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Continue with Google
//           </Button> */}
// {/* 
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <span className="w-full border-t" />
//             </div>
//             <div className="relative flex justify-center text-xs uppercase">
//               <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
//             </div>
//           </div> */}

//           <div className="space-y-4">
//             {error && (
//               <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
//                 {error}
//               </div>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="userName">Username</Label>
//               <Input
//                 id="userName"
//                 type="text"
//                 placeholder="Enter your username"
//                 value={userName}
//                 onChange={(e) => setUserName(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleLogin(e as any)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleLogin(e as any)}
//                 required
//               />
//             </div>
//             <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
//               {isLoading ? "Signing in..." : "Sign In"}
//             </Button>
//           </div>

//           <div className="text-center text-sm">
//             <span className="text-muted-foreground">Don't have an account? </span>
//             <Link href="/signup" className="text-primary hover:underline font-medium">
//               Sign up
//             </Link>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Function to decode JWT and extract userId
  const extractUserIdFromToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      
      const payload = JSON.parse(jsonPayload)
      // The "sub" claim contains the user ID
      return payload.sub || payload.userId || payload.id
    } catch (error) {
      console.error("Failed to decode token:", error)
      return null
    }
  }

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("https://personalai.runasp.net/api/Authentication/login", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Invalid username or password")
      }

      const data = await response.json()

      // Store authentication data from API response
      if (data.token) {
        localStorage.setItem("authToken", data.token)
        
        // Extract and store userId from token
        const userId = extractUserIdFromToken(data.token)
        if (userId) {
          localStorage.setItem("userId", userId)
          console.log("Stored userId:", userId)
        }
      }
      if (data.userName) {
        localStorage.setItem("userName", data.userName)
      }
      if (data.email) {
        localStorage.setItem("userEmail", data.email)
      }
      localStorage.setItem("isAuthenticated", "true")

      // Redirect to profile setup or home page
      router.push("/ProfileSetup")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue your learning journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                type="text"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin(e as any)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin(e as any)}
                required
              />
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}