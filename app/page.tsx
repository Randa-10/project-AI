import LandingPage from "./landing/page"
import LoginPage from "./login/page"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* <LoginPage /> */}
      <LandingPage/>
      
    </main>
  )
}
