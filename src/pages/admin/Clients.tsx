
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Search, Edit, Trash2, Mail, Phone, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  created_at?: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const { toast } = useToast();

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("name");

      if (error) throw error;
      setClients(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los clientes: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = async () => {
    try {
      if (!formData.name || !formData.email) {
        toast({
          title: "Campos requeridos",
          description: "Nombre y email son obligatorios",
          variant: "destructive",
        });
        return;
      }

      // Check if email already exists
      const { data: existingUsers } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", formData.email);

      if (existingUsers && existingUsers.length > 0) {
        toast({
          title: "Error",
          description: "Ya existe un cliente con este email",
          variant: "destructive",
        });
        return;
      }

      // Create a new auth user (would require proper server function in production)
      // For demo purposes just create profile entry
      const { data, error } = await supabase.from("profiles").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Cliente añadido",
        description: "El cliente ha sido añadido correctamente.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
      });
      setIsAddDialogOpen(false);
      fetchClients();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo añadir el cliente: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditClient = async () => {
    try {
      if (!currentClient || !formData.name || !formData.email) {
        toast({
          title: "Campos requeridos",
          description: "Nombre y email son obligatorios",
          variant: "destructive",
        });
        return;
      }

      // Update the client
      const { error } = await supabase
        .from("profiles")
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
        })
        .eq("id", currentClient.id);

      if (error) throw error;

      toast({
        title: "Cliente actualizado",
        description: "La información del cliente ha sido actualizada correctamente.",
      });

      setIsEditDialogOpen(false);
      fetchClients();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el cliente: " + error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteClient = async () => {
    try {
      if (!currentClient) return;

      // Delete the client
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", currentClient.id);

      if (error) throw error;

      toast({
        title: "Cliente eliminado",
        description: "El cliente ha sido eliminado correctamente.",
      });

      setIsDeleteDialogOpen(false);
      fetchClients();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el cliente: " + error.message,
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (client: Profile) => {
    setCurrentClient(client);
    setFormData({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (client: Profile) => {
    setCurrentClient(client);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-bloodRed hover:bg-red-900">
              <Plus className="mr-2 h-4 w-4" /> Añadir Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Añadir Nuevo Cliente</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@ejemplo.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nombre de la empresa"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button className="bg-bloodRed hover:bg-red-900" onClick={handleAddClient}>
                  Añadir Cliente
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, email o empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center">
            <div className="text-muted-foreground">
              <Users className="inline h-4 w-4 mr-1" /> {filteredClients.length} clientes
            </div>
          </div>
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Teléfono</TableHead>
                <TableHead className="hidden md:table-cell">Empresa</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Cargando clientes...
                  </TableCell>
                </TableRow>
              ) : filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {client.phone || "-"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {client.company || "-"}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(client)}
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(client)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`mailto:${client.email}`}>
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No se encontraron clientes que coincidan con la búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="edit-name">Nombre</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Teléfono</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-company">Empresa</Label>
              <Input
                id="edit-company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button className="bg-bloodRed hover:bg-red-900" onClick={handleEditClient}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Eliminar Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p>
              ¿Estás seguro que deseas eliminar a{" "}
              <strong>{currentClient?.name}</strong>? Esta acción no se puede
              deshacer.
            </p>
            <div className="flex justify-end gap-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={handleDeleteClient}
              >
                Eliminar Cliente
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
