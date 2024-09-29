"use client";
import ReactCardFlip from "react-card-flip";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Zap,
  Code,
  Headphones,
  Gamepad,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useUserData } from "../UserDataContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanJsonString } from "../helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

  const hackathons = [
    "TechCrunch Disrupt",
    "HackMIT",
    "PennApps",
    "TreeHacks",
    "HackTheNorth",
    "MHacks",
    "HackGT",
    "CalHacks",
    "LAHacks",
    "HackDuke"
  ]

export enum AI_SUGGESTIONS {
  ICE_BREAKER_QUESTIONS = "ice_breaker_questions",
  RECOMMENDED_PROJECTS = "recommended_projects",
  SUGGESTED_CONVERSATION_TOPICS = "suggested_conversation_topics",
}

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface Profile {
  id: string;
  name: string;
  wins: number;
  bio: string;
  image: string;
  techInterests: string[];
  nonTechInterests: string[];
  color: string;
  videoUrl: string;
}

const mockProfiles: Profile[] = [
  {
    id: "1",
    name: "Alice",
    wins: 3,
    bio: "AI enthusiast and coffee lover",
    image: "/placeholder.svg?height=400&width=400",
    techInterests: ["AI", "Machine Learning", "Python"],
    nonTechInterests: ["Coffee", "Hiking", "Photography"],
    color: "bg-purple-500",
    videoUrl: "https://media.tenor.com/r0R0N3dI3kIAAAAM/dancing-cat-dance.gif"
  },
  {
    id: "2",
    name: "Bob",
    wins: 2,
    bio: "VR developer with a passion for gaming",
    image: "/placeholder.svg?height=400&width=400",
    techInterests: ["VR", "Unity", "C#"],
    nonTechInterests: ["Gaming", "Sci-Fi Movies", "Board Games"],
    color: "bg-green-500",
    videoUrl: "https://cdn.discordapp.com/attachments/1289612458201448449/1289715239805521941/RmVweZEmPUjpbJxR4CniuYxIgEl77Bcle3sLZa9s.mp4?ex=66f9d46a&is=66f882ea&hm=fb05ac3c263bb8a106ebe801b7715f6cb9fa4c303f055c22824c2a8d3e27518c&"
  },
  {
    id: "3",
    name: "Charlie",
    wins: 1,
    bio: "Blockchain expert and music producer",
    image: "/placeholder.svg?height=400&width=400",
    techInterests: ["Blockchain", "Solidity", "Web3"],
    nonTechInterests: ["Music Production", "DJing", "Traveling"],
    color: "bg-blue-500",
    videoUrl: "https://i.pinimg.com/originals/23/51/bc/2351bc65b2b5d75cef146b7edddf805b.gif"
  },
];

