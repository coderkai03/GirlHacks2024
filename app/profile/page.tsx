'use client'

import { useEffect } from 'react'
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
import {useUserData} from '../UserDataContext'

export default function DiscoProfileScreen() {
  const { user: auth0User } = useUser();
  const { userData, updateUserData } = useUserData();

  useEffect(() => {
    if (auth0User) {
      updateUserData({
        email: auth0User.email || '',
        emailVerified: auth0User.email_verified || false,
        name: auth0User.name || '',
        nickname: auth0User.nickname || '',
        picture: auth0User.picture || '',
        sub: auth0User.sub || '',
        updatedAt: auth0User.updated_at || '',
        orgId: auth0User.org_id || ''
      });
    }
  }, [auth0User, updateUserData]);

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
      updateUserData({ glowColor: colors[colorIndex] });
      colorIndex = (colorIndex + 1) % colors.length
    }, 1000)
    return () => clearInterval(interval)
  }, [updateUserData])

  const handleInputChange = (field, value) => {
    updateUserData({ [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Your Groovy Profile</h1>
      <div className="bg-black rounded-lg shadow-2xl overflow-hidden border-2 border-white" style={{ boxShadow: `0 0 20px 5px ${userData.glowColor}` }}>
        <div className={`h-48 ${userData.profileColor} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuXzAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEwIiBzdHJva2U9IiNGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuXzApIiAvPjwvc3ZnPg==')] opacity-50"></div>
          <Disc className="absolute top-4 right-4 w-12 h-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
          <Star className="absolute top-4 left-4 w-8 h-8 text-yellow-300 animate-pulse" />
          <Star className="absolute bottom-4 right-4 w-6 h-6 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        <div className="p-6 -mt-24 relative">
          <div className="flex items-center mb-6">
            <Avatar className="w-32 h-32 border-4 border-white mr-4">
              <AvatarImage src={userData.picture || "/placeholder.svg?height=128&width=128"} alt="Profile picture" />
              <AvatarFallback>{userData.nickname ? userData.nickname.substring(0, 2).toUpperCase() : 'JD'}</AvatarFallback>
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
                    value={userData.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    value={userData.email} 
                    disabled={true}
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-white">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={userData.bio} 
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about your groovy self..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="university" className="text-white">University</Label>
                    <Input 
                      id="university" 
                      value={userData.university} 
                      onChange={(e) => handleInputChange('university', e.target.value)}
                      placeholder="Disco Tech" 
                      className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="year" className="text-white">Year</Label>
                    <Select value={userData.year} onValueChange={(value) => handleInputChange('year', value)}>
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
                    value={userData.internship} 
                    onChange={(e) => handleInputChange('internship', e.target.value)}
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
                      value={userData.hackathons} 
                      onChange={(e) => handleInputChange('hackathons', e.target.value)}
                      placeholder="Participated" 
                      className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="wins" className="text-white">Wins</Label>
                    <Input 
                      id="wins" 
                      type="number" 
                      value={userData.wins} 
                      onChange={(e) => handleInputChange('wins', e.target.value)}
                      placeholder="Number of wins" 
                      className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="technologies" className="text-white">Technologies</Label>
                  <Input 
                    id="technologies" 
                    value={userData.technologies} 
                    onChange={(e) => handleInputChange('technologies', e.target.value)}
                    placeholder="React, Node.js, Disco Lights..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="tech-interests" className="text-white">Tech Interests</Label>
                  <Input 
                    id="tech-interests" 
                    value={userData.techInterests} 
                    onChange={(e) => handleInputChange('techInterests', e.target.value)}
                    placeholder="AI, VR, Holographic Displays..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="non-tech-interests" className="text-white">Non-Tech Interests</Label>
                  <Input 
                    id="non-tech-interests" 
                    value={userData.nonTechInterests} 
                    onChange={(e) => handleInputChange('nonTechInterests', e.target.value)}
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
                  <Select value={userData.profileColor} onValueChange={(value) => handleInputChange('profileColor', value)}>
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
                    value={userData.preferences} 
                    onChange={(e) => handleInputChange('preferences', e.target.value)}
                    placeholder="Disco Balls, Dance Floors, Neon Lights..." 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="discord" className="text-white">Discord</Label>
                  <Input 
                    id="discord" 
                    value={userData.discord} 
                    onChange={(e) => handleInputChange('discord', e.target.value)}
                    placeholder="Your Groovy Discord username" 
                    className="bg-purple-900 text-white placeholder-purple-300 border-purple-600" 
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="text-white">LinkedIn</Label>
                  <Input 
                    id="linkedin" 
                    value={userData.linkedin} 
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
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
      <div className="mt-8 bg-black rounded-lg shadow-2xl p-6 border-2 border-white" style={{ boxShadow: `0 0 20px 5px ${userData.glowColor}` }}>
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
            {userData.techInterests.split(',').map((interest, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-600 text-white">
                <Code className="w-3 h-3 mr-1 animate-pulse" />
                {interest.trim()}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {userData.nonTechInterests.split(',').map((interest, index) => (
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