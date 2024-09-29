"use client";

import Image from "next/image";
import { useState } from "react";
import SwipeScreen from "@/app/home/page";
import Teams from "@/app/teams/page";
import Profile from "@/app/profile/page";
import AddHackathon from "@/app/addHack/page";
import HackathonDisplay from "./hackathons/page";
import { Home, Users, User, PlusCircle, Computer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import Login from "./login";
import Logout from "./logout";
import LandingPage from "./featurecard";

enum Screens {
  Home = "Home",
  Teams = "Teams",
  Profile = "Profile",
  Add = "Add",
  Hackathons = "Hackathons"
}

export default function HomeScreen() {
  const { user, error, isLoading } = useUser();

  const [currentScreen, setCurrentScreen] = useState(Screens.Home);

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Logo */}
            <button
              onClick={() => setCurrentScreen(Screens.Home)}
              className="text-2xl font-bold text-white"
            >
              DiscoMatch 🎶
            </button>
          </div>
          <div className="flex items-center">
            {/* Menu Icons */}
            {user && <img style={{height: 30, borderRadius: 50, marginRight: 10}} src={user.picture || ""} alt={user.name || ""} />}
            {user && <p className="text-gray-100">{user.name} ({user.email})</p>}

            <button
              title="Home"
              onClick={() => setCurrentScreen(Screens.Home)}
              className="text-gray-100 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Home className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </button>

            <button
              title="Teams"
              onClick={() => setCurrentScreen(Screens.Teams)}
              className="text-gray-100 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Users className="h-6 w-6" />
              <span className="sr-only">Teams</span>
            </button>

            <button
              title="Hackathons"
              onClick={() => setCurrentScreen(Screens.Hackathons)}
              className="text-gray-100 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Computer className="h-6 w-6" />
              <span className="sr-only">Hackathons</span>
            </button>

            <button
              title="Profile"
              onClick={() => setCurrentScreen(Screens.Profile)}
              className="text-gray-100 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              <User className="h-6 w-6" />
              <span className="sr-only">Profile</span>
            </button>

            <button
              title="Add"
              onClick={() => setCurrentScreen(Screens.Add)}
              className="text-gray-100 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              <PlusCircle className="h-6 w-6" />
              <span className="sr-only">Add</span>
            </button>

            {user ? Logout() : Login()}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen w-full">
  {!user ? (
    <LandingPage />
  
  ) : (
    <div className="flex flex-col w-full h-full">
      {currentScreen == Screens.Home && <SwipeScreen />}
      {currentScreen == Screens.Teams && <Teams />}
      {currentScreen == Screens.Profile && <Profile />}
      {currentScreen == Screens.Add && <AddHackathon />}
      {currentScreen == Screens.Hackathons && <HackathonDisplay />}
    </div>
  )}
</div>


    </nav>
  );
}
