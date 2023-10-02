import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken') || null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken') || null
  );

  const login = (tokens: { accessToken: string; refreshToken: string }) => {
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
