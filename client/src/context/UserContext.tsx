// UserContext.tsx
import { createContext, useContext, ReactNode, useState } from 'react';

// Define the shape of your user data
export type User = {
  _id: string;
  name: string;
  email: string;
  seller: boolean;
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
} | undefined>(undefined);

// Create a provider component to wrap your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<Token | null>(null);

  // Function to set both user and token data
  const setUserAndToken = (newUser: User | null, newToken: Token | null) => {
    setUser(newUser);
    setToken(newToken);
  };

  return (
    <UserContext.Provider value={{ user, token, setUserAndToken }}>
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
