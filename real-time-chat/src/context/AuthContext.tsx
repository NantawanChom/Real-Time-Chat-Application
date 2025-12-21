import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '../utils/storage';

interface AuthState {
  isLoggedIn: boolean;
}

type AuthAction = { type: 'LOGIN' } | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      saveToLocalStorage('isLoggedIn', 'true');
      saveToLocalStorage('authToken', 'dummy-token');
      return { isLoggedIn: true };
    case 'LOGOUT':
      saveToLocalStorage('isLoggedIn', 'false');
      removeFromLocalStorage('authToken');
      return { isLoggedIn: false };
    default:
      throw new Error(`Unhandled action type: ${(action as AuthAction).type}`);
  }
};

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the AuthContext with default null value
const AuthContext = createContext<AuthContextType | null>(null);

// Custom Hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: JSON.parse(getFromLocalStorage('isLoggedIn') || 'false'),
  });

  const login = (): void => dispatch({ type: 'LOGIN' });
  const logout = (): void => dispatch({ type: 'LOGOUT' });

  const value: AuthContextType = {
    isLoggedIn: state.isLoggedIn,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
