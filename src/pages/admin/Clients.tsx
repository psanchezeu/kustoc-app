
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PencilIcon, Trash2Icon, PlusCircleIcon } from "lucide-react";

// Define the Profile interface based on the actual structure in Supabase
interface Profile {
  id: string;
  name: string;
  avatar?: string;
  created_at: string;
}

const formSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(50),
});

export default function ClientsAdmin() {
  const [clients, setClients] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Profile | null>(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");

      if (error) throw error;
      
      // Ensure data is the right type
      const typedData = data as Profile[];
      setClients(typedData);
    } catch (error: any) {
      console.error("Error fetching clients:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los clientes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const openEditDialog = (client: Profile) => {
    setCurrentClient(client);
    form.reset({
      name: client.name
    });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setCurrentClient(null);
    form.reset({
      name: ""
    });
    setIsDialogOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (currentClient) {
        // Actualizar cliente existente
        const { error } = await supabase
          .from("profiles")
          .update({
            name: values.name
          })
          .eq("id", currentClient.id);

        if (error) throw error;

        toast({
          title: "Cliente actualizado",
          description: "Los datos del cliente han sido actualizados correctamente",
        });
      } else {
        // Crear nuevo cliente (en una app real, esto normalmente se haría durante el registro)
        toast({
          title: "Información",
          description: "Los clientes se crean automáticamente cuando se registran. No se pueden crear manualmente.",
        });
      }
      
      setIsDialogOpen(false);
      fetchClients();
    } catch (error: any) {
      console.error("Error saving client:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar el cliente",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
      try {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Cliente eliminado",
          description: "El cliente ha sido eliminado correctamente",
        });
        
        fetchClients();
      } catch (error: any) {
        console.error("Error deleting client:", error);
        toast({
          title: "Error",
          description: error.message || "No se pudo eliminar el cliente",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
        <Button onClick={openAddDialog} className="bg-bloodRed hover:bg-red-900">
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Añadir Cliente
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bloodRed"></div>
        </div>
      ) : (
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha de creación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.length > 0 ? (
                clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.id.slice(0, 8)}...</TableCell>
                    <TableCell>{client.name}</TableCell>
                    <TableCell>
                      {new Date(client.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => openEditDialog(client)}
                        className="mr-2"
                      >
                        <PencilIcon className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(client.id)}
                      >
                        <Trash2Icon className="h-4 w-4 text-red-600" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No hay clientes registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentClient ? "Editar Cliente" : "Añadir Cliente"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-bloodRed hover:bg-red-900">
                  {currentClient ? "Guardar Cambios" : "Añadir Cliente"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
