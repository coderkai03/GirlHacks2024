'use client'

'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Music, Zap } from 'lucide-react'

interface Hackathon {
  id: string
  name: string
  date: string
  location: string
}

const mockHackathons: Hackathon[] = [
  { id: '1', name: 'HackTech 2023', date: '2023-09-15', location: 'San Francisco, CA' },
  { id: '2', name: 'CryptoHack 2023', date: '2023-10-20', location: 'New York, NY' },
  { id: '3', name: 'AIHacks 2023', date: '2023-11-05', location: 'Boston, MA' },
]

const colorOptions = [
  { name: 'Fuchsia', value: 'bg-fuchsia-500' },
  { name: 'Cyan', value: 'bg-cyan-400' },
  { name: 'Yellow', value: 'bg-yellow-400' },
  { name: 'Blue Disco', value: 'bg-[#1F75FE]' },
  { name: 'Purple', value: 'bg-purple-600' },
]

export default function DiscoHackathon() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHackathons, setSelectedHackathons] = useState<string[]>([])
  const [currentColorIndex, setCurrentColorIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colorOptions.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const filteredHackathons = mockHackathons.filter(hackathon => 
    hackathon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleHackathonSelection = (hackathonId: string) => {
    setSelectedHackathons(prev => 
      prev.includes(hackathonId) 
        ? prev.filter(id => id !== hackathonId)
        : [...prev, hackathonId]
    )
  }

  const getRandomIcon = () => {
    const icons = [Sparkles, Music, Zap]
    const RandomIcon = icons[Math.floor(Math.random() * icons.length)]
    return <RandomIcon className="w-6 h-6 animate-spin" />
  }

  return (
    <div className={`min-h-screen p-4 `}>
      <h1 className="text-3xl font-bold mb-4 text-white text-center animate-pulse">Disco Hackathon</h1>
      <Input 
        type="search" 
        placeholder="Search hackathons..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-4">
        {filteredHackathons.map(hackathon => (
          <Card key={hackathon.id} className="backdrop-blur-md bg-white/30">
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex items-center">
                {getRandomIcon()}
                <div className="ml-3">
                  <h2 className="text-lg font-semibold text-white">{hackathon.name}</h2>
                  <p className="text-sm text-white/70">{hackathon.date} - {hackathon.location}</p>
                </div>
              </div>
              <Button
                variant={selectedHackathons.includes(hackathon.id) ? "default" : "secondary"}
                onClick={() => toggleHackathonSelection(hackathon.id)}
                className="animate-bounce"
              >
                {selectedHackathons.includes(hackathon.id) ? 'Added' : '+ Add'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-4 w-full bg-white text-black hover:bg-black hover:text-white transition-colors duration-300">
        Add Selected to FYP
      </Button>
    </div>
  )
}