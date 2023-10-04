// UserContext.tsx
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

// Define the shape of your user data
export type User = {
  _id: string;
  name: string;
  email: string;
  availableBalance: Number ,
  lockedBalance: Number
};

// Define the shape of your token data
export type Token = {
  accessToken: string;
  refreshToken: string;
};

// Create the context
const UserContext = createContext<{
  user: User | null;
  token: Token | null;
  setUserAndToken: (user: User | null, token: Token | null) => void;
  setUserInfo:  (newUser: User | null)  => void;
} | undefined>(undefined);

// Create a provider component to wrap your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<Token | null>(null);

  // Function to set both user and token data
  const setUserAndToken = (newUser: User | null, newToken: Token | null) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
  };
    // Function to set both user and token data
    const setUserInfo = (newUser: User | null) => {
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser)); 
    };
  // Load user and token data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user'); 
    console.log('savedUser',savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, token, setUserAndToken, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to easily access user and token data
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
