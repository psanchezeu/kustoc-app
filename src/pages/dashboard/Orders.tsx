
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpDown, 
  FileText, 
  MessageSquareText, // Corrected from MessageSquare 
  Clipboard, // Corrected from ClipboardList
  ChevronRight
} from "lucide-react"; // Make sure all icons are imported from lucide-react

const Orders = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Example order data
  const orders = [
    {
      id: "ORD-001",
      client: "Tech Solutions SL",
      type: "Premium",
      date: "2025-03-20",
      status: "completed",
      amount: 3000
    },
    {
      id: "ORD-002",
      client: "Inversiones Global",
      type: "Normal",
      date: "2025-03-25",
      status: "progress",
      amount: 1500
    },
    {
      id: "ORD-003",
      client: "Retail Connect",
      type: "Premium",
      date: "2025-04-01",
      status: "progress",
      amount: 3000
    },
    {
      id: "ORD-004",
      client: "Startup Visión",
      type: "Normal",
      date: "2025-04-05",
      status: "pending",
      amount: 1500
    },
    {
      id: "ORD-005",
      client: "Healthcare Plus",
      type: "Premium",
      date: "2025-04-08",
      status: "pending",
      amount: 3000
    }
  ];

  // Filter orders based on status and search query
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === "all" || order.status === filter;
    const matchesSearch = order.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Status badge component
  const StatusBadge = ({ status }) => {
    let color = "";
    let label = "";

    switch(status) {
      case "completed":
        color = "bg-green-100 text-green-800";
        label = "Completado";
        break;
      case "progress":
        color = "bg-blue-100 text-blue-800";
        label = "En Progreso";
        break;
      case "pending":
        color = "bg-yellow-100 text-yellow-800";
        label = "Pendiente";
        break;
      default:
        color = "bg-gray-100 text-gray-800";
        label = status;
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-left">Pedidos</h1>
          <p className="text-muted-foreground text-left">Gestiona y revisa todos los pedidos</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button className="bg-bloodRed hover:bg-red-900">
            <Clipboard className="mr-2 h-4 w-4" /> {/* Fixed icon from ClipboardList to Clipboard */}
            Nuevo Pedido
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Buscar por cliente o ID..." 
                className="pl-8" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select defaultValue={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="progress">En Progreso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="recent">
              <SelectTrigger>
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="oldest">Más antiguos</SelectItem>
                <SelectItem value="highest">Mayor importe</SelectItem>
                <SelectItem value="lowest">Menor importe</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium">Listado de Pedidos</CardTitle>
            <span className="text-sm text-muted-foreground">
              {filteredOrders.length} pedidos encontrados
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Importe</TableHead>
                <TableHead className="w-[100px] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.client}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status} />
                    </TableCell>
                    <TableCell className="text-right">{order.amount.toLocaleString('es-ES')} €</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <MessageSquareText className="h-4 w-4" /> {/* Fixed icon from MessageSquare to MessageSquareText */}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No se encontraron pedidos que coincidan con los filtros.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
