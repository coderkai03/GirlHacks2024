'use client'

import { Key, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Code, Headphones, Gamepad, Zap, Music, Disc, ChevronRight, Star, Sparkles, Trophy } from 'lucide-react'
import { UserData } from '@/app/UserDataContext'

export default function ProfilePreview({ userData, glowColor }: { userData: UserData, glowColor: string }) {
    return (
        <div className="mt-8 bg-black rounded-lg shadow-2xl p-6 border-2 border-white" style={{ boxShadow: `0 0 20px 5px ${glowColor}` }}>
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">Profile Preview</h2>
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={userData.picture || "/placeholder.svg?height=96&width=96"} alt="Profile picture" />
            <AvatarFallback>{userData.nickname ? userData.nickname.substring(0, 2).toUpperCase() : 'DD'}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold text-white">{userData.name || 'Disco Dan'}</h3>
          <div className="flex items-center mt-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-300 mr-1 animate-bounce" />
            <span className="text-sm font-semibold text-yellow-300">{userData.wins ? `${userData.wins} Wins` : '3 Wins'}</span>
          </div>
          <p className="text-center text-gray-300 mb-4">{userData.bio || 'AI enthusiast and disco dancer extraordinaire'}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {userData.technologies.split(',').map((interest: string, index: Key | null | undefined) => (
              <Badge key={index} variant="outline" className="border-pink-500 text-pink-500">
                {index === 0 && <Music className="w-3 h-3 mr-1 animate-spin" style={{ animationDuration: '3s' }} />}
                {index === 1 && <Headphones className="w-3 h-3 mr-1 animate-pulse" />}
                {index === 2 && <Gamepad className="w-3 h-3 mr-1 animate-spin" style={{ animationDuration: '4s' }} />}
                {interest.trim()}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {userData.techInterests.split(',').map((interest: string, index: Key | null | undefined) => (
              <Badge key={index} variant="secondary" className="bg-purple-600 text-white">
                <Code className="w-3 h-3 mr-1 animate-pulse" />
                {interest.trim()}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {userData.nonTechInterests.split(',').map((interest: string, index: Key | null | undefined) => (
              <Badge key={index} variant="outline" className="border-pink-500 text-pink-500">
                {index === 0 && <Music className="w-3 h-3 mr-1 animate-spin" style={{ animationDuration: '3s' }} />}
                {index === 1 && <Headphones className="w-3 h-3 mr-1 animate-pulse" />}
                {index === 2 && <Gamepad className="w-3 h-3 mr-1 animate-spin" style={{ animationDuration: '4s' }} />}
                {interest.trim()}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    )
}