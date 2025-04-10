
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "ORD-001",
      name: "Aplicación de Gestión de Tareas",
      date: "10 de abril, 2025",
      status: "En desarrollo",
      type: "Premium",
      price: "500 €",
      deliveryDate: "16 de abril, 2025",
      isActive: true,
    },
    {
      id: "ORD-002",
      name: "Portal de Reservas",
      date: "15 de marzo, 2025",
      status: "Entregado",
      type: "Normal",
      price: "100 €",
      deliveryDate: "21 de marzo, 2025",
      isActive: false,
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Pedidos</h1>
      </div>

      {orders.map((order) => (
        <Card key={order.id} className={order.isActive ? "border-bloodRed" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>{order.name}</CardTitle>
              <div className={`px-3 py-1 text-xs rounded-full ${
                order.status === "En desarrollo"
                  ? "bg-amber-100 text-amber-700"
                  : order.status === "Entregado"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}>
                {order.status}
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
                <p className="font-medium">{order.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo</p>
                <p className="font-medium">{order.type}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Precio</p>
                <p className="font-medium">{order.price}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Entrega</p>
                <p className="font-medium">{order.deliveryDate}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Solicitud original
              </Button>
              {order.status === "Entregado" ? (
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
      ))}
    </div>
  );
};

export default Orders;
