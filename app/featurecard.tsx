"use client"

import { useState, useEffect } from 'react'
import { Music, Headphones, Users, Code, Zap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Login from "./login"

export default function LandingPage() {
  const [bgColor, setBgColor] = useState('bg-purple-600')

  useEffect(() => {
    const colors = ['bg-purple-600', 'bg-pink-600', 'bg-blue-600', 'bg-green-600']
    let colorIndex = 0

    const intervalId = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length
      setBgColor(colors[colorIndex])
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-1000 flex flex-col items-center justify-center p-8 text-white`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Music className="absolute text-white opacity-10 animate-pulse" style={{ top: '10%', left: '5%', width: '100px', height: '100px' }} />
        <Headphones className="absolute text-white opacity-10 animate-pulse" style={{ top: '30%', right: '10%', width: '120px', height: '120px' }} />
        <Users className="absolute text-white opacity-10 animate-pulse" style={{ bottom: '15%', left: '15%', width: '80px', height: '80px' }} />
        <Code className="absolute text-white opacity-10 animate-pulse" style={{ bottom: '25%', right: '20%', width: '90px', height: '90px' }} />
      </div>

      <h1 className="text-6xl font-bold mb-8 text-center animate-pulse">
        DiscoMatch 🎶
      </h1>

      <div className="max-w-3xl text-center mb-12">
        <p className="text-2xl mb-6">
          Get ready to boogie down with the hottest hackathon team-up app on the dance floor!
        </p>
        <p className="text-xl mb-6">
          DiscoMatch is where tech-savvy groove masters come together to form the ultimate coding crews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<Users className="h-12 w-12 mb-4" />}
          title="Find Your Crew"
          description="Swipe right on potential teammates and form your dream hackathon squad."
        />
        <FeatureCard
          icon={<Zap className="h-12 w-12 mb-4" />}
          title="Hack in Harmony"
          description="Discover projects that match your skills and interests."
        />
        <FeatureCard
          icon={<Code className="h-12 w-12 mb-4" />}
          title="Code & Groove"
          description="Collaborate on cutting-edge projects while keeping the disco spirit alive."
        />
      </div>

      <div className="text-center">
        <p className="text-2xl mb-6">Ready to join the DiscoMatch revolution?</p>
        <Button className="text-xl py-6 px-12 rounded-full bg-black text-purple-600 hover:bg-purple-100 transition-colors duration-300">
          {Login()}
        </Button>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: {icon: any, title: string, description: string}) {
  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center backdrop-blur-sm">
      {icon}
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}