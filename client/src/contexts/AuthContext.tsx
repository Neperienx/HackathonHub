import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { LocalAuthService } from '@/lib/localAuth';

interface LocalUser {
  id: string;
  email: string;
  name: string;
  displayName: string;
  createdAt: string;
}

interface AuthContextType {
  user: LocalUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user on mount
    const currentUser = LocalAuthService.getCurrentUser();
    if (currentUser) {
      setUser({
        ...currentUser,
        displayName: currentUser.name
      });
    }
    setLoading(false);
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const result = LocalAuthService.signIn(email, password);
    if (result.success && result.user) {
      const authUser = {
        ...result.user,
        displayName: result.user.name
      };
      setUser(authUser);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    const result = LocalAuthService.signUp(email, password, name);
    if (result.success && result.user) {
      const authUser = {
        ...result.user,
        displayName: result.user.name
      };
      setUser(authUser);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const logout = async () => {
    LocalAuthService.signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}