export default function SwipeScreen() {
  const { userData } = useUserData();
  const [isResponseGenerating, setIsResponseGenerating] = useState(false)
  const [currentProfile, setCurrentProfile] = useState(0);
  const [response, setResponse] = useState({
    compatibility_score: "?",
    why_you_should_team_up: "...",
    [AI_SUGGESTIONS.ICE_BREAKER_QUESTIONS]: [],
    [AI_SUGGESTIONS.SUGGESTED_CONVERSATION_TOPICS]: [],
    [AI_SUGGESTIONS.RECOMMENDED_PROJECTS]: [],
  });

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      console.log("Added to team:", mockProfiles[currentProfile].name);
    }
    setCurrentProfile((prev) => (prev + 1) % mockProfiles.length);
  };

  const profile = mockProfiles[currentProfile];

  const renderList = (
    items: string[],
    emptyMessage: string = "Generate suggestions by clicking the button below!"
  ) => (
    <ul className="space-y-2">
      {items.length > 0 ? (
        items.map((item, index) => (
          <li
            key={index}
            className="bg-gray-100 border border-gray-300 rounded-md p-3 shadow-sm"
          >
            {item}
          </li>
        ))
      ) : (
        <li className="text-gray-500 italic">{emptyMessage}</li>
      )}
    </ul>
  );

  async function generate_suggestions(profile: Profile) {
    if (isResponseGenerating) return
    setIsResponseGenerating(true)
    setResponse({
      compatibility_score: "Loading... Please wait up to 5 seconds!",
      why_you_should_team_up: "Loading... Please wait up to 5 seconds!",
      [AI_SUGGESTIONS.ICE_BREAKER_QUESTIONS]: [],
      [AI_SUGGESTIONS.SUGGESTED_CONVERSATION_TOPICS]: [],
      [AI_SUGGESTIONS.RECOMMENDED_PROJECTS]: [],
    });
    const prompt = `
      Prompt:
You are a bot that helps to team up hackathon participants. Given the provided JSON data about two hackathon participants (${
      userData.name
    } and ${
      profile.name
    }), their interests, and personalities, generate a JSON output with the following information for ${
      userData.name
    } to ask ${profile.name}:
Compatibility Score: a numeric score out of 100 of how compatibility the two hackers are in a team. Try to keep the range within 70-90.
Why you should team up: Tell ${userData.name} how ${
      profile.name
    }'s skillset and profile could have synergies with ${
      userData.name
    }'s skillset and profile in a hackathon team. 
Ice Breaker Questions: A list of (max 3) icebreaker questions that can be used to initiate conversation relevant to shared interests.
Suggested Conversation Topics: A list of (max 3) specific conversation topics related to specific shared or contrasting interests.
Recommended Activities: A list of (max 3) specific projects that would be suitable for both individuals based on their shared interests and personalities.

Current User: ${JSON.stringify(userData)}
Potential Teammate: ${JSON.stringify(profile)}

      Output Format:
{
"compatibility_score": "xx",
"why_you_should_team_up": "...",
"ice_breaker_questions": [
// ... list of icebreaker questions
],
"suggested_conversation_topics": [
// ... list of conversation topics
],
"recommended_projects": [
// ... list of recommended projects
]
}

All content must be specific and hyper relevant to the matching and non matching interests! Do not have anything in brackets.
      `;
    const result = await model.generateContent(prompt);
    const resultString = result.response.text();
    console.log(resultString);
    const cleanedString = cleanJsonString(resultString);
    const resultObject = JSON.parse(cleanedString);
    setResponse(resultObject);
    // alert(JSON.stringify(resultObject));
    setIsResponseGenerating(false)
  }

  useEffect(() => {
    generate_suggestions(profile);
  }, [profile]);

  const ProfileContentFront = ({ profile }: { profile: Profile }) => (
    <div onClick={() => setIsFlipped(!isFlipped)}>
      
      {profile.videoUrl.includes(".gif") ? <img src={profile.videoUrl} 
      alt="this slowpoke moves"    
           width="640"
        height="360"/> : <video
        src={profile.videoUrl}
        width={640}
        height={360}
        autoPlay
      />}
      <CardContent className="flex flex-col items-center p-6 -mt-24 relative">
        <Avatar className="w-32 h-32 border-4 border-grey-900 mb-4">
          <AvatarImage src={profile.image} alt={profile.name} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
        <div className="flex items-center mb-2">
          <Zap className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="text-sm font-semibold">{profile.wins} Wins</span>
        </div>
        <p className="text-center mb-4">{profile.bio}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {profile.techInterests.map((interest, index) => (
            <Badge key={index} variant="secondary">
              <Code className="w-3 h-3 mr-1" />
              {interest}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {profile.nonTechInterests.map((interest, index) => (
            <Badge key={index} variant="outline">
              {index === 0 && <Headphones className="w-3 h-3 mr-1" />}
              {index === 1 && <Gamepad className="w-3 h-3 mr-1" />}
              {index === 2 && <ChevronRight className="w-3 h-3 mr-1" />}
              {interest}
            </Badge>
          ))}
        </div>
      </CardContent>
    </div>
  );

  const ProfileContentBack = ({ profile }: { profile: Profile }) => (
    <div onClick={() => setIsFlipped(!isFlipped)}>
      <CardContent className="flex flex-col items-center p-6 -mt-24 relative">
        <Button className="m-4">Generate suggestions</Button>
        <div className="suggestion-category mb-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
            Compatibility Score
          </h3>
          {response["compatibility_score"]}
        </div>
        <div className="suggestion-category mb-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
            Why You should Team Up!
          </h3>
          {response["why_you_should_team_up"]}
        </div>
        <div className="suggestion-category mb-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
            Ice Breaker Questions
          </h3>
          {renderList(response[AI_SUGGESTIONS.ICE_BREAKER_QUESTIONS])}
        </div>

        {/* <div className="suggestion-category mb-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
            Suggested Conversation Topics
          </h3>
          {renderList(response[AI_SUGGESTIONS.SUGGESTED_CONVERSATION_TOPICS])}
        </div> */}

        <div className="suggestion-category mb-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
            Recommended Projects
          </h3>
          {renderList(response[AI_SUGGESTIONS.RECOMMENDED_PROJECTS])}
        </div>
        {/* {JSON.stringify(response)} */}
      </CardContent>
    </div>
  );

  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-row items-center relative min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      
      <div className="m-8 self-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-40">
                Hackathons
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 items-center">
              <DropdownMenuLabel>Select a Hackathon</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {hackathons.map((hackathon, index) => (
                <DropdownMenuItem key={index}>{hackathon}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      
        <div className="flex flex-grow items-center justify-center">
    <div className="flex flex-row items-center">
      <Button
        className="mr-8"
        variant="destructive"
        size="icon"
        onClick={() => handleSwipe("left")}
      >
        <X className="h-4 w-4" />
      </Button>

      <ReactCardFlip isFlipped={isFlipped}>
        <div key="front">
          <Card className="h-[75vh] max-w-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <ProfileContentFront profile={profile} />
          </Card>
        </div>
        <div key="back">
          <Card className="h-[75vh] max-w-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <ProfileContentBack profile={profile} />
          </Card>
        </div>
      </ReactCardFlip>

      <Button
        variant="default"
        size="icon"
        onClick={() => handleSwipe("right")}
        className="bg-green-500 hover:bg-green-600 ml-8"
      >
        <Check className="h-4 w-4" />
      </Button>
    </div>
  </div>
    </div>
  );
}
