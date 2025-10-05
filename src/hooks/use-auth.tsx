import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const userSession = { email: user.email, id: user.id };
      setUser(userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
    } else {
      throw new Error('Email ou mot de passe incorrect');
    }
  };

  const signup = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Un compte existe déjà avec cet email');
    }
    
    const newUser = {
      email,
      password,
      id: Math.random().toString(36).substring(7),
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const userSession = { email: newUser.email, id: newUser.id };
    setUser(userSession);
    localStorage.setItem('user', JSON.stringify(userSession));
    
    toast({
      title: "Compte créé",
      description: "Votre compte a été créé avec succès",
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
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
