
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/services/authService";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: UserRole;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole } = useAuth();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir a una ruta apropiada
  if (role && !hasRole(role)) {
    // Si el usuario es administrador y está intentando acceder a una ruta de cliente
    if (hasRole("admin") && role === "customer") {
      return <Navigate to="/admin" />;
    }
    
    // Si el usuario es cliente y está intentando acceder a una ruta de administrador
    if (hasRole("customer") && role === "admin") {
      return <Navigate to="/dashboard" />;
    }
    
    // En cualquier otro caso, redirigir a la página principal
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
