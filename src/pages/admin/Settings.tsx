
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un email válido.",
  }),
});

const emailFormSchema = z.object({
  notifyNewOrders: z.boolean().default(true),
  notifyMessages: z.boolean().default(true),
  notifyDeadlines: z.boolean().default(true),
  notifyCompletions: z.boolean().default(true),
  emailFooter: z.string().optional(),
});

const paymentFormSchema = z.object({
  stripeKey: z.string().min(1, {
    message: "La clave de API de Stripe es requerida.",
  }),
  currency: z.string().min(1, {
    message: "La moneda es requerida.",
  }),
  normalPrice: z.string().min(1, {
    message: "El precio del prototipo normal es requerido.",
  }),
  premiumPrice: z.string().min(1, {
    message: "El precio del prototipo premium es requerido.",
  }),
});

const Settings = () => {
  const { toast } = useToast();
  
  const profileForm = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Admin ProtoSpark",
      email: "admin@protospark.com",
    },
  });
  
  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      notifyNewOrders: true,
      notifyMessages: true,
      notifyDeadlines: true,
      notifyCompletions: true,
      emailFooter: "Equipo ProtoSpark - Convirtiendo ideas en prototipos",
    },
  });
  
  const paymentForm = useForm({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      stripeKey: "sk_test_...",
      currency: "EUR",
      normalPrice: "100",
      premiumPrice: "500",
    },
  });
  
  function onProfileSubmit(data) {
    toast({
      title: "Perfil actualizado",
      description: "Los datos del perfil han sido actualizados correctamente.",
    });
    console.log(data);
  }
  
  function onEmailSubmit(data) {
    toast({
      title: "Configuración de email actualizada",
      description: "Las preferencias de notificaciones han sido actualizadas.",
    });
    console.log(data);
  }
  
  function onPaymentSubmit(data) {
    toast({
      title: "Configuración de pagos actualizada",
      description: "Los ajustes de pago han sido actualizados correctamente.",
    });
    console.log(data);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Configuración</h1>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="payments">Pagos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>
                Gestiona tu información personal y preferencias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-bloodRed hover:bg-red-900">
                    Guardar Cambios
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contraseña</CardTitle>
              <CardDescription>
                Actualiza tu contraseña
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormLabel>Contraseña actual</FormLabel>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <FormLabel>Nueva contraseña</FormLabel>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <Input type="password" />
                </div>
              </div>
              <Button className="bg-bloodRed hover:bg-red-900">
                Actualizar Contraseña
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificaciones por Email</CardTitle>
              <CardDescription>
                Configura qué notificaciones quieres recibir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={emailForm.control}
                      name="notifyNewOrders"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Nuevos pedidos</FormLabel>
                            <FormDescription>
                              Recibir notificaciones cuando se realice un nuevo pedido
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailForm.control}
                      name="notifyMessages"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Mensajes</FormLabel>
                            <FormDescription>
                              Recibir notificaciones cuando hay nuevos mensajes
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailForm.control}
                      name="notifyDeadlines"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Plazos de entrega</FormLabel>
                            <FormDescription>
                              Recibir recordatorios de plazos de entrega próximos
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={emailForm.control}
                      name="notifyCompletions"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Finalizaciones</FormLabel>
                            <FormDescription>
                              Recibir notificaciones cuando un pedido se completa
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={emailForm.control}
                    name="emailFooter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pie de firma de email</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="bg-bloodRed hover:bg-red-900">
                    Guardar Preferencias
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Pagos</CardTitle>
              <CardDescription>
                Gestiona las opciones de pago y precios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)} className="space-y-6">
                  <FormField
                    control={paymentForm.control}
                    name="stripeKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Clave de API de Stripe</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={paymentForm.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Moneda</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="EUR" />
                              </FormControl>
                              <FormLabel>EUR (€)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="USD" />
                              </FormControl>
                              <FormLabel>USD ($)</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="GBP" />
                              </FormControl>
                              <FormLabel>GBP (£)</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={paymentForm.control}
                      name="normalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio Prototipo Normal</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={paymentForm.control}
                      name="premiumPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio Prototipo Premium</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="bg-bloodRed hover:bg-red-900">
                    Guardar Configuración
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
