'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Code, Headphones, Gamepad, Zap, Music, Disc, ChevronRight, Star, Sparkles, Trophy } from 'lucide-react'
import {UserData, useUserData} from '../UserDataContext'
import { useEffect } from "react"
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfileSettings({ userData }: { userData: UserData }) {
    const { user: auth0User } = useAuth0();
    const { updateUserData } = useUserData();

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
      }, [auth0User]);

      const colorOptions = [
        { name: 'Fuchsia', value: 'bg-fuchsia-500' },
        { name: 'Cyan', value: 'bg-cyan-400' },
        { name: 'Yellow', value: 'bg-yellow-400' },
        { name: 'Pink', value: 'bg-pink-500' },
        { name: 'Purple', value: 'bg-purple-600' },
      ]
      
    const handleInputChange = (field: string, value: string) => {
        updateUserData({ [field]: value });
      };

    return (
        <div>
            <Tabs defaultValue="basic" className="text-white mt-8">
                <TabsList className="grid w-1/2 grid-cols-2 bg-purple-800">
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
                  <Label htmlFor="videoUrl" className="text-white">Video URL</Label>
                  <Input 
                    id="videoUrl" 
                    value={userData.videoUrl} 
                    onChange={(e) => handleInputChange('videoUrl', e.target.value)}
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
                      min="0"
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
                      min="0"
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
          <Button onClick={async () => {
            const updatedData = userData;
            const response = await fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
              throw new Error('Failed to update user data');
            }
          }} type="submit" className="mt-4 bg-cyan-400 hover:bg-cyan-500 text-black font-bold">
            Save Changes
          </Button>
        </div>
    )
}