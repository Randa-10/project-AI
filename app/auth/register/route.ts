import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Forward the request to the external API
    const response = await fetch("http://shahimoamen-001-site1.mtempurl.com/api/Authentication/register", {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: body.userName,
        email: body.email,
        password: body.password,
      }),
    })

    const data = await response.json().catch(() => ({}))

    // Return the response from the external API
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("[v0] Registration API error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}
