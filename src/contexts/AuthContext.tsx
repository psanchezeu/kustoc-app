
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, User, UserRole } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";

// Definir el tipo para el contexto
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  hasRole: (role: UserRole) => boolean;
}

// Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para el proveedor
interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const { toast } = useToast();

  // Actualizar el estado cuando cambia el estado de autenticación
  useEffect(() => {
    setUser(authService.getCurrentUser());
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  // Iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: "Sesión iniciada",
        description: `Bienvenido/a, ${user.name}`,
      });
    } catch (error) {
      toast({
        title: "Error al iniciar sesión",
        description: error instanceof Error ? error.message : "Credenciales incorrectas",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Cerrar sesión
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  // Registrar un nuevo usuario
  const register = async (name: string, email: string, password: string) => {
    try {
      const user = await authService.register(name, email, password);
      setUser(user);
      setIsAuthenticated(true);
      
      toast({
        title: "Registro completado",
        description: `Bienvenido/a, ${name}`,
      });
    } catch (error) {
      toast({
        title: "Error al registrar",
        description: error instanceof Error ? error.message : "No se pudo completar el registro",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Comprobar si el usuario tiene un rol específico
  const hasRole = (role: UserRole) => {
    return user?.role === role;
  };

  // Valores que se proveerán a través del contexto
  const value = {
    user,
    isAuthenticated,
    isAdmin: user?.role === "admin",
    isCustomer: user?.role === "customer",
    login,
    logout,
    register,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
