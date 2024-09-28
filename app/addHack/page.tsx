'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

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

export default function AddHackathon() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedHackathons, setSelectedHackathons] = useState<string[]>([])

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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Add Hackathon</h1>
      <Input 
        type="search" 
        placeholder="Search hackathons..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-4">
        {filteredHackathons.map(hackathon => (
          <Card key={hackathon.id}>
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h2 className="text-lg font-semibold">{hackathon.name}</h2>
                <p className="text-sm text-gray-500">{hackathon.date} - {hackathon.location}</p>
              </div>
              <Button
                variant={selectedHackathons.includes(hackathon.id) ? "default" : "outline"}
                onClick={() => toggleHackathonSelection(hackathon.id)}
              >
                {selectedHackathons.includes(hackathon.id) ? 'Added' : '+ Add'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button className="mt-4 w-full">Add Selected to FYP</Button>
    </div>
  )
}