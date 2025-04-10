
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import RegisterCard from "@/components/auth/RegisterCard";

const Register = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = isAdmin ? "/admin" : "/dashboard";
      navigate(redirectPath);
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="container px-4 py-16 md:py-24 flex justify-center items-center min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md">
        <RegisterCard />
      </div>
    </div>
  );
};

export default Register;
