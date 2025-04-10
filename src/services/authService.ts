
import { supabase } from "@/integrations/supabase/client";
import { storageService } from "./storageService";

// Tipos de usuario en la aplicación
export type UserRole = "admin" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Interfaz de autenticación
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Clave para el almacenamiento de sesión
const STORAGE_KEY = "protospark_auth";

// Cargar estado de autenticación del localStorage
const loadAuthState = (): AuthState => {
  try {
    const storedAuth = storageService.get<AuthState>(STORAGE_KEY);
    if (storedAuth) {
      return storedAuth;
    }
  } catch (error) {
    console.error("Error loading auth state", error);
  }
  return { user: null, isAuthenticated: false };
};

// Guardar estado de autenticación en localStorage
const saveAuthState = (state: AuthState): void => {
  try {
    storageService.set(STORAGE_KEY, state);
  } catch (error) {
    console.error("Error saving auth state", error);
  }
};

// Limpiar estado de autenticación del localStorage
const clearAuthState = (): void => {
  try {
    storageService.remove(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing auth state", error);
  }
};

// Demo users para facilitar el acceso sin necesitar Supabase Auth
const DEMO_USERS = [
  {
    email: "admin@protospark.com",
    password: "password",
    name: "Admin User",
    role: "admin" as UserRole,
    id: "00000000-0000-0000-0000-000000000001",
  },
  {
    email: "cliente@demo.com",
    password: "password",
    name: "Cliente Demo",
    role: "customer" as UserRole,
    id: "00000000-0000-0000-0000-000000000002",
  },
];

// Servicio de autenticación
export const authService = {
  currentAuthState: loadAuthState(),

  // Obtener el usuario actual
  getCurrentUser(): User | null {
    return this.currentAuthState.user;
  },

  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.currentAuthState.isAuthenticated && !!this.currentAuthState.user;
  },

  // Comprobar si el usuario tiene un rol específico
  hasRole(role: UserRole): boolean {
    return this.isAuthenticated() && this.currentAuthState.user?.role === role;
  },

  // Comprobar si el usuario es administrador
  isAdmin(): boolean {
    return this.hasRole("admin");
  },

  // Comprobar si el usuario es cliente
  isCustomer(): boolean {
    return this.hasRole("customer");
  },

  // Iniciar sesión - primero intenta con usuarios de demostración, luego con Supabase
  async login(email: string, password: string): Promise<User> {
    try {
      console.log("Attempting login with email:", email);
      
      if (!email || !password) {
        throw new Error("Email y contraseña son requeridos");
      }
      
      // Comprobar si es un usuario de demostración
      const demoUser = DEMO_USERS.find(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
      );

      if (demoUser) {
        console.log("Demo user login successful:", demoUser.email);
        const user: User = {
          id: demoUser.id,
          name: demoUser.name,
          email: demoUser.email,
          role: demoUser.role,
        };

        // Actualizar estado de autenticación
        this.currentAuthState = {
          user,
          isAuthenticated: true
        };

        saveAuthState(this.currentAuthState);
        return user;
      }

      // Si no es un usuario de demostración, intentar con Supabase
      console.log("Attempting Supabase auth with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Supabase login error:", error);
        throw new Error(error.message || "Error al iniciar sesión");
      }
      
      if (!data.user) {
        console.error("No user data returned from Supabase");
        throw new Error("No se pudo obtener la información del usuario");
      }
      
      console.log("Supabase auth successful, user:", data.user);
      
      // Determinar el rol basado en el email (en un sistema real, esto vendría de la base de datos)
      const role: UserRole = email.toLowerCase() === "admin@protospark.com" ? "admin" : "customer";
      
      // Crear objeto de usuario
      const user: User = {
        id: data.user.id,
        name: data.user.user_metadata?.name || email.split("@")[0],
        email: data.user.email || "",
        role,
        avatar: data.user.user_metadata?.avatar_url
      };
      
      // Actualizar estado de autenticación
      this.currentAuthState = {
        user,
        isAuthenticated: true
      };
      
      saveAuthState(this.currentAuthState);
      return user;
    } catch (error: any) {
      console.error("Error during login", error);
      clearAuthState(); // Limpiar en caso de error
      throw error;
    }
  },

  // Registrar un nuevo usuario
  async register(name: string, email: string, password: string): Promise<User> {
    try {
      if (!name || !email || !password) {
        throw new Error("Nombre, email y contraseña son requeridos");
      }
      
      // Comprobar si ya existe un usuario de demostración con ese email
      const existingDemoUser = DEMO_USERS.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (existingDemoUser) {
        throw new Error("Este usuario ya existe. Por favor utiliza un email diferente.");
      }

      // Intentar registrar con Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) {
        console.error("Supabase registration error:", error);
        throw new Error(error.message || "Error al registrar el usuario");
      }
      
      if (!data.user) {
        throw new Error("No se pudo crear el usuario");
      }
      
      // Crear objeto de usuario
      const user: User = {
        id: data.user.id,
        name,
        email: data.user.email || "",
        role: "customer", // Por defecto, los nuevos usuarios son clientes
      };
      
      // Actualizar estado de autenticación
      this.currentAuthState = {
        user,
        isAuthenticated: true
      };
      
      saveAuthState(this.currentAuthState);
      return user;
    } catch (error: any) {
      console.error("Error during registration", error);
      clearAuthState(); // Limpiar en caso de error
      throw error;
    }
  },

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      // Solo intentar cerrar sesión en Supabase si no es un usuario de demostración
      const currentUser = this.getCurrentUser();
      const isDemoUser = currentUser && DEMO_USERS.some(user => user.id === currentUser.id);
      
      if (!isDemoUser) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Supabase logout error:", error);
          throw error;
        }
      }
      
      this.currentAuthState = {
        user: null,
        isAuthenticated: false
      };
      
      clearAuthState(); // Usar función específica para limpiar
    } catch (error: any) {
      console.error("Error during logout", error);
      throw error;
    }
  },

  // Sincronizar con la sesión de Supabase
  async syncWithSupabase(): Promise<void> {
    try {
      console.log("Syncing with Supabase session");
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting Supabase session:", error);
        throw error;
      }
      
      console.log("Supabase session data:", data);
      
      if (data.session) {
        // Si hay una sesión activa en Supabase
        const user = data.session.user;
        const role: UserRole = user.email?.toLowerCase() === "admin@protospark.com" ? "admin" : "customer";
        
        this.currentAuthState = {
          user: {
            id: user.id,
            name: user.user_metadata?.name || user.email?.split("@")[0] || "",
            email: user.email || "",
            role,
            avatar: user.user_metadata?.avatar_url
          },
          isAuthenticated: true
        };
        
        saveAuthState(this.currentAuthState);
        console.log("Auth state updated from Supabase session:", this.currentAuthState);
      } else {
        // Verificar si hay un usuario demo en localStorage
        const storedAuth = loadAuthState();
        const demoUser = storedAuth.user && DEMO_USERS.some(user => user.id === storedAuth.user?.id);
        
        if (demoUser) {
          console.log("Demo user session found in localStorage:", storedAuth);
          this.currentAuthState = storedAuth;
        } else {
          // Si no hay sesión activa ni demo user
          console.log("No active session found in Supabase or localStorage");
          this.currentAuthState = {
            user: null,
            isAuthenticated: false
          };
          clearAuthState();
        }
      }
    } catch (error) {
      console.error("Error syncing with Supabase", error);
      // No limpiar auth state en caso de error de conexión para mantener sesión offline
    }
  }
};
