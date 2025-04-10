
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, User, UserRole } from '@/services/authService';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    // Configurar escucha para cambios de autenticación de Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change:", event, session);
        
        // Si hay una sesión o el evento es SIGNED_OUT, sincronizar con Supabase
        if (session || event === 'SIGNED_OUT') {
          // Usar setTimeout para evitar deadlock con Supabase auth
          setTimeout(() => {
            authService.syncWithSupabase().then(() => {
              setState({
                user: authService.getCurrentUser(),
                isAuthenticated: authService.isAuthenticated(),
                isAdmin: authService.isAdmin(),
                isCustomer: authService.isCustomer(),
              });
            }).catch(error => {
              console.error('Error syncing with Supabase after auth change:', error);
            });
          }, 0);
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
      subscription?.unsubscribe?.();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const user = await authService.login(email, password);
      setState({
        user: authService.getCurrentUser(),
        isAuthenticated: authService.isAuthenticated(),
        isAdmin: authService.isAdmin(),
        isCustomer: authService.isCustomer(),
      });
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${user.name || email}`,
      });
      return user;
    } catch (error: any) {
      console.error("Login error in AuthContext:", error);
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales incorrectas",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const user = await authService.register(name, email, password);
      setState({
        user: authService.getCurrentUser(),
        isAuthenticated: authService.isAuthenticated(),
        isAdmin: authService.isAdmin(),
        isCustomer: authService.isCustomer(),
      });
      toast({
        title: "Registro exitoso",
        description: `Bienvenido, ${name}`,
      });
      return user;
    } catch (error: any) {
      console.error("Register error in AuthContext:", error);
      toast({
        title: "Error al registrarse",
        description: error.message || "No se pudo completar el registro",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setState({
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isCustomer: false,
      });
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente"
      });
    } catch (error: any) {
      console.error("Logout error in AuthContext:", error);
      toast({
        title: "Error al cerrar sesión",
        description: error.message || "Ocurrió un error al cerrar sesión",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
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
