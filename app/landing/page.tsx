"use client"
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blob {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      .animate-blob {
        animation: blob 7s infinite;
      }
      .animation-delay-2000 {
        animation-delay: 2s;
      }
      .animation-delay-4000 {
        animation-delay: 4s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-gray-50 to-blue-50 text-gray-900">
      {/* Navbar */}
      <nav className="w-full py-4 px-6 flex items-center justify-between shadow-sm bg-white fixed top-0 z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          LIFE ORCHESTRATOR AI
        </h1>
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#partners" className="hover:text-blue-600 transition">Partners</a>
          <a href="#services" className="hover:text-blue-600 transition">Our Services</a>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => (window.location.href = "/login")}>Sign In</Button>
          <Button onClick={() => (window.location.href = "/signup")}>Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-32 px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            🚀 AI-Powered Career Planning
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 max-w-4xl leading-tight">
            Unlock Your Future with 
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> AI‑Powered</span> Guidance
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-10 leading-relaxed">
            Let our Agentic AI analyze your strengths, interests, and study profile to build a personalized learning path—complete with weekly plans and curated resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-10 py-7 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all" onClick={() => (window.location.href = "/signup")}>
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-7 border-2 hover:bg-gray-50 transition-all" onClick={() => (window.location.href = "#services")}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold mb-2">10K+</div>
            <div className="text-blue-100 text-lg">Active Learners</div>
          </div>
          <div className="transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold mb-2">95%</div>
            <div className="text-blue-100 text-lg">Success Rate</div>
          </div>
          <div className="transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold mb-2">50+</div>
            <div className="text-blue-100 text-lg">Career Paths</div>
          </div>
          <div className="transform hover:scale-105 transition-transform">
            <div className="text-5xl font-bold mb-2">1M+</div>
            <div className="text-blue-100 text-lg">Study Hours</div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-20 px-6 bg-white">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            🤝 Trusted Worldwide
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold mb-4">Trusted by Partners & Learners</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of learners partnering with leading educational platforms
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto items-center">
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg" alt="YouTube" className="h-10 w-auto" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-10 w-auto" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-9 w-auto" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/coursera.svg" alt="Coursera" className="h-8 w-auto" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg" alt="Udemy" className="h-8 w-auto" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/linkedin.svg" alt="LinkedIn" className="h-8 w-auto" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
            <img src="https://cdn.jsdelivr.net/npm/simple-icons@v8/icons/amazon.svg" alt="Amazon" className="h-10 w-auto" />
          </div>
          <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Khan Academy" className="h-9 w-auto" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
            ✨ What We Offer
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI-driven solutions to accelerate your learning journey
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Card className="p-8 text-center shadow-xl border-2 border-transparent hover:border-blue-400 hover:shadow-2xl transition-all transform hover:-translate-y-2 bg-white">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
              🎯
            </div>
            <h4 className="text-2xl font-bold mb-4 text-gray-900">AI Career Analysis</h4>
            <p className="text-gray-600 text-lg leading-relaxed">We analyze your interests, profile, and habits to suggest the ideal career path tailored just for you.</p>
          </Card>
          <Card className="p-8 text-center shadow-xl border-2 border-transparent hover:border-purple-400 hover:shadow-2xl transition-all transform hover:-translate-y-2 bg-white">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
              📚
            </div>
            <h4 className="text-2xl font-bold mb-4 text-gray-900">Personalized Study Plan</h4>
            <p className="text-gray-600 text-lg leading-relaxed">Receive a structured weekly plan aligned with your learning style and goals for maximum efficiency.</p>
          </Card>
          <Card className="p-8 text-center shadow-xl border-2 border-transparent hover:border-pink-400 hover:shadow-2xl transition-all transform hover:-translate-y-2 bg-white">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg">
              💎
            </div>
            <h4 className="text-2xl font-bold mb-4 text-gray-900">Recommended Resources</h4>
            <p className="text-gray-600 text-lg leading-relaxed">Get curated free & paid resources tailored to your study roadmap for accelerated learning.</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">LIFE ORCHESTRATOR AI</h4>
            <p className="text-gray-400 leading-relaxed">Empowering your growth through intelligent personalized learning and career guidance.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#partners" className="hover:text-blue-400 transition-colors">Partners</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-gray-300 text-2xl">
              <a href="#" className="hover:text-blue-400 transition-colors transform hover:scale-110">🌐</a>
              <a href="#" className="hover:text-blue-400 transition-colors transform hover:scale-110">📘</a>
              <a href="#" className="hover:text-blue-400 transition-colors transform hover:scale-110">📸</a>
              <a href="#" className="hover:text-blue-400 transition-colors transform hover:scale-110">🐦</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">© 2025 Life Orchestrator AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}