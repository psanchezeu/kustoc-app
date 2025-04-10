
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ProjectDetailsForm } from "@/components/request-prototype/ProjectDetailsForm";
import { PlanSelectionForm } from "@/components/request-prototype/PlanSelectionForm";
import { PaymentForm } from "@/components/request-prototype/PaymentForm";
import { PrototypeFormStepper } from "@/components/request-prototype/PrototypeFormStepper";

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
        <PrototypeFormStepper currentStep={formStep} />
        
        {/* Form Steps */}
        <Card className="p-6 border-2">
          {formStep === 1 && (
            <ProjectDetailsForm 
              formData={formData} 
              selectedFeatures={selectedFeatures}
              targetAudience={targetAudience}
              handleNextStep={handleNextStep}
              setFormData={setFormData}
              setSelectedFeatures={setSelectedFeatures}
              setTargetAudience={setTargetAudience}
            />
          )}
          
          {formStep === 2 && (
            <PlanSelectionForm 
              selectedPlan={selectedPlan}
              handlePlanSelect={handlePlanSelect}
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
            />
          )}
          
          {formStep === 3 && (
            <PaymentForm 
              selectedPlan={selectedPlan}
              formData={formData}
              handlePreviousStep={handlePreviousStep}
              handleSubmit={handleSubmit}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default RequestPrototype;
