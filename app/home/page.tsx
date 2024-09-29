"use client";
import ReactCardFlip from "react-card-flip";

import { Key, useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Zap,
  Code,
  Headphones,
  Gamepad,
  Music,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { UserData, useUserData } from "../UserDataContext";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cleanJsonString } from "../helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
  "HackDuke",
];

enum AI_SUGGESTIONS {
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

const old = [
  {
    id: "1",
    name: "Alice",
    wins: 3,
    bio: "AI enthusiast and coffee lover",
    image:
      "https://i.pinimg.com/736x/ab/d6/b7/abd6b72d71d74f36bca9258555bcaceb.jpg",
    techInterests: ["AI", "Machine Learning", "Python"],
    nonTechInterests: ["Coffee", "Hiking", "Photography"],
    color: "bg-purple-500",
    videoUrl:
      "https://i.pinimg.com/originals/12/f6/ac/12f6accc21f3cad0047fc68fc282569c.gif",
  },
  {
    id: "2",
    name: "Bob",
    wins: 2,
    bio: "VR developer with a passion for gaming",
    image:
      "https://i.pinimg.com/736x/3c/13/b9/3c13b91579296ae376ece2e93ac212dd.jpg",
    techInterests: ["VR", "Unity", "C#"],
    nonTechInterests: ["Gaming", "Sci-Fi Movies", "Board Games"],
    color: "bg-green-500",
    videoUrl:
      "https://cdn.discordapp.com/attachments/1289612458201448449/1289715239805521941/RmVweZEmPUjpbJxR4CniuYxIgEl77Bcle3sLZa9s.mp4?ex=66f9d46a&is=66f882ea&hm=fb05ac3c263bb8a106ebe801b7715f6cb9fa4c303f055c22824c2a8d3e27518c&",
  },
  {
    id: "3",
    name: "Charlie",
    wins: 1,
    bio: "Blockchain expert and music producer",
    image:
      "https://i.pinimg.com/564x/d4/da/21/d4da218e178a7218ccb9acbb31cb1168.jpg",
    techInterests: ["Blockchain", "Solidity", "Web3"],
    nonTechInterests: ["Music Production", "DJing", "Traveling"],
    color: "bg-blue-500",
    videoUrl:
      "https://i.pinimg.com/originals/23/51/bc/2351bc65b2b5d75cef146b7edddf805b.gif",
  },
];

const defaultResponse = {
  compatibility_score: "?",
  why_you_should_team_up: "...",
  [AI_SUGGESTIONS.ICE_BREAKER_QUESTIONS]: [],
  [AI_SUGGESTIONS.SUGGESTED_CONVERSATION_TOPICS]: [],
  [AI_SUGGESTIONS.RECOMMENDED_PROJECTS]: [],
};
export default function SwipeScreen() {
  const { userData, usersData } = useUserData();
  const [isResponseGenerating, setIsResponseGenerating] = useState(false);
  const [team, setTeam] = useState<UserData[]>([]);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [response, setResponse] = useState(defaultResponse);

  const handleSwipe = (direction: "left" | "right") => {
    setIsFlipped(false);
    setResponse(defaultResponse);
    if (direction === "right" && team.length < 3) {
      console.log("Added to team:", usersData[currentProfile].name);
      setTeam((prev) => [...prev, usersData[currentProfile]]);
    }
    setCurrentProfile((prev) => {
      // Move to the next profile
      let nextIndex = (prev + 1) % usersData.length;
    
      // Check if the next profile is your own (e.g., compare by userData.id or userData.name)
      if (usersData[nextIndex].name === userData.name) {
        // If it's your profile, skip to the profile after the next one
        nextIndex = (nextIndex + 1) % usersData.length;
      }
    
      return nextIndex;
    });
    
  };

  const profile = usersData[currentProfile];

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

  async function generate_suggestions(profile: UserData) {
    if (isResponseGenerating) return;
    setIsResponseGenerating(true);
    setResponse({
      compatibility_score: "Loading... Please wait up to 5 seconds!",
      why_you_should_team_up: "Loading... Please wait up to 5 seconds!",
      [AI_SUGGESTIONS.ICE_BREAKER_QUESTIONS]: [],
      [AI_SUGGESTIONS.SUGGESTED_CONVERSATION_TOPICS]: [],
      [AI_SUGGESTIONS.RECOMMENDED_PROJECTS]: [],
    });
    const prompt = `
      Prompt:
You are a bot that helps to team up hackathon participants. Given the provided JSON data about two hackathon participants (current user: ${
      userData.name
    } and potential team mate ${
      profile.name
    }), their interests, and personalities, generate a JSON output with the following information:
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
    setIsResponseGenerating(false);
  }

  // useEffect(() => {
  //   // generate_suggestions(profile);
  // }, [profile]);

  const ProfileContentTeam = ({ profile }: { profile: UserData }) =>
    profile && (
      <div>
        {/* {profile.videoUrl && profile.videoUrl.includes(".gif") ? <img src={profile.videoUrl} 
      alt="this slowpoke moves"    
           width="640"
        height="360"/> : <video
        src={profile.videoUrl}
        width={640}
        height={360}
        autoPlay
      />} */}

        <CardContent className="flex flex-col items-center p-6 -mt-24 relative h-full max-h-[75vh] overflow-y-auto">
          <Avatar className="w-32 h-32 border-4 border-grey-900 mb-4">
            <AvatarImage src={profile.picture} alt={profile.name} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="text-sm font-semibold">{profile.wins} Wins</span>
          </div>
          <p className="text-center mb-4">{profile.bio}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.technologies
              .split(",")
              .map((interest: string, index: Key | null | undefined) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-pink-500 text-pink-500"
                >
                  {index === 0 && (
                    <Music
                      className="w-3 h-3 mr-1 animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                  )}
                  {index === 1 && (
                    <Headphones className="w-3 h-3 mr-1 animate-pulse" />
                  )}
                  {index === 2 && (
                    <Gamepad
                      className="w-3 h-3 mr-1 animate-spin"
                      style={{ animationDuration: "4s" }}
                    />
                  )}
                  {interest.trim()}
                </Badge>
              ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.techInterests.split(",").map((interest, index) => (
              <Badge key={index} variant="secondary">
                <Code className="w-3 h-3 mr-1" />
                {interest}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.nonTechInterests.split(",").map((interest, index) => (
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

  const ProfileContentFront = ({ profile }: { profile: UserData }) =>
    profile && (
      <div
        onClick={() => {
          setIsFlipped(!isFlipped);
          generate_suggestions(profile);
        }}
      >
        {/* {profile.videoUrl && profile.videoUrl.includes(".gif") ? <img src={profile.videoUrl} 
      alt="this slowpoke moves"    
           width="640"
        height="360"/> : <video
        src={profile.videoUrl}
        width={640}
        height={360}
        autoPlay
      />} */}

        <video
          src={
            profile.videoUrl ||
            "https://cdn.discordapp.com/attachments/1289612458201448449/1289715239805521941/RmVweZEmPUjpbJxR4CniuYxIgEl77Bcle3sLZa9s.mp4?ex=66f9d46a&is=66f882ea&hm=fb05ac3c263bb8a106ebe801b7715f6cb9fa4c303f055c22824c2a8d3e27518c&"
          }
          width={640}
          height={360}
          autoPlay
          loop
        />

        <CardContent className="flex flex-col items-center p-6 -mt-24 relative h-full max-h-[75vh] overflow-y-auto">
          <Avatar className="w-32 h-32 border-4 border-grey-900 mb-4">
            <AvatarImage src={profile.picture} alt={profile.name} />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-yellow-500 mr-1" />
            <span className="text-sm font-semibold">{profile.wins} Wins</span>
          </div>
          <p className="text-center mb-4">{profile.bio}</p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.technologies
              .split(",")
              .map((interest: string, index: Key | null | undefined) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-pink-500 text-pink-500"
                >
                  {index === 0 && (
                    <Music
                      className="w-3 h-3 mr-1 animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                  )}
                  {index === 1 && (
                    <Headphones className="w-3 h-3 mr-1 animate-pulse" />
                  )}
                  {index === 2 && (
                    <Gamepad
                      className="w-3 h-3 mr-1 animate-spin"
                      style={{ animationDuration: "4s" }}
                    />
                  )}
                  {interest.trim()}
                </Badge>
              ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.techInterests.split(",").map((interest, index) => (
              <Badge key={index} variant="secondary">
                <Code className="w-3 h-3 mr-1" />
                {interest}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.nonTechInterests.split(",").map((interest, index) => (
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

  const ProfileContentBack = ({ profile }: { profile: UserData }) => (
    <div onClick={() => setIsFlipped(!isFlipped)}>
      <CardContent className="flex flex-col items-center p-6 relative h-full max-h-[75vh] overflow-y-auto">
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
    <div className="flex display-flex flex-row relative min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-5">
      <div className="ml-8 self-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-w-40 border-1.5 border-purple-500 text-white-500 bg-blue-400 hover:bg-blue-500 hover:text-white rounded p-4"
            >
              Hackathons
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 items-center border-1.5 border-purple-500 text-white-500 bg-blue-400 hover:bg-blue-500 hover:text-black rounded">
            <DropdownMenuLabel>Select a Hackathon</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {hackathons.map((hackathon, index) => (
              <DropdownMenuItem key={index}>{hackathon}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-center flex-grow">
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
              <Card className=" center h-[75vh] max-w-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
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

      <div className="">
        <p className="w-w-40 border-1.5 border-purple-500 text-white-500 bg-blue-400 hover:bg-blue-500 hover:text-white rounded p-4">
          Team!
        </p>
        {team.map((teammate) => (
          <Card className="center max-w-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <ProfileContentTeam profile={teammate} />
          </Card>
        ))}
      </div>
    </div>
  );
}
