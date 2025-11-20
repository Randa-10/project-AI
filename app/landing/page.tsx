"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
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
          <Button onClick={() => (window.location.href = "/pricing")}>Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-32 px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 max-w-3xl">
          Unlock Your Future with AI‑Powered Career & Study Guidance
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
          Let our Agentic AI analyze your strengths, interests, and study profile to build a personalized learning path—complete with weekly plans and curated resources.
        </p>
        <Button size="lg" className="text-lg px-8 py-6" onClick={() => (window.location.href = "/signup")}>
          Get Started
        </Button>
      </section>

      {/* Partners */}
      {/* <section id="partners" className="py-20 px-6">
        <h3 className="text-center text-3xl font-bold mb-10">Trusted by Partners & Learners Worldwide</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center opacity-70">
          <img src="/partner1.png" alt="Partner 1" className="h-12" />
          <img src="/partner2.png" alt="Partner 2" className="h-12" />
          <img src="/partner3.png" alt="Partner 3" className="h-12" />
          <img src="/partner4.png" alt="Partner 4" className="h-12" />
        </div>
      </section> */}

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-white">
        <h3 className="text-center text-3xl font-bold mb-12">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 text-center shadow-lg border hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3">AI Career Analysis</h4>
            <p className="text-gray-600">We analyze your interests, profile, and habits to suggest the ideal career path.</p>
          </Card>
          <Card className="p-6 text-center shadow-lg border hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3">Personalized Study Plan</h4>
            <p className="text-gray-600">Receive a structured weekly plan aligned with your learning style and goals.</p>
          </Card>
          <Card className="p-6 text-center shadow-lg border hover:shadow-xl transition">
            <h4 className="text-xl font-semibold mb-3">Recommended Resources</h4>
            <p className="text-gray-600">Get curated free & paid resources tailored to your study roadmap.</p>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-xl font-semibold mb-3">LIFE ORCHESTRATOR AI</h4>
            <p className="text-gray-400">Empowering your growth through intelligent personalized learning.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#partners" className="hover:text-white">Partners</a></li>
              <li><a href="#services" className="hover:text-white">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4 text-gray-300 text-xl">
              <a href="#" className="hover:text-white">🌐</a>
              <a href="#" className="hover:text-white">📘</a>
              <a href="#" className="hover:text-white">📸</a>
              <a href="#" className="hover:text-white">🐦</a>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-10">© 2025 Life Orchestrator AI. All rights reserved.</p>
      </footer>
    </div>
  );
}