
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, User, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react";

const lineChartData = [
  { month: "Ene", pedidos: 5 },
  { month: "Feb", pedidos: 7 },
  { month: "Mar", pedidos: 10 },
  { month: "Abr", pedidos: 15 },
  { month: "May", pedidos: 20 },
  { month: "Jun", pedidos: 18 },
  { month: "Jul", pedidos: 22 },
  { month: "Ago", pedidos: 25 },
  { month: "Sep", pedidos: 30 },
  { month: "Oct", pedidos: 35 },
  { month: "Nov", pedidos: 32 },
  { month: "Dic", pedidos: 40 },
];

const pieChartData = [
  { name: "Normal", value: 60 },
  { name: "Premium", value: 40 },
];

const COLORS = ["#8884d8", "#8B0000"];

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <p className="text-sm text-muted-foreground">Última actualización: hace 5 minutos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pedidos Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+20% esta semana</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+15% este mes</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ingresos del Mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,500 €</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+32% vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mensajes No Leídos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <Button variant="link" size="sm" className="p-0 h-auto text-sm text-bloodRed mt-1">
              Ver todos
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pedidos Mensuales</CardTitle>
            <CardDescription>
              Evolución de pedidos durante el último año
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineChartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="pedidos"
                    stroke="#8B0000"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distribución de Pedidos</CardTitle>
            <CardDescription>
              Por tipo de prototipo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Últimos Pedidos</CardTitle>
            <CardDescription>
              Pedidos recientes que requieren atención
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">Aplicación de Gestión de Tareas</h4>
                      <p className="text-xs text-muted-foreground">
                        Cliente: Juan Pérez · {order === 1 ? "Hace 2 horas" : "Hace 1 día"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver detalles
                  </Button>
                </div>
              ))}
              <div className="text-center pt-2">
                <Button variant="link" className="text-bloodRed">
                  Ver todos los pedidos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mensajes Recientes</CardTitle>
            <CardDescription>
              Últimos mensajes de los clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((message) => (
                <div key={message} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium">María López</h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        Hace {message * 10} minutos
                      </p>
                      <p className="text-sm">
                        ¿Cuándo podré ver la primera versión del prototipo? Estoy ansiosa por...
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <div className="h-2 w-2 bg-bloodRed rounded-full"></div>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <Button variant="link" className="text-bloodRed">
                  Ver todos los mensajes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tareas Pendientes</CardTitle>
          <CardDescription>
            Próximas entregas y acciones requeridas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Prototipo de Portal de Reservas - Entrega hoy</h4>
                <p className="text-sm text-muted-foreground">
                  Faltan 6 horas para la entrega programada
                </p>
              </div>
              <Button className="ml-auto bg-bloodRed hover:bg-red-900">
                Revisar
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Prototipo de App de Delivery - Entrega mañana</h4>
                <p className="text-sm text-muted-foreground">
                  Faltan 28 horas para la entrega programada
                </p>
              </div>
              <Button className="ml-auto bg-bloodRed hover:bg-red-900">
                Revisar
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Nuevo pedido - Aplicación de Gestión de Tareas</h4>
                <p className="text-sm text-muted-foreground">
                  Asignar desarrollador y comenzar análisis
                </p>
              </div>
              <Button className="ml-auto" variant="outline">
                Asignar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
