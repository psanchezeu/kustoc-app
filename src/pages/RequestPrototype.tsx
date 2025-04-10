
import { useState, useEffect } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
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
  
  // Scroll to top when component mounts or form step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [formStep]);
  
  // Set plan from URL params if available
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planParam = params.get('plan');
    if (planParam === 'normal' || planParam === 'premium') {
      setSelectedPlan(planParam);
      setFormStep(2);
    }
  }, [location]);
  
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
    
    window.scrollTo(0, 0);
    setFormStep((prev) => prev + 1);
  };
  
  const handlePlanSelect = (plan: "normal" | "premium") => {
    setSelectedPlan(plan);
  };
  
  const handlePreviousStep = () => {
    window.scrollTo(0, 0);
    setFormStep((prev) => prev - 1);
  };
  
  const handleSubmit = () => {
    // Simulate Stripe redirect
    const stripeUrl = selectedPlan === "normal" 
      ? "https://checkout.stripe.com/pay/cs_test_a1BCExampleCode1500EUR"
      : "https://checkout.stripe.com/pay/cs_test_a2BCExampleCode3000EUR";
    
    window.location.href = stripeUrl;
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
                    <div className="text-3xl font-bold">1500 €</div>
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
                    <div className="text-3xl font-bold">3000 €</div>
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
                          {selectedPlan === "normal" ? "1500 €" : "3000 €"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium mb-3">Información de contacto</h3>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Tu nombre" className="mt-1" />
                  </div>
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
                    Pagar Ahora
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
