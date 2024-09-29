"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  useUser as useAuth0User,
  UserProfile,
} from "@auth0/nextjs-auth0/client";

export type UserData = {
  // Auth0 user properties
  email: string;
  emailVerified: boolean;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updatedAt: string;
  orgId: string;

  // Additional profile properties
  profileColor: string;
  bio: string;
  university: string;
  year: string;
  internship: string;
  hackathons: string;
  wins: string;
  technologies: string;
  techInterests: string;
  nonTechInterests: string;
  preferences: string;
  discord: string;
  linkedin: string;
  videoUrl: string;
};

type UserDataContextType = {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  usersData: UserData[];
};

const defaultUserData = {
  // Auth0 user properties
  email: "",
  emailVerified: false,
  name: "",
  nickname: "",
  picture: "",
  sub: "",
  updatedAt: "",
  orgId: "",

  // Additional profile properties
  profileColor: "bg-fuchsia-500",
  bio: "",
  university: "",
  year: "",
  internship: "",
  hackathons: "",
  wins: "",
  technologies: "",
  techInterests: "",
  nonTechInterests: "",
  preferences: "",
  discord: "",
  linkedin: "",
  videoUrl: "",
};

const UserDataContext = createContext<UserDataContextType>({
  userData: defaultUserData,
  updateUserData: () => {},
  usersData: [],
});

export const UserDataProvider = ({ children }: { children: any }) => {
  const { user: auth0User } = useAuth0User();

  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [usersData, setUsersData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUserData = async (auth0User: UserProfile | undefined) => {
      if (!auth0User) return;
      setUserData(defaultUserData);
      console.log(auth0User.sub);

      const response = await fetch(`/api/users?sub=${auth0User.sub}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setUserData({ ...defaultUserData, ...data[0] });
      } else {
        // If user doesn't exist in the database, initialize with Auth0 data
        setUserData({
          ...defaultUserData,
          email: auth0User.email || "",
          emailVerified: auth0User.email_verified || false,
          name: auth0User.name || "",
          nickname: auth0User.nickname || "",
          picture: auth0User.picture || "",
          sub: auth0User.sub || "",
          updatedAt: auth0User.updated_at || "",
          orgId: auth0User.org_id || "",
        });
      }
    };

    fetchUserData(auth0User);
  }, [auth0User]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await fetch(`/api/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUsersData(data);
      console.log(data)
    };
    fetchUsersData();
  }, []);

  const updateUserData = (updates: any) => {
    setUserData((prevUserData) => ({ ...prevUserData, ...updates }));
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData, usersData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
