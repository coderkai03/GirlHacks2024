'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <Avatar className="w-20 h-20 mr-4">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Button>Change Picture</Button>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <Textarea id="bio" placeholder="Tell us about yourself..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
              <Input id="university" placeholder="Stanford University" />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <Select>
                <SelectTrigger>
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
            <label htmlFor="internship" className="block text-sm font-medium text-gray-700">Internship</label>
            <Input id="internship" placeholder="Software Engineer Intern at Google" />
          </div>
          <div>
            <label htmlFor="hackathons" className="block text-sm font-medium text-gray-700">Hackathon Participation</label>
            <Input id="hackathons" type="number" placeholder="Number of hackathons" />
          </div>
          <div>
            <label htmlFor="wins" className="block text-sm font-medium text-gray-700">Hackathon Wins</label>
            <Input id="wins" type="number" placeholder="Number of wins" />
          </div>
          <div>
            <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">Technologies</label>
            <Input id="technologies" placeholder="React, Node.js, Python..." />
          </div>
          <div>
            <label htmlFor="tech-interests" className="block text-sm font-medium text-gray-700">Tech Interests</label>
            <Input id="tech-interests" placeholder="AI, VR, Crypto..." />
          </div>
          <div>
            <label htmlFor="non-tech-interests" className="block text-sm font-medium text-gray-700">Non-Tech Interests</label>
            <Input id="non-tech-interests" placeholder="Music, Sports, Gaming..." />
          </div>
          <div>
            <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">Preferences</label>
            <Input id="preferences" placeholder="Hotels, Expensiveness, Vibe..." />
          </div>
          <div>
            <label htmlFor="discord" className="block text-sm font-medium text-gray-700">Discord</label>
            <Input id="discord" placeholder="Your Discord username" />
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <Input id="linkedin" placeholder="Your LinkedIn profile URL" />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </div>
  )
}