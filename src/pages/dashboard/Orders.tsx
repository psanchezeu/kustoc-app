
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { orderService, Order } from "@/services/orderService";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?.id) {
          const data = await orderService.getCustomerOrders(user.id);
          setOrders(data);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los pedidos. " + (error.message || ""),
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, toast]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd 'de' MMMM, yyyy", { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "in_progress":
        return "En desarrollo";
      case "completed":
        return "Entregado";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100/70 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500";
      case "in_progress":
        return "bg-blue-100/70 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "completed":
        return "bg-green-100/70 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100/70 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mis Pedidos</h1>
          <p className="text-muted-foreground">Gestiona y haz seguimiento de tus prototipos</p>
        </div>
        
        <Link to="/request-prototype">
          <Button className="bg-bloodRed hover:bg-red-900">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Prototipo
          </Button>
        </Link>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center space-y-4">
            <div className="mx-auto rounded-full bg-muted/50 p-6 w-max">
              <ClipboardList className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No tienes ningún pedido todavía</h3>
              <p className="text-muted-foreground">Crea tu primer prototipo para comenzar.</p>
            </div>
            <Link to="/request-prototype" className="inline-block mt-2">
              <Button className="bg-bloodRed hover:bg-red-900">
                <Plus className="mr-2 h-4 w-4" />
                Solicitar un prototipo
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card 
              key={order.id} 
              className={order.status === 'in_progress' ? "border-bloodRed/50 shadow-sm" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{order.project}</CardTitle>
                  <div className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">ID de Pedido</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Pedido</p>
                    <p className="font-medium">{formatDate(order.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <p className="font-medium capitalize">{order.type === 'premium' ? 'Premium' : 'Normal'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Precio</p>
                    <p className="font-medium">{order.price.toFixed(2)} €</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Entrega</p>
                    <p className="font-medium">{formatDate(order.deadline)}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Solicitud original
                  </Button>
                  {order.status === "completed" ? (
                    <>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver prototipo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Descargar archivos
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" disabled>
                      <Eye className="mr-2 h-4 w-4" />
                      Pendiente de entrega
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="ml-auto text-bloodRed hover:text-bloodRed/80 hover:bg-bloodRed/10">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contactar soporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
