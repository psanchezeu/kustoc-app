
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  newPassword: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
  confirmPassword: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const Profile = () => {
  const { toast } = useToast();
  
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Cliente Demo",
      email: "cliente@demo.com",
      company: "Demo Company",
      phone: "+34 123 456 789",
    },
  });
  
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: "Perfil actualizado",
      description: "Tu información de perfil ha sido actualizada correctamente.",
    });
    console.log(data);
  }
  
  function onPasswordSubmit(data: PasswordFormValues) {
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido actualizada correctamente.",
    });
    console.log(data);
    passwordForm.reset();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Información del Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="/placeholder.svg" alt="Cliente Demo" />
              <AvatarFallback className="text-2xl">CD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">Cliente Demo</h2>
            <p className="text-sm text-muted-foreground">cliente@demo.com</p>
            <div className="mt-4 flex gap-2">
              <Badge>Cliente</Badge>
              <Badge variant="outline">1 Proyecto Activo</Badge>
            </div>
            
            <Separator className="my-6" />
            
            <div className="w-full space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Miembro desde</p>
                <p className="font-medium">10 de abril, 2025</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Último login</p>
                <p className="font-medium">Hoy, 10:30</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de la Cuenta</CardTitle>
              <CardDescription>
                Gestiona tu información personal y contraseña
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="password">Contraseña</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4 mt-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} disabled />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Empresa</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit" className="bg-bloodRed hover:bg-red-900">
                        Guardar Cambios
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="password">
                  <Form {...passwordForm}>
                    <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 mt-4">
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña actual</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nueva contraseña</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirmar contraseña</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="bg-bloodRed hover:bg-red-900">
                        Actualizar Contraseña
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo quieres recibir actualizaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificaciones por Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Recibe actualizaciones sobre tu proyecto por email
                  </p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificaciones en la Plataforma</h3>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones en tiempo real
                  </p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="border border-destructive">
        <CardHeader className="text-destructive">
          <CardTitle>Zona de Peligro</CardTitle>
          <CardDescription>
            Estas acciones no se pueden deshacer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Eliminar cuenta</h3>
              <p className="text-sm text-muted-foreground">
                Eliminar permanentemente tu cuenta y todos tus datos
              </p>
            </div>
            <Button variant="destructive">Eliminar Cuenta</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
