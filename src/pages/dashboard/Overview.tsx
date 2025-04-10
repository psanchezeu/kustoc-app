
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, MessageSquare, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Overview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Panel de Control</h1>
        <p className="text-sm text-muted-foreground">Última actualización: hace 5 minutos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estado actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-bloodRed">En Desarrollo</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tu prototipo está siendo construido
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tiempo restante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6 días</div>
            <p className="text-xs text-muted-foreground mt-1">
              Fecha estimada: 16 de Abril, 2025
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tipo de prototipo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Premium</div>
            <p className="text-xs text-muted-foreground mt-1">
              3 revisiones incluidas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mensajes no leídos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Última actividad: hace 20 minutos
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Progreso del Proyecto</CardTitle>
          <CardDescription>Estado actual del desarrollo de tu prototipo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Progreso General: 45%</div>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Análisis de Requisitos</h4>
                    <p className="text-sm text-muted-foreground">
                      Tu formulario ha sido analizado y los requisitos están confirmados.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Diseño de Interfaz</h4>
                    <p className="text-sm text-muted-foreground">
                      Los diseños principales de la interfaz están completados.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg border-bloodRed">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-bloodRed" />
                  </div>
                  <div>
                    <h4 className="font-medium">Desarrollo de Funcionalidades</h4>
                    <p className="text-sm text-muted-foreground">
                      Actualmente trabajando en la implementación de las funcionalidades seleccionadas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border rounded-lg opacity-60">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">Pruebas y Ajustes</h4>
                    <p className="text-sm text-muted-foreground">
                      Pendiente de iniciar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Mensajes Recientes</CardTitle>
            <CardDescription>
              Comunicación con el equipo de desarrollo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 border rounded-lg">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  AS
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">Ana Smith - Desarrollador</h4>
                    <span className="text-xs text-muted-foreground">Hoy, 10:45</span>
                  </div>
                  <p className="text-sm">
                    Hemos completado la fase de diseño y estamos avanzando con las funcionalidades que solicitaste. ¿Podrías aclarar un detalle sobre el proceso de autenticación?
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 p-3 border rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-bloodRed/10 flex items-center justify-center text-bloodRed">
                  Tú
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">Tú</h4>
                    <span className="text-xs text-muted-foreground">Hoy, 09:30</span>
                  </div>
                  <p className="text-sm">
                    ¡Gracias por la actualización! Me gustaría que la autenticación sea con email y contraseña, y también con Google si es posible.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/dashboard/chat">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ver todas las conversaciones
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Resumen de la Solicitud</CardTitle>
            <CardDescription>
              Detalles del prototipo solicitado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Nombre del Proyecto</h4>
                <p className="text-sm text-muted-foreground">
                  Aplicación de Gestión de Tareas
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Funcionalidades</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted px-2 py-1 rounded-md text-xs">
                    Autenticación
                  </span>
                  <span className="bg-muted px-2 py-1 rounded-md text-xs">
                    CRUD básico
                  </span>
                  <span className="bg-muted px-2 py-1 rounded-md text-xs">
                    Notificaciones
                  </span>
                  <span className="bg-muted px-2 py-1 rounded-md text-xs">
                    Diseño responsivo
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Público Objetivo</h4>
                <p className="text-sm text-muted-foreground">
                  Productividad
                </p>
              </div>
              
              <div className="mt-6">
                <Link to="/dashboard/orders">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver solicitud completa
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-bloodRed text-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">¿Necesitas más funcionalidades?</h3>
              <p className="text-white/80">
                Puedes solicitar cambios o añadir características adicionales a tu prototipo actual.
              </p>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-white/20">
              Solicitar mejoras
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
