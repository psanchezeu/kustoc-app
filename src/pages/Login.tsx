
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

// Esquema de validación
const formSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Si el usuario ya está autenticado, redirigirlo
    if (isAuthenticated) {
      navigate(isAdmin ? "/admin" : "/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Configuración del formulario
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Función para manejar el envío del formulario
  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    
    try {
      await login(values.email, values.password);
      // La redirección se maneja en el useEffect
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a ProtoSpark",
      });
    } catch (error: any) {
      toast({
        title: "Error al iniciar sesión",
        description: error.message || "Credenciales incorrectas",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="tu@email.com" 
                        {...field} 
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="********" 
                        {...field} 
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-sm text-muted-foreground text-right">
                <Link to="/forgot-password" className="hover:text-primary">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-bloodRed hover:bg-red-900" 
                disabled={loading}
              >
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-bloodRed hover:underline">
                  Regístrate
                </Link>
              </div>
              
              {/* Demo de credenciales para facilitar pruebas */}
              <div className="text-xs text-muted-foreground border-t pt-4 mt-4">
                <p className="mb-2 font-medium">Credenciales de demo:</p>
                <p>Admin: admin@protospark.com / password</p>
                <p>Cliente: cliente@demo.com / password</p>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
