"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({
    userName: "",
    email: "",
    password: "",
  })

  const validateForm = () => {
    const errors = {
      userName: "",
      email: "",
      password: "",
    }
    let isValid = true

    // Username validation
    if (name.length < 3) {
      errors.userName = "Username must be at least 3 characters"
      isValid = false
    } else if (name.length > 50) {
      errors.userName = "Username must be less than 50 characters"
      isValid = false
    } else if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      errors.userName = "Username can only contain letters, numbers, and underscores"
      isValid = false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    // Password validation
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
      isValid = false
    } else if (!/(?=.*[a-z])/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter"
      isValid = false
    } else if (!/(?=.*[A-Z])/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter"
      isValid = false
    } else if (!/(?=.*\d)/.test(password)) {
      errors.password = "Password must contain at least one number"
      isValid = false
    }

    setFieldErrors(errors)
    return isValid
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setFieldErrors({ userName: "", email: "", password: "" })

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("http://shahimoamen-001-site1.mtempurl.com/api/Authentication/register", {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          email: email,
          password: password,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))

        // Handle specific field errors from API
        if (errorData.errors) {
          const newFieldErrors = { userName: "", email: "", password: "" }

          if (errorData.errors.UserName || errorData.errors.userName) {
            newFieldErrors.userName =
              errorData.errors.UserName?.[0] || errorData.errors.userName?.[0] || "Username is invalid"
          }
          if (errorData.errors.Email || errorData.errors.email) {
            newFieldErrors.email = errorData.errors.Email?.[0] || errorData.errors.email?.[0] || "Email is invalid"
          }
          if (errorData.errors.Password || errorData.errors.password) {
            newFieldErrors.password =
              errorData.errors.Password?.[0] || errorData.errors.password?.[0] || "Password is invalid"
          }

          setFieldErrors(newFieldErrors)
        }

        // Handle general error messages
        if (errorData.message) {
          // Check for common uniqueness errors
          const message = errorData.message.toLowerCase()
          if (message.includes("username") && message.includes("already")) {
            setFieldErrors((prev) => ({ ...prev, userName: "This username is already taken" }))
          } else if (message.includes("email") && message.includes("already")) {
            setFieldErrors((prev) => ({ ...prev, email: "This email is already registered" }))
          } else {
            setError(errorData.message)
          }
        } else {
          setError("Registration failed. Please try again.")
        }

        setIsLoading(false)
        return
      }

      const data = await response.json()

      // Store authentication data
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", name)

      // If the API returns a token, store it
      if (data.token) {
        localStorage.setItem("authToken", data.token)
      }

      router.push("/")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration")
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = () => {
    setIsLoading(true)
    // Simulate Google signup
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", "user@gmail.com")
      localStorage.setItem("userName", "Google User")
      router.push("/")
    }, 1000)
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
          <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
          <CardDescription>Start your personalized learning journey today</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Username</Label>
              <Input
                id="name"
                type="text"
                placeholder="johndoe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={fieldErrors.userName ? "border-red-500" : ""}
              />
              {fieldErrors.userName && <p className="text-xs text-red-600">{fieldErrors.userName}</p>}
              <p className="text-xs text-muted-foreground">
                At least 3 characters, letters, numbers, and underscores only
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={fieldErrors.email ? "border-red-500" : ""}
              />
              {fieldErrors.email && <p className="text-xs text-red-600">{fieldErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={fieldErrors.password ? "border-red-500" : ""}
              />
              {fieldErrors.password && <p className="text-xs text-red-600">{fieldErrors.password}</p>}
              <p className="text-xs text-muted-foreground">
                At least 8 characters with uppercase, lowercase, and number
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
