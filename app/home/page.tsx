"use client";

import { useState } from "react";
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

export enum AI_SUGGESTIONS {
  ICE_BREAKER_QUESTIONS = "ice_breaker_questions",
  RECOMMENDED_ACTIVITIES = "recommended_activities",
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
  },
];

export default function SwipeScreen() {
  const { userData } = useUserData();
  const [currentProfile, setCurrentProfile] = useState(0);
  const [response, setResponse] = useState({
    "why_you_should_team_up": "...",
    [AI_SUGGESTIONS.ICE_BREAKER_QUESTIONS]: [],
    [AI_SUGGESTIONS.SUGGESTED_CONVERSATION_TOPICS]: [],
    [AI_SUGGESTIONS.RECOMMENDED_ACTIVITIES]: [],
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

  const ProfileContent = ({ profile }: { profile: Profile }) => (
    <div>
      <div className={`h-48 ${profile.color}`} />
      <CardContent className="flex flex-col items-center p-6 -mt-24 relative">
        <Avatar className="w-32 h-32 border-4 border-white mb-4">
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
        <Button onClick={() => alert(JSON.stringify(userData))}>
          userData
        </Button>
        <Button
          className="m-4"
          onClick={async () => {
            setResponse({
              "why_you_should_team_up": "loading",
              [AI_SUGGESTIONS.ICE_BREAKER_QUESTIONS]: [],
              [AI_SUGGESTIONS.SUGGESTED_CONVERSATION_TOPICS]: [],
              [AI_SUGGESTIONS.RECOMMENDED_ACTIVITIES]: [],
            })
            const prompt = `
              Prompt:
You are a bot that helps to team up hackathon participants. Given the provided JSON data about two hackathon participants (${
              userData.name
            } and ${
              profile.name
            }), their interests, and personalities, generate a JSON output with the following information for ${
              userData.name
            } to ask ${profile.name}:
Why you should team up: Using third perspective - Tell ${profile.name} how ${userData.name}'s skillset and profile could have synergies with ${profile.name}'s skillset and profile in a hackathon team. 
Ice Breaker Questions: A list of (max 5) icebreaker questions that can be used to initiate conversation relevant to shared interests.
Suggested Conversation Topics: A list of (max 5) specific conversation topics related to specific shared or contrasting interests.
Recommended Activities: A list of (max 7) specific activities that would be suitable for both individuals based on their shared interests and personalities.

Current User: ${JSON.stringify(userData)}
Potential Teammate: ${JSON.stringify(profile)}

              Output Format:
{
  "why_you_should_team_up": "...",
  "ice_breaker_questions": [
    // ... list of icebreaker questions
  ],
  "suggested_conversation_topics": [
    // ... list of conversation topics
  ],
  "recommended_activities": [
    // ... list of recommended activities
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
          }}
        >
          Generate suggestions
        </Button>
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

        <div className="suggestion-category mb-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
            Suggested Conversation Topics
          </h3>
          {renderList(response[AI_SUGGESTIONS.SUGGESTED_CONVERSATION_TOPICS])}
        </div>

        <div className="suggestion-category mb-4">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2 mb-4">
            Recommended Activities
          </h3>
          {renderList(response[AI_SUGGESTIONS.RECOMMENDED_ACTIVITIES])}
        </div>
        {/* {JSON.stringify(response)} */}
      </CardContent>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      {/* <Card className="w-full max-w-md  border-2 border-gray-400 overflow-hidden">
        <div className={`h-40 ${profile.color}`} />
        <CardContent className="flex flex-col items-center p-6 -mt-24 relative">
          <Avatar className="w-32 h-32 border-2 border-black mb-4">
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
          <div className="flex justify-between w-full mt-4">
            <Button variant="destructive" size="icon" onClick={() => handleSwipe('left')}>
              <X className="h-4 w-4" />
            </Button>
            <Button 
            variant="default" 
            size="icon" 
            onClick={() => handleSwipe('right')}
            className="bg-green-500 hover:bg-green-600"
            >
            <Check className="h-4 w-4 text-white" />
            </Button>
          </div>
        </CardContent>
      </Card> */}
      <Dialog>
        <DialogTrigger asChild>
          <Card className="w-full max-w-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <ProfileContent profile={profile} />
          </Card>
        </DialogTrigger>
        {/* <DialogContent className="sm:max-w-[425px] max-h-[80vh] flex flex-col">
          <ProfileContent profile={profile} />
        </DialogContent> */}
      </Dialog>
      <div className="flex justify-between w-full max-w-md mt-4">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => handleSwipe("left")}
        >
          <X className="h-4 w-4" />
        </Button>
        <Button
          variant="default"
          size="icon"
          onClick={() => handleSwipe("right")}
        >
          <Check className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-4 flex justify-between w-full max-w-md">
        <Button variant="outline" size="sm">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous Hackathon
        </Button>
        <Button variant="outline" size="sm">
          Next Hackathon <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
