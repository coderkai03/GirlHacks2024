import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const hackathonData = [
  {
    name: "TechCrunch Disrupt",
    location: "San Francisco, CA",
    date: "October 15-17, 2024",
    description: "One of the biggest startup events in the tech industry, featuring a hackathon alongside pitch competitions and networking opportunities.",
  },
  {
    name: "HackMIT",
    location: "Cambridge, MA",
    date: "September 20-22, 2024",
    description: "MIT's annual hackathon, bringing together students from around the world to create innovative projects in just 36 hours.",
  },
  {
    name: "PennApps",
    location: "Philadelphia, PA",
    date: "September 6-8, 2024",
    description: "The world's first college hackathon, hosted by the University of Pennsylvania, focusing on cutting-edge technology and interdisciplinary collaboration.",
  },
  {
    name: "TreeHacks",
    location: "Stanford, CA",
    date: "February 14-16, 2025",
    description: "Stanford University's hackathon, emphasizing social impact and innovative solutions to real-world problems.",
  },
  {
    name: "HackTheNorth",
    location: "Waterloo, ON, Canada",
    date: "September 13-15, 2024",
    description: "Canada's biggest hackathon, hosted at the University of Waterloo, featuring international participants and industry sponsors.",
  },
  {
    name: "MHacks",
    location: "Ann Arbor, MI",
    date: "October 11-13, 2024",
    description: "University of Michigan's premier hackathon, known for its large scale and diverse range of tracks and challenges.",
  },
  {
    name: "HackGT",
    location: "Atlanta, GA",
    date: "October 25-27, 2024",
    description: "Georgia Tech's hackathon, focusing on innovation in various fields including AI, IoT, and sustainability.",
  },
  {
    name: "CalHacks",
    location: "Berkeley, CA",
    date: "November 1-3, 2024",
    description: "UC Berkeley's largest hackathon, attracting thousands of hackers from around the world to compete and create groundbreaking projects.",
  },
  {
    name: "LAHacks",
    location: "Los Angeles, CA",
    date: "March 21-23, 2025",
    description: "UCLA's hackathon, bringing together students from across Southern California and beyond for a weekend of coding and creativity.",
  },
  {
    name: "HackDuke",
    location: "Durham, NC",
    date: "November 8-10, 2024",
    description: "Duke University's hackathon with a focus on social good, encouraging participants to create technology that makes a positive impact on society.",
  },
];

const HackathonDisplay = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {hackathonData.map((hackathon, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle>{hackathon.name}</CardTitle>
            <CardDescription>{hackathon.location}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="font-semibold mb-2">{hackathon.date}</p>
            <p>{hackathon.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HackathonDisplay;