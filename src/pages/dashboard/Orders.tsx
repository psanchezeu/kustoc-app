
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { orderService, Order } from "@/services/orderService";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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

  if (loading) {
    return <div className="text-center py-10">Cargando pedidos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-4">No tienes ningún pedido todavía.</p>
            <Button className="bg-bloodRed hover:bg-red-900">
              Solicitar un prototipo
            </Button>
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className={order.status === 'in_progress' ? "border-bloodRed" : ""}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{order.project}</CardTitle>
                <div className={`px-3 py-1 text-xs rounded-full ${
                  order.status === "in_progress"
                    ? "bg-amber-100 text-amber-700"
                    : order.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}>
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
                  <p className="font-medium">{order.type === 'premium' ? 'Premium' : 'Normal'}</p>
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
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Orders;
