'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user: auth0User } = useAuth0User();

  const [userData, setUserData] = useState({
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
  });

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

  const updateUserData = (updates) => {
    setUserData(prevUserData => ({ ...prevUserData, ...updates }));
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);