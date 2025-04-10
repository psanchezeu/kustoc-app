
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ArrowRight, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const features = [
  { id: "auth", label: "Autenticación de usuarios" },
  { id: "chat", label: "Chat / Mensajería" },
  { id: "ai", label: "Inteligencia Artificial" },
  { id: "payments", label: "Pasarela de pagos" },
  { id: "admin", label: "Panel de administración" },
  { id: "notifications", label: "Notificaciones" },
  { id: "crud", label: "CRUD básico" },
  { id: "file_upload", label: "Subida de archivos" },
  { id: "api", label: "Integración con APIs" },
  { id: "real_time", label: "Actualización en tiempo real" },
  { id: "mobile", label: "Diseño responsivo" },
  { id: "analytics", label: "Analítica básica" },
];

const targetAudiences = [
  { id: "b2b", label: "B2B - Empresas" },
  { id: "b2c", label: "B2C - Consumidores" },
  { id: "education", label: "Educación" },
  { id: "health", label: "Salud" },
  { id: "finance", label: "Finanzas" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "social", label: "Social" },
  { id: "productivity", label: "Productividad" },
];

const RequestPrototype = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [targetAudience, setTargetAudience] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"normal" | "premium" | null>(null);
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    additionalInfo: "",
    files: [],
  });
  
  const handleFeaturesChange = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        files: Array.from(e.target.files),
      });
    }
  };
  
  const handleNextStep = () => {
    if (formStep === 1) {
      if (!formData.projectName || !formData.projectDescription) {
        toast({
          title: "Información incompleta",
          description: "Por favor completa todos los campos obligatorios.",
          variant: "destructive",
        });
        return;
      }
      
      if (selectedFeatures.length === 0) {
        toast({
          title: "Selecciona al menos una funcionalidad",
          description: "Necesitamos saber qué funcionalidades necesitas en tu prototipo.",
          variant: "destructive",
        });
        return;
      }
      
      if (!targetAudience) {
        toast({
          title: "Selecciona un público objetivo",
          description: "Por favor indica para qué tipo de usuarios es tu aplicación.",
          variant: "destructive",
        });
        return;
      }
    }
    
    if (formStep === 2 && !selectedPlan) {
      toast({
        title: "Selecciona un plan",
        description: "Por favor elige un tipo de prototipo para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setFormStep((prev) => prev + 1);
  };
  
  const handlePlanSelect = (plan: "normal" | "premium") => {
    setSelectedPlan(plan);
  };
  
  const handlePreviousStep = () => {
    setFormStep((prev) => prev - 1);
  };
  
  const handleSubmit = () => {
    // Aquí se implementaría la integración con Stripe
    // Por ahora, simulamos una redirección al dashboard
    toast({
      title: "¡Pago completado!",
      description: "Tu solicitud de prototipo ha sido recibida.",
    });
    
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="container px-4 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Solicitar un Prototipo
        </h1>
        <p className="text-muted-foreground">
          Completa el formulario para comenzar a crear tu prototipo personalizado.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto mb-8">
        {/* Stepper */}
        <div className="flex justify-between mb-8">
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${formStep >= 1 ? "bg-bloodRed text-white" : "bg-muted text-muted-foreground"}`}>
              1
            </div>
            <span className="text-sm mt-2">Detalles</span>
          </div>
          <div className="flex-1 flex items-center px-4">
            <div className={`h-1 w-full ${formStep >= 2 ? "bg-bloodRed" : "bg-muted"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${formStep >= 2 ? "bg-bloodRed text-white" : "bg-muted text-muted-foreground"}`}>
              2
            </div>
            <span className="text-sm mt-2">Plan</span>
          </div>
          <div className="flex-1 flex items-center px-4">
            <div className={`h-1 w-full ${formStep >= 3 ? "bg-bloodRed" : "bg-muted"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${formStep >= 3 ? "bg-bloodRed text-white" : "bg-muted text-muted-foreground"}`}>
              3
            </div>
            <span className="text-sm mt-2">Pago</span>
          </div>
        </div>
        
        {/* Form Steps */}
        <Card className="p-6 border-2">
          {formStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Información del Proyecto</h2>
                <div>
                  <Label htmlFor="projectName">
                    Nombre del Proyecto <span className="text-bloodRed">*</span>
                  </Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    placeholder="Ej. App de Delivery de Comida"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="projectDescription">
                    Descripción del Proyecto <span className="text-bloodRed">*</span>
                  </Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    placeholder="Describe brevemente tu idea, objetivo principal y qué problema resuelve..."
                    className="mt-1 min-h-32"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Funcionalidades <span className="text-bloodRed">*</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecciona las funcionalidades que necesitas en tu prototipo (mínimo 1)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {features.map((feature) => (
                    <div
                      key={feature.id}
                      className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${
                        selectedFeatures.includes(feature.id)
                          ? "border-bloodRed bg-red-50/50"
                          : "border-border"
                      }`}
                      onClick={() => handleFeaturesChange(feature.id)}
                    >
                      <Checkbox
                        id={`feature-${feature.id}`}
                        checked={selectedFeatures.includes(feature.id)}
                        onCheckedChange={() => handleFeaturesChange(feature.id)}
                      />
                      <label
                        htmlFor={`feature-${feature.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                      >
                        {feature.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Público Objetivo <span className="text-bloodRed">*</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Selecciona el público principal al que va dirigido tu proyecto
                </p>
                <RadioGroup
                  value={targetAudience}
                  onValueChange={setTargetAudience}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
                >
                  {targetAudiences.map((audience) => (
                    <div
                      key={audience.id}
                      className={`border rounded-md p-3 cursor-pointer transition-colors ${
                        targetAudience === audience.id
                          ? "border-bloodRed bg-red-50/50"
                          : "border-border"
                      }`}
                    >
                      <RadioGroupItem
                        value={audience.id}
                        id={`audience-${audience.id}`}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`audience-${audience.id}`}
                        className="text-sm font-medium flex items-center justify-between cursor-pointer"
                      >
                        {audience.label}
                        {targetAudience === audience.id && (
                          <CheckCircle2 className="h-4 w-4 text-bloodRed" />
                        )}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Información Adicional</h3>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  placeholder="Cualquier detalle adicional que quieras compartir sobre tu proyecto..."
                  className="min-h-24"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Adjuntar Archivos</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Opcional: Adjunta imágenes, documentos o bocetos que nos ayuden a entender mejor tu proyecto
                </p>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Formatos aceptados: PDF, PNG, JPG, JPEG, SVG (máx. 10MB por archivo)
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleNextStep}
                  className="w-full bg-bloodRed hover:bg-red-900"
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {formStep === 2 && (
            <div className="space-y-8">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold">Selecciona tu Plan</h2>
                <p className="text-muted-foreground">
                  Elige el tipo de prototipo que mejor se adapte a tus necesidades
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedPlan === "normal" ? "border-bloodRed bg-red-50/50" : ""
                  }`}
                  onClick={() => handlePlanSelect("normal")}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Prototipo Normal</h3>
                    <div className="text-3xl font-bold">100 €</div>
                    <p className="text-muted-foreground mt-1">Entrega en 6 días</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                      <span>Prototipo funcional básico</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                      <span>Chat de soporte 5/7</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                      <span>1 revisión incluida</span>
                    </li>
                  </ul>
                </div>

                <div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md relative ${
                    selectedPlan === "premium" ? "border-bloodRed bg-red-50/50" : ""
                  }`}
                  onClick={() => handlePlanSelect("premium")}
                >
                  <div className="absolute top-0 right-0 bg-bloodRed text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                    Recomendado
                  </div>
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">Prototipo Premium</h3>
                    <div className="text-3xl font-bold">500 €</div>
                    <p className="text-muted-foreground mt-1">Entrega en 10 días</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                      <span>Prototipo con funcionalidades avanzadas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                      <span>Chat de soporte 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                      <span>3 revisiones incluidas</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                      <span>Documentación detallada</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
                      <span>Reunión de presentación</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="flex-1"
                >
                  Atrás
                </Button>
                <Button
                  onClick={handleNextStep}
                  className="flex-1 bg-bloodRed hover:bg-red-900"
                >
                  Continuar al Pago
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {formStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold">Resumen y Pago</h2>
                <p className="text-muted-foreground">
                  Revisa los detalles y completa tu pedido
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Resumen del Pedido</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Proyecto:</span>
                      <span className="font-medium">{formData.projectName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plan:</span>
                      <span className="font-medium">
                        {selectedPlan === "normal" ? "Prototipo Normal" : "Prototipo Premium"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tiempo de entrega:</span>
                      <span className="font-medium">
                        {selectedPlan === "normal" ? "6 días" : "10 días"}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>
                          {selectedPlan === "normal" ? "100 €" : "500 €"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Método de Pago</h3>
                  <Tabs defaultValue="card">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="card">Tarjeta de Crédito</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Fecha de Caducidad</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/AA"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">Código de Seguridad (CVC)</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                        <Input
                          id="cardName"
                          placeholder="Nombre completo"
                          className="mt-1"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="paypal" className="mt-4">
                      <div className="text-center p-4 border rounded-lg">
                        <p className="mb-2">
                          Serás redirigido a PayPal para completar el pago de forma segura.
                        </p>
                        <div className="py-4">
                          <svg className="mx-auto" width="124" height="33" viewBox="0 0 124 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46.4375 9.5H50.6094C52.8281 9.5 53.9219 10.5938 53.9219 12.3594C53.9219 14.125 52.8281 15.2656 50.6094 15.2656H48.4375V18.5H46.4375V9.5ZM50.6094 13.4844C51.4531 13.4844 51.8906 13.0469 51.8906 12.3594C51.8906 11.6719 51.4531 11.2344 50.6094 11.2344H48.4375V13.4844H50.6094Z" fill="#253B80"/>
                            <path d="M59.9688 18.5H57.9688V17.7188H57.9375C57.6094 18.3125 56.9375 18.625 56.125 18.625C54.5938 18.625 53.4375 17.375 53.4375 15.6094C53.4375 13.8125 54.5625 12.5781 56.125 12.5781C56.9375 12.5781 57.6094 12.8594 57.9375 13.4531H57.9688V12.7031H59.9688V18.5ZM56.875 16.9062C57.6406 16.9062 58.0312 16.3594 58.0312 15.6094C58.0312 14.8594 57.625 14.2969 56.875 14.2969C56.0938 14.2969 55.6875 14.8594 55.6875 15.6094C55.6875 16.3594 56.0781 16.9062 56.875 16.9062Z" fill="#253B80"/>
                            <path d="M69.2188 18.5H67.2188V15.1719C67.2188 14.4219 66.9219 14.1094 66.375 14.1094C65.8281 14.1094 65.5 14.4688 65.5 15.2656V18.5H63.5V15.1719C63.5 14.4219 63.2031 14.1094 62.6562 14.1094C62.1094 14.1094 61.7812 14.4688 61.7812 15.2656V18.5H59.7812V12.7031H61.7812V13.5156H61.8125C62.1094 12.9844 62.7031 12.5781 63.5625 12.5781C64.375 12.5781 64.9375 12.9219 65.25 13.6094C65.6562 12.9219 66.2656 12.5781 67.1562 12.5781C68.4688 12.5781 69.2188 13.4062 69.2188 14.9844V18.5Z" fill="#253B80"/>
                            <path d="M80.0625 18.5H78.0625V15.1719C78.0625 14.4219 77.7656 14.1094 77.2188 14.1094C76.6719 14.1094 76.3438 14.4688 76.3438 15.2656V18.5H74.3438V15.1719C74.3438 14.4219 74.0469 14.1094 73.5 14.1094C72.9531 14.1094 72.625 14.4688 72.625 15.2656V18.5H70.625V12.7031H72.625V13.5156H72.6562C72.9531 12.9844 73.5469 12.5781 74.4062 12.5781C75.2188 12.5781 75.7812 12.9219 76.0938 13.6094C76.5 12.9219 77.1094 12.5781 78 12.5781C79.3125 12.5781 80.0625 13.4062 80.0625 14.9844V18.5Z" fill="#253B80"/>
                            <path d="M86.5312 18.5H84.5312V17.7188H84.5C84.1719 18.3125 83.5 18.625 82.6875 18.625C81.1562 18.625 80 17.375 80 15.6094C80 13.8125 81.125 12.5781 82.6875 12.5781C83.5 12.5781 84.1719 12.8594 84.5 13.4531H84.5312V12.7031H86.5312V18.5ZM83.4375 16.9062C84.2031 16.9062 84.5938 16.3594 84.5938 15.6094C84.5938 14.8594 84.1875 14.2969 83.4375 14.2969C82.6562 14.2969 82.25 14.8594 82.25 15.6094C82.25 16.3594 82.6406 16.9062 83.4375 16.9062Z" fill="#253B80"/>
                            <path d="M88.1562 11.0781C87.4688 11.0781 86.9062 10.5156 86.9062 9.82812C86.9062 9.09375 87.4688 8.54688 88.1562 8.54688C88.875 8.54688 89.4219 9.09375 89.4219 9.82812C89.4219 10.5156 88.875 11.0781 88.1562 11.0781ZM87.1562 18.5V12.7031H89.1562V18.5H87.1562Z" fill="#253B80"/>
                            <path d="M90.5 12.7031H92.5V18.5H90.5V12.7031ZM91.5 8.54688C92.1875 8.54688 92.75 9.09375 92.75 9.82812C92.75 10.5156 92.1875 11.0781 91.5 11.0781C90.7812 11.0781 90.2344 10.5156 90.2344 9.82812C90.2344 9.09375 90.7812 8.54688 91.5 8.54688Z" fill="#179BD7"/>
                            <path d="M115 12.7031H116.281L113.844 22H112.531L113.094 20.0312H113.062L110.688 12.7031H112.219L113.812 18.2188H113.844L115 12.7031Z" fill="#179BD7"/>
                            <path d="M111.25 12.7031H113.25V18.5H111.25V12.7031ZM112.25 8.54688C112.938 8.54688 113.5 9.09375 113.5 9.82812C113.5 10.5156 112.938 11.0781 112.25 11.0781C111.531 11.0781 110.984 10.5156 110.984 9.82812C110.984 9.09375 111.531 8.54688 112.25 8.54688Z" fill="#179BD7"/>
                            <path d="M104.156 18.625C102.375 18.625 101.188 17.3125 101.188 15.5938C101.188 13.875 102.375 12.5781 104.156 12.5781C105.938 12.5781 107.125 13.875 107.125 15.5938C107.125 17.3125 105.938 18.625 104.156 18.625ZM104.156 14.2812C103.406 14.2812 103 14.7812 103 15.5938C103 16.4219 103.406 16.9219 104.156 16.9219C104.906 16.9219 105.312 16.4219 105.312 15.5938C105.312 14.7812 104.906 14.2812 104.156 14.2812Z" fill="#179BD7"/>
                            <path d="M107.969 9.5H109.969V18.5H107.969V9.5Z" fill="#179BD7"/>
                            <path d="M100.156 23.5H98.1562V12.7031H100.156V23.5Z" fill="#179BD7"/>
                            <path d="M97.3125 18.625C95.5312 18.625 94.3438 17.3125 94.3438 15.5938C94.3438 13.875 95.5312 12.5781 97.3125 12.5781C99.0938 12.5781 100.281 13.875 100.281 15.5938C100.281 17.3125 99.0938 18.625 97.3125 18.625ZM97.3125 14.2812C96.5625 14.2812 96.1562 14.7812 96.1562 15.5938C96.1562 16.4219 96.5625 16.9219 97.3125 16.9219C98.0625 16.9219 98.4688 16.4219 98.4688 15.5938C98.4688 14.7812 98.0625 14.2812 97.3125 14.2812Z" fill="#179BD7"/>
                            <path d="M117.25 18.5H115.25V9.5H117.25V18.5Z" fill="#179BD7"/>
                            <path d="M123.5 18.5H121.5V15.1719C121.5 14.4062 121.156 14.0781 120.625 14.0781C120.062 14.0781 119.75 14.4531 119.75 15.2656V18.5H117.75V12.7031H119.75V13.5156H119.781C120.109 12.9531 120.781 12.5781 121.578 12.5781C122.906 12.5781 123.5 13.4375 123.5 14.9375V18.5Z" fill="#179BD7"/>
                            <path d="M35.1213 21.8641C34.7424 24.3621 32.7799 24.3621 30.8623 24.3621H29.7991L30.5366 19.9077C30.5745 19.6758 30.7697 19.5056 30.998 19.5056H31.4766C32.7611 19.5056 33.9607 19.5056 34.5891 20.1891C34.9681 20.5766 35.0817 21.1186 35.1213 21.8641ZM34.4942 14.0186C32.1343 14.0186 29.2492 14.0186 29.2492 17.6061C29.2492 21.2746 32.1722 21.0855 34.4942 21.0855H34.9152L34.5362 23.2599C34.5095 23.4077 34.5892 23.5461 34.7187 23.6418C34.8485 23.7451 35.0171 23.7451 35.1758 23.7451H37.2286C37.6833 23.7451 38.0718 23.3949 38.1382 22.9207L39.4046 16.3006C39.4426 16.0687 39.2474 15.8614 39.0096 15.8614H38.0718C37.7686 15.8614 37.5072 15.6172 37.4502 15.3107L37.225 14.0186H34.4942Z" fill="#253B80"/>
                            <path d="M6.80208 21.8641C6.4231 24.3621 4.46057 24.3621 2.53978 24.3621H1.47662L2.21409 19.9077C2.25205 19.6758 2.44722 19.5056 2.67553 19.5056H3.15412C4.43856 19.5056 5.63818 19.5056 6.26659 20.1891C6.64567 20.5766 6.76158 21.1186 6.80208 21.8641ZM6.17493 14.0186C3.81505 14.0186 0.929932 14.0186 0.929932 17.6061C0.929932 21.2746 3.85291 21.0855 6.17493 21.0855H6.59596L6.2169 23.2599C6.19019 23.4077 6.26908 23.5461 6.39856 23.6418C6.52822 23.7451 6.69688 23.7451 6.85554 23.7451H8.9084C9.36304 23.7451 9.75149 23.3949 9.81811 22.9207L11.0845 16.3006C11.1225 16.0687 10.9273 15.8614 10.6896 15.8614H9.75168C9.44843 15.8614 9.18705 15.6172 9.13 15.3107L8.90477 14.0186H6.17493Z" fill="#179BD7"/>
                            <path d="M17.5446 17.5509H15.4727C15.2443 17.5509 15.0401 17.7211 15.0023 17.9531L14.2647 22.4075C14.2268 22.6394 14.4129 22.8472 14.6413 22.8472H16.6132C17.0678 22.8472 17.4563 22.4969 17.5229 22.0228L17.9963 18.5621C18.0341 18.3301 17.8389 18.1123 17.6011 18.1123H17.039C16.8106 18.1123 16.6063 18.2826 16.5685 18.5145L16.3428 19.9627C16.3049 20.1946 16.1097 20.3649 15.8814 20.3649H15.4027C15.1744 20.3649 15.0074 20.1857 15.0452 19.9538L15.2329 18.7357C15.2708 18.5038 15.4659 18.3335 15.6943 18.3335H17.8298C18.0582 18.3335 18.2251 18.1632 18.1873 17.9313L17.9804 16.7502C17.9424 16.5183 17.7384 16.348 17.5099 16.348H13.9724C13.744 16.348 13.5398 16.5183 13.502 16.7502L12.2356 23.3702C12.1977 23.6021 12.3929 23.81 12.6212 23.81H16.1588C16.3871 23.81 16.5913 23.6397 16.6292 23.4078L17.8676 18.0384C17.9055 17.8065 17.7103 17.5509 17.4819 17.5509H17.5446Z" fill="#253B80"/>
                            <path d="M45.8646 17.5509H43.7927C43.5643 17.5509 43.3601 17.7211 43.3223 17.9531L42.5847 22.4075C42.5468 22.6394 42.7329 22.8472 42.9613 22.8472H45.0332C45.4878 22.8472 45.8763 22.4969 45.9429 22.0228L46.4163 18.5621C46.4541 18.3301 46.2589 18.1123 46.0211 18.1123H45.459C45.2306 18.1123 45.0263 18.2826 44.9885 18.5145L44.7628 19.9627C44.7249 20.1946 44.5297 20.3649 44.3014 20.3649H43.8227C43.5944 20.3649 43.4274 20.1857 43.4652 19.9538L43.6529 18.7357C43.6908 18.5038 43.886 18.3335 44.1143 18.3335H46.2498C46.4782 18.3335 46.6451 18.1632 46.6073 17.9313L46.4004 16.7502C46.3625 16.5183 46.1583 16.348 45.9299 16.348H42.3924C42.164 16.348 41.9598 16.5183 41.922 16.7502L40.6556 23.3702C40.6177 23.6021 40.8129 23.81 41.0412 23.81H44.5788C44.8071 23.81 45.0113 23.6397 45.0493 23.4078L46.2876 18.0384C46.3254 17.8065 46.1303 17.5509 45.9019 17.5509H45.8646Z" fill="#179BD7"/>
                            <path d="M27.6227 14.0186H25.5318C25.2901 14.0186 25.0339 14.1889 24.9877 14.4335L22.6811 23.4077C22.641 23.6397 22.8429 23.8099 23.0846 23.8099H25.1755C25.4171 23.8099 25.6734 23.6396 25.7195 23.395L28.0262 14.4208C28.0662 14.1888 27.8644 14.0186 27.6227 14.0186Z" fill="#253B80"/>
                          </svg>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div>
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Acepto los{" "}
                      <Link to="/terms" className="text-bloodRed hover:underline">
                        términos y condiciones
                      </Link>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    className="flex-1"
                  >
                    Atrás
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-bloodRed hover:bg-red-900"
                  >
                    Completar Pago
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-2 p-4 border rounded-lg bg-muted/50">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Tu información de pago está segura. Utilizamos Stripe para procesar los pagos de forma encriptada y segura.
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RequestPrototype;
