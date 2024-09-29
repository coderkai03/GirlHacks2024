import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const hackathonData = [
  {
    name: "TechCrunch Disrupt",
    location: "San Francisco, CA",
    date: "October 15-17, 2024",
    description: "One of the biggest startup events in the tech industry, featuring a hackathon alongside pitch competitions and networking opportunities.",
    compatibilityScore: 92,
    reasonToAttend: "Unparalleled networking with tech industry leaders and investors."
  },
  {
    name: "HackMIT",
    location: "Cambridge, MA",
    date: "September 20-22, 2024",
    description: "MIT's annual hackathon, bringing together students from around the world to create innovative projects in just 36 hours.",
    compatibilityScore: 88,
    reasonToAttend: "Access to cutting-edge resources and mentorship from MIT faculty."
  },
  {
    name: "PennApps",
    location: "Philadelphia, PA",
    date: "September 6-8, 2024",
    description: "The world's first college hackathon, hosted by the University of Pennsylvania, focusing on cutting-edge technology and interdisciplinary collaboration.",
    compatibilityScore: 85,
    reasonToAttend: "Rich history and diverse challenges spanning multiple disciplines."
  },
  {
    name: "TreeHacks",
    location: "Stanford, CA",
    date: "February 14-16, 2025",
    description: "Stanford University's hackathon, emphasizing social impact and innovative solutions to real-world problems.",
    compatibilityScore: 90,
    reasonToAttend: "Focus on creating technology for social good and global impact."
  },
  {
    name: "HackTheNorth",
    location: "Waterloo, ON, Canada",
    date: "September 13-15, 2024",
    description: "Canada's biggest hackathon, hosted at the University of Waterloo, featuring international participants and industry sponsors.",
    compatibilityScore: 87,
    reasonToAttend: "International exposure and strong ties to Canadian tech ecosystem."
  },
  {
    name: "MHacks",
    location: "Ann Arbor, MI",
    date: "October 11-13, 2024",
    description: "University of Michigan's premier hackathon, known for its large scale and diverse range of tracks and challenges.",
    compatibilityScore: 86,
    reasonToAttend: "Wide variety of tracks catering to different interests and skill levels."
  },
  {
    name: "HackGT",
    location: "Atlanta, GA",
    date: "October 25-27, 2024",
    description: "Georgia Tech's hackathon, focusing on innovation in various fields including AI, IoT, and sustainability.",
    compatibilityScore: 89,
    reasonToAttend: "Strong focus on emerging technologies like AI and IoT."
  },
  {
    name: "CalHacks",
    location: "Berkeley, CA",
    date: "November 1-3, 2024",
    description: "UC Berkeley's largest hackathon, attracting thousands of hackers from around the world to compete and create groundbreaking projects.",
    compatibilityScore: 91,
    reasonToAttend: "Large-scale event with diverse participants and innovative projects."
  },
  {
    name: "LAHacks",
    location: "Los Angeles, CA",
    date: "March 21-23, 2025",
    description: "UCLA's hackathon, bringing together students from across Southern California and beyond for a weekend of coding and creativity.",
    compatibilityScore: 84,
    reasonToAttend: "Great opportunity to connect with Southern California's tech scene."
  },
  {
    name: "HackDuke",
    location: "Durham, NC",
    date: "November 8-10, 2024",
    description: "Duke University's hackathon with a focus on social good, encouraging participants to create technology that makes a positive impact on society.",
    compatibilityScore: 88,
    reasonToAttend: "Emphasis on creating technology for social impact and ethical innovation."
  },
];

const HackathonDisplay = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {hackathonData.map((hackathon, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg">{hackathon.name}</CardTitle>
              <CardDescription>{hackathon.location}</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{hackathon.compatibilityScore}/100</div>
              <div className="text-sm text-muted-foreground">Compatibility Score</div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-2">{hackathon.date}</p>
            <p className="mb-2">{hackathon.description}</p>
            <p className="text-sm font-medium text-blue-600">Why attend: {hackathon.reasonToAttend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HackathonDisplay;