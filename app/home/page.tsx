'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Check, Zap, Code, Headphones, Gamepad } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {useUserData} from '../UserDataContext'

interface Profile {
  id: string
  name: string
  wins: number
  bio: string
  image: string
  techInterests: string[]
  nonTechInterests: string[]
  color: string
}

const mockProfiles: Profile[] = [
  { 
    id: '1', 
    name: 'Alice', 
    wins: 3, 
    bio: 'AI enthusiast and coffee lover', 
    image: '/placeholder.svg?height=400&width=400', 
    techInterests: ['AI', 'Machine Learning', 'Python'],
    nonTechInterests: ['Coffee', 'Hiking', 'Photography'],
    color: 'bg-purple-500'
  },
  { 
    id: '2', 
    name: 'Bob', 
    wins: 2, 
    bio: 'VR developer with a passion for gaming', 
    image: '/placeholder.svg?height=400&width=400', 
    techInterests: ['VR', 'Unity', 'C#'],
    nonTechInterests: ['Gaming', 'Sci-Fi Movies', 'Board Games'],
    color: 'bg-green-500'
  },
  { 
    id: '3', 
    name: 'Charlie', 
    wins: 1, 
    bio: 'Blockchain expert and music producer', 
    image: '/placeholder.svg?height=400&width=400', 
    techInterests: ['Blockchain', 'Solidity', 'Web3'],
    nonTechInterests: ['Music Production', 'DJing', 'Traveling'],
    color: 'bg-blue-500'
  },
]



export default function SwipeScreen() {
  const {userData} = useUserData()
  const [currentProfile, setCurrentProfile] = useState(0)

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      console.log('Added to team:', mockProfiles[currentProfile].name)
    }
    setCurrentProfile((prev) => (prev + 1) % mockProfiles.length)
  }

  const profile = mockProfiles[currentProfile]

  const ProfileContent = ({ profile }: { profile: Profile }) => (
    <>
      <div className={`h-48 ${profile.color}`} />
      <CardContent className="flex flex-col items-center p-6 -mt-24 relative">
        <Avatar className="w-32 h-32 border-4 border-white mb-4">
          <AvatarImage src={profile.image} alt={profile.name} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
        <div className="flex items-center mb-2">
          <Zap className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="text-sm font-semibold">{profile.wins} Wins</span>
        </div>
        <p className="text-center mb-4">{profile.bio}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {profile.techInterests.map((interest, index) => (
            <Badge key={index} variant="secondary">
              <Code className="w-3 h-3 mr-1" />
              {interest}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {profile.nonTechInterests.map((interest, index) => (
            <Badge key={index} variant="outline">
              {index === 0 && <Headphones className="w-3 h-3 mr-1" />}
              {index === 1 && <Gamepad className="w-3 h-3 mr-1" />}
              {index === 2 && <ChevronRight className="w-3 h-3 mr-1" />}
              {interest}
            </Badge>
          ))}
        </div>
        {/* <Button onClick={() => console.log(userData)}>userData</Button> */}
      </CardContent>
    </>
  )

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Dialog>
        <DialogTrigger asChild>
          <Card className="w-full max-w-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <ProfileContent profile={profile} />
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <ProfileContent profile={profile} />
        </DialogContent>
      </Dialog>
      <div className="flex justify-between w-full max-w-md mt-4">
        <Button variant="destructive" size="icon" onClick={() => handleSwipe('left')}>
          <X className="h-4 w-4" />
        </Button>
        <Button variant="default" size="icon" onClick={() => handleSwipe('right')}>
          <Check className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex justify-between w-full max-w-md">
        <Button variant="outline" size="sm">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous Hackathon
        </Button>
        <Button variant="outline" size="sm">
          Next Hackathon <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}