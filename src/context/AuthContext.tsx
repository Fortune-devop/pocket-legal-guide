
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
}

interface AuthContextType {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: User | null;
  signIn: (provider?: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is in localStorage
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsSignedIn(true);
    }
    setIsLoaded(true);
  }, []);

  const signIn = (provider?: string) => {
    // Create a mock user
    const mockUser = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@example.com',
      imageUrl: 'https://via.placeholder.com/150',
    };
    
    setUser(mockUser);
    setIsSignedIn(true);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    console.log(`Signed in${provider ? ` with ${provider}` : ''}`);
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem('mockUser');
    console.log('Signed out');
  };

  return (
    <AuthContext.Provider value={{ isLoaded, isSignedIn, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
