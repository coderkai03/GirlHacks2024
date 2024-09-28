'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Code, Headphones, Gamepad, Zap, Music, Disc, ChevronRight, Star, Sparkles, Trophy } from 'lucide-react'

export default function DiscoProfileScreen() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setEmail(user.email || '')
      setEmailVerified(user.email_verified || false)
      setName(user.name || '')
      setNickname(user.nickname || '')
      setPicture(user.picture || '')
      setSub(user.sub || '')
      setUpdatedAt(user.updated_at || '')
      setOrgId(user.org_id || '')
    }
  }, [user])
  
  // User profile states
  const [email, setEmail] = useState(user?.email || '')
  const [emailVerified, setEmailVerified] = useState(user?.email_verified || false)
  const [name, setName] = useState(user?.name || '')
  const [nickname, setNickname] = useState(user?.nickname || '')
  const [picture, setPicture] = useState(user?.picture || '')
  const [sub, setSub] = useState(user?.sub || '')
  const [updatedAt, setUpdatedAt] = useState(user?.updated_at || '')
  const [orgId, setOrgId] = useState(user?.org_id || '')

  // Additional profile states
  const [profileColor, setProfileColor] = useState('bg-fuchsia-500')
  const [glowColor, setGlowColor] = useState('rgba(255, 0, 255, 0.5)')
  const [bio, setBio] = useState('')
  const [university, setUniversity] = useState('')
  const [year, setYear] = useState('')
  const [internship, setInternship] = useState('')
  const [hackathons, setHackathons] = useState('')
  const [wins, setWins] = useState('')
  const [technologies, setTechnologies] = useState('')
  const [techInterests, setTechInterests] = useState('')
  const [nonTechInterests, setNonTechInterests] = useState('')
  const [preferences, setPreferences] = useState('')
  const [discord, setDiscord] = useState('')
  const [linkedin, setLinkedin] = useState('')

  const colorOptions = [
    { name: 'Fuchsia', value: 'bg-fuchsia-500' },
    { name: 'Cyan', value: 'bg-cyan-400' },
    { name: 'Yellow', value: 'bg-yellow-400' },
    { name: 'Pink', value: 'bg-pink-500' },
    { name: 'Purple', value: 'bg-purple-600' },
  ]

  useEffect(() => {
    const colors = ['rgba(255, 0, 255, 0.5)', 'rgba(0, 255, 255, 0.5)', 'rgba(255, 255, 0, 0.5)']
    let colorIndex = 0
    const interval = setInterval(() => {
      setGlowColor(colors[colorIndex])
      colorIndex = (colorIndex + 1) % colors.length
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Your Groovy Profile</h1>
      <div className="bg-black rounded-lg shadow-2xl overflow-hidden border-2 border-white" style={{ boxShadow: `0 0 20px 5px ${glowColor}` }}>
        <div className={`h-48 ${profileColor} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXzAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEwIiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuXzApIiAvPjwvc3ZnPg==')] opacity-50"></div>
          <Disc className="absolute top-4 right-4 w-12 h-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
          <Star className="absolute top-4 left-4 w-8 h-8 text-yellow-300 animate-pulse" />
          <Star className="absolute bottom-4 right-4 w-6 h-6 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="p-6 -mt-24 relative">
          <div className="flex items-center mb-6">
            <Avatar className="w-32 h-32 border-4 border-white mr-4">
              <AvatarImage src={picture || "/placeholder.svg?height=128&width=128"} alt="Profile picture" />
              <AvatarFallback>{nickname ? nickname.substring(0, 2).toUpperCase() : 'JD'}</AvatarFallback>
            </Avatar>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">
              Change Picture
              <Sparkles className="ml-2 w-4 h-4 animate-spin" />
            </Button>
          </div>
          <Tabs defaultValue="basic" className="text-white">
            <TabsList className="grid w-full grid-cols-2 bg-purple-800">
              <TabsTrigger value="basic" className="data-[state=active]:bg-purple-600">Basic Info</TabsTrigger>
              <TabsTrigger value="preferences" className="data-[state=active]:bg-purple-600">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={true}
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-white">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about your groovy self..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="university" className="text-white">University</Label>
                    <Input 
                      id="university" 
                      value={university} 
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="Disco Tech" 
                      className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-white">Year</Label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger id="year" className="bg-purple-900 text-white border-purple-600">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent className="bg-purple-900 text-white">
                        <SelectItem value="freshman">Freshman</SelectItem>
                        <SelectItem value="sophomore">Sophomore</SelectItem>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="internship" className="text-white">Internship</Label>
                  <Input 
                    id="internship" 
                    value={internship} 
                    onChange={(e) => setInternship(e.target.value)}
                    placeholder="Disco Ball Designer at Studio 54" 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <Label htmlFor="hackathons" className="text-white">Hackathons</Label>
                    <Input 
                      id="hackathons" 
                      type="number" 
                      value={hackathons} 
                      onChange={(e) => setHackathons(e.target.value)}
                      placeholder="Participated" 
                      className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="wins" className="text-white">Wins</Label>
                    <Input 
                      id="wins" 
                      type="number" 
                      value={wins} 
                      onChange={(e) => setWins(e.target.value)}
                      placeholder="Number of wins" 
                      className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="technologies" className="text-white">Technologies</Label>
                  <Input 
                    id="technologies" 
                    value={technologies} 
                    onChange={(e) => setTechnologies(e.target.value)}
                    placeholder="React, Node.js, Disco Lights..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="tech-interests" className="text-white">Tech Interests</Label>
                  <Input 
                    id="tech-interests" 
                    value={techInterests} 
                    onChange={(e) => setTechInterests(e.target.value)}
                    placeholder="AI, VR, Holographic Displays..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="non-tech-interests" className="text-white">Non-Tech Interests</Label>
                  <Input 
                    id="non-tech-interests" 
                    value={nonTechInterests} 
                    onChange={(e) => setNonTechInterests(e.target.value)}
                    placeholder="Dancing, DJing, Roller Skating..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
              </form>
            </TabsContent>
            <TabsContent value="preferences">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="profile-color" className="text-white">Profile Color</Label>
                  <Select value={profileColor} onValueChange={setProfileColor}>
                    <SelectTrigger id="profile-color" className="bg-purple-900 text-white border-purple-600">
                      <SelectValue placeholder="Choose a color" />
                    </SelectTrigger>
                    <SelectContent className="bg-purple-900 text-white">
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferences" className="text-white">Hackathon Preferences</Label>
                  <Input 
                    id="preferences" 
                    value={preferences} 
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder="Disco Balls, Dance Floors, Neon Lights..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="discord" className="text-white">Discord</Label>
                  <Input 
                    id="discord" 
                    value={discord} 
                    onChange={(e) => setDiscord(e.target.value)}
                    placeholder="Your Groovy Discord username" 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="text-white">LinkedIn</Label>
                  <Input 
                    id="linkedin" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="Your Funky LinkedIn profile URL" 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
              </form>
            </TabsContent>
          </Tabs>
          <Button type="submit" className="mt-4 bg-cyan-400 hover:bg-cyan-500 text-black font-bold">
            Save Changes
            <Sparkles className="ml-2 w-4 h-4 animate-spin" />
          </Button>
        </div>
      </div>
      <div className="mt-8 bg-black rounded-lg shadow-2xl p-6 border-2 border-white" style={{ boxShadow: `0 0 20px 5px ${glowColor}` }}>
        <h2 className="text-2xl font-semibold mb-4 text-white text-center">Profile Preview</h2>
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={picture || "/placeholder.svg?height=96&width=96"} alt="Profile picture" />
            <AvatarFallback>{nickname ? nickname.substring(0, 2).toUpperCase() : 'DD'}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold text-white">{name || 'Disco Dan'}</h3>
          <div className="flex items-center mt-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-300 mr-1 animate-bounce" />
            <span className="text-sm font-semibold text-yellow-300">{wins ? `${wins} Wins` : '3 Wins'}</span>
          </div>
          <p className="text-center text-gray-300 mb-4">{bio || 'AI enthusiast and disco dancer extraordinaire'}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {techInterests.split(',').map((interest, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-600 text-white">
                <Code className="w-3 h-3 mr-1 animate-pulse" />
                {interest.trim()}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {nonTechInterests.split(',').map((interest, index) => (
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
    </div>
  )
}