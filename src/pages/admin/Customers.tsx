
import { useState } from "react";
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
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search } from "lucide-react";

const customers = [
  {
    id: "CUST-001",
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    created: "10/02/2025",
    orders: 2,
    totalSpent: "600 €",
    status: "active"
  },
  {
    id: "CUST-002",
    name: "María López",
    email: "maria.lopez@ejemplo.com",
    created: "15/02/2025",
    orders: 1,
    totalSpent: "100 €",
    status: "active"
  },
  {
    id: "CUST-003",
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@ejemplo.com",
    created: "01/03/2025",
    orders: 3,
    totalSpent: "1,100 €",
    status: "active"
  },
  {
    id: "CUST-004",
    name: "Laura Gómez",
    email: "laura.gomez@ejemplo.com",
    created: "12/03/2025",
    orders: 1,
    totalSpent: "500 €",
    status: "active"
  },
  {
    id: "CUST-005",
    name: "Pedro Martínez",
    email: "pedro.martinez@ejemplo.com",
    created: "20/03/2025",
    orders: 2,
    totalSpent: "600 €",
    status: "inactive"
  },
  {
    id: "CUST-006",
    name: "Ana Sánchez",
    email: "ana.sanchez@ejemplo.com",
    created: "25/03/2025",
    orders: 1,
    totalSpent: "500 €",
    status: "active"
  }
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer => {
    return customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           customer.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Button className="bg-bloodRed hover:bg-red-900">
          Añadir Cliente
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, email o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className="hidden md:table-cell">ID</TableHead>
                <TableHead className="hidden md:table-cell">Fecha Registro</TableHead>
                <TableHead>Pedidos</TableHead>
                <TableHead>Total Gastado</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{customer.id}</TableCell>
                  <TableCell className="hidden md:table-cell">{customer.created}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(customer.status)}>
                      {customer.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Acciones</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No se encontraron clientes que coincidan con la búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default Customers;
