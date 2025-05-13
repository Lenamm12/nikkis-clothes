'use client';

import type { UserProfile } from '@/types';
import React, { createContext, useState, useEffect, useCallback } from 'react';

interface AuthContextType {
  user: UserProfile | null;
  login: (userData: UserProfile) => void;
  logout: () => void;
  addLikedItem: (itemId: string) => void;
  removeLikedItem: (itemId: string) => void;
  isItemLiked: (itemId: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load user from localStorage
    try {
      const storedUser = localStorage.getItem('nikkiClosetUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem('nikkiClosetUser'); // Clear corrupted data
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserProfile) => {
    const fullUserData = { ...userData, likedItems: userData.likedItems || [] };
    setUser(fullUserData);
    try {
      localStorage.setItem('nikkiClosetUser', JSON.stringify(fullUserData));
    } catch (error) {
      console.error("Failed to save user to localStorage", error);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('nikkiClosetUser');
    } catch (error) {
      console.error("Failed to remove user from localStorage", error);
    }
  };

  const addLikedItem = useCallback((itemId: string) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = {
        ...currentUser,
        likedItems: [...new Set([...currentUser.likedItems, itemId])]
      };
      try {
        localStorage.setItem('nikkiClosetUser', JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update liked items in localStorage", error);
      }
      return updatedUser;
    });
  }, []);

  const removeLikedItem = useCallback((itemId: string) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const updatedUser = {
        ...currentUser,
        likedItems: currentUser.likedItems.filter(id => id !== itemId)
      };
      try {
        localStorage.setItem('nikkiClosetUser', JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Failed to update liked items in localStorage", error);
      }
      return updatedUser;
    });
  }, []);
  
  const isItemLiked = useCallback((itemId: string) => {
    return user?.likedItems.includes(itemId) || false;
  }, [user]);


  if (isLoading) {
    // You might want to render a loading spinner or similar here
    // For simplicity, rendering children might cause a flash if localStorage is slow
    // but for mock, it's often fast enough.
    // Alternatively, return null or a loading component.
    return null; 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, addLikedItem, removeLikedItem, isItemLiked }}>
      {children}
    </AuthContext.Provider>
  );
};
