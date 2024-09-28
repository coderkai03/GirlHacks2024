'use client'

import Image from "next/image";
import { useState } from "react";
import SwipeScreen from "@/app/home/page";
import Teams from "@/app/teams/page";
import Profile from "@/app/profile/page";
import AddHackathon from "@/app/addHack/page";
import { Home, Users, User, PlusCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button";

enum Screens {
  Home = 'Home',
  Teams = 'Teams',
  Profile = 'Profile',
  Add = 'Add'
}

export default function HomeScreen() {
  
  const [currentScreen, setCurrentScreen] = useState(Screens.Home)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Logo */}
            <button onClick={() => setCurrentScreen(Screens.Home)} className="text-2xl font-bold text-gray-800">
              Logo
            </button>
          </div>
          <div className="flex items-center">
            {/* Menu Icons */}
            <button title="Home" onClick={() => setCurrentScreen(Screens.Home)} className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              <Home className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </button>

            <button title="Teams" onClick={() => setCurrentScreen(Screens.Teams)} className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              <Users className="h-6 w-6" />
              <span className="sr-only">Teams</span>
            </button>

            <button title="Profile" onClick={() => setCurrentScreen(Screens.Profile)} className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              <User className="h-6 w-6" />
              <span className="sr-only">Profile</span>
            </button>
            
            <button title="Add" onClick={() => setCurrentScreen(Screens.Add)} className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium">
              <PlusCircle className="h-6 w-6" />
              <span className="sr-only">Add</span>
            </button>
          </div>
        </div>
      </div>

      {currentScreen == Screens.Home && <SwipeScreen />}
      {currentScreen == Screens.Teams && <Teams />}
      {currentScreen == Screens.Profile && <Profile />}
      {currentScreen == Screens.Add && <AddHackathon />}
    </nav>
  )
}