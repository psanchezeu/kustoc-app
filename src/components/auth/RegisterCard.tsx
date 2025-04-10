
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./RegisterForm";
import SocialLogin from "./SocialLogin";
import { useState } from "react";

const RegisterCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Card className="border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
        <CardDescription>
          Regístrate para comenzar a crear tus prototipos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <SocialLogin isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
