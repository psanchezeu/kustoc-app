
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

// Almacenamiento local para guardar los datos de autenticación
const STORAGE_KEY = "protospark_auth";

// Usuarios predefinidos para demostración
const demoUsers: User[] = [
  {
    id: "1",
    name: "Admin ProtoSpark",
    email: "admin@protospark.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Cliente Demo",
    email: "cliente@demo.com",
    role: "customer",
  }
];

// Cargar estado de autenticación del localStorage
const loadAuthState = (): AuthState => {
  try {
    const storedAuth = localStorage.getItem(STORAGE_KEY);
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
  } catch (error) {
    console.error("Error loading auth state", error);
  }
  return { user: null, isAuthenticated: false };
};

// Guardar estado de autenticación en localStorage
const saveAuthState = (state: AuthState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Error saving auth state", error);
  }
};

// Servicio de autenticación
export const authService = {
  currentAuthState: loadAuthState(),

  // Obtener el usuario actual
  getCurrentUser(): User | null {
    return this.currentAuthState.user;
  },

  // Comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.currentAuthState.isAuthenticated;
  },

  // Comprobar si el usuario tiene un rol específico
  hasRole(role: UserRole): boolean {
    return this.currentAuthState.user?.role === role;
  },

  // Comprobar si el usuario es administrador
  isAdmin(): boolean {
    return this.hasRole("admin");
  },

  // Comprobar si el usuario es cliente
  isCustomer(): boolean {
    return this.hasRole("customer");
  },

  // Iniciar sesión
  login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulamos una petición a un servidor
      setTimeout(() => {
        // En una implementación real, esto se haría con una llamada API
        // y el password se enviaría encriptado
        const user = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (user && password === "password") { // Contraseña demo para todos los usuarios
          this.currentAuthState = {
            user,
            isAuthenticated: true
          };
          
          saveAuthState(this.currentAuthState);
          resolve(user);
        } else {
          reject(new Error("Credenciales incorrectas"));
        }
      }, 500);
    });
  },

  // Registrar un nuevo usuario (solo para clientes)
  register(name: string, email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulamos una petición a un servidor
      setTimeout(() => {
        // Comprobar si el email ya está registrado
        const existingUser = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (existingUser) {
          reject(new Error("El email ya está registrado"));
          return;
        }
        
        // Crear nuevo usuario
        const newUser: User = {
          id: `${demoUsers.length + 1}`,
          name,
          email,
          role: "customer" // Los nuevos registros siempre son clientes
        };
        
        // Añadir a la lista (en una implementación real, esto sería una llamada API)
        demoUsers.push(newUser);
        
        // Iniciar sesión automáticamente
        this.currentAuthState = {
          user: newUser,
          isAuthenticated: true
        };
        
        saveAuthState(this.currentAuthState);
        resolve(newUser);
      }, 500);
    });
  },

  // Cerrar sesión
  logout(): void {
    this.currentAuthState = {
      user: null,
      isAuthenticated: false
    };
    
    saveAuthState(this.currentAuthState);
  }
};
