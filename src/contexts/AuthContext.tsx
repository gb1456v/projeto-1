// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser, User } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, pass: string): boolean => {
    // --- INÍCIO DA DEPURAÇÃO ---
    console.log(`[AuthContext] A tentar login com email: ${email}`);
    
    const foundUser = Object.values(mockUser).find(u => u.email === email);
    
    if (foundUser) {
      console.log('[AuthContext] Utilizador encontrado:', foundUser.name);
    } else {
      console.error('[AuthContext] ERRO: Utilizador não encontrado na base de dados (mockData).');
      return false;
    }
    
    if (pass === '1234') {
      console.log('[AuthContext] Senha correta. A definir o utilizador...');
      setUser(foundUser);
      return true;
    } else {
      console.error(`[AuthContext] ERRO: Senha incorreta. Esperado: '1234', Recebido: '${pass}'`);
      setUser(null);
      return false;
    }
    // --- FIM DA DEPURAÇÃO ---
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;
  const value = { user, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};