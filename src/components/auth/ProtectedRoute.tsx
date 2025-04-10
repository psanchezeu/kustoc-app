
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/services/authService";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: UserRole;
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Esperar a que se complete la carga de la autenticación
    if (!loading) {
      console.log(`Protected route ready. Auth status: ${isAuthenticated}, Role check: ${role ? (hasRole(role) ? 'pass' : 'fail') : 'no role required'}`);
      setIsReady(true);
    }
  }, [loading, isAuthenticated, hasRole, role]);

  // Mostrar loader mientras se verifica la autenticación
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bloodRed"></div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login preservando la ruta original
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir a una ruta apropiada
  if (role && !hasRole(role)) {
    console.log(`Role check failed. Required: ${role}`);
    
    // Si el usuario es administrador y está intentando acceder a una ruta de cliente
    if (hasRole("admin") && role === "customer") {
      console.log("Admin attempting to access customer route, redirecting to admin");
      return <Navigate to="/admin" replace />;
    }
    
    // Si el usuario es cliente y está intentando acceder a una ruta de administrador
    if (hasRole("customer") && role === "admin") {
      console.log("Customer attempting to access admin route, redirecting to dashboard");
      return <Navigate to="/dashboard" replace />;
    }
    
    // En cualquier otro caso, redirigir a la página principal
    console.log("Role mismatch, redirecting to home");
    return <Navigate to="/" replace />;
  }

  // Si todo está bien, mostrar los hijos
  return <>{children}</>;
};

export default ProtectedRoute;
