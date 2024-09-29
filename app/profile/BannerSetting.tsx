'use client'

import { Key, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserData } from '@/app/UserDataContext'

export default function ProfilePreview({ userData, glowColor }: { userData: UserData, glowColor: string }) {
    return (
        <div 
            className="mt-6 bg-black rounded-lg shadow-2xl p-8 border-2 border-white relative w-full max-w-1xl h-[300px]" 
            style={{
                boxShadow: `0 0 20px 5px ${glowColor}`,  // Corrected this line
                background: userData.videoUrl ? 'transparent' : '#000',
                overflow: 'hidden' // Ensure video fits properly
            }}
        >
            {userData.videoUrl && (
                <video
                    src={userData.videoUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                />
            )}

            <h2 className="text-2xl font-semibold mb-4 text-white text-center relative z-10"></h2>
            <div className="flex flex-col items-center relative z-10">
                <Avatar className="w-32 h-32 mb-4">
                    {/* Optional avatar image here */}
                </Avatar>
                <div className="flex items-center mt-2 mb-4">
                    {/* Optional items */}
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {/* Optional items */}
                </div>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {/* Optional items */}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                    {/* Optional items */}
                </div>
            </div>
        </div>
    )
}
