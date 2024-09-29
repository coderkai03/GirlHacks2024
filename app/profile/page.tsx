'use client'

import { Key, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Code, Headphones, Gamepad, Zap, Music, Disc, ChevronRight, Star, Sparkles, Trophy } from 'lucide-react'
import {useUserData} from '../UserDataContext'
import ProfilePreview from './ProfilePreview'
import ProfileSettings from './ProfileSettings'
import { useRef } from 'react'
import BannerSetting from './BannerSetting'

export default function DiscoProfileScreen() {
  const { user: auth0User } = useUser();
  const { userData, updateUserData } = useUserData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserData({ picture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

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

  let glowColor = "";

  useEffect(() => {
    const colors = ['rgba(255, 0, 255, 0.5)', 'rgba(0, 255, 255, 0.5)', 'rgba(255, 255, 0, 0.5)']
    let colorIndex = 0
    const interval = setInterval(() => {
      glowColor = colors[colorIndex];
      colorIndex = (colorIndex + 1) % colors.length
    }, 1000)
    return () => clearInterval(interval)
  }, [updateUserData])

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return userData && userData.sub && <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Your Groovy Profile</h1>
      <div className="bg-black rounded-lg shadow-2xl overflow-hidden border-2 border-white" style={{ boxShadow: `0 0 20px 5px ${glowColor}` }}>
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
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePictureChange}
              accept="image/*"
              className="hidden"
            />
            <Button onClick={triggerFileInput} className="bg-pink-500 hover:bg-pink-600 text-white">
              Change Picture
              <Sparkles className="ml-2 w-4 h-4 animate-spin" />
            </Button>
          </div>

          <Tabs defaultValue="settings" className="text-white">
            <TabsList className="grid w-full grid-cols-3 bg-purple-800">
                <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">Settings</TabsTrigger>
                <TabsTrigger value="preview" className="data-[state=active]:bg-purple-600">Preview</TabsTrigger>
                <TabsTrigger value="banner" className="data-[state=active]:bg-purple-600">Banner</TabsTrigger>
            </TabsList>
            <TabsContent value='settings'>
                <ProfileSettings userData={userData} />
            </TabsContent>
            <TabsContent value='preview'>
                <ProfilePreview userData={userData} glowColor={glowColor} />
            </TabsContent>
            <TabsContent value='banner'>
                <BannerSetting userData={userData} glowColor={glowColor} />
            </TabsContent>
            
        </Tabs>
        </div>
      {/*<Button onClick={() => alert(console.log(userData))}>User Data</Button>*/}
      </div>
      </div>
  
}