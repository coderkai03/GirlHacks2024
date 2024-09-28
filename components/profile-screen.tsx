'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Code, Headphones, Gamepad, Zap } from 'lucide-react'

export function ProfileScreenComponent() {
  const [profileColor, setProfileColor] = useState('bg-purple-500')

  const colorOptions = [
    { name: 'Purple', value: 'bg-purple-500' },
    { name: 'Blue', value: 'bg-blue-500' },
    { name: 'Green', value: 'bg-green-500' },
    { name: 'Red', value: 'bg-red-500' },
    { name: 'Yellow', value: 'bg-yellow-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className={`h-48 ${profileColor}`} />
        <div className="p-6 -mt-24 relative">
          <div className="flex items-center mb-6">
            <Avatar className="w-32 h-32 border-4 border-white mr-4">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button>Change Picture</Button>
          </div>
          <Tabs defaultValue="basic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="university">University</Label>
                    <Input id="university" placeholder="Stanford University" />
                  </div>
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freshman">Freshman</SelectItem>
                        <SelectItem value="sophomore">Sophomore</SelectItem>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="internship">Internship</Label>
                  <Input id="internship" placeholder="Software Engineer Intern at Google" />
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <Label htmlFor="hackathons">Hackathons</Label>
                    <Input id="hackathons" type="number" placeholder="Participated" />
                  </div>
                  <div>
                    <Label htmlFor="wins">Wins</Label>
                    <Input id="wins" type="number" placeholder="Number of wins" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="technologies">Technologies</Label>
                  <Input id="technologies" placeholder="React, Node.js, Python..." />
                </div>
                <div>
                  <Label htmlFor="tech-interests">Tech Interests</Label>
                  <Input id="tech-interests" placeholder="AI, VR, Crypto..." />
                </div>
                <div>
                  <Label htmlFor="non-tech-interests">Non-Tech Interests</Label>
                  <Input id="non-tech-interests" placeholder="Music, Sports, Gaming..." />
                </div>
              </form>
            </TabsContent>
            <TabsContent value="preferences">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="profile-color">Profile Color</Label>
                  <Select onValueChange={setProfileColor} defaultValue={profileColor}>
                    <SelectTrigger id="profile-color">
                      <SelectValue placeholder="Choose a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="preferences">Hackathon Preferences</Label>
                  <Input id="preferences" placeholder="Hotels, Expensiveness, Vibe..." />
                </div>
                <div>
                  <Label htmlFor="discord">Discord</Label>
                  <Input id="discord" placeholder="Your Discord username" />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" placeholder="Your LinkedIn profile URL" />
                </div>
              </form>
            </TabsContent>
          </Tabs>
          <Button type="submit" className="mt-4">Save Changes</Button>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Preview</h2>
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <div className="flex items-center mt-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="text-sm font-semibold">3 Wins</span>
          </div>
          <p className="text-center text-gray-600 mb-4">AI enthusiast and coffee lover</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge variant="secondary">
              <Code className="w-3 h-3 mr-1" />
              AI
            </Badge>
            <Badge variant="secondary">
              <Code className="w-3 h-3 mr-1" />
              Machine Learning
            </Badge>
            <Badge variant="secondary">
              <Code className="w-3 h-3 mr-1" />
              Python
            </Badge>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">
              <Headphones className="w-3 h-3 mr-1" />
              Music
            </Badge>
            <Badge variant="outline">
              <Gamepad className="w-3 h-3 mr-1" />
              Gaming
            </Badge>
            <Badge variant="outline">
              <ChevronRight className="w-3 h-3 mr-1" />
              Traveling
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}