import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/models';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: Record<string, string>) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        setUser(JSON.parse(userInfo));
        try {
          const profile = await authService.getProfile();
          if (profile) {
            setUser({ ...profile, token: JSON.parse(userInfo).token } as User);
          } else {
            throw new Error('Invalid token');
          }
        } catch (err) {
          localStorage.removeItem('userInfo');
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials: Record<string, string>) => {
    try {
      const data = await authService.login(credentials);
      if (data) {
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('Login successful');
        return true;
      }
      return false;
    } catch (err) {
      return false; 
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // ignore
    } finally {
      localStorage.removeItem('userInfo');
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook moved to src/hooks/useAuth.ts for Fast Refresh compatibility
