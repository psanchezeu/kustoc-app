
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "./RegisterForm";
import SocialLogin from "./SocialLogin";

const RegisterCard = () => {
  return (
    <Card className="border shadow-md w-full mx-auto">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
        <CardDescription className="text-muted-foreground">
          Regístrate para comenzar a crear tus prototipos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RegisterForm />
        <SocialLogin />
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
