
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, User, UserRole } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  loading: boolean;
  hasRole: (role: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  isCustomer: false,
  login: async () => ({ id: '', name: '', email: '', role: 'customer' }),
  register: async () => ({ id: '', name: '', email: '', role: 'customer' }),
  logout: async () => {},
  loading: true,
  hasRole: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    user: authService.getCurrentUser(),
    isAuthenticated: authService.isAuthenticated(),
    isAdmin: authService.isAdmin(),
    isCustomer: authService.isCustomer(),
  });

  useEffect(() => {
    // Configurar escucha para cambios de autenticación de Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change:", event, session);
        
        // Si hay una sesión o el evento es SIGNED_OUT, sincronizar con Supabase
        if (session || event === 'SIGNED_OUT') {
          await authService.syncWithSupabase();
          
          setState({
            user: authService.getCurrentUser(),
            isAuthenticated: authService.isAuthenticated(),
            isAdmin: authService.isAdmin(),
            isCustomer: authService.isCustomer(),
          });
        }
      }
    );
    
    // Sincronizar con Supabase al iniciar
    const syncInitialAuth = async () => {
      try {
        await authService.syncWithSupabase();
        setState({
          user: authService.getCurrentUser(),
          isAuthenticated: authService.isAuthenticated(),
          isAdmin: authService.isAdmin(),
          isCustomer: authService.isCustomer(),
        });
      } catch (error) {
        console.error('Error syncing initial auth state:', error);
      } finally {
        setLoading(false);
      }
    };
    
    syncInitialAuth();
    
    // Limpieza al desmontar
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setState({
        user: authService.getCurrentUser(),
        isAuthenticated: authService.isAuthenticated(),
        isAdmin: authService.isAdmin(),
        isCustomer: authService.isCustomer(),
      });
      return user;
    } catch (error) {
      console.error("Login error in AuthContext:", error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const user = await authService.register(name, email, password);
      setState({
        user: authService.getCurrentUser(),
        isAuthenticated: authService.isAuthenticated(),
        isAdmin: authService.isAdmin(),
        isCustomer: authService.isCustomer(),
      });
      return user;
    } catch (error) {
      console.error("Register error in AuthContext:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isCustomer: false,
      });
    } catch (error) {
      console.error("Logout error in AuthContext:", error);
      throw error;
    }
  };

  const hasRole = (role: UserRole) => {
    return authService.hasRole(role);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        loading,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
