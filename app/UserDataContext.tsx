'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';

export type UserProfile = {
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
}

type UserDataContextType = {
  userData: UserProfile;
  updateUserData: (data: Partial<UserProfile>) => void;
}

const defaultUserData = {
  // Auth0 user properties
  email: '',
  emailVerified: false,
  name: '',
  nickname: '',
  picture: '',
  sub: '',
  updatedAt: '',
  orgId: '',

  // Additional profile properties
  profileColor: 'bg-fuchsia-500',
  bio: '',
  university: '',
  year: '',
  internship: '',
  hackathons: '',
  wins: '',
  technologies: '',
  techInterests: '',
  nonTechInterests: '',
  preferences: '',
  discord: '',
  linkedin: '',
}

const UserDataContext = createContext<UserDataContextType>({
  userData: defaultUserData,
  updateUserData: () => {},
});

export const UserDataProvider = ({ children } : {children: any}) => {
  const { user: auth0User } = useAuth0User();

  const [userData, setUserData] = useState<UserProfile>(defaultUserData);

  useEffect(() => {
    if (auth0User) {
      setUserData(prevUserData => ({
        ...prevUserData,
        email: auth0User.email || '',
        emailVerified: auth0User.email_verified || false,
        name: auth0User.name || '',
        nickname: auth0User.nickname || '',
        picture: auth0User.picture || '',
        sub: auth0User.sub || '',
        updatedAt: auth0User.updated_at || '',
        orgId: auth0User.org_id || '',
      }));
    }
  }, [auth0User]);

  const updateUserData = (updates : any) => {
    setUserData(prevUserData => ({ ...prevUserData, ...updates }));
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);