
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, Search, Filter } from "lucide-react";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders = [
    {
      id: "ORD-001",
      customer: "Juan Pérez",
      project: "App de Gestión de Tareas",
      date: "10/04/2025",
      status: "in_progress",
      type: "premium",
      price: "500 €",
      deadline: "16/04/2025",
    },
    {
      id: "ORD-002",
      customer: "María López",
      project: "Portal de Reservas",
      date: "05/04/2025",
      status: "pending",
      type: "normal",
      price: "100 €",
      deadline: "11/04/2025",
    },
    {
      id: "ORD-003",
      customer: "Carlos Rodríguez",
      project: "App de Delivery",
      date: "01/04/2025",
      status: "pending",
      type: "premium",
      price: "500 €",
      deadline: "11/04/2025",
    },
    {
      id: "ORD-004",
      customer: "Laura Gómez",
      project: "Dashboard Analítico",
      date: "28/03/2025",
      status: "in_progress",
      type: "premium",
      price: "500 €",
      deadline: "07/04/2025",
    },
    {
      id: "ORD-005",
      customer: "Pedro Martínez",
      project: "App de Fitness",
      date: "25/03/2025",
      status: "completed",
      type: "normal",
      price: "100 €",
      deadline: "31/03/2025",
    },
    {
      id: "ORD-006",
      customer: "Ana Sánchez",
      project: "Plataforma Educativa",
      date: "20/03/2025",
      status: "completed",
      type: "premium",
      price: "500 €",
      deadline: "30/03/2025",
    }
  ];

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "in_progress":
        return "En Desarrollo";
      case "completed":
        return "Completado";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Gestión de Pedidos</h1>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente, proyecto o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in_progress">En Desarrollo</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Tipo</TableHead>
                <TableHead className="hidden md:table-cell">Precio</TableHead>
                <TableHead>Fecha Límite</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.project}</TableCell>
                  <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={order.type === "premium" ? "default" : "outline"}>
                      {order.type === "premium" ? "Premium" : "Normal"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{order.price}</TableCell>
                  <TableCell>{order.deadline}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Acciones</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No se encontraron pedidos que coincidan con los filtros.
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

export default Orders;
