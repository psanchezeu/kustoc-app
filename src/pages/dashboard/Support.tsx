
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle2, Clock, Search, Send, HelpCircle, FileText } from "lucide-react";

const Support = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [newTicket, setNewTicket] = useState({
    subject: "",
    message: "",
    project: "",
    priority: "normal"
  });
  
  // Dummy data for FAQs specifically for clients
  const clientFaqs = [
    {
      id: "review-request",
      question: "¿Cómo solicito una revisión de mi prototipo?",
      answer: "Para solicitar una revisión, ve a la sección 'Mis Pedidos', selecciona el prototipo en cuestión y haz clic en el botón 'Solicitar Revisión'. Describe detalladamente los cambios que necesitas y nuestro equipo los implementará según las revisiones incluidas en tu plan."
    },
    {
      id: "access-code",
      question: "¿Cómo accedo al código fuente de mi prototipo?",
      answer: "Una vez completado tu proyecto, recibirás un enlace al repositorio Git con el código fuente completo. Este enlace aparecerá en la sección 'Mis Pedidos' junto con la documentación. Si tienes problemas para acceder, contacta con nuestro soporte técnico."
    },
    {
      id: "additional-features",
      question: "¿Puedo añadir funcionalidades adicionales después de haber recibido mi prototipo?",
      answer: "Sí, puedes solicitar funcionalidades adicionales en cualquier momento. Estas solicitudes se cotizarán por separado según la complejidad de las nuevas características. Contacta con nosotros para evaluar tus necesidades y recibir un presupuesto personalizado."
    },
    {
      id: "deployment",
      question: "¿Cómo puedo desplegar mi prototipo para mostrarlo a otros?",
      answer: "Tu prototipo se entrega con instrucciones de despliegue y una versión ya desplegada en nuestra plataforma que puedes compartir mediante un enlace. Si necesitas ayuda para desplegar en tu propio dominio o servidor, nuestro equipo técnico puede asistirte por una tarifa adicional."
    },
    {
      id: "timeline-extension",
      question: "¿Qué pasa si necesito extender el plazo de entrega de mi proyecto?",
      answer: "Si necesitas más tiempo para revisar o proporcionar información para tu proyecto, infórmanos lo antes posible. Podemos ajustar los plazos dentro de lo razonable sin cargos adicionales, pero retrasos significativos podrían afectar la programación de otros proyectos."
    },
  ];
  
  // Dummy data for knowledge base articles
  const knowledgeBaseArticles = [
    {
      id: "getting-started",
      title: "Primeros pasos con tu prototipo",
      description: "Una guía completa para empezar a utilizar tu prototipo, entender sus funcionalidades y sacar el máximo provecho.",
      icon: CheckCircle2
    },
    {
      id: "review-process",
      title: "Proceso de revisión explicado",
      description: "Aprende cómo funciona nuestro proceso de revisión y cómo puedes maximizar el valor de tus revisiones incluidas.",
      icon: Clock
    },
    {
      id: "technical-guide",
      title: "Guía técnica para desarrolladores",
      description: "Información técnica detallada sobre la arquitectura, componentes y patrones utilizados en tu prototipo.",
      icon: FileText
    }
  ];
  
  // Dummy data for client's support tickets
  const supportTickets = [
    {
      id: "T-1234",
      subject: "Problema con el inicio de sesión",
      status: "Abierto",
      date: "10/04/2025",
      lastResponse: "Estamos investigando tu problema y te responderemos pronto."
    },
    {
      id: "T-1205",
      subject: "Solicitud de revisión",
      status: "Cerrado",
      date: "02/04/2025",
      lastResponse: "Revisión completada. Por favor verifica los cambios."
    }
  ];
  
  // Filter FAQs based on search
  const filteredFaqs = clientFaqs.filter(
    faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter knowledge base articles based on search
  const filteredArticles = knowledgeBaseArticles.filter(
    article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSubmitTicket = () => {
    if (!newTicket.subject || !newTicket.message) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive"
      });
      return;
    }
    
    // Here would go the actual ticket submission logic
    // For now we'll just show a success toast
    toast({
      title: "Ticket enviado",
      description: "Hemos recibido tu consulta y te responderemos a la brevedad.",
    });
    
    // Reset form
    setNewTicket({
      subject: "",
      message: "",
      project: "",
      priority: "normal"
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Centro de Soporte</h1>
        <p className="text-muted-foreground">
          Obtén ayuda rápida, consulta nuestra base de conocimiento o crea un nuevo ticket de soporte.
        </p>
      </div>
      
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid grid-cols-3 md:w-[500px]">
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" /> FAQs
          </TabsTrigger>
          <TabsTrigger value="knowledge">
            <FileText className="h-4 w-4 mr-2" /> Base de Conocimiento
          </TabsTrigger>
          <TabsTrigger value="tickets">
            <MessageIcon className="h-4 w-4 mr-2" /> Mis Tickets
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar respuestas..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-2">
                    {filteredFaqs.map(faq => (
                      <AccordionItem value={faq.id} key={faq.id} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-left hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No se encontraron resultados para "{searchTerm}". Por favor intenta con otra búsqueda o crea un ticket de soporte.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">¿No has encontrado lo que buscas?</h2>
              <p className="text-muted-foreground mb-4">
                Crea un nuevo ticket y nuestro equipo de soporte te responderá a la brevedad.
              </p>
              <Button 
                onClick={() => document.getElementById('new-ticket-section')?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-bloodRed hover:bg-red-900"
              >
                Crear Ticket de Soporte
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="knowledge" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar en la base de conocimiento..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map(article => (
                    <Card key={article.id} className="hover:shadow transition-all cursor-pointer">
                      <CardContent className="p-6 flex items-start space-x-4">
                        <article.icon className="h-6 w-6 text-bloodRed shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-2">{article.title}</h3>
                          <p className="text-sm text-muted-foreground">{article.description}</p>
                          <Button variant="link" className="text-bloodRed p-0 h-auto mt-2">
                            Leer artículo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-muted-foreground">
                      No se encontraron artículos para "{searchTerm}". Por favor intenta con otra búsqueda.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Mis Tickets</h2>
              
              {supportTickets.length > 0 ? (
                <div className="space-y-4">
                  {supportTickets.map(ticket => (
                    <Card key={ticket.id} className="hover:shadow transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{ticket.subject}</h3>
                            <div className="text-sm text-muted-foreground">
                              {ticket.id} • {ticket.date}
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            ticket.status === 'Abierto' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {ticket.status}
                          </div>
                        </div>
                        <p className="text-sm mt-3 text-muted-foreground">{ticket.lastResponse}</p>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">Ver detalles</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    No tienes tickets de soporte activos.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card id="new-ticket-section">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Crear Nuevo Ticket</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">
                    Asunto <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                    placeholder="Resume brevemente tu consulta"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="project">Proyecto</Label>
                  <Input
                    id="project"
                    value={newTicket.project}
                    onChange={(e) => setNewTicket({ ...newTicket, project: e.target.value })}
                    placeholder="Nombre de tu proyecto (si aplica)"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">
                    Mensaje <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={newTicket.message}
                    onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                    placeholder="Describe tu consulta con el mayor detalle posible"
                    className="mt-1 min-h-32"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="priority">Prioridad</Label>
                  <select
                    id="priority"
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full mt-1 border rounded-md p-2 bg-background"
                  >
                    <option value="low">Baja</option>
                    <option value="normal">Normal</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
                
                <Button 
                  onClick={handleSubmitTicket} 
                  className="bg-bloodRed hover:bg-red-900"
                >
                  Enviar Ticket
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Simple message icon component
const MessageIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default Support;
