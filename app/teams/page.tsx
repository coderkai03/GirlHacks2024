'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Music, Zap, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TeamMember {
  id: string
  name: string
  image: string
}

interface Team {
  id: string
  name: string
  hackathon: string
  members: TeamMember[]
  description: string
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Team Alpha',
    hackathon: 'HackTech 2023',
    members: [
      { id: '1', name: 'Alice', image: '/placeholder.svg?height=50&width=50' },
      { id: '2', name: 'Bob', image: '/placeholder.svg?height=50&width=50' },
    ],
    description: "We're building an AI-powered virtual assistant for developers.",
  },
  {
    id: '2',
    name: 'Team Beta',
    hackathon: 'CryptoHack 2023',
    members: [
      { id: '3', name: 'Charlie', image: '/placeholder.svg?height=50&width=50' },
      { id: '4', name: 'David', image: '/placeholder.svg?height=50&width=50' },
    ],
    description: 'Our project focuses on creating a decentralized marketplace for digital art.',
  },
]

const discoColors = [
  'bg-purple-600',
  'bg-indigo-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-yellow-500',
  'bg-orange-500',
  'bg-red-600',
]

export default function DiscoTeams() {
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null)
  const [selectedHackathon, setSelectedHackathon] = useState<string | null>(null)
  const [currentColorIndex, setCurrentColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % discoColors.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleTeamExpansion = (teamId: string) => {
    setExpandedTeam(expandedTeam === teamId ? null : teamId)
  }

  const filteredTeams = selectedHackathon
    ? mockTeams.filter(team => team.hackathon === selectedHackathon)
    : mockTeams

  const getRandomIcon = () => {
    const icons = [Music, Zap, Star]
    const RandomIcon = icons[Math.floor(Math.random() * icons.length)]
    return <RandomIcon className="w-6 h-6 animate-spin text-white" />
  }

  return (
    <div className={`min-h-screen p-4 `}>
      <h1 className="text-3xl font-bold mb-4 text-white text-center animate-pulse">Disco Teams</h1>
      <Select onValueChange={(value) => setSelectedHackathon(value)}>
        <SelectTrigger className="w-full mb-4 bg-white/20 text-white border-white/30">
          <SelectValue placeholder="Filter by Hackathon" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Hackathons</SelectItem>
          <SelectItem value="HackTech 2023">HackTech 2023</SelectItem>
          <SelectItem value="CryptoHack 2023">CryptoHack 2023</SelectItem>
        </SelectContent>
      </Select>
      {filteredTeams.map((team) => (
        <Card key={team.id} className="mb-4 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white flex items-center">
                {getRandomIcon()}
                <span className="ml-2">{team.name}</span>
              </h2>
              <Button variant="ghost" size="sm" onClick={() => toggleTeamExpansion(team.id)} className="text-white hover:bg-white/20">
                {expandedTeam === team.id ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
            <p className="text-sm text-white/70 mb-2">{team.hackathon}</p>
            <div className="flex mb-2">
              {team.members.map((member) => (
                <Avatar key={member.id} className="w-8 h-8 -ml-2 first:ml-0 border-2 border-white/30">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {expandedTeam === team.id && (
              <div className="mt-2 text-white">
                <p>{team.description}</p>
                <Button className="mt-2 bg-white/20 text-white hover:bg-white/30 transition-colors duration-300">
                  Join Discord
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}